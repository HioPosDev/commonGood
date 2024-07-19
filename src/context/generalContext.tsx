/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { createContext, useState, useContext } from 'react';

interface GeneralContextType {
  register: any;
  isRegistered: boolean;
  setIsRegistered: (value: boolean) => void;
  registerHandler: (value: any) => void;
  tableNumber: number | undefined;
  numberTableHandler: (room: number, table: number) => void;
  roomNumber: number | undefined;
  publicVapidKey: string | undefined;
  publicVapidKeyHandler: (value: string) => void;
  notificationsAccepted: boolean;
  setNotificationsAccepted: (value: boolean) => void;
}

const GeneralContext = createContext<GeneralContextType | undefined>(undefined);

export const GeneralProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [register, setRegister] = useState<any>();
  const [isRegistered, setIsRegistered] = useState<boolean>(false);
  const [tableNumber, setTableNumber] = useState<number | undefined>();
  const [roomNumber, setRoomNumber] = useState<number | undefined>();
  const [publicVapidKey, setPublicVapidKey] = useState<string | undefined>();
  const [notificationsAccepted, setNotificationsAccepted] = useState<boolean>(false);

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
    <GeneralContext.Provider value={{ notificationsAccepted, setNotificationsAccepted, register, registerHandler, isRegistered, setIsRegistered, tableNumber, numberTableHandler, publicVapidKey, publicVapidKeyHandler, roomNumber }}>
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
