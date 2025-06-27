 // Wait until the DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    // Load tasks from local storage on page load
    loadTasks();

    // Function to add a task
    function addTask(taskText = taskInput.value.trim(), save = true) {
        // Ignore empty inputs
        if (taskText === '') {
            alert('Please enter a task.');
            return;
        }

        // Create <li> and set text
        const li = document.createElement('li');
        li.textContent = taskText;

        // Create Remove button
        const removeBtn = document.createElement('button');
        removeBtn.textContent = 'Remove';
        removeBtn.className = 'remove-btn';

        // Attach click event to Remove button
        removeBtn.onclick = () => {
            taskList.removeChild(li);
            removeFromStorage(taskText);
        };

        // Append button to <li>, then <li> to list
        li.appendChild(removeBtn);
        taskList.appendChild(li);

        // Save task to local storage
        if (save) {
            const tasks = JSON.parse(localStorage.getItem('tasks') || '[]');
            tasks.push(taskText);
            localStorage.setItem('tasks', JSON.stringify(tasks));
        }

        // Clear the input
        taskInput.value = '';
    }

    // Load tasks from Local Storage
    function loadTasks() {
        const tasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        tasks.forEach(task => addTask(task, false)); // Don't re-save while loading
    }

    // Remove task from Local Storage
    function removeFromStorage(taskText) {
        let tasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        tasks = tasks.filter(task => task !== taskText);
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    // Add task when button is clicked
    addButton.addEventListener('click', () => {
        addTask(); // Default: from input, and save
    });

    // Add task on Enter key
    taskInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            addTask();
        }
    });

    // This line ensures the function is "invoked" on DOM load — if needed.
    // addTask(); // Only use this if there's a specific task to be preloaded.
});
