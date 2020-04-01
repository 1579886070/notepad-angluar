import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../../service/http.service';
import { SessionService } from '../../../service/session.service';

import { Router } from '@angular/router';

import { User } from '../../../class/user';
@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit {

  constructor(public http: HttpService, public router: Router, public session: SessionService) { }


  public updateApi: any = 'user/update';
  public user = new User();

  public prompt: any = {
    state: false,
    msg: ''
  };

  ngOnInit(): void {
    // 判断是否登陆
    if (this.session.getSession('user') != null) {
      this.user = this.session.getSession('user');
      // this.router.navigate(['/home']);
    } else {
      this.prompt.state = true;
      this.prompt.msg = '未登陆，请先登陆!';
    }
  }
  update() {

    // tslint:disable-next-line: max-line-length
    if ((this.user.password == null || this.user.password === '') && (this.user.confirmPassword == null || this.user.confirmPassword === '')) {
      const data = {
        "userName": this.user.userName,
        "nickName": this.user.nickName,
        "note": this.user.note
      };
      this.updateUser(data);
    } else {
      // tslint:disable-next-line: max-line-length
      if ((this.user.password != null && this.user.password !== '') && (this.user.confirmPassword != null && this.user.confirmPassword !== '')) {
        const data = {
          "userName": this.user.userName,
          "nickName": this.user.nickName,
          "password": this.user.password,
          "confirmPassword": this.user.confirmPassword,
          "note": this.user.note
        };
        this.updateUser(data);
      } else {
        this.prompt.state = true;
        this.prompt.msg = '修改密码需要填写旧密码确认！';
        return;
      }
    }
  }

  updateUser(data: any) {
    this.http.axiosPost(this.updateApi, data).then((response: any) => {
      if (response.data.code !== 1) {
        this.prompt.state = true;
        this.prompt.msg = response.data.msg;
        return;
      } else {
        this.session.remove('user');
        alert('修改信息成功！');
        this.router.navigate(['home']);
      }

    });

  }
}
