import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { BehaviorSubject } from 'rxjs';

import { ResetPassword } from '@app/authentication/models/auth';
import { AuthService } from '@app/authentication/services';

@Component({
  selector: 'app-reset-password-view',
  templateUrl: './reset-password-view.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ResetPasswordViewComponent implements OnInit {
  status$ = new BehaviorSubject<string>('init');
  token = '';

  constructor(private route: ActivatedRoute, private authService: AuthService) {
    this.token = this.route.snapshot.params.token;
  }
  ngOnInit() {
    this.authService.confirmResetting(this.token).subscribe(
      () => {
        this.status$.next('successConfirmReset');
      },
      () => {
        this.status$.next('errorTokenNotFound');
      }
    );
  }

  onResetPassword(data: ResetPassword) {
    this.authService.resetPassword(data, this.token).subscribe(() => {
      this.status$.next('successPaswordChanged');
    });
  }
}
