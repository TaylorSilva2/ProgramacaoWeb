"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CatalogoFilmes = void 0;
const Filmes_1 = require("src/models/Filmes");
class CatalogoFilmes {
    filmes = [];
    adicionarFilme(filme) {
        if (filme.avaliacao !== undefined && (filme.avaliacao < 0 || filme.avaliacao > 10)) {
            console.log("Avaliação deve ser entre 0 e 10.");
            return;
        }
        this.filmes.push(filme);
        console.log("Filme adicionado com sucesso!");
    }
    listarFilmes() {
        if (this.filmes.length === 0) {
            console.log("Nenhum filme cadastrado.");
            return;
        }
        this.filmes.forEach(f => {
            console.log(`${f.titulo} (${f.ano}) - ${f.genero}`);
        });
    }
    buscarPorTitulo(titulo) {
        return this.filmes.find(f => f.titulo.toLowerCase() === titulo.toLowerCase());
    }
    buscarPorGenero(genero) {
        return this.filmes.filter(f => f.genero.toLowerCase() === genero.toLowerCase());
    }
    removerFilme(titulo) {
        this.filmes = this.filmes.filter(f => f.titulo !== titulo);
        console.log("Filme removido (se existia).");
    }
}
exports.CatalogoFilmes = CatalogoFilmes;
//# sourceMappingURL=CatalogoFilmes.js.map