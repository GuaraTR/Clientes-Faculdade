import { Livro } from '../modelo/Livro';


const baseURL = 'http://localhost:3030/livros';


interface LivroMongo {
    _id: string | null;
    codEditora: number;
    titulo: string;
    resumo: string;
    autores: string[];
}


export class ControleLivro {
    
    async obterLivros(): Promise<Livro[]> {
        try {
            const response = await fetch(baseURL, { method: 'GET' });
            if (!response.ok) {
                throw new Error('Erro ao obter livros');
            }
            const livrosMongo: LivroMongo[] = await response.json();
            return livrosMongo.map(livroMongo => ({
                codigo: livroMongo._id ?? '0', 
                codEditora: livroMongo.codEditora,
                titulo: livroMongo.titulo,
                resumo: livroMongo.resumo,
                autores: livroMongo.autores
            }));
        } catch (error) {
            console.error('Erro ao obter livros:', error);
            return [];
        }
    }


    async excluir(codigo: string): Promise<boolean> {
        try {
            const response = await fetch(`${baseURL}/${codigo}`, { method: 'DELETE' });
            if (!response.ok) {
                throw new Error('Erro ao excluir livro');
            }
            const result = await response.json();
            return result.ok;
        } catch (error) {
            console.error('Erro ao excluir livro:', error);
            return false;
        }
    }


    async incluir(livro: Livro): Promise<boolean> {
        try {
            const livroMongo: LivroMongo = {
                _id: null,
                codEditora: livro.codEditora,
                titulo: livro.titulo,
                resumo: livro.resumo,
                autores: livro.autores
            };

            const response = await fetch(baseURL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(livroMongo)
            });

            if (!response.ok) {
                throw new Error('Erro ao incluir livro');
            }
            const result = await response.json();
            return result.ok;
        } catch (error) {
            console.error('Erro ao incluir livro:', error);
            return false;
        }
    }
}
