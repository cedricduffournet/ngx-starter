import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ServiceWorkerModule } from '@angular/service-worker';
import { RouterModule } from '@angular/router';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { TokenInterceptor } from './authentication/services/token.interceptor';
import { CoreModule } from './core/core.module';
import { ShellModule } from '@app/shell/shell.module';
import { AuthModule } from './authentication/auth.module';
import { AppComponent } from './app.component';
import { DashboardModule } from '@app/dashboard/dashboard.module';
import { APP_ROUTES } from './app.routes';
import { CoalescingComponentFactoryResolver } from '@app/coalescing-component-factory-resolver.service';
import { StoreRouterConnectingModule, RouterState } from '@ngrx/router-store';
import { CustomRouteSerializer } from '@app/core/utils/custom-route-serializer';
import { reducers } from '@app/core/state/reducers';
import { environment } from '@env/environment';
import { extModules } from '@app/build-specifics';

let MODULES: any[] = [
  BrowserModule,
  BrowserAnimationsModule,
  EffectsModule.forRoot([]),
  ShellModule,
  CoreModule,
  DashboardModule,
  // SharedModule,
  AuthModule,
  StoreModule.forRoot(reducers, {
    runtimeChecks: {
      strictStateImmutability: true,
      strictActionImmutability: true,
      strictStateSerializability: true,
      strictActionSerializability: true
    }
  }),
  StoreRouterConnectingModule.forRoot({
    routerState: RouterState.Minimal,
    serializer: CustomRouteSerializer
  }),
  ServiceWorkerModule.register('/ngsw-worker.js', {
    enabled: environment.production
  }),
  RouterModule.forRoot(APP_ROUTES, {
    useHash: true,
    scrollPositionRestoration: 'enabled'
  })
];

if (!environment.production) {
  MODULES = [...MODULES, extModules];
}
@NgModule({
  imports: MODULES,
  exports: [RouterModule],
  declarations: [AppComponent],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    },
    CoalescingComponentFactoryResolver
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(coalescingResolver: CoalescingComponentFactoryResolver) {
    coalescingResolver.init();
  }
}
