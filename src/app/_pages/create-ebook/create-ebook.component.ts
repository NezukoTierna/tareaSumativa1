import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CreateEbook } from 'src/app/_interfaces/create-ebook';
import { EbookService } from 'src/app/_services/ebook.service';

@Component({
  selector: 'app-create-ebook',
  templateUrl: './create-ebook.component.html',
  styles: [
  ]
})
export class CreateEbookComponent {

  ebookForm: FormGroup;

  constructor(private ebookService: EbookService, private fb: FormBuilder, private router: Router) {

    this.ebookForm = this.fb.group({
      title: ['', Validators.required],
      author: ['', Validators.required],
      genre: ['Fiction', Validators.required],
      format: ['Ebook', Validators.required],
      price: [9, [Validators.required, Validators.min(0)]]
    });

  }

  navigateBack(): void {
    this.router.navigate(['/']);
  }

  onSubmit() {
    if (this.ebookForm.valid) {
      const newEbook: CreateEbook = this.ebookForm.value;
      this.ebookService.createEbook(newEbook).subscribe(
        data => {
          console.log('Form Submitted!', data);
          this.router.navigate(['/']);
        },
        error => {
          console.error('Error creating ebook', error);
        }
      );
    }
  }

}
