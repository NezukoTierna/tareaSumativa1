import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CreateEbook } from '../_interfaces/create-ebook';
import { environment } from 'src/environments/environment.development';
import { Observable } from 'rxjs';
import { EditEbook } from '../_interfaces/editEbook';
import { Ebook } from '../_interfaces/ebook';

@Injectable({
  providedIn: 'root',
})
export class EbookService {
  baseUrl: string = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getEbooks(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/ebook`);
  }
  getEbookById(id: number): Observable<Ebook> {
    return this.http.get<Ebook>(`${this.baseUrl}/ebook?id=${id}`);
  }

  createEbook(ebook: CreateEbook): Observable<Object> {
    return this.http.post(`${this.baseUrl}/ebook`, ebook);
  }

  editEbook(ebook: EditEbook): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/ebook/${ebook.id}`);
  }

  ChangeAvailability(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/ebook/${id}/change-availability`);
  }

  IncrementStock(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/ebook/${id}/increment-stock`);
  }

  PurchaseEbook(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/ebook/${id}/purchase`);
  }

  deleteEbook(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/ebook/${id}`);
  }
}
