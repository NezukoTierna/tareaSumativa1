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
export class EditEbookComponent implements OnInit {
  ebookId!: number | undefined;
  ebook: Ebook | undefined;
  editEbookForm!: FormGroup;




  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private ebookService: EbookService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.ebookId = id ? +id : undefined;
    if (!this.ebookId) {
      // Manejar caso en el que ebookId no se obtenga correctamente
      console.error('Invalid ebook ID');
      return;
    }

    this.loadEbook();
    this.initializeForm();
  }

  initializeForm(): void {
    this.editEbookForm = this.fb.group({
      title: ['', Validators.required],
      author: ['', Validators.required],
      genre: ['', Validators.required],
      format: ['', Validators.required],
      price: ['', [Validators.required, Validators.min(0)]]
    });
  }

  loadEbook(): void {
    if (this.ebookId !== undefined) {
      this.ebookService.getEbookById(this.ebookId).subscribe(
        (ebook: Ebook) => {
          this.ebook = ebook;
          if (this.editEbookForm) {
            this.editEbookForm.patchValue(ebook);
          } else {
            console.error('editEbookForm is undefined');
          }
        },
        error => {
          console.error('Error loading ebook', error);
        }
      );
    } else {
      console.error('ebookId is undefined');
    }
  }



  onSubmit(): void {
    if (this.editEbookForm.valid && this.ebook) {
      const updatedEbook: Ebook = { ...this.ebook, ...this.editEbookForm.value };
      this.ebookService.editEbook(updatedEbook).subscribe(
        () => {
          console.log('Ebook updated successfully');
          // Aquí puedes redirigir o hacer otras acciones después de la actualización
        },
        error => {
          console.error('Error updating ebook', error);
        }
      );
    }
  }

  navigateBack(): void {
    this.router.navigate(['/']);
  }
}
