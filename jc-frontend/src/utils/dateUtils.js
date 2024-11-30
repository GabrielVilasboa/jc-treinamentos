
export const getDayName = (dayNumber) => {
    const days = [
      'Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira',
      'Quinta-feira', 'Sexta-feira', 'Sábado'
    ];
    return days[dayNumber] || ''; 
  };

  
export const formatDate = (date , format ) => {
  switch (format) {
    case 'yyyy-MM-dd':
      return date.split('T')[0]
    default :
    const [year, month, day] = date.split('T')[0].split('-');
    return `${day}/${month}/${year}`
  }
};
  