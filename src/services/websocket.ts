import { ConnectionStatus, WSFrame } from '../types';

type MessageHandler = (frame: WSFrame) => void;
type StatusHandler = (status: ConnectionStatus) => void;

export class WebSocketClient {
  private socket: WebSocket | null = null;
  private url: string = 'ws://localhost:8000/api/v1/ws';
  private token: string | null = null;
  private isExplicitClose: boolean = false;
  
  // Reconnection backoff properties
  private reconnectAttempts: number = 0;
  private maxReconnectDelay: number = 30000;
  private reconnectTimer: NodeJS.Timeout | null = null;

  // Heartbeat ping interval
  private pingInterval: NodeJS.Timeout | null = null;

  // Event handlers
  private messageHandlers: Set<MessageHandler> = new Set();
  private statusHandlers: Set<StatusHandler> = new Set();
  private currentStatus: ConnectionStatus = 'disconnected';

  public connect(token: string) {
    this.token = token;
    this.isExplicitClose = false;
    this.initSocket();
  }

  private initSocket() {
    if (!this.token) return;

    if (this.socket) {
      this.socket.close();
      this.socket = null;
    }

    this.setStatus(this.reconnectAttempts > 0 ? 'reconnecting' : 'connecting');

    const wsUrl = `${this.url}?token=${encodeURIComponent(this.token)}`;
    this.socket = new WebSocket(wsUrl);

    this.socket.onopen = () => {
      this.setStatus('connected');
      this.reconnectAttempts = 0;
      this.startHeartbeat();
    };

    this.socket.onmessage = (event) => {
      try {
        const frame: WSFrame = JSON.parse(event.data);
        if (frame.type === 'pong') return; // Ignore ping/pong frame

        this.messageHandlers.forEach((handler) => handler(frame));
      } catch (err) {
        console.error('Error parsing WebSocket frame:', err);
      }
    };

    this.socket.onerror = (error) => {
      console.warn('WebSocket error encountered:', error);
    };

    this.socket.onclose = (event) => {
      this.stopHeartbeat();

      if (!this.isExplicitClose) {
        this.setStatus(this.reconnectAttempts > 0 ? 'reconnecting' : 'disconnected');
        this.scheduleReconnect();
      } else {
        this.setStatus('disconnected');
      }
    };
  }

  private scheduleReconnect() {
    if (this.reconnectTimer) clearTimeout(this.reconnectTimer);

    // Calculate exponential backoff delay (1s, 2s, 4s, 8s, up to 30s)
    const delay = Math.min(1000 * Math.pow(2, this.reconnectAttempts), this.maxReconnectDelay);
    this.reconnectAttempts++;

    console.log(`Scheduling WebSocket reconnect attempt #${this.reconnectAttempts} in ${delay}ms`);
    this.reconnectTimer = setTimeout(() => {
      this.initSocket();
    }, delay);
  }

  private startHeartbeat() {
    this.stopHeartbeat();
    this.pingInterval = setInterval(() => {
      if (this.socket && this.socket.readyState === WebSocket.OPEN) {
        this.socket.send(JSON.stringify({ action: 'ping' }));
      }
    }, 20000);
  }

  private stopHeartbeat() {
    if (this.pingInterval) {
      clearInterval(this.pingInterval);
      this.pingInterval = null;
    }
  }

  public sendMessage(conversationId: string | null, content: string) {
    if (!this.socket || this.socket.readyState !== WebSocket.OPEN) {
      throw new Error('WebSocket is not connected. Attempting auto-reconnect...');
    }

    const payload = {
      action: 'send_message',
      conversation_id: conversationId,
      content: content,
    };

    this.socket.send(JSON.stringify(payload));
  }

  public disconnect() {
    this.isExplicitClose = true;
    if (this.reconnectTimer) clearTimeout(this.reconnectTimer);
    this.stopHeartbeat();

    if (this.socket) {
      this.socket.close();
      this.socket = null;
    }
    this.setStatus('disconnected');
  }

  public onMessage(handler: MessageHandler) {
    this.messageHandlers.add(handler);
    return () => this.messageHandlers.delete(handler);
  }

  public onStatusChange(handler: StatusHandler) {
    this.statusHandlers.add(handler);
    handler(this.currentStatus); // Instantly emit current state
    return () => this.statusHandlers.delete(handler);
  }

  private setStatus(status: ConnectionStatus) {
    this.currentStatus = status;
    this.statusHandlers.forEach((handler) => handler(status));
  }
}

export const wsClient = new WebSocketClient();
