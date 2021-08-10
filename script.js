'use strict'

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