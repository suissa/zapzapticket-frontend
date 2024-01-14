import React from 'react';
import { render, screen } from '@testing-library/react';
import Button from '../../components/Button'; // Ajuste o caminho conforme a estrutura do seu projeto

describe('Button Component', () => {
  test('renders correctly', () => {
    render(<Button>Click me</Button>);
    const buttonElement = screen.getByText('Click me');
    expect(buttonElement).toBeInTheDocument();
  });

  test('applies className', () => {
    render(<Button className="extra-class">Click me</Button>);
    const buttonElement = screen.getByText('Click me');
    expect(buttonElement).toHaveClass('extra-class');
  });

  test('applies color prop', () => {
    render(<Button color="gray">Click me</Button>);
    const buttonElement = screen.getByText('Click me');
    expect(buttonElement).toHaveClass('from-purple-500 to-purple-700');
  });

});

