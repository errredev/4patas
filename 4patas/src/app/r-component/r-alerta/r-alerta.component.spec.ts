import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { RAlertaComponent } from './r-alerta.component';

describe('RAlertaComponent', () => {
  let component: RAlertaComponent;
  let fixture: ComponentFixture<RAlertaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RAlertaComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(RAlertaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
