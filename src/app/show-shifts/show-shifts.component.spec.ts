import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowShiftsComponent } from './show-shifts.component';

describe('ShowShiftsComponent', () => {
  let component: ShowShiftsComponent;
  let fixture: ComponentFixture<ShowShiftsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ShowShiftsComponent]
    });
    fixture = TestBed.createComponent(ShowShiftsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
