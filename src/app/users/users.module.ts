import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { CreateComponent } from './create/create.component';
import { ViewComponent } from './view/view.component';
import { ReactiveFormsModule } from '@angular/forms';
import { DataService } from '../data.service';

@NgModule({
  declarations: [
    CreateComponent,
    ViewComponent
  ],
  imports: [
    CommonModule,
    UsersRoutingModule,
    ReactiveFormsModule
  ],
  providers:[DataService]
})
export class UsersModule {

  }
 
