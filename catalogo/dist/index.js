"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const prompt_sync_1 = __importDefault(require("prompt-sync"));
const CatalogoFilmes_1 = require("./classes/CatalogoFilmes");
const prompt = (0, prompt_sync_1.default)();
const catalogo = new CatalogoFilmes_1.CatalogoFilmes();
let opcao;
do {
    console.log("\nCATÁLOGO DE FILMES");
    console.log("1 - Adicionar filme");
    console.log("2 - Listar filmes");
    console.log("3 - Buscar por título");
    console.log("4 - Buscar por gênero");
    console.log("5 - Remover filme");
    console.log("0 - Sair");
    opcao = Number(prompt("Escolha uma opção: "));
    switch (opcao) {
        case 1:
            const titulo = prompt("Título: ");
            const ano = Number(prompt("Ano: "));
            const genero = prompt("Gênero: ");
            const duracao = Number(prompt("Duração: "));
            const avaliacaoInput = prompt("Avaliação (0-10 ou vazio): ");
            const avaliacao = avaliacaoInput ? Number(avaliacaoInput) : undefined;
            catalogo.adicionarFilme({
                titulo,
                ano,
                genero,
                duracao,
                avaliacao
            });
            break;
        case 2:
            catalogo.listarFilmes();
            break;
        case 3:
            const buscaTitulo = prompt("Digite o título: ");
            const filme = catalogo.buscarPorTitulo(buscaTitulo);
            console.log(filme || "Filme não encontrado.");
            break;
        case 4:
            const buscaGenero = prompt("Digite o gênero: ");
            const filmes = catalogo.buscarPorGenero(buscaGenero);
            console.log(filmes);
            break;
        case 5:
            const remover = prompt("Título para remover: ");
            catalogo.removerFilme(remover);
            break;
        case 0:
            console.log("Saindo...");
            break;
        default:
            console.log("Opção inválida.");
    }
} while (opcao !== 0);
