require("source-map-support").install();
exports.ids = ["about"];
exports.modules = {

/***/ "./node_modules/css-loader/index.js?!./node_modules/postcss-loader/lib/index.js?!./src/components/Page/Page.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("./node_modules/css-loader/lib/css-base.js")(true);
// imports


// module
exports.push([module.i, "/**\n * React Starter Kit (https://www.reactstarterkit.com/)\n *\n * Copyright © 2014-present Kriasoft, LLC. All rights reserved.\n *\n * This source code is licensed under the MIT license found in the\n * LICENSE.txt file in the root directory of this source tree.\n */\n\n/**\n * React Starter Kit (https://www.reactstarterkit.com/)\n *\n * Copyright © 2014-present Kriasoft, LLC. All rights reserved.\n *\n * This source code is licensed under the MIT license found in the\n * LICENSE.txt file in the root directory of this source tree.\n */\n\n:root {\n  /*\n   * Typography\n   * ======================================================================== */\n\n  --font-family-base: 'Segoe UI', 'HelveticaNeue-Light', sans-serif;\n\n  /*\n   * Layout\n   * ======================================================================== */\n\n  --max-content-width: 1000px;\n\n  /*\n   * Media queries breakpoints\n   * ======================================================================== */\n\n  --screen-xs-min: 480px;  /* Extra small screen / phone */\n  --screen-sm-min: 768px;  /* Small screen / tablet */\n  --screen-md-min: 992px;  /* Medium screen / desktop */\n  --screen-lg-min: 1200px; /* Large screen / wide desktop */\n}\n\n.Page-root-2VuHt {\n  padding-left: 20px;\n  padding-right: 20px;\n}\n\n.Page-container-QOUG7 {\n  margin: 0 auto;\n  padding: 0 0 40px;\n  max-width: 1000px;\n  max-width: var(--max-content-width);\n}\n", "", {"version":3,"sources":["/Users/amitjain/top-trend/src/components/Page/Page.css"],"names":[],"mappings":"AAAA;;;;;;;GAOG;;AAEH;;;;;;;GAOG;;AAEH;EACE;;gFAE8E;;EAE9E,kEAAkE;;EAElE;;gFAE8E;;EAE9E,4BAA4B;;EAE5B;;gFAE8E;;EAE9E,uBAAuB,EAAE,gCAAgC;EACzD,uBAAuB,EAAE,2BAA2B;EACpD,uBAAuB,EAAE,6BAA6B;EACtD,wBAAwB,CAAC,iCAAiC;CAC3D;;AAED;EACE,mBAAmB;EACnB,oBAAoB;CACrB;;AAED;EACE,eAAe;EACf,kBAAkB;EAClB,kBAAkB;EAClB,oCAAoC;CACrC","file":"Page.css","sourcesContent":["/**\n * React Starter Kit (https://www.reactstarterkit.com/)\n *\n * Copyright © 2014-present Kriasoft, LLC. All rights reserved.\n *\n * This source code is licensed under the MIT license found in the\n * LICENSE.txt file in the root directory of this source tree.\n */\n\n/**\n * React Starter Kit (https://www.reactstarterkit.com/)\n *\n * Copyright © 2014-present Kriasoft, LLC. All rights reserved.\n *\n * This source code is licensed under the MIT license found in the\n * LICENSE.txt file in the root directory of this source tree.\n */\n\n:root {\n  /*\n   * Typography\n   * ======================================================================== */\n\n  --font-family-base: 'Segoe UI', 'HelveticaNeue-Light', sans-serif;\n\n  /*\n   * Layout\n   * ======================================================================== */\n\n  --max-content-width: 1000px;\n\n  /*\n   * Media queries breakpoints\n   * ======================================================================== */\n\n  --screen-xs-min: 480px;  /* Extra small screen / phone */\n  --screen-sm-min: 768px;  /* Small screen / tablet */\n  --screen-md-min: 992px;  /* Medium screen / desktop */\n  --screen-lg-min: 1200px; /* Large screen / wide desktop */\n}\n\n.root {\n  padding-left: 20px;\n  padding-right: 20px;\n}\n\n.container {\n  margin: 0 auto;\n  padding: 0 0 40px;\n  max-width: 1000px;\n  max-width: var(--max-content-width);\n}\n"],"sourceRoot":""}]);

// exports
exports.locals = {
	"root": "Page-root-2VuHt",
	"container": "Page-container-QOUG7"
};

/***/ }),

/***/ "./src/components/Page/Page.css":
/***/ (function(module, exports, __webpack_require__) {


    var content = __webpack_require__("./node_modules/css-loader/index.js?!./node_modules/postcss-loader/lib/index.js?!./src/components/Page/Page.css");
    var insertCss = __webpack_require__("./node_modules/isomorphic-style-loader/lib/insertCss.js");

    if (typeof content === 'string') {
      content = [[module.i, content, '']];
    }

    module.exports = content.locals || {};
    module.exports._getContent = function() { return content; };
    module.exports._getCss = function() { return content.toString(); };
    module.exports._insertCss = function(options) { return insertCss(content, options) };
    
    // Hot Module Replacement
    // https://webpack.github.io/docs/hot-module-replacement
    // Only activated in browser context
    if ( true && typeof window !== 'undefined' && window.document) {
      var removeCss = function() {};
      module.hot.accept("./node_modules/css-loader/index.js?!./node_modules/postcss-loader/lib/index.js?!./src/components/Page/Page.css", function() {
        content = __webpack_require__("./node_modules/css-loader/index.js?!./node_modules/postcss-loader/lib/index.js?!./src/components/Page/Page.css");

        if (typeof content === 'string') {
          content = [[module.i, content, '']];
        }

        removeCss = insertCss(content, { replace: true });
      });
      module.hot.dispose(function() { removeCss(); });
    }
  

/***/ }),

/***/ "./src/components/Page/Page.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("prop-types");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var isomorphic_style_loader_lib_withStyles__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("isomorphic-style-loader/lib/withStyles");
/* harmony import */ var isomorphic_style_loader_lib_withStyles__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(isomorphic_style_loader_lib_withStyles__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _Page_css__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__("./src/components/Page/Page.css");
/* harmony import */ var _Page_css__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_Page_css__WEBPACK_IMPORTED_MODULE_3__);
var _jsxFileName = "/Users/amitjain/top-trend/src/components/Page/Page.js";

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */





class Page extends react__WEBPACK_IMPORTED_MODULE_0___default.a.Component {
  render() {
    const {
      title,
      html
    } = this.props;
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: _Page_css__WEBPACK_IMPORTED_MODULE_3___default.a.root,
      __self: this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 24,
        columnNumber: 7
      }
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: _Page_css__WEBPACK_IMPORTED_MODULE_3___default.a.container,
      __self: this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 25,
        columnNumber: 9
      }
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h1", {
      __self: this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 26,
        columnNumber: 11
      }
    }, title), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML: {
        __html: html
      },
      __self: this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 27,
        columnNumber: 11
      }
    })));
  }

}

_defineProperty(Page, "propTypes", {
  title: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.string.isRequired,
  html: prop_types__WEBPACK_IMPORTED_MODULE_1___default.a.string.isRequired
});

