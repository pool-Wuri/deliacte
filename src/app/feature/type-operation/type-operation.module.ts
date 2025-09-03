import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TypeOperationRoutingModule } from './type-operation-routing.module';
import { TypeOperationComponent } from './type-operation.component';
import { ListTypeOperationComponent } from './list-type-operation/list-type-operation.component';
import { ConfirmationService, MessageService } from 'primeng/api'; // Ajoute ConfirmationService et MessageService
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
import { InputTextareaModule } from 'primeng/inputtextarea';
import {DividerModule} from 'primeng/divider';
import {OverlayPanelModule} from 'primeng/overlaypanel';
import {ConfirmDialog, ConfirmDialogModule} from 'primeng/confirmdialog';
import { DetailsTypeoperationComponent } from './details-typeoperation/details-typeoperation.component';
import { ProgressSpinnerModule } from 'primeng/progressspinner';


@NgModule({
  declarations: [
    TypeOperationComponent,
    ListTypeOperationComponent,
    DetailsTypeoperationComponent
  ],
  imports: [
    CommonModule,
    TypeOperationRoutingModule,
    ConfirmDialogModule,
    DividerModule,
    InputTextareaModule,
    OverlayPanelModule,
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
    ProgressSpinnerModule,
    FileUploadModule,
    InputTextareaModule
  ],
  providers: [
    ConfirmationService ,
    MessageService // Add the ConfirmationService here
  ]
})
export class TypeOperationModule { }
