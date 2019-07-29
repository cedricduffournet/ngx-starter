import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { BehaviorSubject } from 'rxjs';

import { AuthService } from '@app/authentication/services';

@Component({
  selector: 'app-register-confirm-view',
  templateUrl: './register-confirm-view.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RegisterConfirmViewComponent implements OnInit {
  status$ = new BehaviorSubject<string>('init');
  token = '';

  constructor(private route: ActivatedRoute, private authService: AuthService) {
    this.token = this.route.snapshot.params.token;
  }

  ngOnInit() {
    this.authService.confirmRegistration(this.token).subscribe(
      () => {
        this.status$.next('success');
      },
      () => {
        this.status$.next('error');
      }
    );
  }
}
