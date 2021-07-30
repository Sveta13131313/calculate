//Задание 1
let money = 300000;
let income = '50000';
let addExpenses = ' Интернет 1000, Такси 2500, Коммуналка 5500';
let deposit = true;
let mission = 15000000;
let period = 10;


//Задание 2

console.log('money = ', typeof money);
console.log('income = ', typeof income);
console.log('deposit = ', typeof deposit);

console.log('Длина строки = ', addExpenses.length);

console.log('Массив ',addExpenses.toLowerCase().split(', '));

console.log('Период равен ', period, ' месяцев');
console.log('Цель заработать ', mission, ' рублей');

//дневной бюджет
let budgetDay = money / 30;
console.log('Дневной бюджет = ', budgetDay);
