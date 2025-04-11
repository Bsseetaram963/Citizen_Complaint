import { CommonModule, NgIf } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { LoaderService } from '../services/loader.service';
import { SharedModule } from '../shared/shared.module';

@Component({
  selector: 'app-loader',
  standalone: true,
  imports: [NgIf, CommonModule, SharedModule],
  templateUrl: './loader.component.html',
  styleUrl: './loader.component.css',
})
export class LoaderComponent {
  loaderService = inject(LoaderService);
  isLoading = this.loaderService.loader$;
}
