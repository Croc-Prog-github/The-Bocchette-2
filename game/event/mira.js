let mire = document.getElementById("mire");
let fumetto = document.getElementById("fumetto");
let isMouseDown = false;
let tooltip = null;
let text = null;
let label = "Tasto E";

fumetto.style.position = "fixed";
fumetto.style.display = "inline-block";
fumetto.style.borderBottom = "1px dotted black";

document.addEventListener('mousedown', (event) => {
  if (event.button === 0) { // tasto sinistro del mouse
    isMouseDown = true;
    FumF(true);
    mire.hidden = false;

    // Crea il tooltip solo se non esiste già
    if (!tooltip) {
      tooltip = document.createElement("div");
      tooltip.style.content = "";
      tooltip.style.position = "absolute";
      tooltip.style.borderStyle = 'solid';
      tooltip.style.borderWidth = "10px 10px 0 10px";
      tooltip.style.borderColor = "#333 transparent transparent transparent";
      tooltip.style.bottom = "100%";
      tooltip.style.left = "50%";
      tooltip.style.transform = "translateX(-50%)";
      fumetto.appendChild(tooltip);

      text = document.createElement("div");
      text.innerText = label;
      text.style.position = "absolute";
      text.style.backgroundColor = "#333";
      text.style.color = "#fff";
      text.style.padding = "5px";
      text.style.borderRadius = "5px";
      text.style.fontSize = "14px";
      text.style.fontWeight = "bold";
      text.style.whiteSpace = "nowrap";
      text.style.bottom = "120%";
      text.style.left = "50%";
      text.style.transform = "translateX(-50%)";
      fumetto.appendChild(text);
    }
  }
});

document.addEventListener('mouseup', () => {
  isMouseDown = false;
  FumF(false);
  mire.hidden = true;

  // Rimuovi il tooltip quando viene rilasciato il tasto sinistro
  if (tooltip) {
    fumetto.removeChild(tooltip);
    fumetto.removeChild(text);
    tooltip = null;
    text = null;
  }
});

document.addEventListener('keydown', (event) => {
  if (isMouseDown && (event.key === "ArrowLeft" || event.key === "ArrowRight")) {
    label = label === "Tasto E" ? "Tasto F" : "Tasto E";
    text.innerText = label;
  }
});

function FumF(val) {
  if (val) {
    fumetto.setAttribute("aria-hidden", "false");
  } else {
    fumetto.setAttribute("aria-hidden", "true");
  }
}