import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { LinkRequest, LinkResponse } from '../models/link.model';

@Injectable({ providedIn: 'root' })
export class LinkService {
  private readonly apiUrl = `${environment.apiUrl}/api/links`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<LinkResponse[]> {
    return this.http.get<LinkResponse[]>(this.apiUrl);
  }

  getGrouped(): Observable<Record<string, LinkResponse[]>> {
    return this.http.get<Record<string, LinkResponse[]>>(`${this.apiUrl}/grouped`);
  }

  getById(id: number): Observable<LinkResponse> {
    return this.http.get<LinkResponse>(`${this.apiUrl}/${id}`);
  }

  create(link: LinkRequest): Observable<LinkResponse> {
    return this.http.post<LinkResponse>(this.apiUrl, link);
  }

  update(id: number, link: LinkRequest): Observable<LinkResponse> {
    return this.http.put<LinkResponse>(`${this.apiUrl}/${id}`, link);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
