//VARIABLES GLOBALES (usadas en la primera función)
let x; //almacena longitud x
let y; //almacena longitud y
let min; //almacena numero de minas en el juego
let tablero; //almacena array binario 

//LOCALSTORAGE PARA RECOGER PUNTUACIONES
if (localStorage.getItem("puntuacion") != null) {
    document.getElementById('ul').insertAdjacentHTML('beforeend', localStorage.getItem("puntuacion"));
}


//FUNCION PARA CREAR LA TABLA E INICIALIZAR VALORES
function inicialitzaJoc() {
    //LLENAR INPUTS
    let a = parseInt(document.getElementById("x").value);
    let b = parseInt(document.getElementById("y").value);
    min = document.getElementById("numeroMinas").value;
    x = a;
    y = b;
    tablero = inicialitzaMines(min, x, y);
    //BUCLES PARA CREAR FILAS Y COLUMNAS
    for (let i = 0; i < x; i++) {
        let filaActual = document.getElementById('tabla').insertRow(i);
        for (let j = 0; j < y; j++) {
            let celda = filaActual.insertCell(j);
            celda.innerHTML = '&nbsp;&nbsp;&nbsp;'
            celda.setAttribute("id", "X:" + i + " " + "Y:" + j);
        }
    }
    //OCULTAR BOTONES DEL HTML
    document.getElementById("boton").style.display = "none";
    document.getElementById("x").style.display = "none";
    document.getElementById("y").style.display = "none";
    document.getElementById("numeroMinas").style.display = "none";
    document.getElementById("crono").style.display = "inline";
}

//FUNCION QUE SELECCIONA LA TABLA FISICA DEL HTML
function selectorTabla() {
    let rows = document.querySelector("tbody").children
    let matrix = []
    for (let i = 0; i < rows.length; i++) {
        matrix.push(rows[i].children)
    }
    return matrix;
}

//FUNCION PARA CREAR TABLA BINARIA CON LAS MINAS PUESTAS ALEATORIAMENTE
function inicialitzaMines(nminas, x, y) {
    //ARRAY BINARIO
    let minas = new Array(x);
    for (let i = 0; i < x; i++) {
        minas[i] = new Array(y);
    }
    let contador = 0;
    for (let i = 0; i < x; i++) {
        for (let j = 0; j < y; j++) {
            if (contador != nminas) {
                for (let k = 0; k < nminas; k++) {
                    let numero1 = Math.round(Math.random() * (x - 1));
                    let numero2 = Math.round(Math.random() * (y - 1));
                    if (!minas[numero1][numero2] == 1) {
                        minas[numero1][numero2] = 1;
                        contador++;
                    } else {
                        k--;
                    }
                }
            }
            if (minas[i][j] != 1) {
                minas[i][j] = 0;
            }
        }
    }
    console.log(minas);
    return minas;
}

//FUNCION ONCLICK
document.addEventListener("click", (e) => {
    if (e.target.tagName == 'TD') {
        console.log(e.target.id)
        let regex = /(\d+)/g;
        //EXTRAEMOS LAS COORDENADAS A PARTIR DEL ID
        let string = e.target.id.split(' ');
        let a = parseInt(string[0].match(regex));
        let b = parseInt(string[1].match(regex));
        //ENTRAMOS EN LA FUNCION QUE EVALUARÁ EL CLICK
        buscaminas(a, b);
    }
})

//FUNCION PARA PINTAR EN VERDE UNA CASILLA CON CLICK DERECHO
document.addEventListener("contextmenu", (e) => {
    if (e.target.tagName == 'TD') {
        e.target.style.backgroundColor = "green";
    }
});

//FUNCION QUE CUENTA EL NUMERO DE MINAS ALREDEDOR
function contador(x, y) {
    let contador = 0;
    for (let i = x - 1; i < x + 2; i++) {
        for (let j = y - 1; j < y + 2; j++) {
            try {
                if (i == x - 1 || i == x + 1) {
                    if (tablero[i][j] == 1) { contador++; }
                } else {
                    if (j == y + 1 || j == y - 1) {
                        if (tablero[i][j] == 1) { contador++; }
                    }
                }
            } catch (error) {}
        }
    }
    return contador;
}

