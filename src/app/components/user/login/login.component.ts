import { Component, OnInit } from '@angular/core';

import { HttpService } from '../../../service/http.service';
import { SessionService } from '../../../service/session.service';

import { HttpClient, HttpHeaders } from '@angular/common/http';

import { User } from '../../../class/user';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public user = new User();
  // 定义接收对象
  // public user: any = {
  //   id: '',
  //   userName: '',
  //   nickName: '',
  //   password: '',
  //   note: '',
  //   createTime: '',
  //   updateTime: '',
  // };
  public prompt: any = {
    state: false,
    msg: ''
  };

  public loginApi: any = 'user/login';

  constructor(public http: HttpService, public router: Router, public session: SessionService) { }

  ngOnInit(): void {
    if (this.session.getSession('user') != null) {
      this.user = this.session.getSession('user');
      // this.router.navigate(['/home']);
    }
  }
  login() {
    // tslint:disable-next-line: triple-equals
    if ((this.user.userName == null) || (this.user.password == null)) {
      this.prompt.state = true;
      this.prompt.msg = '参数不能为空！';
      return;
    } else {
      const data = {
        "userName": this.user.userName,
        "password": this.user.password
      };
      // 调用登陆接口
      this.http.axiosPost(this.loginApi, data).then((response: any) => {
        console.log(response.data);
        // tslint:disable-next-line: triple-equals
        if (response.data.code != 1) {
          this.prompt.state = true;
          this.prompt.msg = response.data.msg;
          this.user.userName = '';
          return;
        }
        this.user.id = response.data.data.id;
        this.user.userName = response.data.data.userName;
        this.user.nickName = response.data.data.nickName;
        this.user.password = response.data.data.password;
        this.user.note = response.data.data.note;
        this.user.createTime = response.data.data.createTime;
        this.user.updateTime = response.data.data.updateTime;
        this.session.setSession('user', this.user);
        this.router.navigate(['/home']);
      });
    }
  }
}
