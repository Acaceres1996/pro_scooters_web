import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LookAndFeelListComponent } from './look-and-feel-list.component';

describe('LookAndFeelListComponent', () => {
  let component: LookAndFeelListComponent;
  let fixture: ComponentFixture<LookAndFeelListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LookAndFeelListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LookAndFeelListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
