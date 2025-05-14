import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { ExpenseService } from '../core/services/expense.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../material.module';
import { Observable } from 'rxjs';
import { take, map } from 'rxjs/operators';

interface Expense {
    id: string;
    title: string;
    amount: number;
    category: string;
    date: string;
    description: string;
}

@Component({
    selector: 'app-expenses',
    templateUrl: './expenses.component.html',
    styleUrls: ['./expenses.component.scss'],
    standalone: true,
    imports: [
        CommonModule,
        RouterModule,
        MaterialModule,
        ReactiveFormsModule
    ]
})
export class ExpensesComponent implements OnInit {
    expenses$!: Observable<any>;
    filteredExpenses$!: Observable<Expense[]>;
    form: FormGroup;
    filterForm: FormGroup;
    editingId: string | null = null;
    displayedColumns: string[] = ['title', 'amount', 'description', 'category', 'date', 'actions'];

    constructor(
        private expenseService: ExpenseService,
        private fb: FormBuilder
    ) {
        this.form = this.fb.group({
            title: ['', Validators.required],
            amount: [null, [Validators.required, Validators.min(1)]],
            description: ['', Validators.required],
            category: ['', Validators.required],
            date: ['', Validators.required]
        });

        this.filterForm = this.fb.group({
            category: [''],
            fromDate: [''],
            toDate: ['']
        });
    }

    ngOnInit(): void {
        this.loadExpenses();
    }

    loadExpenses(): void {
        this.expenses$ = this.expenseService.getAll();
        this.filteredExpenses$ = this.expenses$;
    }

    applyFilter(): void {
        const { category, fromDate, toDate } = this.filterForm.value;
        this.filteredExpenses$ = this.expenses$.pipe(
            map((expenses: Expense[]) => expenses.filter((e: Expense) => {
                const matchesCategory = category ? e.category?.toLowerCase().includes(category.toLowerCase()) : true;
                const matchesFrom = fromDate ? new Date(e.date) >= new Date(fromDate) : true;
                const matchesTo = toDate ? new Date(e.date) <= new Date(toDate) : true;
                return matchesCategory && matchesFrom && matchesTo;
            }))
        );
    }

    resetFilter(): void {
        this.filterForm.reset();
        this.filteredExpenses$ = this.expenses$;
    }

    submit(): void {
        if (this.form.invalid) return;

        const expense = this.form.value;

        if (this.editingId) {
            this.expenseService.update(this.editingId, expense).pipe(take(1)).subscribe({
                next: () => {
                    this.resetForm();
                    this.loadExpenses();
                },
                error: (err) => {
                    console.error('Failed to update expense:', err);
                }
            });
        } else {
            this.expenseService.create(expense).pipe(take(1)).subscribe({
                next: () => {
                    this.resetForm();
                    this.loadExpenses();
                },
                error: (err) => {
                    console.error('Failed to create expense:', err);
                }
            });
        }
    }

    edit(expense: Expense): void {
        this.editingId = expense.id;
        this.form.patchValue({
            title: expense.title,
            amount: expense.amount,
            description: expense.description,
            category: expense.category,
            date: expense.date
        });
    }

    resetForm(): void {
        this.editingId = null;
        this.form.reset({ amount: null });
    }

    delete(id: string): void {
        this.expenseService.delete(id).pipe(take(1)).subscribe({
            next: () => {
                this.loadExpenses();
            },
            error: (err) => {
                console.error('Failed to delete expense:', err);
            }
        });
    }
}
