import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
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

  constructor(private ebookService: EbookService) { }

  ngOnInit(): void {
    this.loadEbooks();
  }

  loadEbooks(): void {
    this.ebookService.getEbooks().subscribe(data => {
      this.ebooks = data;
    });
  }
}
