'use client';
import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { MessagePage } from '@/components/message/message.page';

interface GlobalContextType {
  user: any;
  isLogin: boolean;
  setUser: React.Dispatch<React.SetStateAction<any>>;
  setIsLogin: React.Dispatch<React.SetStateAction<boolean>>;
  isShowMessage: Boolean;
  setIsShowMessage: React.Dispatch<React.SetStateAction<boolean>>;
  handleShowMessage: Function;
  type: number;
  message: string;
  setType: React.Dispatch<React.SetStateAction<number>>;
  setMessage: React.Dispatch<React.SetStateAction<string>>;
}

const GlobalContext = createContext<GlobalContextType | undefined>(undefined);

interface GlobalProviderProps {
  children: ReactNode;
}

export const GlobalProvider: React.FC<GlobalProviderProps> = ({ children }) => {
  const [user, setUser] = useState<any>(null);
  const [isLogin, setIsLogin] = useState<boolean>(false);
  const [isShowMessage, setIsShowMessage] = useState<boolean>(false);
  const [type, setType] = useState<number>(1);
  const [message, setMessage] = useState<string>('');
  const handleShowMessage = (type: number, message: string) => {
      setType(type);
      setMessage(message);
      setIsShowMessage(true);
      setTimeout(() => {
        setIsShowMessage(false);
      }, 3000)
  }

  return (
    <GlobalContext.Provider value={
      { 
        user, 
        isLogin, 
        setUser, 
        setIsLogin, 
        isShowMessage, 
        setIsShowMessage, 
        handleShowMessage,
        type,
        setType,
        message,
        setMessage
      }}>
      <div style={{ width: '100%', height: '100%', minHeight: '100vh', position: 'relative' }}>
        <MessagePage type={type} message={message}></MessagePage>
        {children}
      </div>
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = (): GlobalContextType => {
  const context = useContext(GlobalContext);
  if (!context) {
    throw new Error('useGlobalContext must be used within a GlobalProvider');
  }
  return context;
};
