
import React, { useState, useRef, useEffect } from 'react';
import { BotIcon, SendIcon, XIcon } from './Icons';
import { chatWithAIAssistant } from '../services/geminiService';

interface Message {
  text: string;
  sender: 'user' | 'ai';
}

const AIAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { text: "Hello! I'm Exporizz's AI Assistant. How can I help you with your export journey today?", sender: 'ai' }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(scrollToBottom, [messages]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim() === '' || isLoading) return;

    const userMessage: Message = { text: inputValue, sender: 'user' };
    setMessages(prev => [...prev, userMessage]);
    const currentInput = inputValue;
    setInputValue('');
    setIsLoading(true);

    try {
      const aiText = await chatWithAIAssistant(currentInput);
      const aiResponse: Message = { text: aiText, sender: 'ai' };
      setMessages(prev => [...prev, aiResponse]);
    } catch (error) {
      console.error(error);
      const errorResponse: Message = { text: "Sorry, I'm having trouble connecting right now. Please try again later.", sender: 'ai' };
      setMessages(prev => [...prev, errorResponse]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 bg-gradient-to-br from-brand-teal to-brand-purple text-white p-4 rounded-full shadow-2xl hover:scale-110 transform transition-transform duration-300 z-50 animate-pulse-glow"
        aria-label="Open AI Assistant"
      >
        <BotIcon className="w-8 h-8" />
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm z-[999] flex items-center justify-center animate-fade-in">
          <div className="bg-white dark:bg-brand-gray-900 w-full max-w-lg h-[80vh] rounded-2xl shadow-2xl flex flex-col overflow-hidden border border-brand-teal/20">
            <header className="p-4 bg-gray-50 dark:bg-brand-gray-800 flex justify-between items-center border-b border-gray-200 dark:border-brand-gray-700">
              <div className="flex items-center gap-3">
                <BotIcon className="w-6 h-6 text-brand-purple" />
                <h2 className="text-lg font-bold text-gray-800 dark:text-gray-100">AI Assistant</h2>
              </div>
              <button onClick={() => setIsOpen(false)} className="text-gray-500 hover:text-gray-800 dark:hover:text-gray-200">
                <XIcon className="w-6 h-6" />
              </button>
            </header>
            
            <div className="flex-1 p-4 overflow-y-auto space-y-4">
              {messages.map((msg, index) => (
                <div key={index} className={`flex items-start gap-3 ${msg.sender === 'user' ? 'justify-end' : ''}`}>
                  {msg.sender === 'ai' && <div className="w-8 h-8 rounded-full bg-gradient-to-br from-brand-teal to-brand-purple flex-shrink-0 flex items-center justify-center text-white"><BotIcon className="w-5 h-5"/></div>}
                  <div className={`max-w-[80%] p-3 rounded-2xl ${msg.sender === 'user' ? 'bg-brand-purple text-white rounded-br-none' : 'bg-gray-200 dark:bg-brand-gray-800 text-gray-800 dark:text-gray-200 rounded-bl-none'}`}>
                    <p className="text-sm" dangerouslySetInnerHTML={{ __html: msg.text.replace(/\n/g, '<br />') }} />
                  </div>
                </div>
              ))}
              {isLoading && (
                  <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-brand-teal to-brand-purple flex-shrink-0 flex items-center justify-center text-white"><BotIcon className="w-5 h-5"/></div>
                      <div className="max-w-[80%] p-3 rounded-2xl bg-gray-200 dark:bg-brand-gray-800 text-gray-800 dark:text-gray-200 rounded-bl-none">
                          <div className="flex items-center space-x-1">
                              <span className="w-2 h-2 bg-brand-teal rounded-full animate-bounce delay-0"></span>
                              <span className="w-2 h-2 bg-brand-teal rounded-full animate-bounce delay-150"></span>
                              <span className="w-2 h-2 bg-brand-teal rounded-full animate-bounce delay-300"></span>
                          </div>
                      </div>
                  </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            <footer className="p-4 bg-white dark:bg-brand-gray-900 border-t border-gray-200 dark:border-brand-gray-700">
              <form onSubmit={handleSendMessage} className="flex items-center gap-2">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Ask me anything about exporting..."
                  className="flex-1 bg-gray-100 dark:bg-brand-gray-800 border border-gray-300 dark:border-brand-gray-600 rounded-full py-2 px-4 focus:ring-2 focus:ring-brand-purple focus:outline-none"
                  disabled={isLoading}
                />
                <button type="submit" className="bg-brand-purple text-white p-2.5 rounded-full hover:bg-opacity-90 disabled:bg-opacity-50 transition-colors" disabled={isLoading}>
                  <SendIcon className="w-5 h-5" />
                </button>
              </form>
            </footer>
          </div>
        </div>
      )}
    </>
  );
};

export default AIAssistant;
