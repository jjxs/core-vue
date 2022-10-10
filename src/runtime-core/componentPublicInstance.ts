import { hasOwn } from "../shared/index";

const publicProperiesMap = {
    $el: (i) => i.vnode.el,
    // $slots
    $slots: (i) => i.slots,
    $props: (i) => i.props;
}

export const PublicInstanceProxyHandlers = {
    get({_: instance}, key) {
        const { setupState, props } = instance;
        
        if(hasOwn(setupState, key)){
            return setupState[key];
        } else if (hasOwn(props, key)){
            return props[key]
        }

        const publicGetter = publicProperiesMap[key];
        if (publicGetter){
            return publicGetter(instance);
        }
    }
}