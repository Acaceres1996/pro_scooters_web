import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApagadosComponent } from './apagados.component';

describe('ApagadosComponent', () => {
  let component: ApagadosComponent;
  let fixture: ComponentFixture<ApagadosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApagadosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApagadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
