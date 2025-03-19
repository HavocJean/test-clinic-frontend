import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-history-view',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './history-view.component.html',
  styleUrl: './history-view.component.css'
})
export class HistoryViewComponent {
  @Input() history: any;
  @Output() close = new EventEmitter<void>();

  closeView(): void {
    this.close.emit();
  }
}