/* harmony default export */ __webpack_exports__["default"] = (isomorphic_style_loader_lib_withStyles__WEBPACK_IMPORTED_MODULE_2___default()(_Page_css__WEBPACK_IMPORTED_MODULE_3___default.a)(Page));

/***/ }),

/***/ "./src/routes/about sync recursive ^\\.\\/about\\..*\\.md$":
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./about.cs-CZ.md": "./src/routes/about/about.cs-CZ.md"
};


function webpackContext(req) {
	var id = webpackContextResolve(req);
	return __webpack_require__(id);
}
function webpackContextResolve(req) {
	if(!__webpack_require__.o(map, req)) {
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	}
	return map[req];
}
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = "./src/routes/about sync recursive ^\\.\\/about\\..*\\.md$";

/***/ }),

/***/ "./src/routes/about/about.cs-CZ.md":
/***/ (function(module, exports) {

module.exports = {"title":"O nás","component":"ContentPage","key":"about.cs-CZ","html":"<p>Lorem ipsum dolor sit amet, consectetur adipiscing ELIT. Aenean consequat\ntortor fermentum mi fermentum dignissim. Nullam vel ipsum ut ligula Elementum\nlobortis. Maecenas Podělte, massa laoreet lacinia pretium, nisi urna venenatis\ntortor, jn imperdiet Tellus libero efficitur Metus. Fusce sempre posuere\nligula, et facilisis Metus Bibendum interdum. Mauris na mauris sit amet SEM\npharetra commodo mezi EU a Leo. Nam při est non risus cursus maximus. Nam feugiat\naugue libero, id consectetur tortor Bibendum non. Quisque nec fringilla lorem.\nNullam efficitur vulputate mauris, jn maximus leo dignissim id.</p>\n<p>V HAC habitasse platea dictumst. Duis sagittis DUI AC ex suscipit maximus.\nMorbi pellentesque venenatis Felis sed convallis. Nulla varius, NIBH vitae\nplacerat Tempus, mauris sem Elementum ipsum, Eget sollicitudin nisl est vel\npurus. Fusce malesuada Odio velit, non cursus leo fermentum id. Cras pharetra\nsodales fringilla. Etiam Quis est dolor egestas pellentesque. Maecenas non\nscelerisque purus, congue cursus Arcu. Donec vel mi dapibus. Mauris maximus\nposuere placerat. Sed et libero eu NIBH tristique mollis Eget lectus. Donec\ninterdum augue sollicitudin vehicula hendrerit. Vivamus Justo Orci, molestie\nac sollicitudin ac, lobortis na Tellus. Etiam rhoncus ullamcorper risus eu\ntempor. Sed porttitor, neque AC efficitur gravida, Arcu lacus pharetra DUI, v\nconsequat elit Tellus auctor nulla. Donec placerat Elementum průměr, vitae\nimperdiet lectus luctus na adrese.</p>\n<p>Nullam eu feugiat mi. Quisque jn tristique nisl, dignissim výrok leo. Nam\nnon quam nisi. Donec rutrum turpis ac průměr blandit, id pulvinaru mauris\nsuscipit. Pellentesque tincidunt libero ultricies risus iaculis, sit amet\nconsequat velit blandit. Fusce quis varius nulla. Nullam nisi nisi, suscipit\nut magna quis, feugiat porta NIBH. Sed id enim lectus. Suspendisse Elementum\nJusto Sapien, sit amet consequat Orci accumsan et. Podělte ornare ullamcorper\nsem sed finibus. Nullam ac lacus pulvinaru, egestas Felis ut, accumsan est.</p>\n<p>Pellentesque sagittis vehicula sem Quis luctus. Proin sodales magna v lorem\nhendrerit Podělte. Integer varius eu Orci. Vestibulum ante ipsum primis v\nfaucibus Orci luctus et ultrices posuere cubilia Curae; Vestibulum ante ipsum\nprimis v faucibus Orci luctus et ultrices posuere cubilia Curae; Ut v mauris\nNIBH. Suspendisse maximus ac eros na vestibulum.</p>\n<p>Interdum et malesuada fames ac ante ipsum primis v faucibus. Quisque egestas\ntortor et DUI consequat faucibus. Nunc vitae Odio ornare, venenatis ligula A,\nvulputate nisl. Aenean congue varius ex, sit amet Bibendum Odio posuere na adrese.\nNulla facilisi. V finibus, nulla vitae tincidunt ornare, Sapien nulla\nfermentum mauris, sed consectetur tortor Arcu Eget Arcu. Vestibulum vel quam\nenim.</p>\n"};

/***/ }),

/***/ "./src/routes/about/about.md":
/***/ (function(module, exports) {

module.exports = {"title":"About Us","component":"ContentPage","key":"about","html":"<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean consequat tortor\nfermentum mi fermentum dignissim. Nullam vel ipsum ut ligula elementum lobortis.\nMaecenas aliquam, massa laoreet lacinia pretium, nisi urna venenatis tortor, nec\nimperdiet tellus libero efficitur metus. Fusce semper posuere ligula, et\nfacilisis metus bibendum interdum. Mauris at mauris sit amet sem pharetra\ncommodo a eu leo. Nam at est non risus cursus maximus. Nam feugiat augue libero,\nid consectetur tortor bibendum non. Quisque nec fringilla lorem. Nullam\nefficitur vulputate mauris, nec maximus leo dignissim id.</p>\n<p>In hac habitasse platea dictumst. Duis sagittis dui ac ex suscipit maximus.\nMorbi pellentesque venenatis felis sed convallis. Nulla varius, nibh vitae\nplacerat tempus, mauris sem elementum ipsum, eget sollicitudin nisl est vel\npurus. Fusce malesuada odio velit, non cursus leo fermentum id. Cras pharetra\nsodales fringilla. Etiam quis est a dolor egestas pellentesque. Maecenas non\nscelerisque purus, congue cursus arcu. Donec vel dapibus mi. Mauris maximus\nposuere placerat. Sed et libero eu nibh tristique mollis a eget lectus. Donec\ninterdum augue sollicitudin vehicula hendrerit. Vivamus justo orci, molestie ac\nsollicitudin ac, lobortis at tellus. Etiam rhoncus ullamcorper risus eu tempor.\nSed porttitor, neque ac efficitur gravida, arcu lacus pharetra dui, in consequat\nelit tellus auctor nulla. Donec placerat elementum diam, vitae imperdiet lectus\nluctus at.</p>\n<p>Nullam eu feugiat mi. Quisque nec tristique nisl, dignissim dictum leo. Nam non\nquam nisi. Donec rutrum turpis ac diam blandit, id pulvinar mauris suscipit.\nPellentesque tincidunt libero ultricies risus iaculis, sit amet consequat velit\nblandit. Fusce quis varius nulla. Nullam nisi nisi, suscipit ut magna quis,\nfeugiat porta nibh. Sed id enim lectus. Suspendisse elementum justo sapien, sit\namet consequat orci accumsan et. Aliquam ornare ullamcorper sem sed finibus.\nNullam ac lacus pulvinar, egestas felis ut, accumsan est.</p>\n<p>Pellentesque sagittis vehicula sem quis luctus. Proin sodales magna in lorem\nhendrerit aliquam. Integer eu varius orci. Vestibulum ante ipsum primis in\nfaucibus orci luctus et ultrices posuere cubilia Curae; Vestibulum ante ipsum\nprimis in faucibus orci luctus et ultrices posuere cubilia Curae; Ut at mauris\nnibh. Suspendisse maximus ac eros at vestibulum.</p>\n<p>Interdum et malesuada fames ac ante ipsum primis in faucibus. Quisque egestas\ntortor et dui consequat faucibus. Nunc vitae odio ornare, venenatis ligula a,\nvulputate nisl. Aenean congue varius ex, sit amet bibendum odio posuere at.\nNulla facilisi. In finibus, nulla vitae tincidunt ornare, sapien nulla fermentum\nmauris, sed consectetur tortor arcu eget arcu. Vestibulum vel quam enim.</p>\n"};

/***/ }),

