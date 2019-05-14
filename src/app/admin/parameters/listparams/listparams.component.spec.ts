import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListparamsComponent } from './listparams.component';

describe('ListparamsComponent', () => {
  let component: ListparamsComponent;
  let fixture: ComponentFixture<ListparamsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListparamsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListparamsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
