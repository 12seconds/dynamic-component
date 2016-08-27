import { DynamicComponentLoaderPage } from './app.po';

describe('dynamic-component-loader App', function() {
  let page: DynamicComponentLoaderPage;

  beforeEach(() => {
    page = new DynamicComponentLoaderPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
