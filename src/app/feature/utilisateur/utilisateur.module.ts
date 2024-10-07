import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UtilisateurRoutingModule } from './utilisateur-routing.module';
import { UtilisateurComponent } from './utilisateur.component';
import { ListUtilisateurComponent } from './list-utilisateur/list-utilisateur.component';
import {ToastModule} from 'primeng/toast';
import {ToolbarModule} from 'primeng/toolbar';
import {ButtonModule} from 'primeng/button';
import {TableModule} from 'primeng/table';
import { FormsModule } from '@angular/forms';
import { CalendarModule } from 'primeng/calendar';
import { InputTextModule } from 'primeng/inputtext';
import {SliderModule} from 'primeng/slider';
import {DialogModule} from 'primeng/dialog';
import {MultiSelectModule} from 'primeng/multiselect';
import {ContextMenuModule} from 'primeng/contextmenu';
import {ProgressBarModule} from 'primeng/progressbar';
import {DropdownModule} from 'primeng/dropdown';
import {FileUploadModule} from 'primeng/fileupload';
import { HttpClientModule } from '@angular/common/http';
import {PasswordModule} from 'primeng/password';
import { DetailsUtilisateurComponent } from './details-utilisateur/details-utilisateur.component';
import {DividerModule} from 'primeng/divider';
import {OverlayPanelModule} from 'primeng/overlaypanel';
import {ConfirmDialog, ConfirmDialogModule} from 'primeng/confirmdialog';
import {ConfirmationService, MessageService} from 'primeng/api';
import {SplitterModule} from 'primeng/splitter';
import {TabViewModule} from 'primeng/tabview';

@NgModule({
  declarations: [
    UtilisateurComponent,
    ListUtilisateurComponent,
    DetailsUtilisateurComponent
  ],
  imports: [
    CommonModule,
    UtilisateurRoutingModule,
    ToastModule,
    ToolbarModule,
    ButtonModule,
    TableModule,
    CalendarModule,
		SliderModule,
		DialogModule,
		MultiSelectModule,
		ContextMenuModule,
		DropdownModule,
		ButtonModule,
		ToastModule,
    InputTextModule,
    ProgressBarModule,
    HttpClientModule,
    FormsModule,
    FileUploadModule,
    PasswordModule,
    DividerModule,
    OverlayPanelModule,
    ConfirmDialogModule,
    SplitterModule,
    TabViewModule
    
  ],
  providers: [
    ConfirmationService ,
    MessageService // Add the ConfirmationService here
  ]
})
export class UtilisateurModule { }
