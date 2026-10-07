import { fireEvent, render, screen, cleanup } from '@testing-library/react';
import App from './App';

beforeEach(() => {
  localStorage.clear();
  Object.defineProperty(global, 'crypto', { configurable: true, value: { randomUUID: () => 'test-id' } });
});
afterEach(cleanup);
test('decimal expense survives a remount', () => {
  const view = render(<App />);
  fireEvent.change(screen.getByLabelText('Transaction'), { target: { value: 'Lunch' } });
  fireEvent.change(screen.getByLabelText(/Amount/), { target: { value: '-12.50' } });
  fireEvent.click(screen.getByText('Add Transaction'));
  expect(JSON.parse(localStorage.getItem('expense-tracker-v1'))[0].amount).toBe(-12.5);
  view.unmount();
  render(<App />);
  expect(screen.getByText(/Your Balance/).textContent).toContain('-12.50');
});
test('corrupt storage does not prevent rendering', () => {
  localStorage.setItem('expense-tracker-v1','broken');
  render(<App />);
  expect(screen.getByText(/Your Balance/).textContent).toContain('0.00');
});
test('blank description is rejected', () => {
  render(<App />);
  fireEvent.change(screen.getByLabelText('Transaction'), { target: { value: '   ' } });
  fireEvent.change(screen.getByLabelText(/Amount/), { target: { value: '12.5' } });
  fireEvent.click(screen.getByText('Add Transaction'));
  expect(screen.getByRole('alert').textContent).toContain('description');
});
