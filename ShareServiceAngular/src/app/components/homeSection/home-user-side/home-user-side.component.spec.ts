import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeUserSideComponent } from './home-user-side.component';

describe('HomeUserSideComponent', () => {
  let component: HomeUserSideComponent;
  let fixture: ComponentFixture<HomeUserSideComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeUserSideComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeUserSideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
