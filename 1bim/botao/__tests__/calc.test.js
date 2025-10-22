const {
  calculateIMC,
  getIMCClassification,
  calculateCaloriesIngested,
  calculateCaloriesBurned,
  calculateCalorieBalance,
} = require('../src/utils/format');

describe('Cálculos de IMC', () => {
  test('deve calcular IMC corretamente', () => {
    expect(calculateIMC(70, 1.75)).toBeCloseTo(22.86, 2);
    expect(calculateIMC(80, 1.80)).toBeCloseTo(24.69, 2);
    expect(calculateIMC(60, 1.60)).toBeCloseTo(23.44, 2);
  });

  test('deve retornar 0 para altura inválida', () => {
    expect(calculateIMC(70, 0)).toBe(0);
    expect(calculateIMC(70, -1)).toBe(0);
  });

  test('deve classificar IMC corretamente', () => {
    expect(getIMCClassification(20)).toBe('Abaixo do peso');
    expect(getIMCClassification(24)).toBe('Peso ideal');
    expect(getIMCClassification(25)).toBe('Peso ideal');
    expect(getIMCClassification(26)).toBe('Peso ideal');
    expect(getIMCClassification(27)).toBe('Acima do peso');
  });
});

describe('Cálculos de Calorias', () => {
  test('deve calcular calorias ingeridas corretamente', () => {
    expect(calculateCaloriesIngested(100, 200, 50)).toBe(1050); // (100 + 200 + 50) * 3
    expect(calculateCaloriesIngested(0, 0, 0)).toBe(0);
    expect(calculateCaloriesIngested(300, 400, 100)).toBe(2400);
  });

  test('deve calcular calorias gastas corretamente', () => {
    expect(calculateCaloriesBurned(1000)).toBe(80); // 1000 * 0.08
    expect(calculateCaloriesBurned(0)).toBe(0);
    expect(calculateCaloriesBurned(10000)).toBe(800);
  });

  test('deve calcular saldo calórico corretamente', () => {
    expect(calculateCalorieBalance(1000, 500)).toBe(500);
    expect(calculateCalorieBalance(500, 1000)).toBe(-500);
    expect(calculateCalorieBalance(1000, 1000)).toBe(0);
  });
});
