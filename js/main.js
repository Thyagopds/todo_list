let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

document.getElementById("task-form").addEventListener("submit", function(e) {
  e.preventDefault();

  const task = {
    title: document.getElementById("title").value,
    taskDate: document.getElementById("taskDate").value,
    comment: document.getElementById("comment").value,
    priority: document.getElementById("priority").value,
    notify: document.getElementById("notify").value,
    createdAt: new Date().toISOString()
  };

  const index = document.getElementById("taskIndex").value;
  if (index !== "") {
    tasks[index] = task;
  } else {
    tasks.push(task);
  }

  localStorage.setItem("tasks", JSON.stringify(tasks));
  clearForm();
  renderTasks();
});

function clearForm() {
  document.getElementById("task-form").reset();
  document.getElementById("taskIndex").value = "";
}

function renderTasks() {
  const list = document.getElementById("task-list");
  list.innerHTML = "";

  if (tasks.length === 0) {
    list.innerHTML = '<p class="text-center">Não há tarefas cadastradas</p>';
    return;
  }

  const sortBy = document.getElementById("sortBy").value;
  if (sortBy) {
    tasks.sort((a, b) => {
      if (sortBy === "priority") return a.priority.localeCompare(b.priority);
      if (sortBy === "title") return a.title.localeCompare(b.title);
      return new Date(a[sortBy]) - new Date(b[sortBy]);
    });
  }

  tasks.forEach((task, index) => {
    const div = document.createElement("div");
    div.className = "border p-3 mb-3 rounded bg-white shadow-sm";

    let priorityClass = task.priority === "ALTA" ? "priority-high" :
                        task.priority === "MÉDIA" ? "priority-medium" :
                        "priority-low";

    div.innerHTML = `
      <h5>${task.title}</h5>
      <p>Data da tarefa: ${task.taskDate}</p>
      <p class="${priorityClass}">Prioridade: ${task.priority}</p>
      <div class="task-details" id="details-${index}">
        <p>Comentário: ${task.comment}</p>
        <p>Data de criação: ${new Date(task.createdAt).toLocaleString()}</p>
        <p>Notificação: ${task.notify}</p>
      </div>
      <button class="btn btn-info btn-sm" onclick="toggleDetails(${index})">Ver mais</button>
      <button class="btn btn-warning btn-sm" onclick="editTask(${index})">Editar</button>
      <button class="btn btn-danger btn-sm" onclick="removeTask(${index})">Remover</button>
      <button class="btn btn-secondary btn-sm" onclick="viewTask(${index})">Detalhes</button>
    `;

    list.appendChild(div);
  });
}

function toggleDetails(index) {
  const details = document.getElementById(`details-${index}`);
  details.style.display = details.style.display === "none" ? "block" : "none";
}

function removeTask(index) {
  tasks.splice(index, 1);
  localStorage.setItem("tasks", JSON.stringify(tasks));
  renderTasks();
}

function editTask(index) {
  const task = tasks[index];
  document.getElementById("title").value = task.title;
  document.getElementById("taskDate").value = task.taskDate;
  document.getElementById("comment").value = task.comment;
  document.getElementById("priority").value = task.priority;
  document.getElementById("notify").value = task.notify;
  document.getElementById("taskIndex").value = index;
}

function viewTask(index) {
  const task = tasks[index];
  const isLate = new Date(task.taskDate) < new Date();
  localStorage.setItem("taskDetails", JSON.stringify({...task, isLate}));
  window.location.href = "detalhes.html";
}

renderTasks();
