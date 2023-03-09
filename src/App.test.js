import { render, screen } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/WMI Data - Honda/i);
  expect(linkElement).toBeInTheDocument();
});

test('renders wmi data', () => {
  render(<App />);
  const linkElements = screen.getAllByText(/usa/i)
  expect(linkElements.length).toBeGreaterThan(10)
});

test('shows length > 0', () => {
  render(<App />);
  const linkElement = screen.getByText(/total\:\s+[0-9]/i)
  expect(linkElement).toBeInTheDocument()
});
