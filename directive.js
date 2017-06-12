(function() {
  'use strict';

  class DirectiveRegistry {
    constructor() {
      this.directives = {};
    }

    define(name, constructor) {
      this.directives[name] = constructor;
    }

    get(name) {
      return this.directives[name];
    }
  }

  window.directives = new DirectiveRegistry();

  class Directive {
    constructor(element) {
      this.element = element;
      this.onInit();
    }

    onInit() {}
  }

  window.Directive = Directive;

  String.prototype.toKebabCase = function() {
    return this.replace(/[A-Z\u00C0-\u00D6\u00D8-\u00DE]/g, function(match) {
      return '-' + match.toLowerCase();
    });
  };

  function initDirective(node, directive) {
    if (!node.querySelectorAll) {
      return;
    }

    var name = directive.name.toKebabCase();
    if (node.dataset && node.dataset[name.substring(1)]) {
      new directive(node);
    }

    var elements = node.querySelectorAll('[data' + name + ']');
    for (var i = 0; i < elements.length; i++) {
      var element = elements[i];
      new directive(element);
    }
  }

  function init(node = document) {
    if (node.target) {
      node = node.target;
    }

    var directives = window.directives.directives;
    for (var k in directives) {
      if (directives.hasOwnProperty(k)) {
        var directive = directives[k];
        initDirective(node, directive);
      }
    }
  }

  function ready(fn) {
    if (document.readyState != 'loading'){
      fn();
    } else {
      document.addEventListener('DOMContentLoaded', fn);
    }
  }

  ready(init);

  var observer = new MutationObserver(function(mutations) {
    mutations.forEach(function(mutation) {
      Array.prototype.forEach.call(mutation.addedNodes, init);
    });
  });

  observer.observe(document.body, { childList: true, subtree: true });
})();
