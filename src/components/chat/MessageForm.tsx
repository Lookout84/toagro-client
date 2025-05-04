import React, { useState } from 'react';
import { useAppDispatch } from '@store/hooks';
import { sendMessage } from '@store/slices/chatSlice';
import { Button } from '@components/common/Button';
import { PaperAirplaneIcon } from '@heroicons/react/24/outline';

interface MessageFormProps {
  receiverId: number;
}

export const MessageForm: React.FC<MessageFormProps> = ({ receiverId }) => {
  const dispatch = useAppDispatch();
  const [content, setContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim() || isSubmitting) return;

    setIsSubmitting(true);
    try {
      await dispatch(sendMessage({
        receiverId,
        content: content.trim(),
      })).unwrap();
      setContent('');
    } catch (error) {
      console.error('Failed to send message:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        onKeyPress={handleKeyPress}
        placeholder="Напишіть повідомлення..."
        className="flex-1 min-h-[40px] max-h-[120px] p-2 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-primary-green/50 focus:border-primary-green"
        rows={1}
        disabled={isSubmitting}
      />
      <Button
        type="submit"
        variant="primary"
        icon={<PaperAirplaneIcon className="h-5 w-5" />}
        isLoading={isSubmitting}
        disabled={!content.trim()}
      >
        Надіслати
      </Button>
    </form>
  );
};