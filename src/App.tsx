import React, { useState, useEffect, useCallback } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import { Conversation, Message, ConnectionStatus, WSFrame } from './types';
import { api } from './services/api';
import { wsClient } from './services/websocket';
import { Sidebar } from './components/chat/Sidebar';
import { ChatArea } from './components/chat/ChatArea';
import { AuthModal } from './components/auth/AuthModal';

// Zenix pages
import SplashScreen from './pages/SplashScreen';
import LanguageSelect from './pages/LanguageSelect';
import RoleSelect from './pages/RoleSelect';
import WelcomeLogin from './pages/WelcomeLogin';
import Home from './pages/Home';

export const App: React.FC = () => {
  const { isAuthenticated, token, isLoading } = useAuth();
  
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [activeConversationId, setActiveConversationId] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  
  const [connectionStatus, setConnectionStatus] = useState<ConnectionStatus>('disconnected');
  const [isStreaming, setIsStreaming] = useState<boolean>(false);
  const [activeStreamingMessageId, setActiveStreamingMessageId] = useState<string | null>(null);
  const [errorBanner, setErrorBanner] = useState<string | null>(null);

  // Fetch user conversations list
  const fetchConversations = useCallback(async () => {
    try {
      const res = await api.get<Conversation[]>('/conversations');
      setConversations(res.data);
      // Select first conversation if none selected
      if (res.data.length > 0 && !activeConversationId) {
        setActiveConversationId(res.data[0].id);
      }
    } catch (err) {
      console.error('Error fetching conversations:', err);
    }
  }, [activeConversationId]);

  // Fetch detail for selected conversation
  const fetchConversationDetail = useCallback(async (id: string) => {
    try {
      const res = await api.get(`/conversations/${id}`);
      setMessages(res.data.messages || []);
    } catch (err) {
      console.error('Error loading conversation history:', err);
    }
  }, []);

  // Sync selected conversation thread
  useEffect(() => {
    if (isAuthenticated && activeConversationId) {
      fetchConversationDetail(activeConversationId);
    } else if (!activeConversationId) {
      setMessages([]);
    }
  }, [isAuthenticated, activeConversationId, fetchConversationDetail]);

  // Handle WebSocket lifecycle and incoming streaming events
  useEffect(() => {
    if (!isAuthenticated || !token) {
      wsClient.disconnect();
      return;
    }

    // Connect WebSocket
    wsClient.connect(token);
    fetchConversations();

    // Subscribe connection status changes
    const unsubStatus = wsClient.onStatusChange((status) => {
      setConnectionStatus(status);
    });

    // Subscribe to streaming message frames
    const unsubMessage = wsClient.onMessage((frame: WSFrame) => {
      if (frame.type === 'stream_start') {
        setIsStreaming(true);
        setActiveStreamingMessageId(frame.message_id || null);

        // Switch active conversation to stream thread if not already set
        if (frame.conversation_id && frame.conversation_id !== activeConversationId) {
          setActiveConversationId(frame.conversation_id);
        }

        setMessages((prev) => {
          const filtered = prev.filter((m) => !m.id.startsWith('temp_'));
          const next = [...filtered];
          // Append user message if sent from another session
          if (frame.user_message && !next.some((m) => m.id === frame.user_message?.id)) {
            next.push(frame.user_message);
          }
          // Append placeholder assistant message for streaming
          if (frame.message_id && !next.some((m) => m.id === frame.message_id)) {
            next.push({
              id: frame.message_id,
              conversation_id: frame.conversation_id!,
              role: 'assistant',
              content: '',
              status: 'streaming',
              created_at: new Date().toISOString(),
            });
          }
          return next;
        });

        fetchConversations();
      } else if (frame.type === 'stream_chunk') {
        setMessages((prev) =>
          prev.map((msg) => {
            if (msg.id === frame.message_id) {
              return {
                ...msg,
                content: msg.content + (frame.chunk || ''),
              };
            }
            return msg;
          })
        );
      } else if (frame.type === 'stream_end') {
        setIsStreaming(false);
        setActiveStreamingMessageId(null);
        setMessages((prev) =>
          prev.map((msg) => {
            if (msg.id === frame.message_id) {
              return {
                ...msg,
                content: frame.content || msg.content,
                status: 'completed',
              };
            }
            return msg;
          })
        );
        fetchConversations();
      } else if (frame.type === 'rate_limit_exceeded') {
        setIsStreaming(false);
        setActiveStreamingMessageId(null);
        setErrorBanner(frame.error || 'Rate limit exceeded. Please wait a moment.');
      } else if (frame.type === 'error') {
        setIsStreaming(false);
        setActiveStreamingMessageId(null);
        setErrorBanner(frame.error || 'An error occurred during response streaming.');
      }
    });

    return () => {
      unsubStatus();
      unsubMessage();
      wsClient.disconnect();
    };
  }, [isAuthenticated, token]);

  const handleSendMessage = (text: string) => {
    setErrorBanner(null);
    try {
      // Optimistically add user message bubble locally
      const tempUserMsgId = 'temp_' + Date.now();
      const optimisticMsg: Message = {
        id: tempUserMsgId,
        conversation_id: activeConversationId || '',
        role: 'user',
        content: text,
        status: 'completed',
        created_at: new Date().toISOString(),
      };
      setMessages((prev) => [...prev, optimisticMsg]);

      // Send to WebSocket
      wsClient.sendMessage(activeConversationId, text);
    } catch (err: any) {
      setErrorBanner(err.message || 'Failed to send message over WebSocket');
    }
  };

  const handleNewConversation = () => {
    setActiveConversationId(null);
    setMessages([]);
  };

  const handleDeleteConversation = async (id: string) => {
    try {
      await api.delete(`/conversations/${id}`);
      setConversations((prev) => prev.filter((c) => c.id !== id));
      if (activeConversationId === id) {
        const remaining = conversations.filter((c) => c.id !== id);
        setActiveConversationId(remaining.length > 0 ? remaining[0].id : null);
      }
    } catch (err) {
      console.error('Error deleting conversation:', err);
    }
  };

  if (isLoading) {
    return (
      <div style={{ width: '100vw', height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#090d16', color: '#fff' }}>
        <div>Loading...</div>
      </div>
    );
  }

  const activeConv = conversations.find((c) => c.id === activeConversationId);

  // Chat app sub-component
  const ChatApp = () => (
    <div className="app-container">
      {!isAuthenticated && <AuthModal />}
      {isAuthenticated && (
        <>
          <Sidebar
            conversations={conversations}
            activeId={activeConversationId}
            onSelectConversation={(id) => setActiveConversationId(id)}
            onNewConversation={handleNewConversation}
            onDeleteConversation={handleDeleteConversation}
          />
          <ChatArea
            messages={messages}
            activeTitle={activeConv ? activeConv.title : 'New Conversation'}
            connectionStatus={connectionStatus}
            isStreaming={isStreaming}
            activeStreamingMessageId={activeStreamingMessageId}
            errorBanner={errorBanner}
            onSendMessage={handleSendMessage}
            onClearError={() => setErrorBanner(null)}
          />
        </>
      )}
    </div>
  );

  return (
    <BrowserRouter>
      <Routes>
        {/* Zenix Automotive pages */}
        <Route path="/" element={<Navigate to="/splash" replace />} />
        <Route path="/splash" element={<SplashScreen />} />
        <Route path="/language" element={<LanguageSelect />} />
        <Route path="/role" element={<RoleSelect />} />
        <Route path="/login" element={<WelcomeLogin />} />
        <Route path="/home" element={<Home />} />
        <Route path="/service" element={<Home />} />
        <Route path="/wishlist" element={<Home />} />
        <Route path="/profile" element={<Home />} />

        {/* Existing chat application */}
        <Route path="/chat" element={<ChatApp />} />
        <Route path="*" element={<Navigate to="/splash" replace />} />
      </Routes>
    </BrowserRouter>
  );
};
