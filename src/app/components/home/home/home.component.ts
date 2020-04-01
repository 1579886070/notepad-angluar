import { Component, OnInit, ViewChild, Inject } from '@angular/core';

import { HttpService } from '../../../service/http.service';
import { SessionService } from '../../../service/session.service';


import { Router } from '@angular/router';

import { Article } from '../../../class/article';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(public http: HttpService, public router: Router, public session: SessionService) { }

  dataSource: any[];

  public start = 1;
  public limit = 5;
  public list: Article[] = new Array();

  public article = new Article();

  public articleListApi: any = 'article/list';

  ngOnInit(): void {
    this.getList('?start=' + this.start + '&limit=' + this.limit);
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
}

