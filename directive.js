'use strict';

class DirectiveRegistry {
  constructor() {
    this._directives = {};
  }

  define(name, constructor) {
    this._directives[name] = constructor;
  }

  get(name) {
    return this._directives[name];
  }
}

window.directives = new DirectiveRegistry();

class Directive {
  constructor(element) {
    this.element = element;
    this.oninit();
  }

  oninit() {}
}

window.Directive = Directive;

{
  function toKebabCase(str) {
    return str.replace(/[A-Z\u00C0-\u00D6\u00D8-\u00DE]/g, (match) =>
      '-' + match.toLowerCase()
    );
  };

  function initDirective(node, directive) {
    if (node.nodeType === Node.TEXT_NODE) {
      return;
    }

    let name = toKebabCase(directive.name);
    if (node.dataset && node.dataset[name.substring(1)]) {
      new directive(node);
    }

    let elements = node.querySelectorAll('[data' + name + ']');
    for (let i = 0; i < elements.length; i++) {
      let element = elements[i];
      new directive(element);
    }
  }

  function init(node = document) {
    if (node.target) {
      node = node.target;
    }

    let directives = window.directives._directives;
    for (let k in directives) {
      if (directives.hasOwnProperty(k)) {
        let directive = directives[k];
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

  let observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      Array.prototype.forEach.call(mutation.addedNodes, init);
    });
  });

  observer.observe(document.body, { childList: true, subtree: true });
};
