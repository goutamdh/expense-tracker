import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class SocketService {
    private socket: Socket;

    constructor() {
        this.socket = io('http://localhost:3000');
    }

    emit(event: string, data: any): void {
        this.socket.emit(event, data);
    }

    listen<T>(event: string): Observable<T> {
        return new Observable(observer => {
            this.socket.on(event, data => observer.next(data));
        });
    }
}