import { Filme } from "../models/Filmes";

export class CatalogoFilmes {
  private filmes: Filme[] = [];

  adicionarFilme(filme: Filme): void {
    if (filme.avaliacao !== undefined && (filme.avaliacao < 0 || filme.avaliacao > 10)) {
      console.log("Avaliação deve ser entre 0 e 10.");
      return;
    }

    this.filmes.push(filme);
    console.log("Filme adicionado com sucesso!");
  }

  listarFilmes(): void {
    if (this.filmes.length === 0) {
      console.log("Nenhum filme cadastrado.");
      return;
    }

    this.filmes.forEach(f => {
      console.log(`${f.titulo} (${f.ano}) - ${f.genero}`);
    });
  }

  buscarPorTitulo(titulo: string): Filme | undefined {
    return this.filmes.find(f => f.titulo.toLowerCase() === titulo.toLowerCase());
  }

  buscarPorGenero(genero: string): Filme[] {
    return this.filmes.filter(f => f.genero.toLowerCase() === genero.toLowerCase());
  }

  removerFilme(titulo: string): void {
    this.filmes = this.filmes.filter(f => f.titulo !== titulo);
    console.log("Filme removido (se existia).");
  }
}