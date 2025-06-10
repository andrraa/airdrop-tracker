import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FeatherModule } from 'angular-feather';
import {
  Home,
  Lock,
  LogOut,
  Mail,
  Menu,
  Settings,
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
};

@NgModule({
  declarations: [],
  imports: [CommonModule, FeatherModule.pick(icons)],
  exports: [FeatherModule],
})
export class IconModule {}
