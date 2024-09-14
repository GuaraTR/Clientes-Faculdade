import type { NextPage } from 'next'; 
import React, { useState, useEffect } from 'react';
import styles from '../styles/Home.module.css';
import { LinhaLivro } from '../componentes/LinhaLivro';
import { Livro } from '../classes/modelo/Livro';
import Menu from '../componentes/Menu'; 
import { ControleLivros } from '../classes/controle/ControleLivros'; 

const controleLivros = new ControleLivros(); 

const LivroLista: NextPage = () => {
    const [livros, setLivros] = useState<Livro[]>([]);
    const [carregado, setCarregado] = useState<boolean>(false);

    useEffect(() => {
        controleLivros.obterLivros()
            .then(livrosObtidos => {
                setLivros(livrosObtidos);
                setCarregado(true);
            });
    }, []); 

    const excluir = (codigo: string) => {
        controleLivros.excluir(codigo)
            .then(sucesso => {
                if (sucesso) {
                   
                    setLivros(prevLivros => prevLivros.filter(livro => livro.codigo !== codigo));
                }
                setCarregado(false);
            });
    };

    return (
        <div className={styles.container}>
            <Menu /> 
            <h1 className="text-center my-4">Catálogo de Livros</h1>
            <table className="table table-striped">
                <thead className="thead-dark">
                    <tr>
                        <th>Título</th>
                        <th>Resumo</th>
                        <th>Editora</th>
                        <th>Autores</th>
                    </tr>
                </thead>
                <tbody>
                    {livros.map((livro) => (
                        <LinhaLivro 
                            key={livro.codigo} 
                            livro={livro}
                            excluir={() => excluir(livro.codigo)} 
                        />
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default LivroLista;
