import { createContext, ReactNode, useContext, useState } from 'react';

type ContextStoreValue = {
  randomValue: number;
  setRandomValue: React.Dispatch<React.SetStateAction<number>>;
};

const ContextStore = createContext<ContextStoreValue | undefined>(undefined);

type ContextStoreProviderProps = {
  children: ReactNode;
};

export function ContextStoreProvider({ children }: ContextStoreProviderProps) {
  const [randomValue, setRandomValue] = useState<number>(0);

  return (
    <ContextStore.Provider value={{ randomValue, setRandomValue }}>
      {children}
    </ContextStore.Provider>
  );
}


export default ContextStore;
