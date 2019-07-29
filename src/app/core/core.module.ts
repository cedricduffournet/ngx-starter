import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { environment } from '@env/environment';
import {
  HttpClientModule,
  HttpClient,
  HTTP_INTERCEPTORS
} from '@angular/common/http';

import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { ModalModule } from 'ngx-bootstrap/modal';
import { ToasterModule } from 'angular2-toaster';

import {
  ToasterComponent,
  HttpProgressBarComponent
} from '@app/core/containers';
import { HttpProgressInterceptor } from '@app/core/services/http-progress.interceptor';

const MODULES: any[] = [
  HttpClientModule,
  TranslateModule.forRoot({
    loader: {
      provide: TranslateLoader,
      useFactory: HttpLoaderFactory,
      deps: [HttpClient]
    }
  }),
  ModalModule.forRoot(),
  ToasterModule.forRoot(),
  CommonModule
];

export const COMPONENTS = [ToasterComponent, HttpProgressBarComponent];

@NgModule({
  imports: MODULES,
  declarations: COMPONENTS,
  exports: COMPONENTS,
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpProgressInterceptor,
      multi: true
    }
  ]
})
export class CoreModule {
  constructor(
    @Optional()
    @SkipSelf()
    parentModule: CoreModule
  ) {
    if (parentModule) {
      throw new Error(
        'CoreModule is already loaded. Import only once in main AppModule.'
      );
    }
  }
}

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(
    http,
    `${environment.prefixAsset}/assets/i18n/`,
    '.json'
  );
}
