import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, finalize, map, Observable, throwError } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { LoaderService } from '../services/loader.service';
import { ToastrService } from '../services/toastr.service';

@Injectable({
  providedIn: 'root',
})
export class AuthInterceptor implements HttpInterceptor {
  authService = inject(AuthService);
  loaderService = inject(LoaderService);
  toastrService = inject(ToastrService);
  router = inject(Router);
  private requests: HttpRequest<any>[] = [];
  private isLoadingRequired2: Boolean = false;

  constructor() {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    console.log("request :==================== ",req)
    const token = localStorage.getItem('token');
    if (token) {
      if (!this.authService.isAuthenticated() && !req.url.includes('/login')) {        
        localStorage.clear();
        this.router.navigate(['/login']);
        return throwError(() => new Error('User not authenticated'));
      }
    }    

    const modifiedRequest = req.clone({
      setHeaders: {
        Accept: '*/*',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        'ngrok-skip-browser-warning': '1',
        isloadingrequired: 'true',
      },
    });
    let headerValue = modifiedRequest.headers.get('isloadingrequired');

    this.isLoadingRequired2 = headerValue === 'true';
    if (this.isLoadingRequired2) {
      this.requests.push(modifiedRequest);
      this.loaderService.show();
    }
    return next.handle(modifiedRequest).pipe(
      map((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
          this.handleSuccess(event);
        }
        return event;
      }),
      catchError((error: HttpErrorResponse) => {
        this.handleError(error);
        return throwError(() => error);
      }),
      finalize(() => {
        this.removeRequest(modifiedRequest);
      })
    );
  }

  private handleSuccess(response: HttpResponse<any>) {
    // this.toastrService.show(response.body.message+" - "+response.status);
    console.log("handleSuccess")
    if (response.body.message) {  
      console.log("handleSuccessm inner")
       this.toastrService.show(response.body.message+" - "+response.status);
    }
    // switch (response.status) {
    //   case 200:s
    //     console.log('Request successful.');
    //     break;
    //   case 201:
    //     console.log('Record created successfully.');
    //     this.toastrService.openSnackBar('Record created successfully!');
    //     break;
    //   case 204:
    //     console.log('Record updated successfully.');
    //     this.toastrService.openSnackBar('Record updated successfully!');
    //     break;
    //   default:
    //     console.log(`Response status: ${response.status}`);
    //     break;
    // }
  }

  private handleError(error: HttpErrorResponse) { 
    this.toastrService.show(error.error.Message+" - "+error.status);
    // switch (error.status) {
    //   case 400:
    //     console.error('Bad request.');
    //     this.toastrService.openSnackBar('Bad request!', 'error');
    //     break;
    //   case 401:
    //     console.error('Unauthorized request. Redirecting to login.');
    //     this.toastrService.openSnackBar(
    //       'Unauthorized request. Redirecting to login.'
    //     );
    //     this.router.navigate(['/login']);
    //     break;
    //   case 403:
    //     console.error('Forbidden.');
    //     this.toastrService.openSnackBar('Forbidden!');
    //     break;
    //   case 404:
    //     console.error('Resource not found.', 'error');
    //     this.toastrService.openSnackBar('Bad request!', 'error');
    //     break;
    //   case 500:
    //     console.error('Internal server error.');
    //     this.toastrService.openSnackBar('Internal server error.');
    //     break;
    //   default:
    //     console.error(`Error occurred with status: ${error.status}`);
    //     this.toastrService.openSnackBar(
    //       `Error occurred with status: ${error.status}`
    //     );
    //     break;
    // }
  }

  private removeRequest(httpRequest: HttpRequest<any>) {
    let index = this.requests.indexOf(httpRequest);
    this.requests.splice(index, 1);    
    if (this.requests.length == 0) {
      this.loaderService.hide();
    }
  }
}
