import React from 'react';
import { Conversation } from '../../types';
import { useAuth } from '../../context/AuthContext';
import { Plus, MessageSquare, Trash2, LogOut, Bot } from 'lucide-react';

interface Props {
  conversations: Conversation[];
  activeId: string | null;
  onSelectConversation: (id: string) => void;
  onNewConversation: () => void;
  onDeleteConversation: (id: string) => void;
}

export const Sidebar: React.FC<Props> = ({
  conversations,
  activeId,
  onSelectConversation,
  onNewConversation,
  onDeleteConversation,
}) => {
  const { user, logout } = useAuth();

  const getInitial = (name?: string, email?: string) => {
    if (name && name.trim()) return name.charAt(0).toUpperCase();
    if (email) return email.charAt(0).toUpperCase();
    return 'U';
  };

  return (
    <aside className="sidebar">
      {/* Header */}
      <div className="sidebar-header">
        <div className="sidebar-title">
          <Bot size={22} className="text-indigo-400" />
          <span>AI Assistant</span>
        </div>
      </div>

      {/* New Conversation Button */}
      <button className="btn btn-primary new-chat-btn" onClick={onNewConversation}>
        <Plus size={18} />
        <span>New Chat</span>
      </button>

      {/* Conversation Thread List */}
      <div className="conversation-list">
        {conversations.length === 0 ? (
          <div style={{ padding: '20px 10px', textAlign: 'center', color: 'var(--text-dim)', fontSize: '13px' }}>
            No conversations yet.<br />Start a new chat!
          </div>
        ) : (
          conversations.map((conv) => (
            <div
              key={conv.id}
              className={`conversation-item ${conv.id === activeId ? 'active' : ''}`}
              onClick={() => onSelectConversation(conv.id)}
            >
              <MessageSquare size={16} style={{ flexShrink: 0, marginRight: '10px' }} />
              <span className="conversation-title">{conv.title}</span>
              <button
                className="delete-conv-btn"
                title="Delete Conversation"
                onClick={(e) => {
                  e.stopPropagation();
                  onDeleteConversation(conv.id);
                }}
              >
                <Trash2 size={14} />
              </button>
            </div>
          ))
        )}
      </div>

      {/* User Footer */}
      <div className="sidebar-footer">
        <div className="user-info">
          <div className="user-avatar">{getInitial(user?.full_name, user?.email)}</div>
          <div style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: '140px' }}>
            <div style={{ fontWeight: 600, color: '#fff', fontSize: '13px' }}>
              {user?.full_name || 'User'}
            </div>
            <div style={{ fontSize: '11px', color: 'var(--text-dim)' }}>{user?.email}</div>
          </div>
        </div>
        <button
          className="btn btn-secondary"
          onClick={logout}
          title="Sign Out"
          style={{ padding: '8px', minWidth: 'auto' }}
        >
          <LogOut size={16} />
        </button>
      </div>
    </aside>
  );
};
