import { environment } from 'src/environments/environment';

export const USERS_CONFIG = {
	requests: {
		getData: {
			name: 'getData',
			url: environment.apiBaseUrl + '/users',
		},
		updateData: {
			name: 'getQrId',
			url: environment.apiBaseUrl + '/users/',
		},
	},
};
