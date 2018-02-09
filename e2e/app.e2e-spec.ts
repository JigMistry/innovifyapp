import { InnovifyAppPage } from './app.po';

describe('innovify-app App', () => {
  let page: InnovifyAppPage;

  beforeEach(() => {
    page = new InnovifyAppPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
