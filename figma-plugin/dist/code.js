/******/ (() => { // webpackBootstrap
var __webpack_exports__ = {};
/*!*********************!*\
  !*** ./src/code.ts ***!
  \*********************/
const zoom = figma.viewport.zoom;
const w = 800;
const h = 400;
const centerX = figma.viewport.center.x - (w / zoom) / 2;
const centerY = figma.viewport.center.y - (h / zoom) / 2;
figma.showUI(__html__, {
    title: 'Всякое по редактуре',
    position: {
        x: centerX,
        y: centerY,
    },
    width: w,
    height: h,
});
figma.ui.onmessage = (msg) => {
    if (msg === 'close') {
        figma.closePlugin();
    }
};

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29kZS5qcyIsIm1hcHBpbmdzIjoiOzs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovL2ZpZ21hLXBsdWdpbi8uL3NyYy9jb2RlLnRzIl0sInNvdXJjZXNDb250ZW50IjpbImNvbnN0IHpvb20gPSBmaWdtYS52aWV3cG9ydC56b29tO1xuY29uc3QgdyA9IDgwMDtcbmNvbnN0IGggPSA0MDA7XG5jb25zdCBjZW50ZXJYID0gZmlnbWEudmlld3BvcnQuY2VudGVyLnggLSAodyAvIHpvb20pIC8gMjtcbmNvbnN0IGNlbnRlclkgPSBmaWdtYS52aWV3cG9ydC5jZW50ZXIueSAtIChoIC8gem9vbSkgLyAyO1xuZmlnbWEuc2hvd1VJKF9faHRtbF9fLCB7XG4gICAgdGl0bGU6ICfQktGB0Y/QutC+0LUg0L/QviDRgNC10LTQsNC60YLRg9GA0LUnLFxuICAgIHBvc2l0aW9uOiB7XG4gICAgICAgIHg6IGNlbnRlclgsXG4gICAgICAgIHk6IGNlbnRlclksXG4gICAgfSxcbiAgICB3aWR0aDogdyxcbiAgICBoZWlnaHQ6IGgsXG59KTtcbmZpZ21hLnVpLm9ubWVzc2FnZSA9IChtc2cpID0+IHtcbiAgICBpZiAobXNnID09PSAnY2xvc2UnKSB7XG4gICAgICAgIGZpZ21hLmNsb3NlUGx1Z2luKCk7XG4gICAgfVxufTtcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==