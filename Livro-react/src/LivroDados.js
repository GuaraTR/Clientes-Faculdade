import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ControleLivro } from './controle/ControleLivros';
import { ControleEditora } from './controle/ControleEditora';

const controleLivro = new ControleLivro();
const controleEditora = new ControleEditora();

export default function LivroDados() {
    
    const opcoes = controleEditora.getEditoras().map((editora) => ({
        value: editora.codEditora,
        text: editora.nome
    }));

   
    const [titulo, setTitulo] = useState('');
    const [resumo, setResumo] = useState('');
    const [autores, setAutores] = useState('');
    const [codEditora, setCodEditora] = useState(opcoes[0]?.value || '');

    const navigate = useNavigate();

    
    const tratarCombo = (evento) => {
        setCodEditora(Number(evento.target.value));
    };

    
    const incluir = (evento) => {
        evento.preventDefault(); 

        const novoLivro = {
            codigo: '', 
            titulo,
            resumo,
            autores: autores.split('\n'),
            codEditora
        };

        controleLivro.incluir(novoLivro)
            .then(() => {
                navigate('/'); 
            })
            .catch((error) => {
                console.error('Erro ao incluir livro:', error);
            });
    };

    return (
        <main className="container">
            <h1 className="text-center my-4">Dados do Livro</h1>
            <form onSubmit={incluir}>
                <div className="form-group">
                    <label htmlFor="titulo">Título:</label>
                    <input 
                        type="text" 
                        className="form-control" 
                        id="titulo" 
                        value={titulo}
                        onChange={(e) => setTitulo(e.target.value)}
                        required 
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="resumo">Resumo:</label>
                    <textarea 
                        className="form-control" 
                        id="resumo" 
                        value={resumo}
                        onChange={(e) => setResumo(e.target.value)}
                        required 
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="autores">Autores (1 por linha):</label>
                    <textarea 
                        className="form-control" 
                        id="autores" 
                        value={autores}
                        onChange={(e) => setAutores(e.target.value)}
                        required 
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="editora">Editora:</label>
                    <select 
                        className="form-control" 
                        id="editora" 
                        value={codEditora} 
                        onChange={tratarCombo}
                        required
                    >
                        {opcoes.map((opcao) => (
                            <option key={opcao.value} value={opcao.value}>
                                {opcao.text}
                            </option>
                        ))}
                    </select>
                </div>
                <button type="submit" className="btn btn-primary mt-3">Salvar</button>
            </form>
        </main>
    );
}
