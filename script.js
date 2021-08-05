'use strict'
const isNumber=function(n){
    return !isNaN(parseFloat(n))&&isFinite(n);
}
//Задание 1
let money = 300000;
let income = '50000';
let addExpenses = ' Интернет 1000, Такси 2500, Коммуналка 5500';
let deposit = true;
let mission = 15000000;
let period = 10;


//Задание 2
let start=function(){
    money = prompt('Ваш месячный доход?');

    while(!isNumber(money)){
        money = prompt('Ваш месячный доход?');
    }
}

start();

let showTypeOf = function (data) {
    console.log(typeof (data));
}

showTypeOf(money);
showTypeOf(income);
showTypeOf(deposit);


//ДЗ 2

addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую');

deposit = confirm('Есть ли у вас депозит в банке?');


let expenses1,expenses2;


const getExpensesMonth = function (){
    let sum=0;
    for (let i=0;i<2;i++){
        if(i==0){
            expenses1= prompt('Введите обязательную статью расходов?');
        }else if(i==1){
            expenses2=prompt('Введите обязательную статью расходов?');
        }
        sum+=+prompt('Во сколько это обойдется?')
    }
    console.log(sum);
    return sum;
}

let expensesaAmount=getExpensesMonth();
console.log('Сумма всех расходов за месяц ', expensesaAmount);

console.log('Массив ', addExpenses.toLowerCase().split(' '));

const getAccumulatedMonth = function callback() {
    return money - expensesaAmount;
}

let accumulatedMonth = getAccumulatedMonth();

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
