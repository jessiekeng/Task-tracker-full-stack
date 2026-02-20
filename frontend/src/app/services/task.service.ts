import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class TaskService {
    // REMOVED localhost:5001 - This now works on both your computer and Render!
    private apiUrl = '/api/tasks';

    constructor(private http: HttpClient) { }

    private getHeaders() {
        const token = localStorage.getItem('token');
        return new HttpHeaders().set('Authorization', `Bearer ${token}`);
    }

    getTasks() {
        return this.http.get(this.apiUrl, { headers: this.getHeaders() });
    }

    addTask(title: string) {
        return this.http.post(this.apiUrl, { title }, { headers: this.getHeaders() });
    }

    deleteTask(id: string) {
        return this.http.delete(`${this.apiUrl}/${id}`, { headers: this.getHeaders() });
    }

    toggleTask(id: string, completed: boolean) {
        // We send !completed to the backend to flip the status
        return this.http.put(`${this.apiUrl}/${id}`, { completed: !completed }, { headers: this.getHeaders() });
    }
}