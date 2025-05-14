import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ExpensesComponent } from './expenses.component';
import { ExpenseService } from '../core/services/expense.service';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { of } from 'rxjs';

describe('ExpensesComponent', () => {
    let component: ExpensesComponent;
    let fixture: ComponentFixture<ExpensesComponent>;
    let expenseServiceMock: jest.Mocked<ExpenseService>;

    beforeEach(async () => {
        expenseServiceMock = {
            getAll: jest.fn(),
            create: jest.fn(),
            update: jest.fn(),
            delete: jest.fn()
        } as any;

        await TestBed.configureTestingModule({
            imports: [ExpensesComponent, ReactiveFormsModule],
            providers: [
                FormBuilder,
                { provide: ExpenseService, useValue: expenseServiceMock }
            ]
        }).compileComponents();

        fixture = TestBed.createComponent(ExpensesComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should load expenses on init', () => {
        const mockExpenses = [{ id: '1', title: 'T', amount: 1, description: '', category: '', date: '' }];
        expenseServiceMock.getAll.mockReturnValue(of(mockExpenses));
        component.loadExpenses();
        component.expenses$.subscribe(expenses => {
            expect(expenses).toEqual(mockExpenses);
        });
    });

    it('should not submit if form is invalid', () => {
        component.form.setValue({ title: '', amount: null, description: '', category: '', date: '' });
        component.submit();
        expect(expenseServiceMock.create).not.toHaveBeenCalled();
    });

    it('should call create on valid submit', () => {
        component.form.setValue({ title: 'T', amount: 1, description: 'D', category: 'C', date: '2020-01-01' });
        expenseServiceMock.create.mockReturnValue(of({}));
        component.submit();
        expect(expenseServiceMock.create).toHaveBeenCalledWith({
            title: 'T',
            amount: 1,
            description: 'D',
            category: 'C',
            date: '2020-01-01'
        });
    });

    it('should filter expenses by category', (done) => {
        const mockExpenses = [
            { id: '1', title: 'T1', amount: 1, description: '', category: 'Food', date: '2020-01-01' },
            { id: '2', title: 'T2', amount: 2, description: '', category: 'Travel', date: '2020-01-02' }
        ];
        expenseServiceMock.getAll.mockReturnValue(of(mockExpenses));
        component.loadExpenses();
        component.filterForm.setValue({ category: 'Food', fromDate: '', toDate: '' });
        component.applyFilter();
        component.filteredExpenses$.subscribe(filtered => {
            expect(filtered.length).toBe(1);
            expect(filtered[0].category).toBe('Food');
            done();
        });
    });
});
