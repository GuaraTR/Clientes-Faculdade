import { Component, OnInit } from '@angular/core';
import { Editora } from '../editora';
import { Livro } from '../livro';
import { ControleEditoraService } from '../controle-editora.service';
import { ControleLivrosService } from '../controle-livros.service';

@Component({
  selector: 'app-livro-lista',
  templateUrl: './livro-lista.component.html',
  styleUrls: ['./livro-lista.component.css']
})
export class LivroListaComponent implements OnInit {
  public editoras: Array<Editora> = [];
  public livros: Array<Livro> = [];

  constructor(
    private servEditora: ControleEditoraService,
    private servLivros: ControleLivrosService
  ) {}

  ngOnInit(): void {
    
    this.servLivros.obterLivros()
      .then(livrosObtidos => {
        this.livros = livrosObtidos;
      })
      .catch(error => {
        console.error('Erro ao obter livros:', error);
      });
      
    
    this.editoras = this.servEditora.getEditoras();
  }

  excluir = (codigo: string): void => {
    this.servLivros.excluir(codigo)
      .then(sucesso => {
        if (sucesso) {
          
          return this.servLivros.obterLivros();
        } else {
          throw new Error('Erro ao excluir o livro');
        }
      })
      .then(livrosAtualizados => {
        this.livros = livrosAtualizados;
      })
      .catch(error => {
        console.error('Erro ao excluir livro:', error);
      });
  }

  obterNome = (codEditora: number): string | undefined => {
    return this.servEditora.getNomeEditora(codEditora);
  }
}
