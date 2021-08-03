'use strict'

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

//console.log('Массив ', addExpenses.toLowerCase().split(', '));

console.log('Период равен ', period, ' месяцев');
console.log('Цель заработать ', mission, ' рублей');

//дневной бюджет
let budgetDay = money / 30;
console.log('Дневной бюджет = ', budgetDay);

//ДЗ 2

money = +prompt('Ваш месячный доход?');
addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую');
console.log(addExpenses.toLowerCase().split(' '));
deposit = confirm('Есть ли у вас депозит в банке?');

let expenses1 = prompt('Введите обязательную статью расходов?');
let amount1 = +prompt('Во сколько это обойдется?');

let expenses2 = prompt('Введите обязательную статью расходов?');
let amount2 = +prompt('Во сколько это обойдется?');

let budgetMonth = money - amount1 - amount2;
console.log('Бюджет на месяц: ', budgetMonth);

if (budgetMonth > 0) {
    console.log('Цель будет достигнута за : ', Math.ceil(mission / budgetMonth), ' месяцев');
    budgetDay = Math.floor(budgetMonth / 30);
    console.log('Бюджет на день: ', budgetDay);
    if (budgetDay <= 600 && budgetDay >= 0) {
        console.log('К сожалению у вас уровень дохода ниже среднего');
    } else if (budgetDay > 600 && budgetDay <= 1200) {
        console.log('У вас средний уровень дохода');
    } else if (budgetDay > 1200) {
        console.log('У вас высокий уровень дохода');
    } else {
        console.log('Что то пошло не так');
    }
} else {
    console.log('Нет средств для достижения цели');
}



