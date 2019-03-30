import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RadialGraphComponent } from './radial-graph.component';

describe('RadialGraphComponent', () => {
  let component: RadialGraphComponent;
  let fixture: ComponentFixture<RadialGraphComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RadialGraphComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RadialGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
