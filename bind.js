(function() {
  'use strict';

  class Bind extends Directive {
    onInit() {
      var el         = this.element;
      var model      = el.dataset.bind;
      el.textContent = controller[model];

      document.addEventListener('modelchange', function(e) {
        var model = el.dataset.bind;
        if (e.detail.property === model) {
          el.textContent = e.detail.value;
        }
      });
    }
  }

  directives.define('bind', Bind);
})();
