/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { createContext, useState, useContext } from 'react';

interface GeneralContextType {
  register: any;
  isRegitered: boolean;
  setIsRegistered: (value: boolean) => void;
  registerHandler: (value: any) => void;
}

const GeneralContext = createContext<GeneralContextType | undefined>(undefined);

export const GeneralProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [register, setRegister] = useState<any>();
  const [isRegitered, setIsRegistered] = useState<boolean>(false);
  
  const registerHandler = (value: any) => {
    setRegister(value);
  };

  return (
    <GeneralContext.Provider value={{ register, registerHandler, isRegitered, setIsRegistered }}>
      {children}
    </GeneralContext.Provider>
  );
};

export const useGeneralContext = () => {
  const context = useContext(GeneralContext);
  if (!context) {
    throw new Error('useGeneralContext debe ser utilizado dentro de un GeneralProvider');
  }
  return context;
};

export default GeneralContext;
