//targeting the element based on their ID
const balanaceEL = document.getElementById("balance");
const incomeAmountEL = document.getElementById("income-amount");
const expenseAmountEL = document.getElementById("expences-amount");
const transactionListEL = document.getElementById("transaction-list");
const transactionFormEL = document.getElementById("transaction-form");
const descriptionEL = document.getElementById("description");
const amountEL  =document.getElementById("amount");


let transactions = JSON.parse(localStorage.getItem("transactions")) || [];
transactionFormEL.addEventListener("submit", addTransaction);

function addTransaction(e){
    e.preventDefault();

    //get form values
    const description = descriptionEL.value.trim();
    //parseFloat() method convert string into number
    const amount = parseFloat(amountEL.value);
    

    transactions.push(
        {
            id:Date.now(),
            description,
            amount,
        }
    );

    localStorage.setItem("transactions", JSON.stringify(transactions));

    updateTransactionList();
    updateSummary();
    
    transactionFormEL.reset();
}

function updateTransactionList(){

    transactionListEL.innerHTML = "";
    const sortedTransactions = [...transactions].reverse();

    sortedTransactions.forEach((transaction) => {
        const transactionEL = createTransactionElement(transaction);
        transactionListEL.appendChild(transactionEL);
    })
}

function createTransactionElement(transaction) {
    const li = document.createElement("li");
    li.classList.add("transaction");
    li.classList.add(transaction.amount > 0 ? "income" : "expense");

//todo: update the amount formatting
li.innerHTML = `
    <span> ${transaction.description}</span>
    <span>
    ${formateCurrency(transaction.amount)}
    <button class="delete-btn" onclick="removeTransaction (${transaction.id})">X</button>
    </span>
    `;
    return li;

}

function updateSummary(){
    const balance = transactions.reduce((acc, transaction) => acc + transaction.amount, 0);
    
    const income = transactions
    .filter((transaction) => transaction.amount > 0)
    .reduce((acc, transaction) => acc + transaction.amount, 0);

    const expenses = transactions
        .filter((transaction) => transaction.amount <0)
        .reduce((acc, transaction) => acc + transaction.amount, 0);

// update ui => todo fix the formating

    balanaceEL.textContent = formateCurrency(balance);
    incomeAmountEL.textContent = formateCurrency(income);
    expenseAmountEL.textContent = formateCurrency(expenses);
}

function formateCurrency(number) {
    return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",

    }).format(number);
}

function removeTransaction(id) {
//filter out the 
transactions = transactions.filter(transaction => transaction.id !== id)
localStorage.setItem("transactions", JSON.stringify(transactions));

updateTransactionList();
updateSummary();
}

//initial render
updateTransactionList();
updateSummary();


