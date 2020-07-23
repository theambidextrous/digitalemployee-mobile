import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AgencycodesPage } from './agencycodes.page';

describe('AgencycodesPage', () => {
  let component: AgencycodesPage;
  let fixture: ComponentFixture<AgencycodesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgencycodesPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AgencycodesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
