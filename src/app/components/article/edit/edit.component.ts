import { Component, OnInit } from '@angular/core';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';

import { HttpService } from '../../../service/http.service';
import { SessionService } from '../../../service/session.service';
import { Router, ActivatedRoute } from '@angular/router';

import { User } from '../../../class/user';
import { Article } from '../../../class/article';
import { Editor } from '../../../class/editor';
@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  constructor(public http: HttpService, public router: Router, public session: SessionService, public activatedRoute: ActivatedRoute) { }

  // 定义接收对象
  public user = new User();
  public article = new Article();

  public articleCategory = ['JAVA', 'Web', 'Error', 'Other'];

  public Editor = ClassicEditor;

  public config = new Editor().config;

  public prompt: any = {
    state: false,
    msg: ''
  };

  ngOnInit(): void {
    // 判断是否登陆
    if (this.session.getSession('user') != null) {
      this.user = this.session.getSession('user');
      this.activatedRoute.params.subscribe((value: any) => {
        this.getDetails(value.id);
      });

      // this.router.navigate(['/home']);
    } else {
      this.router.navigate(['/login']);
    }
  }

  updateData() {
    const key1 = '</p>';
    const key2 = '&lt;';
    const key3 = '&gt;';
    const key4 = '<p>';
    const key5 = '</p>';
    this.article.content = this.article.content.replace(new RegExp(key2, 'g'), '<');
    this.article.content = this.article.content.replace(new RegExp(key3, 'g'), '>');
    this.article.content = this.article.content.replace(new RegExp(key4, 'g'), ' ');
    this.article.content = this.article.content.replace(new RegExp(key5, 'g'), ' ');
    const data = {
      "id": this.article.id,
      "userId": this.user.id,
      "title": this.article.title,
      "content": this.article.content,
      "category": this.article.category,
    };
    const api = 'article/update';
    this.http.axiosPost(api, data).then((response: any) => {
      if (response.data.code !== 1) {
        alert(response.data.msg);
        return;
      } else {
        this.router.navigate(['home']);
      }
    });
  }

  getDetails(id: number) {
    const api = 'article/byId?id=' + id;
    this.http.axiosGet(api).then((response: any) => {
      if (response.data.code === 1) {
        this.article.id = response.data.data.id;
        this.article.userId = response.data.data.userId;
        this.article.nickName = response.data.data.nickName;
        this.article.title = response.data.data.title;
        this.article.content = response.data.data.content;
        this.article.praise = response.data.data.praise;
        this.article.category = response.data.data.category;
        this.article.pageView = response.data.data.pageView;
        this.article.createTime = response.data.data.createTime;
        this.article.updateTime = response.data.data.updateTime;
      } else {
        alert(response.data.msg);
        return;
      }
    });
  }

}
