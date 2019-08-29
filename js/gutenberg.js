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
	/******/ 	return __webpack_require__(__webpack_require__.s = 177);
	/******/ })
/************************************************************************/
/******/ ({

	/***/ 177:
	/***/ (function(module, exports, __webpack_require__) {

        "use strict";


		/* global jQuery, YjzanGutenbergSettings */
        (function ($) {
            'use strict';

            var YjzanGutenbergApp = {

                cacheElements: function cacheElements() {
                    this.isYjzanMode = '1' === YjzanGutenbergSettings.isYjzanMode;

                    this.cache = {};

                    this.cache.$gutenberg = $('#editor');
                    this.cache.$switchMode = $($('#yjzan-gutenberg-button-switch-mode').html());

                    this.cache.$gutenberg.find('.edit-post-header-toolbar').append(this.cache.$switchMode);
                    this.cache.$switchModeButton = this.cache.$switchMode.find('#yjzan-switch-mode-button');

                    this.toggleStatus();
                    this.buildPanel();

                    var self = this;

                    wp.data.subscribe(function () {
                        setTimeout(function () {
                            self.buildPanel();
                        }, 1);
                    });
                },

                buildPanel: function buildPanel() {
                    var self = this;

                    if (!$('#yjzan-editor').length) {
                        self.cache.$editorPanel = $($('#yjzan-gutenberg-panel').html());
                        self.cache.$gurenbergBlockList = self.cache.$gutenberg.find('.editor-block-list__layout, .editor-post-text-editor');
                        self.cache.$gurenbergBlockList.after(self.cache.$editorPanel);

                        self.cache.$editorPanelButton = self.cache.$editorPanel.find('#yjzan-go-to-edit-page-link');

                        self.cache.$editorPanelButton.on('click', function (event) {
                            event.preventDefault();

                            self.animateLoader();

                            var documentTitle = wp.data.select('core/editor').getEditedPostAttribute('title');
                            if (!documentTitle) {
                                wp.data.dispatch('core/editor').editPost({ title: '新建页面 #' + $('#post_ID').val() });
                            }

                            wp.data.dispatch('core/editor').savePost();
                            self.redirectWhenSave();
                        });
                    }
                },

                bindEvents: function bindEvents() {
                    var self = this;

                    self.cache.$switchModeButton.on('click', function () {
                        if (self.isYjzanMode) {
                            yjzanCommon.dialogsManager.createWidget('confirm', {
                                message: yjzanAdmin.translate('back_to_wordpress_editor_message'),
                                headerMessage: yjzanAdmin.translate('back_to_wordpress_editor_header'),
                                strings: {
                                    confirm: yjzanAdmin.translate('yes'),
                                    cancel: yjzanAdmin.translate('cancel')
                                },
                                defaultOption: 'confirm',
                                onConfirm: function onConfirm() {
                                    var wpEditor = wp.data.dispatch('core/editor');

                                    wpEditor.editPost({ gutenberg_yjzan_mode: false });
                                    wpEditor.savePost();
                                    self.isYjzanMode = !self.isYjzanMode;
                                    self.toggleStatus();
                                }
                            }).show();
                        } else {
                            self.isYjzanMode = !self.isYjzanMode;
                            self.toggleStatus();
                            self.cache.$editorPanelButton.trigger('click');
                        }
                    });
                },

                redirectWhenSave: function redirectWhenSave() {
                    var self = this;

                    setTimeout(function () {
                        if (wp.data.select('core/editor').isSavingPost()) {
                            self.redirectWhenSave();
                        } else {
                            location.href = YjzanGutenbergSettings.editLink;
                        }
                    }, 300);
                },

                animateLoader: function animateLoader() {
                    this.cache.$editorPanelButton.addClass('yjzan-animate');
                },

                toggleStatus: function toggleStatus() {
                    jQuery('body').toggleClass('yjzan-editor-active', this.isYjzanMode).toggleClass('yjzan-editor-inactive', !this.isYjzanMode);
                },

                init: function init() {
                    var self = this;
                    setTimeout(function () {
                        self.cacheElements();
                        self.bindEvents();
                    }, 1);
                }
            };

            $(function () {
                YjzanGutenbergApp.init();
            });
        })(jQuery);

		/***/ })

	/******/ });
//# sourceMappingURL=gutenberg.js.map