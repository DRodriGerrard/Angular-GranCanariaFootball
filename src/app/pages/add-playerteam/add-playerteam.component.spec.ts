import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPlayerteamComponent } from './add-playerteam.component';

describe('AddPlayerteamComponent', () => {
  let component: AddPlayerteamComponent;
  let fixture: ComponentFixture<AddPlayerteamComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddPlayerteamComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddPlayerteamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
