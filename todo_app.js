document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('#todo-form');
    const todoInput = document.querySelector('#todo-input');
    const todoList = document.querySelector('#todo-list');

    // Load todos from localStorage when the page loads
    loadTodos();

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        addTodo();
    });

    function addTodo() {
        const todoText = todoInput.value.trim();
        if (todoText === '') return;

        const todoItem = document.createElement('li');
        todoItem.className = 'todo-item';

        const todoTextSpan = document.createElement('span');
        todoTextSpan.className = 'todo-text';
        todoTextSpan.textContent = todoText;

        const completeButton = document.createElement('button');
        completeButton.textContent = 'Complete';
        completeButton.addEventListener('click', () => {
            todoItem.classList.toggle('completed');
            saveTodos();
        });

        const removeButton = document.createElement('button');
        removeButton.textContent = 'Remove';
        removeButton.addEventListener('click', () => {
            todoList.removeChild(todoItem);
            saveTodos();
        });

        todoItem.appendChild(todoTextSpan);
        todoItem.appendChild(completeButton);
        todoItem.appendChild(removeButton);

        todoList.appendChild(todoItem);
        todoInput.value = '';

        saveTodos();
    }

    function saveTodos() {
        const todos = [];
        document.querySelectorAll('.todo-item').forEach(todoItem => {
            const todoText = todoItem.querySelector('.todo-text').textContent;
            const completed = todoItem.classList.contains('completed');
            todos.push({ text: todoText, completed });
        });
        localStorage.setItem('todos', JSON.stringify(todos));
    }

    function loadTodos() {
        const todos = JSON.parse(localStorage.getItem('todos')) || [];
        todos.forEach(todo => {
            const todoItem = document.createElement('li');
            todoItem.className = 'todo-item';
            if (todo.completed) {
                todoItem.classList.add('completed');
            }

            const todoTextSpan = document.createElement('span');
            todoTextSpan.className = 'todo-text';
            todoTextSpan.textContent = todo.text;

            const completeButton = document.createElement('button');
            completeButton.textContent = 'Complete';
            completeButton.addEventListener('click', () => {
                todoItem.classList.toggle('completed');
                saveTodos();
            });

            const removeButton = document.createElement('button');
            removeButton.textContent = 'Remove';
            removeButton.addEventListener('click', () => {
                todoList.removeChild(todoItem);
                saveTodos();
            });

            todoItem.appendChild(todoTextSpan);
            todoItem.appendChild(completeButton);
            todoItem.appendChild(removeButton);

            todoList.appendChild(todoItem);
        });
    }
});