import { Component, OnInit } from '@angular/core';

import { HttpService } from '../../../service/http.service';
import { SessionService } from '../../../service/session.service';

import { Router } from '@angular/router';

import { User } from '../../../class/user';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  public user = new User();

  title = '用户注册';

  constructor(public http: HttpService, public router: Router, public session: SessionService) { }

  // public user: any = {
  //   id: '',
  //   userName: '',
  //   nickName: '',
  //   password: '',
  //   confirmPassword: '',
  //   note: '',
  //   createTime: '',
  //   updateTime: '',
  // };

  public prompt: any = {
    state: false,
    msg: ''
  };

  public registerApi: any = 'user/register';

  ngOnInit(): void {
  }

  register() {
    // tslint:disable-next-line: triple-equals
    if ((this.user.userName == null) || (this.user.password == null) || (this.user.confirmPassword == null)) {
      this.prompt.state = true;
      this.prompt.msg = '参数不能为空！';
      return;
    }
    // tslint:disable-next-line: triple-equals
    if (this.user.password != this.user.confirmPassword) {
      this.prompt.state = true;
      this.prompt.msg = '输入的密码不一致，请重新输入！';
      return;
    }

    const data = {
      "userName": this.user.userName,
      "password": this.user.password
    };
    this.http.axiosPost(this.registerApi, data).then((response: any) => {
      console.log(response.data);
      // tslint:disable-next-line: triple-equals
      if (response.data.code != 1) {
        this.prompt.state = true;
        this.prompt.msg = response.data.msg;
        this.user.userName = '';
        return;
      }
      // 注册成功
      this.router.navigate(['/login']);
    });
  }
}
