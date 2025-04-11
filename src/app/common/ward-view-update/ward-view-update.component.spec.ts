import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WardViewUpdateComponent } from './ward-view-update.component';

describe('WardViewUpdateComponent', () => {
  let component: WardViewUpdateComponent;
  let fixture: ComponentFixture<WardViewUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WardViewUpdateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WardViewUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
