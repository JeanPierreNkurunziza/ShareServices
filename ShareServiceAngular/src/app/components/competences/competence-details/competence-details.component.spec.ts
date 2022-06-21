import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompetenceDetailsComponent } from './competence-details.component';

describe('CompetenceDetailsComponent', () => {
  let component: CompetenceDetailsComponent;
  let fixture: ComponentFixture<CompetenceDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompetenceDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CompetenceDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
