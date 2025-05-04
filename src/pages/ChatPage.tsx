import React, { useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@store/hooks';
import { fetchConversations, setCurrentConversation } from '@store/slices/chatSlice';
import { MainLayout } from '@components/layout/MainLayout';
import { ChatList } from '@components/chat/ChatList';
import { ChatWindow } from '@components/chat/ChatWindow';
import { Listing } from '../types/listing.types';

export const ChatPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { userId } = useParams<{ userId: string }>();
  const location = useLocation();
  const { conversations, currentConversation } = useAppSelector(state => state.chat);
  const { user } = useAppSelector(state => state.auth);
  const [selectedListing, setSelectedListing] = useState<Listing | null>(null);

  useEffect(() => {
    dispatch(fetchConversations());
  }, [dispatch]);

  useEffect(() => {
    if (userId) {
      dispatch(setCurrentConversation(parseInt(userId)));
    }
    
    // Handle passed listing state
    if (location.state?.listing) {
      setSelectedListing(location.state.listing as Listing);
    }
  }, [userId, dispatch, location.state]);

  if (!user) return null;

  return (
    <MainLayout>
      <div className="h-[calc(100vh-64px)] flex overflow-hidden">
        <div className="w-1/3 border-r border-gray-200 flex flex-col">
          <div className="p-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Повідомлення</h2>
          </div>
          <ChatList conversations={conversations} />
        </div>
        <div className="flex-1 flex flex-col">
          {currentConversation ? (
            <ChatWindow userId={currentConversation.userId} listing={selectedListing} />
          ) : (
            <div className="flex-1 flex items-center justify-center text-gray-500">
              Оберіть розмову або розпочніть нову
            </div>
          )}
        </div>
      </div>
    </MainLayout>
  );
};