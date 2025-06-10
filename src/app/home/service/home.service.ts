import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import {
  AirdropRequest,
  AirdropResponse,
  AirdropValidationError,
} from '../model/airdrop.model';
import { FailedResponse, SuccessResponse } from '../../models/base.model';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HomeService {
  private httpClient = inject(HttpClient);
  private apiBaseUrl = environment.api_base_url;

  // CREATE AIRDROP
  async store(data: AirdropRequest): Promise<SuccessResponse<AirdropResponse>> {
    const storeUrl = this.apiBaseUrl + '/v1/airdrop';

    try {
      return await firstValueFrom(
        this.httpClient.post<SuccessResponse<AirdropResponse>>(storeUrl, data)
      );
    } catch (error) {
      throw error as FailedResponse<AirdropValidationError>;
    }
  }
}
