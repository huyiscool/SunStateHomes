import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from './App';

// Mock react-router-dom to replace BrowserRouter with MemoryRouter for testing
vi.mock('react-router-dom', async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    BrowserRouter: actual.MemoryRouter, // Use MemoryRouter in place of BrowserRouter
  };
});

describe('App', () => {
  it('renders App component', () => {
    render(<App />);
    // You can add more specific assertions here based on your App component's content
    // For example, check for a specific text or element that should be present.
    // expect(screen.getByText(/Bay Area Realty/i)).toBeInTheDocument();
  });
});