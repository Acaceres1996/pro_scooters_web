import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IncomeStoreComponent } from './income-store.component';

describe('IncomeStoreComponent', () => {
  let component: IncomeStoreComponent;
  let fixture: ComponentFixture<IncomeStoreComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IncomeStoreComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IncomeStoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
