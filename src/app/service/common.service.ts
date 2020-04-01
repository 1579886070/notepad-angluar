import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  public result: string;

  constructor() { }

  // 格式化编辑器样式，写文章直接用html
  getContent(content: string) {
    const key1 = '</p>';
    const key2 = '&lt;';
    const key3 = '&gt;';
    const key4 = '<p>';
    const key5 = '</p>';
    this.result = content.replace(new RegExp(key2, 'g'), '<');
    this.result = content.replace(new RegExp(key3, 'g'), '>');
    this.result = content.replace(new RegExp(key4, 'g'), ' ');
    this.result = content.replace(new RegExp(key5, 'g'), ' ');
    return this.result;
  }
}
