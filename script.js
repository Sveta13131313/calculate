'use strict'

//Задание 1
let money = 300000;
let income = '50000';
let addExpenses = ' Интернет 1000, Такси 2500, Коммуналка 5500';
let deposit = true;
let mission = 15000000;
let period = 10;


//Задание 2

let showTypeOf = function (data) {
    console.log(typeof (data));
}

showTypeOf(money);
showTypeOf(income);
showTypeOf(deposit);


//ДЗ 2

money = +prompt('Ваш месячный доход?');
addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую');

deposit = confirm('Есть ли у вас депозит в банке?');



let expenses1 = prompt('Введите обязательную статью расходов?');
let amount1 = +prompt('Во сколько это обойдется?');

let expenses2 = prompt('Введите обязательную статью расходов?');
let amount2 = +prompt('Во сколько это обойдется?');


const getExpensesMonth = function (amount_1, amount_2) {
    return amount_1 + amount_2;
}
console.log('Сумма всех расходов за месяц ', getExpensesMonth(amount1, amount2));

console.log('Массив ', addExpenses.toLowerCase().split(' '));

const getAccumulatedMonth = function callback(money_f, getExpens) {
    return money_f - getExpens;
}

let accumulatedMonth = getAccumulatedMonth(money, getExpensesMonth(amount1, amount2));

let getTargetMonth = function callback(accumulatedMonth_f) {
    return Math.ceil(mission / accumulatedMonth_f);
}






if (accumulatedMonth > 0) {
    console.log('Цель будет достигнута за : ', getTargetMonth(accumulatedMonth), ' месяцев');
    console.log('Бюджет на день : ', Math.floor(accumulatedMonth / 30));
    let getStatusIncome = function () {
        if (Math.floor(accumulatedMonth / 30) <= 600 && Math.floor(accumulatedMonth / 30) >= 0) {
            return ('К сожалению у вас уровень дохода ниже среднего');
        } else if (Math.floor(accumulatedMonth / 30) && Math.floor(accumulatedMonth / 30)) {
            return ('У вас средний уровень дохода');
        } else if (Math.floor(accumulatedMonth / 30) > 1200) {
            return ('У вас высокий уровень дохода');
        } else {
            return ('Что то пошло не так');
        }
    }
    console.log(getStatusIncome());
}
else {
    console.log('Нет средств для достижения цели');
}
