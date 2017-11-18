'use strict';

class Bind extends Directive {
  oninit() {
    let el         = this.element;
    let model      = el.dataset.bind;
    el.textContent = controller[model];

    document.addEventListener('modelchange', (e) => {
      let model = el.dataset.bind;
      if (e.detail.property === model) {
        el.textContent = e.detail.value;
      }
    });
  }
}

directives.define('bind', Bind);
