import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HistoryService } from '../../services/history.service';

@Component({
  selector: 'app-history-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule], 
  templateUrl: './history-form.component.html'
})
export class HistoryFormComponent implements OnInit {
  historyForm!: FormGroup;
  isEditing = false;
  regionals: any[] = [];
  specialties: any[] = [];
  historyId: number | null = null;

  constructor(
    private fb: FormBuilder,
    private historyService: HistoryService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.historyForm = this.fb.group({
      corporate_name: ['', Validators.required],
      trade_name: ['', Validators.required],
      cnpj: ['', Validators.required],
      regional_id: ['', Validators.required],
      start_date: ['', Validators.required],
      status: [true],
      specialties: [[]]
    });

    this.loadRegionals();
    this.loadSpecialties();

    this.historyId = Number(this.route.snapshot.paramMap.get('id'));
    if (this.historyId) {
      this.isEditing = true;
      this.loadRecord(this.historyId);
    }
  }

  loadRegionals() {
    this.historyService.getRegionals().subscribe(
      (regionals) => (this.regionals = regionals),
      (error) => console.error('Erro ao carregar regionais:', error)
    );
  }

  loadSpecialties() {
    this.historyService.getSpecialties().subscribe(
      (specialties) => (this.specialties = specialties),
      (error) => console.error('Erro ao carregar especialidades:', error)
    );
  }

  loadRecord(id: number) {
    this.historyService.getById(id).subscribe(
      (data) => {
        this.historyForm.patchValue({
          corporate_name: data.corporate_name,
          trade_name: data.trade_name,
          cnpj: data.cnpj,
          regional_id: data.regional_id,
          start_date: data.start_date.split(' ')[0],
          status: data.status,
          specialties: data.specialties.map((s: any) => s.id) 
        });
      },
      (error) => console.error('Erro ao carregar registro:', error)
    );
  }

  isInvalid(field: string): boolean {
    return !!this.historyForm.get(field)?.invalid && !!this.historyForm.get(field)?.touched;
  }

  onSubmit(): void {
    if (this.historyForm.valid) {
      if (this.isEditing) {
        this.historyService.update(this.historyId!, this.historyForm.value).subscribe(() => {
          this.router.navigate(['/history']);
        });
      } else {
        this.historyService.create(this.historyForm.value).subscribe(() => {
          this.router.navigate(['/history']);
        });
      }
    }
  }

  cancel(): void {
    this.router.navigate(['/history']);
  }
}
