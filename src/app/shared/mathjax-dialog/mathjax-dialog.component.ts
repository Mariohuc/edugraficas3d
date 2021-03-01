import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface DialogData {
  title: string,
  mathContent: string;
}

@Component({
  selector: 'app-mathjax-dialog',
  templateUrl: './mathjax-dialog.component.html',
  styleUrls: ['./mathjax-dialog.component.css']
})
export class MathjaxDialogComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  ngOnInit(): void {
  }

}
