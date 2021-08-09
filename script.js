'use strict'
const isNumber = function (n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
}

let money;

let start = function () {
    do {
        money = prompt('Ваш месячный доход?');
    } while (!isNumber(money))
}

start();

let appData = {
    income: {},
    addIncome: [],
    expenses: {},
    addExpenses: [],
    deposit: false,
    percentDeposit: 0,
    moneyDeposit: 0,
    mission: 70000,
    period: 3,
    budget: money,
    budgetDay: 0,
    budgetMonth: 0,
    expensesMonth: 0,
    asking: function () {

        if (confirm('Есть ли у вас дополнительный источник заработка?')) {
            let itemIncome, cashIncome;
            do {
                itemIncome = prompt('Какой у вас дополнительный заработок?', 'Делаю сайты');
            } while (isNumber(itemIncome));

            do {
                cashIncome = prompt('Сколько в месяц вы на этом зарабатываете?', 40000);
            } while (!isNumber(cashIncome));
            appData.income[itemIncome] = cashIncome;
        }

        let addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую','теарт,кино,парк');
        appData.addExpenses = addExpenses.toUpperCase().split(',');
        addExpenses = addExpenses.split(',');
        for (let i = 0; i < addExpenses.length; i++) {
            let word = addExpenses[i][0].toUpperCase() + addExpenses[i].slice(1);
            addExpenses[i] = word;
        }
        console.log(addExpenses);
        appData.deposit = confirm('Есть ли у вас депозит в банке?');
        for (let i = 0; i < 2; i++) {
            let a;
            do {
                a = prompt('Введите обязательную статью расходов?');
            } while (isNumber(a));
            do {
                appData.expenses[a] = +prompt('Во сколько это обойдется?');
            } while (!isNumber(appData.expenses[a]));
        }
    },
    getExpensesMonth: function () {
        let sum = 0;
        for (let key in appData.expenses) {
            sum += appData.expenses[key];
        }
        appData.expensesaAmount = sum;
        return console.log('Сумма всех расходов за месяц ', appData.expensesaAmount);
    },
    getBudget: function () {
        appData.budgetMonth = appData.budget - appData.expensesaAmount;
        appData.budgetDay = Math.floor(appData.budgetMonth / 30);

    },
    getTargetMonth: function () {
        return Math.ceil(appData.mission / appData.budgetMonth);
    },
    getStatusIncome: function () {
        if (appData.budgetMonth > 0) {
            console.log('Цель будет достигнута за : ', appData.getTargetMonth(), ' месяцев');
            if (appData.budgetDay <= 600 && appData.budgetDay >= 0) {
                return console.log('К сожалению у вас уровень дохода ниже среднего');
            } else if (appData.budgetDay > 600 && appData.budgetDay <= 1200) {
                return console.log('У вас средний уровень дохода');
            } else if (appData.budgetDay > 1200) {
                return console.log('У вас высокий уровень дохода');
            } else {
                return console.log('Что то пошло не так');
            }
        }
        else {
            console.log('Нет средств для достижения цели');
        }
    },
    getInfoDeposit: function () {
        if (appData.deposit) {
            do {
                appData.percentDeposit = prompt('Какой годовой процент? ', '10');
            } while (!isNumber(appData.percentDeposit))
            do {
                appData.moneyDeposit = prompt('Какая сумма заложена? ', 10000);
            } while (!isNumber(appData.moneyDeposit))
        }
    },
    calcSaveMoney: function () {
        return appData.budgetMonth * appData.period;
    }
}

appData.asking();
appData.getExpensesMonth();
appData.getBudget();
appData.getStatusIncome();

appData.getInfoDeposit();

let starts=document.getElementById('start');
let btnPlusIncomeAdd=document.getElementsByTagName('button')[0];
let btnPlusExpensesAdd=document.getElementsByTagName('button')[1];
let depositCheck=document.querySelector('#deposit-check');
let additionalIncomeItem1=document.querySelectorAll('.additional_income-item')[0];
let additionalIncomeItem2=document.querySelectorAll('.additional_income-item')[1];
let resultTotalBudgetMonthValue=document.getElementsByClassName('result-total budget_month-value');
let resultTotalBudgetDayValue=document.getElementsByClassName('result-total budget_day-value');
let resultTotalExpensesMonthValue=document.getElementsByClassName('result-total expenses_month-value');
let resultTotalAdditionalIncomeValue=document.getElementsByClassName('result-total additional_income-value');
let resultTotalAdditionalExpensesValue=document.getElementsByClassName('result-total additional_expenses-value');
let resultTotalIncomePeriodValue=document.getElementsByClassName('result-total income_period-value');
let resultTotalTargetMonthValue=document.getElementsByClassName('result-total target_month-value');
let periodSelect=document.querySelector('.period-select');
let salaryAmount=document.querySelector('.salary-amount');
let incomeTitle=document.querySelectorAll('.income-title')[1];
let incomeAmount=document.querySelector('.income-amount');
let expensesTitle=document.querySelectorAll('.expenses-title')[1];
let expensesAmount=document.querySelector('.expenses-amount');
let additionalExpensesItem=document.querySelector('.additional_expenses-item');
let targetAmount=document.querySelector('.target-amount');

console.log('Наша программа включает в себя данные:');
for (let key in appData) {
    console.log('Ключ: ' + key + ' значение: ' + appData[key]);
}