import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LookAndFeelNewComponent } from './look-and-feel-new.component';

describe('LookAndFeelNewComponent', () => {
  let component: LookAndFeelNewComponent;
  let fixture: ComponentFixture<LookAndFeelNewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LookAndFeelNewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LookAndFeelNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
