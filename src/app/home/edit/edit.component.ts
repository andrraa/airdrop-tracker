import { Component, ViewEncapsulation } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-edit',
  imports: [RouterModule],
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.css',
  encapsulation: ViewEncapsulation.None,
})
export class EditComponent {}
