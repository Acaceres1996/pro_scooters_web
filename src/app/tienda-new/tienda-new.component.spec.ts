import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TiendaNewComponent } from './tienda-new.component';

describe('TiendaNewComponent', () => {
  let component: TiendaNewComponent;
  let fixture: ComponentFixture<TiendaNewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TiendaNewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TiendaNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
