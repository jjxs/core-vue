import { extend, isObject } from "@guide-mini-vue/shared"
import { track, trigger } from "./effect"
import { reactive, ReactiveFlags, readonly } from "./reactive"

const get = createGetter()
const set = createSetter()
const readOnlySet = createGetter(true)
const shallowSet = createGetter(true, true)

function createGetter(isReadonly = false, isShallow = false){
    return function get(target, key){
      if (key === ReactiveFlags.IS_REACTIVE){
        return !isReadonly;
      }else if(key === ReactiveFlags.IS_READONLY){
        return isReadonly;
      }
      
      const res = Reflect.get(target, key)

      if(isShallow) {
        return res
      }

      if(isObject(res)){
        return isReadonly? readonly(res) : reactive(res)
      }
      
      if (!isReadonly){
        // 依赖收集
        track(target, key)
      }
      return res
    }
  }
  
  function createSetter(){
    return function set(target, key, value){
      const res = Reflect.set(target, key, value)
  
      trigger(target, key)
      return res
    }
  }

  
export const mutableHanders = {
    get,
    set
}

export const readOnlyHanders = {
    get: readOnlySet,
    set(target, key: string, value) {
        console.warn(
            `key :"${String(key)}" set 失败，因为 target 是 readonly 类型`,
            target
          );
        return true
    }
}

export const shallowHanders = extend({}, readOnlyHanders, {
  get: shallowSet
})