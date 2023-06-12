import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreinscriptionEtudiantViewComponent } from './preinscription-etudiant-view.component';

describe('PreinscriptionEtudiantViewComponent', () => {
  let component: PreinscriptionEtudiantViewComponent;
  let fixture: ComponentFixture<PreinscriptionEtudiantViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PreinscriptionEtudiantViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PreinscriptionEtudiantViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
