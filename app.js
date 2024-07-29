let transactions = [];
const totalIncome = document.getElementById('total-income');
const totalExpenses = document.getElementById('total-expenses');
const balance = document.getElementById('balance');
const transactionList = document.getElementById('transaction-list');

document.getElementById('add-btn').addEventListener('click', addTransaction);

function addTransaction() {
    const description = document.getElementById('description').value;
    const amount = parseFloat(document.getElementById('amount').value);
    
    if (description === '' || isNaN(amount)) {
        alert('Please enter a valid description and amount.');
        return;
    }

    const transaction = {
        id: transactions.length,
        description,
        amount
    };

    transactions.push(transaction);
    updateUI();
    clearInputs();
}

function updateUI() {
    transactionList.innerHTML = '';
    let income = 0, expenses = 0;

    transactions.forEach(transaction => {
        const li = document.createElement('li');
        li.innerHTML = `${transaction.description}: $${transaction.amount.toFixed(2)} <button class="delete-btn" onclick="deleteTransaction(${transaction.id})">Delete</button>`;
        transactionList.appendChild(li);

        if (transaction.amount > 0) {
            income += transaction.amount;
        } else {
            expenses += transaction.amount;
        }
    });

    totalIncome.innerText = income.toFixed(2);
    totalExpenses.innerText = Math.abs(expenses).toFixed(2);
    balance.innerText = (income + expenses).toFixed(2);
}

function deleteTransaction(id) {
    transactions = transactions.filter(transaction => transaction.id !== id);
    updateUI();
}

function clearInputs() {
    document.getElementById('description').value = '';
    document.getElementById('amount').value = '';
}
