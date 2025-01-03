const moneyFormatter = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL',
});

export const formatMoney = (value: number) => {
  return moneyFormatter.format(value);
};

export const formatSecondsInMinutes = (seconds: number) => {
  return Math.floor(seconds / 60);
};

export const formatMetersInKilometers = (meters: number) => {
  return (meters / 1000).toFixed(2);
};

export const formatDateIntoDateAndHour = (date: Date) => {
  const hours = date.getHours();
  const minutes = date.getMinutes();

  const day = date.toLocaleDateString('pt-BR');

  return `${hours}:${minutes} - ${day}`;
};
