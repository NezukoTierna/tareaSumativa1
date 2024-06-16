import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Ebook } from 'src/app/_interfaces/ebook';
import { EbookService } from 'src/app/_services/ebook.service';

@Component({
  selector: 'app-edit-ebook',
  templateUrl: './edit-ebook.component.html',
  styleUrls: []
})
export class EditEbookComponent implements OnInit{

  editEbookForm!: FormGroup;  // Uso del operador '!' para evitar el error
  ebookId!: number;           // Uso del operador '!' para evitar el error
  ebook!: Ebook;              // Uso del operador '!' para evitar el error

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private ebookService: EbookService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.ebookId = +this.route.snapshot.paramMap.get('id')!;
    this.loadEbook();
    this.initializeForm();
  }

  initializeForm() {
    this.editEbookForm = this.fb.group({
      title: ['', Validators.required],
      author: ['', Validators.required],
      genre: ['', Validators.required],
      format: ['', Validators.required],
      price: ['', [Validators.required, Validators.min(0)]]
    });

    this.loadEbook();
  }

  loadEbook() {
    this.ebookService.getEbookById(this.ebookId).subscribe(
      (ebook: Ebook) => {
        this.ebook = ebook;
        this.editEbookForm.patchValue(ebook);
      },
      error => {
        console.error('Error loading ebook', error);
      }
    );
  }

  onSubmit() {
    if (this.editEbookForm.valid) {
      const updatedEbook = { ...this.ebook, ...this.editEbookForm.value };
      this.ebookService.editEbook(updatedEbook).subscribe(
        () => {
          this.router.navigate(['/']);
        },
        error => {
          console.error('Error updating ebook', error);
        }
      );
    }
  }

  navigateBack() {
    this.router.navigate(['/']);
  }

}
