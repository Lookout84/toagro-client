import { useState, useEffect, useCallback } from 'react';
import { useAppSelector } from '@store/hooks';

interface UseSocketOptions {
  namespace?: string;
  autoConnect?: boolean;
  reconnect?: boolean;
  reconnectInterval?: number;
}

interface UseSocketReturn {
  socket: WebSocket | null;
  isConnected: boolean;
  sendMessage: (event: string, data: any) => void;
  subscribe: (event: string, callback: (data: any) => void) => () => void;
  disconnect: () => void;
  connect: () => void;
}

export const useSocket = (url: string, options: UseSocketOptions = {}): UseSocketReturn => {
  const {
    namespace = '',
    autoConnect = true,
    reconnect = true,
    reconnectInterval = 3000,
  } = options;

  const { token, isAuthenticated } = useAppSelector(state => state.auth);
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [subscribers, setSubscribers] = useState<Record<string, Set<(data: any) => void>>>({});

  const connect = useCallback(() => {
    if (!isAuthenticated || socket?.readyState === WebSocket.OPEN) return;

    const wsUrl = `${url}${namespace}${token ? `?token=${token}` : ''}`;
    
    try {
      const newSocket = new WebSocket(wsUrl);

      newSocket.onopen = () => {
        setIsConnected(true);
        console.log('WebSocket connected');
      };

      newSocket.onmessage = (event) => {
        try {
          const { event: eventName, data } = JSON.parse(event.data);
          
          // Call all subscribers for this event
          if (subscribers[eventName]) {
            subscribers[eventName].forEach(callback => callback(data));
          }
        } catch (error) {
          console.error('Failed to parse WebSocket message:', error);
        }
      };

      newSocket.onclose = () => {
        setIsConnected(false);
        console.log('WebSocket disconnected');

        // Attempt to reconnect if enabled
        if (reconnect && isAuthenticated) {
          setTimeout(() => {
            console.log('Attempting to reconnect WebSocket...');
            connect();
          }, reconnectInterval);
        }
      };

      newSocket.onerror = (error) => {
        console.error('WebSocket error:', error);
      };

      setSocket(newSocket);
    } catch (error) {
      console.error('Failed to create WebSocket connection:', error);
    }
  }, [url, namespace, token, isAuthenticated, reconnect, reconnectInterval, subscribers]);

  const disconnect = useCallback(() => {
    if (socket) {
      socket.close();
      setSocket(null);
      setIsConnected(false);
    }
  }, [socket]);

  const sendMessage = useCallback((event: string, data: any) => {
    if (socket?.readyState === WebSocket.OPEN) {
      socket.send(JSON.stringify({ event, data }));
    } else {
      console.warn('WebSocket is not connected');
    }
  }, [socket]);

  const subscribe = useCallback((event: string, callback: (data: any) => void) => {
    setSubscribers(prev => {
      const eventSubscribers = prev[event] || new Set();
      eventSubscribers.add(callback);
      return { ...prev, [event]: eventSubscribers };
    });

    // Return unsubscribe function
    return () => {
      setSubscribers(prev => {
        const eventSubscribers = prev[event];
        if (eventSubscribers) {
          eventSubscribers.delete(callback);
          if (eventSubscribers.size === 0) {
            delete prev[event];
          }
        }
        return { ...prev };
      });
    };
  }, []);

  useEffect(() => {
    if (autoConnect && isAuthenticated) {
      connect();
    }

    // Cleanup on unmount
    return () => {
      disconnect();
    };
  }, [isAuthenticated, autoConnect]); // eslint-disable-line react-hooks/exhaustive-deps

  return {
    socket,
    isConnected,
    sendMessage,
    subscribe,
    disconnect,
    connect,
  };
};