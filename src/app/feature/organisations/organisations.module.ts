import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfirmationService, MessageService } from 'primeng/api'; // Ajoute ConfirmationService et MessageService
import { OrganisationsRoutingModule } from './organisations-routing.module';
import { OrganisationsComponent } from './organisations.component';
import { ListOrganisationsComponent } from './list-organisations/list-organisations.component';
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

import {DividerModule} from 'primeng/divider';
import {OverlayPanelModule} from 'primeng/overlaypanel';
import {ConfirmDialog, ConfirmDialogModule} from 'primeng/confirmdialog';
import { DetailsOrganisationsComponent } from './details-organisations/details-organisations.component';

@NgModule({
  declarations: [
    OrganisationsComponent,
    ListOrganisationsComponent,
    DetailsOrganisationsComponent
  ],
  imports: [
    CommonModule,
    ConfirmDialogModule,
    DividerModule,
    OverlayPanelModule,
    OrganisationsRoutingModule,
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
    FileUploadModule
  ],
  providers: [
    ConfirmationService ,
    MessageService // Add the ConfirmationService here
  ]
})
export class OrganisationsModule { }
