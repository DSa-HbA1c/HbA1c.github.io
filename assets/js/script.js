const units = document.querySelectorAll(".unit");

let activeUnit = units[0];
activeUnit.parentNode.classList.add("active");

units.forEach((unit) => {
  unit.addEventListener("change", () => {
    activeUnit.parentNode.classList.remove("active");
    unit.parentNode.classList.add("active");
    activeUnit = unit;
  });
});

const CVAselect = document.querySelector("#cva-select");
CVAselect.selectedIndex = 0;

CVAselect.addEventListener("change", () => {
  console.log(CVAselect.value);
  const { value } = CVAselect;

  const customCVA = document.querySelector(".custom-cva");
  if (value === "-1") {
    customCVA.style.display = "";
  } else {
    customCVA.style.display = "none";
  }
});

const checkInput = document.querySelector("#calculate");
const inRange = document.querySelector("#in-range");
const outRange = document.querySelector("#out-range");

checkInput.addEventListener("click", () => {
  const blood1 = parseFloat(document.querySelector("#blood1").value);
  const blood2 = parseFloat(document.querySelector("#blood2").value);
  const cvi = parseFloat(document.querySelector("#cvi").value);
  const cva = parseFloat(document.querySelector("#cva-custom").value);
  const z = 1.95;

  const rcv = getRCV(cva, cvi, z);

  const rcvPercentage = rcv / 100;

  const innerBound = blood1 * (1 - rcvPercentage);
  const outerBound = blood1 * (1 + rcvPercentage);

  console.log("rcv: ", rcv);
  console.log("innerBound: ", innerBound);
  console.log("outerBound: ", outerBound);
  console.log("blood1: ", blood1);
  console.log("blood2: ", blood2);

  const resultContainer = document.querySelector("#resultContainer");
  resultContainer.style.display = "";

  if (blood2 > innerBound && blood2 < outerBound) {
    inRange.style.display = "";
    outRange.style.display = "none";
    inRange.scrollIntoView();
  } else {
    inRange.style.display = "none";
    outRange.style.display = "";
    outMargin.scrollIntoView();
  }
});

function getRCV(cva, cvi, z) {
  return Math.sqrt(cva ** 2 + cvi ** 2) * Math.sqrt(2) * z;
}

const langImg = document.querySelector("#lang-img");
langImg.addEventListener("click", () => {
  const path = langImg.src.slice(-6);
  if (path == "nl.svg") {
    langImg.src = "assets/images/gb.svg";
  } else {
    langImg.src = "assets/images/nl.svg";
  }
});
