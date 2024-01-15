import React from 'react';
import { render, screen } from '@testing-library/react';
import EntryInput from '../../components/EntryInput'; // Ajuste o caminho conforme a estrutura do seu projeto

describe('EntryInput Component', () => {
  test('renders correctly', () => {
    render(<EntryInput text="Label Text" />);
    const labelElement = screen.getByText('Label Text');
    const inputElement = screen.getByRole('textbox');
    expect(labelElement).toBeInTheDocument();
    expect(inputElement).toBeInTheDocument();
  });

  test('displays label text', () => {
    render(<EntryInput text="Label Text" />);
    const labelElement = screen.getByText('Label Text');
    expect(labelElement).toBeInTheDocument();
  });

  test('applies readOnly prop', () => {
    render(<EntryInput text="Label Text" readOnly />);
    const inputElement = screen.getByRole('textbox');
    expect(inputElement).toHaveAttribute('readOnly');
  });

  test('applies custom className', () => {
    render(<EntryInput text="Label Text" className="custom-class" />);
    const divElement = screen.getByText('Label Text').closest('div');
    expect(divElement).toHaveClass('custom-class');
  });

});
