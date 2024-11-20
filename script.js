// API URL
const API_URL = 'https://backend-indol-six.vercel.app/api/tasks';

// Funktion zum Laden der Aufgaben
async function loadTasks() {
  try {
    const response = await fetch(API_URL);
    const tasks = await response.json();

    const taskList = document.getElementById('task-list');
    taskList.innerHTML = ''; // Leere die Liste

    tasks.forEach(task => {
      const li = document.createElement('li');
      li.setAttribute('data-id', task._id);
      li.classList.add(task.completed ? 'completed' : 'incomplete'); // Wenn abgehakt, füge 'completed' hinzu

      // Aufgabe Text
      const taskText = document.createElement('span');
      taskText.textContent = task.text;
      li.appendChild(taskText);

      // Abhaken Button
      const checkButton = document.createElement('button');
      checkButton.textContent = task.completed ? 'Unabhaken' : 'Abhaken';
      checkButton.addEventListener('click', () => toggleTaskStatus(task._id, task.completed));
      li.appendChild(checkButton);

      // Löschen Button
      const deleteButton = document.createElement('button');
      deleteButton.textContent = 'Löschen';
      deleteButton.addEventListener('click', () => deleteTask(task._id));
      li.appendChild(deleteButton);

      taskList.appendChild(li);
    });
  } catch (error) {
    console.error('Fehler beim Laden der Aufgaben:', error);
  }
}

// Funktion zum Abhaken der Aufgabe
async function toggleTaskStatus(taskId, currentStatus) {
  try {
    const response = await fetch(`${API_URL}/${taskId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        completed: !currentStatus,
      }),
    });

    if (response.ok) {
      loadTasks(); // Lade die Aufgaben neu
    } else {
      console.error('Fehler beim Ändern des Status');
    }
  } catch (error) {
    console.error('Fehler beim Abhaken der Aufgabe:', error);
  }
}

// Funktion zum Löschen der Aufgabe
async function deleteTask(taskId) {
  try {
    const response = await fetch(`${API_URL}/${taskId}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      loadTasks(); // Lade die Aufgaben neu
    } else {
      console.error('Fehler beim Löschen der Aufgabe');
    }
  } catch (error) {
    console.error('Fehler beim Löschen der Aufgabe:', error);
  }
}

// Aufgaben beim Laden der Seite anzeigen
document.addEventListener('DOMContentLoaded', loadTasks);
