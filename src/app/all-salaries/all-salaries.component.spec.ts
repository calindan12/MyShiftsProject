import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllSalariesComponent } from './all-salaries.component';

describe('AllSalariesComponent', () => {
  let component: AllSalariesComponent;
  let fixture: ComponentFixture<AllSalariesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AllSalariesComponent]
    });
    fixture = TestBed.createComponent(AllSalariesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
