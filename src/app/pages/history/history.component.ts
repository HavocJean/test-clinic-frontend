import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HistoryService } from '../../services/history.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HistoryViewComponent } from '../history-view/history-view.component';

@Component({
  selector: 'app-history',
  standalone: true,
  imports: [CommonModule, FormsModule, HistoryViewComponent],
  templateUrl: './history.component.html',
  styleUrl: './history.component.css'
})

export class HistoryComponent implements OnInit {
  searchQuery = signal('');
  historyList = signal<any[]>([]);
  currentPage = signal(1);
  totalPages = signal(1);
  isLoading = signal(false);

  // deleteModalOpen = false;
  // historyToDelete: string | null = null;

  showHistoryTable = true;
  selectedHistory: any = null;
  showViewModal = false;

  constructor(private HistoryService: HistoryService, private router: Router) {}

  ngOnInit() {
    this.fetchUserHistory();
  }

  fetchUserHistory() {
    this.isLoading.set(true);
    this.HistoryService.getHistory(this.searchQuery(), this.currentPage()).subscribe({
      next: (data) => {
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

  createHistory() {
    this.router.navigate(['/history/create']);
  }
  editHistory(id: string) {
    this.router.navigate([`/history/edit/${id}`]);
  }

  viewHistory(id: number): void {
    this.HistoryService.getById(id).subscribe((data) => {
        this.selectedHistory = data;
        this.showViewModal = true;
        this.showHistoryTable = false;
    });
  }

  closeViewHistory(): void {
    this.showViewModal = false;
    this.selectedHistory = null;
    this.showHistoryTable = true;
  }

  // openDeleteModal(id: string) {
  //   this.historyToDelete = id;
  //   this.deleteModalOpen = true;
  // }

  // closeDeleteModal() {
  //   this.historyToDelete = null;
  //   this.deleteModalOpen = false;
  // }

  // deleteHistory() {
  //   if (this.historyToDelete) {
  //     this.HistoryService.delete(this.historyToDelete).subscribe(() => {
  //       this.fetchUserHistory();
  //       this.closeDeleteModal();
  //     });
  //   }
  // }

  getSpecialtiesNames(record: any): string {
    return record.specialties?.map((s: any) => s.name).join(', ') || 'Sem especialidades';
  }
}