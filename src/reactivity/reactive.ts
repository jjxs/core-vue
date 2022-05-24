import { mutableHanders, readOnlyHanders } from "./baseHanders"



export function reactive(raw) {
  return createActiveObject(raw, mutableHanders)
}

export function readonly(raw) {
  return createActiveObject(raw, readOnlyHanders)
}
function createActiveObject(raw: any, baseHanders) {
  return new Proxy(raw, baseHanders)
}

