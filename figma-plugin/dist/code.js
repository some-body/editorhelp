/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/common/PluginMessage.ts":
/*!*************************************!*\
  !*** ./src/common/PluginMessage.ts ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "PluginMessageType": () => (/* binding */ PluginMessageType)
/* harmony export */ });
var PluginMessageType;
(function (PluginMessageType) {
    PluginMessageType[PluginMessageType["StartPlugin"] = 0] = "StartPlugin";
})(PluginMessageType || (PluginMessageType = {}));


/***/ }),

/***/ "./src/plugin/get-selected-text-nodes.ts":
/*!***********************************************!*\
  !*** ./src/plugin/get-selected-text-nodes.ts ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getSelectedTextNodes": () => (/* binding */ getSelectedTextNodes)
/* harmony export */ });
function getSelectedTextNodes(nodes) {
    let result = [];
    nodes.forEach((node) => {
        if (isTextNode(node)) {
            result.push(node);
        }
        const children = node.children;
        if (children) {
            const subSelected = getSelectedTextNodes(children);
            result = result.concat(subSelected);
        }
    });
    return result;
}
function isTextNode(node) {
    return node.type === 'TEXT';
}


/***/ }),

/***/ "./src/plugin/show-plugin-ui.ts":
/*!**************************************!*\
  !*** ./src/plugin/show-plugin-ui.ts ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "showPluginUi": () => (/* binding */ showPluginUi)
/* harmony export */ });
function showPluginUi() {
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
}


/***/ }),

/***/ "./src/plugin/start-plugin.ts":
/*!************************************!*\
  !*** ./src/plugin/start-plugin.ts ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "startPlugin": () => (/* binding */ startPlugin)
/* harmony export */ });
/* harmony import */ var _get_selected_text_nodes__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./get-selected-text-nodes */ "./src/plugin/get-selected-text-nodes.ts");
/* harmony import */ var _common_PluginMessage__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../common/PluginMessage */ "./src/common/PluginMessage.ts");


function startPlugin() {
    const nodes = (0,_get_selected_text_nodes__WEBPACK_IMPORTED_MODULE_0__.getSelectedTextNodes)(figma.currentPage.selection);
    const nodeDtos = nodes.map((node) => ({
        nodeId: node.id,
        text: node.characters,
    }));
    const startMsg = {
        type: _common_PluginMessage__WEBPACK_IMPORTED_MODULE_1__.PluginMessageType.StartPlugin,
        selectedNodes: nodeDtos,
    };
    figma.ui.postMessage(startMsg);
}


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!*********************!*\
  !*** ./src/code.ts ***!
  \*********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _plugin_show_plugin_ui__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./plugin/show-plugin-ui */ "./src/plugin/show-plugin-ui.ts");
/* harmony import */ var _plugin_start_plugin__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./plugin/start-plugin */ "./src/plugin/start-plugin.ts");


