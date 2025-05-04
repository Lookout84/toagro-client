export interface Message {
    id: number;
    content: string;
    senderId: number;
    receiverId: number;
    listingId?: number;
    createdAt: string;
    readAt?: string;
    sender: {
      id: number;
      name: string;
      avatar?: string;
    };
    receiver: {
      id: number;
      name: string;
      avatar?: string;
    };
  }
  
  export interface Conversation {
    id: number;
    otherUser: {
      id: number;
      name: string;
      avatar?: string;
    };
    lastMessage: {
      content: string;
      createdAt: string;
      read: boolean;
    };
    unreadCount: number;
  }
  
  export interface SendMessageData {
    receiverId: number;
    content: string;
    listingId?: number;
  }
  
  export interface ConversationResponse {
    messages: Message[];
    meta: {
      total: number;
      page: number;
      limit: number;
      pages: number;
    };
  }