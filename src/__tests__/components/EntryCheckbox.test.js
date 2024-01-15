import React from 'react';
import { render, screen } from '@testing-library/react';
import EntryCheckbox from '../../components/EntryCheckbox';

describe('EntryCheckbox Component', () => {
  test('renders correctly', () => {
    render(<EntryCheckbox text="Check me" />);
    const labelElement = screen.getByText('Check me');
    const checkboxElement = screen.getByRole('checkbox');
    expect(labelElement).toBeInTheDocument();
    expect(checkboxElement).toBeInTheDocument();
  });

  test('applies className', () => {
    render(<EntryCheckbox text="Check me" className="custom-class" />);
    const divElement = screen.getByText('Check me').parentElement;
    expect(divElement).toHaveClass('custom-class');
  });

  test('checkbox can be checked', () => {
    render(<EntryCheckbox text="Check me" />);
    const checkboxElement = screen.getByRole('checkbox');
    expect(checkboxElement.checked).toBe(false);
    screen.getByText('Check me').click();
    expect(checkboxElement.checked).toBe(true);
  });

});
