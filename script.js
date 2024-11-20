const API_URL = 'https://frontend-nu-jet-74.vercel.app/api/tasks';

// Funktion zum Hinzufügen einer Aufgabe
async function addTask(event) {
  event.preventDefault();  // Verhindert, dass das Formular die Seite neu lädt

  const inputField = document.getElementById('task-input');
  const taskText = inputField.value.trim();

  if (taskText === '') {
    alert('Bitte gib einen Aufgabetext ein');
    return;
  }

  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ text: taskText }),
    });

    if (!response.ok) {
      throw new Error('Fehler beim Hinzufügen der Aufgabe');
    }

    const newTask = await response.json();
    console.log('Neue Aufgabe hinzugefügt:', newTask);

    // Optionally: Update the task list after adding a new task
    loadTasks(); // Diese Funktion lädt alle Aufgaben erneut

    inputField.value = ''; // Leert das Eingabefeld
  } catch (error) {
    console.error('Fehler beim Hinzufügen der Aufgabe:', error);
  }
}

// Event-Listener für das Formular
const form = document.getElementById('task-form');
form.addEventListener('submit', addTask);

// Funktion zum Laden der Aufgaben (GET-Anfrage)
async function loadTasks() {
  try {
    const response = await fetch(API_URL);
    const tasks = await response.json();

    // Hier kannst du dann die Aufgaben anzeigen
    const taskList = document.getElementById('task-list');
    taskList.innerHTML = ''; // Alte Aufgaben entfernen

    tasks.forEach(task => {
      const taskItem = document.createElement('li');
      taskItem.textContent = `${task.text} - ${task.completed ? 'Erledigt' : 'Offen'}`;
      taskList.appendChild(taskItem);
    });
  } catch (error) {
    console.error('Fehler beim Laden der Aufgaben:', error);
  }
}

// Beim Laden der Seite Aufgaben laden
document.addEventListener('DOMContentLoaded', loadTasks);
