import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OperationRoutingModule } from './operation-routing.module';
import { OperationComponent } from './operation.component';
import { ListOperationComponent } from './list-operation/list-operation.component';
import { ProgressBarModule } from 'primeng/progressbar/public_api';
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
import { SliderModule } from 'primeng/slider';
import { SplitterModule } from 'primeng/splitter';
import { TableModule } from 'primeng/table';
import { TabViewModule } from 'primeng/tabview';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DetailsOperationComponent } from './details-operation/details-operation.component';
import { PanelModule } from 'primeng/panel';
import {PickListModule} from 'primeng/picklist';
import {DataViewModule} from 'primeng/dataview';
import {ListboxModule} from 'primeng/listbox';
import {TreeModule} from 'primeng/tree';
import { ProgressSpinnerModule } from 'primeng/progressspinner';


@NgModule({
  declarations: [
    OperationComponent,
    ListOperationComponent,
    DetailsOperationComponent
  ],
  imports: [
    CommonModule,
    OperationRoutingModule,
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
    HttpClientModule,
    FormsModule,
    FileUploadModule,
    PasswordModule,
    DividerModule,
    OverlayPanelModule,
    ConfirmDialogModule,
    SplitterModule,
    TabViewModule,
    PanelModule,
    PickListModule,
    DataViewModule,
    ListboxModule,
    ProgressSpinnerModule,
    TreeModule
    
  ],
  providers: [
    ConfirmationService ,
    MessageService // Add the ConfirmationService here
  ]
})
export class OperationModule { }
