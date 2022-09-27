class Expense {
    constructor(year, month, day, type, description, value) {      //Atributos da classe
        this.year = year
        this.month = month
        this.day = day
        this.type = type
        this.description = description
        this.value = value
    }
    valiData() {
        for (let i in this) {
            if (this[i] == undefined || this[i] == '' || this[i] == null) {
                return false;
            }
        }
        return true;
    }
}
class DB {
    constructor() {
        let id = localStorage.getItem('id');

        if (id === null) {
            localStorage.setItem('id', 0);
        }
    }

    getNextId() {
        let nextId = localStorage.getItem('id');
        return parseInt(nextId) + 1
    }

    saveding(obj) {
        let id = this.getNextId();
        localStorage.setItem(id, JSON.stringify(obj))
        localStorage.setItem('id', id)
    }
    recoveryExpense() {
        let expenses = Array();

        let id = localStorage.getItem('id');

        for (let i = 0; i <= id; i++) {
            let expense = JSON.parse(localStorage.getItem(i));
            if (expense === null) {
                continue;
            }
            expenses.push(expense);
        }
        return expenses;
    }
    search(expense) {
        let expenseFilters = Array();


        expenseFilters = this.recoveryExpense();

        console.log(expense);        
        console.log(expenseFilters);

        if(expense.year != ''){
            console.log('Filter Year')
            expenseFilters = expenseFilters.filter(d => d.year == expense.year);
        }
        if(expense.month != ''){
            console.log('Filter Month')
            expenseFilters = expenseFilters.filter(d => d.month == expense.month);
        }
        if(expense.day != ''){
            console.log('Filter Day')
            expenseFilters = expenseFilters.filter(d => d.day == expense.day);
        }
        if(expense.description != ''){
            console.log('Filter Description')
            expenseFilters = expenseFilters.filter(d => d.description == expense.description);
        }
        if(expense.type != ''){
            console.log('Filter Type')
            expenseFilters = expenseFilters.filter(d => d.type == expense.type) ;
        }
        if(expense.value != ''){
            console.log('Filter Value')
            expenseFilters = expenseFilters.filter(d => d.value == expense.value);
        }
        // console.log(expenseFilters);
        // console.log(expense);
        // console.log(expenseFilters.filter(d => d.year == expense.year));
        return expenseFilters;
    }

}
let db = new DB();

function registerExpense() {
    const year = document.querySelector('#ano');
    const month = document.querySelector('#mes');
    const day = document.querySelector('#dia');
    const type = document.querySelector('#tipo');
    const description = document.querySelector('#descricao');
    const value = document.querySelector('#valor');

    // console.log(year.value, month.value, day.value, type.value, description.value, value.value);
    // console.log(mes);

    let expense = new Expense(
        year.value, month.value, day.value, type.value, description.value, value.value
    )


    if (expense.valiData()) {
        db.saveding(expense);
        styleTrue();
        $('#modalRegister').modal('show');
        // registerExpense.description = '';
        description.value = '';
        year.value = '';
        day.value = '';
        month.value = '';
        type.value = '';
        value.value = '';
    } else {
        styleFalse();
        $('#modalRegister').modal('show');
    }
}

function styleTrue() {
    document.querySelector('#modal_title').innerHTML = 'CONGRATULATIONS! Expense registered sucessfully';
    document.querySelector('#btn_2').innerHTML = 'Continue';
    document.querySelector('#btn_2').className = 'btn btn-success';
    document.querySelector('#modal_title_div').className = 'modal-header text-success';
    document.querySelector('#modal_content').innerHTML = 'Expense registred success'
}
function styleFalse() {
    document.querySelector('#modal_title').innerHTML = 'Expense was not registered successfully';
    document.querySelector('#btn_2').innerHTML = 'Go back and Adjust';
    document.querySelector('#btn_2').className = 'btn btn-danger';
    document.querySelector('#modal_content').innerHTML = 'Fill in fields in white'
    document.querySelector('#modal_title_div').className = 'modal-header text-danger';

}
function loadingExpenses() {
    let expenses = Array();
    expenses = db.recoveryExpense();
    // console.log(expense);

    let listExpenses = document.querySelector('#listExpenses');

    expenses.forEach(e => {
        let row = listExpenses.insertRow();

        row.insertCell(0).innerHTML = `${e.year}/${e.month}/${e.day}`;
        row.insertCell(1).innerHTML = e.type;
        row.insertCell(2).innerHTML = e.description;
        row.insertCell(3).innerHTML = e.value;

    })
}
function searchExpense() {
    // console.log('oi')
    const year = document.querySelector('#ano').value;
    const month = document.querySelector('#mes').value;
    const day = document.querySelector('#dia').value;
    const type = document.querySelector('#tipo').value;
    const description = document.querySelector('#descricao').value;
    const value = document.querySelector('#valor').value;

    let exp = new Expense(year, month, day, type, description, value);

    let expenses = db.search(exp);

    let listExpenses = document.querySelector('#listExpenses');

    listExpenses.innerHTML = '';

    expenses.forEach(e => {
        let row = listExpenses.insertRow();

        row.insertCell(0).innerHTML = `${e.year}/${e.month}/${e.day}`;
        row.insertCell(1).innerHTML = e.type;
        row.insertCell(2).innerHTML = e.description;
        row.insertCell(3).innerHTML = e.value;

    })
}
