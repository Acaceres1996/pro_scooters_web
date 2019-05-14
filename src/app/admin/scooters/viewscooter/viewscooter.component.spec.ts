import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewscooterComponent } from './viewscooter.component';

describe('ViewscooterComponent', () => {
  let component: ViewscooterComponent;
  let fixture: ComponentFixture<ViewscooterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewscooterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewscooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
