import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/internal/Observable';
import { EbookService } from 'src/app/_services/ebook.service';

@Component({
  selector: 'app-ebook-list',
  templateUrl: './ebook-list.component.html',
  styles: [
  ]
})
export class EbookListComponent implements OnInit {

  ebooks: any[] = [];

  constructor(private ebookService: EbookService, private router: Router) { }

  ngOnInit(): void {
    this.loadEbooks();
  }

  //esto hace el llamado a la API obteniendo el data, pero ojo, los CORS deben ser habilitados
  loadEbooks(): void {
    this.ebookService.getEbooks().subscribe(data => {
      console.log(data);
      this.ebooks = data;
    });

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
