import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthentificationRoutingModule } from './authentification-routing.module';
import { SigninComponent } from './signin/signin.component';
import {ButtonModule} from 'primeng/button';
import {CheckboxModule} from 'primeng/checkbox';
import {CardModule} from 'primeng/card';


@NgModule({
  declarations: [
    SigninComponent
  ],
  imports: [
    CommonModule,
    AuthentificationRoutingModule,
    ButtonModule,
    CheckboxModule,
    CardModule,
    ReactiveFormsModule,
  ]
})
export class AuthentificationModule { }
