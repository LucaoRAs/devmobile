const formatNumber = (value, decimals = 2) => {
  return value.toFixed(decimals);
};

const formatCurrency = (value) => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value);
};

const formatWeight = (value) => {
  return `${formatNumber(value, 1)} kg`;
};

const formatHeight = (value) => {
  return `${formatNumber(value, 2)} m`;
};

const formatCalories = (value) => {
  return `${formatNumber(value, 0)} cal`;
};

const calculateIMC = (weight, height) => {
  if (height <= 0) return 0;
  return weight / (height * height);
};

const getIMCClassification = (imc) => {
  if (imc < 24) return 'Abaixo do peso';
  if (imc <= 26) return 'Peso ideal';
  return 'Acima do peso';
};

const calculateCaloriesIngested = (almoco, jantar, outros) => {
  return (almoco + jantar + outros) * 3;
};

const calculateCaloriesBurned = (passos) => {
  return passos * 0.08;
};

const calculateCalorieBalance = (ingested, burned) => {
  return ingested - burned;
};

module.exports = {
  formatNumber,
  formatCurrency,
  formatWeight,
  formatHeight,
  formatCalories,
  calculateIMC,
  getIMCClassification,
  calculateCaloriesIngested,
  calculateCaloriesBurned,
  calculateCalorieBalance,
};
