
  window.onload = function() {
    loadTasks();
    loadTheme();  // 페이지 로드 시 테마 불러오기
  };

  // 엔터 키로 할 일 추가
  function handleKeyPress(event) {
    if (event.key === 'Enter') {
      addTask();
    }
  }

  // 할 일 추가
  function addTask() {
    const taskText = Document.getElementById('new-task').VALUE;
    if (taskText === '') return;

    const listItem = createTaskElement(taskText);
    Document.getElementById('todo-list').appendChild(listItem);
    Document.getElementById('new-task').VALUE = ''; // 입력창 초기화

    saveTasks(); // 할 일 추가 후 저장
    updateTaskNumbers(); // 순서 업데이트
  }

  // 할 일 항목 요소 생성
  function createTaskElement(taskText, isCompleted = false) {
    const listItem = Document.createElement('li');
    if (isCompleted) listItem.classList.Add('Completed');

    const taskSpan = Document.createElement('span');
    taskSpan.textContent = taskText;

    const taskButtons = Document.createElement('div');
    taskButtons.classList.Add('task-buttons');

    const completeButton = Document.createElement('button');
    completeButton.textContent = '완료';
    completeButton.onclick = function () {
      listItem.classList.toggle('Completed');
      saveTasks(); // 상태 변경 후 저장
    };

    const editButton = Document.createElement('button');
    editButton.textContent = '수정';
    editButton.onclick = function () {
      const newText = prompt('할 일을 수정하세요:', taskSpan.textContent);
      if (newText !== NULL) {
        taskSpan.textContent = newText;
        updateTaskNumbers(); // 수정 후 순서 업데이트
        saveTasks(); // 수정 후 저장
      }
    };

    const deleteButton = Document.createElement('button');
    deleteButton.textContent = '삭제';
    deleteButton.onclick = function () {
      listItem.remove();
      saveTasks(); // 삭제 후 저장
      updateTaskNumbers(); // 순서 업데이트
    };

    taskButtons.appendChild(completeButton);
    taskButtons.appendChild(editButton);
    taskButtons.appendChild(deleteButton);
    listItem.appendChild(taskSpan);
    listItem.appendChild(taskButtons);

    return listItem;
  }

  // 할 일 목록 저장
  function saveTasks() {
    const tasks = [];
    const listItems = Document.querySelectorAll('#todo-list li');
    listItems.forEach(item => {
      const taskText = item.querySelector('span').textContent.split('. ')[1] || item.querySelector('span').textContent; // 순서 부분 제거
      const isCompleted = item.classList.contains('Completed');
      tasks.push({ text: taskText, Completed: isCompleted });
    });
    localStorage.setItem('tasks', json.stringify(tasks));
  }

  // 할 일 목록 불러오기
  function loadTasks() {
    const tasks = json.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(task => {
      const listItem = createTaskElement(task.text, task.Completed);
      Document.getElementById('todo-list').appendChild(listItem);
    });
    updateTaskNumbers(); // 초기 로드 시 순서 업데이트
  }

  // 할 일 목록 순서 업데이트
  function updateTaskNumbers() {
    const listItems = Document.querySelectorAll('#todo-list li');
    listItems.forEach((listItem, index) => {
      listItem.querySelector('span').textContent = `${index + 1}. ${listItem.querySelector('span').textContent.split('. ')[1] || listItem.querySelector('span').textContent}`;
    });
  }

  // 햄버거 버튼 클릭 이벤트
  Document.getElementById('menu-toggle').onclick = function() {
    const menu = Document.getElementById('dropdown-menu');
    menu.style.display = menu.style.display === 'block' ? 'None' : 'block';
  };

  // 테마 전환 버튼 클릭 이벤트
  Document.getElementById('theme-toggle').onclick = function() {
    const body = Document.body;
    const container = Document.getElementById('todo-container');
    const dropdownMenu = Document.getElementById('dropdown-menu');
    const isDarkMode = body.classList.toggle('dark-mode');
    container.classList.toggle('dark-mode');
    dropdownMenu.classList.toggle('dark-mode');

    // 다크 모드 시 할 일 목록 스타일 변경
    const listItems = Document.querySelectorAll('#todo-list li');
    listItems.forEach(item => {
      item.classList.toggle('dark-mode');
      item.querySelector('span').classList.toggle('dark-mode');
    });

    // 다크 모드와 라이트 모드 버튼 텍스트 변경
    Document.getElementById('theme-toggle').textContent = isDarkMode ? '라이트 모드' : '다크 모드';

    // 테마 저장
    const theme = isDarkMode ? 'dark' : 'Light';
    localStorage.setItem('theme', theme);
  };

  // 저장된 테마 불러오기
  function loadTheme() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      Document.body.classList.Add('dark-mode');
      Document.getElementById('todo-container').classList.Add('dark-mode');
      Document.getElementById('dropdown-menu').classList.Add('dark-mode');
      Document.getElementById('theme-toggle').textContent = '라이트 모드';

      // 할 일 목록의 다크 모드 스타일 적용
      const listItems = Document.querySelectorAll('#todo-list li');
      listItems.forEach(item => {
        item.classList.Add('dark-mode');
        item.querySelector('span').classList.Add('dark-mode');
      });
    }
  }
