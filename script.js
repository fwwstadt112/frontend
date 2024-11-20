const API_URL = "https://backend-indol-six.vercel.app/api/tasks"; // Hier die korrekte URL des Backends

// Funktion, um Aufgaben vom Backend zu laden
async function loadTasks() {
  try {
    const response = await fetch(API_URL); // Holt Aufgaben vom Backend
    if (!response.ok) {
      throw new Error(`HTTP Fehler! Status: ${response.status}`); // Überprüft, ob die Anfrage erfolgreich war
    }
    const tasks = await response.json(); // Wenn erfolgreich, JSON parsen
    renderTasks(tasks); // Aufgaben in der UI anzeigen
  } catch (error) {
    console.error("Fehler beim Laden der Aufgaben:", error); // Fehlerbehandlung
  }
}

// Funktion, um Aufgaben auf der Webseite anzuzeigen
function renderTasks(tasks) {
  const taskList = document.getElementById("task-list");
  taskList.innerHTML = ""; // Löscht den Inhalt der Liste, falls nötig

  tasks.forEach((task) => {
    const taskItem = document.createElement("li");
    taskItem.textContent = `${task.text} - ${task.completed ? "Erledigt" : "Offen"}`;
    taskList.appendChild(taskItem); // Fügt jede Aufgabe der Liste hinzu
  });
}

// Wenn das DOM geladen ist, Aufgaben laden
document.addEventListener("DOMContentLoaded", loadTasks);
