import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-comportamento-suspeito',
  templateUrl: './dialog-comportamento-suspeito.component.html',
  styleUrls: ['./dialog-comportamento-suspeito.component.css'],
})
export class DialogComportamentoSuspeitoComponent {
  constructor(private dialogRef: MatDialogRef<DialogComportamentoSuspeitoComponent>) {}

  public onClose(): void {
    this.dialogRef.close();
  }
}
