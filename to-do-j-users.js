
// Function to handle user registration
function handleRegister() {
    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value.trim();

    if (!username || !password) {
        alert("Please enter both username and password.");
        return;
    }

    // Get existing users from local storage
    const users = JSON.parse(localStorage.getItem('users')) || [];

    // Check if the username already exists
    const userExists = users.some(user => user.username === username);
    if (userExists) {
        alert("Username already exists. Please choose another one.");
        return;
    }

    // Register the new user
    const newUser  = { username: username, password: password, tasks: [] };
    users.push(newUser );
    localStorage.setItem('users', JSON.stringify(users));
    alert("Registration successful! You can now log in.");
}

// Function to handle user login
function handleLogin() {
    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value.trim();

    if (!username || !password) {
        alert("Please enter both username and password.");
        return;
    }

    // Get existing users from local storage
    const users = JSON.parse(localStorage.getItem('users')) || [];

    // Validate user credentials
    const user = users.find(user => user.username === username && user.password === password);

    if (user) {        
        // Store the logged-in user's username in local storage
        localStorage.setItem('currentUser', username);
       
        // Redirect to the to-do list page
        window.location.href = 'todolearn.html'; 
       // Changing this to to-do list page
    } else {
        alert("Invalid username or password.");
    }
}

function handleLogout() {
 
  
    localStorage.removeItem('currentUser'); 
    window.location.href = 'todo-users.html';
  }
