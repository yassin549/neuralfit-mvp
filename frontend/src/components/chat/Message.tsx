import { format, formatDistanceToNow } from 'date-fns';
import { UserCircleIcon } from '@heroicons/react/24/outline';
import { BoltIcon } from '@heroicons/react/24/solid';

interface MessageProps {
  content: string;
  isUser: boolean;
  timestamp: Date;
}

export default function Message({ content, isUser, timestamp }: MessageProps) {
  const formatTimestamp = (date: Date) => {
    const now = new Date();
    const messageDate = new Date(date);
    const diffInDays = Math.floor((now.getTime() - messageDate.getTime()) / (1000 * 60 * 60 * 24));
    
    if (diffInDays === 0) {
      return `Today at ${format(messageDate, 'h:mm a')}`;
    } else if (diffInDays === 1) {
      return `Yesterday at ${format(messageDate, 'h:mm a')}`;
    } else if (diffInDays < 7) {
      return `${formatDistanceToNow(messageDate, { addSuffix: true })}`;
    } else {
      return format(messageDate, 'MMM d, yyyy h:mm a');
    }
  };

  return (
    <div className={`group w-full px-4 ${isUser ? 'bg-white dark:bg-gray-900' : 'bg-gray-50 dark:bg-gray-800'}`}>
      <div className={`max-w-4xl mx-auto py-3 ${!isUser ? 'flex items-start gap-3' : ''}`}>
        {!isUser && (
          <div className="flex-shrink-0 pt-1">
            <div className="h-8 w-8 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
              <BoltIcon className="h-4 w-4 text-blue-600 dark:text-blue-300" />
            </div>
          </div>
        )}
        
        <div className={`flex-1 min-w-0 ${isUser ? 'flex justify-end' : ''}`}>
          <div className={isUser ? 'text-right' : ''}>
            {!isUser && (
              <p className="text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">
                NeuralFit AI
              </p>
            )}
            
            <div 
              className={`inline-block rounded-2xl px-4 py-2.5 ${
                isUser 
                  ? 'bg-blue-600 text-white rounded-br-none' 
                  : 'bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-tl-none shadow-sm border border-gray-200 dark:border-gray-600'
              }`}
            >
              <div className="prose prose-sm dark:prose-invert max-w-none">
                <div className="whitespace-pre-wrap break-words">
                  {content}
                </div>
              </div>
              
              <div 
                className={`mt-1.5 text-xs flex items-center ${
                  isUser 
                    ? 'text-blue-200 dark:text-blue-300 justify-end' 
                    : 'text-gray-500 dark:text-gray-400 justify-start'
                }`}
              >
                <span className="opacity-80">
                  {formatTimestamp(new Date(timestamp))}
                </span>
              </div>
            </div>
          </div>
        </div>
        
        {isUser && (
          <div className="flex-shrink-0 pt-1">
            <div className="h-8 w-8 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
              <UserCircleIcon className="h-5 w-5 text-gray-600 dark:text-gray-300" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
