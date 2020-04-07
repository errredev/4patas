import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CaruselFotosComponent } from './carusel-fotos.component';

describe('CaruselFotosComponent', () => {
  let component: CaruselFotosComponent;
  let fixture: ComponentFixture<CaruselFotosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CaruselFotosComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CaruselFotosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
