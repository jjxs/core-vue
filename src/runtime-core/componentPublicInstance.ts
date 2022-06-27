const publicProperiesMap = {
    $el: (i) => i.vnode.el,
}

export const PublicInstanceProxyHandlers = {
    get({_: instance}, key) {
        // setupState
        const { setupState } = instance;
        if (key in setupState){
            return setupState[key];
        }

        const publicGetter = publicProperiesMap[key];
        if (publicGetter){
            return publicGetter(instance);
        }
    }
}