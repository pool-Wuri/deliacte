import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfirmationService, MessageService } from 'primeng/api'; // Ajoute ConfirmationService et MessageService
import { ProcedurePublishedRoutingModule } from './procedure-published-routing.module';
import { ProcedurePublishedComponent } from './procedure-published.component';
import { ListProcedurePublishedComponent } from './list-procedure-published/list-procedure-published.component';

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
import { SplitterModule } from 'primeng/splitter';
import {PanelModule} from 'primeng/panel';
import {TabViewModule} from 'primeng/tabview';
import { CardModule } from 'primeng/card';
import { DemandePageComponent } from './demande-page/demande-page.component';
import {RadioButtonModule} from 'primeng/radiobutton';
import { TreeModule } from 'primeng/tree';
//import { DragDropModule } from '@angular/cdk/drag-drop';
import { ProductService } from './ProductService';
import { DragDropModule } from 'primeng/dragdrop';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { FaqComponent } from './faq/faq.component';
import { AdministrationsComponent } from './administrations/administrations.component';

@NgModule({
  declarations: [
    ProcedurePublishedComponent,
    ListProcedurePublishedComponent,
    DemandePageComponent,
    FaqComponent,
    AdministrationsComponent,
    
  ],
  imports: [
    CommonModule,
    ProcedurePublishedRoutingModule,
    TabViewModule,
    CardModule,
    ConfirmDialogModule,
    DividerModule,
    SplitterModule,
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
    FileUploadModule,
    PanelModule,
    RadioButtonModule,
    TreeModule,
    DragDropModule,
    ProgressSpinnerModule,

    ],
  providers: [
    ConfirmationService ,
    MessageService,
    ProductService // Add the ConfirmationService here
  ]
})
export class ProcedurePublishedModule { }
