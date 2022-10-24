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
    //USAMOS LA MATRIZ CREADA POR ESTA FUNCION PARA DEMOSTRAR LA RESOLUCION DEL EJERCICIO 2
    let rows = document.querySelector("tbody").children
    let matrix = []
    for (var i = 0; i < rows.length; i++) {
        matrix.push(rows[i].children)
    }
    //LAMAMOS A LA FUNCION DEL EJERCICIO 2
    matriuBinaria(matrix);

}


//FUNCION EJERCICIO 2
function matriuBinaria(matrix) {
    var matrix2 = matrix;
    for (var i = 0; i < matrix.length; i++) {
        for (var j = 0; j < matrix[0].length; j++) {
            if (matrix[i][j].style.backgroundColor == "red") {
                matrix2[i][j].innerHTML = "<center>" + "&nbsp; 1 &nbsp;" + "</center>";
            } else {
                matrix2[i][j].innerHTML = "<center>" + "&nbsp; 0 &nbsp;" + "</center>";
            }
        }
    }
    return matrix2;
}