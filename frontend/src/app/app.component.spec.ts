import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have the 'frontend' title`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('frontend');
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain('Hello, frontend');
  });

  it('should return true if token exists in localStorage', () => {
    localStorage.setItem('token', 'test-token');
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.isLoggedIn()).toBe(true);
    localStorage.removeItem('token');
  });

  it('should return false if token does not exist in localStorage', () => {
    localStorage.removeItem('token');
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.isLoggedIn()).toBe(false);
  });

  it('should remove token and redirect on logout', () => {
    localStorage.setItem('token', 'test-token');
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    const spy = jest.spyOn(window.location, 'href', 'set');
    app.logout();
    expect(localStorage.getItem('token')).toBeNull();
    expect(spy).toHaveBeenCalledWith('/login');
    spy.mockRestore();
  });
});
