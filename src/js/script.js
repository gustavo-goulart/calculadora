const main = document.querySelector("main");
const root = document.querySelector(":root");
const input = document.getElementById("input");
const resultInput = document.getElementById("result");

//array de teclas permitidas
const allowedKeys = [
  "(",
  ")",
  "/",
  "*",
  "-",
  "+",
  "9",
  "8",
  "7",
  "6",
  "5",
  "4",
  "3",
  "2",
  "1",
  "0",
  ".",
  "%",
  " ",
];

//funcionalidade dos botões - adicionar evento nos botões ao mesmo tempo
document.querySelectorAll(".charKey").forEach(function (charKeyBtn) {
  charKeyBtn.addEventListener("click", function () {
    const value = charKeyBtn.dataset.value;
    input.value += value;
  });
});

//limpar o input ao apertar o clear
document.getElementById("clear").addEventListener("click", function () {
  input.value = "";
  input.focus();
});

//fazer o calculo ao apertar a tecla =
document.getElementById("equal").addEventListener("click", calculate);

//evento de pressionar a tecla
input.addEventListener("keydown", function (ev) {
  ev.preventDefault();

  //evento que evita digitar letras dentro do input
  if (allowedKeys.includes(ev.key)) {
    input.value += ev.key;
    return;
  }

  //excluir caracter
  if (ev.key === "Backspace") {
    input.value = input.value.slice(0, -1);
  }

  //evento para calcular o resultado
  if (ev.key === "Enter") {
    calculate();
  }
});

function calculate() {
  resultInput.value = "ERROR";
  resultInput.classList.add("error");
  const result = eval(input.value);
  resultInput.value = result;
  resultInput.classList.remove("error");
}

//trocar o tema da tela
document.getElementById("themeSwitcher").addEventListener("click", function () {
  if (main.dataset.theme === "dark") {
    root.style.setProperty("--bg-color", "#f1f5f9");
    root.style.setProperty("--border-color", "#aaa");
    root.style.setProperty("--font-color", "#212529");
    root.style.setProperty("--primary-color", "#26834a");
    main.dataset.theme = "light";
  } else {
    root.style.setProperty("--bg-color", "#212529");
    root.style.setProperty("--border-color", "#666");
    root.style.setProperty("--font-color", "#f1f5f9");
    root.style.setProperty("--primary-color", "#4dff91");
    main.dataset.theme = "dark";
  }
});

//evento para o botão de copy para area de transferência
document
  .getElementById("copyToClipboard")
  .addEventListener("click", function (ev) {
    const button = ev.currentTarget;
    if (button.innerText === "Copy") {
      button.innerText = "Copied!";
      button.classList.add("success");
      navigator.clipboard.writeText(resultInput.value);
    } else {
      button.innerText = "Copy";
      button.classList.remove("success");
    }
  });
