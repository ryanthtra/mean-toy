import { Component, OnInit, Input } from "@angular/core";
import { Subscription } from "rxjs";
import { Post } from "../post.model";
import { PostsService } from "../posts.service";

@Component({
  selector: "app-post-list",
  templateUrl: "./post-list.component.html",
  styleUrls: ["./post-list.component.css"]
})
export class PostListComponent implements OnInit {
  // posts = [
  //   { title: "First Post", content: "This is the first post content." },
  //   { title: "Second Post", content: "This is the second post content." },
  //   { title: "Third Post", content: "This is the third post content." }
  // ];
  @Input()
  posts: Post[] = [];
  private postsSub: Subscription;
  isLoading = false;
  constructor(private service: PostsService) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.service.getPosts();
    this.postsSub = this.service
      .getPostUpdateListener()
      .subscribe((posts: Post[]) => {
        this.isLoading = false;
        this.posts = posts;
      });
  }

  onDelete(postId: string) {
    this.service.deletePost(postId);
  }

  ngOnDestroy() {
    this.postsSub.unsubscribe();
  }
}
