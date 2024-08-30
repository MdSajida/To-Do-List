// Get DOM elements
const taskInput = document.getElementById('new-task');
const addTaskButton = document.getElementById('add-task');
const taskList = document.getElementById('task-list');
const loginButton = document.getElementById('login-button');
const registerButton = document.getElementById('register-button');
const logoutButton = document.getElementById('logout-button');
const loginSection = document.getElementById('login-section');
const todoSection = document.getElementById('todo-section');
const usernameInput = document.getElementById('username');
const passwordInput = document.getElementById('password');
const welcomeMessage = document.getElementById('welcome-message');

let tasks = [];

// Load tasks from local storage
function loadTasks() {
    const user = localStorage.getItem('loggedInUser');
    if (user) {
        tasks = JSON.parse(localStorage.getItem(`${user}-tasks`)) || [];
        renderTasks();
    }
}

// Function to render tasks
function renderTasks() {
    taskList.innerHTML = '';
    tasks.forEach((task, index) => {
        const taskItem = document.createElement('li');
        taskItem.className = task.completed ? 'completed' : '';
        
        // Task text
        const taskText = document.createElement('span');
        taskText.className = 'task-text';
        taskText.textContent = task.text;
        
        // Buttons container
        const buttons = document.createElement('div');
        buttons.className = 'buttons';
        
        // Complete button
        const completeButton = document.createElement('button');
        completeButton.className = 'complete-btn';
        completeButton.textContent = task.completed ? 'Undo' : 'Complete';
        completeButton.addEventListener('click', () => toggleTaskCompleted(index));
        
        // Delete button
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.addEventListener('click', () => deleteTask(index));
        
        // Append buttons to container
        buttons.appendChild(completeButton);
        buttons.appendChild(deleteButton);
        
        // Append task text and buttons container to task item
        taskItem.appendChild(taskText);
        taskItem.appendChild(buttons);
        
        // Append task item to the list
        taskList.appendChild(taskItem);
    });
}

// Function to add a task
function addTask() {
    const taskText = taskInput.value.trim();
    if (taskText !== '') {
        tasks.push({ text: taskText, completed: false });
        saveTasks();
        renderTasks();
        taskInput.value = '';
    }
}

// Function to toggle task completion
function toggleTaskCompleted(index) {
    tasks[index].completed = !tasks[index].completed;
    saveTasks();
    renderTasks();
}

// Function to delete a task
function deleteTask(index) {
    tasks.splice(index, 1);
    saveTasks();
    renderTasks();
}

// Function to save tasks to local storage
function saveTasks() {
    const user = localStorage.getItem('loggedInUser');
    if (user) {
        localStorage.setItem(`${user}-tasks`, JSON.stringify(tasks));
    }
}

// User Authentication
function login() {
    const username = usernameInput.value.trim();
    const password = passwordInput.value.trim();
    const storedPassword = localStorage.getItem(username);
    
    if (storedPassword === password) {
        localStorage.setItem('loggedInUser', username);
        loginSection.style.display = 'none';
        todoSection.style.display = 'block';
        welcomeMessage.textContent = `Welcome, ${username}!`;
        loadTasks();
    } else {
        alert('Invalid username or password');
    }
}

function register() {
    const username = usernameInput.value.trim();
    const password = passwordInput.value.trim();
    
    if (localStorage.getItem(username)) {
        alert('User already exists');
    } else {
        localStorage.setItem(username, password);
        alert('User registered successfully');
    }
}

function logout() {
    localStorage.removeItem('loggedInUser');
    loginSection.style.display = 'block';
    todoSection.style.display = 'none';
    taskList.innerHTML = '';
}

// Event listeners
addTaskButton.addEventListener('click', addTask);
loginButton.addEventListener('click', login);
registerButton.addEventListener('click', register);
logoutButton.addEventListener('click', logout);
taskInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        addTask();
    }
});

// Initial Check for Logged In User
if (localStorage.getItem('loggedInUser')) {
    loginSection.style.display = 'none';
    todoSection.style.display = 'block';
    const user = localStorage.getItem('loggedInUser');
    welcomeMessage.textContent = `Welcome, ${user}!`;
    loadTasks();
} else {
    loginSection.style.display = 'block';
    todoSection.style.display = 'none';
}
