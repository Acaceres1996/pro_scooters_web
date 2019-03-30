import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PickPositionComponent } from './pick-position.component';

describe('PickPositionComponent', () => {
  let component: PickPositionComponent;
  let fixture: ComponentFixture<PickPositionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PickPositionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PickPositionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
