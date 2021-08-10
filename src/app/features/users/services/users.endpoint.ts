import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { ApiService } from 'src/app/infrastructure/api-integration/api.service';
import { StoreRequestStateUpdater } from 'src/app/infrastructure/api-integration/types/store-request-state-updater';
import { Users } from '../types/users.type';
import { USERS_CONFIG } from '../users.config';

@Injectable()
export class UsersEndPoint {
	constructor(private readonly apiService: ApiService) {}

	getData(
		requestStateUpdater: StoreRequestStateUpdater,
	): Observable<Users[]> {
		const request = {
			name: USERS_CONFIG.requests.getData.name,
			url: USERS_CONFIG.requests.getData.url,
		};

		return this.apiService.get(request, requestStateUpdater);
	}

	updateData(
		userId: string,
		requestStateUpdater: StoreRequestStateUpdater,
	): Observable<any> {
		const request = {
			name: USERS_CONFIG.requests.updateData.name,
			url: USERS_CONFIG.requests.updateData.url + userId,
		};

		const params = {};

		return this.apiService.post(request, params, requestStateUpdater);
	}
}
