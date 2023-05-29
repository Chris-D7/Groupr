import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddparticipantsComponent } from './addparticipants.component';

describe('AddparticipantsComponent', () => {
  let component: AddparticipantsComponent;
  let fixture: ComponentFixture<AddparticipantsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddparticipantsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddparticipantsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
