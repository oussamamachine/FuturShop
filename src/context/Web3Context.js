/**
 * Web3Context - React context for Ethereum wallet connection and provider.
 * Provides: web3 (ethers.js provider), connectWallet().
 * @module context/Web3Context
 */
import { createContext, useState, useCallback } from 'react';
import { BrowserProvider } from 'ethers';

export const Web3Context = createContext();

/**
 * Web3Provider - Provides web3 state and wallet connect logic.
 * @param {object} props
 * @param {React.ReactNode} props.children
 */
export function Web3Provider({ children }) {
  const [web3, setWeb3] = useState(null);

  /**
   * connectWallet - Prompts user to connect MetaMask and sets provider.
   * @returns {Promise<boolean>} Success
   */
  const connectWallet = useCallback(async () => {
    if (typeof window !== 'undefined' && window.ethereum) {
      try {
        const provider = new BrowserProvider(window.ethereum);
        await provider.send('eth_requestAccounts', []);
        setWeb3(provider);
        return true;
      } catch (error) {
        console.error('Error connecting wallet:', error);
        return false;
      }
    } else {
      alert('Please install MetaMask!');
      return false;
    }
  }, []);

  return (
    <Web3Context.Provider value={{ web3, connectWallet }}>
      {children}
    </Web3Context.Provider>
  );
}