import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DepartViewUpdateComponent } from './depart-view-update.component';

describe('DepartViewUpdateComponent', () => {
  let component: DepartViewUpdateComponent;
  let fixture: ComponentFixture<DepartViewUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DepartViewUpdateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DepartViewUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
