import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProcedureRoutingModule } from './procedure-routing.module';
import { ProcedureComponent } from './procedure.component';
import { ListProcedureComponent } from './list-procedure/list-procedure.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
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
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DetailsProcedureComponent } from './details-procedure/details-procedure.component';
import {PanelModule} from 'primeng/panel';
import {TabViewModule} from 'primeng/tabview';


@NgModule({
  declarations: [
    ProcedureComponent,
    ListProcedureComponent,
    DetailsProcedureComponent
  ],
  imports: [
    CommonModule,
    ProcedureRoutingModule,
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
    PanelModule,
    TabViewModule
  ]
  ,
  providers: [
    ConfirmationService ,
    MessageService // Add the ConfirmationService here
  ]
})
export class ProcedureModule { }
