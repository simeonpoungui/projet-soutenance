import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InscriptionEtudiantViewComponent } from './inscription-etudiant-view.component';

describe('InscriptionEtudiantViewComponent', () => {
  let component: InscriptionEtudiantViewComponent;
  let fixture: ComponentFixture<InscriptionEtudiantViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InscriptionEtudiantViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InscriptionEtudiantViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
