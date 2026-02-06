let todos = [];

// Add new todo
function addTodo() {
    const todoInput = document.getElementById('todo-input');
    const todoDate = document.getElementById('todo-date');

    if (todoInput.value.trim() === '' || todoDate.value === '') {
        alert('Please enter both a todo item and a due date.');
        return;
    }

    todos.push({
        todo: todoInput.value.trim(),
        date: todoDate.value,
        status: 'pending'
    });

    todoInput.value = '';
    todoDate.value = '';

    renderTodos();
}

// Render todos without innerHTML
function renderTodos(list = todos) {
    const todoList = document.getElementById('todo-list');
    todoList.innerHTML = '';

    if (list.length === 0) {
        const row = document.createElement('tr');
        const cell = document.createElement('td');

        cell.colSpan = 4;
        cell.textContent = 'No task found';
        cell.className = 'text-center py-4 text-slate-500';

        row.appendChild(cell);
        todoList.appendChild(row);
        return;
    }

    list.forEach((item, index) => {
        const row = document.createElement('tr');
        row.className = 'border-b border-slate-700';

        // Task
        const taskTd = document.createElement('td');
        taskTd.textContent = item.todo;

        // Date
        const dateTd = document.createElement('td');
        dateTd.textContent = item.date;
        dateTd.className = 'text-slate-400';

        // Status
        const statusTd = document.createElement('td');
        statusTd.textContent = item.status.toUpperCase();
        statusTd.className =
            item.status === 'done'
                ? 'text-green-400'
                : 'text-yellow-400';

        // Actions
        const actionTd = document.createElement('td');
        actionTd.className = 'flex gap-2 py-2';

        const doneBtn = document.createElement('button');
        doneBtn.textContent = 'DONE';
        doneBtn.className =
            'px-2 py-1 bg-slate-600 rounded text-xs hover:bg-slate-700';
        doneBtn.onclick = () => toggleStatus(index);

        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'DELETE';
        deleteBtn.className =
            'px-2 py-1 bg-red-600 rounded text-xs hover:bg-red-700';
        deleteBtn.onclick = () => deleteTodo(index);

        actionTd.append(doneBtn, deleteBtn);

        row.append(taskTd, dateTd, statusTd, actionTd);
        todoList.appendChild(row);
    });
}

function toggleStatus(index) {
    todos[index].status =
        todos[index].status === 'pending' ? 'done' : 'pending';
    renderTodos();
}

function deleteTodo(index) {
    todos.splice(index, 1);
    renderTodos();
}

function deleteAllTodos() {
    todos = [];
    renderTodos();
}

function filterTodos() {
    const filter = document.getElementById('status-filter').value;

    if (filter === 'all') {
        renderTodos(todos);
        return;
    }

    renderTodos(todos.filter(todo => todo.status === filter));
}
