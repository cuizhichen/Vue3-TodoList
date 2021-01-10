import { App } from "vue";

const focus = (app: App<Element>) => {
  app.directive("focus", {
    mounted(el) {
      el.focus();
    }
  });
};

export default {
  install: (app: App<Element>) => {
    focus(app);
  }
};
