/*! lineupjs - v1.1.1 - 2017
* https://github.com/Caleydo/lineupjs
* Copyright (c) 2017 Caleydo Team; Licensed BSD-3-Clause*/

(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("d3"), require("react"));
	else if(typeof define === 'function' && define.amd)
		define(["d3", "react"], factory);
	else if(typeof exports === 'object')
		exports["LineUpJS"] = factory(require("d3"), require("react"));
	else
		root["LineUpJS"] = factory(root["d3"], root["React"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_0__, __WEBPACK_EXTERNAL_MODULE_76__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
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
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
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
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 79);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_0__;

/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_d3__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_d3___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_d3__);
/* harmony export (immutable) */ __webpack_exports__["d"] = delayedCall;
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return AEventDispatcher; });
/* harmony export (immutable) */ __webpack_exports__["a"] = merge;
/* harmony export (immutable) */ __webpack_exports__["m"] = offset;
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return ContentScroller; });
/* unused harmony export hasDnDType */
/* unused harmony export copyDnD */
/* unused harmony export updateDropEffect */
/* harmony export (immutable) */ __webpack_exports__["l"] = dropAble;
/* harmony export (immutable) */ __webpack_exports__["h"] = attr;
/* harmony export (immutable) */ __webpack_exports__["j"] = forEach;
/* harmony export (immutable) */ __webpack_exports__["f"] = createTextHints;
/* harmony export (immutable) */ __webpack_exports__["g"] = clipText;
/* harmony export (immutable) */ __webpack_exports__["k"] = showOverlay;
/* harmony export (immutable) */ __webpack_exports__["e"] = hideOverlays;
/* harmony export (immutable) */ __webpack_exports__["i"] = matchColumns;
/**
 * Created by Samuel Gratzl on 14.08.2015.
 */
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};

/**
 * create a delayed call, can be called multiple times but only the last one at most delayed by timeToDelay will be executed
 * @param callback the callback to call
 * @param timeToDelay delay the call in milliseconds
 * @param thisCallback this argument of the callback
 * @return {function(...[any]): undefined} a function that can be called with the same interface as the callback but delayed
 */
function delayedCall(callback, timeToDelay, thisCallback) {
    if (timeToDelay === void 0) { timeToDelay = 100; }
    if (thisCallback === void 0) { thisCallback = this; }
    var tm = -1;
    return function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        if (tm >= 0) {
            clearTimeout(tm);
            tm = -1;
        }
        args.unshift(thisCallback === null ? this : thisCallback);
        tm = setTimeout(callback.bind.apply(callback, args), timeToDelay);
    };
}
/**
 * base class for event dispatching using d3 event mechanism
 */
var AEventDispatcher = (function () {
    function AEventDispatcher() {
        this.listeners = __WEBPACK_IMPORTED_MODULE_0_d3__["dispatch"].apply(void 0, this.createEventList());
        var that = this;
        this.forwarder = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            that.fire.apply(that, [this.type].concat(args));
        };
    }
    AEventDispatcher.prototype.on = function (type, listener) {
        var _this = this;
        if (arguments.length > 1) {
            if (Array.isArray(type)) {
                type.forEach(function (d) { return _this.listeners.on(d, listener); });
            }
            else {
                this.listeners.on(type, listener);
            }
            return this;
        }
        return this.listeners.on(type);
    };
    /**
     * return the list of events to be able to dispatch
     * @return {Array}
     */
    AEventDispatcher.prototype.createEventList = function () {
        return [];
    };
    AEventDispatcher.prototype.fire = function (type) {
        var _this = this;
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        var fireImpl = function (t) {
            //local context per event, set a this argument
            var context = {
                source: _this,
                type: t,
                args: args //the arguments to the listener
            };
            _this.listeners[t].apply(context, args);
        };
        if (Array.isArray(type)) {
            type.forEach(fireImpl.bind(this));
        }
        else {
            fireImpl(type);
        }
    };
    /**
     * forwards one or more events from a given dispatcher to the current one
     * i.e. when one of the given events is fired in 'from' it will be forwarded to all my listeners
     * @param from the event dispatcher to forward from
     * @param types the event types to forward
     */
    AEventDispatcher.prototype.forward = function (from) {
        var types = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            types[_i - 1] = arguments[_i];
        }
        from.on(types, this.forwarder);
    };
    /**
     * removes the forwarding declarations
     * @param from
     * @param types
     */
    AEventDispatcher.prototype.unforward = function (from) {
        var types = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            types[_i - 1] = arguments[_i];
        }
        from.on(types, null);
    };
    return AEventDispatcher;
}());

var TYPE_OBJECT = '[object Object]';
//credits to https://github.com/vladmiller/dextend/blob/master/lib/dextend.js
function merge() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    var result = null;
    for (var _a = 0, args_1 = args; _a < args_1.length; _a++) {
        var toMerge = args_1[_a];
        var keys = Object.keys(toMerge);
        if (result === null) {
            result = toMerge;
            continue;
        }
        for (var _b = 0, keys_1 = keys; _b < keys_1.length; _b++) {
            var keyName = keys_1[_b];
            var value = toMerge[keyName];
            //merge just POJOs
            if (Object.prototype.toString.call(value) === TYPE_OBJECT && (Object.getPrototypeOf(value) === Object.prototype)) {
                if (result[keyName] === undefined) {
                    result[keyName] = {};
                }
                result[keyName] = merge(result[keyName], value);
            }
            else if (Array.isArray(value)) {
                if (result[keyName] === undefined) {
                    result[keyName] = [];
                }
                result[keyName] = value.concat(result[keyName]);
            }
            else {
                result[keyName] = value;
            }
        }
    }
    return result;
}
/**
 * computes the absolute offset of the given element
 * @param element
 * @return {{left: number, top: number, width: number, height: number}}
 */
function offset(element) {
    var obj = element.getBoundingClientRect();
    return {
        left: obj.left + window.pageXOffset,
        top: obj.top + window.pageYOffset,
        width: obj.width,
        height: obj.height
    };
}
/**
 * content scroller utility
 *
 * a class for efficiently selecting a range of data items that are currently visible according to the scrolled position
 */
var ContentScroller = (function (_super) {
    __extends(ContentScroller, _super);
    /**
     *
     * @param container the container element wrapping the content with a fixed height for enforcing scrolling
     * @param content the content element to scroll
     * @param options options see attribute
     */
    function ContentScroller(container, content, options) {
        if (options === void 0) { options = {}; }
        var _this = _super.call(this) || this;
        _this.container = container;
        _this.content = content;
        _this.options = {
            /**
             * shift that should be used for calculating the top position
             */
            topShift: function () { return 0; },
            /**
             * backup rows, i.e .the number of rows that should also be shown for avoiding to frequent updates
             */
            backupRows: 5,
            /**
             * the height of one row in pixel
             */
            rowHeight: 10
        };
        _this.prevScrollTop = 0;
        _this.shift = 0;
        merge(_this.options, options);
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_d3__["select"])(container).on('scroll.scroller', function () { return _this.onScroll(); });
        //keep the previous state computing whether a redraw is needed
        _this.prevScrollTop = container.scrollTop;
        //total shift to the top
        _this.shift = offset(content).top - offset(container).top;
        return _this;
    }
    /**
     * two events are fired:
     *  * scroll when the user scrolls the container
     *  * redraw when a redraw of the content must be performed due to scrolling changes. Note due to backup rows
     *     a scrolling operation might not include a redraw
     *
     * @returns {string[]}
     */
    ContentScroller.prototype.createEventList = function () {
        return _super.prototype.createEventList.call(this).concat([ContentScroller.EVENT_REDRAW, ContentScroller.EVENT_SCROLL]);
    };
    ContentScroller.prototype.scrollIntoView = function (start, length, index, row2y) {
        var range = this.selectImpl(start, length, row2y, 0);
        if (range.from <= index && index <= range.to) {
            return; //already visible
        }
        var target = row2y(index) - 10; //magic constanst shift
        var min = 0;
        var max = this.container.scrollHeight - this.container.clientHeight;
        // clamp to valid area
        this.container.scrollTop = Math.max(min, Math.min(max, target));
    };
    /**
     * selects a range identified by start and length and the row2y position callback returning the slice to show according to the current user scrolling position
     * @param start start of the range
     * @param length length of the range
     * @param row2y lookup for computing the y position of a given row
     * @returns {{from: number, to: number}} the slide to show
     */
    ContentScroller.prototype.select = function (start, length, row2y) {
        return this.selectImpl(start, length, row2y, this.options.backupRows);
    };
    ContentScroller.prototype.selectImpl = function (start, length, row2y, backupRows) {
        var top = this.container.scrollTop - this.shift - this.options.topShift(), bottom = top + this.container.clientHeight;
        var i = 0, j;
        /*console.log(window.matchMedia('print').matches, window.matchMedia('screen').matches, top, bottom);
         if (typeof window.matchMedia === 'function' && window.matchMedia('print').matches) {
         console.log('show all');
         return [0, data.length];
         }*/
        if (top > 0) {
            i = Math.round(top / this.options.rowHeight);
            //count up till really even partial rows are visible
            while (i >= start && row2y(i + 1) > top) {
                i--;
            }
            i -= backupRows; //one more row as backup for scrolling
        }
        {
            j = Math.round(bottom / this.options.rowHeight);
            //count down till really even partial rows are visible
            while (j <= length && row2y(j - 1) < bottom) {
                j++;
            }
            j += backupRows; //one more row as backup for scrolling
        }
        return {
            from: Math.max(i, start),
            to: Math.min(j, length)
        };
    };
    ContentScroller.prototype.onScroll = function () {
        var top = this.container.scrollTop;
        var left = this.container.scrollLeft;
        //at least one row changed
        //console.log(top, left);
        this.fire(ContentScroller.EVENT_SCROLL, top, left);
        if (Math.abs(this.prevScrollTop - top) >= this.options.rowHeight * this.options.backupRows) {
            //we scrolled out of our backup rows, so we have to redraw the content
            this.prevScrollTop = top;
            this.fire(ContentScroller.EVENT_REDRAW);
        }
    };
    /**
     * removes the listeners
     */
    ContentScroller.prototype.destroy = function () {
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_d3__["select"])(this.container).on('scroll.scroller', null);
    };
    return ContentScroller;
}(AEventDispatcher));

ContentScroller.EVENT_SCROLL = 'scroll';
ContentScroller.EVENT_REDRAW = 'redraw';
/**
 * checks whether the given DragEvent has one of the given types
 */
function hasDnDType(e, typesToCheck) {
    var types = e.dataTransfer.types;
    if (typeof types.indexOf === 'function') {
        return typesToCheck.some(function (type) { return types.indexOf(type) >= 0; });
    }
    if (typeof types.includes === 'function') {
        return typesToCheck.some(function (type) { return types.includes(type); });
    }
    if (typeof types.contains === 'function') {
        return typesToCheck.some(function (type) { return types.contains(type); });
    }
    return false;
}
/**
 * should it be a copy dnd operation?
 */
function copyDnD(e) {
    var dT = e.dataTransfer;
    return (e.ctrlKey && dT.effectAllowed.match(/copy/gi) != null) || (dT.effectAllowed.match(/move/gi) == null);
}
/**
 * updates the drop effect according to the currently selected meta keys
 * @param e
 */
function updateDropEffect(e) {
    var dT = e.dataTransfer;
    if (copyDnD(e)) {
        dT.dropEffect = 'copy';
    }
    else {
        dT.dropEffect = 'move';
    }
}
/**
 * returns a d3 callable function to make an element dropable, managed the class css 'drag_over' for hovering effects
 * @param mimeTypes the mime types to be dropable
 * @param onDrop: handler when an element is dropped
 */
function dropAble(mimeTypes, onDrop) {
    return function ($node) {
        $node.on('dragenter', function () {
            var e = __WEBPACK_IMPORTED_MODULE_0_d3__["event"];
            //var xy = mouse($node.node());
            if (hasDnDType(e, mimeTypes)) {
                __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_d3__["select"])(this).classed('drag_over', true);
                //sounds good
                return false;
            }
            //not a valid mime type
            __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_d3__["select"])(this).classed('drag_over', false);
        }).on('dragover', function () {
            var e = __WEBPACK_IMPORTED_MODULE_0_d3__["event"];
            if (hasDnDType(e, mimeTypes)) {
                e.preventDefault();
                updateDropEffect(e);
                __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_d3__["select"])(this).classed('drag_over', true);
                return false;
            }
        }).on('dragleave', function () {
            //
            __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_d3__["select"])(this).classed('drag_over', false);
        }).on('drop', function (d) {
            var e = __WEBPACK_IMPORTED_MODULE_0_d3__["event"];
            e.preventDefault();
            __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_d3__["select"])(this).classed('drag_over', false);
            //var xy = mouse($node.node());
            if (hasDnDType(e, mimeTypes)) {
                var data_1 = {};
                //selects the data contained in the data transfer
                mimeTypes.forEach(function (mime) {
                    var value = e.dataTransfer.getData(mime);
                    if (value !== '') {
                        data_1[mime] = value;
                    }
                });
                return onDrop(data_1, d, copyDnD(e));
            }
        });
    };
}
/**
 * utility function to sets attributes and styles in a nodes
 * @param node
 * @param attrs
 * @param styles
 * @return {T}
 */
function attr(node, attrs, styles) {
    if (attrs === void 0) { attrs = {}; }
    if (styles === void 0) { styles = {}; }
    Object.keys(attrs).forEach(function (attr) { return node.setAttribute(attr, String(attrs[attr])); });
    Object.keys(styles).forEach(function (attr) { return node.style.setProperty(attr, styles[attr]); });
    return node;
}
/**
 * for each item matching the selector execute the callback
 * @param node
 * @param selector
 * @param callback
 */
function forEach(node, selector, callback) {
    Array.prototype.slice.call(node.querySelectorAll(selector)).forEach(callback);
}
var ellipsis = '…';
function measureFontAweSomeSpinner(ctx) {
    ctx.font = '10pt FontAwesome';
    return ctx.measureText('\uf110').width;
}
function createTextHints(ctx, font) {
    var bak = ctx.font;
    var spinnerWidth = measureFontAweSomeSpinner(ctx);
    ctx.font = font;
    var alphabet = 'abcdefghijklmnopqrstuvwxyz';
    var testText = alphabet + (alphabet.toUpperCase()) + '0123456789';
    var r = {
        maxLetterWidth: ctx.measureText('M').width,
        avgLetterWidth: ctx.measureText(testText).width / testText.length,
        ellipsisWidth: ctx.measureText(ellipsis).width,
        spinnerWidth: spinnerWidth
    };
    ctx.font = bak;
    return r;
}
function clipText(ctx, text, x, y, maxWidth, hints) {
    //based on http://stackoverflow.com/questions/10508988/html-canvas-text-overflow-ellipsis#10511598
    var render = function (t) { return ctx.fillText(t, x, y, maxWidth); };
    //check if using heuristics
    if (hints.maxLetterWidth * text.length <= maxWidth || maxWidth <= hints.ellipsisWidth || text.length === 0) {
        return render(text);
    }
    //check precisely
    if (ctx.measureText(text).width <= maxWidth) {
        return render(text);
    }
    var availWidth = maxWidth - hints.ellipsisWidth;
    // use binary search
    var min = 0;
    var max = text.length - 1;
    // guess first based on average letter width
    var guess = Math.min(max, Math.floor(maxWidth / hints.avgLetterWidth));
    while (min < max) {
        var overflow = availWidth - ctx.measureText(text.substring(0, guess + 1)).width;
        if (overflow < 0) {
            max = guess - 1;
        }
        else if (overflow > 0) {
            min = guess + 1;
        }
        else {
            break;
        }
        guess = Math.floor((max + min) / 2); //compute next guess
    }
    return render(text.substring(0, min + 1) + ellipsis);
}
function showOverlay(id, dx, dy) {
    var overlay = document.querySelector("div.lu-overlay#O" + id);
    if (!overlay) {
        overlay = document.createElement('div');
        overlay.classList.add('lu-overlay');
        overlay.id = 'O' + id;
        document.querySelector('.lu-body').appendChild(overlay);
    }
    overlay.style.display = 'block';
    overlay.style.left = dx + 'px';
    overlay.style.top = dy + 'px';
    return overlay;
}
function hideOverlays() {
    forEach(document.querySelector('div.lu-body'), 'div.lu-overlay', function (d) { return d.style.display = null; });
}
/**
 * machtes the columns and the dom nodes representing them
 * @param node
 * @param columns
 * @param helperType
 */
function matchColumns(node, columns, helperType) {
    if (helperType === void 0) { helperType = 'svg'; }
    if (node.childElementCount === 0) {
        // initial call fast method
        node.innerHTML = columns.map(function (c) { return c.renderer.template; }).join('');
        columns.forEach(function (col, i) {
            var cnode = node.childNodes[i];
            // set attribute for finding again
            cnode.setAttribute('data-column-id', col.column.id);
            // store current renderer
            cnode.setAttribute('data-renderer', col.column.getRendererType());
        });
        return;
    }
    function matches(c, i) {
        //do both match?
        var n = (node.childElementCount <= i ? null : node.childNodes[i]);
        return n != null && n.getAttribute('data-column-id') === c.column.id && n.getAttribute('data-renderer') === c.column.getRendererType();
    }
    if (columns.every(matches)) {
        return; //nothing to do
    }
    var idsAndRenderer = new Set(columns.map(function (c) { return c.column.id + '@' + c.column.getRendererType(); }));
    //remove all that are not existing anymore
    Array.prototype.slice.call(node.childNodes).forEach(function (n) {
        var id = n.getAttribute('data-column-id');
        var renderer = n.getAttribute('data-renderer');
        var idAndRenderer = id + '@' + renderer;
        if (!idsAndRenderer.has(idAndRenderer)) {
            node.removeChild(n);
        }
    });
    var helper = helperType === 'svg' ? document.createElementNS('http://www.w3.org/2000/svg', 'g') : document.createElement('div');
    columns.forEach(function (col) {
        var cnode = node.querySelector("[data-column-id=\"" + col.column.id + "\"]");
        if (!cnode) {
            //create one
            helper.innerHTML = col.renderer.template;
            cnode = helper.childNodes[0];
            cnode.setAttribute('data-column-id', col.column.id);
            cnode.setAttribute('data-renderer', col.column.getRendererType());
        }
        node.appendChild(cnode);
    });
}


/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils__ = __webpack_require__(1);
/* harmony export (immutable) */ __webpack_exports__["b"] = fixCSS;
/**
 * Created by Samuel Gratzl on 06.08.2015.
 */
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};

/**
 * converts a given id to css compatible one
 * @param id
 * @return {string|void}
 */
function fixCSS(id) {
    return id.replace(/[\s!#$%&'()*+,.\/:;<=>?@\[\\\]\^`{|}~]/g, '_'); //replace non css stuff to _
}
/**
 * a column in LineUp
 */
var Column = (function (_super) {
    __extends(Column, _super);
    function Column(id, desc) {
        var _this = _super.call(this) || this;
        _this.desc = desc;
        /**
         * width of the column
         * @type {number}
         * @private
         */
        _this.width = 100;
        /**
         * parent column of this column, set when added to a ranking or combined column
         */
        _this.parent = null;
        /**
         * whether this column is compressed i.e. just shown in a minimal version
         * @type {boolean}
         * @private
         */
        _this.compressed = false;
        _this.uid = fixCSS(id);
        _this.rendererInfo = {
            rendererType: _this.desc.rendererType || _this.desc.type,
            rendererList: []
        };
        _this.cssClass = desc.cssClass || '';
        _this.metadata = {
            label: desc.label || _this.id,
            description: desc.description || '',
            color: desc.color || (_this.cssClass !== '' ? null : Column.DEFAULT_COLOR)
        };
        return _this;
    }
    Object.defineProperty(Column.prototype, "id", {
        get: function () {
            return this.uid;
        },
        enumerable: true,
        configurable: true
    });
    Column.prototype.assignNewId = function (idGenerator) {
        this.uid = fixCSS(idGenerator());
    };
    Object.defineProperty(Column.prototype, "label", {
        get: function () {
            return this.metadata.label;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Column.prototype, "description", {
        get: function () {
            return this.metadata.description;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Column.prototype, "color", {
        get: function () {
            return this.metadata.color;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Column.prototype, "headerCssClass", {
        /**
         * return the css class to use for the header
         * @return {string}
         */
        get: function () {
            return this.desc.type;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Column.prototype, "fqid", {
        /**
         * returns the fully qualified id i.e. path the parent
         * @returns {string}
         */
        get: function () {
            return this.parent ? this.parent.fqid + '_' + this.id : this.id;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Column.prototype, "fqpath", {
        get: function () {
            return this.parent ? this.parent.fqpath + '@' + this.parent.indexOf(this) : '';
        },
        enumerable: true,
        configurable: true
    });
    /**
     * fires:
     *  * widthChanged
     *  * filterChanged
     *  * labelChanged
     *  * metaDataChanged
     *  * compressChanged
     *  * addColumn, removeColumn ... for composite pattern
     *  * dirty, dirtyHeader, dirtyValues
     * @returns {string[]}
     */
    Column.prototype.createEventList = function () {
        return _super.prototype.createEventList.call(this).concat([Column.EVENT_WIDTH_CHANGED, Column.EVENT_FILTER_CHANGED,
            Column.EVENT_LABEL_CHANGED, Column.EVENT_METADATA_CHANGED, Column.EVENT_COMPRESS_CHANGED,
            Column.EVENT_ADD_COLUMN, Column.EVENT_REMOVE_COLUMN, Column.EVENT_RENDERER_TYPE_CHANGED, Column.EVENT_SORTMETHOD_CHANGED,
            Column.EVENT_DIRTY, Column.EVENT_DIRTY_HEADER, Column.EVENT_DIRTY_VALUES]);
    };
    Column.prototype.getWidth = function () {
        return this.width;
    };
    /**
     * a column is hidden if it has no width
     * @return {boolean}
     */
    Column.prototype.isHidden = function () {
        return this.width <= 0;
    };
    Column.prototype.hide = function () {
        return this.setWidth(0);
    };
    Column.prototype.setCompressed = function (value) {
        if (this.compressed === value) {
            return;
        }
        this.fire([Column.EVENT_COMPRESS_CHANGED, Column.EVENT_DIRTY_HEADER, Column.EVENT_DIRTY_VALUES, Column.EVENT_DIRTY], this.compressed, this.compressed = value);
    };
    Column.prototype.getCompressed = function () {
        return this.compressed;
    };
    /**
     * visitor pattern for flattening the columns
     * @param r the result array
     * @param offset left offset
     * @param levelsToGo how many levels down
     * @param padding padding between columns
     * @returns {number} the used width by this column
     */
    Column.prototype.flatten = function (r, offset, levelsToGo, padding) {
        if (levelsToGo === void 0) { levelsToGo = 0; }
        if (padding === void 0) { padding = 0; }
        var w = this.compressed ? Column.COMPRESSED_WIDTH : this.getWidth();
        r.push({ col: this, offset: offset, width: w });
        return w;
    };
    Column.prototype.setWidth = function (value) {
        if (this.width === value) {
            return;
        }
        this.fire([Column.EVENT_WIDTH_CHANGED, Column.EVENT_DIRTY_HEADER, Column.EVENT_DIRTY_VALUES, Column.EVENT_DIRTY], this.width, this.width = value);
    };
    Column.prototype.setWidthImpl = function (value) {
        this.width = value;
    };
    Column.prototype.setMetaData = function (value) {
        if (value.label === this.label && this.color === value.color && this.description === value.description) {
            return;
        }
        var events = this.color === value.color ?
            [Column.EVENT_LABEL_CHANGED, Column.EVENT_METADATA_CHANGED, Column.EVENT_DIRTY_HEADER, Column.EVENT_DIRTY] :
            [Column.EVENT_LABEL_CHANGED, Column.EVENT_METADATA_CHANGED, Column.EVENT_DIRTY_HEADER, Column.EVENT_DIRTY_VALUES, Column.EVENT_DIRTY];
        var bak = this.getMetaData();
        //copy to avoid reference
        this.metadata = {
            label: value.label,
            color: value.color,
            description: value.description
        };
        this.fire(events, bak, this.getMetaData());
    };
    Column.prototype.getMetaData = function () {
        return {
            label: this.label,
            color: this.color,
            description: this.description
        };
    };
    /**
     * triggers that the ranking is sorted by this column
     * @param ascending
     * @returns {any}
     */
    Column.prototype.sortByMe = function (ascending) {
        if (ascending === void 0) { ascending = false; }
        var r = this.findMyRanker();
        if (r) {
            return r.sortBy(this, ascending);
        }
        return false;
    };
    /**
     * toggles the sorting order of this column in the ranking
     * @returns {any}
     */
    Column.prototype.toggleMySorting = function () {
        var r = this.findMyRanker();
        if (r) {
            return r.toggleSorting(this);
        }
        return false;
    };
    /**
     * removes the column from the ranking
     * @returns {boolean}
     */
    Column.prototype.removeMe = function () {
        if (this.parent) {
            return this.parent.remove(this);
        }
        return false;
    };
    /**
     * inserts the given column after itself
     * @param col
     * @returns {boolean}
     */
    Column.prototype.insertAfterMe = function (col) {
        if (this.parent) {
            return this.parent.insertAfter(col, this) != null;
        }
        return false;
    };
    /**
     * finds the underlying ranking column
     * @returns {Ranking}
     */
    Column.prototype.findMyRanker = function () {
        if (this.parent) {
            return this.parent.findMyRanker();
        }
        return null;
    };
    /**
     * dumps this column to JSON compatible format
     * @param toDescRef
     * @returns {any}
     */
    Column.prototype.dump = function (toDescRef) {
        var r = {
            id: this.id,
            desc: toDescRef(this.desc),
            width: this.width,
            compressed: this.compressed
        };
        if (this.label !== (this.desc.label || this.id)) {
            r.label = this.label;
        }
        if (this.color !== (this.desc.color || Column.DEFAULT_COLOR) && this.color) {
            r.color = this.color;
        }
        if (this.getRendererType() !== this.desc.type) {
            r.rendererType = this.getRendererType();
        }
        return r;
    };
    /**
     * restore the column content from a dump
     * @param dump
     * @param factory
     */
    Column.prototype.restore = function (dump, factory) {
        this.width = dump.width || this.width;
        this.metadata = {
            label: dump.label || this.label,
            color: dump.color || this.color,
            description: this.description
        };
        this.compressed = dump.compressed === true;
        if (dump.rendererType) {
            this.rendererInfo.rendererType = dump.rendererType;
        }
    };
    /**
     * return the label of a given row for the current column
     * @param row
     * @param index
     * @return {string}
     */
    Column.prototype.getLabel = function (row, index) {
        return '' + this.getValue(row, index);
    };
    /**
     * return the value of a given row for the current column
     * @param row
     * @param index
     */
    Column.prototype.getValue = function (row, index) {
        return ''; //no value
    };
    /**
     * compare function used to determine the order according to the values of the current column
     * @param a first element
     * @param b second element
     * @param aIndex index of the first element
     * @param bIndex index of the second element
     * @return {number}
     */
    Column.prototype.compare = function (a, b, aIndex, bIndex) {
        return 0; //can't compare
    };
    /**
     * flag whether any filter is applied
     * @return {boolean}
     */
    Column.prototype.isFiltered = function () {
        return false;
    };
    /**
     * predicate whether the current row should be included
     * @param row
     * @param index the row index
     * @return {boolean}
     */
    Column.prototype.filter = function (row, index) {
        return row !== null;
    };
    /**
     * determines the renderer type that should be used to render this column. By default the same type as the column itself
     * @return {string}
     */
    Column.prototype.getRendererType = function () {
        return this.rendererInfo.rendererType;
    };
    Column.prototype.setRendererType = function (renderer) {
        if (renderer === this.rendererInfo.rendererType) {
            // nothing changes
            return;
        }
        this.fire([Column.EVENT_RENDERER_TYPE_CHANGED, Column.EVENT_DIRTY_VALUES, Column.EVENT_DIRTY], this.rendererInfo.rendererType, this.rendererInfo.rendererType = renderer);
    };
    Column.prototype.getRendererList = function () {
        return this.rendererInfo.rendererList;
    };
    Column.prototype.setRendererList = function (rendererList) {
        this.rendererInfo.rendererList = rendererList;
    };
    /**
     * describe the column if it is a sorting criteria
     * @param toId helper to convert a description to an id
     * @return {string} json compatible
     */
    Column.prototype.toSortingDesc = function (toId) {
        return toId(this.desc);
    };
    return Column;
}(__WEBPACK_IMPORTED_MODULE_0__utils__["c" /* AEventDispatcher */]));
/* harmony default export */ __webpack_exports__["a"] = Column;
/**
 * default color that should be used
 * @type {string}
 */
Column.DEFAULT_COLOR = '#C1C1C1';
/**
 * magic variable for showing all columns
 * @type {number}
 */
Column.FLAT_ALL_COLUMNS = -1;
/**
 * width of a compressed column
 * @type {number}
 */
Column.COMPRESSED_WIDTH = 16;
Column.EVENT_WIDTH_CHANGED = 'widthChanged';
Column.EVENT_FILTER_CHANGED = 'filterChanged';
Column.EVENT_LABEL_CHANGED = 'labelChanged';
Column.EVENT_METADATA_CHANGED = 'metaDataChanged';
Column.EVENT_COMPRESS_CHANGED = 'compressChanged';
Column.EVENT_ADD_COLUMN = 'addColumn';
Column.EVENT_REMOVE_COLUMN = 'removeColumn';
Column.EVENT_DIRTY = 'dirty';
Column.EVENT_DIRTY_HEADER = 'dirtyHeader';
Column.EVENT_DIRTY_VALUES = 'dirtyValues';
Column.EVENT_RENDERER_TYPE_CHANGED = 'rendererTypeChanged';
Column.EVENT_SORTMETHOD_CHANGED = 'sortMethodChanged';


/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Column__ = __webpack_require__(2);
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * Created by sam on 04.11.2016.
 */

/**
 * a column having an accessor to get the cell value
 */
var ValueColumn = (function (_super) {
    __extends(ValueColumn, _super);
    function ValueColumn(id, desc) {
        var _this = _super.call(this, id, desc) || this;
        //find accessor
        _this.accessor = desc.accessor || (function () { return null; });
        _this.loaded = desc.lazyLoaded !== true;
        return _this;
    }
    ValueColumn.prototype.getLabel = function (row, index) {
        if (!this.isLoaded()) {
            return '';
        }
        return '' + this.getValue(row, index);
    };
    ValueColumn.prototype.getRaw = function (row, index) {
        if (!this.isLoaded()) {
            return null;
        }
        return this.accessor(row, index, this.id, this.desc, this.findMyRanker());
    };
    ValueColumn.prototype.getValue = function (row, index) {
        return this.getRaw(row, index);
    };
    ValueColumn.prototype.isLoaded = function () {
        return this.loaded;
    };
    ValueColumn.prototype.setLoaded = function (loaded) {
        if (this.loaded === loaded) {
            return;
        }
        this.fire([__WEBPACK_IMPORTED_MODULE_0__Column__["a" /* default */].EVENT_DIRTY_HEADER, __WEBPACK_IMPORTED_MODULE_0__Column__["a" /* default */].EVENT_DIRTY_VALUES, __WEBPACK_IMPORTED_MODULE_0__Column__["a" /* default */].EVENT_DIRTY], this.loaded, this.loaded = loaded);
    };
    ValueColumn.prototype.getRendererType = function () {
        if (!this.isLoaded()) {
            return ValueColumn.RENDERER_LOADING;
        }
        return _super.prototype.getRendererType.call(this);
    };
    return ValueColumn;
}(__WEBPACK_IMPORTED_MODULE_0__Column__["a" /* default */]));
/* harmony default export */ __webpack_exports__["a"] = ValueColumn;
ValueColumn.RENDERER_LOADING = 'loading';


/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_d3__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_d3___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_d3__);


var ADialog = (function () {
    function ADialog(attachment, title) {
        this.attachment = attachment;
        this.title = title;
    }
    ADialog.prototype.sortByName = function (prop) {
        return function (a, b) {
            var av = a[prop], bv = b[prop];
            if (av.toLowerCase() < bv.toLowerCase()) {
                return -1;
            }
            if (av.toLowerCase() > bv.toLowerCase()) {
                return 1;
            }
            return 0;
        };
    };
    /**
     * creates a simple popup dialog under the given attachment
     * @param attachment
     * @param title
     * @param body
     * @returns {Selection<any>}
     */
    ADialog.prototype.makePopup = function (body) {
        var pos = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utils__["m" /* offset */])(this.attachment.node());
        var $popup = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_d3__["select"])('body').append('div')
            .attr({
            'class': 'lu-popup2'
        }).style({
            left: pos.left + 'px',
            top: pos.top + 'px'
        }).html(this.dialogForm(body));
        function movePopup() {
            //.style("left", (this.parentElement.offsetLeft + (<any>event).dx) + 'px')
            //.style("top", (this.parentElement.offsetTop + event.dy) + 'px');
            //const mouse = d3.mouse(this.parentElement);
            $popup.style({
                left: (this.parentElement.offsetLeft + __WEBPACK_IMPORTED_MODULE_1_d3__["event"].dx) + 'px',
                top: (this.parentElement.offsetTop + __WEBPACK_IMPORTED_MODULE_1_d3__["event"].dy) + 'px'
            });
        }
        $popup.select('span.lu-popup-title').call(__WEBPACK_IMPORTED_MODULE_1_d3__["behavior"].drag().on('drag', movePopup));
        $popup.on('keydown', function () {
            if (__WEBPACK_IMPORTED_MODULE_1_d3__["event"].which === 27) {
                $popup.remove();
            }
        });
        var auto = $popup.select('input[autofocus]').node();
        if (auto) {
            auto.focus();
        }
        return $popup;
    };
    ADialog.prototype.makeSortPopup = function (body) {
        var pos = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utils__["m" /* offset */])(this.attachment.node());
        var $popup = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_d3__["select"])('body').append('div')
            .attr({
            'class': 'lu-popup2'
        }).style({
            left: pos.left + 'px',
            top: pos.top + 'px'
        }).html(this.sortDialogForm(body));
        return $popup;
    };
    ADialog.prototype.dialogForm = function (body, addCloseButtons) {
        if (addCloseButtons === void 0) { addCloseButtons = true; }
        return "<span style=\"font-weight: bold\" class=\"lu-popup-title\">" + this.title + "</span>\n            <form onsubmit=\"return false\">\n                " + body + "\n                " + (addCloseButtons ?
            '<button type = "submit" class="ok fa fa-check" title="ok"></button>' +
                '<button type = "reset" class="cancel fa fa-times" title="cancel">' +
                '</button><button type = "button" class="reset fa fa-undo" title="reset"></button></form>' : '') + "\n            </form>";
    };
    ADialog.prototype.sortDialogForm = function (body) {
        return this.dialogForm(body, false);
    };
    ADialog.prototype.hidePopupOnClickOutside = function (popup, rendererContent) {
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_d3__["select"])('body').on('click', function () {
            var target = __WEBPACK_IMPORTED_MODULE_1_d3__["event"].target;
            // is none of the content element clicked?
            var outside = rendererContent.filter(function () {
                return this === target;
            }).empty();
            if (outside) {
                popup.remove();
                __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_d3__["select"])(this).on('click', null);
            }
        });
    };
    return ADialog;
}());
/* harmony default export */ __webpack_exports__["a"] = ADialog;


/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_d3__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_d3___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_d3__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Column__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ValueColumn__ = __webpack_require__(3);
/* harmony export (immutable) */ __webpack_exports__["a"] = isNumberColumn;
/* harmony export (immutable) */ __webpack_exports__["c"] = numberCompare;
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return ScaleMappingFunction; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "e", function() { return ScriptMappingFunction; });
/* harmony export (immutable) */ __webpack_exports__["f"] = createMappingFunction;
/**
 * Created by sam on 04.11.2016.
 */
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};



/**
 * checks whether the given column or description is a number column, i.e. the value is a number
 * @param col
 * @returns {boolean}
 */
function isNumberColumn(col) {
    return (col instanceof __WEBPACK_IMPORTED_MODULE_1__Column__["a" /* default */] && typeof col.getNumber === 'function' || (!(col instanceof __WEBPACK_IMPORTED_MODULE_1__Column__["a" /* default */]) && col.type.match(/(number|stack|ordinal)/) != null));
}
function isMissingValue(v) {
    return typeof (v) === 'undefined' || v == null || isNaN(v) || v === '' || v === 'NA' || (typeof (v) === 'string' && (v.toLowerCase() === 'na'));
}
/**
 * save number comparison
 * @param a
 * @param b
 * @return {number}
 */
function numberCompare(a, b) {
    if (isNaN(a)) {
        return isNaN(b) ? 0 : +1;
    }
    if (isNaN(b)) {
        return -1;
    }
    return a - b;
}
function toScale(type) {
    if (type === void 0) { type = 'linear'; }
    switch (type) {
        case 'log':
            return __WEBPACK_IMPORTED_MODULE_0_d3__["scale"].log().clamp(true);
        case 'sqrt':
            return __WEBPACK_IMPORTED_MODULE_0_d3__["scale"].sqrt().clamp(true);
        case 'pow1.1':
            return __WEBPACK_IMPORTED_MODULE_0_d3__["scale"].pow().exponent(1.1).clamp(true);
        case 'pow2':
            return __WEBPACK_IMPORTED_MODULE_0_d3__["scale"].pow().exponent(2).clamp(true);
        case 'pow3':
            return __WEBPACK_IMPORTED_MODULE_0_d3__["scale"].pow().exponent(3).clamp(true);
        default:
            return __WEBPACK_IMPORTED_MODULE_0_d3__["scale"].linear().clamp(true);
    }
}
function isSame(a, b) {
    if (a.length !== b.length) {
        return false;
    }
    return a.every(function (ai, i) { return ai === b[i]; });
}
function fixDomain(domain, type) {
    if (type === 'log' && domain[0] === 0) {
        domain[0] = 0.0000001; //0 is bad
    }
    return domain;
}
/**
 * a mapping function based on a d3 scale (linear, sqrt, log)
 */
var ScaleMappingFunction = (function () {
    function ScaleMappingFunction(domain, type, range) {
        if (domain === void 0) { domain = [0, 1]; }
        if (type === void 0) { type = 'linear'; }
        if (range === void 0) { range = [0, 1]; }
        this.type = type;
        this.s = toScale(type).domain(fixDomain(domain, this.type)).range(range);
    }
    Object.defineProperty(ScaleMappingFunction.prototype, "domain", {
        get: function () {
            return this.s.domain();
        },
        set: function (domain) {
            this.s.domain(fixDomain(domain, this.type));
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ScaleMappingFunction.prototype, "range", {
        get: function () {
            return this.s.range();
        },
        set: function (range) {
            this.s.range(range);
        },
        enumerable: true,
        configurable: true
    });
    ScaleMappingFunction.prototype.apply = function (v) {
        return this.s(v);
    };
    Object.defineProperty(ScaleMappingFunction.prototype, "scaleType", {
        get: function () {
            return this.type;
        },
        enumerable: true,
        configurable: true
    });
    ScaleMappingFunction.prototype.dump = function () {
        return {
            type: this.type,
            domain: this.domain,
            range: this.range
        };
    };
    ScaleMappingFunction.prototype.eq = function (other) {
        if (!(other instanceof ScaleMappingFunction)) {
            return false;
        }
        var that = other;
        return that.type === this.type && isSame(this.domain, that.domain) && isSame(this.range, that.range);
    };
    ScaleMappingFunction.prototype.restore = function (dump) {
        this.type = dump.type;
        this.s = toScale(dump.type).domain(dump.domain).range(dump.range);
    };
    ScaleMappingFunction.prototype.clone = function () {
        return new ScaleMappingFunction(this.domain, this.type, this.range);
    };
    return ScaleMappingFunction;
}());

/**
 * a mapping function based on a custom user function using 'value' as the current value
 */
var ScriptMappingFunction = (function () {
    function ScriptMappingFunction(domain, _code) {
        if (domain === void 0) { domain = [0, 1]; }
        if (_code === void 0) { _code = 'return this.linear(value,this.value_min,this.value_max);'; }
        this.domain = domain;
        this._code = _code;
        this.f = new Function('value', _code);
    }
    Object.defineProperty(ScriptMappingFunction.prototype, "code", {
        get: function () {
            return this._code;
        },
        set: function (code) {
            if (this._code === code) {
                return;
            }
            this._code = code;
            this.f = new Function('value', code);
        },
        enumerable: true,
        configurable: true
    });
    ScriptMappingFunction.prototype.apply = function (v) {
        var min = this.domain[0], max = this.domain[this.domain.length - 1];
        var r = this.f.call({
            value_min: min,
            value_max: max,
            value_range: max - min,
            value_domain: this.domain.slice(),
            linear: function (v, mi, ma) { return (v - mi) / (ma - mi); }
        }, v);
        if (typeof r === 'number') {
            return Math.max(Math.min(r, 1), 0);
        }
        return NaN;
    };
    ScriptMappingFunction.prototype.dump = function () {
        return {
            type: 'script',
            code: this.code
        };
    };
    ScriptMappingFunction.prototype.eq = function (other) {
        if (!(other instanceof ScriptMappingFunction)) {
            return false;
        }
        var that = other;
        return that.code === this.code;
    };
    ScriptMappingFunction.prototype.restore = function (dump) {
        this.code = dump.code;
    };
    ScriptMappingFunction.prototype.clone = function () {
        return new ScriptMappingFunction(this.domain, this.code);
    };
    return ScriptMappingFunction;
}());

function createMappingFunction(dump) {
    if (dump.type === 'script') {
        var s = new ScriptMappingFunction();
        s.restore(dump);
        return s;
    }
    else {
        var l = new ScaleMappingFunction();
        l.restore(dump);
        return l;
    }
}
/**
 * a number column mapped from an original input scale to an output range
 */
var NumberColumn = (function (_super) {
    __extends(NumberColumn, _super);
    function NumberColumn(id, desc) {
        var _this = _super.call(this, id, desc) || this;
        _this.missingValue = 0;
        /**
         * currently active filter
         * @type {{min: number, max: number}}
         * @private
         */
        _this.currentFilter = NumberColumn.noFilter();
        _this.numberFormat = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_d3__["format"])('.3n');
        if (desc.map) {
            _this.mapping = createMappingFunction(desc.map);
        }
        else if (desc.domain) {
            _this.mapping = new ScaleMappingFunction(desc.domain, 'linear', desc.range || [0, 1]);
        }
        _this.original = _this.mapping.clone();
        if (desc.numberFormat) {
            _this.numberFormat = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_d3__["format"])(desc.numberFormat);
        }
        var rendererList = [{ type: 'number', label: 'Bar' },
            { type: 'circle', label: 'Circle' }];
        _this.setRendererList(rendererList);
        return _this;
    }
    NumberColumn.prototype.dump = function (toDescRef) {
        var r = _super.prototype.dump.call(this, toDescRef);
        r.map = this.mapping.dump();
        r.filter = this.currentFilter;
        r.missingValue = this.missingValue;
        return r;
    };
    NumberColumn.prototype.restore = function (dump, factory) {
        _super.prototype.restore.call(this, dump, factory);
        if (dump.map) {
            this.mapping = createMappingFunction(dump.map);
        }
        else if (dump.domain) {
            this.mapping = new ScaleMappingFunction(dump.domain, 'linear', dump.range || [0, 1]);
        }
        if (dump.currentFilter) {
            this.currentFilter = dump.currentFilter;
        }
        if (dump.missingValue) {
            this.missingValue = dump.missingValue;
        }
        if (dump.numberFormat) {
            this.numberFormat = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_d3__["format"])(dump.numberFormat);
        }
    };
    NumberColumn.prototype.createEventList = function () {
        return _super.prototype.createEventList.call(this).concat([NumberColumn.EVENT_MAPPING_CHANGED]);
    };
    NumberColumn.prototype.getLabel = function (row, index) {
        if (this.desc.numberFormat) {
            var raw = this.getRawValue(row, index);
            //if a dedicated format and a number use the formatter in any case
            if (isNaN(raw)) {
                return 'NaN';
            }
            return this.numberFormat(raw);
        }
        var v = _super.prototype.getValue.call(this, row, index);
        //keep non number if it is not a number else convert using formatter
        if (typeof v === 'number') {
            return this.numberFormat(+v);
        }
        return String(v);
    };
    NumberColumn.prototype.getRawValue = function (row, index) {
        var v = _super.prototype.getValue.call(this, row, index);
        if (isMissingValue(v)) {
            return this.missingValue;
        }
        return +v;
    };
    NumberColumn.prototype.getValue = function (row, index) {
        var v = this.getRawValue(row, index);
        if (isNaN(v)) {
            return v;
        }
        return this.mapping.apply(v);
    };
    NumberColumn.prototype.getNumber = function (row, index) {
        return this.getValue(row, index);
    };
    NumberColumn.prototype.compare = function (a, b, aIndex, bIndex) {
        return numberCompare(this.getValue(a, aIndex), this.getValue(b, bIndex));
    };
    NumberColumn.prototype.getOriginalMapping = function () {
        return this.original.clone();
    };
    NumberColumn.prototype.getMapping = function () {
        return this.mapping.clone();
    };
    NumberColumn.prototype.setMapping = function (mapping) {
        if (this.mapping.eq(mapping)) {
            return;
        }
        this.fire([NumberColumn.EVENT_MAPPING_CHANGED, __WEBPACK_IMPORTED_MODULE_1__Column__["a" /* default */].EVENT_DIRTY_VALUES, __WEBPACK_IMPORTED_MODULE_1__Column__["a" /* default */].EVENT_DIRTY], this.mapping.clone(), this.mapping = mapping);
    };
    NumberColumn.prototype.isFiltered = function () {
        return this.currentFilter.filterMissing || isFinite(this.currentFilter.min) || isFinite(this.currentFilter.max);
    };
    Object.defineProperty(NumberColumn.prototype, "filterMin", {
        get: function () {
            return this.currentFilter.min;
        },
        set: function (min) {
            var bak = this.getFilter();
            this.currentFilter.min = isNaN(min) ? -Infinity : min;
            this.fire([__WEBPACK_IMPORTED_MODULE_1__Column__["a" /* default */].EVENT_FILTER_CHANGED, __WEBPACK_IMPORTED_MODULE_1__Column__["a" /* default */].EVENT_DIRTY_VALUES, __WEBPACK_IMPORTED_MODULE_1__Column__["a" /* default */].EVENT_DIRTY], bak, this.getFilter());
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NumberColumn.prototype, "filterMax", {
        get: function () {
            return this.currentFilter.max;
        },
        set: function (max) {
            var bak = this.getFilter();
            this.currentFilter.max = isNaN(max) ? Infinity : max;
            this.fire([__WEBPACK_IMPORTED_MODULE_1__Column__["a" /* default */].EVENT_FILTER_CHANGED, __WEBPACK_IMPORTED_MODULE_1__Column__["a" /* default */].EVENT_DIRTY_VALUES, __WEBPACK_IMPORTED_MODULE_1__Column__["a" /* default */].EVENT_DIRTY], bak, this.getFilter());
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NumberColumn.prototype, "filterMissing", {
        get: function () {
            return this.currentFilter.filterMissing;
        },
        set: function (filterMissing) {
            var bak = this.getFilter();
            this.currentFilter.filterMissing = filterMissing;
            this.fire([__WEBPACK_IMPORTED_MODULE_1__Column__["a" /* default */].EVENT_FILTER_CHANGED, __WEBPACK_IMPORTED_MODULE_1__Column__["a" /* default */].EVENT_DIRTY_VALUES, __WEBPACK_IMPORTED_MODULE_1__Column__["a" /* default */].EVENT_DIRTY], bak, this.getFilter());
        },
        enumerable: true,
        configurable: true
    });
    NumberColumn.prototype.getFilter = function () {
        return {
            min: this.currentFilter.min,
            max: this.currentFilter.max,
            filterMissing: this.currentFilter.filterMissing
        };
    };
    NumberColumn.prototype.setFilter = function (value) {
        if (value === void 0) { value = { min: -Infinity, max: +Infinity, filterMissing: false }; }
        if (this.currentFilter.min === value.min && this.currentFilter.max === value.max && this.currentFilter.filterMissing === value.filterMissing) {
            return;
        }
        var bak = this.getFilter();
        this.currentFilter.min = isNaN(value.min) ? -Infinity : value.min;
        this.currentFilter.max = isNaN(value.max) ? Infinity : value.max;
        this.currentFilter.filterMissing = value.filterMissing;
        this.fire([__WEBPACK_IMPORTED_MODULE_1__Column__["a" /* default */].EVENT_FILTER_CHANGED, __WEBPACK_IMPORTED_MODULE_1__Column__["a" /* default */].EVENT_DIRTY_VALUES, __WEBPACK_IMPORTED_MODULE_1__Column__["a" /* default */].EVENT_DIRTY], bak, this.getFilter());
    };
    /**
     * filter the current row if any filter is set
     * @param row
     * @param index row index
     * @returns {boolean}
     */
    NumberColumn.prototype.filter = function (row, index) {
        if (!this.isFiltered()) {
            return true;
        }
        var v = _super.prototype.getValue.call(this, row, index);
        if (isMissingValue(v)) {
            return !this.filterMissing;
        }
        var vn = +v;
        return !((isFinite(this.currentFilter.min) && vn < this.currentFilter.min) || (isFinite(this.currentFilter.max) && vn > this.currentFilter.max));
    };
    NumberColumn.prototype.getRendererType = function () {
        if (this.getCompressed()) {
            return NumberColumn.COMPRESSED_RENDERER;
        }
        return _super.prototype.getRendererType.call(this);
    };
    return NumberColumn;
}(__WEBPACK_IMPORTED_MODULE_2__ValueColumn__["a" /* default */]));
/* harmony default export */ __webpack_exports__["b"] = NumberColumn;
NumberColumn.EVENT_MAPPING_CHANGED = 'mappingChanged';
NumberColumn.COMPRESSED_RENDERER = 'heatmap';
NumberColumn.noFilter = function () { return ({ min: -Infinity, max: Infinity, filterMissing: false }); };


/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Column__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ValueColumn__ = __webpack_require__(3);
/**
 * Created by sam on 04.11.2016.
 */
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};


/**
 * a string column with optional alignment
 */
var StringColumn = (function (_super) {
    __extends(StringColumn, _super);
    function StringColumn(id, desc) {
        var _this = _super.call(this, id, desc) || this;
        _this.currentFilter = null;
        _this._alignment = 'left';
        _this.setWidthImpl(200); //by default 200
        _this._alignment = desc.alignment || 'left';
        return _this;
    }
    Object.defineProperty(StringColumn.prototype, "alignment", {
        //readonly
        get: function () {
            return this._alignment;
        },
        enumerable: true,
        configurable: true
    });
    StringColumn.prototype.getValue = function (row, index) {
        var v = _super.prototype.getValue.call(this, row, index);
        if (typeof (v) === 'undefined' || v == null) {
            return '';
        }
        return String(v);
    };
    StringColumn.prototype.dump = function (toDescRef) {
        var r = _super.prototype.dump.call(this, toDescRef);
        if (this.currentFilter instanceof RegExp) {
            r.filter = 'REGEX:' + this.currentFilter.source;
        }
        else {
            r.filter = this.currentFilter;
        }
        r.alignment = this.alignment;
        return r;
    };
    StringColumn.prototype.restore = function (dump, factory) {
        _super.prototype.restore.call(this, dump, factory);
        if (dump.filter && dump.filter.slice(0, 6) === 'REGEX:') {
            this.currentFilter = new RegExp(dump.filter.slice(6));
        }
        else {
            this.currentFilter = dump.filter || null;
        }
        this._alignment = dump.alignment || this._alignment;
    };
    StringColumn.prototype.isFiltered = function () {
        return this.currentFilter != null;
    };
    StringColumn.prototype.filter = function (row, index) {
        if (!this.isFiltered()) {
            return true;
        }
        var r = this.getLabel(row, index), filter = this.currentFilter;
        if (filter === StringColumn.FILTER_MISSING) {
            return r != null && r.trim() !== '';
        }
        if (typeof filter === 'string' && filter.length > 0) {
            return r && r.toLowerCase().indexOf(filter.toLowerCase()) >= 0;
        }
        if (filter instanceof RegExp) {
            return r && filter.test(r);
        }
        return true;
    };
    StringColumn.prototype.getFilter = function () {
        return this.currentFilter;
    };
    StringColumn.prototype.setFilter = function (filter) {
        if (filter === '') {
            filter = null;
        }
        if (this.currentFilter === filter) {
            return;
        }
        this.fire([__WEBPACK_IMPORTED_MODULE_0__Column__["a" /* default */].EVENT_FILTER_CHANGED, __WEBPACK_IMPORTED_MODULE_0__Column__["a" /* default */].EVENT_DIRTY_VALUES, __WEBPACK_IMPORTED_MODULE_0__Column__["a" /* default */].EVENT_DIRTY], this.currentFilter, this.currentFilter = filter);
    };
    StringColumn.prototype.compare = function (a, b, aIndex, bIndex) {
        var aValue, bValue;
        if ((aValue = this.getValue(a, aIndex)) === '') {
            return this.getValue(b, bIndex) === '' ? 0 : +1; //same = 0
        }
        else if ((bValue = this.getValue(b, bIndex)) === '') {
            return -1;
        }
        return aValue.localeCompare(bValue);
    };
    return StringColumn;
}(__WEBPACK_IMPORTED_MODULE_1__ValueColumn__["a" /* default */]));
/* harmony default export */ __webpack_exports__["a"] = StringColumn;
//magic key for filtering missing ones
StringColumn.FILTER_MISSING = '__FILTER_MISSING';


/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__BarCellRenderer__ = __webpack_require__(56);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__DefaultCellRenderer__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__StringCellRenderer__ = __webpack_require__(68);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__SelectionRenderer__ = __webpack_require__(64);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__LinkCellRenderer__ = __webpack_require__(61);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__AnnotationRenderer__ = __webpack_require__(55);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ActionRenderer__ = __webpack_require__(54);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__StackCellRenderer__ = __webpack_require__(67);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__CategoricalCellRenderer__ = __webpack_require__(58);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__MultiValueCellRenderer__ = __webpack_require__(63);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__SparklineCellRenderer__ = __webpack_require__(66);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__VerticalBarCellRenderer__ = __webpack_require__(70);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__SetCellRenderer__ = __webpack_require__(65);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__CircleCellRenderer__ = __webpack_require__(59);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__BoxplotCellRenderer__ = __webpack_require__(57);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__LoadingCellRenderer__ = __webpack_require__(62);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__ThresholdCellRenderer__ = __webpack_require__(69);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__Heatmap__ = __webpack_require__(60);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "defaultCellRenderer", function() { return defaultCellRenderer; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "renderers", function() { return renderers; });
/* harmony export (immutable) */ __webpack_exports__["createSVG"] = createSVG;
/* harmony export (immutable) */ __webpack_exports__["createHTML"] = createHTML;
/* harmony export (immutable) */ __webpack_exports__["createCanvas"] = createCanvas;
/**
 * Created by Samuel Gratzl on 14.08.2015.
 */


















var defaultCellRenderer = new __WEBPACK_IMPORTED_MODULE_1__DefaultCellRenderer__["a" /* DefaultCellRenderer */]();
var combineCellRenderer = new __WEBPACK_IMPORTED_MODULE_0__BarCellRenderer__["a" /* default */](false, function (d, i, col) { return col.getColor(d, i); });
/**
 * default render factories
 */
var renderers = {
    rank: new __WEBPACK_IMPORTED_MODULE_1__DefaultCellRenderer__["a" /* DefaultCellRenderer */]('rank', 'right'),
    boolean: new __WEBPACK_IMPORTED_MODULE_1__DefaultCellRenderer__["a" /* DefaultCellRenderer */]('boolean', 'center'),
    number: new __WEBPACK_IMPORTED_MODULE_0__BarCellRenderer__["a" /* default */](),
    ordinal: new __WEBPACK_IMPORTED_MODULE_0__BarCellRenderer__["a" /* default */](true, function (d, i, col) { return col.getColor(d, i); }),
    string: new __WEBPACK_IMPORTED_MODULE_2__StringCellRenderer__["a" /* default */](),
    selection: new __WEBPACK_IMPORTED_MODULE_3__SelectionRenderer__["a" /* default */](),
    heatmap: new __WEBPACK_IMPORTED_MODULE_17__Heatmap__["a" /* default */](),
    link: new __WEBPACK_IMPORTED_MODULE_4__LinkCellRenderer__["a" /* default */](),
    annotate: new __WEBPACK_IMPORTED_MODULE_5__AnnotationRenderer__["a" /* default */](),
    actions: new __WEBPACK_IMPORTED_MODULE_6__ActionRenderer__["a" /* default */](),
    stack: new __WEBPACK_IMPORTED_MODULE_7__StackCellRenderer__["a" /* default */](),
    nested: new __WEBPACK_IMPORTED_MODULE_7__StackCellRenderer__["a" /* default */](false),
    categorical: new __WEBPACK_IMPORTED_MODULE_8__CategoricalCellRenderer__["a" /* default */](),
    max: combineCellRenderer,
    min: combineCellRenderer,
    mean: combineCellRenderer,
    script: combineCellRenderer,
    multiValue: new __WEBPACK_IMPORTED_MODULE_9__MultiValueCellRenderer__["a" /* default */](),
    threshold: new __WEBPACK_IMPORTED_MODULE_16__ThresholdCellRenderer__["a" /* default */](),
    sparkline: new __WEBPACK_IMPORTED_MODULE_10__SparklineCellRenderer__["a" /* default */](),
    verticalbar: new __WEBPACK_IMPORTED_MODULE_11__VerticalBarCellRenderer__["a" /* default */](),
    set: new __WEBPACK_IMPORTED_MODULE_12__SetCellRenderer__["a" /* default */](),
    circle: new __WEBPACK_IMPORTED_MODULE_13__CircleCellRenderer__["a" /* default */](),
    boxplot: new __WEBPACK_IMPORTED_MODULE_14__BoxplotCellRenderer__["a" /* default */](),
    loading: new __WEBPACK_IMPORTED_MODULE_15__LoadingCellRenderer__["a" /* default */]()
};
function chooseRenderer(col, renderers) {
    var r = renderers[col.getRendererType()];
    return r || defaultCellRenderer;
}
function createSVG(col, renderers, context) {
    var r = chooseRenderer(col, renderers);
    return (r.createSVG ? r.createSVG.bind(r) : defaultCellRenderer.createSVG.bind(r))(col, context);
}
function createHTML(col, renderers, context) {
    var r = chooseRenderer(col, renderers);
    return (r.createHTML ? r.createHTML.bind(r) : defaultCellRenderer.createHTML.bind(r))(col, context);
}
function createCanvas(col, renderers, context) {
    var r = chooseRenderer(col, renderers);
    return (r.createCanvas ? r.createCanvas.bind(r) : defaultCellRenderer.createCanvas.bind(r))(col, context);
}


/***/ }),
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__model__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__model_Ranking__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__model_RankColumn__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__utils__ = __webpack_require__(1);
/**
 * Created by Samuel Gratzl on 14.08.2015.
 */
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};




/**
 * a basic data provider holding the data and rankings
 */
var ADataProvider = (function (_super) {
    __extends(ADataProvider, _super);
    function ADataProvider(options) {
        if (options === void 0) { options = {}; }
        var _this = _super.call(this) || this;
        /**
         * all rankings
         * @type {Array}
         * @private
         */
        _this.rankings = [];
        /**
         * the current selected indices
         * @type {Set}
         */
        _this.selection = new Set();
        _this.uid = 0;
        _this.createHelper = function (d) {
            //factory method for restoring a column
            var desc = _this.fromDescRef(d.desc);
            var c = null;
            if (desc && desc.type) {
                _this.fixDesc(d.desc);
                var type = _this.columnTypes[desc.type];
                c = new type(d.id, desc);
                c.restore(d, _this.createHelper);
            }
            return c;
        };
        _this.columnTypes = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__utils__["a" /* merge */])(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__model__["models"])(), options.columnTypes || {});
        _this.multiSelections = options.multiSelection !== false;
        return _this;
    }
    /**
     * events:
     *  * column changes: addColumn, removeColumn
     *  * ranking changes: addRanking, removeRanking
     *  * dirty: dirty, dirtyHeder, dirtyValues
     *  * selectionChanged
     * @returns {string[]}
     */
    ADataProvider.prototype.createEventList = function () {
        return _super.prototype.createEventList.call(this).concat([
            ADataProvider.EVENT_ADD_COLUMN, ADataProvider.EVENT_REMOVE_COLUMN,
            ADataProvider.EVENT_ADD_RANKING, ADataProvider.EVENT_REMOVE_RANKING,
            ADataProvider.EVENT_DIRTY, ADataProvider.EVENT_DIRTY_HEADER, ADataProvider.EVENT_DIRTY_VALUES,
            ADataProvider.EVENT_ORDER_CHANGED, ADataProvider.EVENT_SELECTION_CHANGED, ADataProvider.EVENT_ADD_DESC,
            ADataProvider.EVENT_JUMP_TO_NEAREST
        ]);
    };
    /**
     * adds a new ranking
     * @param existing an optional existing ranking to clone
     * @return the new ranking
     */
    ADataProvider.prototype.pushRanking = function (existing) {
        var r = this.cloneRanking(existing);
        this.insertRanking(r);
        return r;
    };
    ADataProvider.prototype.takeSnapshot = function (col) {
        var r = this.cloneRanking();
        r.push(this.clone(col));
        this.insertRanking(r);
        return r;
    };
    ADataProvider.prototype.insertRanking = function (r, index) {
        if (index === void 0) { index = this.rankings.length; }
        this.rankings.splice(index, 0, r);
        this.forward(r, __WEBPACK_IMPORTED_MODULE_1__model_Ranking__["a" /* default */].EVENT_ADD_COLUMN + '.provider', __WEBPACK_IMPORTED_MODULE_1__model_Ranking__["a" /* default */].EVENT_REMOVE_COLUMN + '.provider', __WEBPACK_IMPORTED_MODULE_1__model_Ranking__["a" /* default */].EVENT_DIRTY + '.provider', __WEBPACK_IMPORTED_MODULE_1__model_Ranking__["a" /* default */].EVENT_DIRTY_HEADER + '.provider', __WEBPACK_IMPORTED_MODULE_1__model_Ranking__["a" /* default */].EVENT_ORDER_CHANGED + '.provider', __WEBPACK_IMPORTED_MODULE_1__model_Ranking__["a" /* default */].EVENT_DIRTY_VALUES + '.provider');
        var that = this;
        //delayed reordering per ranking
        r.on(__WEBPACK_IMPORTED_MODULE_1__model_Ranking__["a" /* default */].EVENT_DIRTY_ORDER + '.provider', __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__utils__["d" /* delayedCall */])(function () {
            that.triggerReorder(this.source);
        }, 100, null));
        this.fire([ADataProvider.EVENT_ADD_RANKING, ADataProvider.EVENT_DIRTY_HEADER, ADataProvider.EVENT_DIRTY_VALUES, ADataProvider.EVENT_DIRTY], r, index);
        this.triggerReorder(r);
    };
    ADataProvider.prototype.triggerReorder = function (ranking) {
        this.sort(ranking).then(function (order) { return ranking.setOrder(order); });
    };
    /**
     * removes a ranking from this data provider
     * @param ranking
     * @returns {boolean}
     */
    ADataProvider.prototype.removeRanking = function (ranking) {
        var i = this.rankings.indexOf(ranking);
        if (i < 0) {
            return false;
        }
        this.unforward(ranking, __WEBPACK_IMPORTED_MODULE_1__model_Ranking__["a" /* default */].EVENT_ADD_COLUMN + '.provider', __WEBPACK_IMPORTED_MODULE_1__model_Ranking__["a" /* default */].EVENT_REMOVE_COLUMN + '.provider', __WEBPACK_IMPORTED_MODULE_1__model_Ranking__["a" /* default */].EVENT_DIRTY + '.provider', __WEBPACK_IMPORTED_MODULE_1__model_Ranking__["a" /* default */].EVENT_DIRTY_HEADER + '.provider', __WEBPACK_IMPORTED_MODULE_1__model_Ranking__["a" /* default */].EVENT_ORDER_CHANGED + '.provider', __WEBPACK_IMPORTED_MODULE_1__model_Ranking__["a" /* default */].EVENT_DIRTY_VALUES + '.provider');
        this.rankings.splice(i, 1);
        ranking.on(__WEBPACK_IMPORTED_MODULE_1__model_Ranking__["a" /* default */].EVENT_DIRTY_ORDER + '.provider', null);
        this.cleanUpRanking(ranking);
        this.fire([ADataProvider.EVENT_REMOVE_RANKING, ADataProvider.EVENT_DIRTY_HEADER, ADataProvider.EVENT_DIRTY_VALUES, ADataProvider.EVENT_DIRTY], ranking, i);
        return true;
    };
    /**
     * removes all rankings
     */
    ADataProvider.prototype.clearRankings = function () {
        var _this = this;
        this.rankings.forEach(function (ranking) {
            _this.unforward(ranking, __WEBPACK_IMPORTED_MODULE_1__model_Ranking__["a" /* default */].EVENT_ADD_COLUMN + '.provider', __WEBPACK_IMPORTED_MODULE_1__model_Ranking__["a" /* default */].EVENT_REMOVE_COLUMN + '.provider', __WEBPACK_IMPORTED_MODULE_1__model_Ranking__["a" /* default */].EVENT_DIRTY + '.provider', __WEBPACK_IMPORTED_MODULE_1__model_Ranking__["a" /* default */].EVENT_DIRTY_HEADER + '.provider', __WEBPACK_IMPORTED_MODULE_1__model_Ranking__["a" /* default */].EVENT_ORDER_CHANGED + '.provider', __WEBPACK_IMPORTED_MODULE_1__model_Ranking__["a" /* default */].EVENT_DIRTY_VALUES + '.provider');
            ranking.on(__WEBPACK_IMPORTED_MODULE_1__model_Ranking__["a" /* default */].EVENT_DIRTY_ORDER + '.provider', null);
            _this.cleanUpRanking(ranking);
        });
        this.rankings = [];
        this.fire([ADataProvider.EVENT_REMOVE_RANKING, ADataProvider.EVENT_DIRTY_HEADER, ADataProvider.EVENT_DIRTY_VALUES, ADataProvider.EVENT_DIRTY], null);
    };
    /**
     * returns a list of all current rankings
     * @returns {Ranking[]}
     */
    ADataProvider.prototype.getRankings = function () {
        return this.rankings.slice();
    };
    /**
     * returns the last ranking for quicker access
     * @returns {Ranking}
     */
    ADataProvider.prototype.getLastRanking = function () {
        return this.rankings[this.rankings.length - 1];
    };
    /**
     * hook method for cleaning up a ranking
     * @param ranking
     */
    ADataProvider.prototype.cleanUpRanking = function (ranking) {
        //nothing to do
    };
    /**
     * adds a column to a ranking described by its column description
     * @param ranking the ranking to add the column to
     * @param desc the description of the column
     * @return {Column} the newly created column or null
     */
    ADataProvider.prototype.push = function (ranking, desc) {
        var r = this.create(desc);
        if (r) {
            ranking.push(r);
            return r;
        }
        return null;
    };
    /**
     * adds a column to a ranking described by its column description
     * @param ranking the ranking to add the column to
     * @param index the position to insert the column
     * @param desc the description of the column
     * @return {Column} the newly created column or null
     */
    ADataProvider.prototype.insert = function (ranking, index, desc) {
        var r = this.create(desc);
        if (r) {
            ranking.insert(r, index);
            return r;
        }
        return null;
    };
    /**
     * creates a new unique id for a column
     * @returns {string}
     */
    ADataProvider.prototype.nextId = function () {
        return 'col' + (this.uid++);
    };
    ADataProvider.prototype.fixDesc = function (desc) {
        var _this = this;
        //hacks for provider dependent descriptors
        if (desc.type === 'rank') {
            desc.accessor = this.rankAccessor.bind(this);
        }
        else if (desc.type === 'selection') {
            desc.accessor = function (row, index) { return _this.isSelected(index); };
            desc.setter = function (row, index, value) { return value ? _this.select(index) : _this.deselect(index); };
        }
    };
    /**
     * creates an internal column model out of the given column description
     * @param desc
     * @returns {Column] the new column or null if it can't be created
     */
    ADataProvider.prototype.create = function (desc) {
        this.fixDesc(desc);
        //find by type and instantiate
        var type = this.columnTypes[desc.type];
        if (type) {
            return new type(this.nextId(), desc);
        }
        return null;
    };
    /**
     * clones a column by dumping and restoring
     * @param col
     * @returns {Column}
     */
    ADataProvider.prototype.clone = function (col) {
        var dump = this.dumpColumn(col);
        return this.restoreColumn(dump);
    };
    /**
     * restores a column from a dump
     * @param dump
     * @returns {Column}
     */
    ADataProvider.prototype.restoreColumn = function (dump) {
        var _this = this;
        var create = function (d) {
            var desc = _this.fromDescRef(d.desc);
            var type = _this.columnTypes[desc.type];
            _this.fixDesc(desc);
            var c = new type('', desc);
            c.restore(d, create);
            c.assignNewId(_this.nextId.bind(_this));
            return c;
        };
        return create(dump);
    };
    /**
     * finds a column in all rankings returning the first match
     * @param idOrFilter by id or by a filter function
     * @returns {Column}
     */
    ADataProvider.prototype.find = function (idOrFilter) {
        //convert to function
        var filter = typeof (idOrFilter) === 'string' ? function (col) { return col.id === idOrFilter; } : idOrFilter;
        for (var _i = 0, _a = this.rankings; _i < _a.length; _i++) {
            var ranking = _a[_i];
            var r = ranking.find(filter);
            if (r) {
                return r;
            }
        }
        return null;
    };
    /**
     * dumps this whole provider including selection and the rankings
     * @returns {{uid: number, selection: number[], rankings: *[]}}
     */
    ADataProvider.prototype.dump = function () {
        var _this = this;
        return {
            uid: this.uid,
            selection: this.getSelection(),
            rankings: this.rankings.map(function (r) { return r.dump(_this.toDescRef); })
        };
    };
    /**
     * dumps a specific column
     */
    ADataProvider.prototype.dumpColumn = function (col) {
        return col.dump(this.toDescRef);
    };
    /**
     * for better dumping describe reference, by default just return the description
     */
    ADataProvider.prototype.toDescRef = function (desc) {
        return desc;
    };
    /**
     * inverse operation of toDescRef
     */
    ADataProvider.prototype.fromDescRef = function (descRef) {
        return descRef;
    };
    ADataProvider.prototype.restoreRanking = function (dump) {
        var ranking = this.cloneRanking();
        ranking.restore(dump, this.createHelper);
        //if no rank column add one
        if (!ranking.children.some(function (d) { return d instanceof __WEBPACK_IMPORTED_MODULE_2__model_RankColumn__["a" /* default */]; })) {
            ranking.insert(this.create(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__model__["createRankDesc"])()), 0);
        }
        var idGenerator = this.nextId.bind(this);
        ranking.children.forEach(function (c) { return c.assignNewId(idGenerator); });
        return ranking;
    };
    ADataProvider.prototype.restore = function (dump) {
        var _this = this;
        //clean old
        this.clearRankings();
        //restore selection
        this.uid = dump.uid || 0;
        if (dump.selection) {
            dump.selection.forEach(function (s) { return _this.selection.add(s); });
        }
        //restore rankings
        if (dump.rankings) {
            dump.rankings.forEach(function (r) {
                var ranking = _this.cloneRanking();
                ranking.restore(r, _this.createHelper);
                //if no rank column add one
                if (!ranking.children.some(function (d) { return d instanceof __WEBPACK_IMPORTED_MODULE_2__model_RankColumn__["a" /* default */]; })) {
                    ranking.insert(_this.create(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__model__["createRankDesc"])()), 0);
                }
                _this.insertRanking(ranking);
            });
        }
        if (dump.layout) {
            Object.keys(dump.layout).forEach(function (key) {
                _this.deriveRanking(dump.layout[key]);
            });
        }
        //assign new ids
        var idGenerator = this.nextId.bind(this);
        this.rankings.forEach(function (r) {
            r.children.forEach(function (c) { return c.assignNewId(idGenerator); });
        });
    };
    /**
     * generates a default ranking by using all column descriptions ones
     */
    ADataProvider.prototype.deriveDefault = function () {
        var _this = this;
        if (this.rankings.length > 0) {
            //no default if we have a ranking
            return;
        }
        var r = this.pushRanking();
        this.getColumns().forEach(function (col) {
            if (!__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__model__["isSupportType"])(col)) {
                _this.push(r, col);
            }
        });
    };
    /**
     * derives a ranking from an old layout bundle format
     * @param bundle
     */
    ADataProvider.prototype.deriveRanking = function (bundle) {
        var _this = this;
        var ranking = this.cloneRanking();
        ranking.clear();
        var toCol = function (column) {
            switch (column.type) {
                case 'rank':
                    return _this.create(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__model__["createRankDesc"])());
                case 'selection':
                    return _this.create(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__model__["createSelectionDesc"])());
                case 'actions':
                    var actions = _this.create(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__model__["createActionDesc"])(column.label || 'actions'));
                    actions.restore(column, null);
                    return actions;
                case 'stacked':
                    //create a stacked one
                    var stacked_1 = _this.create(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__model__["createStackDesc"])(column.label || 'Combined'));
                    (column.children || []).forEach(function (col) {
                        var c = toCol(col);
                        if (c) {
                            stacked_1.push(c);
                        }
                    });
                    return stacked_1;
                default: {
                    var desc = _this.findDesc(column.column);
                    if (desc) {
                        var r = _this.create(desc);
                        column.label = column.label || desc.label || desc.column;
                        r.restore(column, null);
                        return r;
                    }
                    return null;
                }
            }
        };
        bundle.forEach(function (column) {
            var col = toCol(column);
            if (col) {
                ranking.push(col);
            }
        });
        //if no rank column add one
        if (!ranking.children.some(function (d) { return d instanceof __WEBPACK_IMPORTED_MODULE_2__model_RankColumn__["a" /* default */]; })) {
            ranking.insert(this.create(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__model__["createRankDesc"])()), 0);
        }
        this.insertRanking(ranking);
        return ranking;
    };
    /**
     * is the given row selected
     * @param index
     * @return {boolean}
     */
    ADataProvider.prototype.isSelected = function (index) {
        return this.selection.has(index);
    };
    /**
     * also select the given row
     * @param index
     */
    ADataProvider.prototype.select = function (index) {
        if (this.selection.has(index)) {
            return; //no change
        }
        if (!this.multiSelections && this.selection.size > 0) {
            this.selection = new Set();
        }
        this.selection.add(index);
        this.fire(ADataProvider.EVENT_SELECTION_CHANGED, this.getSelection());
    };
    ADataProvider.prototype.jumpToNearest = function (indices) {
        if (indices.length === 0) {
            return;
        }
        this.fire(ADataProvider.EVENT_JUMP_TO_NEAREST, indices);
    };
    /**
     * also select all the given rows
     * @param indices
     */
    ADataProvider.prototype.selectAll = function (indices) {
        var _this = this;
        if (indices.every(function (i) { return _this.selection.has(i); })) {
            return; //no change
        }
        if (!this.multiSelections) {
            this.selection = new Set();
            indices = indices.slice(0, 1); //just the first one
        }
        indices.forEach(function (index) {
            _this.selection.add(index);
        });
        this.fire(ADataProvider.EVENT_SELECTION_CHANGED, this.getSelection());
    };
    /**
     * set the selection to the given rows
     * @param indices
     */
    ADataProvider.prototype.setSelection = function (indices) {
        var _this = this;
        if (this.selection.size === indices.length && indices.every(function (i) { return _this.selection.has(i); })) {
            return; //no change
        }
        this.selection = new Set();
        this.selectAll(indices);
    };
    /**
     * toggles the selection of the given data index
     * @param index
     * @param additional just this element or all
     * @returns {boolean} whether the index is currently selected
     */
    ADataProvider.prototype.toggleSelection = function (index, additional) {
        if (additional === void 0) { additional = false; }
        if (this.isSelected(index)) {
            if (additional) {
                this.deselect(index);
            }
            else {
                this.clearSelection();
            }
            return false;
        }
        else {
            if (additional) {
                this.select(index);
            }
            else {
                this.setSelection([index]);
            }
            return true;
        }
    };
    /**
     * deselect the given row
     * @param index
     */
    ADataProvider.prototype.deselect = function (index) {
        if (!this.selection.has(index)) {
            return; //no change
        }
        this.selection.delete(index);
        this.fire(ADataProvider.EVENT_SELECTION_CHANGED, this.getSelection());
    };
    /**
     * returns a promise containing the selected rows
     * @return {Promise<any[]>}
     */
    ADataProvider.prototype.selectedRows = function () {
        if (this.selection.size === 0) {
            return Promise.resolve([]);
        }
        return this.view(this.getSelection());
    };
    /**
     * returns the currently selected indices
     * @returns {Array}
     */
    ADataProvider.prototype.getSelection = function () {
        var indices = [];
        this.selection.forEach(function (s) { return indices.push(s); });
        indices.sort();
        return indices;
    };
    /**
     * clears the selection
     */
    ADataProvider.prototype.clearSelection = function () {
        if (this.selection.size === 0) {
            return; //no change
        }
        this.selection = new Set();
        this.fire(ADataProvider.EVENT_SELECTION_CHANGED, [], false);
    };
    /**
     * utility to export a ranking to a table with the given separator
     * @param ranking
     * @param options
     * @returns {Promise<string>}
     */
    ADataProvider.prototype.exportTable = function (ranking, options) {
        if (options === void 0) { options = {}; }
        options = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__utils__["a" /* merge */])({
            separator: '\t',
            newline: '\n',
            header: true,
            quote: false,
            quoteChar: '"',
            filter: function (c) { return !__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__model__["isSupportType"])(c); }
        }, options);
        //optionally quote not numbers
        function quote(l, c) {
            if (options.quote && (!c || !__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__model__["isNumberColumn"])(c))) {
                return options.quoteChar + l + options.quoteChar;
            }
            return l;
        }
        var columns = ranking.flatColumns.filter(function (c) { return options.filter(c.desc); });
        var order = ranking.getOrder();
        return this.view(order).then(function (data) {
            var r = [];
            if (options.header) {
                r.push(columns.map(function (d) { return quote(d.label); }).join(options.separator));
            }
            data.forEach(function (row, i) {
                r.push(columns.map(function (c) { return quote(c.getLabel(row, order[i]), c); }).join(options.separator));
            });
            return r.join(options.newline);
        });
    };
    return ADataProvider;
}(__WEBPACK_IMPORTED_MODULE_3__utils__["c" /* AEventDispatcher */]));
ADataProvider.EVENT_SELECTION_CHANGED = 'selectionChanged';
ADataProvider.EVENT_ADD_COLUMN = __WEBPACK_IMPORTED_MODULE_1__model_Ranking__["a" /* default */].EVENT_ADD_COLUMN;
ADataProvider.EVENT_REMOVE_COLUMN = __WEBPACK_IMPORTED_MODULE_1__model_Ranking__["a" /* default */].EVENT_REMOVE_COLUMN;
ADataProvider.EVENT_ADD_RANKING = 'addRanking';
ADataProvider.EVENT_REMOVE_RANKING = 'removeRanking';
ADataProvider.EVENT_DIRTY = __WEBPACK_IMPORTED_MODULE_1__model_Ranking__["a" /* default */].EVENT_DIRTY;
ADataProvider.EVENT_DIRTY_HEADER = __WEBPACK_IMPORTED_MODULE_1__model_Ranking__["a" /* default */].EVENT_DIRTY_HEADER;
ADataProvider.EVENT_DIRTY_VALUES = __WEBPACK_IMPORTED_MODULE_1__model_Ranking__["a" /* default */].EVENT_DIRTY_VALUES;
ADataProvider.EVENT_ORDER_CHANGED = __WEBPACK_IMPORTED_MODULE_1__model_Ranking__["a" /* default */].EVENT_ORDER_CHANGED;
ADataProvider.EVENT_ADD_DESC = 'addDesc';
ADataProvider.EVENT_JUMP_TO_NEAREST = 'jumpToNearest';
/* harmony default export */ __webpack_exports__["a"] = ADataProvider;


/***/ }),
/* 9 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ADialog__ = __webpack_require__(4);
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};

var AFilterDialog = (function (_super) {
    __extends(AFilterDialog, _super);
    function AFilterDialog(column, attachment, title) {
        var _this = _super.call(this, attachment, title) || this;
        _this.column = column;
        return _this;
    }
    AFilterDialog.prototype.markFiltered = function (filtered) {
        if (filtered === void 0) { filtered = false; }
        this.attachment.classed('filtered', filtered);
    };
    return AFilterDialog;
}(__WEBPACK_IMPORTED_MODULE_0__ADialog__["a" /* default */]));
/* harmony default export */ __webpack_exports__["a"] = AFilterDialog;


/***/ }),
/* 10 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Column__ = __webpack_require__(2);
/* harmony export (immutable) */ __webpack_exports__["a"] = isMultiLevelColumn;
/**
 * Created by sam on 04.11.2016.
 */
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};

function isMultiLevelColumn(col) {
    return typeof (col.getCollapsed) === 'function';
}
/**
 * implementation of a combine column, standard operations how to select
 */
var CompositeColumn = (function (_super) {
    __extends(CompositeColumn, _super);
    function CompositeColumn(id, desc) {
        var _this = _super.call(this, id, desc) || this;
        _this._children = [];
        return _this;
    }
    CompositeColumn.prototype.assignNewId = function (idGenerator) {
        _super.prototype.assignNewId.call(this, idGenerator);
        this._children.forEach(function (c) { return c.assignNewId(idGenerator); });
    };
    Object.defineProperty(CompositeColumn.prototype, "children", {
        get: function () {
            return this._children.slice();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CompositeColumn.prototype, "length", {
        get: function () {
            return this._children.length;
        },
        enumerable: true,
        configurable: true
    });
    CompositeColumn.prototype.flatten = function (r, offset, levelsToGo, padding) {
        if (levelsToGo === void 0) { levelsToGo = 0; }
        if (padding === void 0) { padding = 0; }
        var w = 0;
        //no more levels or just this one
        if (levelsToGo === 0 || levelsToGo <= __WEBPACK_IMPORTED_MODULE_0__Column__["a" /* default */].FLAT_ALL_COLUMNS) {
            w = this.getCompressed() ? __WEBPACK_IMPORTED_MODULE_0__Column__["a" /* default */].COMPRESSED_WIDTH : this.getWidth();
            r.push({ col: this, offset: offset, width: w });
            if (levelsToGo === 0) {
                return w;
            }
        }
        //push children
        this._children.forEach(function (c) {
            if (!c.isHidden() || levelsToGo <= __WEBPACK_IMPORTED_MODULE_0__Column__["a" /* default */].FLAT_ALL_COLUMNS) {
                c.flatten(r, offset, levelsToGo - 1, padding);
            }
        });
        return w;
    };
    CompositeColumn.prototype.dump = function (toDescRef) {
        var r = _super.prototype.dump.call(this, toDescRef);
        r.children = this._children.map(function (d) { return d.dump(toDescRef); });
        return r;
    };
    CompositeColumn.prototype.restore = function (dump, factory) {
        var _this = this;
        dump.children.map(function (child) {
            var c = factory(child);
            if (c) {
                _this.push(c);
            }
        });
        _super.prototype.restore.call(this, dump, factory);
    };
    /**
     * inserts a column at a the given position
     * @param col
     * @param index
     * @returns {any}
     */
    CompositeColumn.prototype.insert = function (col, index) {
        this._children.splice(index, 0, col);
        //listen and propagate events
        return this.insertImpl(col, index);
    };
    CompositeColumn.prototype.insertImpl = function (col, index) {
        col.parent = this;
        this.forward(col, __WEBPACK_IMPORTED_MODULE_0__Column__["a" /* default */].EVENT_DIRTY_HEADER + '.combine', __WEBPACK_IMPORTED_MODULE_0__Column__["a" /* default */].EVENT_DIRTY_VALUES + '.combine', __WEBPACK_IMPORTED_MODULE_0__Column__["a" /* default */].EVENT_DIRTY + '.combine', __WEBPACK_IMPORTED_MODULE_0__Column__["a" /* default */].EVENT_FILTER_CHANGED + '.combine');
        this.fire([__WEBPACK_IMPORTED_MODULE_0__Column__["a" /* default */].EVENT_ADD_COLUMN, __WEBPACK_IMPORTED_MODULE_0__Column__["a" /* default */].EVENT_DIRTY_HEADER, __WEBPACK_IMPORTED_MODULE_0__Column__["a" /* default */].EVENT_DIRTY_VALUES, __WEBPACK_IMPORTED_MODULE_0__Column__["a" /* default */].EVENT_DIRTY], col, index);
        return col;
    };
    CompositeColumn.prototype.push = function (col) {
        return this.insert(col, this._children.length);
    };
    CompositeColumn.prototype.at = function (index) {
        return this._children[index];
    };
    CompositeColumn.prototype.indexOf = function (col) {
        return this._children.indexOf(col);
    };
    CompositeColumn.prototype.insertAfter = function (col, ref) {
        var i = this.indexOf(ref);
        if (i < 0) {
            return null;
        }
        return this.insert(col, i + 1);
    };
    CompositeColumn.prototype.remove = function (child) {
        var i = this._children.indexOf(child);
        if (i < 0) {
            return false;
        }
        this._children.splice(i, 1); //remove and deregister listeners
        return this.removeImpl(child);
    };
    CompositeColumn.prototype.removeImpl = function (child) {
        child.parent = null;
        this.unforward(child, __WEBPACK_IMPORTED_MODULE_0__Column__["a" /* default */].EVENT_DIRTY_HEADER + '.combine', __WEBPACK_IMPORTED_MODULE_0__Column__["a" /* default */].EVENT_DIRTY_VALUES + '.combine', __WEBPACK_IMPORTED_MODULE_0__Column__["a" /* default */].EVENT_DIRTY + '.combine', __WEBPACK_IMPORTED_MODULE_0__Column__["a" /* default */].EVENT_FILTER_CHANGED + '.combine');
        this.fire([__WEBPACK_IMPORTED_MODULE_0__Column__["a" /* default */].EVENT_REMOVE_COLUMN, __WEBPACK_IMPORTED_MODULE_0__Column__["a" /* default */].EVENT_DIRTY_HEADER, __WEBPACK_IMPORTED_MODULE_0__Column__["a" /* default */].EVENT_DIRTY_VALUES, __WEBPACK_IMPORTED_MODULE_0__Column__["a" /* default */].EVENT_DIRTY], child);
        return true;
    };
    CompositeColumn.prototype.getColor = function (row, index) {
        return this.color;
    };
    CompositeColumn.prototype.isFiltered = function () {
        return this._children.some(function (d) { return d.isFiltered(); });
    };
    CompositeColumn.prototype.filter = function (row, index) {
        return this._children.every(function (d) { return d.filter(row, index); });
    };
    /**
     * describe the column if it is a sorting criteria
     * @param toId helper to convert a description to an id
     * @return {string} json compatible
     */
    CompositeColumn.prototype.toSortingDesc = function (toId) {
        return this._children.map(function (c) { return c.toSortingDesc(toId); });
    };
    return CompositeColumn;
}(__WEBPACK_IMPORTED_MODULE_0__Column__["a" /* default */]));
/* harmony default export */ __webpack_exports__["b"] = CompositeColumn;


/***/ }),
/* 11 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_d3__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_d3___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_d3__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__CompositeColumn__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__NumberColumn__ = __webpack_require__(5);
/**
 * Created by sam on 04.11.2016.
 */
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};



/**
 * implementation of a combine column, standard operations how to select
 */
var CompositeNumberColumn = (function (_super) {
    __extends(CompositeNumberColumn, _super);
    function CompositeNumberColumn(id, desc) {
        var _this = _super.call(this, id, desc) || this;
        _this.missingValue = 0;
        _this.numberFormat = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_d3__["format"])('.3n');
        if (desc.numberFormat) {
            _this.numberFormat = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_d3__["format"])(desc.numberFormat);
        }
        return _this;
    }
    CompositeNumberColumn.prototype.dump = function (toDescRef) {
        var r = _super.prototype.dump.call(this, toDescRef);
        r.missingValue = this.missingValue;
        return r;
    };
    CompositeNumberColumn.prototype.restore = function (dump, factory) {
        if (dump.missingValue) {
            this.missingValue = dump.missingValue;
        }
        if (dump.numberFormat) {
            this.numberFormat = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_d3__["format"])(dump.numberFormat);
        }
        _super.prototype.restore.call(this, dump, factory);
    };
    /**
     * inserts a column at a the given position
     * @param col
     * @param index
     * @returns {any}
     */
    CompositeNumberColumn.prototype.insert = function (col, index) {
        if (!__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__NumberColumn__["a" /* isNumberColumn */])(col)) {
            return null;
        }
        return _super.prototype.insert.call(this, col, index);
    };
    CompositeNumberColumn.prototype.getLabel = function (row, index) {
        if (!this.isLoaded()) {
            return '';
        }
        var v = this.getValue(row, index);
        //keep non number if it is not a number else convert using formatter
        return '' + (typeof v === 'number' ? this.numberFormat(v) : v);
    };
    CompositeNumberColumn.prototype.getValue = function (row, index) {
        if (!this.isLoaded()) {
            return null;
        }
        //weighted sum
        var v = this.compute(row, index);
        if (typeof (v) === 'undefined' || v == null || isNaN(v)) {
            return this.missingValue;
        }
        return v;
    };
    CompositeNumberColumn.prototype.isLoaded = function () {
        return this._children.every(function (c) { return c.isLoaded(); });
    };
    CompositeNumberColumn.prototype.compute = function (row, index) {
        return NaN;
    };
    CompositeNumberColumn.prototype.getNumber = function (row, index) {
        return this.getValue(row, index);
    };
    CompositeNumberColumn.prototype.compare = function (a, b, aIndex, bIndex) {
        return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__NumberColumn__["c" /* numberCompare */])(this.getValue(a, aIndex), this.getValue(b, bIndex));
    };
    CompositeNumberColumn.prototype.getRendererType = function () {
        return __WEBPACK_IMPORTED_MODULE_2__NumberColumn__["b" /* default */].prototype.getRendererType.call(this);
    };
    return CompositeNumberColumn;
}(__WEBPACK_IMPORTED_MODULE_1__CompositeColumn__["b" /* default */]));
/* harmony default export */ __webpack_exports__["a"] = CompositeNumberColumn;


/***/ }),
/* 12 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ValueColumn__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__NumberColumn__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__StringColumn__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__StackColumn__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__AnnotateColumn__ = __webpack_require__(48);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__BooleanColumn__ = __webpack_require__(49);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__CategoricalColumn__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__MinColumn__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__MaxColumn__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__MeanColumn__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__RankColumn__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__SelectionColumn__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__ScriptColumn__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__CategoricalNumberColumn__ = __webpack_require__(50);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__NestedColumn__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__DummyColumn__ = __webpack_require__(51);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__LinkColumn__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__SetColumn__ = __webpack_require__(53);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__MultiValueColumn__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20__BoxPlotColumn__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21__Column__ = __webpack_require__(2);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "Column", function() { return __WEBPACK_IMPORTED_MODULE_21__Column__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_22__CompositeColumn__ = __webpack_require__(10);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "CompositeColumn", function() { return __WEBPACK_IMPORTED_MODULE_22__CompositeColumn__["b"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "createMappingFunction", function() { return __WEBPACK_IMPORTED_MODULE_2__NumberColumn__["f"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "ScaleMappingFunction", function() { return __WEBPACK_IMPORTED_MODULE_2__NumberColumn__["d"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "ScriptMappingFunction", function() { return __WEBPACK_IMPORTED_MODULE_2__NumberColumn__["e"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "isNumberColumn", function() { return __WEBPACK_IMPORTED_MODULE_2__NumberColumn__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "isCategoricalColumn", function() { return __WEBPACK_IMPORTED_MODULE_7__CategoricalColumn__["b"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_23__Ranking__ = __webpack_require__(16);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "Ranking", function() { return __WEBPACK_IMPORTED_MODULE_23__Ranking__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "isSupportType", function() { return __WEBPACK_IMPORTED_MODULE_23__Ranking__["b"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "createMinDesc", function() { return __WEBPACK_IMPORTED_MODULE_8__MinColumn__["b"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "createMaxDesc", function() { return __WEBPACK_IMPORTED_MODULE_9__MaxColumn__["b"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "createMeanDesc", function() { return __WEBPACK_IMPORTED_MODULE_10__MeanColumn__["b"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "createRankDesc", function() { return __WEBPACK_IMPORTED_MODULE_11__RankColumn__["b"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "createSelectionDesc", function() { return __WEBPACK_IMPORTED_MODULE_12__SelectionColumn__["b"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "createScriptDesc", function() { return __WEBPACK_IMPORTED_MODULE_13__ScriptColumn__["b"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "createNestedDesc", function() { return __WEBPACK_IMPORTED_MODULE_15__NestedColumn__["b"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "createStackDesc", function() { return __WEBPACK_IMPORTED_MODULE_4__StackColumn__["b"]; });
/* harmony export (immutable) */ __webpack_exports__["defineColumn"] = defineColumn;
/* harmony export (immutable) */ __webpack_exports__["createActionDesc"] = createActionDesc;
/* harmony export (immutable) */ __webpack_exports__["models"] = models;
/**
 * Created by Samuel Gratzl on 06.08.2015.
 */
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};


































/**
 * defines a new column type
 * @param name
 * @param functions
 * @returns {CustomColumn}
 */
function defineColumn(name, functions) {
    if (functions === void 0) { functions = {}; }
    var CustomColumn = (function (_super) {
        __extends(CustomColumn, _super);
        function CustomColumn(id, desc) {
            var _this = _super.call(this, id, desc) || this;
            if (typeof (_this.init) === 'function') {
                _this.init.apply(_this, [].slice.apply(arguments));
            }
            return _this;
        }
        CustomColumn.prototype.init = function () {
            // dummy
        };
        return CustomColumn;
    }(__WEBPACK_IMPORTED_MODULE_1__ValueColumn__["a" /* default */]));
    CustomColumn.prototype.toString = function () { return name; };
    CustomColumn.prototype = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utils__["a" /* merge */])(CustomColumn.prototype, functions);
    return CustomColumn;
}
/**
 * utility for creating an action description with optional label
 * @param label
 * @returns {{type: string, label: string}}
 */
function createActionDesc(label) {
    if (label === void 0) { label = 'actions'; }
    return { type: 'actions', label: label };
}
/**
 * a map of all known column types
 */
function models() {
    return {
        number: __WEBPACK_IMPORTED_MODULE_2__NumberColumn__["b" /* default */],
        string: __WEBPACK_IMPORTED_MODULE_3__StringColumn__["a" /* default */],
        link: __WEBPACK_IMPORTED_MODULE_17__LinkColumn__["a" /* default */],
        stack: __WEBPACK_IMPORTED_MODULE_4__StackColumn__["a" /* default */],
        rank: __WEBPACK_IMPORTED_MODULE_11__RankColumn__["a" /* default */],
        boolean: __WEBPACK_IMPORTED_MODULE_6__BooleanColumn__["a" /* default */],
        categorical: __WEBPACK_IMPORTED_MODULE_7__CategoricalColumn__["a" /* default */],
        ordinal: __WEBPACK_IMPORTED_MODULE_14__CategoricalNumberColumn__["a" /* default */],
        actions: __WEBPACK_IMPORTED_MODULE_16__DummyColumn__["a" /* default */],
        annotate: __WEBPACK_IMPORTED_MODULE_5__AnnotateColumn__["a" /* default */],
        selection: __WEBPACK_IMPORTED_MODULE_12__SelectionColumn__["a" /* default */],
        max: __WEBPACK_IMPORTED_MODULE_9__MaxColumn__["a" /* default */],
        min: __WEBPACK_IMPORTED_MODULE_8__MinColumn__["a" /* default */],
        mean: __WEBPACK_IMPORTED_MODULE_10__MeanColumn__["a" /* default */],
        script: __WEBPACK_IMPORTED_MODULE_13__ScriptColumn__["a" /* default */],
        nested: __WEBPACK_IMPORTED_MODULE_15__NestedColumn__["a" /* default */],
        multiValue: __WEBPACK_IMPORTED_MODULE_19__MultiValueColumn__["a" /* default */],
        set: __WEBPACK_IMPORTED_MODULE_18__SetColumn__["a" /* default */],
        boxplot: __WEBPACK_IMPORTED_MODULE_20__BoxPlotColumn__["a" /* default */]
    };
}


/***/ }),
/* 13 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ValueColumn__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Column__ = __webpack_require__(2);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return SORT_METHOD; });
/* harmony export (immutable) */ __webpack_exports__["c"] = compareBoxPlot;
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * Created by bikramkawan on 24/11/2016.
 */


var SORT_METHOD = {
    min: 'min',
    max: 'max',
    median: 'median',
    q1: 'q1',
    q3: 'q3'
};
function compareBoxPlot(col, a, b, aIndex, bIndex) {
    var aVal = (col.getBoxPlotData(a, aIndex));
    var bVal = (col.getBoxPlotData(b, bIndex));
    if (aVal === null) {
        return bVal === null ? 0 : +1;
    }
    if (bVal === null) {
        return -1;
    }
    var method = col.getSortMethod();
    return aVal[method] - bVal[method];
}
var BoxPlotColumn = (function (_super) {
    __extends(BoxPlotColumn, _super);
    function BoxPlotColumn(id, desc) {
        var _this = _super.call(this, id, desc) || this;
        _this.domain = desc.domain || [0, 100];
        _this.sort = desc.sort || SORT_METHOD.min;
        return _this;
    }
    BoxPlotColumn.prototype.compare = function (a, b, aIndex, bIndex) {
        return compareBoxPlot(this, a, b, aIndex, bIndex);
    };
    BoxPlotColumn.prototype.getDomain = function () {
        return this.domain;
    };
    BoxPlotColumn.prototype.getBoxPlotData = function (row, index) {
        return this.getValue(row, index);
    };
    BoxPlotColumn.prototype.getSortMethod = function () {
        return this.sort;
    };
    BoxPlotColumn.prototype.setSortMethod = function (sort) {
        if (this.sort === sort) {
            return;
        }
        this.fire([__WEBPACK_IMPORTED_MODULE_1__Column__["a" /* default */].EVENT_SORTMETHOD_CHANGED], this.sort, this.sort = sort);
        // sort by me if not already sorted by me
        if (this.findMyRanker().getSortCriteria().col !== this) {
            this.sortByMe();
        }
    };
    BoxPlotColumn.prototype.dump = function (toDescRef) {
        var r = _super.prototype.dump.call(this, toDescRef);
        r.sortMethod = this.getSortMethod();
        return r;
    };
    BoxPlotColumn.prototype.restore = function (dump, factory) {
        _super.prototype.restore.call(this, dump, factory);
        if (dump.sortMethod) {
            this.sort = dump.sortMethod;
        }
    };
    return BoxPlotColumn;
}(__WEBPACK_IMPORTED_MODULE_0__ValueColumn__["a" /* default */]));
/* harmony default export */ __webpack_exports__["a"] = BoxPlotColumn;


/***/ }),
/* 14 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_d3__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_d3___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_d3__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Column__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ValueColumn__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__StringColumn__ = __webpack_require__(6);
/* harmony export (immutable) */ __webpack_exports__["b"] = isCategoricalColumn;
/**
 * Created by sam on 04.11.2016.
 */
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};




/**
 * checks whether the given column or description is a categorical column, i.e. the value is a list of categories
 * @param col
 * @returns {boolean}
 */
function isCategoricalColumn(col) {
    return (col instanceof __WEBPACK_IMPORTED_MODULE_1__Column__["a" /* default */] && typeof col.getCategories === 'function' || (!(col instanceof __WEBPACK_IMPORTED_MODULE_1__Column__["a" /* default */]) && col.type.match(/(categorical|ordinal)/) != null));
}
function isEqualFilter(a, b) {
    if (a === b) {
        return true;
    }
    if (a === null || b === null) {
        return false;
    }
    if (a.filterMissing !== b.filterMissing || (typeof a.filter !== typeof b.filter)) {
        return false;
    }
    if (Array.isArray(a.filter)) {
        return arrayEquals(a.filter, b.filter);
    }
    return String(a.filter) === String(b.filter);
}
function arrayEquals(a, b) {
    var al = a != null ? a.length : 0;
    var bl = b != null ? b.length : 0;
    if (al !== bl) {
        return false;
    }
    if (al === 0) {
        return true;
    }
    return a.every(function (ai, i) { return ai === b[i]; });
}
/**
 * column for categorical values
 */
var CategoricalColumn = (function (_super) {
    __extends(CategoricalColumn, _super);
    function CategoricalColumn(id, desc) {
        var _this = _super.call(this, id, desc) || this;
        /**
         * colors for each category
         * @type {Ordinal<string, string>}
         */
        _this.colors = __WEBPACK_IMPORTED_MODULE_0_d3__["scale"].category10();
        /**
         * category labels by default the category name itself
         * @type {Array}
         */
        _this.catLabels = new Map();
        /**
         * set of categories to show
         * @type {null}
         * @private
         */
        _this.currentFilter = null;
        /**
         * split multiple categories
         * @type {string}
         */
        _this.separator = ';';
        _this.separator = desc.separator || _this.separator;
        _this.initCategories(desc);
        return _this;
        //TODO infer categories from data
    }
    CategoricalColumn.prototype.initCategories = function (desc) {
        if (desc.categories) {
            var cats_1 = [], cols_1 = this.colors.range().slice(), //work on a copy since it will be manipulated
            labels_1 = new Map();
            desc.categories.forEach(function (cat, i) {
                if (typeof cat === 'string') {
                    //just the category value
                    cats_1.push(cat);
                }
                else {
                    //the name or value of the category
                    cats_1.push(cat.name || cat.value);
                    //optional label mapping
                    if (cat.label) {
                        labels_1.set(cat.name, cat.label);
                    }
                    //optional color
                    if (cat.color) {
                        cols_1[i] = cat.color;
                    }
                }
            });
            this.catLabels = labels_1;
            this.colors.domain(cats_1).range(cols_1);
        }
    };
    Object.defineProperty(CategoricalColumn.prototype, "categories", {
        get: function () {
            return this.colors.domain();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CategoricalColumn.prototype, "categoryColors", {
        get: function () {
            return this.colors.range();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CategoricalColumn.prototype, "categoryLabels", {
        get: function () {
            var _this = this;
            //no mapping
            if (this.catLabels === null || this.catLabels.size === 0) {
                return this.categories;
            }
            //label or identity mapping
            return this.categories.map(function (c) { return _this.catLabels.has(c) ? _this.catLabels.get(c) : c; });
        },
        enumerable: true,
        configurable: true
    });
    CategoricalColumn.prototype.colorOf = function (cat) {
        return this.colors(cat);
    };
    CategoricalColumn.prototype.getLabel = function (row, index) {
        //no mapping
        if (this.catLabels === null || this.catLabels.size === 0) {
            return '' + __WEBPACK_IMPORTED_MODULE_3__StringColumn__["a" /* default */].prototype.getValue.call(this, row, index);
        }
        return this.getLabels(row, index).join(this.separator);
    };
    CategoricalColumn.prototype.getFirstLabel = function (row, index) {
        var l = this.getLabels(row, index);
        return l.length > 0 ? l[0] : null;
    };
    CategoricalColumn.prototype.getLabels = function (row, index) {
        var _this = this;
        var v = __WEBPACK_IMPORTED_MODULE_3__StringColumn__["a" /* default */].prototype.getValue.call(this, row, index);
        var r = v ? v.split(this.separator) : [];
        var mapToLabel = function (values) {
            if (_this.catLabels === null || _this.catLabels.size === 0) {
                return values;
            }
            return values.map(function (v) { return _this.catLabels.has(v) ? _this.catLabels.get(v) : v; });
        };
        return mapToLabel(r);
    };
    CategoricalColumn.prototype.getValue = function (row, index) {
        var r = this.getValues(row, index);
        return r.length > 0 ? r[0] : null;
    };
    CategoricalColumn.prototype.getValues = function (row, index) {
        var v = __WEBPACK_IMPORTED_MODULE_3__StringColumn__["a" /* default */].prototype.getValue.call(this, row, index);
        return v ? v.split(this.separator) : [];
    };
    CategoricalColumn.prototype.getCategories = function (row, index) {
        return this.getValues(row, index);
    };
    CategoricalColumn.prototype.getColor = function (row, index) {
        var cat = this.getValue(row, index);
        if (cat === null || cat === '') {
            return null;
        }
        return this.colors(cat);
    };
    CategoricalColumn.prototype.getColors = function (row, index) {
        return this.getCategories(row, index).map(this.colors);
    };
    CategoricalColumn.prototype.dump = function (toDescRef) {
        var r = _super.prototype.dump.call(this, toDescRef);
        r.filter = this.currentFilter;
        r.colors = {
            domain: this.colors.domain(),
            range: this.colors.range(),
            separator: this.separator
        };
        if (this.catLabels !== null && this.catLabels.size !== 0) {
            r.labels = this.catLabels.entries();
        }
        return r;
    };
    CategoricalColumn.prototype.restore = function (dump, factory) {
        var _this = this;
        _super.prototype.restore.call(this, dump, factory);
        if ('filter' in dump) {
            var bak = dump.filter;
            if (typeof bak === 'string' || Array.isArray(bak)) {
                this.currentFilter = { filter: bak, filterMissing: false };
            }
            else {
                this.currentFilter = bak;
            }
        }
        else {
            this.currentFilter = null;
        }
        if (dump.colors) {
            this.colors.domain(dump.colors.domain).range(dump.colors.range);
        }
        if (dump.labels) {
            this.catLabels = new Map();
            dump.labels.forEach(function (e) { return _this.catLabels.set(e.key, e.value); });
        }
        this.separator = dump.separator || this.separator;
    };
    CategoricalColumn.prototype.isFiltered = function () {
        return this.currentFilter != null;
    };
    CategoricalColumn.prototype.filter = function (row, index) {
        if (!this.isFiltered()) {
            return true;
        }
        var vs = this.getCategories(row, index), filter = this.currentFilter.filter;
        if (this.currentFilter.filterMissing && vs.length === 0) {
            return false;
        }
        return vs.every(function (v) {
            if (Array.isArray(filter) && filter.length > 0) {
                return filter.indexOf(v) >= 0;
            }
            else if (typeof filter === 'string' && filter.length > 0) {
                return v && v.toLowerCase().indexOf(filter.toLowerCase()) >= 0;
            }
            else if (filter instanceof RegExp) {
                return v != null && v.match(filter).length > 0;
            }
            return true;
        });
    };
    CategoricalColumn.prototype.getFilter = function () {
        return this.currentFilter;
    };
    CategoricalColumn.prototype.setFilter = function (filter) {
        if (isEqualFilter(this.currentFilter, filter)) {
            return;
        }
        this.fire([__WEBPACK_IMPORTED_MODULE_1__Column__["a" /* default */].EVENT_FILTER_CHANGED, __WEBPACK_IMPORTED_MODULE_1__Column__["a" /* default */].EVENT_DIRTY_VALUES, __WEBPACK_IMPORTED_MODULE_1__Column__["a" /* default */].EVENT_DIRTY], this.currentFilter, this.currentFilter = filter);
    };
    CategoricalColumn.prototype.compare = function (a, b, aIndex, bIndex) {
        var va = this.getValues(a, aIndex);
        var vb = this.getValues(b, bIndex);
        //check all categories
        for (var i = 0; i < Math.min(va.length, vb.length); ++i) {
            var ci = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_d3__["ascending"])(va[i], vb[i]);
            if (ci !== 0) {
                return ci;
            }
        }
        //smaller length wins
        return va.length - vb.length;
    };
    return CategoricalColumn;
}(__WEBPACK_IMPORTED_MODULE_2__ValueColumn__["a" /* default */]));
/* harmony default export */ __webpack_exports__["a"] = CategoricalColumn;


/***/ }),
/* 15 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ValueColumn__ = __webpack_require__(3);
/* harmony export (immutable) */ __webpack_exports__["b"] = createDesc;
/**
 * Created by sam on 04.11.2016.
 */
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};

/**
 * factory for creating a description creating a rank column
 * @param label
 * @returns {{type: string, label: string}}
 */
function createDesc(label) {
    if (label === void 0) { label = 'Rank'; }
    return { type: 'rank', label: label };
}
/**
 * a rank column
 */
var RankColumn = (function (_super) {
    __extends(RankColumn, _super);
    function RankColumn(id, desc) {
        var _this = _super.call(this, id, desc) || this;
        _this.setWidthImpl(50);
        return _this;
    }
    return RankColumn;
}(__WEBPACK_IMPORTED_MODULE_0__ValueColumn__["a" /* default */]));
/* harmony default export */ __webpack_exports__["a"] = RankColumn;


/***/ }),
/* 16 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Column__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__StringColumn__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__utils__ = __webpack_require__(1);
/* harmony export (immutable) */ __webpack_exports__["b"] = isSupportType;
/**
 * Created by Samuel Gratzl on 06.08.2015.
 */
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};



function isSupportType(col) {
    return ['rank', 'selection', 'actions'].indexOf(col.type) >= 0;
}
/**
 * a ranking
 */
var Ranking = (function (_super) {
    __extends(Ranking, _super);
    function Ranking(id) {
        var _this = _super.call(this) || this;
        _this.id = id;
        /**
         * the current sort criteria
         * @type {null}
         * @private
         */
        _this.sortColumn = null;
        /**
         * ascending or descending order
         * @type {boolean}
         */
        _this.ascending = false;
        /**
         * columns of this ranking
         * @type {Array}
         * @private
         */
        _this.columns = [];
        _this.comparator = function (a, b, aIndex, bIndex) {
            if (_this.sortColumn === null) {
                return 0;
            }
            var r = _this.sortColumn.compare(a, b, aIndex, bIndex);
            return _this.ascending ? r : -r;
        };
        _this.dirtyOrder = function () {
            _this.fire([Ranking.EVENT_DIRTY_ORDER, Ranking.EVENT_DIRTY_VALUES, Ranking.EVENT_DIRTY], _this.getSortCriteria());
        };
        /**
         * the current ordering as an sorted array of indices
         * @type {Array}
         */
        _this.order = [];
        _this.id = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__Column__["b" /* fixCSS */])(id);
        return _this;
    }
    Ranking.prototype.createEventList = function () {
        return _super.prototype.createEventList.call(this).concat([
            Ranking.EVENT_WIDTH_CHANGED, Ranking.EVENT_FILTER_CHANGED,
            Ranking.EVENT_LABEL_CHANGED, Ranking.EVENT_COMPRESS_CHANGED,
            Ranking.EVENT_ADD_COLUMN, Ranking.EVENT_REMOVE_COLUMN,
            Ranking.EVENT_DIRTY, Ranking.EVENT_DIRTY_HEADER, Ranking.EVENT_DIRTY_VALUES,
            Ranking.EVENT_SORT_CRITERIA_CHANGED, Ranking.EVENT_DIRTY_ORDER, Ranking.EVENT_ORDER_CHANGED
        ]);
    };
    Ranking.prototype.assignNewId = function (idGenerator) {
        this.id = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__Column__["b" /* fixCSS */])(idGenerator());
        this.columns.forEach(function (c) { return c.assignNewId(idGenerator); });
    };
    Ranking.prototype.setOrder = function (order) {
        this.fire([Ranking.EVENT_ORDER_CHANGED, Ranking.EVENT_DIRTY_VALUES, Ranking.EVENT_DIRTY], this.order, this.order = order);
    };
    Ranking.prototype.getOrder = function () {
        return this.order;
    };
    Ranking.prototype.dump = function (toDescRef) {
        var r = {};
        r.columns = this.columns.map(function (d) { return d.dump(toDescRef); });
        r.sortColumn = {
            asc: this.ascending
        };
        if (this.sortColumn) {
            r.sortColumn.sortBy = this.sortColumn.id; //store the index not the object
        }
        return r;
    };
    Ranking.prototype.restore = function (dump, factory) {
        var _this = this;
        this.clear();
        dump.columns.map(function (child) {
            var c = factory(child);
            if (c) {
                _this.push(c);
            }
        });
        if (dump.sortColumn) {
            this.ascending = dump.sortColumn.asc;
            if (dump.sortColumn.sortBy) {
                var help = this.columns.filter(function (d) { return d.id === dump.sortColumn.sortBy; });
                this.sortBy(help.length === 0 ? null : help[0], dump.sortColumn.asc);
            }
        }
    };
    Ranking.prototype.flatten = function (r, offset, levelsToGo, padding) {
        if (levelsToGo === void 0) { levelsToGo = 0; }
        if (padding === void 0) { padding = 0; }
        var acc = offset; // + this.getWidth() + padding;
        if (levelsToGo > 0 || levelsToGo <= __WEBPACK_IMPORTED_MODULE_0__Column__["a" /* default */].FLAT_ALL_COLUMNS) {
            this.columns.forEach(function (c) {
                if (!c.isHidden() || levelsToGo <= __WEBPACK_IMPORTED_MODULE_0__Column__["a" /* default */].FLAT_ALL_COLUMNS) {
                    acc += c.flatten(r, acc, levelsToGo - 1, padding) + padding;
                }
            });
        }
        return acc - offset;
    };
    Ranking.prototype.getSortCriteria = function () {
        return {
            col: this.sortColumn,
            asc: this.ascending
        };
    };
    Ranking.prototype.toggleSorting = function (col) {
        if (this.sortColumn === col) {
            return this.sortBy(col, !this.ascending);
        }
        return this.sortBy(col);
    };
    Ranking.prototype.setSortCriteria = function (value) {
        return this.sortBy(value.col, value.asc);
    };
    Ranking.prototype.sortBy = function (col, ascending) {
        if (ascending === void 0) { ascending = false; }
        if (col !== null && col.findMyRanker() !== this) {
            return false; //not one of mine
        }
        if (this.sortColumn === col && this.ascending === ascending) {
            return true; //already in this order
        }
        if (this.sortColumn) {
            this.sortColumn.on(__WEBPACK_IMPORTED_MODULE_0__Column__["a" /* default */].EVENT_DIRTY_VALUES + '.order', null);
            this.sortColumn.on(__WEBPACK_IMPORTED_MODULE_0__Column__["a" /* default */].EVENT_SORTMETHOD_CHANGED + '.order', null);
        }
        var bak = this.getSortCriteria();
        this.sortColumn = col;
        if (this.sortColumn) {
            this.sortColumn.on(__WEBPACK_IMPORTED_MODULE_0__Column__["a" /* default */].EVENT_DIRTY_VALUES + '.order', this.dirtyOrder);
            // order is dirty if the sort method has changed
            this.sortColumn.on(__WEBPACK_IMPORTED_MODULE_0__Column__["a" /* default */].EVENT_SORTMETHOD_CHANGED + '.order', this.dirtyOrder);
        }
        this.ascending = ascending;
        this.fire([Ranking.EVENT_SORT_CRITERIA_CHANGED, Ranking.EVENT_DIRTY_ORDER, Ranking.EVENT_DIRTY_HEADER,
            Ranking.EVENT_DIRTY_VALUES, Ranking.EVENT_DIRTY], bak, this.getSortCriteria());
        return true;
    };
    Object.defineProperty(Ranking.prototype, "children", {
        get: function () {
            return this.columns.slice();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Ranking.prototype, "length", {
        get: function () {
            return this.columns.length;
        },
        enumerable: true,
        configurable: true
    });
    Ranking.prototype.insert = function (col, index) {
        if (index === void 0) { index = this.columns.length; }
        this.columns.splice(index, 0, col);
        col.parent = this;
        this.forward(col, __WEBPACK_IMPORTED_MODULE_0__Column__["a" /* default */].EVENT_DIRTY_VALUES + '.ranking', __WEBPACK_IMPORTED_MODULE_0__Column__["a" /* default */].EVENT_DIRTY_HEADER + '.ranking', __WEBPACK_IMPORTED_MODULE_0__Column__["a" /* default */].EVENT_DIRTY + '.ranking', __WEBPACK_IMPORTED_MODULE_0__Column__["a" /* default */].EVENT_FILTER_CHANGED + '.ranking');
        col.on(Ranking.EVENT_FILTER_CHANGED + '.order', this.dirtyOrder);
        this.fire([Ranking.EVENT_ADD_COLUMN, Ranking.EVENT_DIRTY_HEADER, Ranking.EVENT_DIRTY_VALUES, Ranking.EVENT_DIRTY], col, index);
        if (this.sortColumn === null && !isSupportType(col.desc)) {
            this.sortBy(col, col instanceof __WEBPACK_IMPORTED_MODULE_1__StringColumn__["a" /* default */]);
        }
        return col;
    };
    Object.defineProperty(Ranking.prototype, "fqpath", {
        get: function () {
            return '';
        },
        enumerable: true,
        configurable: true
    });
    Ranking.prototype.findByPath = function (fqpath) {
        var p = this;
        var indices = fqpath.split('@').map(Number).slice(1); //ignore the first entry = ranking
        while (indices.length > 0) {
            var i = indices.shift();
            p = p.at(i);
        }
        return p;
    };
    Ranking.prototype.indexOf = function (col) {
        return this.columns.indexOf(col);
    };
    Ranking.prototype.at = function (index) {
        return this.columns[index];
    };
    Ranking.prototype.insertAfter = function (col, ref) {
        var i = this.columns.indexOf(ref);
        if (i < 0) {
            return null;
        }
        return this.insert(col, i + 1);
    };
    Ranking.prototype.push = function (col) {
        return this.insert(col);
    };
    Ranking.prototype.remove = function (col) {
        var i = this.columns.indexOf(col);
        if (i < 0) {
            return false;
        }
        this.unforward(col, __WEBPACK_IMPORTED_MODULE_0__Column__["a" /* default */].EVENT_DIRTY_VALUES + '.ranking', __WEBPACK_IMPORTED_MODULE_0__Column__["a" /* default */].EVENT_DIRTY_HEADER + '.ranking', __WEBPACK_IMPORTED_MODULE_0__Column__["a" /* default */].EVENT_DIRTY + '.ranking', __WEBPACK_IMPORTED_MODULE_0__Column__["a" /* default */].EVENT_FILTER_CHANGED + '.ranking');
        if (this.sortColumn === col) {
            var next = this.columns.filter(function (d) { return d !== col && !isSupportType(d.desc); })[0];
            this.sortBy(next ? next : null);
        }
        col.parent = null;
        this.columns.splice(i, 1);
        this.fire([Ranking.EVENT_REMOVE_COLUMN, Ranking.EVENT_DIRTY_HEADER, Ranking.EVENT_DIRTY_VALUES, Ranking.EVENT_DIRTY], col, i);
        return true;
    };
    Ranking.prototype.clear = function () {
        var _this = this;
        if (this.columns.length === 0) {
            return;
        }
        this.sortColumn = null;
        this.columns.forEach(function (col) {
            _this.unforward(col, __WEBPACK_IMPORTED_MODULE_0__Column__["a" /* default */].EVENT_DIRTY_VALUES + '.ranking', __WEBPACK_IMPORTED_MODULE_0__Column__["a" /* default */].EVENT_DIRTY_HEADER + '.ranking', __WEBPACK_IMPORTED_MODULE_0__Column__["a" /* default */].EVENT_DIRTY + '.ranking', __WEBPACK_IMPORTED_MODULE_0__Column__["a" /* default */].EVENT_FILTER_CHANGED + '.ranking');
            col.parent = null;
        });
        this.columns.length = 0;
        this.fire([Ranking.EVENT_REMOVE_COLUMN, Ranking.EVENT_DIRTY_HEADER, Ranking.EVENT_DIRTY_VALUES, Ranking.EVENT_DIRTY], null);
    };
    Object.defineProperty(Ranking.prototype, "flatColumns", {
        get: function () {
            var r = [];
            this.flatten(r, 0, __WEBPACK_IMPORTED_MODULE_0__Column__["a" /* default */].FLAT_ALL_COLUMNS);
            return r.map(function (d) { return d.col; });
        },
        enumerable: true,
        configurable: true
    });
    Ranking.prototype.find = function (idOrFilter) {
        var filter = typeof (idOrFilter) === 'string' ? function (col) { return col.id === idOrFilter; } : idOrFilter;
        var r = this.flatColumns;
        for (var _i = 0, r_1 = r; _i < r_1.length; _i++) {
            var v = r_1[_i];
            if (filter(v)) {
                return v;
            }
        }
        return null;
    };
    /**
     * converts the sorting criteria to a json compatible notation for transferring it to the server
     * @param toId
     */
    Ranking.prototype.toSortingDesc = function (toId) {
        //TODO describe also all the filter settings
        var resolve = function (s) {
            if (s === null) {
                return null;
            }
            return s.toSortingDesc(toId);
        };
        var id = resolve(this.sortColumn);
        if (id === null) {
            return null;
        }
        return {
            id: id,
            asc: this.ascending
        };
    };
    Ranking.prototype.isFiltered = function () {
        return this.columns.some(function (d) { return d.isFiltered(); });
    };
    Ranking.prototype.filter = function (row, index) {
        return this.columns.every(function (d) { return d.filter(row, index); });
    };
    Ranking.prototype.findMyRanker = function () {
        return this;
    };
    Object.defineProperty(Ranking.prototype, "fqid", {
        get: function () {
            return this.id;
        },
        enumerable: true,
        configurable: true
    });
    return Ranking;
}(__WEBPACK_IMPORTED_MODULE_2__utils__["c" /* AEventDispatcher */]));
/* harmony default export */ __webpack_exports__["a"] = Ranking;
Ranking.EVENT_WIDTH_CHANGED = __WEBPACK_IMPORTED_MODULE_0__Column__["a" /* default */].EVENT_WIDTH_CHANGED;
Ranking.EVENT_FILTER_CHANGED = __WEBPACK_IMPORTED_MODULE_0__Column__["a" /* default */].EVENT_FILTER_CHANGED;
Ranking.EVENT_LABEL_CHANGED = __WEBPACK_IMPORTED_MODULE_0__Column__["a" /* default */].EVENT_LABEL_CHANGED;
Ranking.EVENT_COMPRESS_CHANGED = __WEBPACK_IMPORTED_MODULE_0__Column__["a" /* default */].EVENT_COMPRESS_CHANGED;
Ranking.EVENT_ADD_COLUMN = __WEBPACK_IMPORTED_MODULE_0__Column__["a" /* default */].EVENT_ADD_COLUMN;
Ranking.EVENT_REMOVE_COLUMN = __WEBPACK_IMPORTED_MODULE_0__Column__["a" /* default */].EVENT_REMOVE_COLUMN;
Ranking.EVENT_DIRTY = __WEBPACK_IMPORTED_MODULE_0__Column__["a" /* default */].EVENT_DIRTY;
Ranking.EVENT_DIRTY_HEADER = __WEBPACK_IMPORTED_MODULE_0__Column__["a" /* default */].EVENT_DIRTY_HEADER;
Ranking.EVENT_DIRTY_VALUES = __WEBPACK_IMPORTED_MODULE_0__Column__["a" /* default */].EVENT_DIRTY_VALUES;
Ranking.EVENT_SORT_CRITERIA_CHANGED = 'sortCriteriaChanged';
Ranking.EVENT_DIRTY_ORDER = 'dirtyOrder';
Ranking.EVENT_ORDER_CHANGED = 'orderChanged';


/***/ }),
/* 17 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Column__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__CompositeNumberColumn__ = __webpack_require__(11);
/* harmony export (immutable) */ __webpack_exports__["b"] = createDesc;
/**
 * Created by sam on 04.11.2016.
 */
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};


/**
 * factory for creating a description creating a mean column
 * @param label
 * @returns {{type: string, label: string}}
 */
function createDesc(label) {
    if (label === void 0) { label = 'script'; }
    return { type: 'script', label: label, script: ScriptColumn.DEFAULT_SCRIPT };
}
var ScriptColumn = (function (_super) {
    __extends(ScriptColumn, _super);
    function ScriptColumn(id, desc) {
        var _this = _super.call(this, id, desc) || this;
        _this.script = ScriptColumn.DEFAULT_SCRIPT;
        _this.f = null;
        _this.script = desc.script || _this.script;
        return _this;
    }
    ScriptColumn.prototype.createEventList = function () {
        return _super.prototype.createEventList.call(this).concat([ScriptColumn.EVENT_SCRIPT_CHANGED]);
    };
    ScriptColumn.prototype.setScript = function (script) {
        if (this.script === script) {
            return;
        }
        this.f = null;
        this.fire([ScriptColumn.EVENT_SCRIPT_CHANGED, __WEBPACK_IMPORTED_MODULE_0__Column__["a" /* default */].EVENT_DIRTY_VALUES, __WEBPACK_IMPORTED_MODULE_0__Column__["a" /* default */].EVENT_DIRTY], this.script, this.script = script);
    };
    ScriptColumn.prototype.getScript = function () {
        return this.script;
    };
    ScriptColumn.prototype.dump = function (toDescRef) {
        var r = _super.prototype.dump.call(this, toDescRef);
        r.script = this.script;
        return r;
    };
    ScriptColumn.prototype.restore = function (dump, factory) {
        this.script = dump.script || this.script;
        _super.prototype.restore.call(this, dump, factory);
    };
    ScriptColumn.prototype.compute = function (row, index) {
        if (this.f == null) {
            this.f = new Function('children', 'values', this.script);
        }
        return this.f.call(this, this._children, this._children.map(function (d) { return d.getValue(row, index); }));
    };
    /**
     * describe the column if it is a sorting criteria
     * @param toId helper to convert a description to an id
     * @return {string} json compatible
     */
    ScriptColumn.prototype.toSortingDesc = function (toId) {
        return {
            code: this.script,
            operands: this._children.map(function (c) { return c.toSortingDesc(toId); })
        };
    };
    return ScriptColumn;
}(__WEBPACK_IMPORTED_MODULE_1__CompositeNumberColumn__["a" /* default */]));
/* harmony default export */ __webpack_exports__["a"] = ScriptColumn;
ScriptColumn.EVENT_SCRIPT_CHANGED = 'scriptChanged';
ScriptColumn.DEFAULT_SCRIPT = 'return Math.max.apply(Math,values)';


/***/ }),
/* 18 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__CompositeNumberColumn__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Column__ = __webpack_require__(2);
/* harmony export (immutable) */ __webpack_exports__["b"] = createDesc;
/**
 * Created by sam on 04.11.2016.
 */
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};


/**
 * factory for creating a description creating a stacked column
 * @param label
 * @returns {{type: string, label: string}}
 */
function createDesc(label) {
    if (label === void 0) { label = 'Combined'; }
    return { type: 'stack', label: label };
}
/**
 * implementation of the stacked column
 */
var StackColumn = (function (_super) {
    __extends(StackColumn, _super);
    function StackColumn(id, desc) {
        var _this = _super.call(this, id, desc) || this;
        /**
         * whether this stack column is collapsed i.e. just looks like an ordinary number column
         * @type {boolean}
         * @private
         */
        _this.collapsed = false;
        var that = _this;
        _this.adaptChange = function (oldValue, newValue) {
            that.adaptWidthChange(this.source, oldValue, newValue);
        };
        return _this;
    }
    StackColumn.prototype.createEventList = function () {
        return _super.prototype.createEventList.call(this).concat([StackColumn.EVENT_COLLAPSE_CHANGED, StackColumn.EVENT_WEIGHTS_CHANGED]);
    };
    StackColumn.prototype.setCollapsed = function (value) {
        if (this.collapsed === value) {
            return;
        }
        this.fire([StackColumn.EVENT_COLLAPSE_CHANGED, __WEBPACK_IMPORTED_MODULE_1__Column__["a" /* default */].EVENT_DIRTY_HEADER, __WEBPACK_IMPORTED_MODULE_1__Column__["a" /* default */].EVENT_DIRTY_VALUES, __WEBPACK_IMPORTED_MODULE_1__Column__["a" /* default */].EVENT_DIRTY], this.collapsed, this.collapsed = value);
    };
    StackColumn.prototype.getCollapsed = function () {
        return this.collapsed;
    };
    StackColumn.prototype.flatten = function (r, offset, levelsToGo, padding) {
        if (levelsToGo === void 0) { levelsToGo = 0; }
        if (padding === void 0) { padding = 0; }
        var self = null;
        var children = levelsToGo <= __WEBPACK_IMPORTED_MODULE_1__Column__["a" /* default */].FLAT_ALL_COLUMNS ? this._children : this._children.filter(function (c) { return !c.isHidden(); });
        //no more levels or just this one
        if (levelsToGo === 0 || levelsToGo <= __WEBPACK_IMPORTED_MODULE_1__Column__["a" /* default */].FLAT_ALL_COLUMNS) {
            var w = this.getCompressed() ? __WEBPACK_IMPORTED_MODULE_1__Column__["a" /* default */].COMPRESSED_WIDTH : this.getWidth();
            if (!this.collapsed && !this.getCompressed()) {
                w += (children.length - 1) * padding;
            }
            r.push(self = { col: this, offset: offset, width: w });
            if (levelsToGo === 0) {
                return w;
            }
        }
        //push children
        var acc = offset;
        children.forEach(function (c) {
            acc += c.flatten(r, acc, levelsToGo - 1, padding) + padding;
        });
        if (self) {
            self.width = acc - offset - padding;
        }
        return acc - offset - padding;
    };
    StackColumn.prototype.dump = function (toDescRef) {
        var r = _super.prototype.dump.call(this, toDescRef);
        r.collapsed = this.collapsed;
        return r;
    };
    StackColumn.prototype.restore = function (dump, factory) {
        this.collapsed = dump.collapsed === true;
        _super.prototype.restore.call(this, dump, factory);
    };
    /**
     * inserts a column at a the given position
     */
    StackColumn.prototype.insert = function (col, index, weight) {
        if (weight === void 0) { weight = NaN; }
        if (!isNaN(weight)) {
            col.setWidth((weight / (1 - weight) * this.getWidth()));
        }
        col.on(__WEBPACK_IMPORTED_MODULE_1__Column__["a" /* default */].EVENT_WIDTH_CHANGED + '.stack', this.adaptChange);
        //increase my width
        _super.prototype.setWidth.call(this, this.length === 0 ? col.getWidth() : (this.getWidth() + col.getWidth()));
        return _super.prototype.insert.call(this, col, index);
    };
    StackColumn.prototype.push = function (col, weight) {
        if (weight === void 0) { weight = NaN; }
        return this.insert(col, this.length, weight);
    };
    StackColumn.prototype.insertAfter = function (col, ref, weight) {
        if (weight === void 0) { weight = NaN; }
        var i = this.indexOf(ref);
        if (i < 0) {
            return null;
        }
        return this.insert(col, i + 1, weight);
    };
    /**
     * adapts weights according to an own width change
     * @param col
     * @param oldValue
     * @param newValue
     */
    StackColumn.prototype.adaptWidthChange = function (col, oldValue, newValue) {
        if (oldValue === newValue) {
            return;
        }
        var bak = this.getWeights();
        var full = this.getWidth(), change = (newValue - oldValue) / full;
        var oldWeight = oldValue / full;
        var factor = (1 - oldWeight - change) / (1 - oldWeight);
        this._children.forEach(function (c) {
            if (c === col) {
            }
            else {
                c.setWidthImpl(c.getWidth() * factor);
            }
        });
        this.fire([StackColumn.EVENT_WEIGHTS_CHANGED, __WEBPACK_IMPORTED_MODULE_1__Column__["a" /* default */].EVENT_DIRTY_HEADER, __WEBPACK_IMPORTED_MODULE_1__Column__["a" /* default */].EVENT_DIRTY_VALUES, __WEBPACK_IMPORTED_MODULE_1__Column__["a" /* default */].EVENT_DIRTY], bak, this.getWeights());
    };
    StackColumn.prototype.getWeights = function () {
        var w = this.getWidth();
        return this._children.map(function (d) { return d.getWidth() / w; });
    };
    StackColumn.prototype.setWeights = function (weights) {
        var bak = this.getWeights();
        var delta = weights.length - this.length;
        var s;
        if (delta < 0) {
            s = weights.reduce(function (p, a) { return p + a; }, 0);
            if (s <= 1) {
                for (var i = 0; i < -delta; ++i) {
                    weights.push((1 - s) * (1 / -delta));
                }
            }
            else if (s <= 100) {
                for (var i = 0; i < -delta; ++i) {
                    weights.push((100 - s) * (1 / -delta));
                }
            }
        }
        weights = weights.slice(0, this.length);
        s = weights.reduce(function (p, a) { return p + a; }, 0) / this.getWidth();
        weights = weights.map(function (d) { return d / s; });
        this._children.forEach(function (c, i) {
            c.setWidthImpl(weights[i]);
        });
        this.fire([StackColumn.EVENT_WEIGHTS_CHANGED, __WEBPACK_IMPORTED_MODULE_1__Column__["a" /* default */].EVENT_DIRTY_HEADER, __WEBPACK_IMPORTED_MODULE_1__Column__["a" /* default */].EVENT_DIRTY_VALUES, __WEBPACK_IMPORTED_MODULE_1__Column__["a" /* default */].EVENT_DIRTY], bak, weights);
    };
    StackColumn.prototype.removeImpl = function (child) {
        child.on(__WEBPACK_IMPORTED_MODULE_1__Column__["a" /* default */].EVENT_WIDTH_CHANGED + '.stack', null);
        _super.prototype.setWidth.call(this, this.length === 1 ? 100 : this.getWidth() - child.getWidth());
        return _super.prototype.removeImpl.call(this, child);
    };
    StackColumn.prototype.setWidth = function (value) {
        var factor = value / this.getWidth();
        this._children.forEach(function (child) {
            //disable since we change it
            child.setWidthImpl(child.getWidth() * factor);
        });
        _super.prototype.setWidth.call(this, value);
    };
    StackColumn.prototype.compute = function (row, index) {
        var w = this.getWidth();
        return this._children.reduce(function (acc, d) { return acc + d.getValue(row, index) * (d.getWidth() / w); }, 0);
    };
    StackColumn.prototype.rendererType = function () {
        if (this.getCollapsed() && this.isLoaded()) {
            return StackColumn.COLLAPSED_RENDERER;
        }
        return _super.prototype.getRendererType.call(this);
    };
    /**
     * describe the column if it is a sorting criteria
     * @param toId helper to convert a description to an id
     * @return {string} json compatible
     */
    StackColumn.prototype.toSortingDesc = function (toId) {
        var w = this.getWeights();
        return this._children.map(function (c, i) { return ({ weight: w[i], id: c.toSortingDesc(toId) }); });
    };
    return StackColumn;
}(__WEBPACK_IMPORTED_MODULE_0__CompositeNumberColumn__["a" /* default */]));
/* harmony default export */ __webpack_exports__["a"] = StackColumn;
StackColumn.EVENT_COLLAPSE_CHANGED = 'collapseChanged';
StackColumn.EVENT_WEIGHTS_CHANGED = 'weightsChanged';
StackColumn.COLLAPSED_RENDERER = 'number';


/***/ }),
/* 19 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_d3__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_d3___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_d3__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ValueColumn__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Column__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__BoxPlotColumn__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__utils__ = __webpack_require__(1);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return SORT_METHOD; });
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 * Created by bikramkawan on 24/11/2016.
 */





var SORT_METHOD = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__utils__["a" /* merge */])({
    mean: 'mean'
}, __WEBPACK_IMPORTED_MODULE_3__BoxPlotColumn__["b" /* SORT_METHOD */]);
/**
 * helper class to lazily compute box plotdata out of a given number array
 */
var LazyBoxPlotData = (function () {
    function LazyBoxPlotData(values) {
        this.values = values;
        this._sorted = null;
    }
    Object.defineProperty(LazyBoxPlotData.prototype, "sorted", {
        /**
         * lazy compute sorted array
         * @returns {number[]}
         */
        get: function () {
            if (this._sorted === null) {
                this._sorted = this.values.slice().sort(__WEBPACK_IMPORTED_MODULE_0_d3__["ascending"]);
            }
            return this._sorted;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LazyBoxPlotData.prototype, "min", {
        get: function () {
            return Math.min.apply(Math, this.values);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LazyBoxPlotData.prototype, "max", {
        get: function () {
            return Math.max.apply(Math, this.values);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LazyBoxPlotData.prototype, "median", {
        get: function () {
            return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_d3__["median"])(this.sorted);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LazyBoxPlotData.prototype, "q1", {
        get: function () {
            return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_d3__["quantile"])(this.sorted, 0.25);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LazyBoxPlotData.prototype, "q3", {
        get: function () {
            return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_d3__["quantile"])(this.sorted, 0.75);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(LazyBoxPlotData.prototype, "mean", {
        get: function () {
            return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_d3__["mean"])(this.values);
        },
        enumerable: true,
        configurable: true
    });
    return LazyBoxPlotData;
}());
var MultiValueColumn = (function (_super) {
    __extends(MultiValueColumn, _super);
    function MultiValueColumn(id, desc) {
        var _this = _super.call(this, id, desc) || this;
        _this.domain = desc.domain || [0, 100];
        _this.dataLength = desc.dataLength;
        _this.threshold = desc.threshold || 0;
        _this.colorRange = desc.colorRange || ['blue', 'red'];
        _this.sort = desc.sort || SORT_METHOD.min;
        var rendererList = [{ type: 'multiValue', label: 'Heatmap' },
            { type: 'boxplot', label: 'Boxplot' },
            { type: 'sparkline', label: 'Sparkline' },
            { type: 'threshold', label: 'Threshold' },
            { type: 'verticalbar', label: 'VerticalBar' }];
        _this.setRendererList(rendererList);
        return _this;
    }
    MultiValueColumn.prototype.getColorValues = function () {
        if (this.colorRange.length > 2) {
            return this.colorRange.slice();
        }
        else {
            var minColor = this.colorRange[0];
            var zeroColor = 'white';
            var maxColor = this.colorRange[1];
            return [minColor, zeroColor, maxColor];
        }
    };
    MultiValueColumn.prototype.compare = function (a, b, aIndex, bIndex) {
        return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3__BoxPlotColumn__["c" /* compareBoxPlot */])(this, a, b, aIndex, bIndex);
    };
    MultiValueColumn.prototype.getColorScale = function () {
        var colorScale = __WEBPACK_IMPORTED_MODULE_0_d3__["scale"].linear();
        var colorValues = this.getColorValues();
        if (this.domain[0] < 0) {
            colorScale
                .domain([this.domain[0], 0, this.domain[1]])
                .range(colorValues);
        }
        else {
            colorScale
                .domain([this.domain[0], this.domain[1]])
                .range(colorValues);
        }
        return colorScale;
    };
    MultiValueColumn.prototype.getNumber = function (row, index) {
        return this.getValue(row, index);
    };
    MultiValueColumn.prototype.calculateCellDimension = function (width) {
        return (width / this.dataLength);
    };
    MultiValueColumn.prototype.getSparklineScale = function () {
        var xposScale = __WEBPACK_IMPORTED_MODULE_0_d3__["scale"].linear();
        var yposScale = __WEBPACK_IMPORTED_MODULE_0_d3__["scale"].linear();
        return {
            xScale: xposScale.domain([0, this.dataLength - 1]),
            yScale: yposScale.domain(this.domain)
        };
    };
    MultiValueColumn.prototype.getDomain = function () {
        return this.domain;
    };
    MultiValueColumn.prototype.getThreshold = function () {
        return this.threshold;
    };
    MultiValueColumn.prototype.getVerticalBarScale = function () {
        return __WEBPACK_IMPORTED_MODULE_0_d3__["scale"].linear().domain(this.domain);
    };
    MultiValueColumn.prototype.getBoxPlotData = function (row, index) {
        var data = this.getValue(row, index);
        if (data === null) {
            return null;
        }
        //console.log(data)
        return new LazyBoxPlotData(data);
    };
    MultiValueColumn.prototype.getSortMethod = function () {
        return this.sort;
    };
    MultiValueColumn.prototype.setSortMethod = function (sort) {
        if (this.sort === sort) {
            return;
        }
        this.fire([__WEBPACK_IMPORTED_MODULE_2__Column__["a" /* default */].EVENT_SORTMETHOD_CHANGED], this.sort, this.sort = sort);
        // sort by me if not already sorted by me
        if (this.findMyRanker().getSortCriteria().col !== this) {
            this.sortByMe();
        }
    };
    MultiValueColumn.prototype.dump = function (toDescRef) {
        var r = _super.prototype.dump.call(this, toDescRef);
        r.sortMethod = this.getSortMethod();
        return r;
    };
    MultiValueColumn.prototype.restore = function (dump, factory) {
        _super.prototype.restore.call(this, dump, factory);
        if (dump.sortMethod) {
            this.sort = dump.sortMethod;
        }
    };
    return MultiValueColumn;
}(__WEBPACK_IMPORTED_MODULE_1__ValueColumn__["a" /* default */]));
/* harmony default export */ __webpack_exports__["a"] = MultiValueColumn;


/***/ }),
/* 20 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_d3__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_d3___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_d3__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ValueColumn__ = __webpack_require__(3);
/* harmony export (immutable) */ __webpack_exports__["b"] = createDesc;
/**
 * Created by sam on 04.11.2016.
 */
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};


/**
 * factory for creating a description creating a rank column
 * @param label
 * @returns {{type: string, label: string}}
 */
function createDesc(label) {
    if (label === void 0) { label = 'S'; }
    return { type: 'selection', label: label };
}
/**
 * a checkbox column for selections
 */
var SelectionColumn = (function (_super) {
    __extends(SelectionColumn, _super);
    function SelectionColumn(id, desc) {
        var _this = _super.call(this, id, desc) || this;
        _this.setCompressed(true);
        return _this;
    }
    SelectionColumn.prototype.createEventList = function () {
        return _super.prototype.createEventList.call(this).concat([SelectionColumn.EVENT_SELECT]);
    };
    SelectionColumn.prototype.setValue = function (row, index, value) {
        var old = this.getValue(row, index);
        if (old === value) {
            return true;
        }
        return this.setImpl(row, index, value);
    };
    SelectionColumn.prototype.setImpl = function (row, index, value) {
        if (this.desc.setter) {
            this.desc.setter(row, index, value);
        }
        this.fire(SelectionColumn.EVENT_SELECT, row, value);
        return true;
    };
    SelectionColumn.prototype.toggleValue = function (row, index) {
        var old = this.getValue(row, index);
        this.setImpl(row, index, !old);
        return !old;
    };
    SelectionColumn.prototype.compare = function (a, b, aIndex, bIndex) {
        return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_d3__["ascending"])(this.getValue(a, aIndex), this.getValue(b, bIndex));
    };
    return SelectionColumn;
}(__WEBPACK_IMPORTED_MODULE_1__ValueColumn__["a" /* default */]));
/* harmony default export */ __webpack_exports__["a"] = SelectionColumn;
SelectionColumn.EVENT_SELECT = 'select';


/***/ }),
/* 21 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_d3__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_d3___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_d3__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__utils__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__model__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__model_Column__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__model_CompositeColumn__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__provider_ADataProvider__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__renderer_index__ = __webpack_require__(7);
/* unused harmony export ERenderReason */
/**
 * Created by Samuel Gratzl on 14.08.2015.
 */
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};







var ERenderReason;
(function (ERenderReason) {
    ERenderReason[ERenderReason["DIRTY"] = 0] = "DIRTY";
    ERenderReason[ERenderReason["SCROLLED"] = 1] = "SCROLLED";
})(ERenderReason || (ERenderReason = {}));
var ABodyRenderer = (function (_super) {
    __extends(ABodyRenderer, _super);
    function ABodyRenderer(data, parent, slicer, root, options) {
        if (options === void 0) { options = {}; }
        var _this = _super.call(this) || this;
        _this.data = data;
        _this.slicer = slicer;
        _this.options = {
            rowHeight: 20,
            rowPadding: 1,
            rowBarPadding: 1,
            idPrefix: '',
            slopeWidth: 150,
            columnPadding: 5,
            stacked: true,
            animation: false,
            animationDuration: 1000,
            renderers: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__utils__["a" /* merge */])({}, __WEBPACK_IMPORTED_MODULE_6__renderer_index__["renderers"]),
            meanLine: false,
            actions: [],
            freezeCols: 0
        };
        _this.histCache = new Map();
        //merge options
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__utils__["a" /* merge */])(_this.options, options);
        _this.$node = __WEBPACK_IMPORTED_MODULE_0_d3__["select"](parent).append(root).classed('lu-body', true);
        _this.changeDataStorage(data);
        return _this;
    }
    ABodyRenderer.prototype.createEventList = function () {
        return _super.prototype.createEventList.call(this).concat([ABodyRenderer.EVENT_HOVER_CHANGED, ABodyRenderer.EVENT_RENDER_FINISHED]);
    };
    Object.defineProperty(ABodyRenderer.prototype, "node", {
        get: function () {
            return this.$node.node();
        },
        enumerable: true,
        configurable: true
    });
    ABodyRenderer.prototype.setOption = function (key, value) {
        this.options[key] = value;
    };
    ABodyRenderer.prototype.changeDataStorage = function (data) {
        if (this.data) {
            this.data.on([__WEBPACK_IMPORTED_MODULE_5__provider_ADataProvider__["a" /* default */].EVENT_DIRTY_VALUES + '.bodyRenderer', __WEBPACK_IMPORTED_MODULE_5__provider_ADataProvider__["a" /* default */].EVENT_SELECTION_CHANGED + '.bodyRenderer'], null);
        }
        this.data = data;
        data.on(__WEBPACK_IMPORTED_MODULE_5__provider_ADataProvider__["a" /* default */].EVENT_DIRTY_VALUES + '.bodyRenderer', __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__utils__["d" /* delayedCall */])(this.update.bind(this), 1));
        data.on(__WEBPACK_IMPORTED_MODULE_5__provider_ADataProvider__["a" /* default */].EVENT_SELECTION_CHANGED + '.bodyRenderer', __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__utils__["d" /* delayedCall */])(this.drawSelection.bind(this), 1));
    };
    ABodyRenderer.prototype.showMeanLine = function (col) {
        //show mean line if option is enabled and top level
        return this.options.meanLine && __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__model__["isNumberColumn"])(col) && !col.getCompressed() && col.parent instanceof __WEBPACK_IMPORTED_MODULE_2__model__["Ranking"];
    };
    ABodyRenderer.prototype.fireFinished = function () {
        this.fire(ABodyRenderer.EVENT_RENDER_FINISHED, this);
    };
    ABodyRenderer.prototype.createContext = function (indexShift, creator) {
        var _this = this;
        var options = this.options;
        function findOption(key, defaultValue) {
            if (key in options) {
                return options[key];
            }
            if (key.indexOf('.') > 0) {
                var p = key.substring(0, key.indexOf('.'));
                key = key.substring(key.indexOf('.') + 1);
                if (p in options && key in options[p]) {
                    return options[p][key];
                }
            }
            return defaultValue;
        }
        return {
            cellY: function (index) { return (index + indexShift) * (_this.options.rowHeight); },
            cellPrevY: function (index) { return (index + indexShift) * (_this.options.rowHeight); },
            idPrefix: options.idPrefix,
            option: findOption,
            rowHeight: function () { return options.rowHeight - options.rowPadding; },
            renderer: function (col) {
                return creator(col, options.renderers, this);
            }
        };
    };
    ABodyRenderer.prototype.select = function (dataIndex, additional) {
        if (additional === void 0) { additional = false; }
        return this.data.toggleSelection(dataIndex, additional);
    };
    ABodyRenderer.prototype.fakeHover = function (dataIndex) {
        this.mouseOver(dataIndex, true);
    };
    ABodyRenderer.prototype.mouseOver = function (dataIndex, hover) {
        if (hover === void 0) { hover = true; }
        this.fire(ABodyRenderer.EVENT_HOVER_CHANGED, hover ? dataIndex : -1);
    };
    ABodyRenderer.prototype.scrolled = function () {
        return this.update(ERenderReason.SCROLLED);
    };
    /**
     * render the body
     */
    ABodyRenderer.prototype.update = function (reason) {
        var _this = this;
        if (reason === void 0) { reason = ERenderReason.DIRTY; }
        var rankings = this.data.getRankings();
        var maxElems = __WEBPACK_IMPORTED_MODULE_0_d3__["max"](rankings, function (d) { return d.getOrder().length; }) || 0;
        var height = this.options.rowHeight * maxElems;
        var visibleRange = this.slicer(0, maxElems, function (i) { return i * _this.options.rowHeight; });
        var orderSlicer = function (order) {
            if (visibleRange.from === 0 && order.length <= visibleRange.to) {
                return order;
            }
            return order.slice(visibleRange.from, Math.min(order.length, visibleRange.to));
        };
        var context = this.createContextImpl(visibleRange.from);
        var orders = rankings.map(function (r) { return orderSlicer(r.getOrder()); });
        var data = this.data.fetch(orders);
        var padding = this.options.columnPadding;
        var totalWidth = 0;
        var rdata = rankings.map(function (r, i) {
            var cols = r.children.filter(function (d) { return !d.isHidden(); });
            var rankingShift = totalWidth;
            var width = 0;
            var colData = cols.map(function (o) {
                var colShift = width;
                width += (o.getCompressed() ? __WEBPACK_IMPORTED_MODULE_3__model_Column__["a" /* default */].COMPRESSED_WIDTH : o.getWidth()) + padding;
                if (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__model_CompositeColumn__["a" /* isMultiLevelColumn */])(o) && !o.getCollapsed() && !o.getCompressed()) {
                    width += padding * (o.length - 1);
                }
                return {
                    column: o,
                    renderer: context.renderer(o),
                    shift: colShift
                };
            });
            totalWidth += width;
            totalWidth += _this.options.slopeWidth;
            var frozen = colData.slice(0, _this.options.freezeCols);
            return {
                id: r.id,
                ranking: r,
                order: orders[i],
                shift: rankingShift,
                width: width,
                //compute frozen columns just for the first one
                frozen: frozen,
                frozenWidth: Math.max.apply(Math, (frozen.map(function (d) { return d.shift + d.column.getWidth(); }))),
                columns: colData.slice(_this.options.freezeCols),
                data: data[i]
            };
        });
        //one to often
        totalWidth -= this.options.slopeWidth;
        return this.updateImpl(rdata, context, totalWidth, height, reason).then(this.fireFinished.bind(this));
    };
    return ABodyRenderer;
}(__WEBPACK_IMPORTED_MODULE_1__utils__["c" /* AEventDispatcher */]));
ABodyRenderer.EVENT_HOVER_CHANGED = 'hoverChanged';
ABodyRenderer.EVENT_RENDER_FINISHED = 'renderFinished';
/* harmony default export */ __webpack_exports__["a"] = ABodyRenderer;


/***/ }),
/* 22 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__provider_ADataProvider__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__renderer_index__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ui__ = __webpack_require__(31);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ui_ABodyRenderer__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__utils__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_d3__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_d3___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_d3__);
/* harmony export (immutable) */ __webpack_exports__["b"] = deriveColors;
/**
 * main module of LineUp.js containing the main class and exposes all other modules
 * Created by Samuel Gratzl on 14.08.2015.
 */
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};






/**
 * main LineUp class managing data and rendering
 */
var LineUp = (function (_super) {
    __extends(LineUp, _super);
    function LineUp(container, data, config) {
        if (config === void 0) { config = {}; }
        var _this = _super.call(this) || this;
        _this.data = data;
        /**
         * default config of LineUp with all available options
         */
        _this.config = {
            idPrefix: Math.random().toString(36).slice(-8).substr(0, 3),
            header: {
                headerHeight: 20,
                headerHistogramHeight: 40,
                autoRotateLabels: false,
                rotationHeight: 50,
                rotationDegree: -20,
                rankingButtons: __WEBPACK_IMPORTED_MODULE_2__ui__["dummyRankingButtonHook"],
                linkTemplates: []
            },
            htmlLayout: {},
            renderingOptions: {
                stacked: true,
                animation: true,
                histograms: false,
                meanLine: false,
            },
            body: {
                renderer: 'svg',
                rowHeight: 18,
                rowPadding: 1,
                rowBarPadding: 1,
                visibleRowsOnly: true,
                backupScrollRows: 4,
                animationDuration: 1000,
                freezeCols: 0,
                actions: []
            },
            svgLayout: {},
            manipulative: true,
            pool: false,
            renderers: __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__utils__["a" /* merge */])({}, __WEBPACK_IMPORTED_MODULE_1__renderer_index__["renderers"])
        };
        _this.body = null;
        _this.header = null;
        _this.pools = [];
        _this.contentScroller = null;
        /**
         * local variable that is used by update()
         * @type {boolean}
         */
        _this.isUpdateInitialized = false;
        _this.$container = container instanceof __WEBPACK_IMPORTED_MODULE_5_d3__["selection"] ? container : __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_5_d3__["select"])(container);
        _this.$container = _this.$container.append('div').classed('lu', true);
        _this.config.svgLayout = _this.config.body;
        _this.config.htmlLayout = _this.config.header;
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__utils__["a" /* merge */])(_this.config, config);
        _this.data.on(__WEBPACK_IMPORTED_MODULE_0__provider_ADataProvider__["a" /* default */].EVENT_SELECTION_CHANGED + '.main', _this.triggerSelection.bind(_this));
        _this.data.on(__WEBPACK_IMPORTED_MODULE_0__provider_ADataProvider__["a" /* default */].EVENT_JUMP_TO_NEAREST + '.main', _this.jumpToNearest.bind(_this));
        _this.header = new __WEBPACK_IMPORTED_MODULE_2__ui__["HeaderRenderer"](data, _this.node, __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__utils__["a" /* merge */])({}, _this.config.header, {
            idPrefix: _this.config.idPrefix,
            manipulative: _this.config.manipulative,
            histograms: _this.config.renderingOptions.histograms,
            freezeCols: _this.config.body.freezeCols,
        }));
        _this.body = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__ui__["createBodyRenderer"])(_this.config.body.renderer, data, _this.node, _this.slice.bind(_this), __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__utils__["a" /* merge */])({}, _this.config.body, {
            meanLine: _this.config.renderingOptions.meanLine,
            animation: _this.config.renderingOptions.animation,
            stacked: _this.config.renderingOptions.stacked,
            idPrefix: _this.config.idPrefix,
            renderers: _this.config.renderers
        }));
        //share hist caches
        _this.body.histCache = _this.header.sharedHistCache;
        _this.forward(_this.body, LineUp.EVENT_HOVER_CHANGED);
        if (_this.config.pool && _this.config.manipulative) {
            _this.addPool(new __WEBPACK_IMPORTED_MODULE_2__ui__["PoolRenderer"](data, _this.node, _this.config));
        }
        if (_this.config.body.visibleRowsOnly) {
            _this.contentScroller = new __WEBPACK_IMPORTED_MODULE_4__utils__["b" /* ContentScroller */](_this.$container.node(), _this.body.node, {
                backupRows: _this.config.body.backupScrollRows,
                rowHeight: _this.config.body.rowHeight,
                topShift: function () { return _this.header.currentHeight(); }
            });
            _this.contentScroller.on(__WEBPACK_IMPORTED_MODULE_4__utils__["b" /* ContentScroller */].EVENT_SCROLL, function (top, left) {
                //in two svg mode propagate horizontal shift
                //console.log(top, left,'ss');
                _this.header.$node.style('transform', "translate(0px, " + top + "px)");
                if (_this.config.body.freezeCols > 0) {
                    _this.header.updateFreeze(left);
                    _this.body.updateFreeze(left);
                }
            });
            _this.contentScroller.on(__WEBPACK_IMPORTED_MODULE_4__utils__["b" /* ContentScroller */].EVENT_REDRAW, _this.body.scrolled.bind(_this.body));
        }
        return _this;
    }
    LineUp.prototype.createEventList = function () {
        return _super.prototype.createEventList.call(this).concat([LineUp.EVENT_HOVER_CHANGED, LineUp.EVENT_SELECTION_CHANGED, LineUp.EVENT_MULTISELECTION_CHANGED, LineUp.EVENT_UPDATE_START, LineUp.EVENT_UPDATE_FINISHED]);
    };
    LineUp.prototype.addPool = function (poolOrNode, config) {
        if (config === void 0) { config = this.config; }
        if (poolOrNode instanceof __WEBPACK_IMPORTED_MODULE_2__ui__["PoolRenderer"]) {
            this.pools.push(poolOrNode);
        }
        else {
            this.pools.push(new __WEBPACK_IMPORTED_MODULE_2__ui__["PoolRenderer"](this.data, poolOrNode, config));
        }
        return this.pools[this.pools.length - 1];
    };
    Object.defineProperty(LineUp.prototype, "node", {
        /**
         * returns the main lineup DOM element
         * @returns {Element}
         */
        get: function () {
            return this.$container.node();
        },
        enumerable: true,
        configurable: true
    });
    LineUp.prototype.slice = function (start, length, row2y) {
        if (this.contentScroller) {
            return this.contentScroller.select(start, length, row2y);
        }
        return { from: start, to: length };
    };
    /**
     * destroys the DOM elements created by this lineup instance, this should be the last call to this lineup instance
     */
    LineUp.prototype.destroy = function () {
        this.pools.forEach(function (p) { return p.remove(); });
        this.$container.remove();
        if (this.contentScroller) {
            this.contentScroller.destroy();
        }
    };
    /**
     * sorts LineUp by he given column
     * @param column callback function finding the column to sort
     * @param ascending
     * @returns {boolean}
     */
    LineUp.prototype.sortBy = function (column, ascending) {
        if (ascending === void 0) { ascending = false; }
        var col = this.data.find(column);
        if (col) {
            col.sortByMe(ascending);
        }
        return col !== null;
    };
    LineUp.prototype.dump = function () {
        return this.data.dump();
    };
    LineUp.prototype.changeDataStorage = function (data, dump) {
        if (this.data) {
            this.data.on([__WEBPACK_IMPORTED_MODULE_0__provider_ADataProvider__["a" /* default */].EVENT_SELECTION_CHANGED + '.main', __WEBPACK_IMPORTED_MODULE_0__provider_ADataProvider__["a" /* default */].EVENT_JUMP_TO_NEAREST + '.main'], null);
        }
        this.data = data;
        if (dump) {
            this.data.restore(dump);
        }
        this.data.on(__WEBPACK_IMPORTED_MODULE_0__provider_ADataProvider__["a" /* default */].EVENT_SELECTION_CHANGED + '.main', this.triggerSelection.bind(this));
        this.data.on(__WEBPACK_IMPORTED_MODULE_0__provider_ADataProvider__["a" /* default */].EVENT_JUMP_TO_NEAREST + '.main', this.jumpToNearest.bind(this));
        this.header.changeDataStorage(data);
        this.body.changeDataStorage(data);
        this.pools.forEach(function (p) { return p.changeDataStorage(data); });
        this.update();
    };
    LineUp.prototype.triggerSelection = function (dataIndices) {
        this.fire(LineUp.EVENT_SELECTION_CHANGED, dataIndices.length > 0 ? dataIndices[0] : -1);
        this.fire(LineUp.EVENT_MULTISELECTION_CHANGED, dataIndices);
    };
    LineUp.prototype.jumpToNearest = function (dataIndices) {
        var _this = this;
        var ranking = this.data.getRankings()[0];
        if (dataIndices.length === 0 || ranking === undefined) {
            return;
        }
        var order = ranking.getOrder();
        //relative order
        var indices = dataIndices.map(function (d) { return order.indexOf(d); }).sort(function (a, b) { return a - b; });
        if (this.contentScroller) {
            this.contentScroller.scrollIntoView(0, order.length, indices[0], function (i) { return i * _this.config.body.rowHeight; });
        }
        else {
            var container = this.$container.node();
            container.scrollTop = indices[0] * this.config.body.rowHeight;
        }
        //fake hover in 100ms - TODO right timing
        setTimeout(function () {
            _this.body.fakeHover(order[indices[0]]);
        }, 100);
    };
    LineUp.prototype.restore = function (dump) {
        this.changeDataStorage(this.data, dump);
    };
    LineUp.prototype.update = function () {
        var _this = this;
        // HACK: when calling update for the first time the BodyRenderer
        // fires 3x the `renderFinished` event. However, we want to wait for
        // the last event before firing LineUp.EVENT_UPDATE_FINISHED.
        // For any further call of update() the body render will fire the
        // `renderFinished` event only once
        var waitForBodyRenderer = (this.isUpdateInitialized) ? 1 : 3;
        this.isUpdateInitialized = true;
        this.fire(LineUp.EVENT_UPDATE_START);
        this.header.update();
        this.body.update();
        this.pools.forEach(function (p) { return p.update(); });
        this.body.on(__WEBPACK_IMPORTED_MODULE_3__ui_ABodyRenderer__["a" /* default */].EVENT_RENDER_FINISHED + '.main', function () {
            waitForBodyRenderer -= 1;
            if (waitForBodyRenderer === 0) {
                _this.fire(LineUp.EVENT_UPDATE_FINISHED);
            }
        });
    };
    LineUp.prototype.changeRenderingOption = function (option, value) {
        this.config.renderingOptions[option] = value;
        if (option === 'animation' || option === 'stacked') {
            this.body.setOption(option, value);
            this.body.update();
        }
    };
    return LineUp;
}(__WEBPACK_IMPORTED_MODULE_4__utils__["c" /* AEventDispatcher */]));
/* harmony default export */ __webpack_exports__["a"] = LineUp;
/**
 * triggered when the mouse is over a specific row
 * @argument data_index:number the selected data index or <0 if no row
 */
LineUp.EVENT_HOVER_CHANGED = __WEBPACK_IMPORTED_MODULE_3__ui_ABodyRenderer__["a" /* default */].EVENT_HOVER_CHANGED;
/**
 * triggered when the user click on a row
 * @argument data_index:number the selected data index or <0 if no row
 */
LineUp.EVENT_SELECTION_CHANGED = __WEBPACK_IMPORTED_MODULE_0__provider_ADataProvider__["a" /* default */].EVENT_SELECTION_CHANGED;
/**
 * triggered when the user selects one or more rows
 * @argument dataIndices:number[] the selected data indices
 */
LineUp.EVENT_MULTISELECTION_CHANGED = 'multiSelectionChanged';
/**
 * triggered when LineUpJS.update() was called
 */
LineUp.EVENT_UPDATE_START = 'updateStart';
/**
 * triggered when LineUpJS.update() was called and the rendering the body has finished
 */
LineUp.EVENT_UPDATE_FINISHED = 'updateFinished';
/**
 * assigns colors to columns if they are numbers and not yet defined
 * @param columns
 * @returns {IColumnDesc[]}
 */
function deriveColors(columns) {
    var colors = __WEBPACK_IMPORTED_MODULE_5_d3__["scale"].category10().range().slice();
    columns.forEach(function (col) {
        switch (col.type) {
            case 'number':
                col.color = colors.shift();
                break;
        }
    });
    return columns;
}


/***/ }),
/* 23 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Column__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__StringColumn__ = __webpack_require__(6);
/**
 * Created by sam on 04.11.2016.
 */
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};


/**
 * a string column in which the label is a text but the value a link
 */
var LinkColumn = (function (_super) {
    __extends(LinkColumn, _super);
    function LinkColumn(id, desc) {
        var _this = _super.call(this, id, desc) || this;
        /**
         * a pattern used for generating the link, $1 is replaced with the actual value
         * @type {null}
         */
        _this.link = null;
        _this.link = desc.link;
        return _this;
    }
    Object.defineProperty(LinkColumn.prototype, "headerCssClass", {
        get: function () {
            return this.link == null ? 'link' : 'link link_pattern';
        },
        enumerable: true,
        configurable: true
    });
    LinkColumn.prototype.createEventList = function () {
        return _super.prototype.createEventList.call(this).concat([LinkColumn.EVENT_LINK_CHANGED]);
    };
    LinkColumn.prototype.setLink = function (link) {
        /* tslint:disable */
        if (link == this.link) {
            return;
        }
        /* tslint:enable */
        this.fire([LinkColumn.EVENT_LINK_CHANGED, __WEBPACK_IMPORTED_MODULE_0__Column__["a" /* default */].EVENT_DIRTY_HEADER, __WEBPACK_IMPORTED_MODULE_0__Column__["a" /* default */].EVENT_DIRTY_VALUES, __WEBPACK_IMPORTED_MODULE_0__Column__["a" /* default */].EVENT_DIRTY], this.link, this.link = link);
    };
    LinkColumn.prototype.getLink = function () {
        return this.link || '';
    };
    LinkColumn.prototype.dump = function (toDescRef) {
        var r = _super.prototype.dump.call(this, toDescRef);
        /* tslint:disable */
        if (this.link != this.desc.link) {
            r.link = this.link;
        }
        /* tslint:enable */
        return r;
    };
    LinkColumn.prototype.restore = function (dump, factory) {
        _super.prototype.restore.call(this, dump, factory);
        if (dump.link) {
            this.link = dump.link;
        }
    };
    LinkColumn.prototype.getLabel = function (row, index) {
        var v = _super.prototype.getRaw.call(this, row, index);
        if (v && v.alt) {
            return v.alt;
        }
        return '' + v;
    };
    LinkColumn.prototype.isLink = function (row, index) {
        if (this.link) {
            return true;
        }
        //get original value
        var v = _super.prototype.getRaw.call(this, row, index);
        //convert to link
        return v && v.href != null;
    };
    LinkColumn.prototype.getValue = function (row, index) {
        //get original value
        var v = _super.prototype.getRaw.call(this, row, index);
        //convert to link
        if (v && v.href) {
            return v.href;
        }
        else if (this.link) {
            return this.link.replace(/\$1/g, v || '');
        }
        return v;
    };
    return LinkColumn;
}(__WEBPACK_IMPORTED_MODULE_1__StringColumn__["a" /* default */]));
/* harmony default export */ __webpack_exports__["a"] = LinkColumn;
LinkColumn.EVENT_LINK_CHANGED = 'linkChanged';


/***/ }),
/* 24 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_d3__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_d3___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_d3__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__CompositeNumberColumn__ = __webpack_require__(11);
/* harmony export (immutable) */ __webpack_exports__["b"] = createDesc;
/**
 * Created by sam on 04.11.2016.
 */
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};


/**
 *  factory for creating a description creating a max column
 * @param label
 * @returns {{type: string, label: string}}
 */
function createDesc(label) {
    if (label === void 0) { label = 'Max'; }
    return { type: 'max', label: label };
}
/**
 * combines multiple columns by using the maximal value
 */
var MaxColumn = (function (_super) {
    __extends(MaxColumn, _super);
    function MaxColumn() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MaxColumn.prototype.getColor = function (row, index) {
        //compute the index of the maximal one
        var c = this._children;
        if (c.length === 0) {
            return this.color;
        }
        var maxIndex = 0, maxValue = c[0].getValue(row, index);
        for (var i = 1; i < c.length; ++i) {
            var v = c[i].getValue(row, index);
            if (v > maxValue) {
                maxIndex = i;
                maxValue = v;
            }
        }
        return c[maxIndex].color;
    };
    MaxColumn.prototype.compute = function (row, index) {
        return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_d3__["max"])(this._children, function (d) { return d.getValue(row, index); });
    };
    /**
     * describe the column if it is a sorting criteria
     * @param toId helper to convert a description to an id
     * @return {string} json compatible
     */
    MaxColumn.prototype.toSortingDesc = function (toId) {
        return {
            operation: 'max',
            operands: this._children.map(function (c) { return c.toSortingDesc(toId); })
        };
    };
    return MaxColumn;
}(__WEBPACK_IMPORTED_MODULE_1__CompositeNumberColumn__["a" /* default */]));
/* harmony default export */ __webpack_exports__["a"] = MaxColumn;


/***/ }),
/* 25 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_d3__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_d3___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_d3__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__CompositeNumberColumn__ = __webpack_require__(11);
/* harmony export (immutable) */ __webpack_exports__["b"] = createDesc;
/**
 * Created by sam on 04.11.2016.
 */
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};


/**
 * factory for creating a description creating a mean column
 * @param label
 * @returns {{type: string, label: string}}
 */
function createDesc(label) {
    if (label === void 0) { label = 'Mean'; }
    return { type: 'mean', label: label };
}
var MeanColumn = (function (_super) {
    __extends(MeanColumn, _super);
    function MeanColumn() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MeanColumn.prototype.compute = function (row, index) {
        return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_d3__["mean"])(this._children, function (d) { return d.getValue(row, index); });
    };
    /**
     * describe the column if it is a sorting criteria
     * @param toId helper to convert a description to an id
     * @return {string} json compatible
     */
    MeanColumn.prototype.toSortingDesc = function (toId) {
        return {
            operation: 'avg',
            operands: this._children.map(function (c) { return c.toSortingDesc(toId); })
        };
    };
    return MeanColumn;
}(__WEBPACK_IMPORTED_MODULE_1__CompositeNumberColumn__["a" /* default */]));
/* harmony default export */ __webpack_exports__["a"] = MeanColumn;


/***/ }),
/* 26 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_d3__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_d3___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_d3__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__CompositeNumberColumn__ = __webpack_require__(11);
/* harmony export (immutable) */ __webpack_exports__["b"] = createDesc;
/**
 * Created by sam on 04.11.2016.
 */
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};


/**
 * factory for creating a description creating a min column
 * @param label
 * @returns {{type: string, label: string}}
 */
function createDesc(label) {
    if (label === void 0) { label = 'Min'; }
    return { type: 'min', label: label };
}
var MinColumn = (function (_super) {
    __extends(MinColumn, _super);
    function MinColumn() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MinColumn.prototype.getColor = function (row, index) {
        //compute the index of the maximal one
        var c = this._children;
        if (c.length === 0) {
            return this.color;
        }
        var minIndex = 0, minValue = c[0].getValue(row, index);
        for (var i = 1; i < c.length; ++i) {
            var v = c[i].getValue(row, index);
            if (v < minValue) {
                minIndex = i;
                minValue = v;
            }
            i++;
        }
        return c[minIndex].color;
    };
    MinColumn.prototype.compute = function (row, index) {
        return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_d3__["min"])(this._children, function (d) { return d.getValue(row, index); });
    };
    /**
     * describe the column if it is a sorting criteria
     * @param toId helper to convert a description to an id
     * @return {string} json compatible
     */
    MinColumn.prototype.toSortingDesc = function (toId) {
        return {
            operation: 'min',
            operands: this._children.map(function (c) { return c.toSortingDesc(toId); })
        };
    };
    return MinColumn;
}(__WEBPACK_IMPORTED_MODULE_1__CompositeNumberColumn__["a" /* default */]));
/* harmony default export */ __webpack_exports__["a"] = MinColumn;


/***/ }),
/* 27 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__MultiLevelCompositeColumn__ = __webpack_require__(52);
/* harmony export (immutable) */ __webpack_exports__["b"] = createDesc;
/**
 * Created by sam on 04.11.2016.
 */
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};

/**
 * factory for creating a description creating a mean column
 * @param label
 * @returns {{type: string, label: string}}
 */
function createDesc(label) {
    if (label === void 0) { label = 'Nested'; }
    return { type: 'nested', label: label };
}
/**
 * a nested column is a composite column where the sorting order is determined by the nested ordering of the children
 * i.e., sort by the first child if equal sort by the second child,...
 */
var NestedColumn = (function (_super) {
    __extends(NestedColumn, _super);
    function NestedColumn() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    NestedColumn.prototype.compare = function (a, b, aIndex, bIndex) {
        var c = this.children;
        for (var _i = 0, c_1 = c; _i < c_1.length; _i++) {
            var ci = c_1[_i];
            var ciResult = ci.compare(a, b, aIndex, bIndex);
            if (ciResult !== 0) {
                return ciResult;
            }
        }
        return 0;
    };
    NestedColumn.prototype.getLabel = function (row, index) {
        return this.children.map(function (d) { return d.getLabel(row, index); }).join(';');
    };
    NestedColumn.prototype.getValue = function (row, index) {
        return this.children.map(function (d) { return d.getValue(row, index); }).join(';');
    };
    return NestedColumn;
}(__WEBPACK_IMPORTED_MODULE_0__MultiLevelCompositeColumn__["a" /* default */]));
/* harmony default export */ __webpack_exports__["a"] = NestedColumn;


/***/ }),
/* 28 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils__ = __webpack_require__(1);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DefaultCellRenderer; });

/**
 * default renderer instance rendering the value as a text
 */
var DefaultCellRenderer = (function () {
    /**
     * @param textClass {string} class to append to the text elements
     * @param align {string} the text alignment: left, center, right
     */
    function DefaultCellRenderer(textClass, align) {
        if (textClass === void 0) { textClass = 'text'; }
        if (align === void 0) { align = 'left'; }
        this.textClass = textClass;
        this.align = align;
        this.textClass = textClass;
        this.align = align;
    }
    DefaultCellRenderer.prototype.createSVG = function (col, context) {
        var _this = this;
        return {
            template: "<text class=\"" + this.textClass + "\" clip-path=\"url(#cp" + context.idPrefix + "clipCol" + col.id + ")\"></text>",
            update: function (n, d) {
                var alignmentShift = 2;
                if (_this.align === 'right') {
                    alignmentShift = col.getWidth() - 5;
                }
                else if (_this.align === 'center') {
                    alignmentShift = col.getWidth() * 0.5;
                }
                __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utils__["h" /* attr */])(n, {
                    x: alignmentShift
                });
                n.textContent = col.getLabel(d.v, d.dataIndex);
            }
        };
    };
    DefaultCellRenderer.prototype.createHTML = function (col, context) {
        return {
            template: "<div class=\"" + this.textClass + " " + this.align + "\"></div>",
            update: function (n, d) {
                __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utils__["h" /* attr */])(n, {}, {
                    width: col.getWidth() + "px"
                });
                n.textContent = col.getLabel(d.v, d.dataIndex);
            }
        };
    };
    DefaultCellRenderer.prototype.createCanvas = function (col, context) {
        var _this = this;
        return function (ctx, d) {
            var bak = ctx.textAlign;
            ctx.textAlign = _this.align;
            var w = col.getWidth();
            var shift = 0;
            if (_this.align === 'center') {
                shift = w / 2;
            }
            else if (_this.align === 'right') {
                shift = w;
            }
            __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utils__["g" /* clipText */])(ctx, col.getLabel(d.v, d.dataIndex), shift, 0, w, context.textHints);
            ctx.textAlign = bak;
        };
    };
    return DefaultCellRenderer;
}());



/***/ }),
/* 29 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_d3__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_d3___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_d3__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__utils__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ABodyRenderer__ = __webpack_require__(21);
/**
 * Created by Samuel Gratzl on 14.08.2015.
 */
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};



var ABodyDOMRenderer = (function (_super) {
    __extends(ABodyDOMRenderer, _super);
    function ABodyDOMRenderer(data, parent, slicer, domMapping, options) {
        if (options === void 0) { options = {}; }
        var _this = _super.call(this, data, parent, slicer, domMapping.root, options) || this;
        _this.domMapping = domMapping;
        _this.currentFreezeLeft = 0;
        return _this;
    }
    ABodyDOMRenderer.prototype.animated = function ($rows) {
        if (this.options.animationDuration > 0 && this.options.animation) {
            return $rows.transition().duration(this.options.animationDuration);
        }
        return $rows;
    };
    ABodyDOMRenderer.prototype.renderRankings = function ($body, data, context, height) {
        var _this = this;
        var that = this;
        var domMapping = this.domMapping;
        var g = this.domMapping.g;
        var $rankings = $body.selectAll(g + '.ranking').data(data, function (d) { return d.id; });
        var $rankingsEnter = $rankings.enter().append(g)
            .attr('class', 'ranking')
            .call(domMapping.transform, function (d) { return [d.shift, 0]; });
        $rankingsEnter.append(g).attr('class', 'rows');
        $rankingsEnter.append(g).attr('class', 'meanlines').attr('clip-path', "url(#c" + this.options.idPrefix + "Freeze)");
        //animated shift
        this.animated($rankings).call(domMapping.transform, function (d, i) { return [d.shift, 0]; });
        var toWait = [];
        {
            var $rows = $rankings.select(g + '.rows').selectAll(g + '.row').data(function (d) { return d.order; }, String);
            var $rowsEnter = $rows.enter().append(g).attr('class', 'row');
            $rowsEnter.call(domMapping.transform, function (d, i) { return [0, context.cellPrevY(i)]; });
            $rowsEnter.append(domMapping.bg).attr('class', 'bg');
            $rowsEnter
                .on('mouseenter', function (d) { return _this.mouseOver(d, true); })
                .on('mouseleave', function (d) { return _this.mouseOver(d, false); })
                .on('click', function (d) { return _this.select(d, __WEBPACK_IMPORTED_MODULE_0_d3__["event"].ctrlKey); });
            //create templates
            var createTemplates_1 = function (node, columns) {
                __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__utils__["i" /* matchColumns */])(node, columns);
                //set transform
                columns.forEach(function (col, ci) {
                    var cnode = node.childNodes[ci];
                    domMapping.translate(cnode, col.shift, 0);
                });
            };
            $rowsEnter.append(g).attr('class', 'cols').attr('clip-path', "url(#c" + this.options.idPrefix + "Freeze)").each(function (d, i, j) {
                createTemplates_1(this, data[j].columns);
            });
            $rowsEnter.append(g).attr('class', 'frozen').call(this.domMapping.transform, function () { return [_this.currentFreezeLeft, 0]; }).each(function (d, i, j) {
                createTemplates_1(this, data[j].frozen);
            });
            $rows
                .attr('class', function (d, i) { return 'row ' + (i % 2 === 0 ? 'even' : ''); })
                .attr('data-data-index', function (d) { return d; })
                .classed('selected', function (d) { return _this.data.isSelected(d); });
            //.classed('highlighted', (d) => this.data.isHighlighted(d.d));
            //animated reordering
            this.animated($rows).call(domMapping.transform, function (d, i) { return [0, context.cellY(i)]; });
            //update background helper
            $rows.select(domMapping.bg).attr('class', 'bg')
                .call(domMapping.updateBG, function (d, i, j) { return [data[j].width, context.rowHeight(i)]; });
            var updateColumns_1 = function (node, r, i, columns) {
                //update nodes and create templates
                return r.data[i].then(function (row) {
                    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__utils__["i" /* matchColumns */])(node, columns);
                    columns.forEach(function (col, ci) {
                        var cnode = node.childNodes[ci];
                        domMapping.translate(cnode, col.shift, 0);
                        col.renderer.update(cnode, row, i);
                    });
                });
            };
            //update columns
            $rows.select(g + '.cols').each(function (d, i, j) {
                toWait.push(updateColumns_1(this, data[j], i, data[j].columns));
            });
            //order for frozen in html + set the size in html to have a proper background instead of a clip-path
            var maxFrozen_1 = data.length === 0 || data[0].frozen.length === 0 ? 0 : __WEBPACK_IMPORTED_MODULE_0_d3__["max"](data[0].frozen, function (f) { return f.shift + f.column.getWidth(); });
            $rows.select(g + '.frozen').each(function (d, i, j) {
                domMapping.setSize(this, maxFrozen_1, that.options.rowHeight);
                toWait.push(updateColumns_1(this, data[j], i, data[j].frozen));
            });
            $rows.exit().remove();
        }
        {
            var $meanlines = $rankings.select(g + '.meanlines').selectAll(domMapping.meanLine + '.meanline').data(function (d) { return d.columns.filter(function (c) { return _this.showMeanLine(c.column); }); });
            $meanlines.enter().append(domMapping.meanLine).attr('class', 'meanline');
            $meanlines.each(function (d) {
                var h = that.histCache.get(d.column.id);
                var $mean = __WEBPACK_IMPORTED_MODULE_0_d3__["select"](this);
                if (!h) {
                    return;
                }
                h.then(function (stats) {
                    var xPos = d.shift + d.column.getWidth() * stats.mean;
                    domMapping.updateMeanLine($mean, isNaN(xPos) ? 0 : xPos, height);
                });
            });
            $meanlines.exit().remove();
        }
        $rankings.exit().remove();
        return Promise.all(toWait);
    };
    ABodyDOMRenderer.prototype.select = function (dataIndex, additional) {
        if (additional === void 0) { additional = false; }
        var selected = _super.prototype.select.call(this, dataIndex, additional);
        this.$node.selectAll("[data-data-index=\"" + dataIndex + "\"]").classed('selected', selected);
        return selected;
    };
    ABodyDOMRenderer.prototype.drawSelection = function () {
        var indices = this.data.getSelection();
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__utils__["j" /* forEach */])(this.node, '.selected', function (d) { return d.classList.remove('selected'); });
        if (indices.length === 0) {
            return;
        }
        else {
            var q = indices.map(function (d) { return "[data-data-index='" + d + "']"; }).join(',');
            __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__utils__["j" /* forEach */])(this.node, q, function (d) { return d.classList.add('selected'); });
        }
    };
    ABodyDOMRenderer.prototype.mouseOver = function (dataIndex, hover) {
        if (hover === void 0) { hover = true; }
        _super.prototype.mouseOver.call(this, dataIndex, hover);
        function setClass(item) {
            item.classList.add('hover');
        }
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__utils__["j" /* forEach */])(this.node, '.hover', function (d) { return d.classList.remove('hover'); });
        if (hover) {
            __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__utils__["j" /* forEach */])(this.node, "[data-data-index='" + dataIndex + "']", setClass);
        }
    };
    ABodyDOMRenderer.prototype.renderSlopeGraphs = function ($parent, data, context, height) {
        var _this = this;
        var slopes = data.slice(1).map(function (d, i) { return ({ left: data[i].order, left_i: i, right: d.order, right_i: i + 1 }); });
        var $slopes = $parent.selectAll(this.domMapping.slopes + '.slopegraph').data(slopes);
        $slopes.enter().append(this.domMapping.slopes).attr('class', 'slopegraph');
        //$slopes.attr('transform', (d, i) => `translate(${(shifts[i + 1].shift - this.options.slopeWidth)},0)`);
        $slopes.call(this.domMapping.updateSlopes, this.options.slopeWidth, height, function (d, i) { return ((data[i + 1].shift - _this.options.slopeWidth)); });
        var $lines = $slopes.selectAll('line.slope').data(function (d) {
            var cache = new Map();
            d.right.forEach(function (dataIndex, pos) { return cache.set(dataIndex, pos); });
            return d.left.map(function (dataIndex, pos) { return ({
                dataIndex: dataIndex,
                lpos: pos,
                rpos: cache.get(dataIndex)
            }); }).filter(function (d) { return d.rpos != null; });
        });
        $lines.enter().append('line').attr({
            'class': 'slope',
            x2: this.options.slopeWidth
        }).on('mouseenter', function (d) { return _this.mouseOver(d.dataIndex, true); })
            .on('mouseleave', function (d) { return _this.mouseOver(d.dataIndex, false); });
        $lines.attr('data-data-index', function (d) { return d.dataIndex; });
        $lines.attr({
            y1: function (d) { return context.rowHeight(d.lpos) * 0.5 + context.cellY(d.lpos); },
            y2: function (d) { return context.rowHeight(d.rpos) * 0.5 + context.cellY(d.rpos); }
        });
        $lines.exit().remove();
        $slopes.exit().remove();
    };
    ABodyDOMRenderer.prototype.updateFreeze = function (left) {
        var _this = this;
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__utils__["j" /* forEach */])(this.node, this.domMapping.g + '.row .frozen', function (row) {
            _this.domMapping.translate(row, left, 0);
        });
        var item = this.node.querySelector("clipPath#c" + this.options.idPrefix + "Freeze");
        if (item) {
            this.domMapping.translate(item, left, 0);
        }
        this.currentFreezeLeft = left;
    };
    ABodyDOMRenderer.prototype.createContextImpl = function (indexShift) {
        return this.createContext(indexShift, this.domMapping.creator);
    };
    ABodyDOMRenderer.prototype.updateImpl = function (data, context, width, height, reason) {
        // - ... added one to often
        this.domMapping.setSize(this.node, Math.max(0, width), height);
        var $body = this.$node.select(this.domMapping.g + '.body');
        if ($body.empty()) {
            $body = this.$node.append(this.domMapping.g).classed('body', true);
        }
        this.renderSlopeGraphs($body, data, context, height);
        this.updateClipPaths(data, context, height);
        return this.renderRankings($body, data, context, height);
    };
    return ABodyDOMRenderer;
}(__WEBPACK_IMPORTED_MODULE_2__ABodyRenderer__["a" /* default */]));
/* harmony default export */ __webpack_exports__["a"] = ABodyDOMRenderer;


/***/ }),
/* 30 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_d3__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_d3___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_d3__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__utils__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__model_Column__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__model_StringColumn__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__model_Ranking__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__model_CompositeColumn__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__model_NumberColumn__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__model_CategoricalColumn__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__model_RankColumn__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__model_StackColumn__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__model_LinkColumn__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__model_ScriptColumn__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__provider_ADataProvider__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__model_MultiValueColumn__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__model_BoxPlotColumn__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__dialogs_SearchDialog__ = __webpack_require__(43);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__dialogs_RenameDialog__ = __webpack_require__(40);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__dialogs_EditLinkDialog__ = __webpack_require__(38);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__dialogs_RendererTypeDialog__ = __webpack_require__(41);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__dialogs_WeightsEditDialog__ = __webpack_require__(46);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20__dialogs_SortDialog__ = __webpack_require__(44);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21__dialogs_StringFilterDialog__ = __webpack_require__(45);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_22__dialogs_BooleanFilterDialog__ = __webpack_require__(35);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_23__dialogs_CategoricalFilterDialog__ = __webpack_require__(36);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_24__dialogs_MappingsFilterDialog__ = __webpack_require__(39);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_25__dialogs_CategoricalMappingFilterDialog__ = __webpack_require__(37);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_26__dialogs_ScriptEditDialog__ = __webpack_require__(42);
/* harmony export (immutable) */ __webpack_exports__["c"] = toFullTooltip;
/* harmony export (immutable) */ __webpack_exports__["b"] = dummyRankingButtonHook;
/**
 * Created by Samuel Gratzl on 14.08.2015.
 */



























/**
 * utility function to generate the tooltip text with description
 * @param col the column
 */
function toFullTooltip(col) {
    var base = col.label;
    if (col.description != null && col.description !== '') {
        base += '\n' + col.description;
    }
    return base;
}
function dummyRankingButtonHook() {
    return null;
}
function countMultiLevel(c) {
    if (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_5__model_CompositeColumn__["a" /* isMultiLevelColumn */])(c) && !c.getCollapsed() && !c.getCompressed()) {
        return 1 + Math.max.apply(Math, c.children.map(countMultiLevel));
    }
    return 1;
}
var HeaderRenderer = (function () {
    function HeaderRenderer(data, parent, options) {
        var _this = this;
        this.data = data;
        this.options = {
            idPrefix: '',
            slopeWidth: 150,
            columnPadding: 5,
            headerHistogramHeight: 40,
            headerHeight: 20,
            manipulative: true,
            histograms: false,
            filters: {
                'string': __WEBPACK_IMPORTED_MODULE_21__dialogs_StringFilterDialog__["a" /* default */],
                'boolean': __WEBPACK_IMPORTED_MODULE_22__dialogs_BooleanFilterDialog__["a" /* default */],
                'categorical': __WEBPACK_IMPORTED_MODULE_23__dialogs_CategoricalFilterDialog__["a" /* default */],
                'number': __WEBPACK_IMPORTED_MODULE_24__dialogs_MappingsFilterDialog__["a" /* default */],
                'ordinal': __WEBPACK_IMPORTED_MODULE_25__dialogs_CategoricalMappingFilterDialog__["a" /* default */]
            },
            linkTemplates: [],
            searchAble: function (col) { return col instanceof __WEBPACK_IMPORTED_MODULE_3__model_StringColumn__["a" /* default */]; },
            sortOnLabel: true,
            autoRotateLabels: false,
            rotationHeight: 50,
            rotationDegree: -20,
            freezeCols: 0,
            rankingButtons: dummyRankingButtonHook
        };
        this.histCache = new Map();
        this.dragHandler = __WEBPACK_IMPORTED_MODULE_0_d3__["behavior"].drag()
            .on('dragstart', function () {
            __WEBPACK_IMPORTED_MODULE_0_d3__["select"](this).classed('dragging', true);
            __WEBPACK_IMPORTED_MODULE_0_d3__["event"].sourceEvent.stopPropagation();
            __WEBPACK_IMPORTED_MODULE_0_d3__["event"].sourceEvent.preventDefault();
        })
            .on('drag', function (d) {
            //the new width
            var newValue = Math.max(__WEBPACK_IMPORTED_MODULE_0_d3__["mouse"](this.parentNode)[0], 2);
            d.setWidth(newValue);
            __WEBPACK_IMPORTED_MODULE_0_d3__["event"].sourceEvent.stopPropagation();
            __WEBPACK_IMPORTED_MODULE_0_d3__["event"].sourceEvent.preventDefault();
        })
            .on('dragend', function () {
            __WEBPACK_IMPORTED_MODULE_0_d3__["select"](this).classed('dragging', false);
            __WEBPACK_IMPORTED_MODULE_0_d3__["event"].sourceEvent.stopPropagation();
            __WEBPACK_IMPORTED_MODULE_0_d3__["event"].sourceEvent.preventDefault();
        });
        this.dropHandler = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__utils__["l" /* dropAble */])(['application/caleydo-lineup-column-ref', 'application/caleydo-lineup-column'], function (data, d, copy) {
            var col = null;
            if ('application/caleydo-lineup-column-ref' in data) {
                var id = data['application/caleydo-lineup-column-ref'];
                col = _this.data.find(id);
                if (copy) {
                    col = _this.data.clone(col);
                }
                else {
                    col.removeMe();
                }
            }
            else {
                var desc = JSON.parse(data['application/caleydo-lineup-column']);
                col = _this.data.create(_this.data.fromDescRef(desc));
            }
            if (d instanceof __WEBPACK_IMPORTED_MODULE_2__model_Column__["a" /* default */]) {
                return d.insertAfterMe(col) != null;
            }
            else {
                var r = _this.data.getLastRanking();
                return r.push(col) !== null;
            }
        });
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__utils__["a" /* merge */])(this.options, options);
        this.$node = __WEBPACK_IMPORTED_MODULE_0_d3__["select"](parent).append('div').classed('lu-header', true);
        this.$node.append('div').classed('drop', true).call(this.dropHandler);
        this.changeDataStorage(data);
    }
    HeaderRenderer.prototype.changeDataStorage = function (data) {
        var _this = this;
        if (this.data) {
            this.data.on([__WEBPACK_IMPORTED_MODULE_12__provider_ADataProvider__["a" /* default */].EVENT_DIRTY_HEADER + '.headerRenderer', __WEBPACK_IMPORTED_MODULE_12__provider_ADataProvider__["a" /* default */].EVENT_ORDER_CHANGED + '.headerRenderer', __WEBPACK_IMPORTED_MODULE_12__provider_ADataProvider__["a" /* default */].EVENT_SELECTION_CHANGED + '.headerRenderer'], null);
        }
        this.data = data;
        data.on(__WEBPACK_IMPORTED_MODULE_12__provider_ADataProvider__["a" /* default */].EVENT_DIRTY_HEADER + '.headerRenderer', __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__utils__["d" /* delayedCall */])(this.update.bind(this), 1));
        if (this.options.histograms) {
            data.on(__WEBPACK_IMPORTED_MODULE_12__provider_ADataProvider__["a" /* default */].EVENT_ORDER_CHANGED + '.headerRenderer', function () {
                _this.updateHist();
                _this.update();
            });
            data.on(__WEBPACK_IMPORTED_MODULE_12__provider_ADataProvider__["a" /* default */].EVENT_SELECTION_CHANGED + '.headerRenderer', __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__utils__["d" /* delayedCall */])(this.drawSelection.bind(this), 1));
        }
    };
    Object.defineProperty(HeaderRenderer.prototype, "sharedHistCache", {
        get: function () {
            return this.histCache;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * defines the current header height in pixel
     * @returns {number}
     */
    HeaderRenderer.prototype.currentHeight = function () {
        return parseInt(this.$node.style('height'), 10);
    };
    HeaderRenderer.prototype.updateHist = function () {
        var _this = this;
        var rankings = this.data.getRankings();
        rankings.forEach(function (ranking) {
            var order = ranking.getOrder();
            var cols = ranking.flatColumns;
            var histo = order == null ? null : _this.data.stats(order);
            cols.filter(function (d) { return d instanceof __WEBPACK_IMPORTED_MODULE_6__model_NumberColumn__["b" /* default */] && !d.isHidden(); }).forEach(function (col) {
                _this.histCache.set(col.id, histo === null ? null : histo.stats(col));
            });
            cols.filter(function (d) { return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_7__model_CategoricalColumn__["b" /* isCategoricalColumn */])(d) && !d.isHidden(); }).forEach(function (col) {
                _this.histCache.set(col.id, histo === null ? null : histo.hist(col));
            });
        });
    };
    /**
     * update the selection in the histograms
     */
    HeaderRenderer.prototype.drawSelection = function () {
        var _this = this;
        if (!this.options.histograms) {
            return;
        }
        //highlight the bins in the histograms
        var node = this.$node.node();
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__utils__["j" /* forEach */])(node, 'div.bar', function (d) { return d.classList.remove('selected'); });
        var indices = this.data.getSelection();
        if (indices.length <= 0) {
            return;
        }
        this.data.view(indices).then(function (data) {
            //get the data
            var rankings = _this.data.getRankings();
            rankings.forEach(function (ranking) {
                var cols = ranking.flatColumns;
                //find all number histograms
                cols.filter(function (d) { return d instanceof __WEBPACK_IMPORTED_MODULE_6__model_NumberColumn__["b" /* default */] && !d.isHidden(); }).forEach(function (col) {
                    var bars = [].slice.call(node.querySelectorAll("div.header[data-id=\"" + col.id + "\"] div.bar"));
                    data.forEach(function (d, i) {
                        var v = col.getValue(d, indices[i]);
                        //choose the right bin
                        for (var i_1 = 1; i_1 < bars.length; ++i_1) {
                            var bar = bars[i_1];
                            if (bar.dataset.x > v) {
                                bars[i_1 - 1].classList.add('selected');
                                break;
                            }
                            else if (i_1 === bars.length - 1) {
                                bar.classList.add('selected');
                                break;
                            }
                        }
                    });
                });
                cols.filter(function (d) { return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_7__model_CategoricalColumn__["b" /* isCategoricalColumn */])(d) && !d.isHidden(); }).forEach(function (col) {
                    var header = node.querySelector("div.header[data-id=\"" + col.id + "\"]");
                    data.forEach(function (d, i) {
                        var cats = col.getCategories(d, indices[i]);
                        (cats || []).forEach(function (cat) {
                            header.querySelector("div.bar[data-cat=\"" + cat + "\"]").classList.add('selected');
                        });
                    });
                });
            });
        });
    };
    HeaderRenderer.prototype.renderRankingButtons = function (rankings, rankingsOffsets) {
        var $rankingbuttons = this.$node.selectAll('div.rankingbuttons').data(rankings);
        $rankingbuttons.enter().append('div')
            .classed('rankingbuttons', true)
            .call(this.options.rankingButtons);
        $rankingbuttons.style('left', function (d, i) { return rankingsOffsets[i] + 'px'; });
        $rankingbuttons.exit().remove();
    };
    HeaderRenderer.prototype.update = function () {
        var _this = this;
        var that = this;
        var rankings = this.data.getRankings();
        var shifts = [], rankingOffsets = [];
        var totalWidth = 0;
        rankings.forEach(function (ranking) {
            totalWidth += ranking.flatten(shifts, totalWidth, 1, _this.options.columnPadding) + _this.options.slopeWidth;
            rankingOffsets.push(totalWidth - _this.options.slopeWidth);
        });
        //real width
        totalWidth -= this.options.slopeWidth;
        // fix for #179
        this.$node.select('div.drop').style('width', totalWidth + 'px');
        var columns = shifts.map(function (d) { return d.col; });
        //update all if needed
        if (this.options.histograms && this.histCache.size === 0 && rankings.length > 0) {
            this.updateHist();
        }
        this.renderColumns(columns, shifts);
        if (this.options.rankingButtons !== dummyRankingButtonHook) {
            this.renderRankingButtons(rankings, rankingOffsets);
        }
        var levels = Math.max.apply(Math, columns.map(countMultiLevel));
        var height = (this.options.histograms ? this.options.headerHistogramHeight : this.options.headerHeight) + (levels - 1) * this.options.headerHeight;
        if (this.options.autoRotateLabels) {
            //check if we have overflows
            var rotatedAny_1 = false;
            this.$node.selectAll('div.header')
                .style('height', height + 'px').select('div.lu-label').each(function (d) {
                var w = this.querySelector('span.lu-label').offsetWidth;
                var actWidth = d.getWidth();
                if (w > (actWidth + 30)) {
                    __WEBPACK_IMPORTED_MODULE_0_d3__["select"](this).style('transform', "rotate(" + that.options.rotationDegree + "deg)");
                    rotatedAny_1 = true;
                }
                else {
                    __WEBPACK_IMPORTED_MODULE_0_d3__["select"](this).style('transform', null);
                }
            });
            this.$node.selectAll('div.header').style('margin-top', rotatedAny_1 ? this.options.rotationHeight + 'px' : null);
            height += rotatedAny_1 ? this.options.rotationHeight : 0;
        }
        this.$node.style('height', height + 'px');
    };
    HeaderRenderer.prototype.createToolbar = function ($node) {
        var _this = this;
        var provider = this.data, that = this;
        var $regular = $node.filter(function (d) { return !(d instanceof __WEBPACK_IMPORTED_MODULE_8__model_RankColumn__["a" /* default */]); });
        //rename
        $regular.append('i').attr('class', 'fa fa-pencil-square-o').attr('title', 'Rename').on('click', function (d) {
            var dialog = new __WEBPACK_IMPORTED_MODULE_16__dialogs_RenameDialog__["a" /* default */](d, __WEBPACK_IMPORTED_MODULE_0_d3__["select"](this.parentNode.parentNode));
            dialog.openDialog();
            __WEBPACK_IMPORTED_MODULE_0_d3__["event"].stopPropagation();
        });
        //clone
        $regular.append('i').attr('class', 'fa fa-code-fork').attr('title', 'Generate Snapshot').on('click', function (d) {
            provider.takeSnapshot(d);
            __WEBPACK_IMPORTED_MODULE_0_d3__["event"].stopPropagation();
        });
        //MultiValue Sort
        $node.filter(function (d) { return d instanceof __WEBPACK_IMPORTED_MODULE_13__model_MultiValueColumn__["a" /* default */] || d instanceof __WEBPACK_IMPORTED_MODULE_14__model_BoxPlotColumn__["a" /* default */]; }).append('i').attr('class', 'fa fa-sort').attr('title', 'Sort By').on('click', function (d) {
            var dialog = new __WEBPACK_IMPORTED_MODULE_20__dialogs_SortDialog__["a" /* default */](d, __WEBPACK_IMPORTED_MODULE_0_d3__["select"](this.parentNode.parentNode));
            dialog.openDialog();
            __WEBPACK_IMPORTED_MODULE_0_d3__["event"].stopPropagation();
        });
        //Renderer Change
        $node.filter(function (d) { return d.getRendererList().length > 1; }).append('i').attr('class', 'fa fa-exchange').attr('title', 'Change Visualization').on('click', function (d) {
            var dialog = new __WEBPACK_IMPORTED_MODULE_18__dialogs_RendererTypeDialog__["a" /* default */](d, __WEBPACK_IMPORTED_MODULE_0_d3__["select"](this.parentNode.parentNode));
            dialog.openDialog();
            __WEBPACK_IMPORTED_MODULE_0_d3__["event"].stopPropagation();
        });
        //edit link
        $node.filter(function (d) { return d instanceof __WEBPACK_IMPORTED_MODULE_10__model_LinkColumn__["a" /* default */]; }).append('i').attr('class', 'fa fa-external-link').attr('title', 'Edit Link Pattern').on('click', function (d) {
            var dialog = new __WEBPACK_IMPORTED_MODULE_17__dialogs_EditLinkDialog__["a" /* default */](d, __WEBPACK_IMPORTED_MODULE_0_d3__["select"](this.parentNode.parentNode), that.options.idPrefix, [].concat(d.desc.templates || [], that.options.linkTemplates));
            dialog.openDialog();
            __WEBPACK_IMPORTED_MODULE_0_d3__["event"].stopPropagation();
        });
        //edit script
        $node.filter(function (d) { return d instanceof __WEBPACK_IMPORTED_MODULE_11__model_ScriptColumn__["a" /* default */]; }).append('i').attr('class', 'fa fa-gears').attr('title', 'Edit Combine Script').on('click', function (d) {
            var dialog = new __WEBPACK_IMPORTED_MODULE_26__dialogs_ScriptEditDialog__["a" /* default */](d, __WEBPACK_IMPORTED_MODULE_0_d3__["select"](this.parentNode.parentNode));
            dialog.openDialog();
            __WEBPACK_IMPORTED_MODULE_0_d3__["event"].stopPropagation();
        });
        //filter
        $node.filter(function (d) { return _this.options.filters.hasOwnProperty(d.desc.type); }).append('i').attr('class', 'fa fa-filter').attr('title', 'Filter').on('click', function (d) {
            var target = __WEBPACK_IMPORTED_MODULE_0_d3__["event"].target;
            var dialog = new _this.options.filters[d.desc.type](d, __WEBPACK_IMPORTED_MODULE_0_d3__["select"](target.parentNode), '', provider, that.options.idPrefix);
            dialog.openDialog();
            __WEBPACK_IMPORTED_MODULE_0_d3__["event"].stopPropagation();
        });
        //search
        $node.filter(function (d) { return _this.options.searchAble(d); }).append('i').attr('class', 'fa fa-search').attr('title', 'Search').on('click', function (d) {
            var dialog = new __WEBPACK_IMPORTED_MODULE_15__dialogs_SearchDialog__["a" /* default */](d, __WEBPACK_IMPORTED_MODULE_0_d3__["select"](this.parentNode.parentNode), provider);
            dialog.openDialog();
            __WEBPACK_IMPORTED_MODULE_0_d3__["event"].stopPropagation();
        });
        //edit weights
        $node.filter(function (d) { return d instanceof __WEBPACK_IMPORTED_MODULE_9__model_StackColumn__["a" /* default */]; }).append('i').attr('class', 'fa fa-tasks').attr('title', 'Edit Weights').on('click', function (d) {
            var dialog = new __WEBPACK_IMPORTED_MODULE_19__dialogs_WeightsEditDialog__["a" /* default */](d, __WEBPACK_IMPORTED_MODULE_0_d3__["select"](this.parentNode.parentNode));
            dialog.openDialog();
            __WEBPACK_IMPORTED_MODULE_0_d3__["event"].stopPropagation();
        });
        //collapse
        $regular.append('i')
            .attr('class', 'fa')
            .classed('fa-toggle-left', function (d) { return !d.getCompressed(); })
            .classed('fa-toggle-right', function (d) { return d.getCompressed(); })
            .attr('title', '(Un)Collapse')
            .on('click', function (d) {
            d.setCompressed(!d.getCompressed());
            __WEBPACK_IMPORTED_MODULE_0_d3__["select"](this)
                .classed('fa-toggle-left', !d.getCompressed())
                .classed('fa-toggle-right', d.getCompressed());
            __WEBPACK_IMPORTED_MODULE_0_d3__["event"].stopPropagation();
        });
        //compress
        $node.filter(function (d) { return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_5__model_CompositeColumn__["a" /* isMultiLevelColumn */])(d); }).append('i')
            .attr('class', 'fa')
            .classed('fa-compress', function (d) { return !d.getCollapsed(); })
            .classed('fa-expand', function (d) { return d.getCollapsed(); })
            .attr('title', 'Compress/Expand')
            .on('click', function (d) {
            d.setCollapsed(!d.getCollapsed());
            __WEBPACK_IMPORTED_MODULE_0_d3__["select"](this)
                .classed('fa-compress', !d.getCollapsed())
                .classed('fa-expand', d.getCollapsed());
            __WEBPACK_IMPORTED_MODULE_0_d3__["event"].stopPropagation();
        });
        //remove
        $node.append('i').attr('class', 'fa fa-times').attr('title', 'Hide').on('click', function (d) {
            if (d instanceof __WEBPACK_IMPORTED_MODULE_8__model_RankColumn__["a" /* default */]) {
                provider.removeRanking(d.findMyRanker());
                if (provider.getRankings().length === 0) {
                    provider.pushRanking();
                }
            }
            else {
                d.removeMe();
            }
            __WEBPACK_IMPORTED_MODULE_0_d3__["event"].stopPropagation();
        });
    };
    HeaderRenderer.prototype.updateFreeze = function (left) {
        var numColumns = this.options.freezeCols;
        this.$node.selectAll('div.header')
            .style('z-index', function (d, i) { return i < numColumns ? 1 : null; })
            .style('transform', function (d, i) { return i < numColumns ? "translate(" + left + "px,0)" : null; });
    };
    HeaderRenderer.prototype.renderColumns = function (columns, shifts, $base, clazz) {
        var _this = this;
        if ($base === void 0) { $base = this.$node; }
        if (clazz === void 0) { clazz = 'header'; }
        var that = this;
        var $headers = $base.selectAll('div.' + clazz).data(columns, function (d) { return d.id; });
        var $headersEnter = $headers.enter().append('div').attr('class', clazz)
            .on('click', function (d) {
            var mevent = __WEBPACK_IMPORTED_MODULE_0_d3__["event"];
            if (_this.options.manipulative && !mevent.defaultPrevented && mevent.currentTarget === mevent.target) {
                d.toggleMySorting();
            }
        });
        var $headersEnterDiv = $headersEnter.append('div').classed('lu-label', true)
            .on('click', function (d) {
            var mevent = __WEBPACK_IMPORTED_MODULE_0_d3__["event"];
            if (_this.options.manipulative && !mevent.defaultPrevented) {
                d.toggleMySorting();
            }
        })
            .on('dragstart', function (d) {
            var e = __WEBPACK_IMPORTED_MODULE_0_d3__["event"];
            e.dataTransfer.effectAllowed = 'copyMove'; //none, copy, copyLink, copyMove, link, linkMove, move, all
            e.dataTransfer.setData('text/plain', d.label);
            e.dataTransfer.setData('application/caleydo-lineup-column-ref', d.id);
            var ref = JSON.stringify(_this.data.toDescRef(d.desc));
            e.dataTransfer.setData('application/caleydo-lineup-column', ref);
            if (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_6__model_NumberColumn__["a" /* isNumberColumn */])(d)) {
                e.dataTransfer.setData('application/caleydo-lineup-column-number', ref);
                e.dataTransfer.setData('application/caleydo-lineup-column-number-ref', d.id);
            }
        });
        $headersEnterDiv.append('i').attr('class', 'fa fa sort_indicator');
        $headersEnterDiv.append('span').classed('lu-label', true).attr({
            'draggable': this.options.manipulative
        });
        if (this.options.manipulative) {
            $headersEnter.append('div').classed('handle', true)
                .call(this.dragHandler)
                .style('width', this.options.columnPadding + 'px')
                .call(this.dropHandler);
            $headersEnter.append('div').classed('toolbar', true).call(this.createToolbar.bind(this));
        }
        if (this.options.histograms) {
            $headersEnter.append('div').classed('histogram', true);
        }
        $headers.style({
            width: function (d, i) { return (shifts[i].width + _this.options.columnPadding) + 'px'; },
            left: function (d, i) { return shifts[i].offset + 'px'; },
            'background-color': function (d) { return d.color; }
        });
        $headers.attr({
            'class': function (d) { return clazz + " " + (d.cssClass || '') + " " + (d.getCompressed() ? 'compressed' : '') + " " + d.headerCssClass + " " + (_this.options.autoRotateLabels ? 'rotateable' : '') + " " + (d.isFiltered() ? 'filtered' : ''); },
            title: function (d) { return toFullTooltip(d); },
            'data-id': function (d) { return d.id; }
        });
        $headers.select('i.sort_indicator').attr('class', function (d) {
            var r = d.findMyRanker();
            if (r && r.getSortCriteria().col === d) {
                return 'sort_indicator fa fa-sort-' + (r.getSortCriteria().asc ? 'asc' : 'desc');
            }
            return 'sort_indicator fa';
        });
        $headers.select('span.lu-label').text(function (d) { return d.label; });
        var resolveDrop = function (data, copy) {
            if ('application/caleydo-lineup-column-number-ref' in data) {
                var id = data['application/caleydo-lineup-column-number-ref'];
                var col = _this.data.find(id);
                if (copy) {
                    col = _this.data.clone(col);
                }
                else if (col) {
                    col.removeMe();
                }
                return col;
            }
            else {
                var desc = JSON.parse(data['application/caleydo-lineup-column-number']);
                return _this.data.create(_this.data.fromDescRef(desc));
            }
        };
        $headers.filter(function (d) { return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_5__model_CompositeColumn__["a" /* isMultiLevelColumn */])(d); }).each(function (col) {
            if (col.getCollapsed() || col.getCompressed()) {
                __WEBPACK_IMPORTED_MODULE_0_d3__["select"](this).selectAll('div.' + clazz + '_i').remove();
            }
            else {
                var sShifts = [];
                col.flatten(sShifts, 0, 1, that.options.columnPadding);
                var sColumns = sShifts.map(function (d) { return d.col; });
                that.renderColumns(sColumns, sShifts, __WEBPACK_IMPORTED_MODULE_0_d3__["select"](this), clazz + (clazz.substr(clazz.length - 2) !== '_i' ? '_i' : ''));
            }
        }).select('div.lu-label').call(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__utils__["l" /* dropAble */])(['application/caleydo-lineup-column-number-ref', 'application/caleydo-lineup-column-number'], function (data, d, copy) {
            var col = resolveDrop(data, copy);
            return d.push(col) != null;
        }));
        // drag columns on top of each
        $headers.filter(function (d) { return d.parent instanceof __WEBPACK_IMPORTED_MODULE_4__model_Ranking__["a" /* default */] && __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_6__model_NumberColumn__["a" /* isNumberColumn */])(d) && !__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_5__model_CompositeColumn__["a" /* isMultiLevelColumn */])(d); }).select('div.lu-label').call(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__utils__["l" /* dropAble */])(['application/caleydo-lineup-column-number-ref', 'application/caleydo-lineup-column-number'], function (data, d, copy) {
            var col = resolveDrop(data, copy);
            var ranking = d.findMyRanker();
            var index = ranking.indexOf(d);
            var stack = _this.data.create(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_9__model_StackColumn__["b" /* createDesc */])());
            d.removeMe();
            stack.push(d);
            stack.push(col);
            return ranking.insert(stack, index) != null;
        }));
        if (this.options.histograms) {
            $headers.filter(function (d) { return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_7__model_CategoricalColumn__["b" /* isCategoricalColumn */])(d); }).each(function (col) {
                var $this = __WEBPACK_IMPORTED_MODULE_0_d3__["select"](this).select('div.histogram');
                var hist = that.histCache.get(col.id);
                if (hist) {
                    hist.then(function (stats) {
                        var $bars = $this.selectAll('div.bar').data(stats.hist);
                        $bars.enter().append('div').classed('bar', true);
                        var sx = __WEBPACK_IMPORTED_MODULE_0_d3__["scale"].ordinal().domain(col.categories).rangeBands([0, 100], 0.1);
                        var sy = __WEBPACK_IMPORTED_MODULE_0_d3__["scale"].linear().domain([0, stats.maxBin]).range([0, 100]);
                        $bars.style({
                            left: function (d) { return sx(d.cat) + '%'; },
                            width: function (d) { return sx.rangeBand() + '%'; },
                            top: function (d) { return (100 - sy(d.y)) + '%'; },
                            height: function (d) { return sy(d.y) + '%'; },
                            'background-color': function (d) { return col.colorOf(d.cat); }
                        }).attr({
                            title: function (d) { return d.cat + ": " + d.y; },
                            'data-cat': function (d) { return d.cat; }
                        });
                        $bars.exit().remove();
                    });
                }
            });
            $headers.filter(function (d) { return d instanceof __WEBPACK_IMPORTED_MODULE_6__model_NumberColumn__["b" /* default */]; }).each(function (col) {
                var $this = __WEBPACK_IMPORTED_MODULE_0_d3__["select"](this).select('div.histogram');
                var hist = that.histCache.get(col.id);
                if (hist) {
                    hist.then(function (stats) {
                        var $bars = $this.selectAll('div.bar').data(stats.hist);
                        $bars.enter().append('div').classed('bar', true);
                        var sx = __WEBPACK_IMPORTED_MODULE_0_d3__["scale"].ordinal().domain(__WEBPACK_IMPORTED_MODULE_0_d3__["range"](stats.hist.length).map(String)).rangeBands([0, 100], 0.1);
                        var sy = __WEBPACK_IMPORTED_MODULE_0_d3__["scale"].linear().domain([0, stats.maxBin]).range([0, 100]);
                        $bars.style({
                            left: function (d, i) { return sx(String(i)) + '%'; },
                            width: function (d, i) { return sx.rangeBand() + '%'; },
                            top: function (d) { return (100 - sy(d.y)) + '%'; },
                            height: function (d) { return sy(d.y) + '%'; }
                        }).attr({
                            title: function (d, i) { return "Bin " + i + ": " + d.y; },
                            'data-x': function (d) { return d.x; }
                        });
                        $bars.exit().remove();
                        var $mean = $this.select('div.mean');
                        if ($mean.empty()) {
                            $mean = $this.append('div').classed('mean', true);
                        }
                        $mean.style('left', (stats.mean * 100) + '%');
                    });
                }
            });
        }
        $headers.exit().remove();
    };
    return HeaderRenderer;
}());
/* harmony default export */ __webpack_exports__["a"] = HeaderRenderer;


/***/ }),
/* 31 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__SVGBodyRenderer__ = __webpack_require__(74);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__HTMLBodyRenderer__ = __webpack_require__(72);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__CanvasBodyRenderer__ = __webpack_require__(71);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__HeaderRenderer__ = __webpack_require__(30);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "HeaderRenderer", function() { return __WEBPACK_IMPORTED_MODULE_3__HeaderRenderer__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "dummyRankingButtonHook", function() { return __WEBPACK_IMPORTED_MODULE_3__HeaderRenderer__["b"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__PoolRenderer__ = __webpack_require__(73);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "PoolRenderer", function() { return __WEBPACK_IMPORTED_MODULE_4__PoolRenderer__["a"]; });
/* harmony export (immutable) */ __webpack_exports__["createBodyRenderer"] = createBodyRenderer;
/**
 * Created by Samuel Gratzl on 14.08.2015.
 */





function createBodyRenderer(type, data, parent, slicer, options) {
    if (type === void 0) { type = 'svg'; }
    if (options === void 0) { options = {}; }
    switch (type) {
        case 'svg':
            return new __WEBPACK_IMPORTED_MODULE_0__SVGBodyRenderer__["a" /* default */](data, parent, slicer, options);
        case 'html':
            return new __WEBPACK_IMPORTED_MODULE_1__HTMLBodyRenderer__["a" /* default */](data, parent, slicer, options);
        case 'canvas':
            return new __WEBPACK_IMPORTED_MODULE_2__CanvasBodyRenderer__["a" /* default */](data, parent, slicer, options);
        default:
            return new __WEBPACK_IMPORTED_MODULE_0__SVGBodyRenderer__["a" /* default */](data, parent, slicer, options);
    }
}


/***/ }),
/* 32 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 33 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__model__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__model_Ranking__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ADataProvider__ = __webpack_require__(8);
/**
 * Created by sam on 04.11.2016.
 */
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};



function isComplexAccessor(column) {
    // something like a.b or a[4]
    return typeof column === 'string' && column.indexOf('.') >= 0;
}
function resolveComplex(column, row) {
    var resolve = function (obj, col) {
        if (obj === undefined) {
            return obj; // propagate invalid values
        }
        if (/\d+/.test(col)) {
            return obj[+col];
        }
        return obj[col];
    };
    return column.split('.').reduce(resolve, row);
}
function rowGetter(row, index, id, desc) {
    var column = desc.column;
    if (isComplexAccessor(column)) {
        return resolveComplex(column, row);
    }
    return row[column];
}
/**
 * common base implementation of a DataProvider with a fixed list of column descriptions
 */
var ACommonDataProvider = (function (_super) {
    __extends(ACommonDataProvider, _super);
    function ACommonDataProvider(columns, options) {
        if (columns === void 0) { columns = []; }
        if (options === void 0) { options = {}; }
        var _this = _super.call(this, options) || this;
        _this.columns = columns;
        _this.rankingIndex = 0;
        /**
         * the local ranking orders
         */
        _this.ranks = new Map();
        //generate the accessor
        columns.forEach(function (d) {
            d.accessor = d.accessor || rowGetter;
            d.label = d.label || d.column;
        });
        return _this;
    }
    ACommonDataProvider.prototype.rankAccessor = function (row, index, id, desc, ranking) {
        return (this.ranks[ranking.id].indexOf(index)) + 1;
    };
    ACommonDataProvider.prototype.cloneRanking = function (existing) {
        var _this = this;
        var id = this.nextRankingId();
        var clone = new __WEBPACK_IMPORTED_MODULE_1__model_Ranking__["a" /* default */](id);
        if (existing) {
            //copy the ranking
            this.ranks[id] = this.ranks[existing.id];
            //TODO better cloning
            existing.children.forEach(function (child) {
                _this.push(clone, child.desc);
            });
        }
        else {
            clone.push(this.create(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__model__["createRankDesc"])()));
        }
        return clone;
    };
    ACommonDataProvider.prototype.cleanUpRanking = function (ranking) {
        //delete all stored information
        delete this.ranks[ranking.id];
    };
    ACommonDataProvider.prototype.sort = function (ranking) {
        var _this = this;
        //use the server side to sort
        return this.sortImpl(ranking).then(function (argsort) {
            //store the result
            _this.ranks[ranking.id] = argsort;
            return argsort;
        });
    };
    /**
     * adds another column description to this data provider
     * @param column
     */
    ACommonDataProvider.prototype.pushDesc = function (column) {
        var d = column;
        d.accessor = d.accessor || rowGetter;
        d.label = column.label || d.column;
        this.columns.push(column);
        this.fire(__WEBPACK_IMPORTED_MODULE_2__ADataProvider__["a" /* default */].EVENT_ADD_DESC, d);
    };
    ACommonDataProvider.prototype.getColumns = function () {
        return this.columns.slice();
    };
    ACommonDataProvider.prototype.findDesc = function (ref) {
        return this.columns.filter(function (c) { return c.column === ref; })[0];
    };
    /**
     * identify by the tuple type@columnname
     * @param desc
     * @returns {string}
     */
    ACommonDataProvider.prototype.toDescRef = function (desc) {
        return desc.column ? desc.type + '@' + desc.column : desc;
    };
    ACommonDataProvider.prototype.fromDescRef = function (descRef) {
        if (typeof (descRef) === 'string') {
            return this.columns.filter(function (d) { return d.type + '@' + d.column === descRef; })[0];
        }
        return descRef;
    };
    ACommonDataProvider.prototype.restore = function (dump) {
        _super.prototype.restore.call(this, dump);
        this.rankingIndex = 1 + Math.max.apply(Math, this.getRankings().map(function (r) { return +r.id.substring(4); }));
    };
    ACommonDataProvider.prototype.nextRankingId = function () {
        return 'rank' + (this.rankingIndex++);
    };
    return ACommonDataProvider;
}(__WEBPACK_IMPORTED_MODULE_2__ADataProvider__["a" /* default */]));
/* harmony default export */ __webpack_exports__["a"] = ACommonDataProvider;


/***/ }),
/* 34 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__model_Column__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__utils__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_d3__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_d3___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_d3__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ACommonDataProvider__ = __webpack_require__(33);
/**
 * Created by sam on 04.11.2016.
 */
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};




/**
 * computes the simple statistics of an array using d3 histogram
 * @param arr the data array
 * @param indices array data indices
 * @param acc accessor function
 * @param range the total value range
 * @returns {{min: number, max: number, count: number, hist: histogram.Bin<number>[]}}
 */
function computeStats(arr, indices, acc, range) {
    if (arr.length === 0) {
        return {
            min: NaN,
            max: NaN,
            mean: NaN,
            count: 0,
            maxBin: 0,
            hist: []
        };
    }
    var indexAccessor = function (a, i) { return acc(a, indices[i]); };
    var hist = __WEBPACK_IMPORTED_MODULE_2_d3__["layout"].histogram().value(indexAccessor);
    if (range) {
        hist.range(function () { return range; });
    }
    var ex = __WEBPACK_IMPORTED_MODULE_2_d3__["extent"](arr, indexAccessor);
    var histData = hist(arr);
    return {
        min: ex[0],
        max: ex[1],
        mean: __WEBPACK_IMPORTED_MODULE_2_d3__["mean"](arr, indexAccessor),
        count: arr.length,
        maxBin: __WEBPACK_IMPORTED_MODULE_2_d3__["max"](histData, function (d) { return d.y; }),
        hist: histData
    };
}
/**
 * computes a categorical histogram
 * @param arr the data array
 * @param indices the data array data indices
 * @param acc the accessor
 * @param categories the list of known categories
 * @returns {{hist: {cat: string, y: number}[]}}
 */
function computeHist(arr, indices, acc, categories) {
    var m = new Map();
    categories.forEach(function (cat) { return m.set(cat, 0); });
    arr.forEach(function (a, i) {
        var vs = acc(a, indices[i]);
        if (vs == null) {
            return;
        }
        vs.forEach(function (v) {
            m.set(v, (m.get(v) || 0) + 1);
        });
    });
    var entries = [];
    m.forEach(function (v, k) { return entries.push({ cat: k, y: v }); });
    return {
        maxBin: Math.max.apply(Math, entries.map(function (d) { return d.y; })),
        hist: entries
    };
}
/**
 * a data provider based on an local array
 */
var LocalDataProvider = (function (_super) {
    __extends(LocalDataProvider, _super);
    function LocalDataProvider(_data, columns, options) {
        if (columns === void 0) { columns = []; }
        if (options === void 0) { options = {}; }
        var _this = _super.call(this, columns, options) || this;
        _this._data = _data;
        _this.options = {
            /**
             * whether the filter should be applied to all rankings regardless where they are
             */
            filterGlobally: false
        };
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__utils__["a" /* merge */])(_this.options, options);
        var that = _this;
        _this.reorderAll = function () {
            //fire for all other rankings a dirty order event, too
            var ranking = this.source;
            that.getRankings().forEach(function (r) {
                if (r !== ranking) {
                    r.dirtyOrder();
                }
            });
        };
        return _this;
    }
    Object.defineProperty(LocalDataProvider.prototype, "data", {
        get: function () {
            return this._data;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * replaces the dataset rows with a new one
     * @param data
     */
    LocalDataProvider.prototype.setData = function (data) {
        this._data = data;
        this.reorderAll();
    };
    LocalDataProvider.prototype.clearData = function () {
        this.setData([]);
    };
    /**
     * append rows to the dataset
     * @param data
     */
    LocalDataProvider.prototype.appendData = function (data) {
        (_a = this._data).push.apply(_a, data);
        this.reorderAll();
        var _a;
    };
    LocalDataProvider.prototype.cloneRanking = function (existing) {
        var clone = _super.prototype.cloneRanking.call(this, existing);
        if (this.options.filterGlobally) {
            clone.on(__WEBPACK_IMPORTED_MODULE_0__model_Column__["a" /* default */].EVENT_FILTER_CHANGED + '.reorderAll', this.reorderAll);
        }
        return clone;
    };
    LocalDataProvider.prototype.cleanUpRanking = function (ranking) {
        if (this.options.filterGlobally) {
            ranking.on(__WEBPACK_IMPORTED_MODULE_0__model_Column__["a" /* default */].EVENT_FILTER_CHANGED + '.reorderAll', null);
        }
        _super.prototype.cleanUpRanking.call(this, ranking);
    };
    LocalDataProvider.prototype.sortImpl = function (ranking) {
        if (this._data.length === 0) {
            return Promise.resolve([]);
        }
        //wrap in a helper and store the initial index
        var helper = this._data.map(function (r, i) { return ({ row: r, i: i }); });
        //do the optional filtering step
        if (this.options.filterGlobally) {
            var filtered_1 = this.getRankings().filter(function (d) { return d.isFiltered(); });
            if (filtered_1.length > 0) {
                helper = helper.filter(function (d) { return filtered_1.every(function (f) { return f.filter(d.row, d.i); }); });
            }
        }
        else if (ranking.isFiltered()) {
            helper = helper.filter(function (d) { return ranking.filter(d.row, d.i); });
        }
        //sort by the ranking column
        helper.sort(function (a, b) { return ranking.comparator(a.row, b.row, a.i, b.i); });
        //store the ranking index and create an argsort version, i.e. rank 0 -> index i
        return Promise.resolve(helper.map(function (r) { return r.i; }));
    };
    LocalDataProvider.prototype.viewRaw = function (indices) {
        var _this = this;
        //filter invalid indices
        var l = this._data.length;
        return indices.map(function (index) { return _this._data[index]; });
    };
    LocalDataProvider.prototype.view = function (indices) {
        return Promise.resolve(this.viewRaw(indices));
    };
    LocalDataProvider.prototype.fetch = function (orders) {
        var _this = this;
        var l = this._data.length;
        return orders.map(function (order) { return order.map(function (index) { return Promise.resolve({
            v: _this._data[index],
            dataIndex: index
        }); }); });
    };
    /**
     * helper for computing statistics
     * @param indices
     * @returns {{stats: (function(INumberColumn): *), hist: (function(ICategoricalColumn): *)}}
     */
    LocalDataProvider.prototype.stats = function (indices) {
        var _this = this;
        var d = null;
        var getD = function () {
            if (d === null) {
                d = _this.viewRaw(indices);
            }
            return d;
        };
        return {
            stats: function (col) { return Promise.resolve(computeStats(getD(), indices, col.getNumber.bind(col), [0, 1])); },
            hist: function (col) { return Promise.resolve(computeHist(getD(), indices, col.getCategories.bind(col), col.categories)); }
        };
    };
    LocalDataProvider.prototype.mappingSample = function (col) {
        var _this = this;
        var MAX_SAMPLE = 500; //at most 500 sample lines
        var l = this._data.length;
        if (l <= MAX_SAMPLE) {
            return Promise.resolve(this._data.map(col.getRawValue.bind(col)));
        }
        //randomly select 500 elements
        var indices = [];
        for (var i = 0; i < MAX_SAMPLE; ++i) {
            var j = Math.floor(Math.random() * (l - 1));
            while (indices.indexOf(j) >= 0) {
                j = Math.floor(Math.random() * (l - 1));
            }
            indices.push(j);
        }
        return Promise.resolve(indices.map(function (i) { return col.getRawValue(_this.data[i], i); }));
    };
    LocalDataProvider.prototype.searchAndJump = function (search, col) {
        var _this = this;
        //case insensitive search
        search = typeof search === 'string' ? search.toLowerCase() : search;
        var f = typeof search === 'string' ? function (v) { return v.toLowerCase().indexOf(search) >= 0; } : search.test.bind(search);
        var indices = __WEBPACK_IMPORTED_MODULE_2_d3__["range"](this._data.length).filter(function (i) { return f(col.getLabel(_this._data[i], i)); });
        this.jumpToNearest(indices);
    };
    return LocalDataProvider;
}(__WEBPACK_IMPORTED_MODULE_3__ACommonDataProvider__["a" /* default */]));
/* harmony default export */ __webpack_exports__["a"] = LocalDataProvider;


/***/ }),
/* 35 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__AFilterDialog__ = __webpack_require__(9);
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};

var BooleanFilterDialog = (function (_super) {
    __extends(BooleanFilterDialog, _super);
    /**
     * opens a dialog for filtering a boolean column
     * @param column the column to filter
     * @param $header the visual header element of this column
     * @param title optional title
     */
    function BooleanFilterDialog(column, $header, title) {
        if (title === void 0) { title = 'Filter'; }
        return _super.call(this, column, $header, title) || this;
    }
    BooleanFilterDialog.prototype.openDialog = function () {
        var _this = this;
        var bak = this.column.getFilter();
        var $popup = this.makePopup("<label><input type=\"radio\" name=\"boolean_check\" value=\"null\" " + (bak === null ? 'checked="checked"' : '') + ">No Filter</label><br>\n     <label><input type=\"radio\" name=\"boolean_check\" value=\"true\" " + (bak === true ? 'checked="checked"' : '') + ">True</label><br>\n     <label><input type=\"radio\" name=\"boolean_check\" value=\"false\" " + (bak === false ? 'checked="checked"' : '') + ">False</label>\n    <br>");
        var updateData = function (filter) {
            _this.markFiltered((filter !== null));
            _this.column.setFilter(filter);
        };
        function updateImpl() {
            //get value
            var isTrue = $popup.select('input[type="radio"][value="true"]').property('checked');
            var isFalse = $popup.select('input[type="radio"][value="false"]').property('checked');
            updateData(isTrue ? true : (isFalse ? false : null));
        }
        $popup.selectAll('input[type="radio"]').on('change', updateImpl);
        $popup.select('.cancel').on('click', function () {
            updateData(bak);
            $popup.remove();
        });
        $popup.select('.reset').on('click', function () {
            var v = bak === null ? 'null' : String(bak);
            $popup.selectAll('input[type="radio"]').property('checked', function () {
                return this.value === v;
            });
            updateData(null);
        });
        $popup.select('.ok').on('click', function () {
            updateImpl();
            $popup.remove();
        });
    };
    return BooleanFilterDialog;
}(__WEBPACK_IMPORTED_MODULE_0__AFilterDialog__["a" /* default */]));
/* harmony default export */ __webpack_exports__["a"] = BooleanFilterDialog;


/***/ }),
/* 36 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__AFilterDialog__ = __webpack_require__(9);
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};

var CategoricalFilterDialog = (function (_super) {
    __extends(CategoricalFilterDialog, _super);
    /**
     * opens a dialog for filtering a categorical column
     * @param column the column to rename
     * @param $header the visual header element of this column
     * @param title optional title
     */
    function CategoricalFilterDialog(column, $header, title) {
        if (title === void 0) { title = 'Filter'; }
        return _super.call(this, column, $header, title) || this;
    }
    CategoricalFilterDialog.prototype.openDialog = function () {
        var _this = this;
        var bakOri = this.column.getFilter() || { filter: [], filterMissing: false };
        var bak = bakOri.filter || [];
        var bakMissing = bakOri.filterMissing;
        var popup = this.makePopup("<div class=\"selectionTable\"><table><thead><th class=\"selectAll\"></th><th>Category</th></thead><tbody></tbody></table></div>\n        <label><input class=\"lu_filter_missing\" type=\"checkbox\" " + (bakMissing ? 'checked="checked"' : '') + ">Filter Missing</label><br>");
        // list all data rows !
        var colors = this.column.categoryColors, labels = this.column.categoryLabels;
        var trData = this.column.categories.map(function (d, i) {
            return { cat: d, label: labels[i], isChecked: bak.length === 0 || bak.indexOf(d) >= 0, color: colors[i] };
        }).sort(this.sortByName('label'));
        var $rows = popup.select('tbody').selectAll('tr').data(trData);
        var $rowsEnter = $rows.enter().append('tr');
        $rowsEnter.append('td').attr('class', 'checkmark');
        $rowsEnter.append('td').attr('class', 'datalabel').text(function (d) { return d.label; });
        $rowsEnter.on('click', function (d) {
            d.isChecked = !d.isChecked;
            redraw();
        });
        function redraw() {
            $rows.select('.checkmark').html(function (d) { return '<i class="fa fa-' + ((d.isChecked) ? 'check-' : '') + 'square-o"></i>'; });
            $rows.select('.datalabel').style('opacity', function (d) { return d.isChecked ? '1.0' : '.8'; });
        }
        redraw();
        var isCheckedAll = true;
        function redrawSelectAll() {
            popup.select('.selectAll').html(function (d) { return '<i class="fa fa-' + ((isCheckedAll) ? 'check-' : '') + 'square-o"></i>'; });
            popup.select('thead').on('click', function () {
                isCheckedAll = !isCheckedAll;
                trData.forEach(function (row) { return row.isChecked = isCheckedAll; });
                redraw();
                redrawSelectAll();
            });
        }
        redrawSelectAll();
        var updateData = function (filter, filterMissing) {
            var noFilter = filter === null && filterMissing === false;
            _this.markFiltered(!noFilter);
            _this.column.setFilter(noFilter ? null : { filter: filter, filterMissing: filterMissing });
        };
        popup.select('.cancel').on('click', function () {
            updateData(bak, bakMissing);
            popup.remove();
        });
        popup.select('.reset').on('click', function () {
            trData.forEach(function (d) { return d.isChecked = true; });
            redraw();
            updateData(null, null);
        });
        popup.select('.ok').on('click', function () {
            var f = trData.filter(function (d) { return d.isChecked; }).map(function (d) { return d.cat; });
            if (f.length === trData.length) {
                f = null;
            }
            var filterMissing = popup.select('input[type="checkbox"].lu_filter_missing').property('checked');
            updateData(f, filterMissing);
            popup.remove();
        });
    };
    return CategoricalFilterDialog;
}(__WEBPACK_IMPORTED_MODULE_0__AFilterDialog__["a" /* default */]));
/* harmony default export */ __webpack_exports__["a"] = CategoricalFilterDialog;


/***/ }),
/* 37 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__AFilterDialog__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_d3__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_d3___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_d3__);
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};


var CategoricalMappingFilterDialog = (function (_super) {
    __extends(CategoricalMappingFilterDialog, _super);
    /**
     * opens the mapping editor for a given CategoricalNumberColumn, i.e. to map categories to numbers
     * @param column the column to rename
     * @param $header the visual header element of this column
     */
    function CategoricalMappingFilterDialog(column, $header, title) {
        if (title === void 0) { title = 'Edit Categorical Mapping'; }
        return _super.call(this, column, $header, title) || this;
    }
    CategoricalMappingFilterDialog.prototype.openDialog = function () {
        var _this = this;
        var bakOri = this.column.getFilter() || { filter: [], filterMissing: false };
        var bak = bakOri.filter;
        var bakMissing = bakOri.filterMissing;
        var scale = __WEBPACK_IMPORTED_MODULE_1_d3__["scale"].linear().domain([0, 100]).range([0, 120]);
        var $popup = this.makePopup("<div class=\"selectionTable\"><table><thead><th class=\"selectAll\"></th><th colspan=\"2\">Scale</th><th>Category</th></thead><tbody></tbody></table></div>\n        <label><input class=\"lu_filter_missing\" type=\"checkbox\" " + (bakMissing ? 'checked="checked"' : '') + ">Filter Missing</label><br>");
        var range = this.column.getScale().range, colors = this.column.categoryColors, labels = this.column.categoryLabels;
        var trData = this.column.categories.map(function (d, i) {
            return {
                cat: d,
                label: labels[i],
                isChecked: bak.length === 0 || bak.indexOf(d) >= 0,
                range: range[i] * 100,
                color: colors[i]
            };
        }).sort(this.sortByName('label'));
        var $rows = $popup.select('tbody').selectAll('tr').data(trData);
        var $rowsEnter = $rows.enter().append('tr');
        $rowsEnter.append('td').attr('class', 'checkmark').on('click', function (d) {
            d.isChecked = !d.isChecked;
            redraw();
        });
        $rowsEnter.append('td')
            .append('input').attr({
            type: 'number',
            value: function (d) { return d.range; },
            min: 0,
            max: 100,
            size: 5
        }).on('input', function (d) {
            d.range = +this.value;
            redraw();
        });
        $rowsEnter.append('td').append('div').attr('class', 'bar').style('background-color', function (d) { return d.color; });
        $rowsEnter.append('td').attr('class', 'datalabel').text(function (d) { return d.label; });
        function redraw() {
            $rows.select('.checkmark').html(function (d) { return '<i class="fa fa-' + ((d.isChecked) ? 'check-' : '') + 'square-o"></i>'; });
            $rows.select('.bar').transition().style('width', function (d) { return scale(d.range) + 'px'; });
            $rows.select('.datalabel').style('opacity', function (d) { return d.isChecked ? '1.0' : '.8'; });
        }
        redraw();
        var isCheckedAll = true;
        function redrawSelectAll() {
            $popup.select('.selectAll').html(function (d) { return '<i class="fa fa-' + ((isCheckedAll) ? 'check-' : '') + 'square-o"></i>'; });
            $popup.select('thead').on('click', function () {
                isCheckedAll = !isCheckedAll;
                trData.forEach(function (row) { return row.isChecked = isCheckedAll; });
                redraw();
                redrawSelectAll();
            });
        }
        redrawSelectAll();
        var updateData = function (filter, filterMissing) {
            var noFilter = filter === null && filterMissing === false;
            _this.markFiltered(!noFilter);
            _this.column.setFilter(noFilter ? null : { filter: filter, filterMissing: filterMissing });
        };
        $popup.select('.cancel').on('click', function () {
            updateData(bak, bakMissing);
            _this.column.setMapping(range);
            $popup.remove();
        });
        $popup.select('.reset').on('click', function () {
            trData.forEach(function (d) {
                d.isChecked = true;
                d.range = 50;
            });
            redraw();
            updateData(null, null);
            _this.column.setMapping(trData.map(function () { return 1; }));
        });
        $popup.select('.ok').on('click', function () {
            var f = trData.filter(function (d) { return d.isChecked; }).map(function (d) { return d.cat; });
            if (f.length === trData.length) {
                f = null;
            }
            var filterMissing = $popup.select('input[type="checkbox"].lu_filter_missing').property('checked');
            updateData(f, filterMissing);
            _this.column.setMapping(trData.map(function (d) { return d.range / 100; }));
            $popup.remove();
        });
    };
    return CategoricalMappingFilterDialog;
}(__WEBPACK_IMPORTED_MODULE_0__AFilterDialog__["a" /* default */]));
/* harmony default export */ __webpack_exports__["a"] = CategoricalMappingFilterDialog;


/***/ }),
/* 38 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ADialog__ = __webpack_require__(4);
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};

var EditLinkDialog = (function (_super) {
    __extends(EditLinkDialog, _super);
    /**
     * opens a dialog for editing the link of a column
     * @param column the column to rename
     * @param $header the visual header element of this column
     * @param templates list of possible link templates
     * @param idPrefix dom id prefix
     * @param title optional title
     */
    function EditLinkDialog(column, $header, idPrefix, templates, title) {
        if (templates === void 0) { templates = []; }
        if (title === void 0) { title = 'Edit Link ($ as Placeholder)'; }
        var _this = _super.call(this, $header, title) || this;
        _this.column = column;
        _this.idPrefix = idPrefix;
        _this.templates = templates;
        return _this;
    }
    EditLinkDialog.prototype.openDialog = function () {
        var t = "<input \n        type=\"text\"\n        size=\"15\"\n        value=\"" + this.column.getLink() + "\"\n        required=\"required\"\n        autofocus=\"autofocus\"\n        " + (this.templates.length > 0 ? 'list="ui' + this.idPrefix + 'lineupPatternList"' : '') + "\n      ><br>";
        if (this.templates.length > 0) {
            t += '<datalist id="ui${idPrefix}lineupPatternList">' + this.templates.map(function (t) { return "<option value=\"" + t + "\">"; }) + '</datalist>';
        }
        var popup = this.makePopup(t);
        var that = this;
        popup.select('.ok').on('click', function () {
            var newValue = popup.select('input[type="text"]').property('value');
            that.column.setLink(newValue);
            popup.remove();
        });
        popup.select('.cancel').on('click', function () {
            popup.remove();
        });
    };
    return EditLinkDialog;
}(__WEBPACK_IMPORTED_MODULE_0__ADialog__["a" /* default */]));
/* harmony default export */ __webpack_exports__["a"] = EditLinkDialog;


/***/ }),
/* 39 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__AFilterDialog__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__model_NumberColumn__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__utils__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_d3__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_d3___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_d3__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__mappingeditor__ = __webpack_require__(47);
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};





var MappingsFilterDialog = (function (_super) {
    __extends(MappingsFilterDialog, _super);
    /**
     * opens the mapping editor for a given NumberColumn
     * @param column the column to rename
     * @param $header the visual header element of this column
     * @param title optional title
     * @param data the data provider for illustrating the mapping by example
     * @param idPrefix dom id prefix
     */
    function MappingsFilterDialog(column, $header, title, data, idPrefix) {
        if (title === void 0) { title = 'Change Mapping'; }
        var _this = _super.call(this, column, $header, title) || this;
        _this.data = data;
        _this.idPrefix = idPrefix;
        return _this;
    }
    MappingsFilterDialog.prototype.openDialog = function () {
        var _this = this;
        var pos = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__utils__["m" /* offset */])(this.attachment.node()), original = this.column.getOriginalMapping();
        var bakfilter = this.column.getFilter(), bak = this.column.getMapping(), act = bak.clone(), actfilter = bakfilter;
        var popup = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3_d3__["select"])('body').append('div')
            .attr({
            'class': 'lu-popup'
        }).style({
            left: pos.left + 'px',
            top: pos.top + 'px'
        })
            .html(this.dialogForm('<div class="mappingArea"></div>'));
        var applyMapping = function (newscale, filter) {
            act = newscale;
            actfilter = filter;
            _this.markFiltered(!newscale.eq(original) || (bakfilter.min !== filter.min || bakfilter.max !== filter.min || bakfilter.filterMissing !== filter.filterMissing));
            _this.column.setMapping(newscale);
            _this.column.setFilter(filter);
        };
        var editorOptions = {
            idPrefix: this.idPrefix,
            callback: applyMapping,
            triggerCallback: 'dragend'
        };
        var dataSample = this.data.mappingSample(this.column);
        var editor = new __WEBPACK_IMPORTED_MODULE_4__mappingeditor__["a" /* default */](popup.select('.mappingArea').node(), act, original, actfilter, dataSample, editorOptions);
        popup.select('.ok').on('click', function () {
            applyMapping(editor.scale, editor.filter);
            popup.remove();
        });
        popup.select('.cancel').on('click', function () {
            _this.column.setMapping(bak);
            _this.markFiltered(!bak.eq(original));
            popup.remove();
        });
        popup.select('.reset').on('click', function () {
            bak = original;
            act = bak.clone();
            bakfilter = __WEBPACK_IMPORTED_MODULE_1__model_NumberColumn__["b" /* default */].noFilter();
            actfilter = bakfilter;
            applyMapping(act, actfilter);
            popup.selectAll('.mappingArea *').remove();
            editor = new __WEBPACK_IMPORTED_MODULE_4__mappingeditor__["a" /* default */](popup.select('.mappingArea').node(), act, original, actfilter, dataSample, editorOptions);
        });
    };
    return MappingsFilterDialog;
}(__WEBPACK_IMPORTED_MODULE_0__AFilterDialog__["a" /* default */]));
/* harmony default export */ __webpack_exports__["a"] = MappingsFilterDialog;


/***/ }),
/* 40 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ADialog__ = __webpack_require__(4);
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};

var RenameDialog = (function (_super) {
    __extends(RenameDialog, _super);
    /**
     * opens a rename dialog for the given column
     * @param column the column to rename
     * @param $header the visual header element of this column
     * @param title optional title
     */
    function RenameDialog(column, $header, title) {
        if (title === void 0) { title = 'Rename Column'; }
        var _this = _super.call(this, $header, title) || this;
        _this.column = column;
        return _this;
    }
    RenameDialog.prototype.openDialog = function () {
        var _this = this;
        var popup = this.makePopup("\n      <input type=\"text\" size=\"15\" value=\"" + this.column.label + "\" required=\"required\" autofocus=\"autofocus\"><br>\n      <input type=\"color\" size=\"15\" value=\"" + this.column.color + "\" required=\"required\"><br>\n      <textarea rows=\"5\">" + this.column.description + "</textarea><br>");
        popup.select('.ok').on('click', function () {
            var newValue = popup.select('input[type="text"]').property('value');
            var newColor = popup.select('input[type="color"]').property('value');
            var newDescription = popup.select('textarea').property('value');
            _this.column.setMetaData({ label: newValue, color: newColor, description: newDescription });
            popup.remove();
        });
        popup.select('.cancel').on('click', function () {
            popup.remove();
        });
    };
    return RenameDialog;
}(__WEBPACK_IMPORTED_MODULE_0__ADialog__["a" /* default */]));
/* harmony default export */ __webpack_exports__["a"] = RenameDialog;


/***/ }),
/* 41 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ADialog__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_d3__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_d3___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_d3__);
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};


var RedererTypeDialog = (function (_super) {
    __extends(RedererTypeDialog, _super);
    function RedererTypeDialog(column, $header, title) {
        if (title === void 0) { title = 'Change Visualization'; }
        var _this = _super.call(this, $header, title) || this;
        _this.column = column;
        return _this;
    }
    RedererTypeDialog.prototype.openDialog = function () {
        var _this = this;
        var bak = this.column.getRendererType();
        var rendererTypeList = this.column.getRendererList();
        var popup = this.makeSortPopup(rendererTypeList.map(function (d) {
            return "<input type=\"radio\" name=\"renderertype\" value=" + d.type + "  " + ((bak === d.type) ? 'checked' : '') + "> " + d.label + "<br>";
        }).join('\n'));
        var rendererContent = __WEBPACK_IMPORTED_MODULE_1_d3__["selectAll"]('input[name="renderertype"]');
        rendererContent.on('change', function () {
            var target = __WEBPACK_IMPORTED_MODULE_1_d3__["event"].target;
            var value = target.value;
            _this.column.setRendererType(value);
        });
        this.hidePopupOnClickOutside(popup, rendererContent);
    };
    return RedererTypeDialog;
}(__WEBPACK_IMPORTED_MODULE_0__ADialog__["a" /* default */]));
/* harmony default export */ __webpack_exports__["a"] = RedererTypeDialog;


/***/ }),
/* 42 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ADialog__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__model_ScriptColumn__ = __webpack_require__(17);
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};


var ScriptEditDialog = (function (_super) {
    __extends(ScriptEditDialog, _super);
    /**
     * opens a dialog for editing the script code
     * @param column the column to edit
     * @param $header the visual header element of this column
     * @param title optional title
     */
    function ScriptEditDialog(column, $header, title) {
        if (title === void 0) { title = 'Edit Script'; }
        var _this = _super.call(this, $header, title) || this;
        _this.column = column;
        return _this;
    }
    ScriptEditDialog.prototype.openDialog = function () {
        var _this = this;
        var bak = this.column.getScript();
        var $popup = this.makePopup("Parameters: <code>values: number[], children: Column[]</code><br>\n      <textarea autofocus=\"true\" rows=\"5\" autofocus=\"autofocus\" style=\"width: 95%;\">" + this.column.getScript() + "</textarea><br>");
        var updateData = function (script) {
            _this.column.setScript(script);
        };
        var updateImpl = function () {
            //get value
            var script = $popup.select('textarea').property('value');
            updateData(script);
        };
        $popup.select('.cancel').on('click', function () {
            $popup.select('textarea').property('value', bak);
            updateData(bak);
            $popup.remove();
        });
        $popup.select('.reset').on('click', function () {
            $popup.select('textarea').property('value', __WEBPACK_IMPORTED_MODULE_1__model_ScriptColumn__["a" /* default */].DEFAULT_SCRIPT);
            updateData(__WEBPACK_IMPORTED_MODULE_1__model_ScriptColumn__["a" /* default */].DEFAULT_SCRIPT);
        });
        $popup.select('.ok').on('click', function () {
            updateImpl();
            $popup.remove();
        });
    };
    return ScriptEditDialog;
}(__WEBPACK_IMPORTED_MODULE_0__ADialog__["a" /* default */]));
/* harmony default export */ __webpack_exports__["a"] = ScriptEditDialog;


/***/ }),
/* 43 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ADialog__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_d3__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_d3___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_d3__);
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};


var SearchDialog = (function (_super) {
    __extends(SearchDialog, _super);
    /**
     * opens a search dialog for the given column
     * @param column the column to rename
     * @param $header the visual header element of this column
     * @param provider the data provider for the actual search
     * @param title optional title
     */
    function SearchDialog(column, $header, provider, title) {
        if (title === void 0) { title = 'Search'; }
        var _this = _super.call(this, $header, title) || this;
        _this.column = column;
        _this.provider = provider;
        return _this;
    }
    SearchDialog.prototype.openDialog = function () {
        var _this = this;
        var popup = this.makePopup('<input type="text" size="15" value="" required="required" autofocus="autofocus"><br><label><input type="checkbox">RegExp</label><br>');
        popup.select('input[type="text"]').on('input', function () {
            var target = __WEBPACK_IMPORTED_MODULE_1_d3__["event"].target;
            var search = target.value;
            if (search.length >= 3) {
                var isRegex = popup.select('input[type="checkbox"]').property('checked');
                if (isRegex) {
                    search = new RegExp(search);
                }
                _this.provider.searchAndJump(search, _this.column);
            }
        });
        var updateImpl = function () {
            var search = popup.select('input[type="text"]').property('value');
            var isRegex = popup.select('input[type="text"]').property('checked');
            if (search.length > 0) {
                if (isRegex) {
                    search = new RegExp(search);
                }
                _this.provider.searchAndJump(search, _this.column);
            }
            popup.remove();
        };
        popup.select('input[type="checkbox"]').on('change', updateImpl);
        popup.select('.ok').on('click', updateImpl);
        popup.select('.cancel').on('click', function () {
            popup.remove();
        });
    };
    return SearchDialog;
}(__WEBPACK_IMPORTED_MODULE_0__ADialog__["a" /* default */]));
/* harmony default export */ __webpack_exports__["a"] = SearchDialog;


/***/ }),
/* 44 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ADialog__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__model_BoxPlotColumn__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__model_MultiValueColumn__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_d3__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_d3___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_d3__);
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};




var SortDialog = (function (_super) {
    __extends(SortDialog, _super);
    function SortDialog(column, $header, title) {
        if (title === void 0) { title = 'Change Sort Criteria'; }
        var _this = _super.call(this, $header, title) || this;
        _this.column = column;
        return _this;
    }
    SortDialog.prototype.openDialog = function () {
        var _this = this;
        var bak = this.column.getSortMethod();
        var valueString = Object.keys(this.column instanceof __WEBPACK_IMPORTED_MODULE_2__model_MultiValueColumn__["a" /* default */] ? __WEBPACK_IMPORTED_MODULE_2__model_MultiValueColumn__["b" /* SORT_METHOD */] : __WEBPACK_IMPORTED_MODULE_1__model_BoxPlotColumn__["b" /* SORT_METHOD */]);
        var popup = this.makeSortPopup(valueString.map(function (d) {
            return "<input type=\"radio\" name=\"multivaluesort\" value=" + d + "  " + ((bak === d) ? 'checked' : '') + " > " + (d.slice(0, 1).toUpperCase() + d.slice(1)) + " <br>";
        }).join('\n'));
        var sortContent = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_3_d3__["selectAll"])('input[name=multivaluesort]');
        sortContent.on('change', function () {
            var target = __WEBPACK_IMPORTED_MODULE_3_d3__["event"].target;
            var value = target.value;
            _this.column.setSortMethod(value);
        });
        this.hidePopupOnClickOutside(popup, sortContent);
    };
    return SortDialog;
}(__WEBPACK_IMPORTED_MODULE_0__ADialog__["a" /* default */]));
/* harmony default export */ __webpack_exports__["a"] = SortDialog;


/***/ }),
/* 45 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__model_StringColumn__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__AFilterDialog__ = __webpack_require__(9);
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};


var StringFilterDialog = (function (_super) {
    __extends(StringFilterDialog, _super);
    /**
     * opens a dialog for filtering a string column
     * @param column the column to filter
     * @param $header the visual header element of this column
     * @param title optional title
     */
    function StringFilterDialog(column, $header, title) {
        if (title === void 0) { title = 'Filter'; }
        return _super.call(this, column, $header, title) || this;
    }
    StringFilterDialog.prototype.openDialog = function () {
        var _this = this;
        var bak = this.column.getFilter() || '';
        var bakMissing = bak === __WEBPACK_IMPORTED_MODULE_0__model_StringColumn__["a" /* default */].FILTER_MISSING;
        if (bakMissing) {
            bak = '';
        }
        var $popup = this.makePopup("<input type=\"text\" placeholder=\"containing...\" autofocus=\"true\" size=\"15\" value=\"" + ((bak instanceof RegExp) ? bak.source : bak) + "\" autofocus=\"autofocus\">\n    <br><label><input type=\"checkbox\" " + ((bak instanceof RegExp) ? 'checked="checked"' : '') + ">RegExp</label><br><label><input class=\"lu_filter_missing\" type=\"checkbox\" " + (bakMissing ? 'checked="checked"' : '') + ">Filter Missing</label>\n    <br>");
        var updateData = function (filter) {
            _this.markFiltered((filter && filter !== ''));
            _this.column.setFilter(filter);
        };
        function updateImpl(force) {
            //get value
            var search = $popup.select('input[type="text"]').property('value');
            var filterMissing = $popup.select('input[type="checkbox"].lu_filter_missing').property('checked');
            if (filterMissing && search === '') {
                search = __WEBPACK_IMPORTED_MODULE_0__model_StringColumn__["a" /* default */].FILTER_MISSING;
            }
            if (search === '') {
                updateData(search);
                return;
            }
            if (search.length >= 3 || force) {
                var isRegex = $popup.select('input[type="checkbox"]:first-of-type').property('checked');
                if (isRegex && search !== __WEBPACK_IMPORTED_MODULE_0__model_StringColumn__["a" /* default */].FILTER_MISSING) {
                    search = new RegExp(search);
                }
                updateData(search);
            }
        }
        $popup.selectAll('input[type="checkbox"]').on('change', updateImpl);
        $popup.select('input[type="text"]').on('input', updateImpl);
        $popup.select('.cancel').on('click', function () {
            $popup.select('input[type="text"]').property('value', bak || '');
            $popup.select('input[type="checkbox"]:first-of-type').property('checked', bak instanceof RegExp ? 'checked' : null);
            $popup.select('input[type="checkbox"].lu_filter_missing').property('checked', bakMissing ? 'checked' : null);
            updateData(bak);
            $popup.remove();
        });
        $popup.select('.reset').on('click', function () {
            $popup.select('input[type="text"]').property('value', '');
            $popup.selectAll('input[type="checkbox"]').property('checked', null);
            updateData(null);
        });
        $popup.select('.ok').on('click', function () {
            updateImpl(true);
            $popup.remove();
        });
    };
    return StringFilterDialog;
}(__WEBPACK_IMPORTED_MODULE_1__AFilterDialog__["a" /* default */]));
/* harmony default export */ __webpack_exports__["a"] = StringFilterDialog;


/***/ }),
/* 46 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ADialog__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_d3__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_d3___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_d3__);
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};


var WeightsEditDialog = (function (_super) {
    __extends(WeightsEditDialog, _super);
    /**
     * opens a dialog for editing the weights of a stack column
     * @param column the column to filter
     * @param $header the visual header element of this column
     * @param title optional title
     */
    function WeightsEditDialog(column, $header, title) {
        if (title === void 0) { title = 'Edit Weights'; }
        var _this = _super.call(this, $header, title) || this;
        _this.column = column;
        return _this;
    }
    WeightsEditDialog.prototype.openDialog = function () {
        var _this = this;
        var weights = this.column.getWeights(), children = this.column.children.map(function (d, i) { return ({ col: d, weight: weights[i] * 100 }); });
        //map weights to pixels
        var scale = __WEBPACK_IMPORTED_MODULE_1_d3__["scale"].linear().domain([0, 100]).range([0, 120]);
        var $popup = this.makePopup('<table></table>');
        //show as a table with inputs and bars
        var $rows = $popup.select('table').selectAll('tr').data(children);
        var $rowsEnter = $rows.enter().append('tr');
        $rowsEnter.append('td')
            .append('input').attr({
            type: 'number',
            value: function (d) { return d.weight; },
            min: 0,
            max: 100,
            size: 5
        }).on('input', function (d) {
            d.weight = +this.value;
            redraw();
        });
        $rowsEnter.append('td').append('div')
            .attr('class', function (d) { return 'bar ' + d.col.cssClass; })
            .style('background-color', function (d) { return d.col.color; });
        $rowsEnter.append('td').text(function (d) { return d.col.label; });
        function redraw() {
            $rows.select('.bar').transition().style('width', function (d) { return scale(d.weight) + 'px'; });
        }
        redraw();
        $popup.select('.cancel').on('click', function () {
            _this.column.setWeights(weights);
            $popup.remove();
        });
        $popup.select('.reset').on('click', function () {
            children.forEach(function (d, i) { return d.weight = weights[i] * 100; });
            $rows.select('input').property('value', function (d) { return d.weight; });
            redraw();
        });
        $popup.select('.ok').on('click', function () {
            _this.column.setWeights(children.map(function (d) { return d.weight; }));
            $popup.remove();
        });
    };
    return WeightsEditDialog;
}(__WEBPACK_IMPORTED_MODULE_0__ADialog__["a" /* default */]));
/* harmony default export */ __webpack_exports__["a"] = WeightsEditDialog;


/***/ }),
/* 47 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_d3__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_d3___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_d3__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__utils__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__model_NumberColumn__ = __webpack_require__(5);
/**
 * Created by Samuel Gratzl on 14.08.2015.
 */



function clamp(v, min, max) {
    return Math.max(Math.min(v, max), min);
}
function unique(data) {
    var s = new Set();
    data.forEach(function (d) { return s.add(d); });
    var r = [];
    s.forEach(function (d) { return r.push(d); });
    return r;
}
var MappingEditor = (function () {
    function MappingEditor(parent, scale, original, oldFilter, dataPromise, options) {
        this.parent = parent;
        this.scale = scale;
        this.original = original;
        this.oldFilter = oldFilter;
        this.dataPromise = dataPromise;
        this.options = {
            idPrefix: '',
            width: 370,
            height: 225,
            padding_hor: 7,
            padding_ver: 7,
            filter_height: 20,
            radius: 5,
            callback: function () { return undefined; },
            callbackThisArg: null,
            triggerCallback: 'change' //change, dragend
        };
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__utils__["a" /* merge */])(this.options, options);
        //work on a local copy
        this.scale = scale.clone();
        this.build(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_d3__["select"])(parent));
    }
    Object.defineProperty(MappingEditor.prototype, "filter", {
        get: function () {
            return this.computeFilter();
        },
        enumerable: true,
        configurable: true
    });
    MappingEditor.prototype.build = function ($root) {
        var options = this.options, that = this;
        $root = $root.append('div').classed('lugui-me', true);
        var width = options.width - options.padding_hor * 2;
        var height = options.height - options.padding_ver * 2 - options.filter_height;
        $root.node().innerHTML = "<form onsubmit=\"return false\">\n      <div style=\"text-align: center\"><label for=\"me" + options.idPrefix + "mapping_type\">Mapping Type: <select id=\"me" + options.idPrefix + "mapping_type\">\n        <option value=\"linear\">Linear</option>\n        <option value=\"linear_invert\">Invert</option>\n        <option value=\"linear_abs\">Absolute</option>\n        <option value=\"log\">Log</option>\n        <option value=\"pow1.1\">Pow 1.1</option>\n        <option value=\"pow2\">Pow 2</option>\n        <option value=\"pow3\">Pow 3</option>\n        <option value=\"sqrt\">Sqrt</option>\n        <option value=\"script\">Custom Script</option>\n      </select>\n      </label></div>\n      <div class=\"mapping_area\">\n        <div>\n          <span>0</span>\n          <input type=\"text\" class=\"raw_min\" id=\"me" + options.idPrefix + "raw_min\" value=\"0\"><label for=\"me" + options.idPrefix + "raw_min\">Min</label>\n        </div>\n        <svg width=\"" + options.width + "\" height=\"" + options.height + "\">\n          <line y1=\"" + options.padding_ver + "\" y2=\"" + options.padding_ver + "\" x1=\"" + options.padding_hor + "\" x2=\"" + (width + options.padding_hor) + "\" stroke=\"black\"></line>\n          <rect class=\"adder\" x=\"" + options.padding_hor + "\" width=\"" + width + "\" height=\"10\"></rect>\n          <line y1=\"" + (options.height - options.filter_height - 5) + "\" y2=\"" + (options.height - options.filter_height - 5) + "\" x1=\"" + options.padding_hor + "\" x2=\"" + (width + options.padding_hor) + "\" stroke=\"black\"></line>\n          <rect class=\"adder\" x=\"" + options.padding_hor + "\" width=\"" + width + "\" height=\"10\" y=\"" + (options.height - options.filter_height - 10) + "\"></rect>\n          <g transform=\"translate(" + options.padding_hor + "," + options.padding_ver + ")\">\n            <g class=\"samples\">\n      \n            </g>\n            <g class=\"mappings\">\n      \n            </g>\n            <g class=\"filter\" transform=\"translate(0," + (options.height - options.filter_height - 10) + ")\">\n               <g class=\"left_filter\" transform=\"translate(0,0)\">\n                  <path d=\"M0,0L4,7L-4,7z\"></path>\n                  <rect x=\"-4\" y=\"7\" width=\"40\" height=\"13\" rx=\"2\" ry=\"2\"></rect>\n                  <text y=\"10\" x=\"4\" text-anchor=\"start\">&gt; 0</text>\n              </g>\n              <g class=\"right_filter\" transform=\"translate(" + width + ",0)\">\n                  <path d=\"M0,0L4,7L-4,7z\"></path>\n                  <rect x=\"-36\" y=\"7\" width=\"40\" height=\"13\" rx=\"2\" ry=\"2\"></rect>\n                  <text y=\"10\" x=\"3\" text-anchor=\"end\">&lt; 1</text>\n              </g>\n            </g>\n          </g>\n        </svg>\n        <div>\n          <span>1</span>\n          <input type=\"text\" class=\"raw_max\" id=\"me" + options.idPrefix + "raw_max\" value=\"1\"><label for=\"me" + options.idPrefix + "raw_max\">Max</label>\n        </div>\n      </div>\n      <div>\n         Extras: <label><input type=\"checkbox\" id=\"me" + options.idPrefix + "filterMissing\" " + (this.oldFilter.filterMissing ? 'checked="checked"' : '') + ">Filter Missing Values</label>\n      </div>\n      <div class=\"script\" style=\"/* display: none; */\">\n        <label for=\"me" + options.idPrefix + "script_code\">Custom Script</label><button>Apply</button>\n        <textarea id=\"me" + options.idPrefix + "script_code\">\n        </textarea>\n      </div>\n    </form>";
        var raw2pixel = __WEBPACK_IMPORTED_MODULE_0_d3__["scale"].linear().domain([Math.min(this.scale.domain[0], this.original.domain[0]), Math.max(this.scale.domain[this.scale.domain.length - 1], this.original.domain[this.original.domain.length - 1])])
            .range([0, width]);
        var normal2pixel = __WEBPACK_IMPORTED_MODULE_0_d3__["scale"].linear().domain([0, 1])
            .range([0, width]);
        $root.select('input.raw_min')
            .property('value', raw2pixel.domain()[0])
            .on('blur', function () {
            var d = raw2pixel.domain();
            d[0] = parseFloat(this.value);
            raw2pixel.domain(d);
            var old = that.scale.domain;
            old[0] = d[0];
            that.scale.domain = old;
            updateRaw();
            triggerUpdate();
        });
        $root.select('input.raw_max')
            .property('value', raw2pixel.domain()[1])
            .on('blur', function () {
            var d = raw2pixel.domain();
            d[1] = parseFloat(this.value);
            raw2pixel.domain(d);
            var old = that.scale.domain;
            old[old.length - 1] = d[1];
            that.scale.domain = old;
            updateRaw();
            triggerUpdate();
        });
        $root.select('input[type="checkbox"]').on('change', function () {
            triggerUpdate();
        });
        //lines that show mapping of individual data items
        var datalines = $root.select('g.samples').selectAll('line').data([]);
        this.dataPromise.then(function (data) {
            //to unique values
            data = unique(data);
            datalines = datalines.data(data);
            datalines.enter()
                .append('line')
                .attr({
                x1: function (d) { return normal2pixel(that.scale.apply(d)); },
                y1: 0,
                x2: raw2pixel,
                y2: height
            }).style('visibility', function (d) {
                var domain = that.scale.domain;
                return (d < domain[0] || d > domain[domain.length - 1]) ? 'hidden' : null;
            });
        });
        function updateDataLines() {
            datalines.attr({
                x1: function (d) { return normal2pixel(that.scale.apply(d)); },
                x2: raw2pixel
            }).style('visibility', function (d) {
                var domain = that.scale.domain;
                return (d < domain[0] || d > domain[domain.length - 1]) ? 'hidden' : null;
            });
        }
        function createDrag(move) {
            return __WEBPACK_IMPORTED_MODULE_0_d3__["behavior"].drag()
                .on('dragstart', function () {
                __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_d3__["select"])(this)
                    .classed('dragging', true)
                    .attr('r', options.radius * 1.1);
            })
                .on('drag', move)
                .on('dragend', function () {
                __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_d3__["select"])(this)
                    .classed('dragging', false)
                    .attr('r', options.radius);
                triggerUpdate(true);
            });
        }
        var mappingLines = [];
        function renderMappingLines() {
            if (!(that.scale instanceof __WEBPACK_IMPORTED_MODULE_2__model_NumberColumn__["d" /* ScaleMappingFunction */])) {
                return;
            }
            {
                var sscale = that.scale;
                var domain = sscale.domain;
                var range_1 = sscale.range;
                mappingLines = domain.map(function (d, i) { return ({ r: d, n: range_1[i] }); });
            }
            function updateScale() {
                //sort by raw value
                mappingLines.sort(function (a, b) { return a.r - b.r; });
                //update the scale
                var scale = that.scale;
                scale.domain = mappingLines.map(function (d) { return d.r; });
                scale.range = mappingLines.map(function (d) { return d.n; });
                //console.log(sscale.domain, sscale.range);
                updateDataLines();
            }
            function removePoint(i) {
                if (mappingLines.length <= 2) {
                    return; //can't remove have to have at least two
                }
                mappingLines.splice(i, 1);
                updateScale();
                renderMappingLines();
            }
            function addPoint(x) {
                var px = clamp(x, 0, width);
                mappingLines.push({
                    n: normal2pixel.invert(px),
                    r: raw2pixel.invert(px)
                });
                updateScale();
                renderMappingLines();
            }
            $root.selectAll('rect.adder').on('click', function () {
                addPoint(__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_d3__["mouse"])($root.select('svg > g').node())[0]);
            });
            var $mapping = $root.select('g.mappings').selectAll('g.mapping').data(mappingLines);
            var $mappingEnter = $mapping.enter().append('g').classed('mapping', true).on('contextmenu', function (d, i) {
                __WEBPACK_IMPORTED_MODULE_0_d3__["event"].preventDefault();
                __WEBPACK_IMPORTED_MODULE_0_d3__["event"].stopPropagation();
                removePoint(i);
            });
            $mappingEnter.append('line').attr({
                y1: 0,
                y2: height
            }).call(createDrag(function (d) {
                //drag the line shifts both point in parallel
                var dx = __WEBPACK_IMPORTED_MODULE_0_d3__["event"].dx;
                var nx = clamp(normal2pixel(d.n) + dx, 0, width);
                var rx = clamp(raw2pixel(d.r) + dx, 0, width);
                d.n = normal2pixel.invert(nx);
                d.r = raw2pixel.invert(rx);
                __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_d3__["select"])(this).attr('x1', nx).attr('x2', rx);
                __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_d3__["select"])(this.parentElement).select('circle.normalized').attr('cx', nx);
                __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_d3__["select"])(this.parentElement).select('circle.raw').attr('cx', rx);
                updateScale();
            }));
            $mappingEnter.append('circle').classed('normalized', true).attr('r', options.radius).call(createDrag(function (d) {
                //drag normalized
                var px = clamp(__WEBPACK_IMPORTED_MODULE_0_d3__["event"].x, 0, width);
                d.n = normal2pixel.invert(px);
                __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_d3__["select"])(this).attr('cx', px);
                __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_d3__["select"])(this.parentElement).select('line').attr('x1', px);
                updateScale();
            }));
            $mappingEnter.append('circle').classed('raw', true).attr('r', options.radius).attr('cy', height).call(createDrag(function (d) {
                //drag raw
                var px = clamp(__WEBPACK_IMPORTED_MODULE_0_d3__["event"].x, 0, width);
                d.r = raw2pixel.invert(px);
                __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_d3__["select"])(this).attr('cx', px);
                __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_d3__["select"])(this.parentElement).select('line').attr('x2', px);
                updateScale();
            }));
            $mapping.select('line').attr({
                x1: function (d) { return normal2pixel(d.n); },
                x2: function (d) { return raw2pixel(d.r); }
            });
            $mapping.select('circle.normalized').attr('cx', function (d) { return normal2pixel(d.n); });
            $mapping.select('circle.raw').attr('cx', function (d) { return raw2pixel(d.r); });
            $mapping.exit().remove();
        }
        function renderScript() {
            if (!(that.scale instanceof __WEBPACK_IMPORTED_MODULE_2__model_NumberColumn__["e" /* ScriptMappingFunction */])) {
                $root.select('div.script').style('display', 'none');
                return;
            }
            $root.select('div.script').style('display', null);
            var sscale = that.scale;
            var $text = $root.select('textarea').text(sscale.code);
            $root.select('div.script').select('button').on('click', function () {
                sscale.code = $text.property('value');
                updateDataLines();
                triggerUpdate();
            });
        }
        renderMappingLines();
        renderScript();
        function triggerUpdate(isDragEnd) {
            if (isDragEnd === void 0) { isDragEnd = false; }
            if (isDragEnd && (options.triggerCallback !== 'dragend')) {
                return;
            }
            options.callback.call(options.callbackThisArg, that.scale.clone(), that.filter);
        }
        {
            var minFilter_1 = (isFinite(this.oldFilter.min) ? raw2pixel(this.oldFilter.min) : 0);
            var maxFilter_1 = (isFinite(this.oldFilter.max) ? raw2pixel(this.oldFilter.max) : width);
            var toFilterString_1 = function (d, i) { return isFinite(d) ? ((i === 0 ? '>' : '<') + d.toFixed(1)) : 'any'; };
            $root.selectAll('g.left_filter, g.right_filter')
                .data([this.oldFilter.min, this.oldFilter.max])
                .attr('transform', function (d, i) { return "translate(" + (i === 0 ? minFilter_1 : maxFilter_1) + ",0)"; }).call(createDrag(function (d, i) {
                //drag normalized
                var px = clamp(__WEBPACK_IMPORTED_MODULE_0_d3__["event"].x, 0, width);
                var v = raw2pixel.invert(px);
                var filter = (px <= 0 && i === 0 ? -Infinity : (px >= width && i === 1 ? Infinity : v));
                __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_d3__["select"])(this).datum(filter)
                    .attr('transform', "translate(" + px + ",0)")
                    .select('text').text(toFilterString_1(filter, i));
            }))
                .select('text').text(toFilterString_1);
        }
        this.computeFilter = function () {
            return {
                min: parseFloat($root.select('g.left_filter').datum()),
                max: parseFloat($root.select('g.right_filter').datum()),
                filterMissing: $root.select('input[type="checkbox"]').property('checked')
            };
        };
        function updateRaw() {
            var d = raw2pixel.domain();
            $root.select('input.raw_min').property('value', d[0]);
            $root.select('input.raw_max').property('value', d[1]);
            updateDataLines();
            renderMappingLines();
        }
        updateRaw();
        $root.select('select').on('change', function () {
            var v = this.value;
            if (v === 'linear_invert') {
                that.scale = new __WEBPACK_IMPORTED_MODULE_2__model_NumberColumn__["d" /* ScaleMappingFunction */](raw2pixel.domain(), 'linear', [1, 0]);
            }
            else if (v === 'linear_abs') {
                var d = raw2pixel.domain();
                that.scale = new __WEBPACK_IMPORTED_MODULE_2__model_NumberColumn__["d" /* ScaleMappingFunction */]([d[0], (d[1] - d[0]) / 2, d[1]], 'linear', [1, 0, 1]);
            }
            else if (v === 'script') {
                that.scale = new __WEBPACK_IMPORTED_MODULE_2__model_NumberColumn__["e" /* ScriptMappingFunction */](raw2pixel.domain());
            }
            else {
                that.scale = new __WEBPACK_IMPORTED_MODULE_2__model_NumberColumn__["d" /* ScaleMappingFunction */](raw2pixel.domain(), v);
            }
            updateDataLines();
            renderMappingLines();
            renderScript();
            triggerUpdate();
        }).property('selectedIndex', function () {
            var name = 'script';
            if (that.scale instanceof __WEBPACK_IMPORTED_MODULE_2__model_NumberColumn__["d" /* ScaleMappingFunction */]) {
                name = that.scale.scaleType;
            }
            var types = ['linear', 'linear_invert', 'linear_abs', 'log', 'pow1.1', 'pow2', 'pow3', 'sqrt', 'script'];
            return types.indexOf(name);
        });
    };
    return MappingEditor;
}());
/* harmony default export */ __webpack_exports__["a"] = MappingEditor;


/***/ }),
/* 48 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Column__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__StringColumn__ = __webpack_require__(6);
/**
 * Created by sam on 04.11.2016.
 */
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};


/**
 * a string column in which the values can be edited locally
 */
var AnnotateColumn = (function (_super) {
    __extends(AnnotateColumn, _super);
    function AnnotateColumn(id, desc) {
        var _this = _super.call(this, id, desc) || this;
        _this.annotations = new Map();
        return _this;
    }
    AnnotateColumn.prototype.createEventList = function () {
        return _super.prototype.createEventList.call(this).concat([AnnotateColumn.EVENT_VALUE_CHANGED]);
    };
    AnnotateColumn.prototype.getValue = function (row, index) {
        if (this.annotations.has(index)) {
            return this.annotations.get(index);
        }
        return _super.prototype.getValue.call(this, row, index);
    };
    AnnotateColumn.prototype.dump = function (toDescRef) {
        var r = _super.prototype.dump.call(this, toDescRef);
        r.annotations = {};
        this.annotations.forEach(function (v, k) {
            r.annotations[k] = v;
        });
        return r;
    };
    AnnotateColumn.prototype.restore = function (dump, factory) {
        var _this = this;
        _super.prototype.restore.call(this, dump, factory);
        if (dump.annotations) {
            Object.keys(dump.annotations).forEach(function (k) {
                _this.annotations.set(Number(k), dump.annotations[k]);
            });
        }
    };
    AnnotateColumn.prototype.setValue = function (row, index, value) {
        var old = this.getValue(row, index);
        if (old === value) {
            return true;
        }
        if (value === '' || value == null) {
            this.annotations.delete(index);
        }
        else {
            this.annotations.set(index, value);
        }
        this.fire([AnnotateColumn.EVENT_VALUE_CHANGED, __WEBPACK_IMPORTED_MODULE_0__Column__["a" /* default */].EVENT_DIRTY_VALUES, __WEBPACK_IMPORTED_MODULE_0__Column__["a" /* default */].EVENT_DIRTY], index, old, value);
        return true;
    };
    return AnnotateColumn;
}(__WEBPACK_IMPORTED_MODULE_1__StringColumn__["a" /* default */]));
/* harmony default export */ __webpack_exports__["a"] = AnnotateColumn;
AnnotateColumn.EVENT_VALUE_CHANGED = 'valueChanged';


/***/ }),
/* 49 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_d3__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_d3___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_d3__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Column__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ValueColumn__ = __webpack_require__(3);
/**
 * Created by sam on 04.11.2016.
 */
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};



/**
 * a string column with optional alignment
 */
var BooleanColumn = (function (_super) {
    __extends(BooleanColumn, _super);
    function BooleanColumn(id, desc) {
        var _this = _super.call(this, id, desc) || this;
        _this.currentFilter = null;
        _this.trueMarker = 'X';
        _this.falseMarker = '';
        _this.setWidthImpl(30);
        _this.trueMarker = desc.trueMarker || _this.trueMarker;
        _this.falseMarker = desc.falseMarker || _this.falseMarker;
        return _this;
    }
    BooleanColumn.prototype.getValue = function (row, index) {
        var v = _super.prototype.getValue.call(this, row, index);
        if (typeof (v) === 'undefined' || v == null) {
            return false;
        }
        return v === true || v === 'true' || v === 'yes' || v === 'x';
    };
    BooleanColumn.prototype.getLabel = function (row, index) {
        var v = this.getValue(row, index);
        return v ? this.trueMarker : this.falseMarker;
    };
    BooleanColumn.prototype.dump = function (toDescRef) {
        var r = _super.prototype.dump.call(this, toDescRef);
        if (this.currentFilter !== null) {
            r.filter = this.currentFilter;
        }
        return r;
    };
    BooleanColumn.prototype.restore = function (dump, factory) {
        _super.prototype.restore.call(this, dump, factory);
        if (typeof dump.filter !== 'undefined') {
            this.currentFilter = dump.filter;
        }
    };
    BooleanColumn.prototype.isFiltered = function () {
        return this.currentFilter !== null;
    };
    BooleanColumn.prototype.filter = function (row, index) {
        if (!this.isFiltered()) {
            return true;
        }
        var r = this.getValue(row, index);
        return r === this.currentFilter;
    };
    BooleanColumn.prototype.getFilter = function () {
        return this.currentFilter;
    };
    BooleanColumn.prototype.setFilter = function (filter) {
        if (this.currentFilter === filter) {
            return;
        }
        this.fire([__WEBPACK_IMPORTED_MODULE_1__Column__["a" /* default */].EVENT_FILTER_CHANGED, __WEBPACK_IMPORTED_MODULE_1__Column__["a" /* default */].EVENT_DIRTY_VALUES, __WEBPACK_IMPORTED_MODULE_1__Column__["a" /* default */].EVENT_DIRTY], this.currentFilter, this.currentFilter = filter);
    };
    BooleanColumn.prototype.compare = function (a, b, aIndex, bIndex) {
        return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_d3__["ascending"])(this.getValue(a, aIndex), this.getValue(b, bIndex));
    };
    return BooleanColumn;
}(__WEBPACK_IMPORTED_MODULE_2__ValueColumn__["a" /* default */]));
/* harmony default export */ __webpack_exports__["a"] = BooleanColumn;


/***/ }),
/* 50 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_d3__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_d3___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_d3__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Column__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ValueColumn__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__CategoricalColumn__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__NumberColumn__ = __webpack_require__(5);
/**
 * Created by sam on 04.11.2016.
 */
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};





/**
 * similar to a categorical column but the categories are mapped to numbers
 */
var CategoricalNumberColumn = (function (_super) {
    __extends(CategoricalNumberColumn, _super);
    function CategoricalNumberColumn(id, desc) {
        var _this = _super.call(this, id, desc) || this;
        _this.colors = __WEBPACK_IMPORTED_MODULE_0_d3__["scale"].category10();
        /**
         * category labels by default the category name itself
         * @type {Array}
         */
        _this.catLabels = new Map();
        _this.scale = __WEBPACK_IMPORTED_MODULE_0_d3__["scale"].ordinal().rangeRoundPoints([0, 1]);
        _this.currentFilter = null;
        /**
         * separator for multi handling
         * @type {string}
         */
        _this.separator = ';';
        _this.combiner = __WEBPACK_IMPORTED_MODULE_0_d3__["max"];
        _this.separator = desc.separator || _this.separator;
        __WEBPACK_IMPORTED_MODULE_3__CategoricalColumn__["a" /* default */].prototype.initCategories.call(_this, desc);
        _this.scale.domain(_this.colors.domain());
        if (desc.categories) {
            //lookup value or 0.5 by default
            var values = desc.categories.map(function (d) { return ((typeof d !== 'string' && typeof (d.value) === 'number')) ? d.value : 0.5; });
            _this.scale.range(values);
        }
        return _this;
    }
    CategoricalNumberColumn.prototype.createEventList = function () {
        return _super.prototype.createEventList.call(this).concat([CategoricalNumberColumn.EVENT_MAPPING_CHANGED]);
    };
    Object.defineProperty(CategoricalNumberColumn.prototype, "categories", {
        get: function () {
            return this.colors.domain().slice();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CategoricalNumberColumn.prototype, "categoryColors", {
        get: function () {
            return this.colors.range().slice();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CategoricalNumberColumn.prototype, "categoryLabels", {
        get: function () {
            var _this = this;
            //no mapping
            if (this.catLabels === null || this.catLabels.size === 0) {
                return this.categories;
            }
            //label or identity mapping
            return this.categories.map(function (c) { return _this.catLabels.has(c) ? _this.catLabels.get(c) : c; });
        },
        enumerable: true,
        configurable: true
    });
    CategoricalNumberColumn.prototype.colorOf = function (cat) {
        return this.colors(cat);
    };
    CategoricalNumberColumn.prototype.getLabel = function (row, index) {
        return __WEBPACK_IMPORTED_MODULE_3__CategoricalColumn__["a" /* default */].prototype.getLabel.call(this, row, index);
    };
    CategoricalNumberColumn.prototype.getFirstLabel = function (row, index) {
        return __WEBPACK_IMPORTED_MODULE_3__CategoricalColumn__["a" /* default */].prototype.getFirstLabel.call(this, row, index);
    };
    CategoricalNumberColumn.prototype.getLabels = function (row, index) {
        return __WEBPACK_IMPORTED_MODULE_3__CategoricalColumn__["a" /* default */].prototype.getLabels.call(this, row, index);
    };
    CategoricalNumberColumn.prototype.getValue = function (row, index) {
        var r = this.getValues(row, index);
        return r.length > 0 ? this.combiner(r) : 0;
    };
    CategoricalNumberColumn.prototype.getValues = function (row, index) {
        var r = __WEBPACK_IMPORTED_MODULE_3__CategoricalColumn__["a" /* default */].prototype.getValues.call(this, row, index);
        return r.map(this.scale);
    };
    CategoricalNumberColumn.prototype.getCategories = function (row, index) {
        return __WEBPACK_IMPORTED_MODULE_3__CategoricalColumn__["a" /* default */].prototype.getValues.call(this, row, index);
    };
    CategoricalNumberColumn.prototype.getNumber = function (row, index) {
        return this.getValue(row, index);
    };
    CategoricalNumberColumn.prototype.getColor = function (row, index) {
        var vs = this.getValues(row, index);
        var cs = this.getColors(row, index);
        if (this.combiner === __WEBPACK_IMPORTED_MODULE_0_d3__["max"]) {
            //use the max color
            return cs.slice(1).reduce(function (prev, act, i) { return vs[i + 1] > prev.v ? { c: act, v: vs[i + 1] } : prev; }, {
                c: cs[0],
                v: vs[0]
            }).c;
        }
        else if (this.combiner === __WEBPACK_IMPORTED_MODULE_0_d3__["min"]) {
            //use the max color
            return cs.slice(1).reduce(function (prev, act, i) { return vs[i + 1] < prev.v ? { c: act, v: vs[i + 1] } : prev; }, {
                c: cs[0],
                v: vs[0]
            }).c;
        }
        else {
            //use the first
            return cs[0] || null;
        }
    };
    CategoricalNumberColumn.prototype.getColors = function (row, index) {
        return __WEBPACK_IMPORTED_MODULE_3__CategoricalColumn__["a" /* default */].prototype.getColors.call(this, row, index);
    };
    CategoricalNumberColumn.prototype.dump = function (toDescRef) {
        var r = __WEBPACK_IMPORTED_MODULE_3__CategoricalColumn__["a" /* default */].prototype.dump.call(this, toDescRef);
        r.scale = {
            domain: this.scale.domain(),
            range: this.scale.range(),
            separator: this.separator
        };
        return r;
    };
    CategoricalNumberColumn.prototype.restore = function (dump, factory) {
        __WEBPACK_IMPORTED_MODULE_3__CategoricalColumn__["a" /* default */].prototype.restore.call(this, dump, factory);
        if (dump.scale) {
            this.scale.domain(dump.scale.domain).range(dump.scale.range);
        }
        this.separator = dump.separator || this.separator;
    };
    CategoricalNumberColumn.prototype.getScale = function () {
        return {
            domain: this.scale.domain(),
            range: this.scale.range()
        };
    };
    CategoricalNumberColumn.prototype.getMapping = function () {
        return this.scale.range().slice();
    };
    CategoricalNumberColumn.prototype.setMapping = function (range) {
        var bak = this.getScale();
        this.scale.range(range);
        this.fire([CategoricalNumberColumn.EVENT_MAPPING_CHANGED, __WEBPACK_IMPORTED_MODULE_1__Column__["a" /* default */].EVENT_DIRTY_VALUES, __WEBPACK_IMPORTED_MODULE_1__Column__["a" /* default */].EVENT_DIRTY], bak, this.getScale());
    };
    CategoricalNumberColumn.prototype.isFiltered = function () {
        return this.currentFilter != null;
    };
    CategoricalNumberColumn.prototype.filter = function (row, index) {
        return __WEBPACK_IMPORTED_MODULE_3__CategoricalColumn__["a" /* default */].prototype.filter.call(this, row, index);
    };
    CategoricalNumberColumn.prototype.getFilter = function () {
        return this.currentFilter;
    };
    CategoricalNumberColumn.prototype.setFilter = function (filter) {
        return __WEBPACK_IMPORTED_MODULE_3__CategoricalColumn__["a" /* default */].prototype.setFilter.call(this, filter);
    };
    CategoricalNumberColumn.prototype.compare = function (a, b, aIndex, bIndex) {
        return __WEBPACK_IMPORTED_MODULE_4__NumberColumn__["b" /* default */].prototype.compare.call(this, a, b, aIndex, bIndex);
    };
    CategoricalNumberColumn.prototype.getRendererType = function () {
        return __WEBPACK_IMPORTED_MODULE_4__NumberColumn__["b" /* default */].prototype.getRendererType.call(this);
    };
    return CategoricalNumberColumn;
}(__WEBPACK_IMPORTED_MODULE_2__ValueColumn__["a" /* default */]));
/* harmony default export */ __webpack_exports__["a"] = CategoricalNumberColumn;
CategoricalNumberColumn.EVENT_MAPPING_CHANGED = __WEBPACK_IMPORTED_MODULE_4__NumberColumn__["b" /* default */].EVENT_MAPPING_CHANGED;


/***/ }),
/* 51 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Column__ = __webpack_require__(2);
/**
 * Created by sam on 04.11.2016.
 */
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};

/**
 * a default column with no values
 */
var DummyColumn = (function (_super) {
    __extends(DummyColumn, _super);
    function DummyColumn(id, desc) {
        return _super.call(this, id, desc) || this;
    }
    DummyColumn.prototype.getLabel = function (row) {
        return '';
    };
    DummyColumn.prototype.getValue = function (row) {
        return '';
    };
    DummyColumn.prototype.compare = function (a, b) {
        return 0; //can't compare
    };
    return DummyColumn;
}(__WEBPACK_IMPORTED_MODULE_0__Column__["a" /* default */]));
/* harmony default export */ __webpack_exports__["a"] = DummyColumn;


/***/ }),
/* 52 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__CompositeColumn__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Column__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__StackColumn__ = __webpack_require__(18);
/**
 * Created by sam on 04.11.2016.
 */
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};



var MultiLevelCompositeColumn = (function (_super) {
    __extends(MultiLevelCompositeColumn, _super);
    function MultiLevelCompositeColumn(id, desc) {
        var _this = _super.call(this, id, desc) || this;
        /**
         * whether this stack column is collapsed i.e. just looks like an ordinary number column
         * @type {boolean}
         * @private
         */
        _this.collapsed = false;
        var that = _this;
        _this.adaptChange = function (old, newValue) {
            that.adaptWidthChange(old, newValue);
        };
        return _this;
    }
    MultiLevelCompositeColumn.prototype.createEventList = function () {
        return _super.prototype.createEventList.call(this).concat([MultiLevelCompositeColumn.EVENT_COLLAPSE_CHANGED]);
    };
    MultiLevelCompositeColumn.prototype.setCollapsed = function (value) {
        if (this.collapsed === value) {
            return;
        }
        this.fire([__WEBPACK_IMPORTED_MODULE_2__StackColumn__["a" /* default */].EVENT_COLLAPSE_CHANGED, __WEBPACK_IMPORTED_MODULE_1__Column__["a" /* default */].EVENT_DIRTY_HEADER, __WEBPACK_IMPORTED_MODULE_1__Column__["a" /* default */].EVENT_DIRTY_VALUES, __WEBPACK_IMPORTED_MODULE_1__Column__["a" /* default */].EVENT_DIRTY], this.collapsed, this.collapsed = value);
    };
    MultiLevelCompositeColumn.prototype.getCollapsed = function () {
        return this.collapsed;
    };
    MultiLevelCompositeColumn.prototype.dump = function (toDescRef) {
        var r = _super.prototype.dump.call(this, toDescRef);
        r.collapsed = this.collapsed;
        return r;
    };
    MultiLevelCompositeColumn.prototype.restore = function (dump, factory) {
        this.collapsed = dump.collapsed === true;
        _super.prototype.restore.call(this, dump, factory);
    };
    MultiLevelCompositeColumn.prototype.flatten = function (r, offset, levelsToGo, padding) {
        if (levelsToGo === void 0) { levelsToGo = 0; }
        if (padding === void 0) { padding = 0; }
        return __WEBPACK_IMPORTED_MODULE_2__StackColumn__["a" /* default */].prototype.flatten.call(this, r, offset, levelsToGo, padding);
    };
    /**
     * inserts a column at a the given position
     * @param col
     * @param index
     */
    MultiLevelCompositeColumn.prototype.insert = function (col, index) {
        col.on(__WEBPACK_IMPORTED_MODULE_1__Column__["a" /* default */].EVENT_WIDTH_CHANGED + '.stack', this.adaptChange);
        //increase my width
        _super.prototype.setWidth.call(this, this.length === 0 ? col.getWidth() : (this.getWidth() + col.getWidth()));
        return _super.prototype.insert.call(this, col, index);
    };
    /**
     * adapts weights according to an own width change
     * @param oldValue
     * @param newValue
     */
    MultiLevelCompositeColumn.prototype.adaptWidthChange = function (oldValue, newValue) {
        if (oldValue === newValue) {
            return;
        }
        _super.prototype.setWidth.call(this, this.getWidth() + (newValue - oldValue));
    };
    MultiLevelCompositeColumn.prototype.removeImpl = function (child) {
        child.on(__WEBPACK_IMPORTED_MODULE_1__Column__["a" /* default */].EVENT_WIDTH_CHANGED + '.stack', null);
        _super.prototype.setWidth.call(this, this.length === 1 ? 100 : this.getWidth() - child.getWidth());
        return _super.prototype.removeImpl.call(this, child);
    };
    MultiLevelCompositeColumn.prototype.setWidth = function (value) {
        var factor = this.length / this.getWidth();
        this._children.forEach(function (child) {
            //disable since we change it
            child.setWidthImpl(child.getWidth() * factor);
        });
        _super.prototype.setWidth.call(this, value);
    };
    MultiLevelCompositeColumn.prototype.getrendererType = function () {
        if (this.getCollapsed()) {
            return MultiLevelCompositeColumn.EVENT_COLLAPSE_CHANGED;
        }
        return _super.prototype.getRendererType.call(this);
    };
    return MultiLevelCompositeColumn;
}(__WEBPACK_IMPORTED_MODULE_0__CompositeColumn__["b" /* default */]));
/* harmony default export */ __webpack_exports__["a"] = MultiLevelCompositeColumn;
MultiLevelCompositeColumn.EVENT_COLLAPSE_CHANGED = __WEBPACK_IMPORTED_MODULE_2__StackColumn__["a" /* default */].EVENT_COLLAPSE_CHANGED;


/***/ }),
/* 53 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ValueColumn__ = __webpack_require__(3);
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};

var SetColumn = (function (_super) {
    __extends(SetColumn, _super);
    function SetColumn(id, desc) {
        var _this = _super.call(this, id, desc) || this;
        _this.dataLength = (desc.dataLength);
        return _this;
    }
    SetColumn.prototype.compare = function (a, b, aIndex, bIndex) {
        var aVal = this.getBinaryValue(a, aIndex);
        var bVal = this.getBinaryValue(b, bIndex);
        if (aVal === null) {
            return bVal === null ? 0 : +1;
        }
        if (bVal === null) {
            return -1;
        }
        var aCat = aVal.filter(function (x) { return x; }).length;
        var bCat = bVal.filter(function (x) { return x; }).length;
        return (aCat - bCat);
    };
    SetColumn.prototype.cellDimension = function () {
        return (this.getWidth() / this.dataLength);
    };
    SetColumn.prototype.getBinaryValue = function (row, index) {
        return this.getValue(row, index).map(function (d) { return d === SetColumn.IN_GROUP; });
    };
    SetColumn.prototype.getNumber = function (row, index) {
        return this.getValue(row, index);
    };
    return SetColumn;
}(__WEBPACK_IMPORTED_MODULE_0__ValueColumn__["a" /* default */]));
/* harmony default export */ __webpack_exports__["a"] = SetColumn;
SetColumn.IN_GROUP = 1;


/***/ }),
/* 54 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils__ = __webpack_require__(1);

var ActionRenderer = (function () {
    function ActionRenderer() {
    }
    ActionRenderer.prototype.createSVG = function (col, context) {
        var actions = context.option('actions', []);
        return {
            template: "<text class='actions hoverOnly fa'>" + actions.map(function (a) { return "<tspan>" + a.icon + "</tspan>"; }).join('') + "</text>",
            update: function (n, d) {
                __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utils__["j" /* forEach */])(n, 'tspan', function (ni, i) {
                    ni.onclick = function (event) {
                        event.preventDefault();
                        event.stopPropagation();
                        actions[i].action(d.v, d.dataIndex);
                    };
                });
            }
        };
    };
    ActionRenderer.prototype.createHTML = function (col, context) {
        var actions = context.option('actions', []);
        return {
            template: "<div class='actions hoverOnly'>" + actions.map(function (a) { return "<span title='" + a.name + "' class='fa'>" + a.icon + "</span>"; }).join('') + "</div>",
            update: function (n, d) {
                __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utils__["j" /* forEach */])(n, 'span', function (ni, i) {
                    ni.onclick = function (event) {
                        event.preventDefault();
                        event.stopPropagation();
                        actions[i].action(d.v, d.dataIndex);
                    };
                });
            }
        };
    };
    ActionRenderer.prototype.createCanvas = function (col, context) {
        var actions = context.option('actions', []);
        return function (ctx, d, i, dx, dy) {
            var hovered = context.hovered(d.dataIndex);
            if (hovered) {
                var overlay = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utils__["k" /* showOverlay */])(context.idPrefix + col.id, dx, dy);
                overlay.style.width = col.getWidth() + 'px';
                overlay.classList.add('actions');
                overlay.innerHTML = actions.map(function (a) { return "<span title='" + a.name + "' class='fa'>" + a.icon + "</span>"; }).join('');
                __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utils__["j" /* forEach */])(overlay, 'span', function (ni, i) {
                    ni.onclick = function (event) {
                        event.preventDefault();
                        event.stopPropagation();
                        actions[i].action(d.v, d.dataIndex);
                    };
                });
            }
        };
    };
    return ActionRenderer;
}());
/* harmony default export */ __webpack_exports__["a"] = ActionRenderer;
;


/***/ }),
/* 55 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils__ = __webpack_require__(1);

var AnnotationRenderer = (function () {
    function AnnotationRenderer() {
    }
    AnnotationRenderer.prototype.createSVG = function (col, context) {
        return {
            template: "<g class='annotations'>\n        <text class='notHoverOnly text' clip-path='url(#cp" + context.idPrefix + "clipCol" + col.id + ")'></text>\n        <foreignObject class='hoverOnly' x='-2' y='-2'>\n          <input type='text'>\n        </foreignObject>\n       </g>",
            update: function (n, d, i) {
                var input = n.querySelector('foreignObject *');
                input.onchange = function () {
                    col.setValue(d.v, d.dataIndex, input.value);
                };
                input.onclick = function (event) {
                    event.stopPropagation();
                };
                input.style.width = col.getWidth() + 'px';
                input.value = col.getLabel(d.v, d.dataIndex);
                n.querySelector('text').textContent = col.getLabel(d.v, d.dataIndex);
                var f = n.querySelector('foreignObject');
                f.setAttribute('width', String(col.getWidth()));
                f.setAttribute('height', String(context.rowHeight(i)));
            }
        };
    };
    AnnotationRenderer.prototype.createHTML = function (col) {
        return {
            template: "<div class='annotations text'>\n        <input type='text' class='hoverOnly'>\n        <span class='text notHoverOnly'></span>\n       </div>",
            update: function (n, d) {
                var input = n.querySelector('input');
                input.onchange = function () {
                    col.setValue(d.v, d.dataIndex, input.value);
                };
                input.onclick = function (event) {
                    event.stopPropagation();
                };
                n.style.width = input.style.width = col.getWidth() + 'px';
                input.value = col.getLabel(d.v, d.dataIndex);
                n.querySelector('span').textContent = col.getLabel(d.v, d.dataIndex);
            }
        };
    };
    AnnotationRenderer.prototype.createCanvas = function (col, context) {
        return function (ctx, d, i, dx, dy) {
            var hovered = context.hovered(d.dataIndex);
            if (hovered) {
                var overlay = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utils__["k" /* showOverlay */])(context.idPrefix + col.id, dx, dy);
                overlay.style.width = col.getWidth() + 'px';
                overlay.innerHTML = "<input type='text' value='" + col.getValue(d.v, d.dataIndex) + "' style='width:" + col.getWidth() + "px'>";
                var input_1 = overlay.childNodes[0];
                input_1.onchange = function () {
                    col.setValue(d.v, d.dataIndex, input_1.value);
                };
                input_1.onclick = function (event) {
                    event.stopPropagation();
                };
            }
            else {
                __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utils__["g" /* clipText */])(ctx, col.getLabel(d.v, d.dataIndex), 0, 0, col.getWidth(), context.textHints);
            }
        };
    };
    return AnnotationRenderer;
}());
/* harmony default export */ __webpack_exports__["a"] = AnnotationRenderer;
;


/***/ }),
/* 56 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils__ = __webpack_require__(1);

/**
 * a renderer rendering a bar for numerical columns
 */
var BarCellRenderer = (function () {
    /**
     * flag to always render the value
     * @type {boolean}
     */
    function BarCellRenderer(renderValue, colorOf) {
        if (renderValue === void 0) { renderValue = false; }
        if (colorOf === void 0) { colorOf = function (d, i, col) { return col.color; }; }
        this.renderValue = renderValue;
        this.colorOf = colorOf;
    }
    BarCellRenderer.prototype.createSVG = function (col, context) {
        var _this = this;
        var paddingTop = context.option('rowBarTopPadding', context.option('rowBarPadding', 1));
        var paddingBottom = context.option('rowBarBottomPadding', context.option('rowBarPadding', 1));
        return {
            template: "<g class='bar'>\n          <rect class='" + col.cssClass + "' y='" + paddingTop + "' style='fill: " + col.color + "'>\n            <title></title>\n          </rect>\n          <text class='number " + (this.renderValue ? '' : 'hoverOnly') + "' clip-path='url(#cp" + context.idPrefix + "clipCol" + col.id + ")'></text>\n        </g>",
            update: function (n, d, i) {
                n.querySelector('rect title').textContent = col.getLabel(d.v, d.dataIndex);
                var width = col.getWidth() * col.getValue(d.v, d.dataIndex);
                __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utils__["h" /* attr */])(n.querySelector('rect'), {
                    y: paddingTop,
                    width: isNaN(width) ? 0 : width,
                    height: context.rowHeight(i) - (paddingTop + paddingBottom)
                }, {
                    fill: _this.colorOf(d.v, i, col)
                });
                __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utils__["h" /* attr */])(n.querySelector('text'), {}).textContent = col.getLabel(d.v, d.dataIndex);
            }
        };
    };
    BarCellRenderer.prototype.createHTML = function (col, context) {
        var _this = this;
        var paddingTop = context.option('rowBarTopPadding', context.option('rowBarPadding', 1));
        var paddingBottom = context.option('rowBarBottomPadding', context.option('rowBarPadding', 1));
        return {
            template: "<div class='bar' style='top:" + paddingTop + "px; background-color: " + col.color + "'>\n          <span class='number " + (this.renderValue ? '' : 'hoverOnly') + "'></span>\n        </div>",
            update: function (n, d, i) {
                var width = col.getWidth() * col.getValue(d.v, d.dataIndex);
                __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utils__["h" /* attr */])(n, {
                    title: col.getLabel(d.v, d.dataIndex)
                }, {
                    width: (isNaN(width) ? 0 : width) + "px",
                    height: context.rowHeight(i) - (paddingTop + paddingBottom) + "px",
                    top: paddingTop + "px",
                    'background-color': _this.colorOf(d.v, i, col)
                });
                n.querySelector('span').textContent = col.getLabel(d.v, d.dataIndex);
            }
        };
    };
    BarCellRenderer.prototype.createCanvas = function (col, context) {
        var _this = this;
        var paddingTop = context.option('rowBarTopPadding', context.option('rowBarPadding', 1));
        var paddingBottom = context.option('rowBarBottomPadding', context.option('rowBarPadding', 1));
        return function (ctx, d, i) {
            ctx.fillStyle = _this.colorOf(d.v, i, col);
            var width = col.getWidth() * col.getValue(d.v, d.dataIndex);
            ctx.fillRect(0, paddingTop, isNaN(width) ? 0 : width, context.rowHeight(i) - (paddingTop + paddingBottom));
            if (_this.renderValue || context.hovered(d.dataIndex) || context.selected(d.dataIndex)) {
                ctx.fillStyle = context.option('style.text', 'black');
                __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utils__["g" /* clipText */])(ctx, col.getLabel(d.v, d.dataIndex), 1, 0, col.getWidth() - 1, context.textHints);
            }
        };
    };
    return BarCellRenderer;
}());
/* harmony default export */ __webpack_exports__["a"] = BarCellRenderer;


/***/ }),
/* 57 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_d3__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_d3___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_d3__);


var BoxplotCellRenderer = (function () {
    function BoxplotCellRenderer() {
    }
    BoxplotCellRenderer.prototype.createSVG = function (col, context) {
        var sortMethod = col.getSortMethod();
        var topPadding = 2.5 * (context.option('rowBarPadding', 1));
        var domain = col.getDomain();
        var scale = __WEBPACK_IMPORTED_MODULE_1_d3__["scale"].linear().domain(domain).range([0, col.getWidth()]);
        var sortedByMe = col.findMyRanker().getSortCriteria().col === col;
        return {
            template: "<g class='boxplotcell'>\n            <rect class='boxplotrect' y='" + topPadding + "'></rect>\n            <path class='boxplotallpath'></path>\n            <path class='boxplotsortpath' style='display: none'></path>\n        </g>",
            update: function (n, d, i) {
                var rawBoxdata = col.getBoxPlotData(d.v, d.dataIndex);
                var rowHeight = context.rowHeight(i);
                var scaled = {
                    min: scale(rawBoxdata.min),
                    median: scale(rawBoxdata.median),
                    q1: scale(rawBoxdata.q1),
                    q3: scale(rawBoxdata.q3),
                    max: scale(rawBoxdata.max)
                };
                __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utils__["h" /* attr */])(n.querySelector('rect'), {
                    x: scaled.q1,
                    width: (scaled.q3 - scaled.q1),
                    height: (rowHeight - (topPadding * 2))
                });
                var bottomPos = (rowHeight - topPadding);
                var middlePos = (rowHeight - topPadding) / 2;
                var path = "M" + scaled.min + "," + middlePos + "L" + scaled.q1 + "," + middlePos + "M" + scaled.min + "," + topPadding + "L" + scaled.min + "," + bottomPos +
                    ("M" + scaled.median + "," + topPadding + "L" + scaled.median + "," + bottomPos) +
                    ("M" + scaled.q3 + "," + middlePos + "L" + scaled.max + "," + middlePos) +
                    ("M" + scaled.max + "," + topPadding + "L" + scaled.max + "," + bottomPos); // maximum line
                __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utils__["h" /* attr */])(n.querySelector('path.boxplotallpath'), {
                    d: path
                });
                __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utils__["h" /* attr */])(n.querySelector('path.boxplotsortpath'), {
                    d: "M" + scaled[sortMethod] + "," + topPadding + "L" + scaled[sortMethod] + "," + bottomPos
                }, {
                    display: sortedByMe ? null : 'none'
                });
            }
        };
    };
    BoxplotCellRenderer.prototype.createCanvas = function (col, context) {
        var sortMethod = col.getSortMethod();
        var topPadding = 2.5 * (context.option('rowBarPadding', 1));
        var domain = col.getDomain();
        var scale = __WEBPACK_IMPORTED_MODULE_1_d3__["scale"].linear().domain([__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_d3__["min"])(domain), __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_d3__["max"])(domain)]).range([0, col.getWidth()]);
        var sortedByMe = col.findMyRanker().getSortCriteria().col === col;
        return function (ctx, d, i) {
            var rowHeight = context.rowHeight(i);
            // Rectangle
            var rawBoxdata = col.getBoxPlotData(d.v, d.dataIndex);
            var scaled = {
                min: scale(rawBoxdata.min),
                median: scale(rawBoxdata.median),
                q1: scale(rawBoxdata.q1),
                q3: scale(rawBoxdata.q3),
                max: scale(rawBoxdata.max)
            };
            var minPos = scaled.min, maxPos = scaled.max, medianPos = scaled.median, q3Pos = scaled.q3, q1Pos = scaled.q1;
            ctx.fillStyle = '#e0e0e0';
            ctx.strokeStyle = 'black';
            ctx.beginPath();
            ctx.rect((q1Pos), topPadding, ((q3Pos) - (q1Pos)), (rowHeight - (topPadding * 2)));
            ctx.fill();
            ctx.stroke();
            //Line
            var bottomPos = (rowHeight - topPadding);
            var middlePos = (rowHeight - topPadding) / 2;
            ctx.strokeStyle = 'black';
            ctx.fillStyle = '#e0e0e0';
            ctx.beginPath();
            ctx.moveTo(minPos, middlePos);
            ctx.lineTo((q1Pos), middlePos);
            ctx.moveTo(minPos, topPadding);
            ctx.lineTo(minPos, bottomPos);
            ctx.moveTo(medianPos, topPadding);
            ctx.lineTo(medianPos, bottomPos);
            ctx.moveTo((q3Pos), middlePos);
            ctx.lineTo(maxPos, middlePos);
            ctx.moveTo(maxPos, topPadding);
            ctx.lineTo(maxPos, bottomPos);
            ctx.stroke();
            ctx.fill();
            if (sortedByMe) {
                ctx.strokeStyle = 'red';
                ctx.fillStyle = '#ff0700';
                ctx.beginPath();
                ctx.moveTo(scaled[sortMethod], topPadding);
                ctx.lineTo(scaled[sortMethod], bottomPos);
                ctx.stroke();
                ctx.fill();
            }
        };
    };
    return BoxplotCellRenderer;
}());
/* harmony default export */ __webpack_exports__["a"] = BoxplotCellRenderer;


/***/ }),
/* 58 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils__ = __webpack_require__(1);

/**
 * renders categorical columns as a colored rect with label
 */
var CategoricalCellRenderer = (function () {
    /**
     * class to append to the text elements
     * @type {string}
     */
    function CategoricalCellRenderer(textClass) {
        if (textClass === void 0) { textClass = 'cat'; }
        this.textClass = textClass;
        this.textClass = textClass;
    }
    CategoricalCellRenderer.prototype.createSVG = function (col, context) {
        var padding = context.option('rowBarPadding', 1);
        return {
            template: "<g class='" + this.textClass + "'>\n        <text clip-path='url(#cp" + context.idPrefix + "clipCol" + col.id + ")'></text>\n        <rect y='" + padding + "'></rect>\n      </g>",
            update: function (n, d, i) {
                var cell = Math.min(col.getWidth() * 0.3, Math.max(context.rowHeight(i) - padding * 2, 0));
                __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utils__["h" /* attr */])(n.querySelector('rect'), {
                    width: cell,
                    height: cell
                }, {
                    fill: col.getColor(d.v, d.dataIndex)
                });
                __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utils__["h" /* attr */])(n.querySelector('text'), {
                    x: cell + padding * 2
                }).textContent = col.getLabel(d.v, d.dataIndex);
            }
        };
    };
    CategoricalCellRenderer.prototype.createHTML = function (col, context) {
        var padding = context.option('rowBarPadding', 1);
        return {
            template: "<div class='" + this.textClass + "'>\n        <div></div>\n        <span></span>\n      </div>",
            update: function (n, d, i) {
                var cell = Math.min(col.getWidth() * 0.3, Math.max(context.rowHeight(i) - padding * 2, 0));
                __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utils__["h" /* attr */])(n, {}, {
                    width: col.getWidth() + "px"
                });
                __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utils__["h" /* attr */])(n.querySelector('div'), {}, {
                    width: cell + 'px',
                    height: cell + 'px',
                    'background-color': col.getColor(d.v, d.dataIndex)
                });
                __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utils__["h" /* attr */])(n.querySelector('span'), {}).textContent = col.getLabel(d.v, d.dataIndex);
            }
        };
    };
    CategoricalCellRenderer.prototype.createCanvas = function (col, context) {
        var padding = context.option('rowBarPadding', 1);
        return function (ctx, d, i) {
            var cell = Math.min(col.getWidth() * 0.3, Math.max(context.rowHeight(i) - padding * 2, 0));
            ctx.fillStyle = col.getColor(d.v, d.dataIndex);
            ctx.fillRect(0, 0, cell, cell);
            ctx.fillStyle = context.option('style.text', 'black');
            __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utils__["g" /* clipText */])(ctx, col.getLabel(d.v, d.dataIndex), cell + 2, 0, col.getWidth() - cell - 2, context.textHints);
        };
    };
    ;
    return CategoricalCellRenderer;
}());
/* harmony default export */ __webpack_exports__["a"] = CategoricalCellRenderer;


/***/ }),
/* 59 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils__ = __webpack_require__(1);

var CircleCellRenderer = (function () {
    function CircleCellRenderer(renderValue, colorOf) {
        if (renderValue === void 0) { renderValue = false; }
        if (colorOf === void 0) { colorOf = function (d, i, col) { return col.color; }; }
        this.renderValue = renderValue;
        this.colorOf = colorOf;
        this.renderValue = renderValue;
    }
    CircleCellRenderer.prototype.createSVG = function (col, context) {
        var padding = context.option('rowBarPadding', 1);
        return {
            template: "<g class='bar'>\n          <circle class='" + col.cssClass + "' style='fill: " + col.color + "'>\n            <title></title>\n          </circle>\n          <text class='number " + (this.renderValue ? '' : 'hoverOnly') + "' clip-path='url(#cp" + context.idPrefix + "clipCol" + col.id + ")'></text>\n        </g>",
            update: function (n, d, i) {
                var v = col.getValue(d.v, d.dataIndex);
                __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utils__["h" /* attr */])(n.querySelector('circle'), {
                    cy: (context.rowHeight(i) / 2),
                    cx: (col.getWidth() / 2),
                    r: (context.rowHeight(i) / 2) * v
                });
                __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utils__["h" /* attr */])(n.querySelector('text'), {}).textContent = v;
            }
        };
    };
    CircleCellRenderer.prototype.createCanvas = function (col, context) {
        var _this = this;
        return function (ctx, d, i) {
            var posy = (context.rowHeight(i) / 2);
            var posx = (col.getWidth() / 2);
            ctx.fillStyle = _this.colorOf(d.v, i, col);
            ctx.strokeStyle = _this.colorOf(d.v, i, col);
            ctx.beginPath();
            ctx.arc(posx, posy, (context.rowHeight(i) / 2) * col.getValue(d.v, d.dataIndex), 0, 2 * Math.PI);
            ctx.fill();
            ctx.stroke();
            if (_this.renderValue || context.hovered(d.dataIndex) || context.selected(d.dataIndex)) {
                ctx.fillStyle = context.option('style.text', 'black');
                __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utils__["g" /* clipText */])(ctx, col.getLabel(d.v, d.dataIndex), 1, 0, col.getWidth() - 1, context.textHints);
            }
        };
    };
    return CircleCellRenderer;
}());
/* harmony default export */ __webpack_exports__["a"] = CircleCellRenderer;


/***/ }),
/* 60 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__model_Column__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__utils__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_d3__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_d3___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_d3__);



var Heatmap = (function () {
    function Heatmap() {
    }
    Heatmap.toHeatMapColor = function (d, index, col) {
        var v = col.getNumber(d, index);
        if (isNaN(v)) {
            v = 0;
        }
        //hsl space encoding, encode in lightness
        var color = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2_d3__["hsl"])(col.color || __WEBPACK_IMPORTED_MODULE_0__model_Column__["a" /* default */].DEFAULT_COLOR);
        color.l = v;
        return color.toString();
    };
    Heatmap.prototype.createSVG = function (col, context) {
        var padding = context.option('rowBarPadding', 1);
        return {
            template: "<rect class='heatmap " + col.cssClass + "' y='" + padding + "' style='fill: " + col.color + "'>\n            <title></title>\n          </rect>",
            update: function (n, d, i) {
                n.querySelector('title').textContent = col.getLabel(d.v, d.dataIndex);
                var w = context.rowHeight(i) - padding * 2;
                __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__utils__["h" /* attr */])(n, {
                    y: padding,
                    width: w,
                    height: w
                }, {
                    fill: Heatmap.toHeatMapColor(d.v, d.dataIndex, col)
                });
            }
        };
    };
    Heatmap.prototype.createHTML = function (col, context) {
        var padding = context.option('rowBarPadding', 1);
        return {
            template: "<div class='heatmap " + col.cssClass + "' style='background-color: " + col.color + "; top: " + padding + "'></div>",
            update: function (n, d, i) {
                var w = context.rowHeight(i) - padding * 2;
                __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__utils__["h" /* attr */])(n, {
                    title: col.getLabel(d.v, d.dataIndex)
                }, {
                    width: w + "px",
                    height: w + "px",
                    top: padding + "px",
                    'background-color': Heatmap.toHeatMapColor(d.v, d.dataIndex, col)
                });
            }
        };
    };
    Heatmap.prototype.createCanvas = function (col, context) {
        var padding = context.option('rowBarPadding', 1);
        return function (ctx, d, i) {
            var w = context.rowHeight(i) - padding * 2;
            ctx.fillStyle = Heatmap.toHeatMapColor(d.v, d.dataIndex, col);
            ctx.fillRect(padding, padding, w, w);
        };
    };
    return Heatmap;
}());
/* harmony default export */ __webpack_exports__["a"] = Heatmap;
;


/***/ }),
/* 61 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils__ = __webpack_require__(1);

var LinkCellRenderer = (function () {
    function LinkCellRenderer() {
    }
    LinkCellRenderer.prototype.createSVG = function (col, context) {
        return {
            template: "<text class='link text' clip-path='url(#cp" + context.idPrefix + "clipCol" + col.id + ")'></text>",
            update: function (n, d) {
                n.innerHTML = col.isLink(d.v, d.dataIndex) ? "<a class='link' xlink:href='" + col.getValue(d.v, d.dataIndex) + "' target='_blank'>" + col.getLabel(d.v, d.dataIndex) + "</a>" : col.getLabel(d.v, d.dataIndex);
            }
        };
    };
    LinkCellRenderer.prototype.createHTML = function (col) {
        return {
            template: "<div class='link text'></div>",
            update: function (n, d) {
                n.style.width = col.getWidth() + 'px';
                n.innerHTML = col.isLink(d.v, d.dataIndex) ? "<a class='link' href='" + col.getValue(d.v, d.dataIndex) + "' target='_blank'>" + col.getLabel(d.v, d.dataIndex) + "</a>" : col.getLabel(d.v, d.dataIndex);
            }
        };
    };
    LinkCellRenderer.prototype.createCanvas = function (col, context) {
        return function (ctx, d, i, dx, dy) {
            var isLink = col.isLink(d.v, d.dataIndex);
            if (!isLink) {
                __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utils__["g" /* clipText */])(ctx, col.getLabel(d.v, d.dataIndex), 0, 0, col.getWidth(), context.textHints);
                return;
            }
            var hovered = context.hovered(d.dataIndex);
            if (hovered) {
                var overlay = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utils__["k" /* showOverlay */])(context.idPrefix + col.id, dx, dy);
                overlay.style.width = col.getWidth() + 'px';
                overlay.innerHTML = "<a class='link' href='" + col.getValue(d.v, d.dataIndex) + "' target='_blank'>" + col.getLabel(d.v, d.dataIndex) + "</a>";
            }
            else {
                var bak = ctx.fillStyle;
                ctx.fillStyle = context.option('style.link', context.option('style.text', 'black'));
                __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utils__["g" /* clipText */])(ctx, col.getLabel(d.v, d.dataIndex), 0, 0, col.getWidth(), context.textHints);
                ctx.fillStyle = bak;
            }
        };
    };
    return LinkCellRenderer;
}());
/* harmony default export */ __webpack_exports__["a"] = LinkCellRenderer;


/***/ }),
/* 62 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils__ = __webpack_require__(1);

var LoadingCellRenderer = (function () {
    function LoadingCellRenderer() {
    }
    LoadingCellRenderer.prototype.createSVG = function (col) {
        return {
            template: "<text class='loading'><tspan class='fa'>\uF110</tspan>Loading\u2026</text>",
            update: function () { return undefined; } // TODO svg animation
        };
    };
    LoadingCellRenderer.prototype.createHTML = function (col) {
        return {
            template: "<div class='loading'><i class='fa fa-spinner fa-pulse'></i><div>Loading\u2026</div></div>",
            update: function () { return undefined; }
        };
    };
    LoadingCellRenderer.prototype.createCanvas = function (col, context) {
        var base = Date.now() % 360;
        return function (ctx, d, i) {
            __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utils__["g" /* clipText */])(ctx, 'Loading…', 10, 0, col.getWidth() - 10, context.textHints);
            var angle = (base + i * 45) * (Math.PI / 180);
            ctx.save();
            ctx.font = '10pt FontAwesome';
            ctx.textAlign = 'center';
            var shift = (context.rowHeight(i) - context.textHints.spinnerWidth) * 0.5;
            ctx.translate(2, shift + context.textHints.spinnerWidth * 0.5);
            ctx.rotate(angle);
            ctx.translate(0, -context.textHints.spinnerWidth * 0.5);
            ctx.fillText('\uf110', 0, 0);
            ctx.restore();
        };
    };
    return LoadingCellRenderer;
}());
/* harmony default export */ __webpack_exports__["a"] = LoadingCellRenderer;
;


/***/ }),
/* 63 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_d3__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_d3___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_d3__);

var MultiValueCellRenderer = (function () {
    function MultiValueCellRenderer() {
    }
    MultiValueCellRenderer.prototype.createSVG = function (col, context) {
        var cellDimension = col.calculateCellDimension(col.getWidth());
        var colorScale = col.getColorScale();
        var padding = context.option('rowBarPadding', 1);
        return {
            template: "<g class=\"heatmapcell\"></g>",
            update: function (n, d, i) {
                var rect = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_d3__["select"])(n).selectAll('rect').data(col.getValue(d.v, d.dataIndex));
                rect.enter().append('rect').attr({
                    y: padding,
                    width: cellDimension,
                    height: context.rowHeight(i)
                });
                rect.attr({
                    x: function (d, i) { return i * cellDimension; },
                    fill: colorScale
                });
                rect.exit().remove();
            }
        };
    };
    MultiValueCellRenderer.prototype.createHTML = function (col, context) {
        var cellDimension = col.calculateCellDimension(col.getWidth());
        var padding = context.option('rowBarPadding', 1);
        var colorScale = col.getColorScale();
        return {
            template: "<div class=\"heatmapcell\" style=\"top:" + padding + "px;\"></div>",
            update: function (n, d, i) {
                var g = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_d3__["select"])(n);
                var div = g.selectAll('div').data(col.getValue(d.v, d.dataIndex));
                div.enter().append('div').style({
                    widht: cellDimension + 'px',
                    height: context.rowHeight(i) + 'px'
                });
                div.style({
                    'background-color': colorScale,
                    'left': function (d, i) { return (i * cellDimension) + 'px'; }
                });
            }
        };
    };
    MultiValueCellRenderer.prototype.createCanvas = function (col, context) {
        var cellDimension = col.calculateCellDimension(col.getWidth());
        var padding = context.option('rowBarPadding', 1);
        var colorScale = col.getColorScale();
        return function (ctx, d, i) {
            var data = col.getValue(d.v, d.dataIndex);
            var rowHeight = context.rowHeight(i);
            data.forEach(function (d, j) {
                var x = (j * cellDimension);
                ctx.beginPath();
                ctx.fillStyle = String(colorScale(d));
                ctx.fillRect(x, padding, cellDimension, rowHeight);
            });
        };
    };
    return MultiValueCellRenderer;
}());
/* harmony default export */ __webpack_exports__["a"] = MultiValueCellRenderer;


/***/ }),
/* 64 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils__ = __webpack_require__(1);

var SelectionRenderer = (function () {
    function SelectionRenderer() {
    }
    SelectionRenderer.prototype.createSVG = function (col) {
        return {
            template: "<text class='selection fa'><tspan class='selectionOnly'>\uF046</tspan><tspan class='notSelectionOnly'>\uF096</tspan></text>",
            update: function (n, d) {
                n.onclick = function (event) {
                    event.preventDefault();
                    event.stopPropagation();
                    col.toggleValue(d.v, d.dataIndex);
                };
            }
        };
    };
    SelectionRenderer.prototype.createHTML = function (col) {
        return {
            template: "<div class='selection fa'></div>",
            update: function (n, d) {
                n.onclick = function (event) {
                    event.preventDefault();
                    event.stopPropagation();
                    col.toggleValue(d.v, d.dataIndex);
                };
            }
        };
    };
    SelectionRenderer.prototype.createCanvas = function (col, context) {
        return function (ctx, d) {
            var bak = ctx.font;
            ctx.font = '10pt FontAwesome';
            __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utils__["g" /* clipText */])(ctx, col.getValue(d.v, d.dataIndex) ? '\uf046' : '\uf096', 0, 0, col.getWidth(), context.textHints);
            ctx.font = bak;
        };
    };
    return SelectionRenderer;
}());
/* harmony default export */ __webpack_exports__["a"] = SelectionRenderer;


/***/ }),
/* 65 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_d3__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_d3___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_d3__);


var SetCellRenderer = (function () {
    function SetCellRenderer() {
    }
    SetCellRenderer.setPathCalculate = function (setData, cellDimension) {
        var catindexes = [];
        setData.forEach(function (d, i) { return (d) ? catindexes.push(i) : -1; });
        var left = (catindexes[0] * cellDimension) + (cellDimension / 2);
        var right = (catindexes[catindexes.length - 1] * cellDimension) + (cellDimension / 2);
        return { left: left, right: right };
    };
    ;
    SetCellRenderer.prototype.createSVG = function (col, context) {
        var cellDimension = col.cellDimension();
        return {
            template: "<g class='upsetcell'><path class='upsetpath'></path></g>",
            update: function (n, d, i) {
                var rowHeight = context.rowHeight(i);
                var value = col.getBinaryValue(d.v, d.dataIndex);
                var hasTrueValues = value.some(function (d) { return d; }); //some values are true?
                var circle = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1_d3__["select"])(n).selectAll('circle').data(value);
                circle.enter().append('circle');
                circle
                    .attr({
                    cy: function (d, j) { return (rowHeight / 2); },
                    cx: function (d, j) { return (j * cellDimension) + (cellDimension / 2); },
                    r: (cellDimension / 4),
                    class: function (d) { return d ? 'setcircle' : 'setcircleOpacity'; }
                });
                circle.exit().remove();
                var path = '';
                if (hasTrueValues) {
                    var pathCordinate = SetCellRenderer.setPathCalculate(value, cellDimension);
                    path = "M" + pathCordinate.left + "," + rowHeight / 2 + "L" + pathCordinate.right + "," + rowHeight / 2;
                }
                __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utils__["h" /* attr */])(n.querySelector('path'), {
                    d: path
                });
            }
        };
    };
    SetCellRenderer.prototype.createCanvas = function (col, context) {
        var cellDimension = col.cellDimension();
        return function (ctx, d, i) {
            // Circle
            var data = col.getBinaryValue(d.v, d.dataIndex);
            var hasTrueValues = data.some(function (d) { return d; }); //some values are true?
            var rowHeight = context.rowHeight(i);
            var radius = (rowHeight / 3);
            ctx.save();
            ctx.fillStyle = 'black';
            ctx.strokeStyle = 'black';
            if (hasTrueValues) {
                var pathCordinate = hasTrueValues ? SetCellRenderer.setPathCalculate(data, cellDimension) : null;
                ctx.beginPath();
                ctx.moveTo((pathCordinate.left), (rowHeight / 2));
                ctx.lineTo((pathCordinate.right), (rowHeight / 2));
                ctx.fill();
                ctx.stroke();
            }
            data.forEach(function (d, j) {
                var posy = (rowHeight / 2);
                var posx = (j * cellDimension) + (cellDimension / 2);
                ctx.beginPath();
                ctx.globalAlpha = d ? 1 : 0.1;
                ctx.arc(posx, posy, radius, 0, 2 * Math.PI);
                ctx.fill();
                ctx.stroke();
            });
            ctx.restore();
        };
    };
    return SetCellRenderer;
}());
/* harmony default export */ __webpack_exports__["a"] = SetCellRenderer;


/***/ }),
/* 66 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_d3__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_d3___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_d3__);


var SparklineCellRenderer = (function () {
    function SparklineCellRenderer() {
    }
    SparklineCellRenderer.prototype.createSVG = function (col, context) {
        var scales = col.getSparklineScale();
        var xScale = scales.xScale.range([0, col.getWidth()]);
        var yScale = scales.yScale;
        var line = __WEBPACK_IMPORTED_MODULE_1_d3__["svg"].line()
            .x(function (d, j) { return xScale(j); })
            .y(yScale)
            .interpolate('linear');
        return {
            template: "<path class='sparklinecell'></path>",
            update: function (n, d, i) {
                yScale.range([context.rowHeight(i), 0]);
                __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utils__["h" /* attr */])(n, {
                    d: line(col.getValue(d.v, d.dataIndex))
                });
            }
        };
    };
    SparklineCellRenderer.prototype.createCanvas = function (col, context) {
        var scales = col.getSparklineScale();
        var xScale = scales.xScale.range([0, col.getWidth()]);
        var yScale = scales.yScale;
        return function (ctx, d, i) {
            var data = col.getValue(d.v, d.dataIndex);
            var xpos, ypos;
            yScale.range([context.rowHeight(i), 0]);
            ctx.strokeStyle = 'black';
            ctx.fillStyle = 'black';
            data.forEach(function (d, i) {
                ctx.beginPath();
                ctx.moveTo(xpos, ypos);
                xpos = xScale(i);
                ypos = yScale(d);
                ctx.lineTo(xpos, ypos);
                ctx.stroke();
                ctx.fill();
            });
        };
    };
    return SparklineCellRenderer;
}());
/* harmony default export */ __webpack_exports__["a"] = SparklineCellRenderer;


/***/ }),
/* 67 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils__ = __webpack_require__(1);

/**
 * renders a stacked column using composite pattern
 */
var StackCellRenderer = (function () {
    function StackCellRenderer(nestingPossible) {
        if (nestingPossible === void 0) { nestingPossible = true; }
        this.nestingPossible = nestingPossible;
    }
    StackCellRenderer.prototype.createData = function (col, context) {
        var stacked = this.nestingPossible && context.option('stacked', true);
        var padding = context.option('columnPadding', 0);
        var offset = 0;
        return col.children.map(function (d) {
            var shift = offset;
            offset += d.getWidth();
            offset += (!stacked ? padding : 0);
            return {
                column: d,
                shift: shift,
                stacked: stacked,
                renderer: context.renderer(d)
            };
        });
    };
    StackCellRenderer.prototype.createSVG = function (col, context) {
        var cols = this.createData(col, context);
        return {
            template: "<g class='stack component" + context.option('stackLevel', 0) + "'>" + cols.map(function (d) { return d.renderer.template; }).join('') + "</g>",
            update: function (n, d, i) {
                var stackShift = 0;
                __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utils__["i" /* matchColumns */])(n, cols);
                cols.forEach(function (col, ci) {
                    var cnode = n.childNodes[ci];
                    cnode.setAttribute('transform', "translate(" + (col.shift - stackShift) + ",0)");
                    col.renderer.update(cnode, d, i);
                    if (col.stacked) {
                        stackShift += col.column.getWidth() * (1 - col.column.getValue(d.v, d.dataIndex));
                    }
                });
            }
        };
    };
    StackCellRenderer.prototype.createHTML = function (col, context) {
        var cols = this.createData(col, context);
        return {
            template: "<div class='stack component" + context.option('stackLevel', 0) + "'>" + cols.map(function (d) { return d.renderer.template; }).join('') + "</div>",
            update: function (n, d, i) {
                var stackShift = 0;
                __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__utils__["i" /* matchColumns */])(n, cols, 'html');
                cols.forEach(function (col, ci) {
                    var cnode = n.childNodes[ci];
                    cnode.style.transform = "translate(" + (col.shift - stackShift) + "px,0)";
                    col.renderer.update(cnode, d, i);
                    if (col.stacked) {
                        stackShift += col.column.getWidth() * (1 - col.column.getValue(d.v, d.dataIndex));
                    }
                });
            }
        };
    };
    StackCellRenderer.prototype.createCanvas = function (col, context) {
        var cols = this.createData(col, context);
        return function (ctx, d, i, dx, dy) {
            var stackShift = 0;
            cols.forEach(function (col) {
                var shift = col.shift - stackShift;
                ctx.translate(shift, 0);
                col.renderer(ctx, d, i, dx + shift, dy);
                ctx.translate(-shift, 0);
                if (col.stacked) {
                    stackShift += col.column.getWidth() * (1 - col.column.getValue(d.v, d.dataIndex));
                }
            });
        };
    };
    return StackCellRenderer;
}());
/* harmony default export */ __webpack_exports__["a"] = StackCellRenderer;


/***/ }),
/* 68 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__DefaultCellRenderer__ = __webpack_require__(28);

/**
 * renders a string with additional alignment behavior
 * one instance factory shared among strings
 */
var StringCellRenderer = (function () {
    function StringCellRenderer() {
        this.alignments = {
            left: new __WEBPACK_IMPORTED_MODULE_0__DefaultCellRenderer__["a" /* DefaultCellRenderer */](),
            right: new __WEBPACK_IMPORTED_MODULE_0__DefaultCellRenderer__["a" /* DefaultCellRenderer */]('text_right', 'right'),
            center: new __WEBPACK_IMPORTED_MODULE_0__DefaultCellRenderer__["a" /* DefaultCellRenderer */]('text_center', 'center')
        };
    }
    StringCellRenderer.prototype.createSVG = function (col, context) {
        return this.alignments[col.alignment].createSVG(col, context);
    };
    StringCellRenderer.prototype.createHTML = function (col, context) {
        return this.alignments[col.alignment].createHTML(col, context);
    };
    StringCellRenderer.prototype.createCanvas = function (col, context) {
        return this.alignments[col.alignment].createCanvas(col, context);
    };
    return StringCellRenderer;
}());
/* harmony default export */ __webpack_exports__["a"] = StringCellRenderer;


/***/ }),
/* 69 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_d3__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_d3___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_d3__);

var ThresholdCellRenderer = (function () {
    function ThresholdCellRenderer() {
    }
    ThresholdCellRenderer.prototype.createSVG = function (col, context) {
        var cellDimension = col.calculateCellDimension(col.getWidth());
        var threshold = col.getThreshold();
        var colorValues = col.getColorScale().range();
        return {
            template: "<g class='thresholdcell'></g>",
            update: function (n, d, i) {
                var rowHeight = context.rowHeight(i);
                var rect = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_d3__["select"])(n).selectAll('rect').data(col.getValue(d.v, d.dataIndex));
                rect.enter().append('rect');
                rect
                    .attr({
                    y: function (d, j) { return (d < threshold) ? (rowHeight / 2) : 0; },
                    x: function (d, j) { return (j * cellDimension); },
                    width: cellDimension,
                    height: function (d, j) { return (rowHeight / 2); },
                    fill: function (d) { return (d < threshold) ? colorValues[0] : colorValues[2]; }
                });
                rect.exit().remove();
            }
        };
    };
    ThresholdCellRenderer.prototype.createCanvas = function (col, context) {
        var cellDimension = col.calculateCellDimension(col.getWidth());
        var threshold = col.getThreshold();
        var colorValues = col.getColorScale().range();
        return function (ctx, d, i) {
            var data = col.getValue(d.v, d.dataIndex);
            var rowHeight = context.rowHeight(i);
            data.forEach(function (d, j) {
                ctx.beginPath();
                var xpos = (j * cellDimension);
                var ypos = (d < threshold) ? (rowHeight / 2) : 0;
                ctx.fillStyle = (d < threshold) ? colorValues[0] : colorValues[2];
                ctx.fillRect(xpos, ypos, cellDimension, rowHeight / 2);
            });
        };
    };
    return ThresholdCellRenderer;
}());
/* harmony default export */ __webpack_exports__["a"] = ThresholdCellRenderer;


/***/ }),
/* 70 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_d3__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_d3___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_d3__);

var VerticalBarCellRenderer = (function () {
    function VerticalBarCellRenderer() {
    }
    VerticalBarCellRenderer.verticalBarScale = function (domain, threshold, scale, rowHeight) {
        return (domain[0] < threshold) ? (scale.range([0, rowHeight / 2])) : scale.range([0, rowHeight]);
    };
    ;
    VerticalBarCellRenderer.verticalBarYpos = function (domain, threshold, cellData, scale, rowHeight) {
        if (domain[0] < threshold) {
            return (cellData < threshold) ? (rowHeight / 2) : rowHeight / 2 - scale(cellData); // For positive and negative value
        }
        else {
            return rowHeight - scale(cellData);
        }
    };
    ;
    VerticalBarCellRenderer.verticalBarHeight = function (domain, threshold, cellData, scale, rowHeight) {
        return (domain[0] < threshold) ? (rowHeight / 2 - scale(cellData)) : scale(cellData);
    };
    ;
    VerticalBarCellRenderer.prototype.createSVG = function (col, context) {
        var colorScale = col.getColorScale();
        var cellDimension = col.calculateCellDimension(col.getWidth());
        var defaultScale = col.getVerticalBarScale();
        var threshold = col.getThreshold();
        var domain = col.getDomain();
        return {
            template: "<g class='verticalbarcell'></g>",
            update: function (n, d, i) {
                var rowHeight = context.rowHeight(i);
                var scale = VerticalBarCellRenderer.verticalBarScale(domain, threshold, defaultScale, rowHeight);
                var rect = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_d3__["select"])(n).selectAll('rect').data(col.getValue(d.v, d.dataIndex));
                rect.enter().append('rect').attr('width', cellDimension);
                rect.attr({
                    y: function (d) { return VerticalBarCellRenderer.verticalBarYpos(domain, threshold, d, scale, rowHeight); },
                    x: function (d, j) { return (j * cellDimension); },
                    height: function (d) { return VerticalBarCellRenderer.verticalBarHeight(domain, threshold, d, scale, rowHeight); },
                    fill: colorScale
                });
                rect.exit().remove();
            }
        };
    };
    VerticalBarCellRenderer.prototype.createCanvas = function (col, context) {
        var colorScale = col.getColorScale();
        var cellDimension = col.calculateCellDimension(col.getWidth());
        var defaultScale = col.getVerticalBarScale();
        var threshold = col.getThreshold();
        var domain = col.getDomain();
        return function (ctx, d, i) {
            var data = col.getValue(d.v, d.dataIndex);
            var rowHeight = context.rowHeight(i);
            var scale = VerticalBarCellRenderer.verticalBarScale(domain, threshold, defaultScale, rowHeight);
            data.forEach(function (d, j) {
                var xpos = (j * cellDimension);
                var ypos = VerticalBarCellRenderer.verticalBarYpos(domain, threshold, d, scale, rowHeight);
                ctx.fillStyle = String(colorScale(d));
                ctx.fillRect(xpos, ypos, cellDimension, VerticalBarCellRenderer.verticalBarHeight(domain, threshold, d, scale, rowHeight));
            });
        };
    };
    return VerticalBarCellRenderer;
}());
/* harmony default export */ __webpack_exports__["a"] = VerticalBarCellRenderer;


/***/ }),
/* 71 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_d3__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_d3___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_d3__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__utils__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__model_SelectionColumn__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__renderer_index__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ABodyRenderer__ = __webpack_require__(21);
/**
 * Created by Samuel Gratzl on 14.08.2015.
 */
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};





var BodyCanvasRenderer = (function (_super) {
    __extends(BodyCanvasRenderer, _super);
    function BodyCanvasRenderer(data, parent, slicer, options) {
        if (options === void 0) { options = {}; }
        var _this = _super.call(this, data, parent, slicer, 'div', __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__utils__["a" /* merge */])({}, BodyCanvasRenderer.CUSTOM_OPTIONS, options)) || this;
        _this.currentFreezeLeft = 0;
        _this.currentHover = -1;
        _this.lastShifts = [];
        _this.$node.append('canvas');
        _this.initInteraction();
        return _this;
    }
    BodyCanvasRenderer.prototype.columnUnderMouse = function (x) {
        for (var _i = 0, _a = this.lastShifts; _i < _a.length; _i++) {
            var shift = _a[_i];
            if (shift.shift <= x && x < (shift.shift + shift.column.getWidth())) {
                return shift.column;
            }
        }
        return null;
    };
    BodyCanvasRenderer.prototype.rowUnderMouse = function (y) {
        var rowHeight = this.options.rowHeight;
        return Math.floor((y + 1) / rowHeight);
    };
    BodyCanvasRenderer.prototype.itemUnderMouse = function (xy) {
        var row = this.rowUnderMouse(xy[1]);
        if (row < 0) {
            return null;
        }
        var col = this.columnUnderMouse(xy[0]);
        if (col === null) {
            return null;
        }
        var order = col.findMyRanker().getOrder();
        return {
            dataIndex: order[row],
            column: col
        };
    };
    BodyCanvasRenderer.prototype.initInteraction = function () {
        var _this = this;
        this.$node.on('selectstart', function () { return __WEBPACK_IMPORTED_MODULE_0_d3__["event"].preventDefault(); });
        this.$node.on('mousemove', function () {
            var mouse = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_d3__["mouse"])(_this.node);
            var pos = _this.itemUnderMouse(mouse);
            _this.mouseOver(pos ? pos.dataIndex : -1);
        });
        this.$node.on('mouseenter', function () {
            _this.mouseOver(-1, false);
        });
        this.$node.on('mouseleave', function () {
            _this.mouseOver(-1, false);
        });
        this.$node.on('click', function () {
            var mouse = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_d3__["mouse"])(_this.node);
            var pos = _this.itemUnderMouse(mouse);
            if (pos) {
                //additional if click on Selection Column
                _this.select(pos.dataIndex, __WEBPACK_IMPORTED_MODULE_0_d3__["event"].ctrlKey || pos.column instanceof __WEBPACK_IMPORTED_MODULE_2__model_SelectionColumn__["a" /* default */]);
            }
        });
    };
    /**
     * get a style
     */
    BodyCanvasRenderer.prototype.style = function (name) {
        var o = this.options;
        return (o.style || {})[name];
    };
    BodyCanvasRenderer.prototype.select = function (dataIndex, additional) {
        if (additional === void 0) { additional = false; }
        var selected = _super.prototype.select.call(this, dataIndex, additional);
        this.update();
        return selected;
    };
    BodyCanvasRenderer.prototype.drawSelection = function () {
        this.update(); //no shortcut so far
    };
    BodyCanvasRenderer.prototype.updateFreeze = function (left) {
        this.currentFreezeLeft = left;
        this.update(); //no shortcut so far
    };
    BodyCanvasRenderer.prototype.mouseOver = function (dataIndex, hover) {
        if (hover === void 0) { hover = true; }
        if (hover === (this.currentHover === dataIndex)) {
            return;
        }
        this.currentHover = dataIndex;
        _super.prototype.mouseOver.call(this, dataIndex, dataIndex >= 0);
        if (!hover || dataIndex < 0) {
            __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__utils__["e" /* hideOverlays */])();
        }
        this.update();
    };
    BodyCanvasRenderer.prototype.isHovered = function (dataIndex) {
        return this.currentHover === dataIndex;
    };
    BodyCanvasRenderer.prototype.renderRow = function (ctx, context, ranking, di, i) {
        var dataIndex = di.dataIndex;
        var dx = ranking.shift;
        var dy = context.cellY(i);
        ctx.translate(dx, dy);
        if (i % 2 === 0) {
            ctx.fillStyle = this.style('bg');
            ctx.fillRect(0, 0, ranking.width, context.rowHeight(i));
            ctx.fillStyle = this.style('text');
        }
        var isSelected = this.data.isSelected(dataIndex);
        if (isSelected) {
            ctx.strokeStyle = this.style('selection');
            ctx.strokeRect(0, 0, ranking.width, context.rowHeight(i));
        }
        else if (this.isHovered(dataIndex)) {
            ctx.strokeStyle = this.style('hover');
            ctx.strokeRect(0, 0, ranking.width, context.rowHeight(i));
        }
        //clip the remaining children
        ctx.save();
        //shift if needs to shifted and then maximal that just the shifted columns are visible
        var frozenLeft = this.currentFreezeLeft < ranking.shift ? 0 : Math.min(this.currentFreezeLeft - ranking.shift, ranking.width - ranking.frozenWidth);
        if (ranking.frozenWidth > 0 && frozenLeft > 0) {
            ctx.rect(dx + frozenLeft + ranking.frozenWidth, 0, ranking.width, context.rowHeight(i));
            ctx.clip();
        }
        ranking.columns.forEach(function (child) {
            ctx.save();
            ctx.translate(child.shift, 0);
            child.renderer(ctx, di, i, dx + child.shift, dy);
            ctx.restore();
        });
        ctx.restore();
        ctx.translate(frozenLeft, 0);
        dx += frozenLeft;
        ranking.frozen.forEach(function (child) {
            ctx.save();
            ctx.translate(child.shift, 0);
            child.renderer(ctx, di, i, dx + child.shift, dy);
            ctx.restore();
        });
        ctx.translate(-dx, -dy);
    };
    BodyCanvasRenderer.prototype.renderMeanlines = function (ctx, ranking, height) {
        var _this = this;
        var cols = ranking.columns.filter(function (c) { return _this.showMeanLine(c.column); });
        return Promise.all(cols.map(function (d) {
            var h = _this.histCache.get(d.column.id);
            if (!h) {
                return;
            }
            return h.then(function (stats) {
                var xPos = d.shift + d.column.getWidth() * stats.mean;
                if (isNaN(xPos)) {
                    return;
                }
                ctx.strokeStyle = _this.style('meanLine');
                ctx.beginPath();
                ctx.moveTo(xPos, 0);
                ctx.lineTo(xPos, height);
                ctx.stroke();
            });
        }));
    };
    BodyCanvasRenderer.prototype.renderRankings = function (ctx, data, context, height) {
        var _this = this;
        var renderRow = this.renderRow.bind(this, ctx, context);
        //asynchronous rendering!!!
        var all = Promise.all.bind(Promise);
        return all(data.map(function (ranking) {
            var toRender = ranking.data;
            return all(toRender.map(function (p, i) {
                // TODO render loading row
                return p.then(function (di) {
                    return renderRow(ranking, di, i);
                });
            })).then(function () { return _this.renderMeanlines(ctx, ranking, height); });
        }));
    };
    BodyCanvasRenderer.prototype.renderSlopeGraphs = function (ctx, data, context) {
        var _this = this;
        var slopes = data.slice(1).map(function (d, i) { return ({ left: data[i].order, left_i: i, right: d.order, right_i: i + 1 }); });
        ctx.save();
        ctx.strokeStyle = this.style('slope');
        slopes.forEach(function (slope, i) {
            ctx.save();
            ctx.translate(data[i + 1].shift - _this.options.slopeWidth, 0);
            var cache = new Map();
            slope.right.forEach(function (dataIndex, pos) {
                cache.set(dataIndex, pos);
            });
            var lines = slope.left.map(function (dataIndex, pos) { return ({
                dataIndex: dataIndex,
                lpos: pos,
                rpos: cache.get(dataIndex)
            }); }).filter(function (d) { return d.rpos != null; });
            lines.forEach(function (line) {
                var isSelected = _this.data.isSelected(line.dataIndex);
                var isHovered = _this.isHovered(line.dataIndex);
                if (isSelected) {
                    ctx.strokeStyle = _this.style('selection');
                }
                else if (isHovered) {
                    ctx.strokeStyle = _this.style('hover');
                }
                ctx.beginPath();
                ctx.moveTo(0, context.rowHeight(line.lpos) * 0.5 + context.cellY(line.lpos));
                ctx.lineTo(_this.options.slopeWidth, context.rowHeight(line.rpos) * 0.5 + context.cellY(line.rpos));
                ctx.stroke();
                if (isSelected || isHovered) {
                    ctx.strokeStyle = _this.style('slope');
                }
            });
            ctx.restore();
        });
        ctx.restore();
    };
    BodyCanvasRenderer.prototype.createContextImpl = function (indexShift) {
        var _this = this;
        var base = this.createContext(indexShift, __WEBPACK_IMPORTED_MODULE_3__renderer_index__["createCanvas"]);
        base.hovered = this.isHovered.bind(this);
        base.selected = function (dataIndex) { return _this.data.isSelected(dataIndex); };
        return base;
    };
    BodyCanvasRenderer.prototype.computeShifts = function (data) {
        var _this = this;
        var r = [];
        data.forEach(function (d) {
            var base = d.shift;
            r.push.apply(r, d.frozen.map(function (c) { return ({ column: c.column, shift: c.shift + base + _this.currentFreezeLeft }); }));
            r.push.apply(r, d.columns.map(function (c) { return ({ column: c.column, shift: c.shift + base }); }));
        });
        return r;
    };
    BodyCanvasRenderer.prototype.updateImpl = function (data, context, width, height, reason) {
        var $canvas = this.$node.select('canvas');
        var firstLine = Math.max(context.cellY(0) - 20, 0); //where to start
        var lastLine = Math.min(context.cellY(Math.max.apply(Math, data.map(function (d) { return d.order.length; }))) + 20, height);
        this.$node.style({
            width: Math.max(0, width) + 'px',
            height: height + 'px'
        });
        $canvas.attr({
            width: Math.max(0, width),
            height: lastLine - firstLine
        }).style('margin-top', firstLine + 'px');
        this.lastShifts = this.computeShifts(data);
        var ctx = $canvas.node().getContext('2d');
        ctx.save();
        ctx.font = this.style('font');
        ctx.textBaseline = 'top';
        ctx.fillStyle = this.style('text');
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        //hacky to set to since I'm creating the context, okish
        context.textHints = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__utils__["f" /* createTextHints */])(ctx, this.style('font'));
        ctx.translate(0, -firstLine);
        this.renderSlopeGraphs(ctx, data, context);
        return this.renderRankings(ctx, data, context, height).then(function () {
            ctx.restore();
        });
    };
    return BodyCanvasRenderer;
}(__WEBPACK_IMPORTED_MODULE_4__ABodyRenderer__["a" /* default */]));
/* harmony default export */ __webpack_exports__["a"] = BodyCanvasRenderer;
BodyCanvasRenderer.CUSTOM_OPTIONS = {
    style: {
        text: 'black',
        font: '10pt "Helvetica Neue", Helvetica, Arial, sans-serif',
        slope: 'darkgray',
        link: 'blue',
        selection: '#ffa500',
        hover: '#e5e5e5',
        bg: '#f7f7f7',
        meanLine: 'darkgray'
    }
};


/***/ }),
/* 72 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__renderer_index__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ADOMBodyRenderer__ = __webpack_require__(29);
/**
 * Created by Samuel Gratzl on 14.08.2015.
 */
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};


var domHTMLMappings = {
    root: 'div',
    g: 'div',
    setSize: function (n, width, height) {
        n.style.width = width + 'px';
        n.style.height = height + 'px';
    },
    bg: 'div',
    updateBG: function (sel, callback) {
        sel.style({
            height: function (d, i, j) { return callback(d, i, j)[1] + 'px'; },
            width: function (d, i, j) { return callback(d, i, j)[0] + 'px'; }
        });
    },
    meanLine: 'div',
    updateMeanLine: function ($mean, x, height) {
        $mean.style('left', x + 'px').style('height', height + 'px');
    },
    slopes: 'svg',
    updateSlopes: function ($slopes, width, height, callback) {
        $slopes.attr('width', width).attr('height', height).style('left', function (d, i) { return callback(d, i) + 'px'; });
    },
    creator: __WEBPACK_IMPORTED_MODULE_0__renderer_index__["createHTML"],
    translate: function (n, x, y) { return n.style.transform = "translate(" + x + "px," + y + "px)"; },
    transform: function (sel, callback) {
        sel.style('transform', function (d, i) {
            var r = callback(d, i);
            return "translate(" + r[0] + "px," + r[1] + "px)";
        });
    }
};
var HTMLBodyRenderer = (function (_super) {
    __extends(HTMLBodyRenderer, _super);
    function HTMLBodyRenderer(data, parent, slicer, options) {
        if (options === void 0) { options = {}; }
        return _super.call(this, data, parent, slicer, domHTMLMappings, options) || this;
    }
    HTMLBodyRenderer.prototype.updateClipPaths = function (data, context, height) {
        // nothing to do
    };
    return HTMLBodyRenderer;
}(__WEBPACK_IMPORTED_MODULE_1__ADOMBodyRenderer__["a" /* default */]));
/* harmony default export */ __webpack_exports__["a"] = HTMLBodyRenderer;


/***/ }),
/* 73 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_d3__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_d3___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_d3__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__utils__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__model__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__provider_ADataProvider__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__HeaderRenderer__ = __webpack_require__(30);
/**
 * Created by Samuel Gratzl on 14.08.2015.
 */





var PoolEntry = (function () {
    function PoolEntry(desc) {
        this.desc = desc;
        this.used = 0;
    }
    return PoolEntry;
}());
var PoolRenderer = (function () {
    function PoolRenderer(data, parent, options) {
        if (options === void 0) { options = {}; }
        this.data = data;
        this.options = {
            layout: 'vertical',
            elemWidth: 100,
            elemHeight: 40,
            width: 100,
            height: 500,
            additionalDesc: [],
            hideUsed: true,
            addAtEndOnClick: false
        };
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__utils__["a" /* merge */])(this.options, options);
        this.$node = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_d3__["select"])(parent).append('div').classed('lu-pool', true);
        this.changeDataStorage(data);
    }
    PoolRenderer.prototype.changeDataStorage = function (data) {
        var _this = this;
        if (this.data) {
            this.data.on([__WEBPACK_IMPORTED_MODULE_3__provider_ADataProvider__["a" /* default */].EVENT_ADD_COLUMN + '.pool', __WEBPACK_IMPORTED_MODULE_3__provider_ADataProvider__["a" /* default */].EVENT_REMOVE_COLUMN + '.pool',
                __WEBPACK_IMPORTED_MODULE_3__provider_ADataProvider__["a" /* default */].EVENT_ADD_RANKING + '.pool', __WEBPACK_IMPORTED_MODULE_3__provider_ADataProvider__["a" /* default */].EVENT_REMOVE_RANKING + '.pool',
                __WEBPACK_IMPORTED_MODULE_3__provider_ADataProvider__["a" /* default */].EVENT_ADD_DESC + '.pool'], null);
        }
        this.data = data;
        this.entries = data.getColumns().concat(this.options.additionalDesc).map(function (d) { return new PoolEntry(d); });
        data.on(__WEBPACK_IMPORTED_MODULE_3__provider_ADataProvider__["a" /* default */].EVENT_ADD_DESC + '.pool', function (desc) {
            _this.entries.push(new PoolEntry(desc));
            _this.update();
        });
        if (this.options.hideUsed) {
            var that_1 = this;
            data.on([__WEBPACK_IMPORTED_MODULE_3__provider_ADataProvider__["a" /* default */].EVENT_ADD_COLUMN + '.pool', __WEBPACK_IMPORTED_MODULE_3__provider_ADataProvider__["a" /* default */].EVENT_REMOVE_COLUMN + '.pool'], function (col) {
                var desc = col.desc, change = this.type === 'addColumn' ? 1 : -1;
                that_1.entries.some(function (entry) {
                    if (entry.desc !== desc) {
                        return false;
                    }
                    entry.used += change;
                    return true;
                });
                that_1.update();
            });
            data.on([__WEBPACK_IMPORTED_MODULE_3__provider_ADataProvider__["a" /* default */].EVENT_ADD_RANKING + '.pool', __WEBPACK_IMPORTED_MODULE_3__provider_ADataProvider__["a" /* default */].EVENT_REMOVE_RANKING + '.pool'], function (ranking) {
                var descs = ranking.flatColumns.map(function (d) { return d.desc; }), change = this.type === 'addRanking' ? 1 : -1;
                that_1.entries.some(function (entry) {
                    if (descs.indexOf(entry.desc) < 0) {
                        return false;
                    }
                    entry.used += change;
                    return true;
                });
                that_1.update();
            });
            data.getRankings().forEach(function (ranking) {
                var descs = ranking.flatColumns.map(function (d) { return d.desc; }), change = +1;
                that_1.entries.some(function (entry) {
                    if (descs.indexOf(entry.desc) < 0) {
                        return false;
                    }
                    entry.used += change;
                });
            });
        }
    };
    PoolRenderer.prototype.remove = function () {
        this.$node.remove();
        if (this.data) {
            this.data.on([__WEBPACK_IMPORTED_MODULE_3__provider_ADataProvider__["a" /* default */].EVENT_ADD_COLUMN + '.pool', __WEBPACK_IMPORTED_MODULE_3__provider_ADataProvider__["a" /* default */].EVENT_REMOVE_COLUMN + '.pool', 'addRanking.pool', 'removeRanking.pool', 'addDesc.pool'], null);
        }
    };
    PoolRenderer.prototype.update = function () {
        var _this = this;
        var data = this.data;
        var descToShow = this.entries.filter(function (e) { return e.used === 0; }).map(function (d) { return d.desc; });
        var $headers = this.$node.selectAll('div.header').data(descToShow);
        var $headerEnter = $headers.enter().append('div').attr({
            'class': 'header',
            'draggable': true
        }).on('dragstart', function (d) {
            var e = __WEBPACK_IMPORTED_MODULE_0_d3__["event"];
            e.dataTransfer.effectAllowed = 'copyMove'; //none, copy, copyLink, copyMove, link, linkMove, move, all
            e.dataTransfer.setData('text/plain', d.label);
            e.dataTransfer.setData('application/caleydo-lineup-column', JSON.stringify(data.toDescRef(d)));
            if (__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__model__["isNumberColumn"])(d)) {
                e.dataTransfer.setData('application/caleydo-lineup-column-number', JSON.stringify(data.toDescRef(d)));
            }
        }).style({
            width: this.options.elemWidth + 'px',
            height: this.options.elemHeight + 'px'
        });
        if (this.options.addAtEndOnClick) {
            $headerEnter.on('click', function (d) {
                _this.data.push(_this.data.getLastRanking(), d);
            });
        }
        $headerEnter.append('span').classed('label', true).text(function (d) { return d.label; });
        $headers.attr('class', function (d) { return "header " + (d.cssClass || '') + " " + d.type; });
        $headers.style({
            'transform': function (d, i) {
                var pos = _this.layout(i);
                return 'translate(' + pos.x + 'px,' + pos.y + 'px)';
            },
            'background-color': function (d) {
                var s = d;
                return s.cssClass ? null : s.color || __WEBPACK_IMPORTED_MODULE_2__model__["Column"].DEFAULT_COLOR;
            }
        });
        $headers.attr({
            title: function (d) { return __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_4__HeaderRenderer__["c" /* toFullTooltip */])(d); }
        });
        $headers.select('span').text(function (d) { return d.label; });
        $headers.exit().remove();
        //compute the size of this node
        switch (this.options.layout) {
            case 'horizontal':
                this.$node.style({
                    width: (this.options.elemWidth * descToShow.length) + 'px',
                    height: (this.options.elemHeight) + 'px'
                });
                break;
            case 'grid':
                var perRow = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_d3__["round"])(this.options.width / this.options.elemWidth, 0);
                this.$node.style({
                    width: perRow * this.options.elemWidth + 'px',
                    height: Math.ceil(descToShow.length / perRow) * this.options.elemHeight + 'px'
                });
                break;
            //case 'vertical':
            default:
                this.$node.style({
                    width: (this.options.elemWidth) + 'px',
                    height: (this.options.elemHeight * descToShow.length) + 'px'
                });
                break;
        }
    };
    PoolRenderer.prototype.layout = function (i) {
        switch (this.options.layout) {
            case 'horizontal':
                return { x: i * this.options.elemWidth, y: 0 };
            case 'grid':
                var perRow = __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_d3__["round"])(this.options.width / this.options.elemWidth, 0);
                return { x: (i % perRow) * this.options.elemWidth, y: Math.floor(i / perRow) * this.options.elemHeight };
            //case 'vertical':
            default:
                return { x: 0, y: i * this.options.elemHeight };
        }
    };
    return PoolRenderer;
}());
/* harmony default export */ __webpack_exports__["a"] = PoolRenderer;


/***/ }),
/* 74 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_d3__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_d3___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_d3__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__renderer_index__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ADOMBodyRenderer__ = __webpack_require__(29);
/**
 * Created by Samuel Gratzl on 14.08.2015.
 */
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};



var domMappings = {
    svg: {
        root: 'svg',
        g: 'g',
        setSize: function (n, width, height) {
            n.setAttribute('width', String(width));
            n.setAttribute('height', String(height));
        },
        bg: 'rect',
        updateBG: function (sel, callback) {
            sel.attr({
                height: function (d, i, j) { return callback(d, i, j)[1]; },
                width: function (d, i, j) { return callback(d, i, j)[0]; }
            });
        },
        meanLine: 'line',
        updateMeanLine: function ($mean, x, height) {
            $mean.attr('x1', 1 + x) //TODO don't know why +1 such that header and body lines are aligned
                .attr('x2', 1 + x)
                .attr('y2', height);
        },
        slopes: 'g',
        updateSlopes: function ($slopes, width, height, callback) {
            $slopes.attr('transform', function (d, i) { return "translate(" + callback(d, i) + ",0)"; });
        },
        creator: __WEBPACK_IMPORTED_MODULE_1__renderer_index__["createSVG"],
        translate: function (n, x, y) { return n.setAttribute('transform', "translate(" + x + "," + y + ")"); },
        transform: function (sel, callback) {
            sel.attr('transform', function (d, i) {
                var r = callback(d, i);
                return "translate(" + r[0] + "," + r[1] + ")";
            });
        }
    }
};
var SVGBodyRenderer = (function (_super) {
    __extends(SVGBodyRenderer, _super);
    function SVGBodyRenderer(data, parent, slicer, options) {
        if (options === void 0) { options = {}; }
        return _super.call(this, data, parent, slicer, domMappings.svg, options) || this;
    }
    SVGBodyRenderer.prototype.updateClipPathsImpl = function (r, context, height) {
        var $base = this.$node.select('defs.body');
        if ($base.empty()) {
            $base = this.$node.append('defs').classed('body', true);
        }
        //generate clip paths for the text columns to avoid text overflow
        //see http://stackoverflow.com/questions/L742812/cannot-select-svg-foreignobject-element-in-d3
        //there is a bug in webkit which present camelCase selectors
        var textClipPath = $base.selectAll(function () {
            return this.getElementsByTagName('clipPath');
        }).data(r, function (d) { return d.id; });
        textClipPath.enter().append('clipPath')
            .attr('id', function (d) { return "cp" + context.idPrefix + "clipCol" + d.id; })
            .append('rect').attr('y', 0);
        textClipPath.exit().remove();
        textClipPath.select('rect')
            .attr({
            x: 0,
            width: function (d) { return Math.max(d.getWidth() - 5, 0); },
            height: height
        });
    };
    SVGBodyRenderer.prototype.updateClipPaths = function (data, context, height) {
        var _this = this;
        var shifts = [];
        var offset = 0;
        data.forEach(function (r) {
            var w = r.ranking.flatten(shifts, offset, 2, _this.options.columnPadding);
            offset += w + _this.options.slopeWidth;
        });
        this.updateClipPathsImpl(shifts.map(function (s) { return s.col; }), context, height);
        {
            var $elem = this.$node.select("clipPath#c" + context.idPrefix + "Freeze");
            if ($elem.empty()) {
                $elem = this.$node.append('clipPath').attr('id', "c" + context.idPrefix + "Freeze").append('rect').attr({
                    y: 0,
                    width: 20000,
                    height: height
                });
            }
            var maxFrozen = data.length === 0 || data[0].frozen.length === 0 ? 0 : __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0_d3__["max"])(data[0].frozen, function (f) { return f.shift + f.column.getWidth(); });
            $elem.select('rect').attr({
                x: maxFrozen,
                height: height,
                transform: "translate(" + this.currentFreezeLeft + ",0)"
            });
        }
    };
    return SVGBodyRenderer;
}(__WEBPACK_IMPORTED_MODULE_2__ADOMBodyRenderer__["a" /* default */]));
/* harmony default export */ __webpack_exports__["a"] = SVGBodyRenderer;


/***/ }),
/* 75 */,
/* 76 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_76__;

/***/ }),
/* 77 */,
/* 78 */,
/* 79 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__style_scss__ = __webpack_require__(32);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__style_scss___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__style_scss__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__lineup__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react__ = __webpack_require__(76);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__provider_LocalDataProvider__ = __webpack_require__(34);
/**
 * Created by sam on 28.10.2016.
 */
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};




function deepEqual(a, b) {
    if (a === b) {
        return true;
    }
    if (a.length !== b.length) {
        return false;
    }
    return a.every(function (ai, i) { return ai === b[i]; });
}
var LineUp = (function (_super) {
    __extends(LineUp, _super);
    function LineUp(props, context) {
        var _this = _super.call(this, props, context) || this;
        _this.plot = null;
        _this.parent = null;
        return _this;
    }
    LineUp.prototype.item2index = function (item) {
        return this.props.data.indexOf(item);
    };
    LineUp.prototype.index2item = function (index) {
        return this.props.data[index];
    };
    LineUp.prototype.componentDidMount = function () {
        var _this = this;
        //create impl
        var data = new __WEBPACK_IMPORTED_MODULE_3__provider_LocalDataProvider__["a" /* default */](this.props.data, this.props.desc);
        data.on('selectionChanged', this.onSelectionChanged.bind(this));
        data.selectAll(this.props.selection ? this.props.selection.map(function (d) { return _this.item2index(d); }) : []);
        if (this.props.defineLineUp) {
            this.props.defineLineUp(data);
        }
        else {
            data.deriveDefault();
        }
        this.plot = new __WEBPACK_IMPORTED_MODULE_1__lineup__["a" /* default */](this.parent, data, this.props.options);
        this.plot.update();
    };
    LineUp.prototype.shouldComponentUpdate = function (nextProps) {
        return !deepEqual(this.props.selection, nextProps.selection) || !deepEqual(this.props.data, nextProps.data);
    };
    LineUp.prototype.onSelectionChanged = function (indices) {
        var _this = this;
        if (this.props.onSelectionChanged) {
            this.props.onSelectionChanged(indices.map(function (d) { return _this.index2item(d); }));
        }
    };
    LineUp.prototype.componentDidUpdate = function () {
        var _this = this;
        var provider = this.plot.data;
        if (!deepEqual(provider.data, this.props.data)) {
            var data = new __WEBPACK_IMPORTED_MODULE_3__provider_LocalDataProvider__["a" /* default */](this.props.data, this.props.desc);
            data.on('selectionChanged', this.onSelectionChanged.bind(this));
            data.selectAll(this.props.selection ? this.props.selection.map(function (d) { return _this.item2index(d); }) : []);
            if (this.props.defineLineUp) {
                this.props.defineLineUp(data);
            }
            else {
                data.deriveDefault();
            }
            this.plot.changeDataStorage(data);
        }
        else {
            this.plot.data.setSelection(this.props.selection ? this.props.selection.map(function (d) { return _this.item2index(d); }) : []);
        }
        this.plot.update();
    };
    LineUp.prototype.render = function () {
        var _this = this;
        return (__WEBPACK_IMPORTED_MODULE_2_react__["createElement"]("div", { className: "lu-react", ref: function (div) { return _this.parent = div; } }));
    };
    return LineUp;
}(__WEBPACK_IMPORTED_MODULE_2_react__["Component"]));
/* harmony default export */ __webpack_exports__["default"] = LineUp;
LineUp.propTypes = {
    data: __WEBPACK_IMPORTED_MODULE_2_react__["PropTypes"].array.isRequired,
    desc: __WEBPACK_IMPORTED_MODULE_2_react__["PropTypes"].array.isRequired,
    options: __WEBPACK_IMPORTED_MODULE_2_react__["PropTypes"].any,
    onSelectionChanged: __WEBPACK_IMPORTED_MODULE_2_react__["PropTypes"].func,
    selection: __WEBPACK_IMPORTED_MODULE_2_react__["PropTypes"].any,
    defineLineUp: __WEBPACK_IMPORTED_MODULE_2_react__["PropTypes"].func
};
LineUp.defaultProps = {
    data: [],
    desc: []
};


/***/ })
/******/ ]);
});
//# sourceMappingURL=LineUpJS_react.js.map