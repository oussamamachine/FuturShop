import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import App from './App';

// Mock the contexts to avoid provider errors in tests
jest.mock('./context/Web3Context', () => ({
  Web3Provider: ({ children }) => children
}));

jest.mock('./context/AIContext', () => ({
  AIContextProvider: ({ children }) => children
}));

jest.mock('./context/CartContext', () => ({
  CartProvider: ({ children }) => children
}));

const renderWithRouter = (component) => {
  return render(
    <BrowserRouter>
      {component}
    </BrowserRouter>
  );
};

test('renders app without crashing', () => {
  renderWithRouter(<App />);
  expect(document.body).toBeInTheDocument();
});

test('renders navigation', () => {
  renderWithRouter(<App />);
  // Add more specific tests based on your navigation structure
});
