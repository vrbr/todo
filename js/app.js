const main = (document => {

    const todoForm = document.getElementById('todo-form');
    const addInput = document.getElementById('add-input');
    const todoList = document.getElementById('todo-list');
    const todoItems = document.querySelectorAll('.todo-item');

    function createElement(tag, props, ...children) {
        const element = document.createElement(tag);

        Object.keys(props).forEach(key => element[key] = props[key]);

        if (children.length > 0) {
            children.forEach(child => {
                if (typeof child === 'string') {
                    child = document.createTextNode(child);
                }

                element.appendChild(child);
            });
        }

        return element;
    }

    //создание задачи
    function createTodoItem(title) {
        const checkbox = createElement('input', { type: 'checkbox', className: 'checkbox' });
        const label = createElement('label', { className: 'title' }, title);
        const editInput = createElement('input', { type: 'text', className: 'textfield' });
        const editButton = createElement('button', { className: 'edit' }, 'Изменить');
        const deleteButton = createElement('button', { className: 'delete' }, 'Удалить');
        const listItem = createElement('li', { className: 'todo-item' }, checkbox, label, editInput, editButton, deleteButton);

        bindEvents(listItem);

        return listItem;
    }

    // добавление задачи
    function addTodoItem(event) {
        event.preventDefault();

        if (addInput.value === '')  return alert('Необходимо ввести название задачи');
        
        const todoItem = createTodoItem(addInput.value);
        todoList.appendChild(todoItem);
        addInput.value = '';
    }

    //выполнение задачи
    function toggleTodoItem() {
        const listItem = this.parentNode;
        listItem.classList.toggle('completed');
    }

    //изменение задачи
    function editTodoItem() {
        let listItem = this.parentNode;
        let title = listItem.querySelector('.title');
        let editInput = listItem.querySelector('.textfield');
        let isEditing = listItem.classList.contains('editing');

        if (isEditing) {
            title.textContent = editInput.value;
            this.textContent = 'Изменить';
        } else {
            editInput.value = title.textContent;
            this.textContent = 'Сохранить';
        }

        listItem.classList.toggle('editing');
    }

    // удаление задачи
    function deleteTodoItem() {
        const listItem = this.parentNode;
        todoList.removeChild(listItem);
    }

    function bindEvents(todoItem) {
        const checkbox = todoItem.querySelector('.checkbox');
        const editButton = todoItem.querySelector('button.edit');
        const deleteButton = todoItem.querySelector('button.delete');

        checkbox.addEventListener('change', toggleTodoItem);
        editButton.addEventListener('click', editTodoItem);
        deleteButton.addEventListener('click', deleteTodoItem);
    }

    function main() {
        todoForm.addEventListener('submit', addTodoItem);
        todoItems.forEach(item => bindEvents(item));
    }

    //сохранение задачи в локальное хранилище
    function load() {
        const data = JSON.parse(localStorage.getItem('todos'));
        return data;
    }

    function save(data) {
        const string = JSON.stringify(data);
        localStorage.setItem('todos', string);
    }

    return main;

})(document);

main();