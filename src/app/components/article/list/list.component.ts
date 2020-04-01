import { Component, OnInit } from '@angular/core';

import { HttpService } from '../../../service/http.service';
import { SessionService } from '../../../service/session.service';

import { Router } from '@angular/router';

import { User } from '../../../class/user';
import { Article } from '../../../class/article';
@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  constructor(public http: HttpService, public session: SessionService, public router: Router) { }

  public start = 1;
  public limit = 5;
  public list: Article[] = new Array();

  public article = new Article();
  public user = new User();

  public articleListApi: any = 'article/list';

  ngOnInit(): void {
    // 判断是否登陆
    if (this.session.getSession('user') != null) {
      this.user = this.session.getSession('user');
      this.getList('?start=' + this.start + '&limit=' + this.limit + '&userName=' + this.user.userName);
    } else {
      this.router.navigate(['/login']);
    }
  }

  getList(parameter: any) {
    this.http.axiosGet(this.articleListApi + parameter).then((response: any) => {
      if (response.data.code === 1) {
        this.list = new Array();
        response.data.data.forEach(element => {
          const article = new Article();
          article.id = element.id;
          article.userId = element.userId;
          article.title = element.title;
          article.content = element.content;
          article.praise = element.praise;
          article.category = element.category;
          article.pageView = element.pageView;
          article.createTime = element.createTime;
          article.updateTime = element.updateTime;
          this.list.push(article);
          return;
        });
      } else {
        --this.start;
        alert(response.data.msg);
        return;
      }

    });
    return this.list;
  }
  previousPage() {
    if (this.start > 0) {
      --this.start;
    }
    this.getList('?start=' + this.start + '&limit=' + this.limit);
  }
  nextPage() {
    ++this.start;
    this.list = this.getList('?start=' + this.start + '&limit=' + this.limit);
  }

  delete(id: any) {
    this.deleteArticle(id, 1);
  }

  deleteArticle(id: number, status: number) {
    const api = 'article/delStatus';
    this.http.post(api, 'id=' + id + '&status=' + status).then((response: any) => {
      if (response.code === 1) {
        this.getList('?start=0' + '&limit=' + this.limit + '&userName=' + this.user.userName);
      } else {
        alert('系统异常，删除失败！');
      }
    });
  }
}
