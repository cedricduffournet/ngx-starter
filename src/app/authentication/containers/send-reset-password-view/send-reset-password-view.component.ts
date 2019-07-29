import { Component, ChangeDetectionStrategy } from '@angular/core';

import { BehaviorSubject } from 'rxjs';
import { AuthService } from '@app/authentication/services';
import { SendResetPassword } from '@app/authentication/models/auth';

@Component({
  selector: 'app-send-reset-password-view',
  templateUrl: './send-reset-password-view.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SendResetPasswordViewComponent {
  status$ = new BehaviorSubject<string>('init');
  username = '';

  public constructor(private authService: AuthService) {}

  onReset(username: SendResetPassword) {
    this.username = username.username;
    this.status$.next('processing');
    this.authService.reset(username).subscribe(
      (value: string) => {
        this.status$.next(value);
      },
      (error: any) => {
        if (error.status === 404) {
          return this.status$.next('errorTokenNotFound');
        }
        if (error.status === 400) {
          return this.status$.next('mailAlreadySended');
        }
        return this.status$.next('init');
      }
    );
  }
}
