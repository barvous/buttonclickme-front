import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogComportamentoSuspeitoComponent } from './dialog-comportamento-suspeito.component';

describe('DialogComportamentoSuspeitoComponent', () => {
  let component: DialogComportamentoSuspeitoComponent;
  let fixture: ComponentFixture<DialogComportamentoSuspeitoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogComportamentoSuspeitoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogComportamentoSuspeitoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
