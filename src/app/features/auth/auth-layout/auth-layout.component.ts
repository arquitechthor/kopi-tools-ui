import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-auth-layout',
  imports: [RouterOutlet],
  template: `
    <div class="container d-flex justify-content-center align-items-center" style="min-height: calc(100vh - 56px)">
      <div class="col-12 col-sm-8 col-md-5 col-lg-4">
        <router-outlet />
      </div>
    </div>
  `
})
export class AuthLayoutComponent {}
