import { MutableRefObject, useRef } from "react"



export default class RefFormatter {
    private constructor() {

    }

    public static generateObjectRefs = (object: any, ignore?: string[]) => {
        let refsMap = new Map<string, MutableRefObject<any>>;

        for (let key of Object.keys(object)) {
            if (ignore?.includes(key)) { continue; }
            refsMap.set(key, useRef());
        }

        return refsMap;
    }

    public static getObjectFromRefs = (object: any, refsMap: Map<string, MutableRefObject<any>>) => {
        let result: any = {};

        for (let key of Object.keys(object)) {
            result[key] = refsMap.get(key)?.current.value;
        }
        return result;
    }

}
