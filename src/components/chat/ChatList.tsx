// import React from 'react';
// import { useNavigate } from 'react-router-dom';
// import { useAppSelector } from '@store/hooks';
// import { Conversation } from '../../types/chat.types';
// import { formatRelativeTime } from '@utils/formatters';
// import { Badge } from '@components/common/Badge';

// interface ChatListProps {
//   conversations: Conversation[];
// }

// export const ChatList: React.FC<ChatListProps> = ({ conversations }) => {
//   const navigate = useNavigate();
//   const { currentConversation } = useAppSelector(state => state.chat);
//   const { user } = useAppSelector(state => state.auth);

//   const handleConversationClick = (conversation: Conversation) => {
//     navigate(`/chat/${conversation.other_user_id}`);
//   };

//   return (
//     <div className="flex-1 overflow-y-auto">
//       {conversations.map((conversation) => (
//         <button
//           key={conversation.other_user_id}
//           onClick={() => handleConversationClick(conversation)}
//           className={`w-full p-4 border-b border-gray-200 hover:bg-gray-50 transition-colors ${
//             currentConversation?.userId === conversation.other_user_id ? 'bg-primary-green/5' : ''
//           }`}
//         >
//           <div className="flex gap-3">
//             <div className="flex-shrink-0">
//               {conversation.other_user_avatar ? (
//                 <img
//                   src={conversation.other_user_avatar}
//                   alt={conversation.other_user_name}
//                   className="h-12 w-12 rounded-full object-cover"
//                 />
//               ) : (
//                 <div className="h-12 w-12 rounded-full bg-gray-200 flex items-center justify-center">
//                   <span className="text-gray-500 font-medium">{conversation.other_user_name[0]}</span>
//                 </div>
//               )}
//             </div>
//             <div className="flex-1 min-w-0">
//               <div className="flex justify-between items-start">
//                 <h3 className="text-sm font-medium text-gray-900 truncate">
//                   {conversation.other_user_name}
//                 </h3>
//                 <div className="flex items-center gap-2">
//                   {conversation.unread_count > 0 && (
//                     <Badge variant="error" className="h-5 w-5 flex items-center justify-center rounded-full text-xs">
//                       {conversation.unread_count}
//                     </Badge>
//                   )}
//                   <span className="text-xs text-gray-500">
//                     {formatRelativeTime(conversation.last_message_time)}
//                   </span>
//                 </div>
//               </div>
//               <p className="text-sm text-gray-500 truncate mt-1">{conversation.last_message}</p>
//             </div>
//           </div>
//         </button>
//       ))}
//       {conversations.length === 0 && (
//         <div className="p-4 text-center text-gray-500">
//           Немає розмов
//         </div>
//       )}
//     </div>
//   );
// };

import React, { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '@store/hooks';
import { Conversation } from '../../types/chat.types';
import { formatRelativeTime } from '@utils/formatters';
import { Badge } from '@components/common/Badge';

interface ChatListProps {
  conversations: Conversation[];
}

export const ChatList = React.memo(({ conversations }: ChatListProps) => {
  const navigate = useNavigate();
  const { currentConversation } = useAppSelector(state => state.chat);
  
  const handleConversationClick = useCallback((conversation: Conversation) => {
    navigate(`/chat/${conversation.otherUser.id}`);
  }, [navigate]);

  if (conversations.length === 0) {
    return (
      <div className="p-4 text-center text-gray-500">
        Немає розмов
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto">
      {conversations.map((conversation) => {
        const isActive = currentConversation?.userId === conversation.otherUser.id;
        
        return (
          <button
            key={`${conversation.otherUser.id}-${conversation.lastMessage.createdAt}`}
            onClick={() => handleConversationClick(conversation)}
            className={`w-full p-4 border-b border-gray-200 hover:bg-gray-50 transition-colors ${
              isActive ? 'bg-primary-green/5' : ''
            }`}
            aria-current={isActive ? 'true' : undefined}
          >
            <div className="flex gap-3">
              <div className="flex-shrink-0">
                {conversation.otherUser.avatar ? (
                  <img
                    src={conversation.otherUser.avatar}
                    alt={conversation.otherUser.name}
                    className="h-12 w-12 rounded-full object-cover"
                    loading="lazy"
                  />
                ) : (
                  <div className="h-12 w-12 rounded-full bg-gray-200 flex items-center justify-center">
                    <span className="text-gray-500 font-medium">
                      {conversation.otherUser.name[0]}
                    </span>
                  </div>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-start">
                  <h3 className="text-sm font-medium text-gray-900 truncate">
                    {conversation.otherUser.name}
                  </h3>
                  <div className="flex items-center gap-2">
                    {conversation.unreadCount > 0 && (
                      <Badge 
                        variant="error" 
                        className="h-5 w-5 flex items-center justify-center rounded-full text-xs"
                        aria-label={`Непрочитаних повідомлень: ${conversation.unreadCount}`}
                      >
                        {conversation.unreadCount}
                      </Badge>
                    )}
                    <time 
                      dateTime={new Date(conversation.lastMessage.createdAt).toISOString()} 
                      className="text-xs text-gray-500"
                    >
                      {formatRelativeTime(conversation.lastMessage.createdAt)}
                    </time>
                  </div>
                </div>
                <p className="text-sm text-gray-500 truncate mt-1">
                  {conversation.lastMessage.content}
                </p>
              </div>
            </div>
          </button>
        );
      })}
    </div>
  );
});

ChatList.displayName = 'ChatList';