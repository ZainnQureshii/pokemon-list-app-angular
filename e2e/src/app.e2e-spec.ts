import { AppPage } from './app.po';
import { browser, logging } from 'protractor';

describe('workspace-project App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should display app name', async () => {
    await page.navigateTo('http://localhost:4200/');
    await browser.waitForAngular()
    expect(page.getTitleText()).toEqual('Pokemon List App');
  });

  it('should display a list of 20 pokemons', async () => {
    let css = '.main-container app-pokemon-list .list .row .pokemon-parent';
    let element = await page.getAllElements(css)
    expect(element.length).toEqual(20);    
  });
  
  it('should click on pokemon show more button', async (callback) => {
    let css = 'app-pokemon-list .list .row .pokemon-parent .text-block button'
    let firstElement = page.getAllElements(css).first();
    await firstElement.click()
    await browser.waitForAngular()
    callback();
  });

  it('should navigate to pokemon detail page', async () => {
    let currUrl: string = await browser.getCurrentUrl()
    expect(currUrl).toContain('/pokemon/')
  });

  it('should display pokemon details', async () => {
    let css = '.main-container app-pokemon-detail .pokemon-wrapper .pokemon';
    let element = await page.getElementByCss(css)
    let isPresent = await browser.isElementPresent(element)
    expect(isPresent).toBe(true);
  });

  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(jasmine.objectContaining({
      level: logging.Level.SEVERE,
    } as logging.Entry));
  });
});
