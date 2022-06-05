import { hasChanged, isObject } from "../shared";
import { trackEffects, triggerEffects, isTracking } from "./effect";
import { reactive } from "./reactive";

class RefTmpl {
    private _value :any;
    private dep;
    private _rawValue :any;
    private __v_isRef = true;
    constructor(value) {
        this._rawValue = value;
        this._value = convert(value)
        this.dep = new Set()
    }

    get value(){
        trackRefValue(this)
        return this._value
    }

    set value(newValue){
        if(hasChanged(this._rawValue, newValue)){
            this._rawValue = newValue
            this._value = convert(newValue)
            triggerEffects(this.dep)
        }
    }
}

function convert(value){
    return isObject(value) ? reactive(value) : value
}

function trackRefValue(ref){
    if(isTracking()){
        trackEffects(ref.dep)
    }
}

export function ref(value) {
    return new RefTmpl(value)
};


export function isRef(ref) {
    return !!ref.__v_isRef
};

export function unRef(ref) {
    return isRef(ref)? ref.value : ref
};

export function proxyRefs(objectWithRefs){
    return new Proxy(objectWithRefs, {
        get(target, key){
            return unRef(Reflect.get(target, key))
        },
        set(target, key, value){
            if(isRef(target[key]) && !isRef(value)){
                return target[key].value = value
            }else {
                return Reflect.set(target, key, value)
            }
        }
    })
}