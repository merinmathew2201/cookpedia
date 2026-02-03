import { Component, inject } from '@angular/core';
import { ApiServices } from '../../services/api-services';

@Component({
  selector: 'app-downloads',
  standalone: false,
  templateUrl: './downloads.html',
  styleUrl: './downloads.css',
})
export class Downloads {
  
  api = inject(ApiServices)
}
