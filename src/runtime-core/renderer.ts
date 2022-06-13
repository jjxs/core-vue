import { isObject } from "../shared/index"
import { createComponentInstance, setupComponent } from "./component"

export function render(vnode, container) {
    patch(vnode, container)
};


function patch(vnode: any, container: any) {
    
    if(typeof vnode.type === "string"){
        processElement(vnode, container)
    }else if(isObject(vnode.type)){
        processComponent(vnode, container)
    }
}

function processElement(vnode: any, container: any) {
    mountElement(vnode, container) 
}

function mountElement(vnode: any, container: any) {
    const el = document.createElement(vnode.type)
    const { props } = vnode

    for (const key in props) {
        el.setAttribute(key, props[key])
    }
    const { children } = vnode

    if(typeof children === "string"){
        el.textContent = children
    } else if (Array.isArray(children)){
        mountChildren(vnode, el);
    }
    container.append(el)
}

function mountChildren(vnode, container){
    vnode.children.forEach((v) => {
        patch(v, container)
    });
}

function processComponent(vnode: any, container: any) {
    mountComponent(vnode, container)
}

function mountComponent(vnode: any, container: any) {
    const instance = createComponentInstance(vnode)
    
    setupComponent(instance)
    setupRenderEffect(instance, container)

}

function setupRenderEffect(instance, container: any) {
    const subTree = instance.render()
    patch(subTree, container)
}




