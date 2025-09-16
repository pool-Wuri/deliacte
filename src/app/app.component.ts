import { Component } from '@angular/core';
import { IdleService } from './core/services/IdleService.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Deliacte';
  constructor(private idleService: IdleService){}
}
