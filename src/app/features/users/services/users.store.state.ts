import { Requests } from '../types/requests.type';
import { Users } from '../types/users.type';

export class UserStoreState {
	users: Users[] = [];
	requests: Requests = {
		getData: {},
		updateData: {},
	};
}
