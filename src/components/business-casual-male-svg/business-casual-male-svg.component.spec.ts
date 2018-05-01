import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BusinessCasualMaleSvgComponent } from './business-casual-male-svg.component';

describe('BusinessCasualMaleSvgComponent', () => {
  let component: BusinessCasualMaleSvgComponent;
  let fixture: ComponentFixture<BusinessCasualMaleSvgComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BusinessCasualMaleSvgComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BusinessCasualMaleSvgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
