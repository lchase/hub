/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _nodeCron = __webpack_require__(1);

	var _nodeCron2 = _interopRequireDefault(_nodeCron);

	var _bunyan = __webpack_require__(2);

	var _bunyan2 = _interopRequireDefault(_bunyan);

	var _bunyanFormat = __webpack_require__(3);

	var _bunyanFormat2 = _interopRequireDefault(_bunyanFormat);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var formatOut = (0, _bunyanFormat2.default)({ outputMode: 'short' });

	var log = _bunyan2.default.createLogger({
	  name: 'app',
	  stream: formatOut,
	  level: 'debug'
	});

	log.info('starting up');
	log.debug('things are heating up', { temperature: 80, status: { started: 'yes', overheated: 'no' } });
	log.warn('getting a bit hot', { temperature: 120 });
	log.error('OOOOHHH it burns!', new Error('temperature: 200'));
	log.fatal('I died! Do you know what that means???');

	_nodeCron2.default.schedule('* * * * *', function () {
	  log.info('Running a task every minute: ', new Date());

	  // Do whatevers...
	});

/***/ },
/* 1 */
/***/ function(module, exports) {

	module.exports = require("node-cron");

/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = require("bunyan");

/***/ },
/* 3 */
/***/ function(module, exports) {

	module.exports = require("bunyan-format");

/***/ }
/******/ ]);