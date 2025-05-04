import React, { useEffect, useRef } from 'react';
import { useAppDispatch, useAppSelector } from '@store/hooks';
import { fetchConversation, markAsRead } from '@store/slices/chatSlice';
import { ChatMessage } from '@components/chat/ChatMessage';
import { MessageForm } from '@components/chat/MessageForm';
import { Listing } from '@types/listing.types';
import { Card } from '@components/common/Card';
import { formatCurrency } from '@utils/formatters';

interface ChatWindowProps {
  userId: number;
  listing?: Listing | null;
}

export const ChatWindow: React.FC<ChatWindowProps> = ({ userId, listing }) => {
  const dispatch = useAppDispatch();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { currentConversation } = useAppSelector(state => state.chat);
  const { user } = useAppSelector(state => state.auth);

  useEffect(() => {
    dispatch(fetchConversation(userId));
    dispatch(markAsRead(userId));
  }, [dispatch, userId]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [currentConversation?.messages]);

  if (!currentConversation) return null;

  return (
    <div className="flex flex-col h-full">
      {/* Chat Header */}
      <div className="p-4 border-b border-gray-200 bg-white">
        <div className="flex items-center gap-3">
          {currentConversation.avatar ? (
            <img
              src={currentConversation.avatar}
              alt={currentConversation.userName}
              className="h-10 w-10 rounded-full object-cover"
            />
          ) : (
            <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
              <span className="text-gray-500 font-medium">{currentConversation.userName[0]}</span>
            </div>
          )}
          <div>
            <h3 className="font-medium text-gray-900">{currentConversation.userName}</h3>
            <p className="text-sm text-gray-500">Активний зараз</p>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4">
        {currentConversation.messages.map((message) => (
          <ChatMessage
            key={message.id}
            message={message}
            isOwnMessage={message.senderId === user?.id}
          />
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Listing Info */}
      {listing && (
        <div className="border-t border-gray-200 p-4">
          <Card>
            <div className="flex gap-4">
              {listing.images?.[0] && (
                <img
                  src={listing.images[0]}
                  alt={listing.title}
                  className="w-16 h-16 object-cover rounded"
                />
              )}
              <div>
                <h4 className="font-medium">{listing.title}</h4>
                <p className="text-primary-green font-bold">{formatCurrency(listing.price)}</p>
              </div>
            </div>
          </Card>
        </div>
      )}

      {/* Message Input */}
      <div className="border-t border-gray-200 p-4">
        <MessageForm receiverId={userId} />
      </div>
    </div>
  );
};