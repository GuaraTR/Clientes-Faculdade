import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ControleEditoraService } from '../controle-editora.service';
import { ControleLivrosService } from '../controle-livros.service';
import { Editora } from '../editora';
import { Livro } from '../livro';

@Component({
  selector: 'app-livro-dados',
  templateUrl: './livro-dados.component.html',
  styleUrls: ['./livro-dados.component.css']
})
export class LivroDadosComponent implements OnInit {
  livro: Livro = new Livro('', 0, '', '', []); 
  autoresForm: string = '';
  editoras: Editora[] = [];

  constructor(
    private servEditora: ControleEditoraService,
    private servLivros: ControleLivrosService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.editoras = this.servEditora.getEditoras();
  }

  incluir = async (): Promise<void> => {
    
    this.livro.autores = this.autoresForm.split('\n').map(a => a.trim()).filter(a => a !== '');

    
    this.servLivros.incluir(this.livro)
      .then(sucesso => {
        if (sucesso) {
          
          this.router.navigateByUrl('/lista');
        } else {
          console.error('Erro ao incluir o livro');
        }
      })
      .catch(error => {
        console.error('Erro ao incluir o livro:', error);
      });
  }
}
