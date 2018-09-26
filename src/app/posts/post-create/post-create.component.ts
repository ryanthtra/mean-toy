import { Component, OnInit } from "@angular/core";
import { Post } from "../post.model";
import { NgForm } from "@angular/forms";
import { PostsService } from "../posts.service";
import { ActivatedRoute, ParamMap } from "@angular/router";
// import { EventEmitter } from "protractor";

@Component({
  selector: "app-post-create",
  templateUrl: "./post-create.component.html",
  styleUrls: ["./post-create.component.css"]
})
export class PostCreateComponent implements OnInit {
  newPost = "NO CONTENT";
  enteredContent = "";
  enteredTitle = "";
  private mode = "create";
  private postId: string;
  public post: Post;

  constructor(private service: PostsService, public route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has("postId")) {
        this.mode = "edit";
        this.postId = paramMap.get("postId");
        this.service.getPost(this.postId).subscribe(postData => {
          this.post = {
            id: postData._id,
            title: postData.title,
            content: postData.content
          };
        });
      } else {
        this.mode = "create";
        this.postId = null;
      }
    });
  }

  onSavePost(form: NgForm) {
    console.log(form);
    if (form.invalid) {
      return;
    }
    if (this.mode === "create") {
      this.service.addPost(form.value.title, form.value.content);
    } else {
      this.service.updatePost(
        this.postId,
        form.value.title,
        form.value.content
      );
    }
    form.resetForm();
  }
}
