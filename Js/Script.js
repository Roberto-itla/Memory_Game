/*Iniciador de variables */
let uncoveredCards = 0;
let first_result = null;
let second_result = null;
let card_1 = null;
let card_2 = null;
let movements = 0;
let hits = 0;
let temporizador = false;
let timer = 30;
let startTimer = timer;
let numbers = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8];
let regressive_time = null;
//Agregar elemetos en la seccion2
let GetMovements = document.getElementById("movements");
let Get_hits = document.getElementById("hits");
let Get_Timer = document.getElementById("t-remaining");
numbers = numbers.sort(() => {
  return Math.random() - 0.5;
});

//funcion de contratiempo

function SetBack() {
  regressive_time = setInterval(() => {
    timer--;
    Get_Timer.innerHTML = `Time:${timer}seconds`;
    if (timer == 0) {
      clearInterval(regressive_time);
      Blockcards();
    }
  }, 1000);
}

//funcion para bloquear las tarjetas al finalizar el tiempo

function Blockcards() {
  for (let i = 0; i <= 15; i++) {
    let cardBlocked = document.getElementById(i);
    cardBlocked.innerHTML = numbers[i];
    cardBlocked.disabled = true;
  }
}

/*Funcion principal () */
function destapar(id) {
  if (temporizador == false) {
    SetBack();
    temporizador = true;
  }

  uncoveredCards++;

  if (uncoveredCards == 1) {
    //Mostrar primer numero
    card_1 = document.getElementById(id);
    first_result = numbers[id];
    card_1.innerHTML = numbers[id];

    /*Deshabilitar el boton */
    card_1.disabled = true;
  } else if (uncoveredCards == 2) {
    //Mostrar segundo numero
    card_2 = document.getElementById(id);
    second_result = numbers[id];
    card_2.innerHTML = numbers[id];

    /*Deshabilitar nuevamente el boton */
    card_2.disabled = true;
    /*Incremento de movimientos */
    movements++;
    /*Mostrar movimientos */
    GetMovements.innerHTML = `Movements:${movements}`;
    if (first_result == second_result) {
      uncoveredCards = 0;

      //Aumentar aciertos
      hits++;
      //Mostrar aciertos
      Get_hits.innerHTML = `Hits:${hits}`;

      if (hits == 8) {
        clearInterval(regressive_time);
        Get_hits.innerHTML = `Hits:${hits} 😱! Wtf`;
        Get_Timer.innerHTML = `brutal you only delayed ${
          startTimer - timer
        } seconds!`;
        GetMovements.innerHTML = `Movements:${movements} you are burning 🔥🧨!`;
      }
    } else {
      //Mostrar momentaneamente cada numero
      setTimeout(() => {
        card_1.innerHTML = " ";
        card_2.innerHTML = " ";
        card_1.disabled = false;
        card_2.disabled = false;
        uncoveredCards = 0;
      }, 800);
    }
  }
}
