import { Component, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss']
})
export class SpinnerComponent {
  @ViewChild('spinner') spinner: ElementRef;

  constructor() { }

  closeSpinner() {
    this.spinner.nativeElement.classList.add('spinner--close');
  }
}