import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListadminsComponent } from './listadmins.component';

describe('ListadminsComponent', () => {
  let component: ListadminsComponent;
  let fixture: ComponentFixture<ListadminsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListadminsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListadminsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
