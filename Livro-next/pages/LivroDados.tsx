import type { NextPage } from 'next';
import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import styles from '../styles/Home.module.css';
import { ControleEditora } from '../classes/controle/ControleEditora';
import { Livro } from '../classes/modelo/Livro';
import { useRouter } from 'next/router';
import Menu from '../componentes/Menu'; 
import { ControleLivros } from '../classes/controle/ControleLivros'; 

const controleEditora = new ControleEditora();
const controleLivros = new ControleLivros(); 

const LivroDados: NextPage = () => {
    const [titulo, setTitulo] = useState<string>('');
    const [resumo, setResumo] = useState<string>('');
    const [autores, setAutores] = useState<string>('');
    const [codEditora, setCodEditora] = useState<number>(0);
    const [opcoes, setOpcoes] = useState<{ value: number; text: string }[]>([]);
    const router = useRouter();

    useEffect(() => {
        const carregarEditoras = async () => {
            const editoras = await controleEditora.getEditoras();
            setOpcoes(editoras.map(ed => ({ value: ed.codEditora, text: ed.nome })));
        };

        carregarEditoras();
    }, []);

    const tratarCombo = (event: ChangeEvent<HTMLSelectElement>) => {
        setCodEditora(Number(event.target.value));
    };

    const incluir = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const livro: Livro = {
            codigo: '',  
            titulo,
            resumo,
            codEditora,
            autores: autores.split('\n')
        };

        controleLivros.incluir(livro)
            .then(sucesso => {
                if (sucesso) {
                    router.push('/LivroLista');
                }
            });
    };

    return (
        <div className={styles.container}>
            <Menu /> 
            <h1>Cadastro de Livro</h1>
            <form onSubmit={incluir}>
                <div className="form-group">
                    <label htmlFor="titulo">Título</label>
                    <input 
                        type="text" 
                        className="form-control" 
                        id="titulo" 
                        value={titulo}
                        onChange={(e) => setTitulo(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="resumo">Resumo</label>
                    <textarea 
                        className="form-control" 
                        id="resumo" 
                        value={resumo}
                        onChange={(e) => setResumo(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="autores">Autores</label>
                    <textarea 
                        className="form-control" 
                        id="autores" 
                        value={autores}
                        onChange={(e) => setAutores(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="codEditora">Editora</label>
                    <select 
                        className="form-control" 
                        id="codEditora"
                        value={codEditora}
                        onChange={tratarCombo}
                    >
                        {opcoes.map(opcao => (
                            <option key={opcao.value} value={opcao.value}>
                                {opcao.text}
                            </option>
                        ))}
                    </select>
                </div>
                <button type="submit" className="btn btn-primary">Incluir Livro</button>
            </form>
        </div>
    );
};

export default LivroDados;
