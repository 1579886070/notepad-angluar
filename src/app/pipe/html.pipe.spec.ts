import { HtmlPipe } from './html.pipe';

describe('HtmlPipe', () => {
  it('create an instance', () => {
    const pipe = new HtmlPipe(null);
    expect(pipe).toBeTruthy();
  });
});
