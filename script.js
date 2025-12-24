// 1. الحالة والبيانات
let tasks = JSON.parse(localStorage.getItem('js_tasks')) || [];
let currentFilter = 'all';
let currentEditId = null;