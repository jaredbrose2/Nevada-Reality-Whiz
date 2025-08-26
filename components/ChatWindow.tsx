
import React, { useState, useEffect, useRef, useCallback } from 'react';
import type { Chat } from "@google/genai";
import { Module, ChatMessage, MessageSender } from '../types';
import { geminiService } from '../services/geminiService';
import { LoadingSpinner } from './LoadingSpinner';

interface ChatWindowProps {
  module: Module;
}

const PaperAirplaneIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5" />
    </svg>
);


export const ChatWindow: React.FC<ChatWindowProps> = ({ module }) => {
  const [chat, setChat] = useState<Chat | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [userInput, setUserInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const initializeChat = useCallback(async () => {
    setIsLoading(true);
    setMessages([]);
    
    const newChat = geminiService.startChat();
    setChat(newChat);

    const initialMessage: ChatMessage = {
      id: Date.now().toString(),
      text: '',
      sender: MessageSender.AI,
    };
    setMessages([initialMessage]);
    
    try {
        const stream = await newChat.sendMessageStream({ message: module.prompt });
        let text = '';
        for await (const chunk of stream) {
            text += chunk.text;
            setMessages([{...initialMessage, text: text}]);
        }
    } catch (error) {
        console.error("Failed to send initial message:", error);
        setMessages([{...initialMessage, text: "Sorry, I'm having trouble connecting. Please try again."}]);
    } finally {
        setIsLoading(false);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [module]);

  useEffect(() => {
    initializeChat();
  }, [initializeChat]);


  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userInput.trim() || !chat || isLoading) return;

    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      text: userInput,
      sender: MessageSender.USER,
    };

    setMessages(prev => [...prev, userMessage]);
    setUserInput('');
    setIsLoading(true);

    const aiMessage: ChatMessage = {
      id: `ai-${Date.now()}`,
      text: '',
      sender: MessageSender.AI,
    };

    setMessages(prev => [...prev, aiMessage]);

    try {
        const stream = await chat.sendMessageStream({ message: userInput });
        let text = '';
        for await (const chunk of stream) {
            text += chunk.text;
            setMessages(prev => prev.map(msg => msg.id === aiMessage.id ? {...msg, text: text} : msg));
        }
    } catch(error) {
        console.error("Failed to send message:", error);
        setMessages(prev => prev.map(msg => msg.id === aiMessage.id ? {...msg, text: "Oops, something went wrong. Please try again."} : msg));
    } finally {
        setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-[65vh]">
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50 rounded-lg">
        {messages.map((msg, index) => (
          <div key={msg.id} className={`flex items-start gap-3 animate-fade-in ${msg.sender === MessageSender.USER ? 'justify-end' : 'justify-start'}`}>
            {msg.sender === MessageSender.AI && (
              <div className="w-8 h-8 rounded-full bg-brand-blue flex items-center justify-center flex-shrink-0 text-white font-bold">A</div>
            )}
            <div className={`max-w-xl p-3 rounded-2xl ${msg.sender === MessageSender.USER ? 'bg-brand-blue text-white rounded-br-none' : 'bg-gray-200 text-gray-800 rounded-bl-none'}`}>
              <p className="whitespace-pre-wrap">{msg.text}</p>
              {isLoading && index === messages.length - 1 && msg.sender === MessageSender.AI && !msg.text && (
                 <div className="flex items-center justify-center p-2">
                    <div className="w-2 h-2 bg-gray-500 rounded-full animate-pulse delay-0"></div>
                    <div className="w-2 h-2 bg-gray-500 rounded-full animate-pulse delay-150 ml-1"></div>
                    <div className="w-2 h-2 bg-gray-500 rounded-full animate-pulse delay-300 ml-1"></div>
                 </div>
              )}
            </div>
            {msg.sender === MessageSender.USER && (
              <div className="w-8 h-8 rounded-full bg-brand-gold flex items-center justify-center flex-shrink-0 text-brand-blue-dark font-bold">Y</div>
            )}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <div className="mt-4 border-t pt-4">
        <form onSubmit={handleSendMessage} className="flex items-center gap-2">
          <input
            type="text"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            placeholder="Ask a follow-up question..."
            className="flex-1 p-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-brand-blue-light"
            disabled={isLoading}
          />
          <button type="submit" disabled={isLoading || !userInput.trim()} className="bg-brand-blue hover:bg-brand-blue-dark text-white p-3 rounded-full disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors">
            <PaperAirplaneIcon className="w-6 h-6" />
          </button>
        </form>
      </div>
    </div>
  );
};
