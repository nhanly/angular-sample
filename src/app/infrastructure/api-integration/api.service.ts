import {
	HttpClient,
	HttpErrorResponse,
	HttpParams,
	HttpHeaders,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';

import { StoreRequestStateUpdater } from './types/store-request-state-updater';
import { ApiRequest } from './types/api-request';
import { APP_CONFIG } from 'src/app/app.config';

const ROOT_URL = APP_CONFIG.apiBaseUrl;

@Injectable()
export class ApiService {
	constructor(private readonly httpClient: HttpClient) {}

	private formatErrors(error: any) {
		return throwError(error.error);
	}

	get(
		apiRequest: ApiRequest,
		requestStateUpdater: StoreRequestStateUpdater,
		queryParams: HttpParams = new HttpParams(),
	): Observable<any> {
		requestStateUpdater(apiRequest.name, {
			inProgress: true,
		});
		return this.httpClient
			.get(ROOT_URL + apiRequest.url, { params: queryParams })
			.pipe(
				map((response) => {
					requestStateUpdater(apiRequest.name, {
						inProgress: false,
					});
					return response;
				}),
				catchError((error: HttpErrorResponse) => {
					requestStateUpdater(apiRequest.name, {
						inProgress: false,
						error: true,
					});
					return this.formatErrors(error);
				}),
			);
	}

	put(
		apiRequest: ApiRequest,
		body: object = {},
		requestStateUpdater: StoreRequestStateUpdater,
	): Observable<any> {
		requestStateUpdater(apiRequest.name, {
			inProgress: true,
		});
		return this.httpClient.put(ROOT_URL + apiRequest.url, body).pipe(
			map((response) => {
				requestStateUpdater(apiRequest.name, {
					inProgress: false,
				});
				return response;
			}),
			catchError((error: HttpErrorResponse) => {
				requestStateUpdater(apiRequest.name, {
					inProgress: false,
					error: true,
				});
				return this.formatErrors(error);
			}),
		);
	}

	post(
		apiRequest: ApiRequest,
		body: object = {},
		requestStateUpdater: StoreRequestStateUpdater,
		options: any = { responseType: 'json' },
	): Observable<any> {
		requestStateUpdater(apiRequest.name, {
			inProgress: true,
		});
		return this.httpClient
			.post(ROOT_URL + apiRequest.url, body, {
				responseType: options.responseType,
				params: options.params,
			})
			.pipe(
				map((response) => {
					requestStateUpdater(apiRequest.name, {
						inProgress: false,
					});
					return response;
				}),
				catchError((error: HttpErrorResponse) => {
					requestStateUpdater(apiRequest.name, {
						inProgress: false,
						error: true,
					});
					return this.formatErrors(error);
				}),
			);
	}

	delete(
		apiRequest: ApiRequest,
		requestStateUpdater: StoreRequestStateUpdater,
	): Observable<any> {
		requestStateUpdater(apiRequest.name, {
			inProgress: true,
		});
		return this.httpClient.delete(ROOT_URL + apiRequest.url).pipe(
			map((response) => {
				requestStateUpdater(apiRequest.name, {
					inProgress: false,
				});
				return response;
			}),
			catchError((error: HttpErrorResponse) => {
				requestStateUpdater(apiRequest.name, {
					inProgress: false,
					error: true,
				});
				return this.formatErrors(error);
			}),
		);
	}
}
