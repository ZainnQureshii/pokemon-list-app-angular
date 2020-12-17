import { AppPage } from './app.po';
import { browser, logging } from 'protractor';

describe('workspace-project App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should display app name', async () => {
    await page.navigateTo('http://localhost:4200/');
    expect(page.getTitleText()).toEqual('Pokemon List App');
  });

  it('should display pokemon list', async () => {
    let css = '.main-container app-pokemon-list .list';
    let element = page.getElementByCss(css)
    expect(await browser.isElementPresent(element)).toBe(true);
  });
  
  it('should click on pokemon show more button', async (callback) => {
    let css = 'app-pokemon-list .list .row .pokemon-parent .text-block button'
    let firstElement = page.getAllElements(css).first();
    await firstElement.click()
    callback();
  });

  it('should navigate to pokemon detail page', async () => {
    let currUrl: string = await browser.getCurrentUrl()
    expect(currUrl).toContain('/pokemon/')
  });

  it('should display pokemon detail', async () => {
    let css = '.main-container app-pokemon-detail .pokemon-wrapper .pokemon';
    expect(await browser.isElementPresent(page.getElementByCss(css))).toBe(true);
  });

  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(jasmine.objectContaining({
      level: logging.Level.SEVERE,
    } as logging.Entry));
  });
});
