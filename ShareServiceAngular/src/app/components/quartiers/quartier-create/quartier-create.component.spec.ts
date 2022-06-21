import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuartierCreateComponent } from './quartier-create.component';

describe('QuartierCreateComponent', () => {
  let component: QuartierCreateComponent;
  let fixture: ComponentFixture<QuartierCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuartierCreateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuartierCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
