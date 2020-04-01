import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { HttpService } from '../../../service/http.service';

import { Article } from '../../../class/article';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {

  constructor(public http: HttpService, public router: ActivatedRoute) { }

  public article = new Article();
  public list: Article[] = new Array();


  ngOnInit(): void {
    this.router.params.subscribe((value: any) => {
      this.getDetails(value.id);
    });
  }

  getDetails(id: any) {
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
