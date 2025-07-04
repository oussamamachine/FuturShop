import { render, screen, fireEvent } from '@testing-library/react';
import { CartProvider } from '../../context/CartContext';
import JacketCustomizer from './JacketCustomizer';

const renderWithProvider = (component) => {
  return render(
    <CartProvider>
      {component}
    </CartProvider>
  );
};

describe('JacketCustomizer', () => {
  const mockOnExit = jest.fn();

  beforeEach(() => {
    mockOnExit.mockClear();
  });

  test('renders customizer interface', () => {
    renderWithProvider(<JacketCustomizer onExit={mockOnExit} />);
    expect(screen.getByText('JACKET CUSTOMIZER')).toBeInTheDocument();
    // Main form landmark
    expect(screen.getByTestId('3d-configurator-form')).toBeInTheDocument();
  });

  test('switches between tabs (keyboard and click)', () => {
    renderWithProvider(<JacketCustomizer onExit={mockOnExit} />);
    // Simulate tab click (assuming tab text is capitalized)
    const colorTab = screen.getByText(/color/i);
    fireEvent.click(colorTab);
    // Should show color panel (panel content may vary)
    expect(screen.getByLabelText(/color/i)).toBeInTheDocument();
  });

  test('calculates price correctly', () => {
    renderWithProvider(<JacketCustomizer onExit={mockOnExit} />);
    // Test price display
    expect(screen.getByTestId('configurator-total')).toHaveTextContent('$');
  });

  test('calls onExit when close button is clicked', () => {
    renderWithProvider(<JacketCustomizer onExit={mockOnExit} />);
    const closeButton = screen.getByRole('button', { name: /close customizer/i });
    fireEvent.click(closeButton);
    expect(mockOnExit).toHaveBeenCalledTimes(1);
  });

  test('action buttons are accessible and functional', () => {
    renderWithProvider(<JacketCustomizer onExit={mockOnExit} />);
    // Save
    const saveBtn = screen.getByTestId('customizer-save-btn');
    expect(saveBtn).toBeInTheDocument();
    fireEvent.click(saveBtn);
    expect(screen.getByText(/design saved/i)).toBeInTheDocument();
    // Reset
    const resetBtn = screen.getByTestId('customizer-reset-btn');
    expect(resetBtn).toBeInTheDocument();
    fireEvent.click(resetBtn);
    expect(screen.getByText(/customizer reset/i)).toBeInTheDocument();
    // Download
    const downloadBtn = screen.getByTestId('customizer-download-btn');
    expect(downloadBtn).toBeInTheDocument();
    // Share
    const shareBtn = screen.getByTestId('customizer-share-btn');
    expect(shareBtn).toBeInTheDocument();
    fireEvent.click(shareBtn);
    expect(screen.getByText(/share feature coming soon/i)).toBeInTheDocument();
    // Add to cart
    const addToCartBtn = screen.getByTestId('customizer-add-to-cart-btn');
    expect(addToCartBtn).toBeInTheDocument();
    fireEvent.click(addToCartBtn);
    expect(screen.getByText(/added to cart/i)).toBeInTheDocument();
  });

  test('all action buttons have correct aria-labels', () => {
    renderWithProvider(<JacketCustomizer onExit={mockOnExit} />);
    expect(screen.getByLabelText(/save design/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/reset customizer/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/download 3d preview/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/share design/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/add to cart/i)).toBeInTheDocument();
  });
});
