import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPlayerteamComponent } from './edit-playerteam.component';

describe('EditPlayerteamComponent', () => {
  let component: EditPlayerteamComponent;
  let fixture: ComponentFixture<EditPlayerteamComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditPlayerteamComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditPlayerteamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
