import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewscooterComponent } from './newscooter.component';

describe('NewscooterComponent', () => {
  let component: NewscooterComponent;
  let fixture: ComponentFixture<NewscooterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewscooterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewscooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
