import { Key, Widget } from "./componentTypes";

export interface IWidget {
    component: any,
    config: Widget
}

declare global {
    interface Window {
        widgetCenter: Array<IWidget>
    }
}