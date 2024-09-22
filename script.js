// Sample data (for demo purposes)
let users = [
    { username: 'user1', password: 'pass1', balance: 1000, phone: '1234567890', email: 'user1@example.com', accountNumber: '12345678' },
    { username: 'user2', password: 'pass2', balance: 500, phone: '9876543210', email: 'user2@example.com', accountNumber: '87654321' }
];

let loggedInUser = null;

document.addEventListener('DOMContentLoaded', function() {
    const loginContainer = document.getElementById('loginContainer');
    const registerContainer = document.getElementById('registerContainer');
    const dashboard = document.getElementById('dashboard');

    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');

    const loggedInUsernameDisplay = document.getElementById('loggedInUsername');
    const balanceDisplay = document.getElementById('balanceDisplay');

    const showRegisterFormLink = document.getElementById('showRegisterForm');
    const showLoginFormLink = document.getElementById('showLoginForm');

    const depositBtn = document.getElementById('depositBtn');
    const withdrawBtn = document.getElementById('withdrawBtn');
    const showTransferFormBtn = document.getElementById('showTransferFormBtn');
    const changePasswordBtn = document.getElementById('changePasswordBtn');
    const closeAccountBtn = document.getElementById('closeAccountBtn');
    const logoutBtn = document.getElementById('logoutBtn');

    const transferOptions = document.getElementById('transferOptions');
    const transferByAccount = document.getElementById('transferByAccount');
    const transferByPhone = document.getElementById('transferByPhone');

    const transferForm = document.getElementById('transferForm');
    const actualTransferForm = document.getElementById('actualTransferForm');
    const transferFormInputs = actualTransferForm.elements; // Get all form elements inside actualTransferForm

    // Show login form and hide register form
    showLoginFormLink.addEventListener('click', function(event) {
        event.preventDefault();
        loginContainer.style.display = 'block';
        registerContainer.style.display = 'none';
    });

    // Show register form and hide login form
    showRegisterFormLink.addEventListener('click', function(event) {
        event.preventDefault();
        registerContainer.style.display = 'block';
        loginContainer.style.display = 'none';
    });

    // Login form submission
    loginForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const username = loginForm.loginUsername.value;
        const password = loginForm.loginPassword.value;

        const user = users.find(u => u.username === username && u.password === password);
        if (user) {
            loggedInUser = user;
            loggedInUsernameDisplay.textContent = loggedInUser.username;
            balanceDisplay.textContent = `$${loggedInUser.balance.toFixed(2)}`;
            loginContainer.style.display = 'none';
            dashboard.style.display = 'block';
        } else {
            alert('Invalid username or password. Please try again.');
        }
    });

    // Register form submission
    registerForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const username = registerForm.registerUsername.value;
        const password = registerForm.registerPassword.value;
        const phone = registerForm.registerPhone.value;
        const email = registerForm.registerEmail.value;
        const accountNumber = registerForm.registerAccountNumber.value;

        // Check if username already exists
        if (users.some(u => u.username === username)) {
            alert('Username already exists. Please choose another.');
            return;
        }

        // Add new user
        const newUser = { username, password, phone, email, accountNumber, balance: 0 };
        users.push(newUser);
        loggedInUser = newUser;
        loggedInUsernameDisplay.textContent = loggedInUser.username;
        balanceDisplay.textContent = `$${loggedInUser.balance.toFixed(2)}`;

        // Clear registration form fields
        registerForm.reset();

        // Hide register form and show dashboard
        registerContainer.style.display = 'none';
        dashboard.style.display = 'block';
    });

    // Deposit button
    depositBtn.addEventListener('click', function() {
        const amount = parseFloat(prompt('Enter amount to deposit:'));
        if (!isNaN(amount) && amount > 0) {
            loggedInUser.balance += amount;
            balanceDisplay.textContent = `$${loggedInUser.balance.toFixed(2)}`;
        } else {
            alert('Invalid amount. Please enter a valid number.');
        }
    });

    // Withdraw button
    withdrawBtn.addEventListener('click', function() {
        const amount = parseFloat(prompt('Enter amount to withdraw:'));
        if (!isNaN(amount) && amount > 0 && amount <= loggedInUser.balance) {
            loggedInUser.balance -= amount;
            balanceDisplay.textContent = `$${loggedInUser.balance.toFixed(2)}`;
        } else {
            alert('Invalid amount or insufficient balance.');
        }
    });

    // Show transfer form button click event
    showTransferFormBtn.addEventListener('click', function() {
        transferForm.style.display = 'block';
    });

    // Transfer form submission
    actualTransferForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const transferRecipient = transferFormInputs.transferRecipient.value.trim();
        const amount = parseFloat(transferFormInputs.transferAmount.value);

        if (isNaN(amount) || amount <= 0) {
            alert('Invalid amount. Please enter a valid number.');
            return;
        }

        let recipientUser = null;

        if (transferByAccount.checked) {
            recipientUser = users.find(u => u.accountNumber === transferRecipient);
        } else if (transferByPhone.checked) {
            recipientUser = users.find(u => u.phone === transferRecipient);
        }

        if (recipientUser) {
            if (loggedInUser.balance >= amount) {
                loggedInUser.balance -= amount;
                recipientUser.balance += amount;
                balanceDisplay.textContent = `$${loggedInUser.balance.toFixed(2)}`;
                alert(`Successfully transferred $${amount.toFixed(2)} to ${recipientUser.username}.`);
                actualTransferForm.reset();
                transferForm.style.display = 'none';
            } else {
                alert('Insufficient balance.');
            }
        } else {
            alert('Recipient not found. Please check the account or phone number.');
        }
    });

    // Change Password button (not implemented in this example)
    changePasswordBtn.addEventListener('click', function() {
        alert('Feature not implemented in this demo.');
    });

    // Close Account button
    closeAccountBtn.addEventListener('click', function() {
        if (confirm('Are you sure you want to close your account?')) {
            // Remove user from users array (not a realistic operation in a real system)
            users = users.filter(u => u !== loggedInUser);
            loggedInUser = null;
            dashboard.style.display = 'none';
            loginContainer.style.display = 'block';
        }
    });

    // Logout button
    logoutBtn.addEventListener('click', function() {
        loggedInUser = null;
        dashboard.style.display = 'none';
        loginContainer.style.display = 'block';
    });
});
