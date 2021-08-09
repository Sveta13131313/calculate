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

        let addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую');
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

console.log('Наша программа включает в себя данные:');
for (let key in appData) {
    console.log('Ключ: ' + key + ' значение: ' + appData[key]);
}