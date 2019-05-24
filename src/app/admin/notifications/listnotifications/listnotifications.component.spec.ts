import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListnotificationsComponent } from './listnotifications.component';

describe('ListnotificationsComponent', () => {
  let component: ListnotificationsComponent;
  let fixture: ComponentFixture<ListnotificationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListnotificationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListnotificationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
