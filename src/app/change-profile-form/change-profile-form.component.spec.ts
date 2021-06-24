import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeProfileFormComponent } from './change-profile-form.component';

describe('ChangeProfileFormComponent', () => {
  let component: ChangeProfileFormComponent;
  let fixture: ComponentFixture<ChangeProfileFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChangeProfileFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangeProfileFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