figma.ui.onmessage = (msg) => {
    if (msg === 'close') {
        figma.closePlugin();
    }
};
(0,_plugin_show_plugin_ui__WEBPACK_IMPORTED_MODULE_0__.showPluginUi)();
(0,_plugin_start_plugin__WEBPACK_IMPORTED_MODULE_1__.startPlugin)();

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29kZS5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQUFPO0FBQ1A7QUFDQTtBQUNBLENBQUMsOENBQThDOzs7Ozs7Ozs7Ozs7Ozs7QUNIeEM7QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7QUNoQk87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsS0FBSztBQUNMOzs7Ozs7Ozs7Ozs7Ozs7OztBQ2ZpRTtBQUNMO0FBQ3JEO0FBQ1Asa0JBQWtCLDhFQUFvQjtBQUN0QztBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQSxjQUFjLGdGQUE2QjtBQUMzQztBQUNBO0FBQ0E7QUFDQTs7Ozs7OztVQ2JBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7Ozs7Ozs7Ozs7O0FDTnVEO0FBQ0g7QUFDcEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9FQUFZO0FBQ1osaUVBQVciLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9maWdtYS1wbHVnaW4vLi9zcmMvY29tbW9uL1BsdWdpbk1lc3NhZ2UudHMiLCJ3ZWJwYWNrOi8vZmlnbWEtcGx1Z2luLy4vc3JjL3BsdWdpbi9nZXQtc2VsZWN0ZWQtdGV4dC1ub2Rlcy50cyIsIndlYnBhY2s6Ly9maWdtYS1wbHVnaW4vLi9zcmMvcGx1Z2luL3Nob3ctcGx1Z2luLXVpLnRzIiwid2VicGFjazovL2ZpZ21hLXBsdWdpbi8uL3NyYy9wbHVnaW4vc3RhcnQtcGx1Z2luLnRzIiwid2VicGFjazovL2ZpZ21hLXBsdWdpbi93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9maWdtYS1wbHVnaW4vd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL2ZpZ21hLXBsdWdpbi93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL2ZpZ21hLXBsdWdpbi93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL2ZpZ21hLXBsdWdpbi8uL3NyYy9jb2RlLnRzIl0sInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCB2YXIgUGx1Z2luTWVzc2FnZVR5cGU7XG4oZnVuY3Rpb24gKFBsdWdpbk1lc3NhZ2VUeXBlKSB7XG4gICAgUGx1Z2luTWVzc2FnZVR5cGVbUGx1Z2luTWVzc2FnZVR5cGVbXCJTdGFydFBsdWdpblwiXSA9IDBdID0gXCJTdGFydFBsdWdpblwiO1xufSkoUGx1Z2luTWVzc2FnZVR5cGUgfHwgKFBsdWdpbk1lc3NhZ2VUeXBlID0ge30pKTtcbiIsImV4cG9ydCBmdW5jdGlvbiBnZXRTZWxlY3RlZFRleHROb2Rlcyhub2Rlcykge1xuICAgIGxldCByZXN1bHQgPSBbXTtcbiAgICBub2Rlcy5mb3JFYWNoKChub2RlKSA9PiB7XG4gICAgICAgIGlmIChpc1RleHROb2RlKG5vZGUpKSB7XG4gICAgICAgICAgICByZXN1bHQucHVzaChub2RlKTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBjaGlsZHJlbiA9IG5vZGUuY2hpbGRyZW47XG4gICAgICAgIGlmIChjaGlsZHJlbikge1xuICAgICAgICAgICAgY29uc3Qgc3ViU2VsZWN0ZWQgPSBnZXRTZWxlY3RlZFRleHROb2RlcyhjaGlsZHJlbik7XG4gICAgICAgICAgICByZXN1bHQgPSByZXN1bHQuY29uY2F0KHN1YlNlbGVjdGVkKTtcbiAgICAgICAgfVxuICAgIH0pO1xuICAgIHJldHVybiByZXN1bHQ7XG59XG5mdW5jdGlvbiBpc1RleHROb2RlKG5vZGUpIHtcbiAgICByZXR1cm4gbm9kZS50eXBlID09PSAnVEVYVCc7XG59XG4iLCJleHBvcnQgZnVuY3Rpb24gc2hvd1BsdWdpblVpKCkge1xuICAgIGNvbnN0IHpvb20gPSBmaWdtYS52aWV3cG9ydC56b29tO1xuICAgIGNvbnN0IHcgPSA4MDA7XG4gICAgY29uc3QgaCA9IDQwMDtcbiAgICBjb25zdCBjZW50ZXJYID0gZmlnbWEudmlld3BvcnQuY2VudGVyLnggLSAodyAvIHpvb20pIC8gMjtcbiAgICBjb25zdCBjZW50ZXJZID0gZmlnbWEudmlld3BvcnQuY2VudGVyLnkgLSAoaCAvIHpvb20pIC8gMjtcbiAgICBmaWdtYS5zaG93VUkoX19odG1sX18sIHtcbiAgICAgICAgdGl0bGU6ICfQktGB0Y/QutC+0LUg0L/QviDRgNC10LTQsNC60YLRg9GA0LUnLFxuICAgICAgICBwb3NpdGlvbjoge1xuICAgICAgICAgICAgeDogY2VudGVyWCxcbiAgICAgICAgICAgIHk6IGNlbnRlclksXG4gICAgICAgIH0sXG4gICAgICAgIHdpZHRoOiB3LFxuICAgICAgICBoZWlnaHQ6IGgsXG4gICAgfSk7XG59XG4iLCJpbXBvcnQgeyBnZXRTZWxlY3RlZFRleHROb2RlcyB9IGZyb20gXCIuL2dldC1zZWxlY3RlZC10ZXh0LW5vZGVzXCI7XG5pbXBvcnQgeyBQbHVnaW5NZXNzYWdlVHlwZSB9IGZyb20gXCIuLi9jb21tb24vUGx1Z2luTWVzc2FnZVwiO1xuZXhwb3J0IGZ1bmN0aW9uIHN0YXJ0UGx1Z2luKCkge1xuICAgIGNvbnN0IG5vZGVzID0gZ2V0U2VsZWN0ZWRUZXh0Tm9kZXMoZmlnbWEuY3VycmVudFBhZ2Uuc2VsZWN0aW9uKTtcbiAgICBjb25zdCBub2RlRHRvcyA9IG5vZGVzLm1hcCgobm9kZSkgPT4gKHtcbiAgICAgICAgbm9kZUlkOiBub2RlLmlkLFxuICAgICAgICB0ZXh0OiBub2RlLmNoYXJhY3RlcnMsXG4gICAgfSkpO1xuICAgIGNvbnN0IHN0YXJ0TXNnID0ge1xuICAgICAgICB0eXBlOiBQbHVnaW5NZXNzYWdlVHlwZS5TdGFydFBsdWdpbixcbiAgICAgICAgc2VsZWN0ZWROb2Rlczogbm9kZUR0b3MsXG4gICAgfTtcbiAgICBmaWdtYS51aS5wb3N0TWVzc2FnZShzdGFydE1zZyk7XG59XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCB7IHNob3dQbHVnaW5VaSB9IGZyb20gXCIuL3BsdWdpbi9zaG93LXBsdWdpbi11aVwiO1xuaW1wb3J0IHsgc3RhcnRQbHVnaW4gfSBmcm9tIFwiLi9wbHVnaW4vc3RhcnQtcGx1Z2luXCI7XG5maWdtYS51aS5vbm1lc3NhZ2UgPSAobXNnKSA9PiB7XG4gICAgaWYgKG1zZyA9PT0gJ2Nsb3NlJykge1xuICAgICAgICBmaWdtYS5jbG9zZVBsdWdpbigpO1xuICAgIH1cbn07XG5zaG93UGx1Z2luVWkoKTtcbnN0YXJ0UGx1Z2luKCk7XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=