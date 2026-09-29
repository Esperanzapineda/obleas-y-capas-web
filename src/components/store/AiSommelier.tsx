'use client';

import { useState, useRef, useEffect } from 'react';
import { Sparkles, X, Send, Bot, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export function AiSommelier() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [input, setInput] = useState<string>('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  const customHandleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setInput(e.target.value);
  };

  const customHandleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = { role: 'user', content: input };
    const newMessages = [...messages, userMessage];
    
    setMessages(newMessages);
    setInput('');
    setIsLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: newMessages }),
      });

      const data = await res.json();

      if (data.text) {
        setMessages((prev) => [...prev, { role: 'assistant', content: data.text }]);
      }
    } catch (error) {
      console.error('Error al contactar al Sommelier:', error);
      setMessages((prev) => [
        ...prev, 
        { role: 'assistant', content: 'Uf, tuve un pequeño mareo de azúcar. ¿Puedes repetirlo? 😅' }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      
      {isOpen && (
        <div className="mb-4 flex h-[450px] w-[350px] flex-col overflow-hidden rounded-2xl border bg-white shadow-2xl sm:w-[400px]">
          
          <div className="flex items-center justify-between bg-amber-500 px-4 py-3 text-white">
            <div className="flex items-center gap-2">
              <Sparkles className="h-5 w-5" />
              <h3 className="font-bold">Sommelier de Obleas</h3>
            </div>
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-8 w-8 text-white hover:bg-amber-600 hover:text-white" 
              onClick={() => setIsOpen(false)}
            >
              <X className="h-5 w-5" />
            </Button>
          </div>

          <ScrollArea className="flex-1 p-4">
            {messages.length === 0 ? (
              <div className="mt-10 flex h-full flex-col items-center justify-center space-y-3 text-center text-slate-500">
                <Bot className="h-12 w-12 text-amber-300" />
                <p className="text-sm">¡Hola! Soy tu sommelier experto.<br/>Cuéntame, ¿qué se te antoja hoy o cómo te sientes?</p>
              </div>
            ) : (
              <div className="flex flex-col gap-4 pb-4">
                {messages.map((m, index) => (
                  <div key={index} className={`flex gap-2 ${m.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                    <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${m.role === 'user' ? 'bg-slate-100' : 'bg-amber-100 text-amber-600'}`}>
                      {m.role === 'user' ? <User className="h-5 w-5 text-slate-600" /> : <Bot className="h-5 w-5" />}
                    </div>
                    <div className={`max-w-[80%] rounded-2xl px-4 py-2 text-sm ${m.role === 'user' ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-800 whitespace-pre-wrap'}`}>
                      {m.content}
                    </div>
                  </div>
                ))}
                
                {isLoading && (
                  <div className="flex gap-2">
                     <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-amber-100 text-amber-600">
                      <Bot className="h-5 w-5" />
                    </div>
                    <div className="rounded-2xl bg-slate-100 px-4 py-2 text-sm text-slate-500">
                      Preparando tu recomendación...
                    </div>
                  </div>
                )}
                <div ref={scrollRef} />
              </div>
            )}
          </ScrollArea>

          <div className="border-t p-3">
            <form onSubmit={customHandleSubmit} className="flex gap-2">
              <Input
                value={input}
                onChange={customHandleChange}
                placeholder="Escribe tu antojo..."
                className="flex-1"
                disabled={isLoading}
              />
              <Button type="submit" size="icon" disabled={isLoading || !input.trim()} className="bg-amber-500 hover:bg-amber-600">
                <Send className="h-4 w-4" />
              </Button>
            </form>
          </div>
        </div>
      )}

      {!isOpen && (
        <Button
          onClick={() => setIsOpen(true)}
          className="h-14 w-14 rounded-full bg-amber-500 shadow-lg transition-transform hover:scale-105 hover:bg-amber-600"
        >
          <Sparkles className="h-6 w-6 text-white" />
        </Button>
      )}
    </div>
  );
}