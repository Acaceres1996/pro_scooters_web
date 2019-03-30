import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardRadialComponent } from './dashboard-radial.component';

describe('DashboardRadialComponent', () => {
  let component: DashboardRadialComponent;
  let fixture: ComponentFixture<DashboardRadialComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardRadialComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardRadialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
