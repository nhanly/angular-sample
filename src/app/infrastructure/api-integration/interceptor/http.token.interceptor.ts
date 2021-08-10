import {
	HttpEvent,
	HttpHandler,
	HttpInterceptor,
	HttpRequest,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { JwtService } from '../jwt.service';

@Injectable()
export class HttpTokenInterceptor implements HttpInterceptor {
	private static headerAuthenticationFieldName = 'Authorization';

	constructor(private readonly jwtService: JwtService) {}

	intercept(
		req: HttpRequest<any>,
		next: HttpHandler,
	): Observable<HttpEvent<any>> {
		const headersConfig = {
			Accept: 'application/json',
		} as any;

		const token = this.jwtService.getToken();
		if (token) {
			headersConfig[
				HttpTokenInterceptor.headerAuthenticationFieldName
			] = `Bearer ${token}`;
		}
		const request = req.clone({ setHeaders: headersConfig });
		return next.handle(request);
	}
}
