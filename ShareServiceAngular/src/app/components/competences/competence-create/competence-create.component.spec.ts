import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompetenceCreateComponent } from './competence-create.component';

describe('CompetenceCreateComponent', () => {
  let component: CompetenceCreateComponent;
  let fixture: ComponentFixture<CompetenceCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompetenceCreateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CompetenceCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
