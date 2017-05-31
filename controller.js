(function() {
  'use strict';

  class Controller {}

  window.controller = new Proxy(new Controller(), {
    set: function(target, property, value) {
      target[property] = value;
      document.dispatchEvent(new CustomEvent('modelchange', {
        detail: { property, value }
      }));
      return true;
    }
  });
})();