//FUNCION QUE MIRA LOS ALREDEDORES DE UNA CASILLA
function buscaespacios(x, y) {
    matrix = selectorTabla();
    for (let i = x - 1; i < x + 2; i++) {
        for (let j = y - 1; j < y + 2; j++) {
            try {
                if (i == x - 1 || i == x + 1) {
                    matrix[i][j].innerHTML = contador(i, j);
                } else {
                    if (j == y + 1 || j == y - 1) {
                        matrix[i][j].innerHTML = contador(i, j);
                    }
                }
            } catch (error) {}
        }
    }
}

//FUNCIÓN QUE EVALUA LA LÓGICA DEL JUEGO
function buscaminas(x, y) {
    let fin = true;
    matrix = selectorTabla();
    if (tablero[x][y] == 1) { //SI PISAS UNA MINA ...
        parar();
        document.getElementsByTagName("table")[0].style.pointerEvents = "none";
        document.getElementsByTagName("table")[0].style.backgroundColor = "grey";
        document.getElementById("lost").style.display = "block";
        for (let i = 0; i < matrix.length; i++) {
            for (let j = 0; j < matrix[0].length; j++) {
                matrix[i][j].style.backgroundColor = "grey";
            }
        }
        matrix[x][y].style.backgroundColor = "red";
        return ""
    }
    buscaespacios(x, y); //EVALUAMOS LOS ALREDEDORES DE LA CASILLA PINCHADA
    matrix[x][y].innerHTML = contador(x, y); // EVALUAMOS LA CASILLA PINCHADA

    //EVALUAMOS SI EL JUEGO DEBERIA TERMINAR MIRANDO LAS CASILLAS DESTAPADAS
    for (let i = 0; i < matrix.length; i++) {
        for (let j = 0; j < matrix[0].length; j++) {
            if (matrix[i][j].innerHTML == '&nbsp;&nbsp;&nbsp;') {
                fin = false; //SI QUEDAN CASILLAS POR DESTAPAR EL FIN DEL JUEGO ES FALSO
                break;
            }
        }
    }
    if (fin) { //SI NO QUEDAN CASILLAS POR DESTAPAR FIN
        parar(); //SE PARA EL CRONOMETRO
        document.getElementsByTagName("table")[0].style.pointerEvents = "none";
        document.getElementsByTagName("table")[0].style.backgroundColor = "green";
        document.getElementById("win").style.display = "block";
        for (let i = 0; i < matrix.length; i++) {
            for (let j = 0; j < matrix[0].length; j++) {
                matrix[i][j].style.backgroundColor = "green";
            }
        }
        puntuaciones(); //LLAMAMOS FUNCION QUE SE ENCARGA DE REGISTRAR PUNTUACIONES

    }
}

//CRONOMETRO
var h1 = document.getElementsByTagName('h1')[0];
var sec = 0;
var minutos = 0;
var hrs = 0;
var t;

function tick() {
    sec++;
    if (sec >= 60) {
        sec = 0;
        minutos++;
        if (minutos >= 60) {
            minutos = 0;
            hrs++;
        }
    }
}

function add() {
    tick();
    h1.textContent = (hrs > 9 ? hrs : "0" + hrs) +
        ":" + (minutos > 9 ? minutos : "0" + minutos) +
        ":" + (sec > 9 ? sec : "0" + sec);
    timer();
}

function timer() {
    t = setTimeout(add, 1000);
}
let parar = function() {
    clearTimeout(t);
}

document.getElementById('tabla').addEventListener("click", timer, { once: true }) //EL CRONOMETRO EMPIEZA CON EL PRIMER CLICK EN UNA CELDA

//PUNTUACIONES
function panel() {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(prompt("Introduce tu nombre"));
        });
    });
}
async function puntuaciones() {
    let person = await panel();
    let ul = document.getElementById("ul");
    let li = document.createElement("li");
    li.appendChild(document.createTextNode(person + " : " + document.getElementById("crono").textContent));
    ul.appendChild(li);
    localStorage.setItem("puntuacion", document.getElementById("ul").innerHTML)
}