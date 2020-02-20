import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { RPerro1Component } from './r-perro1.component';

describe('RPerro1Component', () => {
  let component: RPerro1Component;
  let fixture: ComponentFixture<RPerro1Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RPerro1Component ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(RPerro1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
