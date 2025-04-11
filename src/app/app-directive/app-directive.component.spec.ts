import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppDirectiveComponent } from './app-directive.component';

describe('AppDirectiveComponent', () => {
  let component: AppDirectiveComponent;
  let fixture: ComponentFixture<AppDirectiveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppDirectiveComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppDirectiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
