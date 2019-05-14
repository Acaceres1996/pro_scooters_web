import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListridesComponent } from './listrides.component';

describe('ListridesComponent', () => {
  let component: ListridesComponent;
  let fixture: ComponentFixture<ListridesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListridesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListridesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
