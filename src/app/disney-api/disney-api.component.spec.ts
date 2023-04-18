import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisneyApiComponent } from './disney-api.component';

describe('DisneyApiComponent', () => {
  let component: DisneyApiComponent;
  let fixture: ComponentFixture<DisneyApiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DisneyApiComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DisneyApiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
