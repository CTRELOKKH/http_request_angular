import { HttpEvent, HttpEventType, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { collectExternalReferences } from "@angular/compiler";
import { Observable } from "rxjs";

export class LoggingInterceptorService implements HttpInterceptor{
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        console.log("wait until login")
        return next.handle(req).pipe(tap(event=>{
            if (event.type === HttpEventType.Response){
                console.log('Incomming Response')
                console.log(event.body)
            }
        }))
    }

}