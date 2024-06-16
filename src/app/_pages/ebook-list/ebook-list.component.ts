import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/internal/Observable';
import { Ebook } from 'src/app/_interfaces/ebook';
import { EbookService } from 'src/app/_services/ebook.service';

@Component({
  selector: 'app-ebook-list',
  templateUrl: './ebook-list.component.html',
  styles: [
  ]
})
export class EbookListComponent implements OnInit {

  ebooks: any[] = [];
  filteredEbooks: Ebook[] = [];
  searchTerm: string = '';
  selectedGenre: string = '';
  genres: string[] = [];

  constructor(private ebookService: EbookService, private router: Router) { }

  ngOnInit(): void {
    this.loadEbooks();
  }

  //esto hace el llamado a la API obteniendo el data, pero ojo, los CORS deben ser habilitados
  loadEbooks() {
    this.ebookService.getEbooks().subscribe(
      (data: Ebook[]) => {
        this.ebooks = data;
        this.filteredEbooks = data;
        this.extractGenres();
      },
      error => {
        console.error('Error fetching ebooks', error);
      }
    );
  }

  extractGenres() {
    this.genres = Array.from(new Set(this.ebooks.map(ebook => ebook.genre)));
  }

  filterEbooks() {
    const term = this.searchTerm.toLowerCase();
    this.filteredEbooks = this.ebooks.filter(ebook =>
      (ebook.title.toLowerCase().includes(term) || ebook.author.toLowerCase().includes(term)) &&
      (this.selectedGenre === '' || ebook.genre === this.selectedGenre)
    );
  }

  navigateToCreate(): void {
    this.router.navigate(['/create']);
  }

  navigateToEdit(id: number): void {
    this.router.navigate(['/edit', id]);
  }

  deleteEbook(id: number): void {
    this.ebookService.deleteEbook(id).subscribe(() => {
      this.loadEbooks(); // Recargar la lista después de eliminar un eBook
    });
  }
}
