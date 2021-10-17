import { IEvent } from './events'


export type Key = Exclude<keyof any, symbol> 

export interface CommonStyle {
    rotate: number, 
    opacity: number
}

export interface CommonProperies {
    animation: string[],
    style: Record<Key, any>,
    isLock: boolean
}

export interface Widget {
    id: number,
    type: string,
    label: string,
    propValue?: any,
    icon: string,
    event: Array<IEvent>,
    animation?: string[],
    isLock?: boolean,
    placeholder?: string,
    title?: string,
    [key: string]: any,
    style: {
        width: number,
        height: number,
        fontSize?: number,
        fontWeight?: number,
        left: number,
        top: number,
        [key: string]: any
    }
}

export interface Group {
    left: number,
    top: number,
    width: number,
    height: number,
    borderWidth: number,
    isActive?: number
}