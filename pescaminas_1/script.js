function inicialitzaJoc() {
    //INPUTS
    let x = parseInt(document.getElementById("x").value);
    let y = parseInt(document.getElementById("y").value);
    //BUCLES PARA LLENAR FILAS Y COLUMNAS
    for (let i = 0; i < x; i++) {
        let filaActual = document.getElementById('tabla').insertRow(i);
        for (let j = 0; j < y; j++) {
            let celda = filaActual.insertCell(j);
            celda.innerHTML = '&nbsp;&nbsp;&nbsp;'
            celda.setAttribute("id", "X:" + i + " " + "Y:" + j);
        }
    }
}

//FUNCION QUE SELECCIONA LA TABLA PINTADA EN EL HTML
function selectorTabla() {
    let rows = document.querySelector("tbody").children
    let matrix = []
    for (let i = 0; i < rows.length; i++) {
        matrix.push(rows[i].children)
    }
    return matrix;
}

//FUNCION BINARIZAR ARRAY
function matriuBinaria(matrix) {
    let matrix2 = matrix;
    for (let i = 0; i < matrix.length; i++) {
        for (let j = 0; j < matrix[0].length; j++) {
            if (matrix[i][j].style.backgroundColor == "red") {
                matrix2[i][j].innerHTML = "1";
            } else {
                matrix2[i][j].innerHTML = "0";
            }
        }
    }
    return matrix2;
}
//FUNCION INICIAR MINAS
function inicialitzaMines(nminas, x, y) {
    //VARIABLE GLOBAL MINAS
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

//FUNCION PINTAR ARRAYS BINARIOS
function pintaMinas(matrix) {
    //TABLA Y MATRIX TIENEN LA MISMA LONGITUD YA QUE AMBOS RECIBEN COMO PARAMETRO LOS INPUTS DEL HTML
    tabla = selectorTabla();
    for (let i = 0; i < matrix.length; i++) {
        for (let j = 0; j < matrix[0].length; j++) {
            if (matrix[i][j] == 1) {
                tabla[i][j].style.backgroundColor = "red";
            } else {
                tabla[i][j].style.backgroundColor = "white";
            }
        }
    }
    return tabla;
}
//FUNCION PARA VER EL RESULTADO DE LAS MINAS INICIADAS Y PINTADAS
function iniciarMinas() {
    //INPUTS
    let x = parseInt(document.getElementById("x").value);
    let y = parseInt(document.getElementById("y").value);
    let minasIniciadas = inicialitzaMines(5, x, y);
    pintaMinas(minasIniciadas);

}

//FUNCION ONCLICK

document.addEventListener("click", (e) => {
    if (e.target.tagName == 'TD') {
        console.log(e.target.id)
        let regex = /(\d+)/g;
        let string = e.target.id.split(' ');
        let x = parseInt(string[0].match(regex));
        let y = parseInt(string[1].match(regex));
        buscaminas(x, y);
    }
})

// NUMEROS BUSCAMINAS //

function contador(x, y) {
    matrix = selectorTabla();
    let contador = 0;
    for (let i = x - 1; i < x + 2; i++) {
        for (let j = y - 1; j < y + 2; j++) {
            try {
                if (i == x - 1 || i == x + 1) {
                    if (matrix[i][j].style.backgroundColor == "red") { contador++; }
                } else {
                    if (j == y + 1 || j == y - 1) {
                        if (matrix[i][j].style.backgroundColor == "red") { contador++; }
                    }
                }
            } catch (error) {}
        }
    }
    return contador;
}

function buscaminas(x, y) {
    matrix = selectorTabla();
    matrix[x][y].innerHTML = "<center>" + contador(x, y) + "</center>";
}