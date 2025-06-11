import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FeatherModule } from 'angular-feather';
import {
  Edit,
  Home,
  Lock,
  LogOut,
  Mail,
  Menu,
  PlusSquare,
  Settings,
  Trash2,
  User,
  Users,
} from 'angular-feather/icons';

const icons = {
  Lock,
  Mail,
  User,
  Menu,
  Home,
  Users,
  LogOut,
  Settings,
  PlusSquare,
  Edit,
  Trash2
};

@NgModule({
  declarations: [],
  imports: [CommonModule, FeatherModule.pick(icons)],
  exports: [FeatherModule],
})
export class IconModule {}
