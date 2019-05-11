import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListscootersComponent } from './listscooters.component';

describe('ListscootersComponent', () => {
  let component: ListscootersComponent;
  let fixture: ComponentFixture<ListscootersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListscootersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListscootersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
