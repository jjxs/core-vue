import { createVNode } from "./vnode";
import { render } from "./renderer";
export function createApp(rootComponent) {
    return {
        mount(rootComponent) {
            const vnode = createVNode(rootComponent);

            render(vnode, rootComponent)
        }
    }
};
