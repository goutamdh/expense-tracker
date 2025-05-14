import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class ExpenseService {
    private baseUrl = 'http://localhost:3000/api/expenses';

    constructor(private http: HttpClient) { }

    create(expense: any) {
        return this.http.post(this.baseUrl, expense);
    }

    getAll() {
        return this.http.get<{ success: boolean, data: any[] }>(this.baseUrl).pipe(
            map(res => res.data)
        );
    }

    update(id: string, expense: any) {
        return this.http.put(`${this.baseUrl}/${id}`, expense);
    }

    delete(id: string) {
        return this.http.delete(`${this.baseUrl}/${id}`);
    }
}