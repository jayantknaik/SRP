window.addEventListener("scroll", () => {
  if (window.scrollY == 0) {
    document
      .getElementsByClassName("sticky-filter")[0]
      .classList.remove("show");
  } else {
    document.getElementsByClassName("sticky-filter")[0].classList.add("show");
  }
});

const showBudgetFilter = () => {
  document.getElementsByClassName("budget-filter")[0].classList.add("show");
  document.querySelector("body").style.overflow = "hidden";
};
const closeBudgetFilter = () => {
  document.getElementsByClassName("budget-filter")[0].classList.remove("show");
  document.querySelector("body").style.overflow = "auto";
};

const showBHKFilter = () => {
  document.getElementsByClassName("bhk-filter")[0].classList.add("show");
  document.querySelector("body").style.overflow = "hidden";
};

const removeBHKFilter = () => {
  document.getElementsByClassName("bhk-filter")[0].classList.remove("show");
  document.querySelector("body").style.overflow = "auto";
};

const showLocationFilter = () => {
  document.getElementsByClassName("location-filter")[0].classList.add("show");
  document.querySelector("body").style.overflow = "hidden";
};
const removeLocationFilter = () => {
  document
    .getElementsByClassName("location-filter")[0]
    .classList.remove("show");
  document.querySelector("body").style.overflow = "auto";
};

const showPropertyFilter = () => {
  document.getElementsByClassName("property-filter")[0].classList.add("show");
  document.querySelector("body").style.overflow = "hidden";
};
const removePropertyFilter = () => {
  document
    .getElementsByClassName("property-filter")[0]
    .classList.remove("show");
  document.querySelector("body").style.overflow = "auto";
};

const updateIpValue = (event) => {
  event.target.parentElement.previousElementSibling.value =
    event.target.innerHTML;
};

const priceInput = Array.from(
  document.getElementsByClassName("budget-filter__dropdownField__input")
);
const rangeInput = Array.from(
  document.getElementsByClassName("budget-filter__range")
);

const updateBHK = (event) => {
  if (event.target.classList.contains("plus")) {
    event.target.classList.remove("plus");
    event.target.classList.add("tick");
  } else {
    event.target.classList.remove("tick");
    event.target.classList.add("plus");
  }
};

const progress = document.querySelector(".budget-filter__progress");
const priceGap = 500000;

rangeInput.forEach((input) => {
  input.addEventListener("input", (e) => {
    let minVal = parseInt(rangeInput[0].value);
    let maxVal = parseInt(rangeInput[1].value);
    let leftPercent = (minVal / rangeInput[0].max) * 100;
    let rightPercent = 100 - (maxVal / rangeInput[1].max) * 100;

    if (maxVal - minVal < priceGap) {
      if (e.target.classList.contains(".budget-filter__range--min")) {
        rangeInput[0].value = maxVal - priceGap;
      } else {
        rangeInput[1].value = minVal + priceGap;
      }
    } else {
      if (minVal < 10000000) {
        document.querySelectorAll(
          ".budget-filter__dropdownField__input"
        )[0].value = "₹" + Math.round(minVal / 1000000).toFixed(2) + " Lac";
      } else {
        document.querySelectorAll(
          ".budget-filter__dropdownField__input"
        )[0].value = "₹" + Math.round(minVal / 10000000).toFixed(2) + " Cr";
      }
      if (maxVal < 10000000) {
        document.querySelectorAll(
          ".budget-filter__dropdownField__input"
        )[1].value = "₹" + Math.round(maxVal / 1000000).toFixed(2) + " Lac";
      } else {
        document.querySelectorAll(
          ".budget-filter__dropdownField__input"
        )[1].value = "₹" + Math.round(maxVal / 10000000).toFixed(2) + " Cr";
      }
      progress.style.left = leftPercent + "%";
      progress.style.right = rightPercent + "%";
    }
  });
});

let suggestions;
const changeTextToRed = (event) => {
  let word = event.target.value;
  let list = document.querySelector(".location-filter__suggestions");
  fetch("https://pokeapi.co/api/v2/pokemon")
    .then((res) => res.json())
    .then((item) => {
      suggestions = item.results;
      if (word.length) {
        list.innerHTML = "";
        suggestions.forEach((val) => {
          if (val.name.indexOf(word) > -1) {
            val.name = val.name.replace(
              word,
              `<span style="color:red;">${word}</span>`
            );
            list.innerHTML += `<li>${val.name}</li>`;
          }
        });
      } else {
        list.innerHTML = "";
      }
    });
};

let selectedCities = [];
const chooseCity = (event) => {
  let input = document.querySelector(".location-filter__input");
  let city = document.querySelector(".location-filter__selectedCityWrapper");
  city.innerHTML += `<div class="location-filter__selectedCity">${event.target.innerText}<span class="location-filter__selectedCity__close-btn"></span></div>`;
  input.value = event.target.innerText;
  selectedCities.push(event.target.innerText);
};

const removeCity = (event) => {
  selectedCities.pop(event.target.innerText);
  if (event.target.className == "location-filter__selectedCity__close-btn") {
    event.target.closest(".location-filter__selectedCity").remove();
  } else {
    event.target.remove();
  }
};
