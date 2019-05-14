import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatescooterComponent } from './updatescooter.component';

describe('UpdatescooterComponent', () => {
  let component: UpdatescooterComponent;
  let fixture: ComponentFixture<UpdatescooterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdatescooterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdatescooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
