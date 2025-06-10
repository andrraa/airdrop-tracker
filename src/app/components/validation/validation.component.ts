import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { AbstractControl, ValidationErrors } from '@angular/forms';

@Component({
  standalone: true,
  selector: 'app-validation',
  imports: [CommonModule],
  templateUrl: './validation.component.html',
  styleUrl: './validation.component.css',
})
export class ValidationComponent {
  @Input() control!: AbstractControl | null;
  @Input() label = 'This field';

  isShowError(): boolean {
    return !!this.control && this.control.touched && !!this.control.errors;
  }

  getErrorMessage(): string | null {
    if (!this.control?.errors) return null;

    const errors: ValidationErrors = this.control.errors;

    if (errors['required']) return `${this.label} is required`;

    if (errors['minlength'])
      return `${this.label} must be at least ${errors['minlength'].requiredLength} characters`;

    if (errors['maxlength'])
      return `${this.label} must be at most ${errors['maxlength'].requiredLength} characters`;

    if (errors['email']) return `Invalid ${this.label}`;

    if (errors['pattern']) return `${this.label} format is invalid`;

    return `Invalid ${this.label.toLowerCase()}`;
  }
}
