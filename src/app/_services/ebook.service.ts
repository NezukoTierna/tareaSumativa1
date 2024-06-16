import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CreateEbook } from '../_interfaces/create-ebook';
import { environment } from 'src/environments/environment.development';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EbookService {
  baseUrl: string = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getEbooks(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/ebook`);
  }

  createEbook(ebook: CreateEbook): Observable<Object> {
    return this.http.post(`${this.baseUrl}/ebook`, ebook);
  }

  EditEbook(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/ebook/${id}`);
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
