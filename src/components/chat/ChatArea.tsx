import React, { useState, useRef, useEffect } from 'react';
import { Message, ConnectionStatus } from '../../types';
import { MessageItem } from './MessageItem';
import { ConnectionBadge } from '../common/ConnectionBadge';
import { Send, AlertTriangle, Sparkles } from 'lucide-react';

interface Props {
  messages: Message[];
  activeTitle: string;
  connectionStatus: ConnectionStatus;
  isStreaming: boolean;
  activeStreamingMessageId: string | null;
  errorBanner: string | null;
  onSendMessage: (text: string) => void;
  onClearError: () => void;
}

export const ChatArea: React.FC<Props> = ({
  messages,
  activeTitle,
  connectionStatus,
  isStreaming,
  activeStreamingMessageId,
  errorBanner,
  onSendMessage,
  onClearError,
}) => {
  const [inputText, setInputText] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Auto-scroll to bottom when messages change or streaming chunks arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isStreaming]);

  const handleSend = () => {
    const trimmed = inputText.trim();
    if (!trimmed || isStreaming || connectionStatus === 'disconnected') return;
    onSendMessage(trimmed);
    setInputText('');

    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputText(e.target.value);
    // Auto-grow textarea
    e.target.style.height = 'auto';
    e.target.style.height = `${Math.min(e.target.scrollHeight, 140)}px`;
  };

  return (
    <div className="main-content">
      {/* Header Bar */}
      <div className="header-bar">
        <div style={{ fontWeight: 600, fontSize: '16px', color: '#fff' }}>
          {activeTitle || 'New Conversation'}
        </div>
        <ConnectionBadge status={connectionStatus} />
      </div>

      {/* Error Banner */}
      {errorBanner && (
        <div className="error-banner" style={{ margin: '16px 24px 0', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <AlertTriangle size={16} />
            <span>{errorBanner}</span>
          </div>
          <button
            onClick={onClearError}
            style={{ background: 'none', border: 'none', color: 'inherit', cursor: 'pointer', fontWeight: 600 }}
          >
            Dismiss
          </button>
        </div>
      )}

      {/* Messages List Container */}
      <div className="chat-area">
        <div className="messages-container">
          {messages.length === 0 ? (
            <div style={{ margin: 'auto', textAlign: 'center', maxWidth: '400px', color: 'var(--text-muted)' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'rgba(99, 102, 241, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
                <Sparkles size={24} className="text-indigo-400" />
              </div>
              <h3 style={{ color: '#fff', fontSize: '18px', marginBottom: '8px' }}>Welcome to AI Assistant</h3>
              <p style={{ fontSize: '14px', lineHeight: '1.5', color: 'var(--text-dim)' }}>
                Ask any question or start a project discussion. Real-time responses will be streamed directly to your desktop.
              </p>
            </div>
          ) : (
            messages.map((msg) => (
              <MessageItem
                key={msg.id}
                message={msg}
                isStreaming={isStreaming && msg.id === activeStreamingMessageId}
              />
            ))
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Controls */}
        <div className="input-container">
          <div className="input-box">
            <textarea
              ref={textareaRef}
              className="chat-input"
              rows={1}
              placeholder={
                connectionStatus === 'disconnected'
                  ? 'Offline. Reconnecting to server...'
                  : 'Type a message... (Press Enter to send, Shift+Enter for new line)'
              }
              value={inputText}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              disabled={connectionStatus === 'disconnected' || isStreaming}
            />
            <button
              className="btn btn-primary send-btn"
              onClick={handleSend}
              disabled={!inputText.trim() || isStreaming || connectionStatus === 'disconnected'}
              title="Send Message"
            >
              <Send size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
