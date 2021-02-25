import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainPlayersComponent } from './main-players.component';

describe('MainPlayersComponent', () => {
  let component: MainPlayersComponent;
  let fixture: ComponentFixture<MainPlayersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MainPlayersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MainPlayersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
