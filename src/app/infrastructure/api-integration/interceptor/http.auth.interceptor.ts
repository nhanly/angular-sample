import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
} from '@angular/common/http';
import { catchError, switchMap, delay, map, concatMap } from 'rxjs/operators';
import { Observable, throwError, BehaviorSubject, concat, of } from 'rxjs';
import { Router } from '@angular/router';
import { JwtService } from '../jwt.service';
import { environment } from 'src/environments/environment';

@Injectable()
export class HttpAuthInterceptor implements HttpInterceptor {
  private isRefreshing = false;
  private static headerAuthenticationFieldName = 'Authorization';
  private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(
    null
  );

  constructor(private router: Router, private jwtService: JwtService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    let data: any;

    return next.handle(req).pipe(
      delay(500),
      catchError((error) => {
        // TODO: handle error
        error = error.toString();

        return of(error);
      })
    );
  }

  updateNewReqByToken(token: string, oldReq: HttpRequest<any>) {
    let newreq = oldReq.clone({
      headers: oldReq.headers.set(
        HttpAuthInterceptor.headerAuthenticationFieldName,
        `Bearer ${token}`
      ),
    });
    return newreq;
  }
}
