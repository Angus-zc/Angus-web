import { Key } from './componentTypes'

export enum EventTypes {
    message = "MESSAGE",
    redirect = "REDIRECT"
}

export interface IEvent {
    key: Key,
    type: EventTypes,
    label: string,
    params: any
}

export const eventList: Array<IEvent> = [
    {
        key: 0,
        type: EventTypes.message,
        label: 'Message事件',
        params: null
    }, {
        key: 1,
        type: EventTypes.redirect,
        label: '跳转事件',
        params: null
    }
]
