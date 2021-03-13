import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Subject, throwError } from "rxjs";
import { map, catchError } from "rxjs/operators";
import { Post } from "./post.model";

@Injectable({providedIn: 'root'})
export class PostsService{
    error = new Subject<string>();

    constructor(private http: HttpClient){}
    createAndStorePost(title: string, content:string){
         // Send Http request
        const postData: Post = {
            title:title,
            content:content
        }
        this.http.post('https://ng-complete-guide-7756e-default-rtdb.firebaseio.com/posts.json', 
        postData,
        {
            observe: 'response'
        })
        .subscribe(response =>{
        console.log(response)
    //    this.onFetchPosts()
        }, error=>{
            this.error.next(error.status)
        })
    }
    fetchPosts() {
        return this.http
        .get<{[key: string]: Post}>('https://ng-complete-guide-7756e-default-rtdb.firebaseio.com/posts.json',
        {
            headers: new HttpHeaders({
                "Custom-Header":"Hello"
            }),
            params: new HttpParams().set('print','pretty')
        })
        .pipe(map((response)=>{
          const postsArray: Post[] = []
          for (const key in response){
            if(response.hasOwnProperty(key)){
              postsArray.push({ ...response[key], id: key })
            }
            
          }
          return postsArray
        }),
        catchError(errorRes =>{
            console.log("catched error")
            return throwError(errorRes)
        })
        )
        
    }
    
    deleteAllPosts(){
        return this.http.delete('https://ng-complete-guide-7756e-default-rtdb.firebaseio.com/posts.json')
        
    }
}
