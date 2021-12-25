import { popupSize } from "./popup-size";

export function showPluginUi () {
    const zoom = figma.viewport.zoom;

    const w = popupSize.width;
    const h = popupSize.height;

    const centerX = figma.viewport.center.x - (w / zoom) / 2;
    
    const { bounds } = figma.viewport;

    figma.showUI(__html__, {
        title: 'Всякое по редактуре',
        position: { 
            x: centerX, 
            y: bounds.y + bounds.height,
        }, 
        width: w, 
        height: h,
    });
}
