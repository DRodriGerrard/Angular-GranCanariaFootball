import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeaguesDetailsComponent } from './leagues-details.component';

describe('LeaguesDetailsComponent', () => {
  let component: LeaguesDetailsComponent;
  let fixture: ComponentFixture<LeaguesDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LeaguesDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LeaguesDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
