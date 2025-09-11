import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthentificationRoutingModule } from './authentification-routing.module';
import { SigninComponent } from './signin/signin.component';
import {ButtonModule} from 'primeng/button';
import {CheckboxModule} from 'primeng/checkbox';
import {CardModule} from 'primeng/card';
import { HttpClientModule } from '@angular/common/http';
import { CalendarModule } from 'primeng/calendar';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ContextMenuModule } from 'primeng/contextmenu';
import { DialogModule } from 'primeng/dialog';
import { DividerModule } from 'primeng/divider';
import { DropdownModule } from 'primeng/dropdown';
import { FileUploadModule } from 'primeng/fileupload';
import { InputTextModule } from 'primeng/inputtext';
import { MultiSelectModule } from 'primeng/multiselect';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { PasswordModule } from 'primeng/password';
import { ProgressBarModule } from 'primeng/progressbar';
import { SliderModule } from 'primeng/slider';
import { SplitterModule } from 'primeng/splitter';
import { TableModule } from 'primeng/table';
import { TabViewModule } from 'primeng/tabview';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { ConfirmationService, MessageService } from 'primeng/api';
import {MessagesModule} from 'primeng/messages';
import {MessageModule} from 'primeng/message';
import {ProgressSpinnerModule} from 'primeng/progressspinner';
import { SharedModule } from "../../shared/shared.module";
import { DossierSuiviComponent } from './dossier-suivi/dossier-suivi.component';
import { TimelineModule } from 'primeng/timeline';
import { ResetPassComponent } from './reset-pass/reset-pass.component';
import { PageCompteCreateComponent } from './page-compte-create/page-compte-create.component';
import { MotDepassOublieComponent } from './mot-depass-oublie/mot-depass-oublie.component';

@NgModule({
  declarations: [
    SigninComponent,
    DossierSuiviComponent,
    ResetPassComponent,
    PageCompteCreateComponent,
    MotDepassOublieComponent
  ],
  imports: [
    CommonModule,
    AuthentificationRoutingModule,
    ButtonModule,
    CheckboxModule,
    CardModule,
    ReactiveFormsModule,
    FormsModule,
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
    TabViewModule,
    MessagesModule,
    MessageModule,
    ProgressSpinnerModule,
    SharedModule,
    ConfirmDialogModule,
    SplitterModule,
    TimelineModule
],

  providers: [
    ConfirmationService ,
    MessageService ,

  ]
})
export class AuthentificationModule { }
