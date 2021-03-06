import { mutableHanders, readOnlyHanders, shallowHanders } from "./baseHanders"

export const enum ReactiveFlags {
  IS_REACTIVE = "__v_isReactive",
  IS_READONLY = "__v_isReadonly"
}

export function reactive(raw) {
  return createActiveObject(raw, mutableHanders)
}

export function readonly(raw) {
  return createActiveObject(raw, readOnlyHanders)
}

export function shallowReadonly(raw) {
  return createActiveObject(raw, shallowHanders)
}

export function isProxy(value) {
  return isReadonly(value) || isReactive(value)
}

export function isReadonly(value) {
  return !!value[ReactiveFlags.IS_READONLY] 
}

export function isReactive(value) {
  return !!value[ReactiveFlags.IS_REACTIVE]
}

function createActiveObject(raw: any, baseHanders) {
  return new Proxy(raw, baseHanders)
}

