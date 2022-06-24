import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeMemberSideComponent } from './home-member-side.component';

describe('HomeMemberSideComponent', () => {
  let component: HomeMemberSideComponent;
  let fixture: ComponentFixture<HomeMemberSideComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeMemberSideComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeMemberSideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
