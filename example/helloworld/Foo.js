import { h } from '../../lib/guide-mini-vue.esm.js';

export const Foo = {
  setup(props, {emit}) {
    

    return {}
  },
  render() {
    const foo = h("p", {}, "foo")
    console.log(this.$slots)
    return h("div", {}, [foo, this.$slots])
  }
};
