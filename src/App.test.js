import { fireEvent, render, screen, cleanup } from '@testing-library/react';
import App from './App';

beforeEach(() => {
  localStorage.clear();
  Object.defineProperty(global, 'crypto', { configurable: true, value: { randomUUID: () => 'test-id' } });
});
afterEach(cleanup);
test('named delete controls remove only the chosen transaction and persist the change', () => {
  const lunch = { id: 'lunch', text: 'Lunch', amount: -12.5, category: 'Food' };
  const salary = { id: 'salary', text: 'Salary', amount: 100, category: 'General' };
  localStorage.setItem('expense-tracker-v1', JSON.stringify([lunch, salary]));
  const view = render(<App />);

  fireEvent.click(screen.getByRole('button', { name: 'Delete transaction: Lunch' }));

  expect(screen.queryByText('Lunch')).toBeNull();
  expect(screen.getByRole('button', { name: 'Delete transaction: Salary' })).toBeTruthy();
  expect(screen.getByText(/Your Balance/).textContent).toContain('100.00');
  expect(JSON.parse(localStorage.getItem('expense-tracker-v1'))).toEqual([salary]);
  view.unmount();
  render(<App />);
  expect(screen.queryByText('Lunch')).toBeNull();
  expect(screen.getByRole('button', { name: 'Delete transaction: Salary' })).toBeTruthy();
});
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