/***/ "./src/routes/about/index.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _components_Layout__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__("./src/components/Layout/Layout.js");
/* harmony import */ var _components_Page__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__("./src/components/Page/Page.js");
var _jsxFileName = "/Users/amitjain/top-trend/src/routes/about/index.js";

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */




function action(_x) {
  return _action.apply(this, arguments);
}

function _action() {
  _action = _asyncToGenerator(function* ({
    locale
  }) {
    const data = yield new Promise(resolve => {
      Promise.all(/* require.ensure | about */[__webpack_require__.e("vendors~about~admin~contact~home~login~not-found~privacy~register"), __webpack_require__.e("about~admin~contact~home~login~not-found~privacy~register"), __webpack_require__.e("about")]).then((require => {
        try {
          resolve(__webpack_require__("./src/routes/about sync recursive ^\\.\\/about\\..*\\.md$")(`./about.${locale}.md`)); // eslint-disable-line import/no-dynamic-require
        } catch (e) {
          resolve(__webpack_require__("./src/routes/about/about.md"));
        }
      }).bind(null, __webpack_require__)).catch(__webpack_require__.oe);
    });
    return {
      chunks: ['about'],
      title: data.title,
      component: /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_Layout__WEBPACK_IMPORTED_MODULE_1__["default"], {
        __self: this,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 33,
          columnNumber: 7
        }
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_Page__WEBPACK_IMPORTED_MODULE_2__["default"], _extends({}, data, {
        __self: this,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 34,
          columnNumber: 9
        }
      })))
    };
  });
  return _action.apply(this, arguments);
}

/* harmony default export */ __webpack_exports__["default"] = (action);

