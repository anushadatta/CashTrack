import { Directive } from '@angular/core';
import { ShowHideDirective } from '@angular/flex-layout';

const selector = `[fxShow],
                  [fxShow.mobile], [fxShow.mobile.portrait], [fxShow.mobile.landscape],
                  [fxShow.tablet], [fxShow.tablet.portrait], [fxShow.tablet.landscape],
                  [fxShow.web], [fxShow.web.portrait], [fxShow.web.landscape],
                  [fxHide],
                  [fxHide.mobile], [fxHide.mobile.portrait], [fxHide.mobile.landscape],
                  [fxHide.tablet], [fxHide.tablet.portrait], [fxHide.tablet.landscape],
                  [fxHide.web], [fxHide.web.portrait], [fxHide.web.landscape],
                  `;

const inputs = ['fxShow',
                'fxShow.mobile', 'fxShow.mobile.portrait', 'fxShow.mobile.landscape',
                'fxShow.tablet', 'fxShow.tablet.portrait', 'fxShow.tablet.landscape',
                'fxShow.web', 'fxShow.web.portrait', 'fxShow.web.landscape',
                'fxHide',
                'fxHide.mobile', 'fxHide.mobile.portrait', 'fxHide.mobile.landscape',
                'fxHide.tablet', 'fxHide.tablet.portrait', 'fxHide.tablet.landscape',
                'fxHide.web', 'fxHide.web.portrait', 'fxHide.web.landscape'];

@Directive({selector, inputs})
export class CustomShowHideDirective extends ShowHideDirective {
  protected inputs = inputs;
}
