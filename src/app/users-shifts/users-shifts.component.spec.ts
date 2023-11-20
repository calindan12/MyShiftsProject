import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersShiftsComponent } from './users-shifts.component';

describe('UsersShiftsComponent', () => {
  let component: UsersShiftsComponent;
  let fixture: ComponentFixture<UsersShiftsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UsersShiftsComponent]
    });
    fixture = TestBed.createComponent(UsersShiftsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
