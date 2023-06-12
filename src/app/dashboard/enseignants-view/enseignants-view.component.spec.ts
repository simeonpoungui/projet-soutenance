import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnseignantsViewComponent } from './enseignants-view.component';

describe('EnseignantsViewComponent', () => {
  let component: EnseignantsViewComponent;
  let fixture: ComponentFixture<EnseignantsViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EnseignantsViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EnseignantsViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
