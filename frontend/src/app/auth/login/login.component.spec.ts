import { TestBed, ComponentFixture } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';
import { Router } from '@angular/router';
import { of } from 'rxjs';

describe('LoginComponent', () => {
    let component: LoginComponent;
    let fixture: ComponentFixture<LoginComponent>;
    let authServiceMock: jest.Mocked<AuthService>;
    let routerMock: jest.Mocked<Router>;

    beforeEach(async () => {
        authServiceMock = {
            login: jest.fn()
        } as any;

        routerMock = {
            navigate: jest.fn()
        } as any;

        await TestBed.configureTestingModule({
            imports: [LoginComponent, ReactiveFormsModule],
            providers: [
                FormBuilder,
                { provide: AuthService, useValue: authServiceMock },
                { provide: Router, useValue: routerMock }
            ]
        }).compileComponents();

        fixture = TestBed.createComponent(LoginComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should not submit if form is invalid', () => {
        component.form.setValue({ email: '', password: '' });
        component.submit();
        expect(authServiceMock.login).not.toHaveBeenCalled();
    });

    it('should call AuthService.login and navigate on valid submit', () => {
        component.form.setValue({ email: 'test@example.com', password: 'password' });
        authServiceMock.login.mockReturnValue(of({ token: 'test' }));
        component.submit();
        expect(authServiceMock.login).toHaveBeenCalledWith({ email: 'test@example.com', password: 'password' });
        expect(routerMock.navigate).toHaveBeenCalledWith(['/dashboard']);
    });
});
