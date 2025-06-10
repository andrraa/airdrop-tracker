import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateComponent } from './create/create.component';
import { EditComponent } from './edit/edit.component';
import { IndexComponent } from './index/index.component';

const routes: Routes = [
  {
    path: '',
    title: 'Home - Airdrop Tracker',
    component: IndexComponent,
  },
  {
    path: 'airdrop/create',
    title: 'Create - Airdrop Tracker',
    component: CreateComponent,
  },
  {
    path: 'airdrop/:id/edit',
    title: 'Edit - Airdrop Tracker',
    component: EditComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeRoutingModule {}
