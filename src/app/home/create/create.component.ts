import { Component, inject, ViewEncapsulation } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RouterModule } from '@angular/router';
import {
  AirdropRequest,
  AirdropResponse,
  AirdropValidationError,
} from '../model/airdrop.model';
import { CommonModule } from '@angular/common';
import { ValidationComponent } from '../../components/validation/validation.component';
import { HomeService } from '../service/home.service';
import { FailedResponse, SuccessResponse } from '../../models/base.model';
import { HttpErrorResponse } from '@angular/common/http';
import { MessageService } from 'primeng/api';
import { Toast } from 'primeng/toast';

@Component({
  standalone: true,
  selector: 'app-create',
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    ValidationComponent,
    Toast,
  ],
  templateUrl: './create.component.html',
  styleUrl: './create.component.css',
  encapsulation: ViewEncapsulation.None,
  providers: [MessageService],
})
export class CreateComponent {
  private formBuilder = inject(FormBuilder);
  private homeService = inject(HomeService);
  private messageService = inject(MessageService);

  validationErrors: AirdropValidationError = {};

  airdropForm: FormGroup = this.formBuilder.group({
    name: [null, Validators.required],
    link: [null, Validators.required],
    faucetLink: [null],
    referralLink: [null],
    type: ['', Validators.required],
    loginType: [null, Validators.required],
    wallet: [null],
    status: ['', Validators.required],
    description: [null],
  });

  isLoading: boolean = false;

  async create() {
    this.validationErrors = {};

    if (this.airdropForm.invalid) {
      this.airdropForm.markAllAsTouched();
      return;
    }

    this.isLoading = true;

    const {
      name,
      link,
      faucetLink,
      referralLink,
      type,
      loginType,
      wallet,
      status,
      description,
    } = this.airdropForm.value;

    const data: AirdropRequest = {
      name: name,
      link: link,
      faucetLink: faucetLink,
      referralLink: referralLink,
      type: type,
      loginType: loginType,
      wallet: wallet,
      status: status,
      description: description,
    };

    try {
      const response: SuccessResponse<AirdropResponse> =
        await this.homeService.store(data);

      this.messageService.add({
        severity: 'success',
        summary: 'Success',
        detail: response.message,
      });

      this.airdropForm.reset(this.getDefaultFormValues());
    } catch (error) {
      if (error instanceof HttpErrorResponse) {
        const errorResponse =
          error.error as FailedResponse<AirdropValidationError>;
        if ('errors' in error.error) {
          this.validationErrors = errorResponse.errors ?? {};
        } else {
          this.messageService.add({
            severity: 'error',
            summary: 'Failed',
            detail: errorResponse.message,
          });
        }
      }
    } finally {
      this.isLoading = false;
    }
  }

  private getDefaultFormValues() {
    return {
      name: null,
      link: null,
      faucetLink: null,
      referralLink: null,
      type: '',
      loginType: null,
      wallet: null,
      status: '',
      description: null,
    };
  }
}