/***/ })

};;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2h1bmtzL2Fib3V0LmpzIiwic291cmNlcyI6WyIvVXNlcnMvYW1pdGphaW4vdG9wLXRyZW5kL3NyYy9jb21wb25lbnRzL1BhZ2UvUGFnZS5jc3MiLCJ3ZWJwYWNrOi8vLy4vc3JjL2NvbXBvbmVudHMvUGFnZS9QYWdlLmNzcz9mMGJkIiwiL1VzZXJzL2FtaXRqYWluL3RvcC10cmVuZC9zcmMvY29tcG9uZW50cy9QYWdlL1BhZ2UuanMiLCIvVXNlcnMvYW1pdGphaW4vdG9wLXRyZW5kL3NyYy9yb3V0ZXMvYWJvdXQgc3luYyAvXi8uLy9hYm91dC8uLiovLm1kJCIsIi9Vc2Vycy9hbWl0amFpbi90b3AtdHJlbmQvc3JjL3JvdXRlcy9hYm91dC9hYm91dC5jcy1DWi5tZCIsIi9Vc2Vycy9hbWl0amFpbi90b3AtdHJlbmQvc3JjL3JvdXRlcy9hYm91dC9hYm91dC5tZCIsIi9Vc2Vycy9hbWl0amFpbi90b3AtdHJlbmQvc3JjL3JvdXRlcy9hYm91dC9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnRzID0gbW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvbGliL2Nzcy1iYXNlLmpzXCIpKHRydWUpO1xuLy8gaW1wb3J0c1xuXG5cbi8vIG1vZHVsZVxuZXhwb3J0cy5wdXNoKFttb2R1bGUuaWQsIFwiLyoqXFxuICogUmVhY3QgU3RhcnRlciBLaXQgKGh0dHBzOi8vd3d3LnJlYWN0c3RhcnRlcmtpdC5jb20vKVxcbiAqXFxuICogQ29weXJpZ2h0IMKpIDIwMTQtcHJlc2VudCBLcmlhc29mdCwgTExDLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxcbiAqXFxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UgZm91bmQgaW4gdGhlXFxuICogTElDRU5TRS50eHQgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cXG4gKi9cXG5cXG4vKipcXG4gKiBSZWFjdCBTdGFydGVyIEtpdCAoaHR0cHM6Ly93d3cucmVhY3RzdGFydGVya2l0LmNvbS8pXFxuICpcXG4gKiBDb3B5cmlnaHQgwqkgMjAxNC1wcmVzZW50IEtyaWFzb2Z0LCBMTEMuIEFsbCByaWdodHMgcmVzZXJ2ZWQuXFxuICpcXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZSBmb3VuZCBpbiB0aGVcXG4gKiBMSUNFTlNFLnR4dCBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxcbiAqL1xcblxcbjpyb290IHtcXG4gIC8qXFxuICAgKiBUeXBvZ3JhcGh5XFxuICAgKiA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0gKi9cXG5cXG4gIC0tZm9udC1mYW1pbHktYmFzZTogJ1NlZ29lIFVJJywgJ0hlbHZldGljYU5ldWUtTGlnaHQnLCBzYW5zLXNlcmlmO1xcblxcbiAgLypcXG4gICAqIExheW91dFxcbiAgICogPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09ICovXFxuXFxuICAtLW1heC1jb250ZW50LXdpZHRoOiAxMDAwcHg7XFxuXFxuICAvKlxcbiAgICogTWVkaWEgcXVlcmllcyBicmVha3BvaW50c1xcbiAgICogPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09ICovXFxuXFxuICAtLXNjcmVlbi14cy1taW46IDQ4MHB4OyAgLyogRXh0cmEgc21hbGwgc2NyZWVuIC8gcGhvbmUgKi9cXG4gIC0tc2NyZWVuLXNtLW1pbjogNzY4cHg7ICAvKiBTbWFsbCBzY3JlZW4gLyB0YWJsZXQgKi9cXG4gIC0tc2NyZWVuLW1kLW1pbjogOTkycHg7ICAvKiBNZWRpdW0gc2NyZWVuIC8gZGVza3RvcCAqL1xcbiAgLS1zY3JlZW4tbGctbWluOiAxMjAwcHg7IC8qIExhcmdlIHNjcmVlbiAvIHdpZGUgZGVza3RvcCAqL1xcbn1cXG5cXG4uUGFnZS1yb290LTJWdUh0IHtcXG4gIHBhZGRpbmctbGVmdDogMjBweDtcXG4gIHBhZGRpbmctcmlnaHQ6IDIwcHg7XFxufVxcblxcbi5QYWdlLWNvbnRhaW5lci1RT1VHNyB7XFxuICBtYXJnaW46IDAgYXV0bztcXG4gIHBhZGRpbmc6IDAgMCA0MHB4O1xcbiAgbWF4LXdpZHRoOiAxMDAwcHg7XFxuICBtYXgtd2lkdGg6IHZhcigtLW1heC1jb250ZW50LXdpZHRoKTtcXG59XFxuXCIsIFwiXCIsIHtcInZlcnNpb25cIjozLFwic291cmNlc1wiOltcIi9Vc2Vycy9hbWl0amFpbi90b3AtdHJlbmQvc3JjL2NvbXBvbmVudHMvUGFnZS9QYWdlLmNzc1wiXSxcIm5hbWVzXCI6W10sXCJtYXBwaW5nc1wiOlwiQUFBQTs7Ozs7OztHQU9HOztBQUVIOzs7Ozs7O0dBT0c7O0FBRUg7RUFDRTs7Z0ZBRThFOztFQUU5RSxrRUFBa0U7O0VBRWxFOztnRkFFOEU7O0VBRTlFLDRCQUE0Qjs7RUFFNUI7O2dGQUU4RTs7RUFFOUUsdUJBQXVCLEVBQUUsZ0NBQWdDO0VBQ3pELHVCQUF1QixFQUFFLDJCQUEyQjtFQUNwRCx1QkFBdUIsRUFBRSw2QkFBNkI7RUFDdEQsd0JBQXdCLENBQUMsaUNBQWlDO0NBQzNEOztBQUVEO0VBQ0UsbUJBQW1CO0VBQ25CLG9CQUFvQjtDQUNyQjs7QUFFRDtFQUNFLGVBQWU7RUFDZixrQkFBa0I7RUFDbEIsa0JBQWtCO0VBQ2xCLG9DQUFvQztDQUNyQ1wiLFwiZmlsZVwiOlwiUGFnZS5jc3NcIixcInNvdXJjZXNDb250ZW50XCI6W1wiLyoqXFxuICogUmVhY3QgU3RhcnRlciBLaXQgKGh0dHBzOi8vd3d3LnJlYWN0c3RhcnRlcmtpdC5jb20vKVxcbiAqXFxuICogQ29weXJpZ2h0IMKpIDIwMTQtcHJlc2VudCBLcmlhc29mdCwgTExDLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxcbiAqXFxuICogVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UgZm91bmQgaW4gdGhlXFxuICogTElDRU5TRS50eHQgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cXG4gKi9cXG5cXG4vKipcXG4gKiBSZWFjdCBTdGFydGVyIEtpdCAoaHR0cHM6Ly93d3cucmVhY3RzdGFydGVya2l0LmNvbS8pXFxuICpcXG4gKiBDb3B5cmlnaHQgwqkgMjAxNC1wcmVzZW50IEtyaWFzb2Z0LCBMTEMuIEFsbCByaWdodHMgcmVzZXJ2ZWQuXFxuICpcXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZSBmb3VuZCBpbiB0aGVcXG4gKiBMSUNFTlNFLnR4dCBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxcbiAqL1xcblxcbjpyb290IHtcXG4gIC8qXFxuICAgKiBUeXBvZ3JhcGh5XFxuICAgKiA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0gKi9cXG5cXG4gIC0tZm9udC1mYW1pbHktYmFzZTogJ1NlZ29lIFVJJywgJ0hlbHZldGljYU5ldWUtTGlnaHQnLCBzYW5zLXNlcmlmO1xcblxcbiAgLypcXG4gICAqIExheW91dFxcbiAgICogPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09ICovXFxuXFxuICAtLW1heC1jb250ZW50LXdpZHRoOiAxMDAwcHg7XFxuXFxuICAvKlxcbiAgICogTWVkaWEgcXVlcmllcyBicmVha3BvaW50c1xcbiAgICogPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09ICovXFxuXFxuICAtLXNjcmVlbi14cy1taW46IDQ4MHB4OyAgLyogRXh0cmEgc21hbGwgc2NyZWVuIC8gcGhvbmUgKi9cXG4gIC0tc2NyZWVuLXNtLW1pbjogNzY4cHg7ICAvKiBTbWFsbCBzY3JlZW4gLyB0YWJsZXQgKi9cXG4gIC0tc2NyZWVuLW1kLW1pbjogOTkycHg7ICAvKiBNZWRpdW0gc2NyZWVuIC8gZGVza3RvcCAqL1xcbiAgLS1zY3JlZW4tbGctbWluOiAxMjAwcHg7IC8qIExhcmdlIHNjcmVlbiAvIHdpZGUgZGVza3RvcCAqL1xcbn1cXG5cXG4ucm9vdCB7XFxuICBwYWRkaW5nLWxlZnQ6IDIwcHg7XFxuICBwYWRkaW5nLXJpZ2h0OiAyMHB4O1xcbn1cXG5cXG4uY29udGFpbmVyIHtcXG4gIG1hcmdpbjogMCBhdXRvO1xcbiAgcGFkZGluZzogMCAwIDQwcHg7XFxuICBtYXgtd2lkdGg6IDEwMDBweDtcXG4gIG1heC13aWR0aDogdmFyKC0tbWF4LWNvbnRlbnQtd2lkdGgpO1xcbn1cXG5cIl0sXCJzb3VyY2VSb290XCI6XCJcIn1dKTtcblxuLy8gZXhwb3J0c1xuZXhwb3J0cy5sb2NhbHMgPSB7XG5cdFwicm9vdFwiOiBcIlBhZ2Utcm9vdC0yVnVIdFwiLFxuXHRcImNvbnRhaW5lclwiOiBcIlBhZ2UtY29udGFpbmVyLVFPVUc3XCJcbn07IiwiXG4gICAgdmFyIGNvbnRlbnQgPSByZXF1aXJlKFwiISEuLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcz8/cmVmLS02LXJ1bGVzLTIhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Bvc3Rjc3MtbG9hZGVyL2xpYi9pbmRleC5qcz8/cmVmLS02LXJ1bGVzLTMhLi9QYWdlLmNzc1wiKTtcbiAgICB2YXIgaW5zZXJ0Q3NzID0gcmVxdWlyZShcIiEuLi8uLi8uLi9ub2RlX21vZHVsZXMvaXNvbW9ycGhpYy1zdHlsZS1sb2FkZXIvbGliL2luc2VydENzcy5qc1wiKTtcblxuICAgIGlmICh0eXBlb2YgY29udGVudCA9PT0gJ3N0cmluZycpIHtcbiAgICAgIGNvbnRlbnQgPSBbW21vZHVsZS5pZCwgY29udGVudCwgJyddXTtcbiAgICB9XG5cbiAgICBtb2R1bGUuZXhwb3J0cyA9IGNvbnRlbnQubG9jYWxzIHx8IHt9O1xuICAgIG1vZHVsZS5leHBvcnRzLl9nZXRDb250ZW50ID0gZnVuY3Rpb24oKSB7IHJldHVybiBjb250ZW50OyB9O1xuICAgIG1vZHVsZS5leHBvcnRzLl9nZXRDc3MgPSBmdW5jdGlvbigpIHsgcmV0dXJuIGNvbnRlbnQudG9TdHJpbmcoKTsgfTtcbiAgICBtb2R1bGUuZXhwb3J0cy5faW5zZXJ0Q3NzID0gZnVuY3Rpb24ob3B0aW9ucykgeyByZXR1cm4gaW5zZXJ0Q3NzKGNvbnRlbnQsIG9wdGlvbnMpIH07XG4gICAgXG4gICAgLy8gSG90IE1vZHVsZSBSZXBsYWNlbWVudFxuICAgIC8vIGh0dHBzOi8vd2VicGFjay5naXRodWIuaW8vZG9jcy9ob3QtbW9kdWxlLXJlcGxhY2VtZW50XG4gICAgLy8gT25seSBhY3RpdmF0ZWQgaW4gYnJvd3NlciBjb250ZXh0XG4gICAgaWYgKG1vZHVsZS5ob3QgJiYgdHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcgJiYgd2luZG93LmRvY3VtZW50KSB7XG4gICAgICB2YXIgcmVtb3ZlQ3NzID0gZnVuY3Rpb24oKSB7fTtcbiAgICAgIG1vZHVsZS5ob3QuYWNjZXB0KFwiISEuLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcz8/cmVmLS02LXJ1bGVzLTIhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Bvc3Rjc3MtbG9hZGVyL2xpYi9pbmRleC5qcz8/cmVmLS02LXJ1bGVzLTMhLi9QYWdlLmNzc1wiLCBmdW5jdGlvbigpIHtcbiAgICAgICAgY29udGVudCA9IHJlcXVpcmUoXCIhIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzPz9yZWYtLTYtcnVsZXMtMiEuLi8uLi8uLi9ub2RlX21vZHVsZXMvcG9zdGNzcy1sb2FkZXIvbGliL2luZGV4LmpzPz9yZWYtLTYtcnVsZXMtMyEuL1BhZ2UuY3NzXCIpO1xuXG4gICAgICAgIGlmICh0eXBlb2YgY29udGVudCA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICBjb250ZW50ID0gW1ttb2R1bGUuaWQsIGNvbnRlbnQsICcnXV07XG4gICAgICAgIH1cblxuICAgICAgICByZW1vdmVDc3MgPSBpbnNlcnRDc3MoY29udGVudCwgeyByZXBsYWNlOiB0cnVlIH0pO1xuICAgICAgfSk7XG4gICAgICBtb2R1bGUuaG90LmRpc3Bvc2UoZnVuY3Rpb24oKSB7IHJlbW92ZUNzcygpOyB9KTtcbiAgICB9XG4gICIsIi8qKlxuICogUmVhY3QgU3RhcnRlciBLaXQgKGh0dHBzOi8vd3d3LnJlYWN0c3RhcnRlcmtpdC5jb20vKVxuICpcbiAqIENvcHlyaWdodCDCqSAyMDE0LXByZXNlbnQgS3JpYXNvZnQsIExMQy4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqXG4gKiBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBNSVQgbGljZW5zZSBmb3VuZCBpbiB0aGVcbiAqIExJQ0VOU0UudHh0IGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4gKi9cblxuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBQcm9wVHlwZXMgZnJvbSAncHJvcC10eXBlcyc7XG5pbXBvcnQgd2l0aFN0eWxlcyBmcm9tICdpc29tb3JwaGljLXN0eWxlLWxvYWRlci9saWIvd2l0aFN0eWxlcyc7XG5pbXBvcnQgcyBmcm9tICcuL1BhZ2UuY3NzJztcblxuY2xhc3MgUGFnZSBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XG4gIHN0YXRpYyBwcm9wVHlwZXMgPSB7XG4gICAgdGl0bGU6IFByb3BUeXBlcy5zdHJpbmcuaXNSZXF1aXJlZCxcbiAgICBodG1sOiBQcm9wVHlwZXMuc3RyaW5nLmlzUmVxdWlyZWQsXG4gIH07XG5cbiAgcmVuZGVyKCkge1xuICAgIGNvbnN0IHsgdGl0bGUsIGh0bWwgfSA9IHRoaXMucHJvcHM7XG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXYgY2xhc3NOYW1lPXtzLnJvb3R9PlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT17cy5jb250YWluZXJ9PlxuICAgICAgICAgIDxoMT57dGl0bGV9PC9oMT5cbiAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgcmVhY3Qvbm8tZGFuZ2VyXG4gICAgICAgICAgICBkYW5nZXJvdXNseVNldElubmVySFRNTD17eyBfX2h0bWw6IGh0bWwgfX1cbiAgICAgICAgICAvPlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgd2l0aFN0eWxlcyhzKShQYWdlKTtcbiIsInZhciBtYXAgPSB7XG5cdFwiLi9hYm91dC5jcy1DWi5tZFwiOiBcIi4vc3JjL3JvdXRlcy9hYm91dC9hYm91dC5jcy1DWi5tZFwiXG59O1xuXG5cbmZ1bmN0aW9uIHdlYnBhY2tDb250ZXh0KHJlcSkge1xuXHR2YXIgaWQgPSB3ZWJwYWNrQ29udGV4dFJlc29sdmUocmVxKTtcblx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oaWQpO1xufVxuZnVuY3Rpb24gd2VicGFja0NvbnRleHRSZXNvbHZlKHJlcSkge1xuXHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKG1hcCwgcmVxKSkge1xuXHRcdHZhciBlID0gbmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIiArIHJlcSArIFwiJ1wiKTtcblx0XHRlLmNvZGUgPSAnTU9EVUxFX05PVF9GT1VORCc7XG5cdFx0dGhyb3cgZTtcblx0fVxuXHRyZXR1cm4gbWFwW3JlcV07XG59XG53ZWJwYWNrQ29udGV4dC5rZXlzID0gZnVuY3Rpb24gd2VicGFja0NvbnRleHRLZXlzKCkge1xuXHRyZXR1cm4gT2JqZWN0LmtleXMobWFwKTtcbn07XG53ZWJwYWNrQ29udGV4dC5yZXNvbHZlID0gd2VicGFja0NvbnRleHRSZXNvbHZlO1xubW9kdWxlLmV4cG9ydHMgPSB3ZWJwYWNrQ29udGV4dDtcbndlYnBhY2tDb250ZXh0LmlkID0gXCIuL3NyYy9yb3V0ZXMvYWJvdXQgc3luYyByZWN1cnNpdmUgXlxcXFwuXFxcXC9hYm91dFxcXFwuLipcXFxcLm1kJFwiOyIsIm1vZHVsZS5leHBvcnRzID0ge1widGl0bGVcIjpcIk8gbsOhc1wiLFwiY29tcG9uZW50XCI6XCJDb250ZW50UGFnZVwiLFwia2V5XCI6XCJhYm91dC5jcy1DWlwiLFwiaHRtbFwiOlwiPHA+TG9yZW0gaXBzdW0gZG9sb3Igc2l0IGFtZXQsIGNvbnNlY3RldHVyIGFkaXBpc2NpbmcgRUxJVC4gQWVuZWFuIGNvbnNlcXVhdFxcbnRvcnRvciBmZXJtZW50dW0gbWkgZmVybWVudHVtIGRpZ25pc3NpbS4gTnVsbGFtIHZlbCBpcHN1bSB1dCBsaWd1bGEgRWxlbWVudHVtXFxubG9ib3J0aXMuIE1hZWNlbmFzIFBvZMSbbHRlLCBtYXNzYSBsYW9yZWV0IGxhY2luaWEgcHJldGl1bSwgbmlzaSB1cm5hIHZlbmVuYXRpc1xcbnRvcnRvciwgam4gaW1wZXJkaWV0IFRlbGx1cyBsaWJlcm8gZWZmaWNpdHVyIE1ldHVzLiBGdXNjZSBzZW1wcmUgcG9zdWVyZVxcbmxpZ3VsYSwgZXQgZmFjaWxpc2lzIE1ldHVzIEJpYmVuZHVtIGludGVyZHVtLiBNYXVyaXMgbmEgbWF1cmlzIHNpdCBhbWV0IFNFTVxcbnBoYXJldHJhIGNvbW1vZG8gbWV6aSBFVSBhIExlby4gTmFtIHDFmWkgZXN0IG5vbiByaXN1cyBjdXJzdXMgbWF4aW11cy4gTmFtIGZldWdpYXRcXG5hdWd1ZSBsaWJlcm8sIGlkIGNvbnNlY3RldHVyIHRvcnRvciBCaWJlbmR1bSBub24uIFF1aXNxdWUgbmVjIGZyaW5naWxsYSBsb3JlbS5cXG5OdWxsYW0gZWZmaWNpdHVyIHZ1bHB1dGF0ZSBtYXVyaXMsIGpuIG1heGltdXMgbGVvIGRpZ25pc3NpbSBpZC48L3A+XFxuPHA+ViBIQUMgaGFiaXRhc3NlIHBsYXRlYSBkaWN0dW1zdC4gRHVpcyBzYWdpdHRpcyBEVUkgQUMgZXggc3VzY2lwaXQgbWF4aW11cy5cXG5Nb3JiaSBwZWxsZW50ZXNxdWUgdmVuZW5hdGlzIEZlbGlzIHNlZCBjb252YWxsaXMuIE51bGxhIHZhcml1cywgTklCSCB2aXRhZVxcbnBsYWNlcmF0IFRlbXB1cywgbWF1cmlzIHNlbSBFbGVtZW50dW0gaXBzdW0sIEVnZXQgc29sbGljaXR1ZGluIG5pc2wgZXN0IHZlbFxcbnB1cnVzLiBGdXNjZSBtYWxlc3VhZGEgT2RpbyB2ZWxpdCwgbm9uIGN1cnN1cyBsZW8gZmVybWVudHVtIGlkLiBDcmFzIHBoYXJldHJhXFxuc29kYWxlcyBmcmluZ2lsbGEuIEV0aWFtIFF1aXMgZXN0IGRvbG9yIGVnZXN0YXMgcGVsbGVudGVzcXVlLiBNYWVjZW5hcyBub25cXG5zY2VsZXJpc3F1ZSBwdXJ1cywgY29uZ3VlIGN1cnN1cyBBcmN1LiBEb25lYyB2ZWwgbWkgZGFwaWJ1cy4gTWF1cmlzIG1heGltdXNcXG5wb3N1ZXJlIHBsYWNlcmF0LiBTZWQgZXQgbGliZXJvIGV1IE5JQkggdHJpc3RpcXVlIG1vbGxpcyBFZ2V0IGxlY3R1cy4gRG9uZWNcXG5pbnRlcmR1bSBhdWd1ZSBzb2xsaWNpdHVkaW4gdmVoaWN1bGEgaGVuZHJlcml0LiBWaXZhbXVzIEp1c3RvIE9yY2ksIG1vbGVzdGllXFxuYWMgc29sbGljaXR1ZGluIGFjLCBsb2JvcnRpcyBuYSBUZWxsdXMuIEV0aWFtIHJob25jdXMgdWxsYW1jb3JwZXIgcmlzdXMgZXVcXG50ZW1wb3IuIFNlZCBwb3J0dGl0b3IsIG5lcXVlIEFDIGVmZmljaXR1ciBncmF2aWRhLCBBcmN1IGxhY3VzIHBoYXJldHJhIERVSSwgdlxcbmNvbnNlcXVhdCBlbGl0IFRlbGx1cyBhdWN0b3IgbnVsbGEuIERvbmVjIHBsYWNlcmF0IEVsZW1lbnR1bSBwcsWvbcSbciwgdml0YWVcXG5pbXBlcmRpZXQgbGVjdHVzIGx1Y3R1cyBuYSBhZHJlc2UuPC9wPlxcbjxwPk51bGxhbSBldSBmZXVnaWF0IG1pLiBRdWlzcXVlIGpuIHRyaXN0aXF1ZSBuaXNsLCBkaWduaXNzaW0gdsO9cm9rIGxlby4gTmFtXFxubm9uIHF1YW0gbmlzaS4gRG9uZWMgcnV0cnVtIHR1cnBpcyBhYyBwcsWvbcSbciBibGFuZGl0LCBpZCBwdWx2aW5hcnUgbWF1cmlzXFxuc3VzY2lwaXQuIFBlbGxlbnRlc3F1ZSB0aW5jaWR1bnQgbGliZXJvIHVsdHJpY2llcyByaXN1cyBpYWN1bGlzLCBzaXQgYW1ldFxcbmNvbnNlcXVhdCB2ZWxpdCBibGFuZGl0LiBGdXNjZSBxdWlzIHZhcml1cyBudWxsYS4gTnVsbGFtIG5pc2kgbmlzaSwgc3VzY2lwaXRcXG51dCBtYWduYSBxdWlzLCBmZXVnaWF0IHBvcnRhIE5JQkguIFNlZCBpZCBlbmltIGxlY3R1cy4gU3VzcGVuZGlzc2UgRWxlbWVudHVtXFxuSnVzdG8gU2FwaWVuLCBzaXQgYW1ldCBjb25zZXF1YXQgT3JjaSBhY2N1bXNhbiBldC4gUG9kxJtsdGUgb3JuYXJlIHVsbGFtY29ycGVyXFxuc2VtIHNlZCBmaW5pYnVzLiBOdWxsYW0gYWMgbGFjdXMgcHVsdmluYXJ1LCBlZ2VzdGFzIEZlbGlzIHV0LCBhY2N1bXNhbiBlc3QuPC9wPlxcbjxwPlBlbGxlbnRlc3F1ZSBzYWdpdHRpcyB2ZWhpY3VsYSBzZW0gUXVpcyBsdWN0dXMuIFByb2luIHNvZGFsZXMgbWFnbmEgdiBsb3JlbVxcbmhlbmRyZXJpdCBQb2TEm2x0ZS4gSW50ZWdlciB2YXJpdXMgZXUgT3JjaS4gVmVzdGlidWx1bSBhbnRlIGlwc3VtIHByaW1pcyB2XFxuZmF1Y2lidXMgT3JjaSBsdWN0dXMgZXQgdWx0cmljZXMgcG9zdWVyZSBjdWJpbGlhIEN1cmFlOyBWZXN0aWJ1bHVtIGFudGUgaXBzdW1cXG5wcmltaXMgdiBmYXVjaWJ1cyBPcmNpIGx1Y3R1cyBldCB1bHRyaWNlcyBwb3N1ZXJlIGN1YmlsaWEgQ3VyYWU7IFV0IHYgbWF1cmlzXFxuTklCSC4gU3VzcGVuZGlzc2UgbWF4aW11cyBhYyBlcm9zIG5hIHZlc3RpYnVsdW0uPC9wPlxcbjxwPkludGVyZHVtIGV0IG1hbGVzdWFkYSBmYW1lcyBhYyBhbnRlIGlwc3VtIHByaW1pcyB2IGZhdWNpYnVzLiBRdWlzcXVlIGVnZXN0YXNcXG50b3J0b3IgZXQgRFVJIGNvbnNlcXVhdCBmYXVjaWJ1cy4gTnVuYyB2aXRhZSBPZGlvIG9ybmFyZSwgdmVuZW5hdGlzIGxpZ3VsYSBBLFxcbnZ1bHB1dGF0ZSBuaXNsLiBBZW5lYW4gY29uZ3VlIHZhcml1cyBleCwgc2l0IGFtZXQgQmliZW5kdW0gT2RpbyBwb3N1ZXJlIG5hIGFkcmVzZS5cXG5OdWxsYSBmYWNpbGlzaS4gViBmaW5pYnVzLCBudWxsYSB2aXRhZSB0aW5jaWR1bnQgb3JuYXJlLCBTYXBpZW4gbnVsbGFcXG5mZXJtZW50dW0gbWF1cmlzLCBzZWQgY29uc2VjdGV0dXIgdG9ydG9yIEFyY3UgRWdldCBBcmN1LiBWZXN0aWJ1bHVtIHZlbCBxdWFtXFxuZW5pbS48L3A+XFxuXCJ9OyIsIm1vZHVsZS5leHBvcnRzID0ge1widGl0bGVcIjpcIkFib3V0IFVzXCIsXCJjb21wb25lbnRcIjpcIkNvbnRlbnRQYWdlXCIsXCJrZXlcIjpcImFib3V0XCIsXCJodG1sXCI6XCI8cD5Mb3JlbSBpcHN1bSBkb2xvciBzaXQgYW1ldCwgY29uc2VjdGV0dXIgYWRpcGlzY2luZyBlbGl0LiBBZW5lYW4gY29uc2VxdWF0IHRvcnRvclxcbmZlcm1lbnR1bSBtaSBmZXJtZW50dW0gZGlnbmlzc2ltLiBOdWxsYW0gdmVsIGlwc3VtIHV0IGxpZ3VsYSBlbGVtZW50dW0gbG9ib3J0aXMuXFxuTWFlY2VuYXMgYWxpcXVhbSwgbWFzc2EgbGFvcmVldCBsYWNpbmlhIHByZXRpdW0sIG5pc2kgdXJuYSB2ZW5lbmF0aXMgdG9ydG9yLCBuZWNcXG5pbXBlcmRpZXQgdGVsbHVzIGxpYmVybyBlZmZpY2l0dXIgbWV0dXMuIEZ1c2NlIHNlbXBlciBwb3N1ZXJlIGxpZ3VsYSwgZXRcXG5mYWNpbGlzaXMgbWV0dXMgYmliZW5kdW0gaW50ZXJkdW0uIE1hdXJpcyBhdCBtYXVyaXMgc2l0IGFtZXQgc2VtIHBoYXJldHJhXFxuY29tbW9kbyBhIGV1IGxlby4gTmFtIGF0IGVzdCBub24gcmlzdXMgY3Vyc3VzIG1heGltdXMuIE5hbSBmZXVnaWF0IGF1Z3VlIGxpYmVybyxcXG5pZCBjb25zZWN0ZXR1ciB0b3J0b3IgYmliZW5kdW0gbm9uLiBRdWlzcXVlIG5lYyBmcmluZ2lsbGEgbG9yZW0uIE51bGxhbVxcbmVmZmljaXR1ciB2dWxwdXRhdGUgbWF1cmlzLCBuZWMgbWF4aW11cyBsZW8gZGlnbmlzc2ltIGlkLjwvcD5cXG48cD5JbiBoYWMgaGFiaXRhc3NlIHBsYXRlYSBkaWN0dW1zdC4gRHVpcyBzYWdpdHRpcyBkdWkgYWMgZXggc3VzY2lwaXQgbWF4aW11cy5cXG5Nb3JiaSBwZWxsZW50ZXNxdWUgdmVuZW5hdGlzIGZlbGlzIHNlZCBjb252YWxsaXMuIE51bGxhIHZhcml1cywgbmliaCB2aXRhZVxcbnBsYWNlcmF0IHRlbXB1cywgbWF1cmlzIHNlbSBlbGVtZW50dW0gaXBzdW0sIGVnZXQgc29sbGljaXR1ZGluIG5pc2wgZXN0IHZlbFxcbnB1cnVzLiBGdXNjZSBtYWxlc3VhZGEgb2RpbyB2ZWxpdCwgbm9uIGN1cnN1cyBsZW8gZmVybWVudHVtIGlkLiBDcmFzIHBoYXJldHJhXFxuc29kYWxlcyBmcmluZ2lsbGEuIEV0aWFtIHF1aXMgZXN0IGEgZG9sb3IgZWdlc3RhcyBwZWxsZW50ZXNxdWUuIE1hZWNlbmFzIG5vblxcbnNjZWxlcmlzcXVlIHB1cnVzLCBjb25ndWUgY3Vyc3VzIGFyY3UuIERvbmVjIHZlbCBkYXBpYnVzIG1pLiBNYXVyaXMgbWF4aW11c1xcbnBvc3VlcmUgcGxhY2VyYXQuIFNlZCBldCBsaWJlcm8gZXUgbmliaCB0cmlzdGlxdWUgbW9sbGlzIGEgZWdldCBsZWN0dXMuIERvbmVjXFxuaW50ZXJkdW0gYXVndWUgc29sbGljaXR1ZGluIHZlaGljdWxhIGhlbmRyZXJpdC4gVml2YW11cyBqdXN0byBvcmNpLCBtb2xlc3RpZSBhY1xcbnNvbGxpY2l0dWRpbiBhYywgbG9ib3J0aXMgYXQgdGVsbHVzLiBFdGlhbSByaG9uY3VzIHVsbGFtY29ycGVyIHJpc3VzIGV1IHRlbXBvci5cXG5TZWQgcG9ydHRpdG9yLCBuZXF1ZSBhYyBlZmZpY2l0dXIgZ3JhdmlkYSwgYXJjdSBsYWN1cyBwaGFyZXRyYSBkdWksIGluIGNvbnNlcXVhdFxcbmVsaXQgdGVsbHVzIGF1Y3RvciBudWxsYS4gRG9uZWMgcGxhY2VyYXQgZWxlbWVudHVtIGRpYW0sIHZpdGFlIGltcGVyZGlldCBsZWN0dXNcXG5sdWN0dXMgYXQuPC9wPlxcbjxwPk51bGxhbSBldSBmZXVnaWF0IG1pLiBRdWlzcXVlIG5lYyB0cmlzdGlxdWUgbmlzbCwgZGlnbmlzc2ltIGRpY3R1bSBsZW8uIE5hbSBub25cXG5xdWFtIG5pc2kuIERvbmVjIHJ1dHJ1bSB0dXJwaXMgYWMgZGlhbSBibGFuZGl0LCBpZCBwdWx2aW5hciBtYXVyaXMgc3VzY2lwaXQuXFxuUGVsbGVudGVzcXVlIHRpbmNpZHVudCBsaWJlcm8gdWx0cmljaWVzIHJpc3VzIGlhY3VsaXMsIHNpdCBhbWV0IGNvbnNlcXVhdCB2ZWxpdFxcbmJsYW5kaXQuIEZ1c2NlIHF1aXMgdmFyaXVzIG51bGxhLiBOdWxsYW0gbmlzaSBuaXNpLCBzdXNjaXBpdCB1dCBtYWduYSBxdWlzLFxcbmZldWdpYXQgcG9ydGEgbmliaC4gU2VkIGlkIGVuaW0gbGVjdHVzLiBTdXNwZW5kaXNzZSBlbGVtZW50dW0ganVzdG8gc2FwaWVuLCBzaXRcXG5hbWV0IGNvbnNlcXVhdCBvcmNpIGFjY3Vtc2FuIGV0LiBBbGlxdWFtIG9ybmFyZSB1bGxhbWNvcnBlciBzZW0gc2VkIGZpbmlidXMuXFxuTnVsbGFtIGFjIGxhY3VzIHB1bHZpbmFyLCBlZ2VzdGFzIGZlbGlzIHV0LCBhY2N1bXNhbiBlc3QuPC9wPlxcbjxwPlBlbGxlbnRlc3F1ZSBzYWdpdHRpcyB2ZWhpY3VsYSBzZW0gcXVpcyBsdWN0dXMuIFByb2luIHNvZGFsZXMgbWFnbmEgaW4gbG9yZW1cXG5oZW5kcmVyaXQgYWxpcXVhbS4gSW50ZWdlciBldSB2YXJpdXMgb3JjaS4gVmVzdGlidWx1bSBhbnRlIGlwc3VtIHByaW1pcyBpblxcbmZhdWNpYnVzIG9yY2kgbHVjdHVzIGV0IHVsdHJpY2VzIHBvc3VlcmUgY3ViaWxpYSBDdXJhZTsgVmVzdGlidWx1bSBhbnRlIGlwc3VtXFxucHJpbWlzIGluIGZhdWNpYnVzIG9yY2kgbHVjdHVzIGV0IHVsdHJpY2VzIHBvc3VlcmUgY3ViaWxpYSBDdXJhZTsgVXQgYXQgbWF1cmlzXFxubmliaC4gU3VzcGVuZGlzc2UgbWF4aW11cyBhYyBlcm9zIGF0IHZlc3RpYnVsdW0uPC9wPlxcbjxwPkludGVyZHVtIGV0IG1hbGVzdWFkYSBmYW1lcyBhYyBhbnRlIGlwc3VtIHByaW1pcyBpbiBmYXVjaWJ1cy4gUXVpc3F1ZSBlZ2VzdGFzXFxudG9ydG9yIGV0IGR1aSBjb25zZXF1YXQgZmF1Y2lidXMuIE51bmMgdml0YWUgb2RpbyBvcm5hcmUsIHZlbmVuYXRpcyBsaWd1bGEgYSxcXG52dWxwdXRhdGUgbmlzbC4gQWVuZWFuIGNvbmd1ZSB2YXJpdXMgZXgsIHNpdCBhbWV0IGJpYmVuZHVtIG9kaW8gcG9zdWVyZSBhdC5cXG5OdWxsYSBmYWNpbGlzaS4gSW4gZmluaWJ1cywgbnVsbGEgdml0YWUgdGluY2lkdW50IG9ybmFyZSwgc2FwaWVuIG51bGxhIGZlcm1lbnR1bVxcbm1hdXJpcywgc2VkIGNvbnNlY3RldHVyIHRvcnRvciBhcmN1IGVnZXQgYXJjdS4gVmVzdGlidWx1bSB2ZWwgcXVhbSBlbmltLjwvcD5cXG5cIn07IiwiLyoqXG4gKiBSZWFjdCBTdGFydGVyIEtpdCAoaHR0cHM6Ly93d3cucmVhY3RzdGFydGVya2l0LmNvbS8pXG4gKlxuICogQ29weXJpZ2h0IMKpIDIwMTQtcHJlc2VudCBLcmlhc29mdCwgTExDLiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlIGZvdW5kIGluIHRoZVxuICogTElDRU5TRS50eHQgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cbiAqL1xuXG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IExheW91dCBmcm9tICcuLi8uLi9jb21wb25lbnRzL0xheW91dCc7XG5pbXBvcnQgUGFnZSBmcm9tICcuLi8uLi9jb21wb25lbnRzL1BhZ2UnO1xuXG5hc3luYyBmdW5jdGlvbiBhY3Rpb24oeyBsb2NhbGUgfSkge1xuICBjb25zdCBkYXRhID0gYXdhaXQgbmV3IFByb21pc2UocmVzb2x2ZSA9PiB7XG4gICAgcmVxdWlyZS5lbnN1cmUoXG4gICAgICBbXSxcbiAgICAgIHJlcXVpcmUgPT4ge1xuICAgICAgICB0cnkge1xuICAgICAgICAgIHJlc29sdmUocmVxdWlyZShgLi9hYm91dC4ke2xvY2FsZX0ubWRgKSk7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgaW1wb3J0L25vLWR5bmFtaWMtcmVxdWlyZVxuICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgcmVzb2x2ZShyZXF1aXJlKCcuL2Fib3V0Lm1kJykpO1xuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgJ2Fib3V0JyxcbiAgICApO1xuICB9KTtcblxuICByZXR1cm4ge1xuICAgIGNodW5rczogWydhYm91dCddLFxuICAgIHRpdGxlOiBkYXRhLnRpdGxlLFxuICAgIGNvbXBvbmVudDogKFxuICAgICAgPExheW91dD5cbiAgICAgICAgPFBhZ2Ugey4uLmRhdGF9IC8+XG4gICAgICA8L0xheW91dD5cbiAgICApLFxuICB9O1xufVxuXG5leHBvcnQgZGVmYXVsdCBhY3Rpb247XG4iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7QUNYQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQzdCQTs7Ozs7Ozs7QUFTQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFNQTtBQUNBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQ0E7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBRUE7QUFDQTtBQUFBO0FBQUE7QUFGQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQU9BO0FBQ0E7QUFwQkE7QUFDQTtBQURBO0FBRUE7QUFDQTtBQUZBO0FBQ0E7QUFvQkE7Ozs7Ozs7QUNwQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7OztBQ3RCQTs7Ozs7OztBQ0FBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNBQTs7Ozs7Ozs7QUFTQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7OztBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFHQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFDQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUxBO0FBU0E7Ozs7QUFFQTs7OztBIiwic291cmNlUm9vdCI6IiJ9