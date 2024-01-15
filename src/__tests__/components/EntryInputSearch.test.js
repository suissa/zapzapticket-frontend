import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import EntryInputSearch from '../../components/EntryInputSearch'; // Ajuste o caminho conforme a estrutura do seu projeto

describe('EntryInputSearch Component', () => {
  test('renders correctly', () => {
    render(<EntryInputSearch text="Search" />);
    const inputElement = screen.getByPlaceholderText('Search');
    expect(inputElement).toBeInTheDocument();
  });

  test('applies className', () => {
    render(<EntryInputSearch text="Search" className="custom-class" />);
    const divElement = screen.getByPlaceholderText('Search').parentElement;
    expect(divElement).toHaveClass('custom-class');
  });

  test('triggers onKeyDown event', () => {
    const onKeyDown = jest.fn();
    render(<EntryInputSearch text="Search" onKeyDown={onKeyDown} />);
    const inputElement = screen.getByPlaceholderText('Search');
    fireEvent.keyDown(inputElement, { key: 'Enter', code: 'Enter' });
    expect(onKeyDown).toHaveBeenCalled();
  });

  // Adicione mais testes conforme necessário...
});
