const alertPlaceholder = document.getElementById("liveAlertPlaceholder");
const form = document.getElementById("formulario-tarea");
const lista = document.getElementById("lista-tareas");
const input = document.getElementById("nueva-tarea");
const contadorSpan = document.getElementById("contador");

const appendAlert = (message, type) => {
  const wrapper = document.createElement("div");
  wrapper.innerHTML = `
    <div class="alert alert-${type}" role="alert">
      ${message}
    </div>
  `;
  alertPlaceholder.append(wrapper);
  setTimeout(() => wrapper.remove(), 2500);
};


function obtenerTareas() {
  return JSON.parse(localStorage.getItem("tareas")) || [];
}

function guardarTareas(tareas) {
  localStorage.setItem("tareas", JSON.stringify(tareas));
}


function actualizarContador() {
  const tareas = obtenerTareas();
  const completadas = tareas.filter(t => t.completada).length;
  contadorSpan.textContent = completadas;
}


function crearTarea(texto, completada = false) {
  const li = document.createElement("li");
  li.classList.add("list-group-item");

  li.innerHTML = `
    <input type="checkbox" class="form-check-input check-tarea p-2" ${completada ? "checked" : ""}>
    <span class="tarea-texto ${completada ? "tarea-completada" : ""}">${texto}</span>
    <button type="button" class="btn btn-danger borrar position-absolute bottom-0 end-0">🗑 Borrar</button>
  `;

  lista.appendChild(li);
}


function cargarTareas() {
  const tareas = obtenerTareas();
  tareas.forEach(tarea => crearTarea(tarea.texto, tarea.completada));
  actualizarContador();
}


form.addEventListener("submit", function (e) {
  e.preventDefault();

  const texto = input.value.trim();
  if (texto === "") {
    input.classList.add("is-invalid");
    return;
  }

  input.classList.remove("is-invalid");

  const tareas = obtenerTareas();
  tareas.push({ texto, completada: false });
  guardarTareas(tareas);

  crearTarea(texto);
  input.value = "";

  actualizarContador();
  appendAlert("Tarea guardada 💾", "success");
});


lista.addEventListener("click", function (e) {
  const li = e.target.closest("li");
  if (!li) return;

  const texto = li.querySelector(".tarea-texto").textContent;
  let tareas = obtenerTareas();

  // Borrar
  if (e.target.classList.contains("borrar")) {
    tareas = tareas.filter(t => t.texto !== texto);
    guardarTareas(tareas);
    li.remove();
  }

  // Completar
  if (e.target.classList.contains("check-tarea")) {
    tareas = tareas.map(t =>
      t.texto === texto ? { ...t, completada: e.target.checked } : t
    );
    guardarTareas(tareas);
    li.querySelector(".tarea-texto").classList.toggle("tarea-completada");
  }

  actualizarContador();
});

cargarTareas();
