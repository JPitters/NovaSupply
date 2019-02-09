import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NvgalleryComponent } from './nvgallery.component';

describe('NvgalleryComponent', () => {
  let component: NvgalleryComponent;
  let fixture: ComponentFixture<NvgalleryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NvgalleryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NvgalleryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
