'use strict'

let start = document.getElementById('start'),
    cancel = document.getElementById('cancel'),
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
    placeHolder = document.getElementsByTagName('input'),
    inputText = document.querySelectorAll('.data input[type=text]'),
    inputTextResult = document.querySelectorAll('.result input[type=text]'),
    placeHolderSum = document.querySelectorAll('input[placeholder=Сумма]'),
    placeHolderNum = document.querySelectorAll('input[placeholder=Наименование]'),
    depositBank = document.querySelector('.deposit-bank'),
    depositPercent = document.querySelector('.deposit-percent'),
    depositAmount = document.querySelector('.deposit-amount');

class AppData {
    constructor() {
        this.income = {};
        this.addIncome = [];
        this.expenses = {};
        this.addExpenses = [];
        this.deposit = false;
        this.percentDeposit = 0;
        this.moneyDeposit = 0;
        this.budget = 0;
        this.budgetDay = 0;
        this.budgetMonth = 0;
        this.expensesMonth = 0;
        this.incomeMonth = 0;
        this.placeHolderSum = {};
    };
    check() {
        if (salaryAmount.value != '') {
            start.removeAttribute('disable');
        }
    };

    start() {
        if (salaryAmount.value == '') {
            start.setAttribute('disabled', 'disabled');
            return
        }
        inputText = document.querySelectorAll('.data input[type=text]');

        inputText.forEach(function (item) {
            item.setAttribute('disabled', 'disabled');
        });
        btnPlusIncomeAdd.setAttribute('disabled', 'disabled');
        btnPlusExpensesAdd.setAttribute('disabled', 'disabled');
        start.style.display = 'none';
        cancel.style.display = 'block';

        this.budget = +salaryAmount.value;
        this.getExpInc();

        this.getAddExpenses();
        this.getAddIncome();
        this.getInfoDeposit();
        this.getExpensesMonth();
        this.getBudget();
        this.showResult();

    };

    reset() {
        inputText = document.querySelectorAll('.data input[type=text]');
        inputTextResult = document.querySelectorAll('.result input[type=text]');

        inputText.forEach(function (item) {
            item.value = '';
            item.removeAttribute('disabled');
            periodSelect.value = 1;
            periodSelectText.innerHTML = periodSelect.value;
        });
        inputTextResult.forEach(function (item) {
            item.value = '';
        });
        for (let i = 1; i < incomeItems.length; i++) {
            incomeItems[i].parentNode.removeChild(incomeItems[i]);
            btnPlusIncomeAdd.style.display = 'block';
        }
        for (let i = 1; i < expensesItems.length; i++) {
            expensesItems[i].parentNode.removeChild(expensesItems[i]);
            btnPlusExpensesAdd.style.display = 'block';
        }

        this.income = {};
        this.addIncome = [];
        this.expenses = {};
        this.addExpenses = [];
        this.deposit = false;
        this.percentDeposit = 0;
        this.moneyDeposit = 0;
        this.budget = 0;
        this.budgetDay = 0;
        this.budgetMonth = 0;
        this.expensesMonth = 0;
        this.incomeMonth = 0;
        this.placeHolderSum = {};

        btnPlusIncomeAdd.removeAttribute('disabled');
        btnPlusExpensesAdd.removeAttribute('disabled');
        cancel.style.display = 'none';
        start.style.display = 'block';
        depositCheck.check = false;

    };
    showResult() {
        const _this = this;
        budgetMonthValue.value = this.budgetMonth;
        budgetDayValue.value = Math.ceil(this.budgetDay);
        expensesMonthValue.value = this.expensesMonth;
        additionalExpensesValue.value = this.addExpenses.join(', ');
        additionalIncomeValue.value = this.addIncome.join(', ');
        targetMonthValue.value = this.getTargetMonth();
        incomePeriodValue.value = this.calcPeriod();
        periodSelect.addEventListener('input', function () {
            incomePeriodValue.value = _this.calcPeriod();
        });

    };

    //Добавление дополнительных расходов
    addExpensesBlock() {
        const cloneExpensesItem = expensesItems[0].cloneNode(true);
        cloneExpensesItem.querySelector('.expenses-title').value = '';
        cloneExpensesItem.querySelector('.expenses-amount').value = '';
        expensesItems[0].parentNode.insertBefore(cloneExpensesItem, btnPlusExpensesAdd);
        expensesItems = document.querySelectorAll('.expenses-items');
        if (expensesItems.length === 3) {
            btnPlusExpensesAdd.style.display = 'none';
        }
    };

