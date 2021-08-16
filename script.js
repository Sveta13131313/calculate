'use strict'

let start = document.getElementById('start'),
    btnPlusIncomeAdd = document.getElementsByTagName('button')[0],
    btnPlusExpensesAdd = document.getElementsByTagName('button')[1],
    depositCheck = document.querySelector('#deposit-check'),
    additionalIncomeItem = document.querySelectorAll('.additional_income-item'),
    budgetMonthValue = document.getElementsByClassName('result-total budget_month-value')[0],
    budgetDayValue = document.getElementsByClassName('result-total budget_day-value')[0],
    expensesMonthValue = document.getElementsByClassName('result-total expenses_month-value')[0],
    additionalIncomeValue = document.getElementsByClassName('result-total additional_income-value')[0],
    additionalExpensesValue = document.getElementsByClassName('result-total additional_expenses-value')[0],
    incomePeriodValue = document.getElementsByClassName('result-total income_period-value')[0],
    targetMonthValue = document.getElementsByClassName('result-total target_month-value')[0],
    periodSelect = document.querySelector('.period-select'),
    salaryAmount = document.querySelector('.salary-amount'),
    incomeTitle = document.querySelectorAll('.income-title')[1],
    expensesTitle = document.querySelectorAll('.expenses-title')[1],
    expensesItems = document.querySelectorAll('.expenses-items'),
    additionalExpenses = document.querySelector('.additional_expenses-item'),
    targetAmount = document.querySelector('.target-amount'),
    incomeItems = document.querySelectorAll('.income-items'),
    periodSelectText = document.getElementsByClassName('title period-amount')[0],
    placeHolderSum = document.querySelectorAll('input[placeholder=Сумма]'),
    placeHolderNum = document.querySelectorAll('input[placeholder=Наименование]');


const isNumber = function (n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
}

let appData = {
    income: {},
    addIncome: [],
    expenses: {},
    addExpenses: [],
    deposit: false,
    percentDeposit: 0,
    moneyDeposit: 0,
    budget: 0,
    budgetDay: 0,
    budgetMonth: 0,
    expensesMonth: 0,
    incomeMonth: 0,
    placeHolderSum: {},
    start: function () {
        appData.budget = +salaryAmount.value;

        appData.getExpenses();

        appData.getExpensesMonth();
        appData.getIncome();
        appData.getAddExpenses();
        appData.getAddIncome();
        appData.getBudget();
        appData.showResult();
    },
    showResult: function () {
        periodSelect.addEventListener('input', function(){
            return incomePeriodValue.value = appData.calcPeriod();
        }),
        appData.getPeriodSelect();
        budgetMonthValue.value = appData.budgetMonth;
        budgetDayValue.value = Math.ceil(appData.budgetDay);
        expensesMonthValue.value = appData.expensesMonth;
        additionalExpensesValue.value = appData.addExpenses.join(', ');
        additionalIncomeValue.value = appData.addIncome.join(', ');
        targetMonthValue.value = appData.getTargetMonth();
        incomePeriodValue.value = appData.calcPeriod();
    },
    addExpensesBlock: function () {
        let cloneExpensesItem = expensesItems[0].cloneNode(true);

            cloneExpensesItem.querySelector('.expenses-title').value = '';
            cloneExpensesItem.querySelector('.expenses-amount').value = '';
        
        expensesItems[0].parentNode.insertBefore(cloneExpensesItem, btnPlusExpensesAdd);
        expensesItems = document.querySelectorAll('.expenses-items');
        if (expensesItems.length === 3) {
            btnPlusExpensesAdd.style.display = 'none';
        }
    },

    getExpenses: function () {
        expensesItems.forEach(function (item) {
            let itemExpenses = item.querySelector('.expenses-title').value;
            let cashExpenses = item.querySelector('.expenses-amount').value;
            if (itemExpenses !== '' && cashExpenses !== '') {
                appData.expenses[itemExpenses] = cashExpenses;
            }
        });
    },
    addIncomeBlock: function () {
        let cloneIncomeItem = incomeItems[0].cloneNode(true);
        console.log(cloneIncomeItem.querySelector('.income-title').value);

        cloneIncomeItem.querySelector('.income-title').value = '';
        cloneIncomeItem.querySelector('.income-amount').value = '';

        incomeItems[0].parentNode.insertBefore(cloneIncomeItem, btnPlusIncomeAdd);

        incomeItems = document.querySelectorAll('.income-items');
        if (incomeItems.length === 3) {
            btnPlusIncomeAdd.style.display = 'none';
        }
    },
    getIncome: function () {
        incomeItems.forEach(function (item) {
            let itemIncome = item.querySelector('.income-title').value;
            let cashIncome = item.querySelector('.income-amount').value;
            if (itemIncome !== '' && cashIncome !== '') {
                appData.income[itemIncome] = cashIncome;
            }
        });

        for (let key in appData.income) {
            appData.incomeMonth += +appData.income[key];
        }
    },
    getPeriodSelect: function () {
        periodSelectText.textContent = periodSelect.value;
    },
    getAddExpenses: function () {
        let addExpenses = additionalExpenses.value.split(',');
        addExpenses.forEach(function (item) {
            item = item.trim();
            if (item !== '') {
                appData.addExpenses.push(item);
            }
        })
    },

    getAddIncome: function () {
        additionalIncomeItem.forEach(function (item) {
            let itemValue = item.value.trim();
            if (itemValue !== '') {
                appData.addIncome.push(itemValue);
            }
        });
    },

    getExpensesMonth: function () {
        let sum = 0;
        for (let key in appData.expenses) {
            sum += +appData.expenses[key];
        }
        appData.expensesMonth = sum;
    },
    getBudget: function () {
        appData.budgetMonth = appData.budget + appData.incomeMonth - appData.expensesMonth;
        appData.budgetDay = Math.floor(appData.budgetMonth / 30);

    },
    getTargetMonth: function () {
        return Math.ceil(targetAmount.value / appData.budgetMonth);
    },
    getInfoDeposit: function () {
        appData.deposit = confirm('Есть ли у вас депозит в банке?');
        if (appData.deposit) {
            do {
                appData.percentDeposit = prompt('Какой годовой процент? ', '10');
            } while (!isNumber(appData.percentDeposit))
            do {
                appData.moneyDeposit = prompt('Какая сумма заложена? ', 10000);
            } while (!isNumber(appData.moneyDeposit))
        }
    },
    calcPeriod: function () {
        return appData.budgetMonth * periodSelect.value;
    }
}

start.addEventListener('click', function (event) {
    event.preventDefault();
    if (salaryAmount.value != '') {
        appData.start();
    }
}
);

btnPlusIncomeAdd.addEventListener('click', appData.addIncomeBlock);
btnPlusExpensesAdd.addEventListener('click', appData.addExpensesBlock);
periodSelect.addEventListener('input', appData.getPeriodSelect);
placeHolderSum.forEach(function (item) {
    item.addEventListener('change', function () {
        item.value = item.value.replace(/[^0-9]/g, '');
        placeHolderSum = document.querySelectorAll('input[placeholder=Сумма]');  
    })
})
placeHolderNum.forEach(function (item) {
    item.addEventListener('change', function () {
        item.value = item.value.replace(/[^а-яё\s]/gi, '');
        placeHolderNum = document.querySelectorAll('input[placeholder=Наименование]');
    })
})