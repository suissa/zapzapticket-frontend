import React from 'react';
import { render, screen } from '@testing-library/react';
import CalendarInput from '../../components/EntryCalendar';
import DatePicker from 'react-datepicker';

jest.mock('react-datepicker', () => {
  const originalModule = jest.requireActual('react-datepicker');

  const DatePickerMock = jest.fn(({ selected, onChange }) => {
    // Formatar a data como DD/MM/YYYY
    const formattedDate = selected.getDate().toString().padStart(2, '0') + '/' +
                          (selected.getMonth() + 1).toString().padStart(2, '0') + '/' +
                          selected.getFullYear().toString();

    return (
      <input
        type="text" // Mudar para 'text' para evitar a formatação automática do tipo 'date'
        value={formattedDate}
        onChange={e => {
          const [day, month, year] = e.target.value.split('/');
          onChange(new Date(year, month - 1, day));
        }}
      />
    );
  });

  return {
    __esModule: true,
    ...originalModule,
    DatePicker: DatePickerMock,
    registerLocale: jest.fn(),
  };
});

describe('CalendarInput Component', () => {
  test('renders correctly', () => {
    const testDate = new Date(2020, 5, 15); // Junho é 5 porque Janeiro é 0
    render(<CalendarInput text="Select Date" selected={testDate} />);
    const labelElement = screen.getByText('Select Date');
    const datePickerInput = screen.getByRole('textbox');
    expect(labelElement).toBeInTheDocument();
    expect(datePickerInput.value).toBe('06/15/2020'); // Verifica o formato DD/MM/YYYY
  });
  

  test('applies className', () => {
    render(<CalendarInput text="Select Date" selected={new Date()} className="custom-class" />);
    const divElement = screen.getByText('Select Date').parentElement;
    expect(divElement).toHaveClass('custom-class');
  });
});
