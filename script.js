const alertPlaceholder = document.getElementById("liveAlertPlaceholder");

const appendAlert = (message, type) => {
  const wrapper = document.createElement("div");

  wrapper.innerHTML = `
        <div class="alert alert-${type} alert-dismissible" role="alert">
            ${message}
        </div>
    `;

  alertPlaceholder.append(wrapper);

  setTimeout(() => {
    wrapper.remove();
  }, 3000);
};

const form = document.getElementById("formulario-tarea");
const lista = document.getElementById("lista-tareas");

form.addEventListener("submit", function (event) {
  event.preventDefault(); // evita recarga de la página

  const input = document.getElementById("nueva-tarea");
  const texto = input.value.trim();

  if (!texto) return; 

  const li = document.createElement("li");
  li.classList.add("list-group-item");
  li.innerHTML = `
    ${texto} 
    <button type="button" class="btn btn-danger btn-sm">🗑 Borrar</button>
  `;
  lista.appendChild(li);
  input.value = "";

  appendAlert("Tarea agregada", "success");
});

(() => {
  "use strict";
  const forms = document.querySelectorAll(".needs-validation");

  Array.from(forms).forEach((form) => {
    form.addEventListener(
      "submit",
      (event) => {
        if (!form.checkValidity()) {
          event.preventDefault();
          event.stopPropagation();
        }
        form.classList.add("was-validated");
      },
      false
    );
  });
})();

