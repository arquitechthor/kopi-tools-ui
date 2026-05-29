import { Component, inject, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LinkService } from '../../../core/services/link.service';
import { LinkResponse } from '../../../core/models/link.model';

@Component({
  selector: 'app-links-list',
  imports: [RouterLink],
  templateUrl: './links-list.component.html'
})
export class LinksListComponent implements OnInit {
  private linkService = inject(LinkService);

  grouped = signal<Record<string, LinkResponse[]>>({});
  loading = signal(true);
  errorMsg = signal('');

  get categories(): string[] {
    return Object.keys(this.grouped());
  }

  ngOnInit(): void {
    this.load();
  }

  load(): void {
    this.loading.set(true);
    this.linkService.getGrouped().subscribe({
      next: data => { this.grouped.set(data); this.loading.set(false); },
      error: () => { this.errorMsg.set('Failed to load links.'); this.loading.set(false); }
    });
  }

  delete(id: number): void {
    if (!confirm('Delete this link?')) return;
    this.linkService.delete(id).subscribe({ next: () => this.load() });
  }

  tagsArray(tags?: string): string[] {
    return tags ? tags.split(',').map(t => t.trim()).filter(Boolean) : [];
  }
}
