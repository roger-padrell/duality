import {Component} from "./Component.ts";

class GameObject{
    name: string;
    id: string;
    components: Array<Component>;
    constructor(name:string, id:string, components:Array<Component>=[]) {
        this.name=name;
        this.id=id;
        this.components=components;
    }
}

export {GameObject};