import { Component, inject, OnInit, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { LinkService } from '../../../core/services/link.service';

@Component({
  selector: 'app-link-form',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './link-form.component.html'
})
export class LinkFormComponent implements OnInit {
  private fb = inject(FormBuilder);
  private linkService = inject(LinkService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  editId: number | null = null;
  loading = signal(false);
  saving = signal(false);
  errorMsg = signal('');

  form = this.fb.group({
    url: ['', [Validators.required, Validators.pattern('https?://.+')]],
    title: ['', Validators.required],
    description: [''],
    category: ['', Validators.required],
    tags: ['']
  });

  get isEdit(): boolean { return this.editId !== null; }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.editId = +id;
      this.loading.set(true);
      this.linkService.getById(this.editId).subscribe({
        next: link => { this.form.patchValue(link); this.loading.set(false); },
        error: () => { this.errorMsg.set('Failed to load link.'); this.loading.set(false); }
      });
    }
  }

  submit(): void {
    if (this.form.invalid) { this.form.markAllAsTouched(); return; }
    this.saving.set(true);

    const req = this.form.value as any;
    const op = this.isEdit
      ? this.linkService.update(this.editId!, req)
      : this.linkService.create(req);

    op.subscribe({
      next: () => this.router.navigateByUrl('/links'),
      error: err => { this.errorMsg.set(err.error?.message ?? 'Save failed.'); this.saving.set(false); }
    });
  }
}
