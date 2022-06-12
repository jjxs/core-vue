import { createVNode } from "./vnode";
import { render } from "./render";
export function createApp(rootComponent) {
    return {
        mount(rootComponent) {
            const vnode = createVNode(rootComponent);

            render(vnode, rootComponent)
        }
    }
};
