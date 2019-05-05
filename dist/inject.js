/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/inject/index.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/inject/decorator.ts":
/*!*********************************!*\
  !*** ./src/inject/decorator.ts ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = __webpack_require__(/*! ./index */ "./src/inject/index.ts");
function URL(host, path) {
    if (host === void 0) { host = /.*/; }
    if (path === void 0) { path = /.*/; }
    return function (target) {
        index_1.HandlerList.push({
            host: host,
            path: path,
            handler: new target(),
        });
        return target;
    };
}
exports.URL = URL;


/***/ }),

/***/ "./src/inject/index.ts":
/*!*****************************!*\
  !*** ./src/inject/index.ts ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var decorator_1 = __webpack_require__(/*! ./decorator */ "./src/inject/decorator.ts");
var util_1 = __webpack_require__(/*! ./util */ "./src/inject/util.ts");
exports.HandlerList = [];
var Test = /** @class */ (function () {
    function Test() {
    }
    Test.prototype.init = function () {
        console.log('Hello Chrome');
    };
    Test = __decorate([
        decorator_1.URL(/j/)
    ], Test);
    return Test;
}());
function start() {
    var _a = util_1.resovleURL(document.URL), host = _a.host, path = _a.path;
    for (var i = 0; i < exports.HandlerList.length; i++) {
        var handler = exports.HandlerList[i];
        var hostMatch = false;
        var pathMatch = false;
        if (typeof handler.host === "string") {
            hostMatch = host == handler.host;
        }
        else {
            hostMatch = host.match(handler.host) !== null;
        }
        if (typeof handler.path === "string") {
            pathMatch = path == handler.path;
        }
        else {
            pathMatch = path.match(handler.path) !== null;
        }
        if (hostMatch && pathMatch) {
            handler.handler.init();
        }
    }
}
start();


/***/ }),

/***/ "./src/inject/util.ts":
/*!****************************!*\
  !*** ./src/inject/util.ts ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
function resovleURL(url) {
    var temp = url.replace(/^https?:\/\//, '');
    var host = temp.replace(/\/.*$/, '');
    var path = temp.replace(/^[^\/]*/, '');
    return { host: host, path: path };
}
exports.resovleURL = resovleURL;


/***/ })

/******/ });