    //Добавление дополнительных доходов
    addIncomeBlock() {
        const cloneIncomeItem = incomeItems[0].cloneNode(true);
        cloneIncomeItem.querySelector('.income-title').value = '';
        cloneIncomeItem.querySelector('.income-amount').value = '';
        incomeItems[0].parentNode.insertBefore(cloneIncomeItem, btnPlusIncomeAdd);
        incomeItems = document.querySelectorAll('.income-items');
        if (incomeItems.length === 3) {
            btnPlusIncomeAdd.style.display = 'none';
        }
    };
    /*
        addBlock(){
            if(Event.target=){
        }
        */
    getExpInc = function () {
        const count = item => {
            const startStr = item.className.split('-')[0];
            const itemTitle = item.querySelector(`.${startStr}-title`).value;
            const itemAmount = item.querySelector(`.${startStr}-amount`).value;
            if (itemTitle !== '' && itemAmount !== '') {
                this[startStr][itemTitle] = itemAmount;
            }
        }
        incomeItems.forEach(count);
        expensesItems.forEach(count);

        for (const key in this.income) {
            this.incomeMonth += +this.income[key];
        }
    };

    getAddExpenses() {

        const addExpenses = additionalExpenses.value.split(',');
        addExpenses.forEach(function (item) {
            item = item.trim();
            if (item !== '') {
                this.addExpenses.push(item);
            }
        }, this);
    };

    getAddIncome() {
        const _this = this;
        additionalIncomeItem.forEach(function (item) {
            let itemValue = item.value.trim();
            if (itemValue !== '') {
                _this.addIncome.push(itemValue);
            }
        });
    };

    getExpensesMonth() {
        let sum = 0;
        for (let key in this.expenses) {
            sum += +this.expenses[key];
        }
        this.expensesMonth = sum;

    };
    getBudget() {
        const monthDeposit = this.moneyDeposit * (this.percentDeposit / 100);
        this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth + monthDeposit;
        this.budgetDay = Math.floor(this.budgetMonth / 30);

    };
    getTargetMonth() {
        return Math.ceil(targetAmount.value / this.budgetMonth);
    };
    //Ввод значений депозита
    getInfoDeposit() {
        if (this.deposit) {

            this.percentDeposit = depositPercent.value;
            this.moneyDeposit = depositAmount.value;
        }
    };
    //Выбор банка
    changePercent() {
        const valueSelect = this.value;
        if (valueSelect === 'other') {
            depositPercent.style.display = 'inline-block';
            depositPercent.addEventListener('change',() =>{
            if(depositPercent.value<=100&&depositPercent.value>=0){
            this.percentDeposit = depositPercent.value;
        }else{
            alert('Введите коррекное значение от 0 до 100');
            depositPercent.value=0;
            this.percentDeposit = 0;
        }
    });
            //дз
        } else {
            depositPercent.style.display = 'none';
            depositPercent.value = valueSelect;
        }

    };
    calcPeriod() {
        return this.budgetMonth * periodSelect.value;
    };
    depositHandler() {
        if (depositCheck.checked) {
            depositBank.style.display = 'inline-block';
            depositAmount.style.display = 'inline-block';
            this.deposit = true;
            depositBank.addEventListener('change', this.changePercent);
        } else {
            depositBank.style.display = 'none';
            depositAmount.style.display = 'none';
            depositBank.value = '';
            depositAmount.value = '';
            this.deposit = false;
            depositBank.removeaddEventListener('change', this.changePercent);
        }
    };

    eventListener() {
        start.addEventListener('click', this.start.bind(this));

        btnPlusExpensesAdd.addEventListener('click', this.addExpensesBlock.bind(this));
        btnPlusIncomeAdd.addEventListener('click', this.addIncomeBlock.bind(this));
        salaryAmount.addEventListener('keyup', this.check.bind(this));
        cancel.addEventListener('click', this.reset.bind(this));

        periodSelect.addEventListener('input', function () {
            periodSelectText.innerHTML = periodSelect.value;
        });

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

        depositCheck.addEventListener('change', this.depositHandler.bind(this));
    };

}
const appData = new AppData();
appData.eventListener();





