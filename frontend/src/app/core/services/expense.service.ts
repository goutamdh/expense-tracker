import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({ 
    providedIn: 'root' 
})
export class ExpenseService {
    private baseUrl = '/api/expenses';

    constructor(private http: HttpClient) { }

    create(expense: any) {
        return this.http.post(this.baseUrl, expense);
    }

    getAll() {
        return this.http.get(this.baseUrl);
    }

    update(id: string, expense: any) {
        return this.http.put(`${this.baseUrl}/${id}`, expense);
    }

    delete(id: string) {
        return this.http.delete(`${this.baseUrl}/${id}`);
    }
}