document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
    const alertDiv = document.getElementById('alert');
    const profileUsernameSpan = document.getElementById('profileUsername');

    // Handle user registration
    if (registerForm) {
        registerForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const username = registerForm.username.value;
            const password = registerForm.password.value;

            // Check if username already exists
            const existingUsers = JSON.parse(localStorage.getItem('users')) || {};
            if (existingUsers[username]) {
                showAlert('Username already exists. Please choose another one.');
                return;
            }

            // Save user data
            existingUsers[username] = password;
            localStorage.setItem('users', JSON.stringify(existingUsers));

            alert('Registration successful! You can now log in.');
            window.location.href = 'login.html';
        });
    }

    // Handle user login
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const username = loginForm.username.value;
            const password = loginForm.password.value;

            const users = JSON.parse(localStorage.getItem('users')) || {};
            if (users[username] && users[username] === password) {
                // Successful login
                localStorage.setItem('currentUser', username);
                window.location.href = 'profile.html';
            } else {
                // Failed login
                showAlert('Invalid username or password.');
            }
        });
    }

    // Check if the user is authenticated on the profile page
    if (profileUsernameSpan) {
        const currentUser = localStorage.getItem('currentUser');
        if (currentUser) {
            profileUsernameSpan.textContent = currentUser;
        } else {
            // Redirect to login if not logged in
            window.location.href = 'login.html';
        }
    }

    // Display alert message
    function showAlert(message) {
        alertDiv.textContent = message;
        alertDiv.style.display = 'block';
    }
});

// Global logout function
function logout() {
    localStorage.removeItem('currentUser');
    window.location.href = 'login.html';
}
