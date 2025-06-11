import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, ViewEncapsulation } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HomeService } from '../service/home.service';
import { SuccessResponse } from '../../models/base.model';
import { AirdropResponse } from '../model/airdrop.model';
import { TreeTableModule } from 'primeng/treetable';
import { TableModule } from 'primeng/table';
import { TreeNode } from 'primeng/api';

@Component({
  standalone: true,
  selector: 'app-index',
  imports: [CommonModule, RouterModule, TreeTableModule],
  templateUrl: './index.component.html',
  styleUrl: './index.component.css',
  encapsulation: ViewEncapsulation.None,
})
export class IndexComponent implements OnInit {
  private homeService = inject(HomeService);

  userName: string = localStorage.getItem('user_name') ?? '';

  async ngOnInit() {
    this.index();
  }

  isLoading: boolean = false;
  tableData: AirdropResponse[] = [];

  async index() {
    this.isLoading = true;

    try {
      const result: SuccessResponse<AirdropResponse[]> =
        await this.homeService.index();

      if (result.success && result.data) {
        this.tableData = result.data;
      }
    } catch (error) {
    } finally {
      this.isLoading = false;
    }
  }
}
