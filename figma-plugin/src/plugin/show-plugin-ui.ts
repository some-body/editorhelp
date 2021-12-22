export function showPluginUi () {
    const zoom = figma.viewport.zoom;
    const w = 800;
    const h = 200;
    const centerX = figma.viewport.center.x - (w / zoom) / 2;
    const centerY = figma.viewport.center.y - (h / zoom) / 2;
    
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
