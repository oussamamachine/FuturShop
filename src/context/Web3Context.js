import { createContext, useState } from 'react';
import { BrowserProvider } from 'ethers'; 

export const Web3Context = createContext();

export function Web3Provider({ children }) {
  const [web3, setWeb3] = useState(null);
  
  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        const provider = new BrowserProvider(window.ethereum); 
        await provider.send("eth_requestAccounts", []);
        setWeb3(provider);
        return true;
      } catch (error) {
        console.error("Error connecting wallet:", error);
        return false;
      }
    } else {
      alert("Please install MetaMask!");
      return false;
    }
  };

  return (
    <Web3Context.Provider value={{ web3, connectWallet }}>
      {children}
    </Web3Context.Provider>
  );
}