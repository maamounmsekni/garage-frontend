import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TypesVoitureComponent } from './types-voiture.component';

describe('TypesVoitureComponent', () => {
  let component: TypesVoitureComponent;
  let fixture: ComponentFixture<TypesVoitureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TypesVoitureComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TypesVoitureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
