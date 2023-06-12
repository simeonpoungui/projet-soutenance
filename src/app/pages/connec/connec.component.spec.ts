import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConnecComponent } from './connec.component';

describe('ConnecComponent', () => {
  let component: ConnecComponent;
  let fixture: ComponentFixture<ConnecComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConnecComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConnecComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
