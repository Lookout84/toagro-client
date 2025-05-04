import React from 'react';
import { ChatMessage as MessageType } from '@types/chat.types';
import { formatDate } from '@utils/formatters';

interface ChatMessageProps {
  message: MessageType;
  isOwnMessage: boolean;
}

export const ChatMessage: React.FC<ChatMessageProps> = ({ message, isOwnMessage }) => {
  return (
    <div className={`flex mb-4 ${isOwnMessage ? 'justify-end' : 'justify-start'}`}>
      <div
        className={`max-w-[70%] rounded-lg px-4 py-2 ${
          isOwnMessage
            ? 'bg-primary-green text-white'
            : 'bg-gray-100 text-gray-900'
        }`}
      >
        <p className="text-sm whitespace-pre-wrap">{message.content}</p>
        <p className={`text-xs mt-1 ${isOwnMessage ? 'text-white/80' : 'text-gray-500'}`}>
          {formatDate(message.createdAt, { hour: '2-digit', minute: '2-digit' })}
        </p>
      </div>
    </div>
  );
};