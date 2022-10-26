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
        }
    }
    matriuBinaria(selectorTabla());
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
                matrix2[i][j].innerHTML = "<center>" + "&nbsp; 1 &nbsp;" + "</center>";
            } else {
                matrix2[i][j].innerHTML = "<center>" + "&nbsp; 0 &nbsp;" + "</center>";
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
                    minas[Math.round(Math.random() * (x - 1))][Math.round(Math.random() * (y - 1))] = 1;
                    contador++;
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