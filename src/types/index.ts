export interface User {
  id: string;
  email: string;
  full_name?: string;
  created_at: string;
}

export interface AuthResponse {
  access_token: string;
  refresh_token: string;
  token_type: string;
  user: User;
}

export interface Conversation {
  id: string;
  user_id: string;
  title: string;
  created_at: string;
  updated_at: string;
  message_count?: number;
}

export interface Message {
  id: string;
  conversation_id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  status: 'streaming' | 'completed' | 'error';
  created_at: string;
}

export interface ConversationDetail extends Conversation {
  messages: Message[];
}

export type ConnectionStatus = 'connected' | 'connecting' | 'reconnecting' | 'disconnected';

export interface WSFrame {
  type: 'stream_start' | 'stream_chunk' | 'stream_end' | 'error' | 'pong' | 'rate_limit_exceeded';
  conversation_id?: string;
  message_id?: string;
  chunk?: string;
  content?: string;
  error?: string;
  retry_after?: number;
  user_message?: Message;
}
