import { Component, OnInit } from '@angular/core';
import { ExpenseService } from '../core/services/expense.service';
import { SocketService } from '../core/services/socket.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../material.module';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
    standalone: true,
    imports: [
        CommonModule,
        RouterModule,
        MaterialModule
    ]
})
export class DashboardComponent implements OnInit {
  totalExpense = 0;
  expenses: any;
  onlineUsers: string[] = [];

  constructor(
    private expenseService: ExpenseService,
    private socketService: SocketService
  ) {}

  ngOnInit(): void {
    this.loadExpenses();
    this.listenToOnlineUsers();
  }

  loadExpenses(): void {
    this.expenseService.getAll().subscribe((data) => {
      this.expenses = data;
      this.totalExpense = this.expenses.reduce((sum: any, exp: { amount: any; }) => sum + exp.amount, 0);
    });
  }

  listenToOnlineUsers(): void {
    this.socketService.listen<string[]>('online-users').subscribe(users => {
      this.onlineUsers = users;
    });
  }
}
