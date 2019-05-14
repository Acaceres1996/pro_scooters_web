import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateparamComponent } from './updateparam.component';

describe('UpdateparamComponent', () => {
  let component: UpdateparamComponent;
  let fixture: ComponentFixture<UpdateparamComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateparamComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateparamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
