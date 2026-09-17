import React from 'react';
import { Message } from '../../types';
import { Bot, User as UserIcon } from 'lucide-react';

interface Props {
  message: Message;
  isStreaming?: boolean;
}

export const MessageItem: React.FC<Props> = ({ message, isStreaming = false }) => {
  const isUser = message.role === 'user';

  const formatTimestamp = (dateStr?: string) => {
    if (!dateStr) return '';
    try {
      // Treat timezone-naive backend date strings as UTC
      let sanitizedStr = dateStr;
      if (dateStr.includes('T') && !dateStr.endsWith('Z') && !/[+-]\d{2}:\d{2}$/.test(dateStr)) {
        sanitizedStr = dateStr + 'Z';
      } else if (!dateStr.includes('Z') && !/[+-]\d{2}:\d{2}$/.test(dateStr)) {
        sanitizedStr = dateStr.replace(' ', 'T') + 'Z';
      }
      const date = new Date(sanitizedStr);
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } catch {
      return '';
    }
  };

  return (
    <div className={`message-wrapper ${isUser ? 'user' : 'assistant'}`}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
        {isUser ? (
          <>
            <span style={{ fontSize: '12px', fontWeight: 500, color: 'var(--text-muted)' }}>You</span>
            <UserIcon size={14} className="text-indigo-400" />
          </>
        ) : (
          <>
            <Bot size={14} className="text-cyan-400" />
            <span style={{ fontSize: '12px', fontWeight: 500, color: 'var(--text-muted)' }}>AI Assistant</span>
          </>
        )}
      </div>

      <div className="message-bubble">
        <div style={{ whitespace: 'pre-wrap', lineHeight: '1.6' }}>
          {message.content}
          {isStreaming && <span className="streaming-cursor" />}
        </div>
      </div>

      <span className="message-timestamp">{formatTimestamp(message.created_at)}</span>
    </div>
  );
};
