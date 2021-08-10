import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { UsersView } from './views/users-view/users.view';

const routes: Routes = [
	{
		path: '',
		component: UsersView,
		data: {
			title: 'users',
		},
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class PatientRoutingModule {}
