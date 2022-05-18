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
  document.getElementsByClassName("errorMessage")[0].style.display = "none";

  const blood1 = parseFloat(document.querySelector("#blood1").value);
  const blood2 = parseFloat(document.querySelector("#blood2").value);
  const cvi = parseFloat(document.querySelector("#cvi").value);
  const cva = parseFloat(document.querySelector("#cva-custom").value);
  const z = 1.95;

  const errorMessage = document.getElementsByClassName("errorMessage")[0];
  let showError = false;
  let errorText;

  if (isNaN(blood1)) {
    errorText = "Bloedwaarde 1 is onjuist ingevuld";
    errorMessage.setAttribute("lng", "errorMessage1");
    showError = true;
  } else if (isNaN(blood2)) {
    errorText = "Bloedwaarde 2 is onjuist ingevuld";
    errorMessage.setAttribute("lng", "errorMessage2");
    showError = true;
  } else if (isNaN(cva)) {
    errorText = "CVA is onjuist ingevuld";
    errorMessage.setAttribute("lng", "errorMessage3");
    showError = true;
  }

  if (showError) {
    errorMessage.innerHTML = errorText;
    errorMessage.style.display = "block";
    translate(document.getElementById("languageSelector").value, 'lng');
    errorMessage.scrollIntoView();
    return;
  }

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
    outRange.scrollIntoView();
  }
});

function getRCV(cva, cvi, z) {
  return Math.sqrt(cva ** 2 + cvi ** 2) * Math.sqrt(2) * z;
}

function translate(lng, tagAttr){
  var translate = new Translate();
  translate.init(tagAttr, lng);
  translate.process();
}

document.getElementById("languageSelector").addEventListener("change", function(){
  translate(this.value, 'lng');
});

translate("nl", 'lng');