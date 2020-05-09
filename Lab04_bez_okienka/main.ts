// Sprawdza, czy formularz został wypełniony poprwnymi danymi.
function goodForm() {
    let name : string = (<HTMLInputElement>document.getElementById("fname")).value;
    let surname : string = (<HTMLInputElement>document.getElementById("lname")).value;
    let date : string = (<HTMLInputElement>document.getElementById("date")).value;
    let origin : string = (<HTMLInputElement>document.getElementById("origin")).value;
    let destination : string = (<HTMLInputElement>document.getElementById("destination")).value;
    if (name === "") {
        return false;
    }
    if (surname === "") {
        return false;
    }
    if (origin === "") {
        return false;
    }
    if (destination === "") {
        return false;
    }
    var current = new Date();
    if (date < formatDate(current)) {
        return false;
    }
    return true;
}

// Wypisuje dane podane w formularzu.
function showInfo() {
    let name : string = (<HTMLInputElement>document.getElementById("fname")).value;
    let surname : string = (<HTMLInputElement>document.getElementById("lname")).value;
    let date : string = (<HTMLInputElement>document.getElementById("date")).value;
    let origin : string = (<HTMLInputElement>document.getElementById("origin")).value;
    let destination : string = (<HTMLInputElement>document.getElementById("destination")).value;
    alert('Name: ' + name + '\nSurname: ' + surname + '\ndate: ' + date + '\norigin: ' + origin +'\ndestination: ' + destination);
}

// Blokuje przycisk przesłania formularza.
function disable() {
    (<HTMLInputElement>document.getElementById("sub")).disabled = true;
}
// Odblokowuje przycisk przesłania formularza.
function enable() {
    (<HTMLInputElement>document.getElementById("sub")).disabled = false;
}

// Sprawdza, czy formularz jest prawidłowo wypełniony. Blokuje/odblokowuje przycisk, jeśli to konieczne.
function check() {
    if (!goodForm()) {
        disable();
    } else {
        enable();
    }
}

// Przekształca datę na napis.
function formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;

    return [year, month, day].join('-');
}

// Zwraca obietnicę z danym czasem wykonania (w milisekundach)
function getPromise(millis) {
    let promise = new Promise(function(resolve, reject) {
        setTimeout(() => resolve("done"), millis);
      });
    return promise;
}

// Zmienia kolor tła na podany.
function changeColour(col) {
    document.body.style.backgroundColor = col;
}

// Zmienia kolor tła co 1 sekundę, przez 7 sekund.
function rainbow() {
    let def = document.body.style.backgroundColor;
    var promises = new Array();
    for (var i = 1; i <= 8; ++i) {
        promises.push(getPromise(i * 1000));
    }
    promises[0].then(
        result => changeColour("red"),
        error => alert(error)
    )
    promises[1].then(
        result => changeColour("orange"),
        error => alert(error)
    )
    promises[2].then(
        result => changeColour("yellow"),
        error => alert(error)
    )
    promises[3].then(
        result => changeColour("green"),
        error => alert(error)
    )
    promises[4].then(
        result => changeColour("blue"),
        error => alert(error)
    )
    promises[5].then(
        result => changeColour("indigo"),
        error => alert(error)
    )
    promises[6].then(
        result => changeColour("purple"),
        error => alert(error)
    )
    promises[7].then(
        result => document.body.style.backgroundColor = def,
        error => alert(error)
    )
}

// 3 możliwe kolory dla tła odwołanych lotów i formularza.
var colours = new Array();
colours.push("paleturquoise");
colours.push("purple");
colours.push("yellow");

// Zwraca 10-tą kolejną liczbę Fibonacciego przy każdym wywołaniu.
var fibo1 = 0;
var fibo2 = 1;
function nextFib10 () {
    var res = 0;
    for (var i = 0; i < 10; ++i) {
        var sum = fibo1 + fibo2;
        fibo1 = fibo2;
        fibo2 = sum;
        if (i == 8) {
            res = fibo1;
        }
    }
    return res;
}

// Zmienia kolor tła odwołanych lotów i formularzy (cyklicznie 3 kolory).
// Wypisuje 10*i - tą liczbe Fibonacciego  przy i-tym kliknięciu.
// Nie robi nic przy klincięciu w jedno z pól formularza.
var clicks = 0;
function change(event) {
    let place : string = event.target.nodeName;
    if (place != "INPUT" && place != "BUTTON") {
        clicks += 1;
        var col = clicks % 3;
        document.getElementById("can").style.backgroundColor = colours[col];
        document.getElementById("item").style.backgroundColor = colours[col];
        console.log(nextFib10());
    }
}

// Wpisuje w formulrz przykładowe dane.
var date = new Date();
(<HTMLInputElement>document.getElementById("date")).value = formatDate(date);
(<HTMLInputElement>document.getElementById("fname")).value = "Andrzej";
(<HTMLInputElement>document.getElementById("lname")).value = "Siuciak";

// Zmienia treść głównego artykułu.
document.getElementById("lorem").innerHTML = "Hello darkness, my old friend I have come to talk with you again Because a vision softly creeping Left its seeds while I was sleeping And the vision that was planted in my brain Still remains Within the sound of silence";

// Dodaje nowy element na dole strony.
let newElement = document.createElement('div');
let newPara = document.createElement('p');
let newText = document.createTextNode('To jest nowy element strony.');
newPara.appendChild(newText);
newElement.appendChild(newPara);
document.body.appendChild(newElement);

// Odpala "tęczową iluminację".
rainbow();

// Wyszukuje link do zdjęcia autora ostatniego commitu w danym repozytorium.
function extract(data) {
    if (data instanceof Array) {
        if ("author" in data[0]) {
            if ("avatar_url" in data[0]["author"]) {
                return data[0]["author"]["avatar_url"];
            }
        }
    }
    return null;
}

// Pobiera dane o commitach w danym repozytorium i wypisuje link do zdjęcia autora ostaniego commitu (o ile go znajdzie).
fetch('https://api.github.com/repos/Microsoft/TypeScript/commits')
    .then(response => response.json())
    .then(data => console.log(extract(data)));