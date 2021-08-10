import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersPipe } from './pipes/users.pipe';
import { UsersListComponent } from './components/users-list/users-list.component';
import { UsersView } from './views/users-view/users.view';

@NgModule({
	declarations: [UsersPipe, UsersListComponent, UsersView],
	imports: [CommonModule],
})
export class UsersModule {}
