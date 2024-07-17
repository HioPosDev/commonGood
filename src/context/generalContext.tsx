/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { createContext, useState, useContext } from 'react';

interface GeneralContextType {
  register: any;
  isRegitered: boolean;
  setIsRegistered: (value: boolean) => void;
  registerHandler: (value: any) => void;
  tableNumber: number | undefined;
  numberTableHandler: (room: number, table: number) => void;
  roomNumber: number | undefined;
  publicVapidKey: string | undefined;
  publicVapidKeyHandler: (value: string) => void;
  setiOSDevice: (value: boolean) => void;
  iOSDevice: boolean | undefined;
}

const GeneralContext = createContext<GeneralContextType | undefined>(undefined);

export const GeneralProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [register, setRegister] = useState<any>();
  const [isRegitered, setIsRegistered] = useState<boolean>(false);
  const [tableNumber, setTableNumber] = useState<number | undefined>();
  const [roomNumber, setRoomNumber] = useState<number | undefined>();
  const [publicVapidKey, setPublicVapidKey] = useState<string | undefined>();
  const [iOSDevice, setiOSDevice] = useState<boolean | undefined>();

  const registerHandler = (value: any) => {
    setRegister(value);
  };

  const numberTableHandler = (room: number, table: number): void => {
    setTableNumber(table);
    setRoomNumber(room);
  }

  const publicVapidKeyHandler = (value: string): void => {
    setPublicVapidKey(value);
  }

  return (
    <GeneralContext.Provider value={{ register, registerHandler, isRegitered, setIsRegistered, tableNumber, numberTableHandler, publicVapidKey, publicVapidKeyHandler, roomNumber, iOSDevice, setiOSDevice }}>
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
