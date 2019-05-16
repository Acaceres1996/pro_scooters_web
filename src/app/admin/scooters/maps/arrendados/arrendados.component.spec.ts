import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArrendadosComponent } from './arrendados.component';

describe('ArrendadosComponent', () => {
  let component: ArrendadosComponent;
  let fixture: ComponentFixture<ArrendadosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArrendadosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArrendadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
