const zoom = figma.viewport.zoom;
const w = 800;
const h = 400;
const centerX = figma.viewport.center.x - (w / zoom) / 2;
const	centerY = figma.viewport.center.y - (h / zoom) / 2;

figma.showUI(__html__, {
    title: 'Всякое по редактуре',
    position: { 
        x: centerX, 
        y: centerY,
    }, 
    width: w, 
    height: h,
});

figma.ui.onmessage = (msg: String) => {
    if (msg === 'close') {
      figma.closePlugin();
    }
};
