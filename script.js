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
       // تحديث حالة أزرار الحذف (تعطيل في حال عدم وجود مهام)
    document.querySelector('#deleteAllBtn').disabled = tasks.length === 0;
    document.querySelector('#deleteDoneBtn').disabled = !tasks.some(t => t.completed);
};

const addTask = () => {
    const error = validate(taskInput.value);
    if (error) {
        errorMessage.textContent = error;
        return;
    }
        errorMessage.textContent = '';
    tasks.push({ id: Date.now(), text: taskInput.value.trim(), completed: false });
    updateStorage();
    taskInput.value = '';
    renderTasks();
};
// جعل الدوال متاحة عالمياً للأيقونات (onclick)
window.toggleStatus = (id) => {
    tasks = tasks.map(t => t.id === id ? {...t, completed: !t.completed} : t);
    updateStorage();
    renderTasks();
}
window.confirmDelete = (id) => {
    // استخدام المودال المخصص بدلاً من alert
    currentEditId = id;
    document.querySelector('#modalTitle').textContent = "Confirm Delete?";
    modalInput.style.display = 'none';
    customModal.style.display = 'flex';
    document.querySelector('#confirmBtn').onclick = () => {
        tasks = tasks.filter(t => t.id !== id);
        updateStorage();
        closeModal();
        renderTasks();
    };
};

window.openRenameModal = (id) => {
    currentEditId = id;
    const task = tasks.find(t => t.id === id);
    document.querySelector('#modalTitle').textContent = "Rename Task";
    modalInput.style.display = 'block';
    modalInput.value = task.text;
    modalError.textContent = '';
    customModal.style.display = 'flex';

    document.querySelector('#confirmBtn').onclick = () => {
        const error = validate(modalInput.value);
        if (error) {
            modalError.textContent = error;
            return;
        }
        tasks = tasks.map(t => t.id === id ? {...t, text: modalInput.value.trim()} : t);
        updateStorage();
        closeModal();
        renderTasks();
    };
};

const closeModal = () => {
    customModal.style.display = 'none';
};
// 5. مراقبة الأحداث
addTaskBtn.addEventListener('click', addTask);
document.querySelector('#cancelBtn').addEventListener('click', closeModal);

document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
        document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        e.target.classList.add('active');
        currentFilter = e.target.dataset.filter;
        renderTasks();
    });
});
document.querySelector('#deleteAllBtn').addEventListener('click', () => {
    tasks = [];
    updateStorage();
    renderTasks();
});

document.querySelector('#deleteDoneBtn').addEventListener('click', () => {
    tasks = tasks.filter(t => !t.completed);
    updateStorage();
    renderTasks();
});
// التشغيل الأولي
renderTasks();