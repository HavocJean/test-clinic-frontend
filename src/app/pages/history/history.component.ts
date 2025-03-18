import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HistoryService } from '../../services/history.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-history',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './history.component.html',
  styleUrl: './history.component.css'
})
export class HistoryComponent implements OnInit {
  searchQuery = signal('');
  historyList = signal<any[]>([]);
  currentPage = signal(1);
  totalPages = signal(1);
  isLoading = signal(false);

  constructor(private HistoryService: HistoryService, private router: Router) {}

  ngOnInit() {
    this.fetchUserHistory();
  }

  fetchUserHistory() {
    this.isLoading.set(true);
    this.HistoryService.getUserHistory(this.searchQuery(), this.currentPage()).subscribe({
      next: (data) => {
        // console.log('Data received:', data.data);
        this.historyList.update(() => data.data);
        this.totalPages.update(() => data.last_page);
        this.isLoading.set(false);
      },
      error: (err) => {
        this.isLoading.set(false);
      },
      complete: () => {
        this.isLoading.set(false);
      }
    });
  }

  search() {
    this.currentPage.set(1);
    this.fetchUserHistory();
  }

  changePage(page: number) {
    if (page >= 1 && page <= this.totalPages()) {
        this.currentPage.set(page);
        this.fetchUserHistory();
    }
  }

  getPagesArray(): number[] {
      return Array.from({ length: this.totalPages() }, (_, i) => i + 1);
  }

  // viewRecord(id: number) {
  //   this.router.navigate(['/history', id, 'view']);
  // }

  // editRecord(id: number) {
  //   this.router.navigate(['/history', id, 'edit']);
  // }

  getSpecialtiesNames(record: any): string {
    return record.specialties?.map((s: any) => s.name).join(', ') || 'Sem especialidades';
  }  
}