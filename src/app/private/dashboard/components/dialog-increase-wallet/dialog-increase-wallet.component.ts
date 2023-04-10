import { Component, Input, OnInit, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { DashboardService } from './../../services/dashboard.service';
import { User } from 'src/app/shared/interfaces/user.interface';

@Component({
  selector: 'app-dialog-increase-wallet',
  templateUrl: './dialog-increase-wallet.component.html',
  styleUrls: ['./dialog-increase-wallet.component.scss']
})
export class DialogIncreaseWalletComponent implements OnInit {
  @Input() loggedUser: User;
  formIncreaseWallet: FormGroup;
  submitted: boolean = false;

  @Output() onUpdateUserWallet = new EventEmitter<number>();

  @ViewChild('background') backround: ElementRef;
  @ViewChild('modalIncreaseWallet') modalIncreaseWallet: ElementRef;

  constructor(
    private formBuilder: FormBuilder,
    private dashboardService: DashboardService
  ) { }

  ngOnInit(): void {
    this.formIncreaseWallet = this.formBuilder.group({
      wallet: ['', [Validators.required]]
    })
  }

  increaseWallet() {
    this.submitted = true;

    if (this.formIncreaseWallet.valid) {
      const { wallet } = this.formIncreaseWallet.value;

      this.dashboardService.increaseWallet(this.loggedUser, wallet)
        .subscribe((newWallet: number) => {
          this.onUpdateUserWallet.emit(newWallet);
          this.closeModalIncreaseWallet();
        })
    }
  }

  openModalIncreaseWallet() {
    this.backround.nativeElement.classList.remove('background--close');
    this.modalIncreaseWallet.nativeElement.setAttribute('open', '');
  }

  closeModalIncreaseWallet() {
    this.backround.nativeElement.classList.add('background--close');
    this.modalIncreaseWallet.nativeElement.removeAttribute('open');
    this.submitted = false;
    this.formIncreaseWallet.reset();
  }
}
