import { browser, by, element, ElementFinder } from 'protractor';

export class AppPage {
  navigateTo(path): Promise<unknown> {
    return browser.get(path) as Promise<unknown>;
  }

  getTitleText(): Promise<string> {
    return element(by.css('app-root app-navigation .navigation .logo')).getText() as Promise<string>;
  }

  getElementByCss(css) {
    return element(by.css(css));
  }

  getAllElements(css) {
    return element.all(by.css(css));
  }
}
