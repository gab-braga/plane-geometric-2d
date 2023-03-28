import { COMPUTACAO_FRAMES } from "./frames/computacao.js";
import { Ponto } from "./objects.js";

let LENGTH = 61;
let OBJETO = [];
let DELAY = 100;
let ANIMATE_MODE = 0; // INFINITE

function criarGrade(length = LENGTH) {
    const table = document.getElementById("grade");
    let grade = "";
    for (let y = 1; y <= 30; y++) {
        grade += "<tr>";
        for (let x = 1; x <= length; x++) {
            grade += `<td data-x="${x}" data-y="${y}" title='(${x},${y})'></td>`;
        }
        grade += "</tr>";
    }
    table.innerHTML = grade;
}
criarGrade();

function iniciarControlesGrade() {
    const celulas = document.querySelectorAll(".grade td");
    for (let celula of celulas) {
        celula.addEventListener("click", ativarCelula);
    }
}
iniciarControlesGrade();

function ativarCelula(event) {
    const celula = event.target;
    const cor = document.getElementById("color-cell").value;
    const x = parseInt(celula.dataset.x);
    const y = parseInt(celula.dataset.y);
    const index = findIndex(x, y);
    if (index === -1) {
        if (cor) {
            celula.style.backgroundColor = cor;
        } else {
            celula.style.backgroundColor = "black";
        }
        OBJETO.push(new Ponto(x, y, cor));
    }
    else {
        celula.style.backgroundColor = "";
        OBJETO.splice(index, 1);
    }
}

function findIndex(x, y) {
    for(let index = 0; index < OBJETO.length; index++) {
        if(OBJETO[index].x === x && OBJETO[index].y === y) {
            return index;
        }
    }
    return -1;
}

function desenharObjeto(pontos = []) {
    OBJETO = pontos;
    criarGrade();
    const table = document.getElementById("grade");
    for (let ponto of pontos) {
        const { x, y } = ponto;
        let celula;
        try {
            celula = table.children[y - 1].children[x - 1];
            if (ponto.color) {
                celula.style.backgroundColor = ponto.color;
            } else {
                celula.classList.add("active");
            }
        }
        catch (err) {
            // Caso a coordenada não seja encontrada, o algoritmo ignora
        }
    }
}

const timer = (miliseconds) => {
    return new Promise(res => setTimeout(res, miliseconds));
}

async function desenharFrames(frames = []) {
    for (let frame of frames) {
        desenharObjeto(frame)
        await timer(DELAY)
    }
}

async function animar(frames = []) {
    while (ANIMATE_MODE == 0) {
        await desenharFrames(frames);
    }
}

animar(COMPUTACAO_FRAMES);