import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreinscriptionEtudiantComponent } from './preinscription-etudiant.component';

describe('PreinscriptionEtudiantComponent', () => {
  let component: PreinscriptionEtudiantComponent;
  let fixture: ComponentFixture<PreinscriptionEtudiantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PreinscriptionEtudiantComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PreinscriptionEtudiantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
