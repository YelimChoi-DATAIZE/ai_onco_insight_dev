// ClipboardContext.js
import React, { createContext, useState, useContext } from 'react';

const ClipboardContext = createContext();

export const ClipboardProvider = ({ children }) => {
  const [copiedItems, setCopiedItems] = useState([]);

  return (
    <ClipboardContext.Provider value={{ copiedItems, setCopiedItems }}>
      {children}
    </ClipboardContext.Provider>
  );
};

export const useClipboard = () => {
  const context = useContext(ClipboardContext);
  if (!context) {
    throw new Error('useClipboard must be used within a ClipboardProvider');
  }
  return context;
};
