import React from 'react';
import { render, screen } from '@testing-library/react';
import EntrySelect from '../../components/EntrySelect';

describe('EntrySelect Component', () => {
  const selectOptions = [
    { value: 'option1', label: 'Option 1' },
    { value: 'option2', label: 'Option 2' },
  ];

  test('renders correctly', () => {
    render(<EntrySelect text="Select an option" selectOptions={selectOptions} />);
    const labelElement = screen.getByText('Select an option');
    const selectElement = screen.getByRole('combobox');
    expect(labelElement).toBeInTheDocument();
    expect(selectElement).toBeInTheDocument();
  });

  test('renders all select options', () => {
    render(<EntrySelect text="Select an option" selectOptions={selectOptions} />);
    const optionElements = screen.getAllByRole('option');
    expect(optionElements.length).toBe(selectOptions.length);
    expect(optionElements[0]).toHaveTextContent('Option 1');
    expect(optionElements[1]).toHaveTextContent('Option 2');
  });

  test('applies className', () => {
    render(<EntrySelect text="Select an option" className="custom-class" selectOptions={selectOptions} />);
    const divElement = screen.getByText('Select an option').parentElement;
    expect(divElement).toHaveClass('custom-class');
  });

});
