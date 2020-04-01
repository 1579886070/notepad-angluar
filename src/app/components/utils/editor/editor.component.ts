import { Component, OnInit } from '@angular/core';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';

import { HttpService } from '../../../service/http.service';
import { SessionService } from '../../../service/session.service';
import { Router } from '@angular/router';

import { User } from '../../../class/user';
import { Article } from '../../../class/article';
import { Editor } from '../../../class/editor';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css']
})
export class EditorComponent implements OnInit {
  constructor(public http: HttpService, public router: Router, public session: SessionService) { }

  // 定义接收对象
  public user = new User();
  public article = new Article();

  public articleCategory = ['JAVA', 'Web', 'Error', 'Other'];

  public prompt: any = {
    state: false,
    msg: ''
  };

  /**
   * 全局Editor
   */
  public Editor = ClassicEditor;

  public config = new Editor().config;

  // public config = {
  //   alignment: {
  //     options: ['left', 'center', 'right']
  //   },
  //   toolbar: ['heading', '|', 'bold', 'italic', 'link', 'alignment',
  //     'bulletedList', 'numberedList', 'blockQuote', 'undo',
  //     'ckfinder', 'imageTextAlternative', 'imageUpload', 'imageStyle:full', 'imageStyle:side'
  //   ],
  //   language: 'zh-cn',
  //   fontFamily: {
  //     options: [
  //       'default',
  //       'Arial, Helvetica, sans-serif',
  //       'Courier New, Courier, monospace',
  //       'Georgia, serif',
  //       'Lucida Sans Unicode, Lucida Grande, sans-serif',
  //       'Tahoma, Geneva, sans-serif',
  //       'Times New Roman, Times, serif',
  //       'Trebuchet MS, Helvetica, sans-serif',
  //       'Verdana, Geneva, sans-serif',
  //     ]
  //   },
  //   heading: {
  //     options: [
  //       { model: 'paragraph', title: '正文', class: 'ck-heading_paragraph' },
  //       { model: 'heading1', view: 'h1', title: '标题1', class: 'ck-heading_heading1' },
  //       { model: 'heading2', view: 'h2', title: '标题2', class: 'ck-heading_heading2' },
  //       { model: 'heading3', view: 'h3', title: '标题3', class: 'ck-heading_heading3' },
  //       { model: 'heading4', view: 'h4', title: '标题4', class: 'ck-heading_heading4' },
  //     ]
  //   },
  //   ckfinder: {
  //     uploadUrl: '/ckfinder/core/connector/php/connector.php?command=QuickUpload&type=Files&responseType=json',
  //   }
  // };
  /**
   * 内容
   */
  public model = {
    editorData: ''
  };
  ngOnInit(): void {
    // 初始化时将内容设置成空，否则会显示成undefined
    this.article.content = '';
    // 判断是否登陆
    if (this.session.getSession('user') != null) {
      this.user = this.session.getSession('user');
      // this.router.navigate(['/home']);
    } else {
      this.router.navigate(['/login']);
    }
  }

  public saveData(): void {
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
      "userId": this.user.id,
      "title": this.article.title,
      "content": this.article.content,
      "category": this.article.category,
    };
    this.setContent(data);
  }

  setContent(data: any) {
    if ((this.article.title == null) || (this.article.content == null) || (this.user.id == null)) {
      this.prompt.state = true;
      this.prompt.msg = '必填参数不能为空！';
      return;
    }
    const api = 'article/push';
    this.http.axiosPost(api, data).then((response: any) => {
      if (response.data.code !== 1) {
        this.prompt.state = true;
        this.prompt.msg = response.data.msg;
        this.article.title = '';
        this.article.category = '';
        this.article.content = '';
        return;
      } else {
        this.router.navigate(['home']);
      }
    });
  }
}