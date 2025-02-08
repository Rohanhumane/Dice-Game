"use strict";

let fullScore, k, count, random, playerBool;
let ansR = 690.5;
let ansC = 139;
let ptR = 0;
let ptC = 0;
let bool = false;

// At Score 100 player Wins
const startAgain = function () {
  fullScore = [0, 0, 0, 0];
  if (k > 0) {
    console.log(k);
    document.querySelector(`.player--${k}`).classList.remove("player--active");
    // document.querySelector(`.player--${k}`).classList.add("player--inactive");
    document
      .querySelector(`.player--${k}`)
      .classList.toggle("player--inactive");
    document.querySelector(".dice").classList.add("hidden");
    document.querySelector(".btn--roll").classList.remove(`btn--${k}`);
  }
  document.getElementById("score--0").textContent = 0;
  document.getElementById("score--1").textContent = 0;
  document.getElementById("score--2").textContent = 0;
  document.getElementById("score--3").textContent = 0;
  document.getElementById("current--0").textContent = 0;
  document.getElementById("current--1").textContent = 0;
  document.getElementById("current--2").textContent = 0;
  document.getElementById("current--3").textContent = 0;
  k = 0;
  count = 0;
  playerBool = [true, true, true, true];
  bool = true;
  document.querySelector(`.player--${k}`).classList.remove("player--inactive");

  document.querySelector(".btn--roll").classList.remove("hidden");

  document.querySelector(".btn--roll").classList.add(`btn--${k}`);
};

const startPly = function () {
  if (random === 6 || random === 1) {
    playerBool[k] = false;
    return true;
  }
  return false;
};

const activeWinner = function () {
  document.querySelectorAll(".player").forEach((a) => {
    if (!a.classList.contains("player--inactive")) {
      a.classList.toggle("player--active");
    }
  });
  // document.querySelector(`.player--${k}`).classList.toggle("player--inactive");
};

const winner = function () {
  document.querySelector(`#score--${k}`).textContent = fullScore[k] + count;
  document.getElementById(`current--${k}`).textContent = 0;
  fullScore = [];
  document.querySelector(".dice").classList.add("hidden");
  activeWinner();
  count = 0;
  document.querySelector(".winners").textContent = `Congrulations Player ${
    k + 1
  } Wins`;
  document.querySelector(".winner").classList.remove("hidden");
};

const switchPly = function () {
  fullScore[k] += count;
  document.getElementById(`current--${k}`).textContent = 0;
  document.querySelector(`#score--${k}`).textContent = fullScore[k];
  count = 0;
  document.querySelector(`.player--${k}`).classList.toggle("player--inactive");
  document.querySelector(".btn--roll").classList.remove(`btn--${k}`);

  k += 1;
  if (k === 4) {
    k = 0;
  }
  document.querySelector(".btn--roll").classList.add(`btn--${k}`);
  document.querySelector(`.player--${k}`).classList.toggle("player--inactive");
};

const btnRoll = document.querySelector(".btn--roll");

const btnStart = function () {
  btnRoll.addEventListener("click", function () {
    if (k === 4) {
      k = 0;
    }
    random = Math.trunc(Math.random() * 6) + 1;
    document.querySelector(".dice").classList.remove("hidden");
    document.querySelector(".dice").src = `dice-${random}.png`;
    if (playerBool[k] === true) {
      if (startPly()) {
        // if (random === 6 || random === 1) {
        //   document.querySelector(".logo").classList.add(`logoJump--0`);
        // }
        // count += random;
        count = 1;
        document.getElementById(`current--${k}`).textContent = count;
      } else {
        switchPly();
      }
    } else {
      if (random !== 1) {
        // mover();
        count += random;
        document.getElementById(`current--${k}`).textContent = count;
        if (count + fullScore[k] >= 20) {
          winner();
          // document.querySelector(".btn--roll").classList.add("hidden");
        }
      } else {
        switchPly();
      }
    }
  });
};

document.querySelector(".btn--close").addEventListener("click", function () {
  document.querySelector(".winner").classList.add("hidden");
});

document.querySelector(".btn--new").addEventListener("click", function () {
  startAgain();
});

btnStart();
