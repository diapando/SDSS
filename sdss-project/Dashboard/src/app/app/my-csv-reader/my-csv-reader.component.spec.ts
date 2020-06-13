import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyCsvReaderComponent } from './my-csv-reader.component';

describe('MyCsvReaderComponent', () => {
  let component: MyCsvReaderComponent;
  let fixture: ComponentFixture<MyCsvReaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyCsvReaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyCsvReaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
