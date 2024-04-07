var listatareas = [
  { id: 1, descripcion: "tarea 1", checkbox: false },
  { id: 2, descripcion: "tarea 2", checkbox: false },
  { id: 3, descripcion: "tarea 3", checkbox: false },
];

// para crear una celda para lista de tareas
function crearCelda(texto) {
  var celda = document.createElement("td");
  celda.textContent = texto;
  return celda;
}

// para crear fila en tabla tareas
function crearFila(tarea) {
  var fila = document.createElement("tr");
  fila.appendChild(crearCelda(tarea.id));
  fila.appendChild(crearCelda(tarea.descripcion));
  var checkboxCell = document.createElement("td");
  var checkboxWrapper = document.createElement("div");
  checkboxWrapper.classList.add("checkbox-wrapper");
  var checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.checked = tarea.checkbox;
  checkbox.addEventListener("change", function () {
    tarea.checkbox = checkbox.checked;

    actualizarContadores();
  });
  var icono = document.createElement("i");
  icono.classList.add("fa-solid", "fa-xmark");
  icono.addEventListener("click", function () {
    // para eliminar tarea del arreglo
    var index = listatareas.findIndex(function (element) {
      return element.id === tarea.id;
    });
    if (index !== -1) {
      listatareas.splice(index, 1);

      tbody.removeChild(fila);
      actualizarContadores();
    }
  });
  checkboxWrapper.appendChild(checkbox);
  checkboxWrapper.appendChild(icono);
  checkboxCell.appendChild(checkboxWrapper);
  fila.appendChild(checkboxCell);
  return fila;
}

// para actualizar el contador de tareas realizadas
function actualizarContadorTareasRealizadas() {
  var contadorRealizadas = document.getElementById("cuenta-realizadas");
  var tareasRealizadas = listatareas.filter(function (tarea) {
    return tarea.checkbox;
  }).length;
  contadorRealizadas.textContent = tareasRealizadas;
}

// para actualizar el contador de tareas totales
function actualizarContadorTareasTotales() {
  var contadorTareas = document.getElementById("cuenta-tareas");
  contadorTareas.textContent = listatareas.length;
}

// para actualizar ambos contadores
function actualizarContadores() {
  actualizarContadorTareasRealizadas();
  actualizarContadorTareasTotales();
}

// para agregar las tareas iniciales al arreglo y a la tabla
function agregarTareasIniciales() {
  var tbody = document.getElementById("tablatareas");
  listatareas.forEach(function (tarea) {
    var nuevaFila = crearFila(tarea);
    tbody.appendChild(nuevaFila);
  });

  actualizarContadores();
}

// para agregar una nueva tarea al arreglo y a la tabla
function agregarNuevaTarea() {
  // para llamar el valor del input
  var nuevaDescripcion = inputNuevaTarea.value;

  // para revisar si la descripción no está vacía
  if (nuevaDescripcion.trim() !== "") {
    var nuevoId = listatareas.length + 1;

    // para crear un nuevo objeto tarea
    var nuevaTarea = {
      id: nuevoId,
      descripcion: nuevaDescripcion,
      checkbox: false,
    };

    listatareas.push(nuevaTarea);

    var tbody = document.getElementById("tablatareas");
    var nuevaFila = crearFila(nuevaTarea);
    tbody.appendChild(nuevaFila);

    actualizarContadores();

    var thId = document.querySelector("th[id='id']");
    var thDescripcion = document.querySelector("th[id='descripcion']");
    thId.textContent = "id: " + nuevoId;
    thDescripcion.textContent = "Tarea: " + nuevaDescripcion;
    inputNuevaTarea.value = "";
  } else {
    alert("Por favor, ingresa una descripción para la nueva tarea.");
  }
}

var btnAgregarTarea = document.getElementById("agregarnuevatarea");
var inputNuevaTarea = document.getElementById("nuevatarea");
var tbody = document.getElementById("tablatareas");

btnAgregarTarea.addEventListener("click", agregarNuevaTarea);

agregarTareasIniciales();
