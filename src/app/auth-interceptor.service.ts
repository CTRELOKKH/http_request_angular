import { HttpEventType, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { tap } from "rxjs/operators";

export class AuthInterceptorService implements HttpInterceptor{
    intercept(req: HttpRequest<any>, next: HttpHandler){
        console.log('Request intercepted')
        const modifuedReq = req.clone({headers: req.headers.append('Auth','qwerty')})
        return next.handle(modifuedReq).pipe(tap(event=>{
        //    if (event.type === HttpEventType.Response){
        //        console.log('Response body:')
        //        console.log(event.body)
        //    }
        }))
    }
}