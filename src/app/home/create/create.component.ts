import { Component, ViewEncapsulation } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-create',
  imports: [RouterModule],
  templateUrl: './create.component.html',
  styleUrl: './create.component.css',
  encapsulation: ViewEncapsulation.None,
})
export class CreateComponent {}
