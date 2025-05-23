const task = JSON.parse(localStorage.getItem("taskDetails"));

if (!task) {
  document.getElementById("task-detail").innerHTML = "<p>Tarefa não encontrada.</p>";
} else {
  document.getElementById("task-detail").innerHTML = `
    <h4>${task.title}</h4>
    <p><strong>Data da tarefa:</strong> ${task.taskDate}</p>
    <p><strong>Comentário:</strong> ${task.comment}</p>
    <p><strong>Prioridade:</strong> ${task.priority}</p>
    <p><strong>Notificação:</strong> ${task.notify}</p>
    <p><strong>Data de criação:</strong> ${new Date(task.createdAt).toLocaleString()}</p>
    <p><strong>Status:</strong> ${task.isLate ? "<span style='color:red'>Atrasada</span>" : "No prazo"}</p>
  `;
}
