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
