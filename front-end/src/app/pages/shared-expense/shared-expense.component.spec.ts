import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SharedExpenseComponent } from './shared-expense.component';

describe('SharedExpenseComponent', () => {
  let component: SharedExpenseComponent;
  let fixture: ComponentFixture<SharedExpenseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SharedExpenseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SharedExpenseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
