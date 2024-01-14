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

  // Teste adicional para verificar as cores, se necessário
  test('applies color prop', () => {
    render(<Button color="green">Click me</Button>);
    const buttonElement = screen.getByText('Click me');
    // Verifique aqui se a classe ou estilo relacionado à cor 'green' é aplicado corretamente
    // Como exemplo, estou apenas verificando se a classe 'bg-green-500' está presente
    // Você precisará ajustar isso com base em como o 'color' prop afeta o componente
    expect(buttonElement).toHaveClass('bg-green-500');
  });

  // ... Você pode adicionar mais testes conforme necessário ...
});

