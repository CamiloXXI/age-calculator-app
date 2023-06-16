const D = document;

function formValues() {
  // Obtener los valores de los inputs
  let day = document.getElementById("day").value;
  let month = document.getElementById("month").value;
  let year = document.getElementById("year").value;

  // Crear el objeto JavaScript
  let fecha = {
    day,
    month,
    year
  };

  let date = convertDate(fecha);
  sendDate(date);
  validFormat(date);
}

function convertDate({ day, month, year }) {
  // Convertir a enteros si son cadenas de texto
  if (typeof day === "string") {
    day = parseInt(day, 10);
  }
  if (typeof month === "string") {
    month = parseInt(month, 10);
  }
  if (typeof year === "string") {
    year = parseInt(year, 10);
  }

  let conditionsMet = false;

  if (year < 2023) {
    conditionsMet = true;
  } else if (year === 2023 && month <= 12 && month >= 1) {
    if (month === 2) {
      if (day <= 28) {
        conditionsMet = true;
      } else if (day === 29 && isLeapYear(year)) {
        conditionsMet = true;
      } else {
        conditionsMet = false;
      }
    } else if (
      [1, 3, 5, 7, 8, 10, 12].includes(month) &&
      day >= 1 &&
      day <= 31
    ) {
      conditionsMet = true;
    } else if ([4, 6, 9, 11].includes(month) && day >= 1 && day <= 30) {
      conditionsMet = true;
    } else {
      conditionsMet = false;
    }
  }

  //validFormat(conditionsMet);

  // Función para verificar si es un año bisiesto
  function isLeapYear(year) {
    return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
  }

  let fecha = {
    day,
    month,
    year,
    conditionsMet
  };

  return fecha;
}

function validFormat({ conditionsMet }) {
  if (conditionsMet) {
    D.textContent = `Las condiciones se cumplen.`;
    D.getElementById("verified").classList.remove("error");
    D.querySelectorAll(".hide-content").forEach((content) => {
      content.style.display = "none";
      content.classList.remove("error");
    });
    D.querySelectorAll("label").forEach((label) => {
      label.classList.remove("error");
      label.firstElementChild.classList.remove("error-border");
    });
  } else {
    D.querySelectorAll(".hide-content").forEach((content) => {
      content.style.display = "block";
      content.classList.add("error");
    });
    D.querySelectorAll("label").forEach((label) => {
      label.classList.add("error");
      label.firstElementChild.classList.add("error-border");
    });
    D.querySelectorAll(".no-valid-format").forEach((input) => {
      input.textContent = "- -";
    });
  }
}

function sendDate({ day, month, year }) {
  let fechaActual = new Date();

  let fechaNacimiento = new Date(year, month - 1, day);

  // Calcular la diferencia en milisegundos entre la fecha actual y la fecha de nacimiento
  let diferenciaMilisegundos = fechaActual - fechaNacimiento;

  // Convertir la diferencia de milisegundos a una fecha de edad
  let edad = new Date(diferenciaMilisegundos);

  // Obtener los componentes de la edad (años, meses y días)
  let edadAnios = edad.getUTCFullYear() - 1970; // Restar 1970 ya que la fecha de referencia es el 1 de enero de 1970
  let edadMeses = edad.getUTCMonth();
  let edadDias = edad.getUTCDate() - 1; // Restar 1 ya que los días comienzan desde 1 y no desde 0

  console.log(
    "La edad del usuario es:",
    edadAnios,
    "años,",
    edadMeses,
    "meses y",
    edadDias,
    "días."
  );

  D.getElementById("days").textContent = edadDias;
  D.getElementById("months").textContent = edadMeses;
  D.getElementById("years").textContent = edadAnios;
}

D.getElementById("calculate").addEventListener("click", (e) => {
  e.preventDefault();
  formValues();
});
