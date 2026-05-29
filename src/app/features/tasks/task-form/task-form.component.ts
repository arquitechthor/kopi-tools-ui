import { Component, inject, OnInit, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { TaskService } from '../../../core/services/task.service';

@Component({
  selector: 'app-task-form',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './task-form.component.html'
})
export class TaskFormComponent implements OnInit {
  private fb = inject(FormBuilder);
  private taskService = inject(TaskService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  editId: number | null = null;
  loading = signal(false);
  saving = signal(false);
  errorMsg = signal('');

  form = this.fb.group({
    title: ['', Validators.required],
    description: ['', Validators.required],
    category: ['', Validators.required],
    tags: [''],
    priority: [null as number | null]
  });

  get isEdit(): boolean { return this.editId !== null; }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.editId = +id;
      this.loading.set(true);
      this.taskService.getById(this.editId).subscribe({
        next: task => { this.form.patchValue(task); this.loading.set(false); },
        error: () => { this.errorMsg.set('Failed to load task.'); this.loading.set(false); }
      });
    }
  }

  submit(): void {
    if (this.form.invalid) { this.form.markAllAsTouched(); return; }
    this.saving.set(true);

    const raw = this.form.value;
    const req: any = {
      title: raw.title,
      description: raw.description,
      category: raw.category,
      tags: raw.tags || undefined,
      priority: raw.priority ?? undefined
    };

    const op = this.isEdit
      ? this.taskService.update(this.editId!, req)
      : this.taskService.create(req);

    op.subscribe({
      next: () => this.router.navigateByUrl('/tasks'),
      error: err => { this.errorMsg.set(err.error?.message ?? 'Save failed.'); this.saving.set(false); }
    });
  }
}
