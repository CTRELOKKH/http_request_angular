import { Component, OnDestroy, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators'
import { Post } from './post.model';
import { PostsService } from './posts.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  loadedPosts: Post[] = [];
  error = null;
  private subsciption: Subscription

  constructor(private http: HttpClient, private postsService: PostsService) {}
  ngOnDestroy(): void {
    this.subsciption.unsubscribe()
  }

  ngOnInit() {
    this.subsciption = this.postsService.error.subscribe(errorStatus => {
      this.error = errorStatus;
    })
    this.onFetchPosts()
  }


  onCreatePost(postData: Post) {
    this.error = null;
    this.postsService.createAndStorePost(postData.title, postData.content)
    this.onFetchPosts()
  }

  onFetchPosts() {
    this.error = null;
    // Send Http request
    //this.loadedPosts = 
    this.postsService.fetchPosts()
    .subscribe(response =>{
      this.loadedPosts = response
    },error =>{
      this.error = error.message
    })
  }

  onClearPosts() {
    this.error = null;
    // Send Http request
    this.postsService.deleteAllPosts().subscribe(resp=>{
      this.onFetchPosts()
    })
    
  }
}
