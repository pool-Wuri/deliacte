import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BaseLayoutRoutingModule } from './base-layout-routing.module';
import { BaseLayoutComponent } from './base-layout.component';
import { HeaderComponent } from 'src/app/shared/header/header.component';
import { NavbarComponent } from 'src/app/shared/navbar/navbar.component';
import { FooterComponent } from 'src/app/shared/footer/footer.component';


@NgModule({
  declarations: [
    BaseLayoutComponent,
    HeaderComponent,
    NavbarComponent,
    FooterComponent
  ],
  imports: [
    CommonModule,
    BaseLayoutRoutingModule
  ],
  exports:[
    BaseLayoutComponent
  ]
})
export class BaseLayoutModule { }
