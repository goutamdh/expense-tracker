import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SignupComponent } from './signup.component';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';
import { Router } from '@angular/router';
import { of } from 'rxjs';

describe('SignupComponent', () => {
    let component: SignupComponent;
    let fixture: ComponentFixture<SignupComponent>;
    let authServiceMock: jest.Mocked<AuthService>;
    let routerMock: jest.Mocked<Router>;

    beforeEach(async () => {
        authServiceMock = {
            signup: jest.fn()
        } as any;

        routerMock = {
            navigate: jest.fn()
        } as any;

        await TestBed.configureTestingModule({
            imports: [SignupComponent, ReactiveFormsModule],
            providers: [
                FormBuilder,
                { provide: AuthService, useValue: authServiceMock },
                { provide: Router, useValue: routerMock }
            ]
        }).compileComponents();

        fixture = TestBed.createComponent(SignupComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should not submit if form is invalid', () => {
        component.form.setValue({ name: '', email: '', password: '' });
        component.submit();
        expect(authServiceMock.signup).not.toHaveBeenCalled();
    });

    it('should call AuthService.signup and navigate on valid submit', () => {
        component.form.setValue({ name: 'Test', email: 'test@example.com', password: 'password' });
        authServiceMock.signup.mockReturnValue(of({}));
        component.submit();
        expect(authServiceMock.signup).toHaveBeenCalledWith({ name: 'Test', email: 'test@example.com', password: 'password' });
        expect(routerMock.navigate).toHaveBeenCalledWith(['/login']);
    });
});
