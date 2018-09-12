import { Component, OnInit } from '@angular/core';
import { Post } from '../post.model';
import { NgForm } from '@angular/forms';
import { PostsService } from '../posts.service';
// import { EventEmitter } from "protractor";

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent implements OnInit {
  newPost = 'NO CONTENT';
  enteredContent = '';
  enteredTitle = '';

  constructor(private service: PostsService) {}

  ngOnInit(): void {}

  onAddPost(form: NgForm) {
    console.log(form);
    if (form.invalid) {
      return;
    }
    this.service.addPost(form.value.title, form.value.content);
    form.resetForm();
  }
}
