// llamar declarar las variables iniciales
const nombre = document.getElementById("nombre");
const curso = document.getElementById("curso");
const genero = document.getElementById("genero");
const nota1 = document.getElementById("nota1");
const nota2 = document.getElementById("nota2");
const nota3 = document.getElementById("nota3");
const registrar = document.getElementById("registrar");
const tabla = document.getElementById("tabla");
const myModal = document.getElementById("registrarEstudiante");
// declarar variables iniciales
let promedio = null;
let estado = null;
let grupo = [];
// lista en localstore
let lista = JSON.parse(localStorage.getItem("estudiantes"));
document.addEventListener("DOMContentLoaded", pintar);

// funcion para mostrar los datos en la tabla
registrar.addEventListener("click", () => {
  if (
    nombre.value == "" ||
    curso.value == "" ||
    genero.value == "" ||
    nota1.value == "" ||
    nota2.value == "" ||
    nota3.value == "" ||
    nota1.value < 0 ||
    nota1.value > 5 ||
    nota2.value < 0 ||
    nota2.value > 5 ||
    nota3.value < 0 ||
    nota3.value > 5
  ) {
    alert("Por favor ingrese todos los datos");
  } else {
    promedio = +((+nota1.value + +nota2.value + +nota3.value) / 3).toFixed(2);
    promedio >= 3.5 ? (estado = "Aprobado") : (estado = "Reprobado");
    if (lista == null) {
      grupo = [];
      grupo.push({
        nombre: nombre.value,
        curso: curso.value,
        genero: genero.value,
        nota1: nota1.value,
        nota2: nota2.value,
        nota3: nota3.value,
        promedio: promedio,
        estado: estado,
      });
      localStorage.setItem("estudiantes", JSON.stringify(grupo));
      pintar();
      limpiar();
    } else {
      grupo = [];
      for (i = 0; i < lista.length; i++) {
        grupo.push(lista[i]);
        console.log(grupo[i]);
      }
      grupo.push({
        nombre: nombre.value,
        curso: curso.value,
        genero: genero.value,
        nota1: nota1.value,
        nota2: nota2.value,
        nota3: nota3.value,
        promedio: promedio,
        estado: estado,
      });
      localStorage.setItem("estudiantes", JSON.stringify(grupo));
      pintar();
      limpiar();      
    }
  }
});

// funcion para pintar los datos en la tabla
function pintar() {
  let lista = JSON.parse(localStorage.getItem("estudiantes"));
  grupo = [];

  // Almacenar el contenido del encabezado de la tabla en una variable
  let encabezado = `<tr>
      <th>Nombre</th>
      <th>Curso</th>
      <th>Genero</th>
      <th>Nota 1</th>
      <th>Nota 2</th>
      <th>Nota 3</th>
      <th>Promedio</th>
      <th>Estado</th>
      <th>Accion</th>
    </tr>`;

  // Concatenar el encabezado al inicio de la tabla
  tabla.innerHTML = encabezado;

  if (lista == null) {
    tabla.innerHTML += ""; // En lugar de sobreescribir la tabla, concatenar el contenido vacío
  } else {
    for (i = 0; i < lista.length; i++) {
      tabla.innerHTML += `
          <tr>
              <td>${lista[i].nombre}</td>
              <td>${lista[i].curso}</td>
              <td>${lista[i].genero}</td>
              <td>${lista[i].nota1}</td>
              <td>${lista[i].nota2}</td>
              <td>${lista[i].nota3}</td>
              <td>${lista[i].promedio}</td>
              <td>${lista[i].estado}</td>
              <td><button class="btn btn-danger" onclick="eliminar(${i})">Eliminar</button></td>         
          </tr>
        `;
    }
  }
}


// funcion para limpiar los campos
function limpiar() {
  nombre.value = "";
  curso.value = "";
  genero.value = "";
  nota1.value = "";
  nota2.value = "";
  nota3.value = "";
}

// funcion para eliminar los datos
function eliminar(i) {
  lista = JSON.parse(localStorage.getItem("estudiantes"));
  lista.splice(i, 1);
  localStorage.setItem("estudiantes", JSON.stringify(lista));
  pintar();
}

