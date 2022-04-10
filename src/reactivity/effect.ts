class ReactiveEffect {
  private _fn: any
  private deps=[]
  private active=true

  constructor(fn, public scheduler?) {
    this._fn = fn
  }

  run() {
    activeEffect = this
    return this._fn()
  }

  stop(){
    if(this.active){
      cleanEffect(this)
      this.active = false
    }
  }
}

function cleanEffect(effect) {
  activeEffect.deps.forEach((dep: any) => {
    dep.delete(effect)
  })
}

const targetMap = new Map()

export function track(target, key) {
  // target → key → dep
  let depsMap = targetMap.get(target)
  if (!depsMap) {
    depsMap = new Map()
    targetMap.set(target, depsMap)
  }

  let dep = depsMap.get(key)
  if (!dep) {
    dep = new Set()
    depsMap.set(key, dep)
  }

  if(!activeEffect) return
  dep.add(activeEffect)

  activeEffect.deps.push(dep)
}

/**
 * 触发依赖
 * @param target 
 * @param key 
 */
export function trigger(target, key) {
  let depsMap = targetMap.get(target)
  let dep = depsMap.get(key)
  for (const effect of dep) {
    if(effect.scheduler){
      effect.scheduler()
    }else {
      effect.run()
    }
  }
}

let activeEffect

/**
 * 主要负责收集依赖，更新依赖
 * @param fn 
 * @param options 
 * @returns 
 */
export function effect(fn, options: any = {}) {

  const _effect = new ReactiveEffect(fn, options.scheduler)
  _effect.run()
	// TODO
  const runner: any =  _effect.run.bind(_effect)
  runner.effect = _effect
  return runner
}



export function stop(runner) {
  runner.effect.stop()
};
