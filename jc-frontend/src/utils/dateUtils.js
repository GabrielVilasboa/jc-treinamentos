import {format, startOfMonth, addMonths, parse, subDays} from "date-fns";

export const defaultFormat = 'yyyy-MM-dd'

export const getDayName = (dayNumber) => {
    const days = [
      'Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira',
      'Quinta-feira', 'Sexta-feira', 'Sábado'
    ];
    return days[dayNumber] || ''; 
  };

  
export const formatDate = (date , format ) => {
  switch (format) {
    case defaultFormat:
      return date.split('T')[0]
    default :
    const [year, month, day] = date.split('T')[0].split('-');
    return `${day}/${month}/${year}`
  }
};

export const subDay = (date, numbersOfDay) => {
  return format(subDays(date, numbersOfDay), defaultFormat)
}

export const formatTime = (timeStr) => {
  const time = parse(timeStr, 'HH:mm:ss', new Date());
  return format(time, "HH:mm")
}

export const today = format(new Date(), defaultFormat);
export const yesterday = format(subDays(new Date(), 1), defaultFormat)
export const firstDayMonth = format(startOfMonth(new Date()), defaultFormat)
export const firstDayOfNextMonth = format(startOfMonth(addMonths(new Date(),1)), defaultFormat)