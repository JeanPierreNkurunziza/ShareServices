import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuartierDetailsComponent } from './quartier-details.component';

describe('QuartierDetailsComponent', () => {
  let component: QuartierDetailsComponent;
  let fixture: ComponentFixture<QuartierDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuartierDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuartierDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
