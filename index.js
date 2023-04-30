document.addEventListener("DOMContentLoaded", () => {
    loadTotal();
    loadCheckboxes();
    loadInfoCar();
    loadNameSurname();
    payment();
  });
  
  function loadCheckboxes() {
    if (localStorage.getItem("akcesoria") !== null) {
      checkboxes();
    }
  }
  
  function payment() {
    const pay = JSON.parse(localStorage.getItem("payment"));
    const payMethod = pay.platnosc;
  
    const radioLeasing = document.querySelector("#radio-leasing");
    const radioGotowka = document.querySelector("#radio-gotówka");
  
    if (payMethod === "gotówka") {
      radioGotowka.checked = true;
    } else if (payMethod === "leasing") {
      radioLeasing.checked = true;
    }
  }
  
  function loadTotal() {
    const total = localStorage.getItem("total");
    if (total !== null) {
      function displayTotalCost() {
        const cenaCalkowita = document.getElementById("cena-calkowita");
        const elementyP = cenaCalkowita.querySelectorAll("p");
        function removePara() {
          if (elementyP.length > 0) {
            elementyP.forEach((element) => {
              cenaCalkowita.removeChild(element);
            });
          }
        }
        removePara();
  
        const paragraf = document.createElement("p");
        paragraf.textContent = `Cena całkowita: ${total} zł`;
        cenaCalkowita.appendChild(paragraf);
      }
      displayTotalCost();
    }
  }
  
  function loadInfoCar() {
    const infoSamochod = JSON.parse(localStorage.getItem("infoSamochod"));
    if (infoSamochod !== null) {
      wyswietlInfoSamochodu();
    }
  }
  
  function loadNameSurname() {
    const name = localStorage.getItem("name");
    const surname = localStorage.getItem("surname");
  
    if (name !== null && surname !== null) {
      wyswietlNameSurname(name, surname);
    }
  }
  
  function wyswietlNameSurname(name, surname) {
    const inputUserData = document.getElementById("user-data");
  
    if (name === undefined || surname === undefined) {
      inputUserData.value = "wypełnij to pole";
    } else {
      inputUserData.value = `${name} ${surname}`;
    }
  
    if (name === "undefined" || surname === "undefined") {
      inputUserData.value = "wypełnij to pole";
    } else {
      inputUserData.value = `${name} ${surname}`;
    }
  }
  
  const auta = [];
  
  // Pobieramy listę elementów <li> z klasy "auta"
  const listaAuta = document.querySelectorAll(".auta li");
  
  // Przechodzimy przez każdy element listy i tworzymy obiekt dla każdego samochodu
  listaAuta.forEach(function (car) {
    // Tworzymy obiekt reprezentujący samochód
    const samochod = {};
  
    // Pobieramy nazwę samochodu
    const nazwa = car.querySelector("h3").innerHTML;
    samochod.nazwa = nazwa;
  
    // Pobieramy rocznik samochodu
    const rocznik = car
      .querySelector("p:nth-of-type(1)")
      .innerHTML.split(": ")[1];
    samochod.rocznik = parseInt(rocznik);

    
    // Pobieramy cenę samochodu
    const cena = car.querySelector("p:nth-of-type(2)").innerHTML.split(": ")[1];
    samochod.cena = parseFloat(cena.replace(/,/g, ""));

    /// Pobieramy obrazek samochodu
    const obrazek = car.querySelector("img").getAttribute("src");
     samochod.obrazek = obrazek;
  
    const przycisk = car.querySelector("button").id;
    samochod.przycisk = przycisk;
  
    // Dodajemy nowo utworzony obiekt do tablicy auta
    auta.push(samochod);
  });
  
  console.log(auta);
  
  function checkboxes() {
    const akcesoria = JSON.parse(localStorage.getItem("akcesoria"));
    if (akcesoria.klimatyzacja === true) {
      const checkbox1 = document.getElementById("check-klimatyzacja");
      checkbox1.checked = true;
    }
  
    if (akcesoria.nawigacja === true) {
      const checkbox2 = document.getElementById("check-nawigacja");
      checkbox2.checked = true;
    }
  }
    function handleClick(event) {
    const id = event.target.id;
    console.log("Kliknięto przycisk o ID: ", id);
    localStorage.removeItem("total");
  
    const samochod = auta.find((car) => car.przycisk === id);
    if (samochod) {
      const infoSamochod = {
        nazwa: samochod.nazwa,
        rocznik: samochod.rocznik,
        cena: samochod.cena,
        obrazek: samochod.obrazek,
      };
      console.log("to jest obiekt" + infoSamochod);
      //localstorage !!!
      localStorage.setItem("infoSamochod", JSON.stringify(infoSamochod));
      const akcesoria = {
        klimatyzacja: false,
        nawigacja: false,
      };
      localStorage.setItem("akcesoria", JSON.stringify(akcesoria));
      }
    wyswietlInfoSamochodu();
  
    const cenaCalkowitaElement = document.getElementById("cena-calkowita");
    const elementyP = cenaCalkowitaElement.querySelectorAll("p");
  
  
    function removePara() {
      if (elementyP.length > 0) {
        elementyP.forEach((element) => {
          cenaCalkowitaElement.removeChild(element);
        });
      }
    }
    removePara();
  }
  
  const buttons = document.getElementsByClassName("btn-car");
  
  Array.from(buttons).forEach((button) => {
    button.addEventListener("click", handleClick);
  });
  
  ///formularz
  // Pobieramy oba radio buttony
  const radioLeasing = document.querySelector("#radio-leasing");
  const radioGotowka = document.querySelector("#radio-gotówka");
  
  // Dodajemy nasłuchiwanie kliknięcia w radio buttony
  radioLeasing.addEventListener("click", handlePaymentChange);
  radioGotowka.addEventListener("click", handlePaymentChange);
  
  // Funkcja obsługująca zmianę wybranej opcji płatności
  function handlePaymentChange() {
    // Pobieramy wartość klikniętego radio buttona
    const selectedValue = document.querySelector(
      'input[name="finansowanie"]:checked'
    ).value;
  
    // Tworzymy obiekt z odpowiednim kluczem i wartością
    const payment = {
      platnosc: selectedValue,
    };
  
    // Wyświetlamy utworzony obiekt w konsoli
    console.log(payment);
    localStorage.setItem("payment", JSON.stringify(payment));
  }
  const input = document.querySelector("#user-data");
  
  input.addEventListener("change", function () {
    const imieNazwisko = input.value;
    console.log(imieNazwisko);
    // destrukturyzacja Array (od 2015)
    const [name, surname] = imieNazwisko.split(" ");
  
    console.log(name); // Janina
    console.log(surname); // Kowalska
    localStorage.setItem("name", JSON.stringify(name));
    localStorage.setItem("surname", JSON.stringify(surname));
  });
  
  const akcesoria = JSON.parse(localStorage.getItem("akcesoria")) || {
    klimatyzacja: false,
    nawigacja: false,
  };
  
  const klimatyzacjaCheckbox = document.querySelector("#check-klimatyzacja");
  const nawigacjaCheckbox = document.querySelector("#check-nawigacja");
  
  klimatyzacjaCheckbox.addEventListener("click", function (event) {
    // podmień wartość w obiekcie akcesoria
    akcesoria.klimatyzacja = event.target.checked;
  
    // zapisz obiekt w localStorage
    localStorage.setItem("akcesoria", JSON.stringify(akcesoria));
  
    console.log(akcesoria);
    wyswietlCene();
  });
  
  nawigacjaCheckbox.addEventListener("click", function (event) {
    // podmień wartość w obiekcie akcesoria
    akcesoria.nawigacja = event.target.checked;
  
    // zapisz obiekt w localStorage
    localStorage.setItem("akcesoria", JSON.stringify(akcesoria));
  
    console.log(akcesoria);
    wyswietlCene();
  });
  const dateInput = document.querySelector("#date");
  
  function setCurrentDate() {
    const today = new Date();
    const upToDays = new Date(today);
    upToDays.setDate(today.getDate() + 14);
    dateInput.min = upToDays.toISOString().split("T")[0];
  }
  setCurrentDate();
  
  dateInput.addEventListener("input", function (event) {
    const selectedDate = event.target.value;
    console.log(selectedDate);
    localStorage.setItem("data", JSON.stringify(selectedDate));
  });
  
  function wyswietlInfoSamochodu() {
    const samochodInfoElement = document.getElementById("samochod-info");
    const elementyP = samochodInfoElement.querySelectorAll("p");
  
    // Jeśli istnieją, to je usuwamy
    if (elementyP.length > 0) {
      elementyP.forEach((element) => {
        samochodInfoElement.removeChild(element);
      });
    }
    const infoSamochod = localStorage.getItem("infoSamochod");
  
    const parsedData = JSON.parse(infoSamochod);
    const nazwaSamochodu = parsedData.nazwa;
    console.log(nazwaSamochodu);
  
    const parsedCena = JSON.parse(infoSamochod);
    const cenaSamochodu = parsedCena.cena;
    console.log(cenaSamochodu);

    const parsedObrazek = JSON.parse(infoSamochod);
const obrazekSamochodu = parsedData.obrazek;
console.log(obrazekSamochodu);

    
    
    
    // Tworzymy elementy p i wprowadzamy do nich wartości zmiennych
    const nazwaSamochoduElement = document.createElement("p");
    nazwaSamochoduElement.innerHTML = `Nazwa: ${nazwaSamochodu}`;
  
    const cenaSamochoduElement = document.createElement("p");
    cenaSamochoduElement.innerHTML = `Cena: ${cenaSamochodu} PLN`;

    //// !!! stworzenie elementu img
    
    const obrazekSamochoduElement = document.createElement("p");
const imgElement = document.createElement("img");
imgElement.src = obrazekSamochodu;
imgElement.alt = parsedData.nazwa;
imgElement.width = "500";
obrazekSamochoduElement.appendChild(imgElement);
samochodInfoElement.appendChild(obrazekSamochoduElement);

// Dodajemy element <img> do strony
const divSamochodu = document.createElement("div");
divSamochodu.appendChild(obrazekSamochoduElement);
  
// Dodajemy elementy p do elementu HTML
    samochodInfoElement.appendChild(nazwaSamochoduElement);
    samochodInfoElement.appendChild(cenaSamochoduElement);
    samochodInfoElement.appendChild(obrazekSamochoduElement);
  }
  
  function wyswietlCene() {
    const cenaCalkowitaElement = document.getElementById("cena-calkowita");
    const elementyP = cenaCalkowitaElement.querySelectorAll("p");
  
    function removePara() {
      if (elementyP.length > 0) {
        elementyP.forEach((element) => {
          cenaCalkowitaElement.removeChild(element);
        });
      }
    }
    removePara();
  
    const infoSamochod = localStorage.getItem("infoSamochod");
    const parsedCena = JSON.parse(infoSamochod);
    const cenaSamochodu = parsedCena.cena;
    const parsedObrazek = JSON.parse(infoSamochod);
    const obrazekSamochodu = parsedObrazek.cena;
    
    
  
    function getAkcesoriaFromLocalStorage() {
      const akcesoriaString = localStorage.getItem("akcesoria");
      const akcesoriaObject = JSON.parse(akcesoriaString);
      return akcesoriaObject;
    }
  
    let total = cenaSamochodu;
  
    function updateTotalPrice() {
      const akcesoria = getAkcesoriaFromLocalStorage();
  
      if (akcesoria && akcesoria.klimatyzacja) {
        total += 1000;
      }
  
      if (akcesoria && akcesoria.nawigacja) {
        total += 800;
      }
  
      console.log(`Total price: ${total}`);
  
      localStorage.setItem("total", JSON.stringify(total));
    }
  
    updateTotalPrice();
  
    const paragraf = document.createElement("p");
    paragraf.textContent = `Cena całkowita: ${total} zł`;
  
    cenaCalkowitaElement.appendChild(paragraf);
  }
  
//   funkcja goback
function goBack() {
  document.getElementById("formularz").style.display = "none";
  document.getElementById("podsumowanie").style.display = "none";
  document.getElementById("wybierz-samochod").scrollIntoView();
} 

// czyszczeni local storage
function clearLocalStorage() {
  localStorage.clear();
}

var infoSamochod = JSON.parse(localStorage.getItem("infoSamochod"));
var marka = infoSamochod.nazwa;
var cena = infoSamochod.cena;
var obrazek = infoSamochod.obrazek;
var data = JSON.parse(localStorage.getItem("data"));

// Utwórz elementy HTML
let h2 = document.createElement("h2");
h2.textContent = marka;

let p1 = document.createElement("p");
p1.textContent = "Cena całkowita: " + cena;

let p2 = document.createElement("p");
p2.textContent = "Data: " + data;

let img = document.createElement("img");
img.src = obrazek;
img.classList.add("podsumowanie-img");

// Dodaj elementy do sekcji Podsumowanie
var podsumowanie = document.getElementById("podsumowanie");
podsumowanie.appendChild(h2);
podsumowanie.appendChild(p1);
podsumowanie.appendChild(p2);
podsumowanie.appendChild(img);








  