import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WebpComponent } from './webp.component';

describe('WebpComponent', () => {
  let component: WebpComponent;
  let fixture: ComponentFixture<WebpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WebpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WebpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
