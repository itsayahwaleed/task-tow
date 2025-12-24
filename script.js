// 1. الحالة والبيانات
let tasks = JSON.parse(localStorage.getItem('js_tasks')) || [];
let currentFilter = 'all';
let currentEditId = null;
// 2. العناصر المستهدفة
const taskInput = document.querySelector('#taskInput');
const addTaskBtn = document.querySelector('#addTaskBtn');
const taskList = document.querySelector('#taskList');
const errorMessage = document.querySelector('#errorMessage');
const customModal = document.querySelector('#customModal');
const modalInput = document.querySelector('#modalInput');
const modalError = document.querySelector('#modalError');
// 3. دوال مساعدة (Arrow Functions)
const updateStorage = () => localStorage.setItem('js_tasks', JSON.stringify(tasks));

const validate = (val) => {
    if (!val.trim()) return "Task cannot be empty.";
    if (val.trim().length < 5) return "Task must be at least 5 characters long.";
    if (/^\d/.test(val.trim())) return "Task cannot start with a number.";
    return null;
};
// 4. العمليات الأساسية
const renderTasks = () => {
    taskList.innerHTML = '';
    
    const filtered = tasks.filter(t => {
        if (currentFilter === 'done') return t.completed;
        if (currentFilter === 'todo') return !t.completed;
        return true;
    });
    
    filtered.forEach(task => {
        const item = document.createElement('div');
        item.className = `task-item ${task.completed ? 'completed' : ''}`;
        item.innerHTML = `
            <span>${task.text}</span>
            <div class="task-actions">
                <i class="fas fa-check" onclick="toggleStatus(${task.id})"></i>
                <i class="fas fa-edit" onclick="openRenameModal(${task.id})"></i>
                <i class="fas fa-trash" onclick="confirmDelete(${task.id})"></i>
            </div>
        `;
        taskList.appendChild(item);
    });