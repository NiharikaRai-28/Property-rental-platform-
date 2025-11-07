document.addEventListener('DOMContentLoaded', function() {
    // Initialize transactions array from localStorage or empty array
    let transactions = JSON.parse(localStorage.getItem('transactions')) || [];
    
    // DOM Elements
    const transactionForm = document.getElementById('transactionForm');
    const transactionsList = document.getElementById('transactionsList');
    const totalBalanceEl = document.getElementById('totalBalance');
    const totalIncomeEl = document.getElementById('totalIncome');
    const totalExpenseEl = document.getElementById('totalExpense');
    const filterAllBtn = document.getElementById('filterAll');
    const filterIncomeBtn = document.getElementById('filterIncome');
    const filterExpenseBtn = document.getElementById('filterExpense');
    
    // Initialize the app
    updateBalance();
    renderTransactions();
    
    // Form submission
    transactionForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const type = document.getElementById('type').value;
        const amount = parseFloat(document.getElementById('amount').value);
        const category = document.getElementById('category').value.trim();
        
        if (isNaN(amount) || amount <= 0 || !category) {
            alert('Please enter a valid amount and category');
            return;
        }
        
        const transaction = {
            id: generateId(),
            type,
            amount,
            category,
            date: new Date().toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric'
            })
        };
        
        transactions.push(transaction);
        saveTransactions();
        updateBalance();
        renderTransactions();
        
        // Reset form
        transactionForm.reset();
        document.getElementById('amount').focus();
    });
    
    // Filter buttons
    filterAllBtn.addEventListener('click', () => renderTransactions());
    filterIncomeBtn.addEventListener('click', () => renderTransactions('income'));
    filterExpenseBtn.addEventListener('click', () => renderTransactions('expense'));
    
    // Update balance
    function updateBalance() {
        const amounts = transactions.map(transaction => 
            transaction.type === 'income' ? transaction.amount : -transaction.amount
        );
        
        const total = amounts.reduce((acc, item) => acc + item, 0).toFixed(2);
        const income = amounts
            .filter(item => item > 0)
            .reduce((acc, item) => acc + item, 0)
            .toFixed(2);
        const expense = amounts
            .filter(item => item < 0)
            .reduce((acc, item) => acc + item, 0)
            .toFixed(2);
        
        totalBalanceEl.textContent = `$${total}`;
        totalIncomeEl.textContent = `$${income}`;
        totalExpenseEl.textContent = `$${Math.abs(expense)}`;
        
        // Update color based on balance
        totalBalanceEl.className = `text-3xl font-bold mt-2 ${total >= 0 ? 'text-primary' : 'text-red-500'}`;
    }
    
    // Render transactions
    function renderTransactions(filter = 'all') {
        transactionsList.innerHTML = '';
        
        let filteredTransactions = transactions;
        if (filter !== 'all') {
            filteredTransactions = transactions.filter(t => t.type === filter);
        }
        
        filteredTransactions.forEach(transaction => {
            const row = document.createElement('tr');
            row.className = 'transaction-item';
            
            row.innerHTML = `
                <td class="px-6 py-4 whitespace-nowrap">
                    <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                        ${transaction.type === 'income' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}">
                        ${transaction.type.charAt(0).toUpperCase() + transaction.type.slice(1)}
                    </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap ${transaction.type === 'income' ? 'text-secondary' : 'text-red-500'}">
                    ${transaction.type === 'income' ? '+' : '-'}$${transaction.amount.toFixed(2)}
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                    ${transaction.category}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    ${transaction.date}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button onclick="deleteTransaction('${transaction.id}')" class="text-red-500 hover:text-red-700">
                        <i data-feather="trash-2" class="w-4 h-4"></i>
                    </button>
                </td>
            `;
            
            transactionsList.appendChild(row);
        });
        
        feather.replace();
    }
    
    // Delete transaction
    window.deleteTransaction = function(id) {
        transactions = transactions.filter(transaction => transaction.id !== id);
        saveTransactions();
        updateBalance();
        renderTransactions();
    };
    
    // Save to localStorage
    function saveTransactions() {
        localStorage.setItem('transactions', JSON.stringify(transactions));
    }
    
    // Generate random ID
    function generateId() {
        return Math.floor(Math.random() * 1000000000);
    }
});