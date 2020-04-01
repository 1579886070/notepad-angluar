import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  constructor() { }

  // 保存session
  setSession(key: any, value: any) {
    sessionStorage.setItem(key, JSON.stringify(value));
  }

  // 获取session
  getSession(key: any) {
    return JSON.parse(sessionStorage.getItem(key));
  }

  remove(key: any) {
    sessionStorage.removeItem(key);
  }

}
