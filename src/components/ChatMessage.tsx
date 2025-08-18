import { motion } from "framer-motion";
import { User, Bot } from "lucide-react";
import { ChatMessage as ChatMessageType } from "@/utils/chatMatcher";

interface ChatMessageProps {
  message: ChatMessageType;
  isTyping?: boolean;
}

const ChatMessage = ({ message, isTyping = false }: ChatMessageProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.8 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className={`flex gap-3 mb-4 ${message.isUser ? 'justify-end' : 'justify-start'}`}
    >
      {!message.isUser && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.1, type: "spring", stiffness: 500 }}
          className="flex-shrink-0 w-8 h-8 rounded-full glass-morphism flex items-center justify-center"
        >
          <Bot className="w-4 h-4 text-primary" />
        </motion.div>
      )}
      
      <motion.div
        className={`max-w-[80%] rounded-2xl px-4 py-3 ${
          message.isUser
            ? 'bg-primary text-primary-foreground ml-auto'
            : 'glass-morphism-strong text-foreground'
        }`}
        whileHover={{ scale: 1.02 }}
        transition={{ type: "spring", stiffness: 400 }}
      >
        {isTyping ? (
          <div className="flex items-center gap-1">
            <motion.div
              className="w-2 h-2 bg-primary rounded-full"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1, repeat: Infinity, delay: 0 }}
            />
            <motion.div
              className="w-2 h-2 bg-primary rounded-full"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1, repeat: Infinity, delay: 0.2 }}
            />
            <motion.div
              className="w-2 h-2 bg-primary rounded-full"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1, repeat: Infinity, delay: 0.4 }}
            />
          </div>
        ) : (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-xs leading-relaxed whitespace-pre-wrap"
          >
            {message.text}
          </motion.p>
        )}
      </motion.div>

      {message.isUser && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.1, type: "spring", stiffness: 500 }}
          className="flex-shrink-0 w-8 h-8 rounded-full bg-primary flex items-center justify-center"
        >
          <User className="w-4 h-4 text-primary-foreground" />
        </motion.div>
      )}
    </motion.div>
  );
};

export default ChatMessage;