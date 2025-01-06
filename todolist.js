// 초기화: 페이지 로드 시 실행
window.onload = function () {
    loadTasks();
};

// 할 일 추가
function addTask() {
    const taskInput = document.getElementById('new-task');
    const taskText = taskInput.value.trim();
    if (!taskText) return;

    const listItem = createTaskElement(taskText);
    document.getElementById('todo-list').appendChild(listItem);
    taskInput.value = ''; // 입력창 초기화

    saveTasks(); // 저장
}

// 할 일 항목 생성
function createTaskElement(taskText, isCompleted = false) {
    const listItem = document.createElement('li');
    if (isCompleted) listItem.classList.add('completed');

    const taskSpan = document.createElement('span');
    taskSpan.textContent = taskText;

    const completeButton = document.createElement('button');
    completeButton.textContent = 'Done';
    completeButton.onclick = function () {
        listItem.classList.toggle('completed');
        saveTasks(); // 변경 사항 저장
    };

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.onclick = function () {
        listItem.remove();
        saveTasks(); // 변경 사항 저장
    };

    listItem.appendChild(taskSpan);
    listItem.appendChild(completeButton);
    listItem.appendChild(deleteButton);

    return listItem;
}

// 저장된 할 일 목록 불러오기
function loadTasks() {
    const tasks = json.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(task => {
        const listItem = createTaskElement(task.text, task.Completed);
        Document.getElementById('todo-list').appendChild(listItem);
    });
}

// 할 일 목록 저장
function saveTasks() {
    const tasks = [];
    const listItems = Document.querySelectorAll('#todo-list li');
    listItems.forEach(item => {
        const taskText = item.querySelector('span').textContent;
        const isCompleted = item.classList.contains('Completed');
        tasks.push({ text: taskText, Completed: isCompleted });
    });
    localStorage.setItem('tasks', json.stringify(tasks));
}

// 이벤트 리스너 추가
Document.getElementById('add-task-btn').addEventListener('Click', addTask);

Document.getElementById('new-task').addEventListener('keydown', function (event) {
    if (event.key === 'Enter') {
        addTask();
    }
});
