class Model extends Directive {
  oninit() {
    let el            = this.element;
    let model         = el.dataset.model;
    controller[model] = el.value;

    document.addEventListener('modelchange', function(e) {
      if (e.detail.property === model) {
        el.value = e.detail.value;
      }
    });

    el.addEventListener('input', function(e) {
      controller[model] = el.value;
    });
  }
}

directives.define('model', Model);
