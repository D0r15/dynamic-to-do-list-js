// Step 1: Define the async function
async function fetchUserData() {
    // Step 2: Define the API URL
    const apiUrl = 'https://jsonplaceholder.typicode.com/users';

    // Step 3: Select the data container
    const dataContainer = document.getElementById('api-data');

    try {
        // Step 4: Fetch the data
        const response = await fetch(apiUrl);
        const users = await response.json();

        // Step 5: Clear loading message
        dataContainer.innerHTML = '';

        // Step 6: Create a <ul> element
        const userList = document.createElement('ul');

        // Step 7: Loop through the users and create list items
        users.forEach(user => {
            const listItem = document.createElement('li');
            listItem.textContent = user.name;
            userList.appendChild(listItem);
        });

        // Step 8: Append the list to the container
        dataContainer.appendChild(userList);
    } catch (error) {
        // Step 9: Handle any errors
        dataContainer.innerHTML = '';
        dataContainer.textContent = 'Failed to load user data.';
    }
}

// Step 10: Run fetchUserData on DOMContentLoaded
document.addEventListener('DOMContentLoaded', fetchUserData);

document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('task-input');
    const addButton = document.getElementById('add-task');
    const taskList = document.getElementById('task-list');

    // Load tasks on page load
    loadTasks();

    // Add task on button click
    addButton.addEventListener('click', () => {
        const taskText = taskInput.value.trim();
        if (taskText !== '') {
            addTask(taskText);
            taskInput.value = '';
        }
    });

    // Function to load tasks from Local Storage
    function loadTasks() {
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        storedTasks.forEach(taskText => addTask(taskText, false)); // Don't save again during load
    }

    // Function to add a task (and optionally save to localStorage)
    function addTask(taskText, save = true) {
        const listItem = document.createElement('li');
        listItem.textContent = taskText;

        const removeBtn = document.createElement('button');
        removeBtn.textContent = 'Remove';
        removeBtn.style.marginLeft = '10px';
        removeBtn.addEventListener('click', () => {
            taskList.removeChild(listItem);
            removeTaskFromStorage(taskText);
        });

        listItem.appendChild(removeBtn);
        taskList.appendChild(listItem);

        if (save) {
            const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
            storedTasks.push(taskText);
            localStorage.setItem('tasks', JSON.stringify(storedTasks));
        }
    }

    // Function to remove a task from Local Storage
    function removeTaskFromStorage(taskText) {
        let storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        storedTasks = storedTasks.filter(task => task !== taskText);
        localStorage.setItem('tasks', JSON.stringify(storedTasks));
    }
});