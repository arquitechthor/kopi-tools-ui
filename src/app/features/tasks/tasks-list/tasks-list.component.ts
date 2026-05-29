import { Component, inject, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TaskService } from '../../../core/services/task.service';
import { TaskResponse } from '../../../core/models/task.model';

@Component({
  selector: 'app-tasks-list',
  imports: [RouterLink],
  templateUrl: './tasks-list.component.html'
})
export class TasksListComponent implements OnInit {
  private taskService = inject(TaskService);

  tasks = signal<TaskResponse[]>([]);
  loading = signal(true);
  errorMsg = signal('');

  ngOnInit(): void {
    this.load();
  }

  load(): void {
    this.loading.set(true);
    this.taskService.getAll().subscribe({
      next: data => {
        this.tasks.set(data.sort((a, b) => a.priority - b.priority));
        this.loading.set(false);
      },
      error: () => { this.errorMsg.set('Failed to load tasks.'); this.loading.set(false); }
    });
  }

  delete(id: number): void {
    if (!confirm('Delete this task?')) return;
    this.taskService.delete(id).subscribe({ next: () => this.load() });
  }

  moveUp(id: number): void {
    this.taskService.moveUp(id).subscribe({ next: () => this.load() });
  }

  moveDown(id: number): void {
    this.taskService.moveDown(id).subscribe({ next: () => this.load() });
  }

  tagsArray(tags?: string): string[] {
    return tags ? tags.split(',').map(t => t.trim()).filter(Boolean) : [];
  }
}
