import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from './App';

// Mock react-router-dom to replace BrowserRouter with MemoryRouter for testing
vi.mock('react-router-dom', async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    BrowserRouter: actual.MemoryRouter, 
  };
});

describe('App', () => {
  it('renders App component', () => {
    render(<App />);
  });
});