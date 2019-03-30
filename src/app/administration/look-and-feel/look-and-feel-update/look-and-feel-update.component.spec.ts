import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LookAndFeelUpdateComponent } from './look-and-feel-update.component';

describe('LookAndFeelUpdateComponent', () => {
  let component: LookAndFeelUpdateComponent;
  let fixture: ComponentFixture<LookAndFeelUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LookAndFeelUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LookAndFeelUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
