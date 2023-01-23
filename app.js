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
        this.value = parseFloat(this.value);
        this.day= parseInt(this.day);

        for (let i in this) {
            // console.log(i);
            if (!this[i] || this[i] == '' || typeof this.value !== "number" || typeof this.day !== "number") {
                return false
            }
        }
        return true;
    }
}
class DB {
    constructor() {
        let id = localStorage.getItem('id');
        // let value = localStorage.getItem('value');

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
        let i = 0

        for (i; i <= id; i++) {
            let expense = JSON.parse(localStorage.getItem(i));
            if (expense === null) {
                continue;
            }
            expense.id = i;
            expenses.push(expense);
        }
        return expenses;
    }
    removed(id) {
        // let id1 = id
        localStorage.removeItem(id);
        // localStorage.setItem('id', id -= 1);
    }


    search(expense) {
        let expenseFilters = Array();


        expenseFilters = this.recoveryExpense();

        // console.log(expense);
        // console.log(expenseFilters);

        if (expense.year != '') {
            expenseFilters = expenseFilters.filter(d => d.year == expense.year);
        }
        if (expense.month != '') {
            expenseFilters = expenseFilters.filter(d => d.month == expense.month);
        }
        if (expense.day != '') {
            expenseFilters = expenseFilters.filter(d => d.day == expense.day);
        }
        if (expense.description != '') {
            expenseFilters = expenseFilters.filter(d => d.description == expense.description);
        }
        if (expense.type != '') {
            expenseFilters = expenseFilters.filter(d => d.type == expense.type);
        }
        if (expense.value != '') {
            expenseFilters = expenseFilters.filter(d => d.value == expense.value);
        }
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

    let expense = new Expense(
        year.value, month.value, day.value, type.value, description.value, value.value
    )


    if (expense.valiData()) {
        db.saveding(expense);
        styleTrue();
        $('#modalRegister').modal('show');
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


function styleTrue(msg1,msg2) {
    document.querySelector('#modal_title').innerHTML = msg1 ?? 'PARABÉNS! Sua Despesa foi Cadastrada com Sucesso';
    // document.querySelector('#modal_title').innerHTML = 'CONGRATULATIONS! Expense registered sucessfully';
    document.querySelector('#btn_2').innerHTML = 'Continue';
    document.querySelector('#btn_2').className = 'btn btn-success';
    document.querySelector('#modal_title_div').className = 'modal-header text-success';
    document.querySelector('#modal_content').innerHTML = msg2 ?? 'Despesa Registrada';
}
function styleFalse() {
    document.querySelector('#modal_title').innerHTML = 'OPS! Sua Despesa não pode ser cadastrada';
    document.querySelector('#btn_2').innerHTML = 'Go back and Adjust';
    document.querySelector('#btn_2').className = 'btn btn-danger';
    document.querySelector('#modal_content').innerHTML = 'Os campos não podem estar em branco'
    document.querySelector('#modal_title_div').className = 'modal-header text-danger';

}
function loadingExpenses(expenses = Array(), filter = false) {

    if (expenses.length == 0 && filter == false) {
        expenses = db.recoveryExpense();
    }

    let listExpenses = document.querySelector('#listExpenses');
    listExpenses.innerHTML = '';

    expenses.forEach(e => {

        if(e.day <= 9){
            e.day = `0${e.day}`;
            
        }
        if(e.month <= 9){
            e.month = `0${e.month}`;
        }

        let row = listExpenses.insertRow();

        row.insertCell(0).innerHTML = `${e.year}/${e.month}/${e.day}`;
        row.insertCell(1).innerHTML = e.type;
        row.insertCell(2).innerHTML = e.description;
        row.insertCell(3).innerHTML = e.value;
        let btn = document.createElement('button');
        btn.className = 'btn btn-danger';
        btn.innerHTML = '<i class="fas fa-times"></i>'
        btn.id = `ID_Expense: ${e.id}`
        btn.onclick = function () {
            let id = this.id.replace('ID_Expense: ', '');
            // alert(id);
            styleTrue('Expense deleted successfully','Menos uma dívida pánóis');
            $('#modalRegister').modal('show');
            db.removed(id);
            searchExpense();
        }
        row.insertCell(4).append(btn);
        // console.log(e);
    })
}

function searchExpense() {
    const year = document.querySelector('#ano').value;
    const month = document.querySelector('#mes').value;
    const day = document.querySelector('#dia').value;
    const type = document.querySelector('#tipo').value;
    const description = document.querySelector('#descricao').value;
    const value = document.querySelector('#valor').value;

    let exp = new Expense(year, month, day, type, description, value);

    let expenses = db.search(exp);

    this.loadingExpenses(expenses, true);
}
