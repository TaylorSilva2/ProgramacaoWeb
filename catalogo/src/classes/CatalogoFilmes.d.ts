import { Filme } from "src/models/Filmes";
export declare class CatalogoFilmes {
    private filmes;
    adicionarFilme(filme: Filme): void;
    listarFilmes(): void;
    buscarPorTitulo(titulo: string): Filme | undefined;
    buscarPorGenero(genero: string): Filme[];
    removerFilme(titulo: string): void;
}
//# sourceMappingURL=CatalogoFilmes.d.ts.map