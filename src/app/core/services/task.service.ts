import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { TaskRequest, TaskResponse } from '../models/task.model';

@Injectable({ providedIn: 'root' })
export class TaskService {
  private readonly apiUrl = `${environment.apiUrl}/api/tasks`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<TaskResponse[]> {
    return this.http.get<TaskResponse[]>(this.apiUrl);
  }

  getById(id: number): Observable<TaskResponse> {
    return this.http.get<TaskResponse>(`${this.apiUrl}/${id}`);
  }

  create(task: TaskRequest): Observable<TaskResponse> {
    return this.http.post<TaskResponse>(this.apiUrl, task);
  }

  update(id: number, task: TaskRequest): Observable<TaskResponse> {
    return this.http.put<TaskResponse>(`${this.apiUrl}/${id}`, task);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  moveUp(id: number): Observable<void> {
    return this.http.patch<void>(`${this.apiUrl}/${id}/move-up`, {});
  }

  moveDown(id: number): Observable<void> {
    return this.http.patch<void>(`${this.apiUrl}/${id}/move-down`, {});
  }
}
