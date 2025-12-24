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