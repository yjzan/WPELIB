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
    /******/ 	return __webpack_require__(__webpack_require__.s = 11);
    /******/ })
/************************************************************************/
/******/ ([
    /* 0 */,
    /* 1 */
    /***/ (function(module, exports, __webpack_require__) {

        "use strict";


        var ElementEditorModule = __webpack_require__(4);

        module.exports = ElementEditorModule.extend({
            cache: {},

            getName: function getName() {
                return '';
            },

            fetchCache: function fetchCache(type, cacheKey, requestArgs) {
                var _this = this;

                return yjzanPro.ajax.addRequest('forms_panel_action_data', {
                    data: requestArgs,
                    success: function success(data) {
                        _this.cache[type] = _.extend({}, _this.cache[type]);
                        _this.cache[type][cacheKey] = data[type];
                    }
                });
            },

            updateOptions: function updateOptions(name, options) {
                var controlView = this.getEditorControlView(name);

                if (controlView) {
                    this.getEditorControlModel(name).set('options', options);

                    controlView.render();
                }
            },

            onInit: function onInit() {
                this.addSectionListener('section_' + this.getName(), this.onSectionActive);
            },

            onSectionActive: function onSectionActive() {
                this.onApiUpdate();
            },

            onApiUpdate: function onApiUpdate() {}
        });

        /***/ }),
    /* 2 */,
    /* 3 */,
    /* 4 */
    /***/ (function(module, exports, __webpack_require__) {

        "use strict";


        module.exports = yjzanModules.editor.utils.Module.extend({
            elementType: null,

            __construct: function __construct(elementType) {
                this.elementType = elementType;

                this.addEditorListener();
            },

            addEditorListener: function addEditorListener() {
                var self = this;

                if (self.onElementChange) {
                    var eventName = 'change';

                    if ('global' !== self.elementType) {
                        eventName += ':' + self.elementType;
                    }

                    yjzan.channels.editor.on(eventName, function (controlView, elementView) {
                        self.onElementChange(controlView.model.get('name'), controlView, elementView);
                    });
                }
            },

            addControlSpinner: function addControlSpinner(name) {
                var $el = this.getEditorControlView(name).$el,
                    $input = $el.find(':input');

                if ($input.attr('disabled')) {
                    return;
                }

                $input.attr('disabled', true);

                $el.find('.yjzan-control-title').after('<span class="yjzan-control-spinner"><i class="fa fa-spinner fa-spin"></i>&nbsp;</span>');
            },

            removeControlSpinner: function removeControlSpinner(name) {
                var $controlEl = this.getEditorControlView(name).$el;

                $controlEl.find(':input').attr('disabled', false);
                $controlEl.find('yjzan-control-spinner').remove();
            },

            addSectionListener: function addSectionListener(section, callback) {
                var self = this;

                yjzan.channels.editor.on('section:activated', function (sectionName, editor) {
                    var model = editor.getOption('editedElementView').getEditModel(),
                        currentElementType = model.get('elType'),
                        _arguments = arguments;

                    if ('widget' === currentElementType) {
                        currentElementType = model.get('widgetType');
                    }

                    if (self.elementType === currentElementType && section === sectionName) {
                        setTimeout(function () {
                            callback.apply(self, _arguments);
                        }, 10);
                    }
                });
            }
        });

        /***/ }),
    /* 5 */,
    /* 6 */,
    /* 7 */,
    /* 8 */,
    /* 9 */,
    /* 10 */,
    /* 11 */
    /***/ (function(module, exports, __webpack_require__) {

        "use strict";


        var _editor = __webpack_require__(12);

        var _editor2 = _interopRequireDefault(_editor);

        function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

        var YjzanPro = Marionette.Application.extend({
            config: {},

            modules: {},

            initModules: function initModules() {
                var QueryControl = __webpack_require__(14),
                    Forms = __webpack_require__(16),
                    Library = __webpack_require__(32),
                    CustomCSS = __webpack_require__(34),
                    // GlobalWidget = __webpack_require__(36),
                    FlipBox = __webpack_require__(42),
                    ShareButtons = __webpack_require__(43),
                    AssetsManager = __webpack_require__(44),
                    ThemeElements = __webpack_require__(46),
                    ThemeBuilder = __webpack_require__(48);

                this.modules = {
                    queryControl: new QueryControl(),
                    forms: new Forms(),
                    library: new Library(),
                    customCSS: new CustomCSS(),
                    //globalWidget: new GlobalWidget(),
                    flipBox: new FlipBox(),
                    popup: new _editor2.default(),
                    shareButtons: new ShareButtons(),
                    assetsManager: new AssetsManager(),
                    themeElements: new ThemeElements(),
                    themeBuilder: new ThemeBuilder()
                };
            },

            ajax: {
                prepareArgs: function prepareArgs(args) {
                    args[0] = 'pro_' + args[0];

                    return args;
                },

                send: function send() {
                    return yjzanCommon.ajax.send.apply(yjzanCommon.ajax, this.prepareArgs(arguments));
                },

                addRequest: function addRequest() {
                    return yjzanCommon.ajax.addRequest.apply(yjzanCommon.ajax, this.prepareArgs(arguments));
                }
            },

            translate: function translate(stringKey, templateArgs) {
                return yjzanCommon.translate(stringKey, null, templateArgs, this.config.i18n);
            },

            onStart: function onStart() {
                this.config = YjzanProConfig;

                this.initModules();

                jQuery(window).on('yjzan:init', this.onYjzanInit);
            },

            onYjzanInit: function onYjzanInit() {
                yjzanPro.libraryRemoveGetProButtons();

                yjzan.debug.addURLToWatch('yjzan-pro/assets');
            },

            libraryRemoveGetProButtons: function libraryRemoveGetProButtons() {
                yjzan.hooks.addFilter('yjzan/editor/template-library/template/action-button', function (viewID, templateData) {
                    return '#tmpl-yjzan-template-library-insert-button';
                });
            }
        });

        window.yjzanPro = new YjzanPro();

        yjzanPro.start();

        /***/ }),
    /* 10 */
    /***/ (function(module, exports, __webpack_require__) {

        "use strict";


        Object.defineProperty(exports, "__esModule", {
            value: true
        });

        var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

        var _displaySettings = __webpack_require__(13);

        var _displaySettings2 = _interopRequireDefault(_displaySettings);

        function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

        function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

        function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

        function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

        var _class = function (_yjzanModules$edi) {
            _inherits(_class, _yjzanModules$edi);

            function _class() {
                var _ref;

                _classCallCheck(this, _class);

                for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
                    args[_key] = arguments[_key];
                }

                var _this = _possibleConstructorReturn(this, (_ref = _class.__proto__ || Object.getPrototypeOf(_class)).call.apply(_ref, [this].concat(args)));

                _this.displaySettingsTypes = {
                    triggers: {
                        icon: 'eicon-click'
                    },
                    timing: {
                        icon: 'fa fa-cog'
                    }
                };
                return _this;
            }

            _createClass(_class, [{
                key: 'initDisplaySettingsModels',
                value: function initDisplaySettingsModels() {
                    var config = yjzan.config.document.displaySettings;

                    jQuery.each(this.displaySettingsTypes, function (type, data) {
                        data.model = new yjzanModules.editor.elements.models.BaseSettings(config[type].settings, { controls: config[type].controls });
                    });
                }
            }, {
                key: 'addDisplaySettingsPublishScreens',
                value: function addDisplaySettingsPublishScreens(publishLayout) {
                    jQuery.each(this.displaySettingsTypes, function (type, data) {
                        var model = data.model;

                        publishLayout.addScreen({
                            View: _displaySettings2.default,
                            viewOptions: {
                                name: type,
                                id: 'yjzan-popup-' + type + '__controls',
                                model: model,
                                controls: model.controls
                            },
                            name: type,
                            title: yjzanPro.translate(type),
                            description: yjzanPro.translate('popup_publish_screen_' + type + '_description'),
                            image: yjzanPro.config.urls.modules + ('popup/assets/images/' + type + '-tab.svg')
                        });
                    });
                }
            }, {
                key: 'addPanelFooterSubmenuItems',
                value: function addPanelFooterSubmenuItems() {
                    var _this2 = this;

                    jQuery.each(this.displaySettingsTypes, function (type, data) {
                        yjzan.getPanelView().footer.currentView.addSubMenuItem('saver-options', {
                            before: 'save-template',
                            name: type,
                            icon: data.icon,
                            title: yjzanPro.translate(type),
                            callback: function callback() {
                                return _this2.onPanelFooterSubmenuItemClick(type);
                            }
                        });
                    });
                }
            }, {
                key: 'addLibraryScreen',
                value: function addLibraryScreen() {
                    var screens = yjzan.templates.getScreens(),
                        pagesIndex = screens.indexOf(_.findWhere(screens, { type: 'pages' }));

                    screens.splice(pagesIndex - 1, 1, {
                        name: 'popups',
                        source: 'remote',
                        type: 'popup',
                        title: yjzanPro.translate('popups')
                    });

                    yjzan.templates.setDefaultScreen('popups');
                }
            }, {
                key: 'initIntroduction',
                value: function initIntroduction() {
                    var introduction = void 0;

                    this.getIntroduction = function () {
                        if (!introduction) {
                            introduction = new yjzanModules.editor.utils.Introduction({
                                introductionKey: 'popupSettings',
                                dialogOptions: {
                                    id: 'yjzan-popup-settings-introduction',
                                    headerMessage: '<i class="eicon-info"></i>' + yjzanPro.translate('popup_settings_introduction_title'),
                                    message: yjzanPro.translate('popup_settings_introduction_message'),
                                    closeButton: true,
                                    closeButtonClass: 'eicon-close',
                                    position: {
                                        my: 'left bottom',
                                        at: 'right bottom-5',
                                        autoRefresh: true
                                    },
                                    hide: {
                                        onOutsideClick: false
                                    }
                                }
                            });
                        }

                        return introduction;
                    };
                }
            }, {
                key: 'onYjzanInit',
                value: function onYjzanInit() {
                    var _this3 = this;

                    if ('popup' !== yjzan.config.document.type) {
                        return;
                    }

                    yjzan.on('panel:init', function () {
                        return _this3.onYjzanPanelInit();
                    });

                    yjzan.saver.on('save', function () {
                        return _this3.onEditorSave();
                    });

                    this.addLibraryScreen();
                }
            }, {
                key: 'onYjzanPanelInit',
                value: function onYjzanPanelInit() {
                    this.initDisplaySettingsModels();

                    yjzanPro.modules.themeBuilder.on('publish-layout:init', this.addDisplaySettingsPublishScreens.bind(this));

                    this.addPanelFooterSubmenuItems();

                    if (!yjzan.config.user.introduction.popupSettings) {
                        this.initIntroduction();
                    }
                }
            }, {
                key: 'onYjzanPreviewLoaded',
                value: function onYjzanPreviewLoaded() {
                    if ('popup' !== yjzan.config.document.type) {
                        return;
                    }

                    var panel = yjzan.getPanelView();

                    panel.footer.currentView.showSettingsPage('page_settings');

                    if (!yjzan.config.user.introduction.popupSettings) {
                        panel.getCurrentPageView().on('destroy', this.onPageSettingsDestroy.bind(this));
                    }
                }
            }, {
                key: 'onPageSettingsDestroy',
                value: function onPageSettingsDestroy() {
                    var introduction = this.getIntroduction();

                    introduction.show(yjzan.getPanelView().footer.currentView.ui.settings[0]);

                    introduction.setViewed();
                }
            }, {
                key: 'onEditorSave',
                value: function onEditorSave() {
                    var settings = {};

                    jQuery.each(this.displaySettingsTypes, function (type, data) {
                        settings[type] = data.model.toJSON({ removeDefault: true });
                    });

                    yjzanPro.ajax.addRequest('popup_save_display_settings', {
                        data: {
                            settings: settings
                        }
                    });
                }
            }, {
                key: 'onPanelFooterSubmenuItemClick',
                value: function onPanelFooterSubmenuItemClick(type) {
                    yjzanPro.modules.themeBuilder.showPublishModal();

                    yjzanPro.modules.themeBuilder.getPublishLayout().modalContent.currentView.showScreenByName(type);
                }
            }]);

            return _class;
        }(yjzanModules.editor.utils.Module);

        exports.default = _class;

        /***/ }),
    /* 13 */
    /***/ (function(module, exports, __webpack_require__) {

        "use strict";


        Object.defineProperty(exports, "__esModule", {
            value: true
        });

        var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

        var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

        function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

        function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

        function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

        var _class = function (_yjzanModules$edi) {
            _inherits(_class, _yjzanModules$edi);

            function _class() {
                var _ref;

                _classCallCheck(this, _class);

                for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
                    args[_key] = arguments[_key];
                }

                var _this = _possibleConstructorReturn(this, (_ref = _class.__proto__ || Object.getPrototypeOf(_class)).call.apply(_ref, [this].concat(args)));

                _this.template = _.noop;

                _this.activeTab = 'content';

                _this.listenTo(_this.model, 'change', _this.onModelChange);
                return _this;
            }

            _createClass(_class, [{
                key: 'getNamespaceArray',
                value: function getNamespaceArray() {
                    return ['popup', 'display-settings'];
                }
            }, {
                key: 'className',
                value: function className() {
                    return _get(_class.prototype.__proto__ || Object.getPrototypeOf(_class.prototype), 'className', this).call(this) + ' yjzan-popup__display-settings';
                }
            }, {
                key: 'toggleGroup',
                value: function toggleGroup(groupName, $groupElement) {
                    $groupElement.toggleClass('yjzan-active', !!this.model.get(groupName));
                }
            }, {
                key: 'onRenderTemplate',
                value: function onRenderTemplate() {
                    this.activateFirstSection();
                }
            }, {
                key: 'onRender',
                value: function onRender() {
                    var _this2 = this;

                    var name = this.getOption('name');

                    var $groupWrapper = void 0;

                    this.children.each(function (child) {
                        var type = child.model.get('type');

                        if ('heading' !== type) {
                            if ($groupWrapper) {
                                $groupWrapper.append(child.$el);
                            }

                            return;
                        }

                        var groupName = child.model.get('name').replace('_heading', '');

                        $groupWrapper = jQuery('<div>', {
                            id: 'yjzan-popup__' + name + '-controls-group--' + groupName,
                            class: 'yjzan-popup__display-settings_controls_group'
                        });

                        var $imageWrapper = jQuery('<div>', { class: 'yjzan-popup__display-settings_controls_group__icon' }),
                            $image = jQuery('<img>', { src: yjzanPro.config.urls.modules + ('popup/assets/images/' + name + '/' + groupName + '.svg') });

                        $imageWrapper.html($image);

                        $groupWrapper.html($imageWrapper);

                        child.$el.before($groupWrapper);

                        $groupWrapper.append(child.$el);

                        _this2.toggleGroup(groupName, $groupWrapper);
                    });
                }
            }, {
                key: 'onModelChange',
                value: function onModelChange() {
                    var changedControlName = Object.keys(this.model.changed)[0],
                        changedControlView = this.getControlViewByName(changedControlName);

                    if ('switcher' !== changedControlView.model.get('type')) {
                        return;
                    }

                    this.toggleGroup(changedControlName, changedControlView.$el.parent());
                }
            }]);

            return _class;
        }(yjzanModules.editor.views.ControlsStack);

        exports.default = _class;

        /***/ }),
    /* 14 */
    /***/ (function(module, exports, __webpack_require__) {

        "use strict";


        module.exports = yjzanModules.editor.utils.Module.extend({
            onYjzanPreviewLoaded: function onYjzanPreviewLoaded() {
                yjzan.addControlView('Query', __webpack_require__(15));
            }
        });

        /***/ }),
    /* 15 */
    /***/ (function(module, exports, __webpack_require__) {

        "use strict";


        module.exports = yjzan.modules.controls.Select2.extend({

            cache: null,

            isTitlesReceived: false,

            getSelect2Placeholder: function getSelect2Placeholder() {
                return {
                    id: '',
                    text: yjzanPro.translate('all')
                };
            },

            getSelect2DefaultOptions: function getSelect2DefaultOptions() {
                var self = this;

                return jQuery.extend(yjzan.modules.controls.Select2.prototype.getSelect2DefaultOptions.apply(this, arguments), {
                    ajax: {
                        transport: function transport(params, success, failure) {
                            var data = {
                                q: params.data.q,
                                filter_type: self.model.get('filter_type'),
                                object_type: self.model.get('object_type'),
                                include_type: self.model.get('include_type'),
                                query: self.model.get('query')
                            };

                            return yjzanPro.ajax.addRequest('panel_posts_control_filter_autocomplete', {
                                data: data,
                                success: success,
                                error: failure
                            });
                        },
                        data: function data(params) {
                            return {
                                q: params.term,
                                page: params.page
                            };
                        },
                        cache: true
                    },
                    escapeMarkup: function escapeMarkup(markup) {
                        return markup;
                    },
                    minimumInputLength: 1
                });
            },

            getValueTitles: function getValueTitles() {
                var self = this,
                    ids = this.getControlValue(),
                    filterType = this.model.get('filter_type');

                if (!ids || !filterType) {
                    return;
                }

                if (!_.isArray(ids)) {
                    ids = [ids];
                }

                yjzanCommon.ajax.loadObjects({
                    action: 'query_control_value_titles',
                    ids: ids,
                    data: {
                        filter_type: filterType,
                        object_type: self.model.get('object_type'),
                        include_type: self.model.get('include_type'),
                        unique_id: '' + self.cid + filterType
                    },
                    before: function before() {
                        self.addControlSpinner();
                    },
                    success: function success(data) {
                        self.isTitlesReceived = true;

                        self.model.set('options', data);

                        self.render();
                    }
                });
            },

            addControlSpinner: function addControlSpinner() {
                this.ui.select.prop('disabled', true);
                this.$el.find('.yjzan-control-title').after('<span class="yjzan-control-spinner">&nbsp;<i class="fa fa-spinner fa-spin"></i>&nbsp;</span>');
            },

            onReady: function onReady() {
                // Safari takes it's time to get the original select width
                setTimeout(yjzan.modules.controls.Select2.prototype.onReady.bind(this));

                if (!this.isTitlesReceived) {
                    this.getValueTitles();
                }
            }
        });

        /***/ }),
    /* 16 */
    /***/ (function(module, exports, __webpack_require__) {

        "use strict";


        module.exports = yjzanModules.editor.utils.Module.extend({
            onYjzanInit: function onYjzanInit() {
                var ReplyToField = __webpack_require__(17),
                    Recaptcha = __webpack_require__(18),
                    Shortcode = __webpack_require__(19),
                    MailerLite = __webpack_require__(20),
                    Mailchimp = __webpack_require__(21),
                    Drip = __webpack_require__(22),
                    ActiveCampaign = __webpack_require__(23),
                    GetResponse = __webpack_require__(24),
                    ConvertKit = __webpack_require__(25);

                this.replyToField = new ReplyToField();
                this.mailchimp = new Mailchimp('form');
                this.shortcode = new Shortcode('form');
                this.recaptcha = new Recaptcha('form');
                this.drip = new Drip('form');
                this.activecampaign = new ActiveCampaign('form');
                this.getresponse = new GetResponse('form');
                this.convertkit = new ConvertKit('form');
                this.mailerlite = new MailerLite('form');

                // Form fields
                var TimeField = __webpack_require__(26),
                    DateField = __webpack_require__(27),
                    AcceptanceField = __webpack_require__(28),
                    UploadField = __webpack_require__(29),
                    TelField = __webpack_require__(30);

                this.Fields = {
                    time: new TimeField('form'),
                    date: new DateField('form'),
                    tel: new TelField('form'),
                    acceptance: new AcceptanceField('form'),
                    upload: new UploadField('form')
                };

                yjzan.addControlView('Fields_map', __webpack_require__(31));
            }
        });

        /***/ }),
    /* 17 */
    /***/ (function(module, exports, __webpack_require__) {

        "use strict";


        module.exports = function () {
            var editor, editedModel, replyToControl;

            var setReplyToControl = function setReplyToControl() {
                replyToControl = editor.collection.findWhere({ name: 'email_reply_to' });
            };

            var getReplyToView = function getReplyToView() {
                return editor.children.findByModelCid(replyToControl.cid);
            };

            var refreshReplyToElement = function refreshReplyToElement() {
                var replyToView = getReplyToView();

                if (replyToView) {
                    replyToView.render();
                }
            };

            var updateReplyToOptions = function updateReplyToOptions() {
                var settingsModel = editedModel.get('settings'),
                    emailModels = settingsModel.get('form_fields').where({ field_type: 'email' }),
                    emailFields;

                emailModels = _.reject(emailModels, { field_label: '' });

                emailFields = _.map(emailModels, function (model) {
                    return {
                        id: model.get('custom_id'),
                        label: yjzanPro.translate('x_field', [model.get('field_label')])
                    };
                });

                replyToControl.set('options', { '': replyToControl.get('options')[''] });

                _.each(emailFields, function (emailField) {
                    replyToControl.get('options')[emailField.id] = emailField.label;
                });

                refreshReplyToElement();
            };

            var updateDefaultReplyTo = function updateDefaultReplyTo(settingsModel) {
                replyToControl.get('options')[''] = settingsModel.get('email_from');

                refreshReplyToElement();
            };

            var onFormFieldsChange = function onFormFieldsChange(changedModel) {
                // If it's repeater field
                if (changedModel.get('custom_id')) {
                    if ('email' === changedModel.get('field_type')) {
                        updateReplyToOptions();
                    }
                }

                if (changedModel.changed.email_from) {
                    updateDefaultReplyTo(changedModel);
                }
            };

            var onPanelShow = function onPanelShow(panel, model) {
                editor = panel.getCurrentPageView();

                editedModel = model;

                setReplyToControl();

                var settingsModel = editedModel.get('settings');

                settingsModel.on('change', onFormFieldsChange);

                updateDefaultReplyTo(settingsModel);

                updateReplyToOptions();
            };

            var init = function init() {
                yjzan.hooks.addAction('panel/open_editor/widget/form', onPanelShow);
            };

            init();
        };

        /***/ }),
    /* 18 */
    /***/ (function(module, exports, __webpack_require__) {

        "use strict";


        module.exports = yjzanModules.editor.utils.Module.extend({

            renderField: function renderField(inputField, item) {
                    inputField +='<div class="yjz-form-recaptcha-wrap">';
                    inputField +='<input type="text" maxlength="4" class="yjz-recaptcha-text" required="required" name ="form_fields[recaptcha]" placeholder="请输入验证码">';
                    inputField +=' <img src="/yjz_check_code.php" class="yjz-recaptcha-img" onclick="javascript:this.src=this.src">';
                    inputField +='</div>';
                console.log(inputField);
                return inputField;
            },

            filterItem: function filterItem(item) {
                if ('recaptcha' === item.field_type) {
                    item.field_label = false;
                }

                return item;
            },

            onInit: function onInit() {
                yjzan.hooks.addFilter('yjzan_pro/forms/content_template/item', this.filterItem);
                yjzan.hooks.addFilter('yjzan_pro/forms/content_template/field/recaptcha', this.renderField, 10, 2);
            }
        });

        /***/ }),
    /* 19 */
    /***/ (function(module, exports, __webpack_require__) {

        "use strict";


        var ElementEditorModule = __webpack_require__(4);

        module.exports = ElementEditorModule.extend({
            lastRemovedModelId: false,
            collectionEventsAttached: false,

            formFieldEvents: {
                ADD: 'add',
                SORT: 'sort',
                DUPLICATE: 'duplicate',
                CHANGE: 'change'
            },

            getExistId: function getExistId(id) {
                var exist = this.getEditorControlView('form_fields').collection.filter(function (model) {
                    return id === model.get('custom_id');
                });

                return exist.length > 1;
            },
            getFormFieldsView: function getFormFieldsView() {
                return this.getEditorControlView('form_fields');
            },
            onFieldUpdate: function onFieldUpdate(collection, update) {
                if (!update.add) {
                    return;
                }
                var event = this.formFieldEvents.ADD;
                var addedModel = update.changes.added[0];
                if (update.at) {
                    if (this.lastRemovedModelId && addedModel.attributes.custom_id === this.lastRemovedModelId) {
                        event = this.formFieldEvents.SORT;
                    } else {
                        event = this.formFieldEvents.DUPLICATE;
                    }
                    this.lastRemovedModelId = false;
                }
                this.updateIdAndShortcode(addedModel, event);
            },
            onFieldChanged: function onFieldChanged(model) {
                if (!_.isUndefined(model.changed.custom_id)) {
                    this.updateIdAndShortcode(model, this.formFieldEvents.CHANGE);
                }
            },
            onFieldRemoved: function onFieldRemoved(model) {
                this.lastRemovedModelId = model.attributes.custom_id;
                this.getFormFieldsView().children.each(this.updateShortcode);
            },
            updateIdAndShortcode: function updateIdAndShortcode(model, event) {
                var _this = this;

                var view = this.getFormFieldsView().children.findByModel(model);

                _.defer(function () {
                    _this.updateId(view, event);
                    _this.updateShortcode(view);
                });
            },
            getFieldId: function getFieldId(model, event) {
                if (event === this.formFieldEvents.ADD || event === this.formFieldEvents.DUPLICATE) {
                    return model.get('_id');
                }
                var customId = model.get('custom_id');
                return customId ? customId : model.get('_id');
            },
            updateId: function updateId(view, event) {
                var id = this.getFieldId(view.model, event),
                    sanitizedId = id.replace(/[^\w]/, '_'),
                    fieldIndex = 1,
                    isNew = event === this.formFieldEvents.ADD || event === this.formFieldEvents.DUPLICATE;
                var IdView = view.children.filter(function (childrenView) {
                    return 'custom_id' === childrenView.model.get('name');
                });

                while (sanitizedId !== id || this.getExistId(id) || isNew) {
                    if (sanitizedId !== id) {
                        id = sanitizedId;
                    } else if (isNew || this.getExistId(id)) {
                        id = 'field_' + fieldIndex;
                        sanitizedId = id;
                    }

                    view.model.attributes.custom_id = id;
                    IdView[0].render();
                    IdView[0].$el.find('input').focus();
                    fieldIndex++;
                    isNew = false;
                }
            },
            updateShortcode: function updateShortcode(view) {
                var template = _.template('[field id="<%= id %>"]')({
                    title: view.model.get('field_label'),
                    id: view.model.get('custom_id')
                });

                view.$el.find('.yjzan-form-field-shortcode').focus(function () {
                    this.select();
                }).val(template);
            },
            onSectionActive: function onSectionActive() {
                var controlView = this.getEditorControlView('form_fields');

                controlView.children.each(this.updateShortcode);

                if (!controlView.collection.shortcodeEventsAttached) {
                    controlView.collection.on('change', this.onFieldChanged).on('update', this.onFieldUpdate).on('remove', this.onFieldRemoved);
                    controlView.collection.shortcodeEventsAttached = true;
                }
            },
            onInit: function onInit() {
                this.addSectionListener('section_form_fields', this.onSectionActive);
            }
        });

        /***/ }),
    /* 20 */
    /***/ (function(module, exports, __webpack_require__) {

        "use strict";


        var BaseIntegrationModule = __webpack_require__(1);

        module.exports = BaseIntegrationModule.extend({
            fields: {},

            getName: function getName() {
                return 'mailerlite';
            },

            onElementChange: function onElementChange(setting) {
                switch (setting) {
                    case 'mailerlite_api_key_source':
                    case 'mailerlite_custom_api_key':
                        this.onMailerliteApiKeyUpdate();
                        break;
                    case 'mailerlite_group':
                        this.updateFieldsMapping();
                        break;
                }
            },

            onMailerliteApiKeyUpdate: function onMailerliteApiKeyUpdate() {
                var self = this,
                    controlView = self.getEditorControlView('mailerlite_custom_api_key'),
                    GlobalApiKeycontrolView = self.getEditorControlView('mailerlite_api_key_source');

                if ('default' !== GlobalApiKeycontrolView.getControlValue() && '' === controlView.getControlValue()) {
                    self.updateOptions('mailerlite_group', []);
                    self.getEditorControlView('mailerlite_group').setValue('');
                    return;
                }

                self.addControlSpinner('mailerlite_group');

                self.getMailerliteCache('groups', 'groups', GlobalApiKeycontrolView.getControlValue()).done(function (data) {
                    self.updateOptions('mailerlite_group', data.groups);
                    self.fields = data.fields;
                });
            },

            updateFieldsMapping: function updateFieldsMapping() {
                var controlView = this.getEditorControlView('mailerlite_group');

                if (!controlView.getControlValue()) {
                    return;
                }

                var remoteFields = [{
                    remote_label: yjzan.translate('Email'),
                    remote_type: 'email',
                    remote_id: 'email',
                    remote_required: true
                }, {
                    remote_label: yjzan.translate('Name'),
                    remote_type: 'text',
                    remote_id: 'name',
                    remote_required: false
                }, {
                    remote_label: yjzan.translate('Last Name'),
                    remote_type: 'text',
                    remote_id: 'last_name',
                    remote_required: false
                }, {
                    remote_label: yjzan.translate('Company'),
                    remote_type: 'text',
                    remote_id: 'company',
                    remote_required: false
                }, {
                    remote_label: yjzan.translate('Phone'),
                    remote_type: 'text',
                    remote_id: 'phone',
                    remote_required: false
                }, {
                    remote_label: yjzan.translate('Country'),
                    remote_type: 'text',
                    remote_id: 'country',
                    remote_required: false
                }, {
                    remote_label: yjzan.translate('State'),
                    remote_type: 'text',
                    remote_id: 'state',
                    remote_required: false
                }, {
                    remote_label: yjzan.translate('City'),
                    remote_type: 'text',
                    remote_id: 'city',
                    remote_required: false
                }, {
                    remote_label: yjzan.translate('Zip'),
                    remote_type: 'text',
                    remote_id: 'zip',
                    remote_required: false
                }];

                for (var field in this.fields) {
                    if (this.fields.hasOwnProperty(field)) {
                        remoteFields.push(this.fields[field]);
                    }
                }

                this.getEditorControlView('mailerlite_fields_map').updateMap(remoteFields);
            },

            getMailerliteCache: function getMailerliteCache(type, action, cacheKey, requestArgs) {
                if (_.has(this.cache[type], cacheKey)) {
                    var data = {};
                    data[type] = this.cache[type][cacheKey];
                    return jQuery.Deferred().resolve(data);
                }

                requestArgs = _.extend({}, requestArgs, {
                    service: 'mailerlite',
                    mailerlite_action: action,
                    custom_api_key: this.getEditorControlView('mailerlite_custom_api_key').getControlValue(),
                    api_key: this.getEditorControlView('mailerlite_api_key_source').getControlValue()
                });

                return this.fetchCache(type, cacheKey, requestArgs);
            },

            onSectionActive: function onSectionActive() {
                BaseIntegrationModule.prototype.onSectionActive.apply(this, arguments);

                this.onMailerliteApiKeyUpdate();
            }

        });

        /***/ }),
    /* 21 */
    /***/ (function(module, exports, __webpack_require__) {

        "use strict";


        var BaseIntegrationModule = __webpack_require__(1);

        module.exports = BaseIntegrationModule.extend({
            getName: function getName() {
                return 'mailchimp';
            },

            onElementChange: function onElementChange(setting) {
                switch (setting) {
                    case 'mailchimp_api_key_source':
                    case 'mailchimp_api_key':
                        this.onApiUpdate();
                        break;
                    case 'mailchimp_list':
                        this.onMailchimpListUpdate();
                        break;
                }
            },

            onApiUpdate: function onApiUpdate() {
                var self = this,
                    controlView = self.getEditorControlView('mailchimp_api_key'),
                    GlobalApiKeycontrolView = self.getEditorControlView('mailchimp_api_key_source');

                if ('default' !== GlobalApiKeycontrolView.getControlValue() && '' === controlView.getControlValue()) {
                    self.updateOptions('mailchimp_list', []);
                    self.getEditorControlView('mailchimp_list').setValue('');
                    return;
                }

                self.addControlSpinner('mailchimp_list');

                self.getMailchimpCache('lists', 'lists', GlobalApiKeycontrolView.getControlValue()).done(function (data) {
                    self.updateOptions('mailchimp_list', data.lists);
                    self.updatMailchimpList();
                });
            },

            onMailchimpListUpdate: function onMailchimpListUpdate() {
                this.updateOptions('mailchimp_groups', []);
                this.getEditorControlView('mailchimp_groups').setValue('');
                this.updatMailchimpList();
            },

            updatMailchimpList: function updatMailchimpList() {
                var self = this,
                    controlView = self.getEditorControlView('mailchimp_list');

                if (!controlView.getControlValue()) {
                    return;
                }

                self.addControlSpinner('mailchimp_groups');

                self.getMailchimpCache('list_details', 'list_details', controlView.getControlValue(), {
                    mailchimp_list: controlView.getControlValue()
                }).done(function (data) {
                    self.updateOptions('mailchimp_groups', data.list_details.groups);
                    self.getEditorControlView('mailchimp_fields_map').updateMap(data.list_details.fields);
                });
            },

            getMailchimpCache: function getMailchimpCache(type, action, cacheKey, requestArgs) {
                if (_.has(this.cache[type], cacheKey)) {
                    var data = {};
                    data[type] = this.cache[type][cacheKey];
                    return jQuery.Deferred().resolve(data);
                }

                requestArgs = _.extend({}, requestArgs, {
                    service: 'mailchimp',
                    mailchimp_action: action,
                    api_key: this.getEditorControlView('mailchimp_api_key').getControlValue(),
                    use_global_api_key: this.getEditorControlView('mailchimp_api_key_source').getControlValue()
                });

                return this.fetchCache(type, cacheKey, requestArgs);
            },

            onSectionActive: function onSectionActive() {
                BaseIntegrationModule.prototype.onSectionActive.apply(this, arguments);

                this.onApiUpdate();
            }
        });

        /***/ }),
    /* 22 */
    /***/ (function(module, exports, __webpack_require__) {

        "use strict";


        var BaseIntegrationModule = __webpack_require__(1);

        module.exports = BaseIntegrationModule.extend({
            getName: function getName() {
                return 'drip';
            },

            onElementChange: function onElementChange(setting) {
                switch (setting) {
                    case 'drip_api_token_source':
                    case 'drip_custom_api_token':
                        this.onApiUpdate();
                        break;
                    case 'drip_account':
                        this.onDripAccountsUpdate();
                        break;
                }
            },

            onApiUpdate: function onApiUpdate() {
                var self = this,
                    controlView = self.getEditorControlView('drip_api_token_source'),
                    customControlView = self.getEditorControlView('drip_custom_api_token');

                if ('default' !== controlView.getControlValue() && '' === customControlView.getControlValue()) {
                    self.updateOptions('drip_account', []);
                    self.getEditorControlView('drip_account').setValue('');
                    return;
                }

                self.addControlSpinner('drip_account');

                self.getDripCache('accounts', 'accounts', controlView.getControlValue()).done(function (data) {
                    self.updateOptions('drip_account', data.accounts);
                });
            },

            onDripAccountsUpdate: function onDripAccountsUpdate() {
                this.updateFieldsMapping();
            },

            updateFieldsMapping: function updateFieldsMapping() {
                var controlView = this.getEditorControlView('drip_account');

                if (!controlView.getControlValue()) {
                    return;
                }

                var remoteFields = {
                    remote_label: yjzan.translate('Email'),
                    remote_type: 'email',
                    remote_id: 'email',
                    remote_required: true
                };

                this.getEditorControlView('drip_fields_map').updateMap([remoteFields]);
            },

            getDripCache: function getDripCache(type, action, cacheKey, requestArgs) {
                if (_.has(this.cache[type], cacheKey)) {
                    var data = {};
                    data[type] = this.cache[type][cacheKey];
                    return jQuery.Deferred().resolve(data);
                }

                requestArgs = _.extend({}, requestArgs, {
                    service: 'drip',
                    drip_action: action,
                    api_token: this.getEditorControlView('drip_api_token_source').getControlValue(),
                    custom_api_token: this.getEditorControlView('drip_custom_api_token').getControlValue()
                });

                return this.fetchCache(type, cacheKey, requestArgs);
            }
        });

        /***/ }),
    /* 23 */
    /***/ (function(module, exports, __webpack_require__) {

        "use strict";


        var BaseIntegrationModule = __webpack_require__(1);

        module.exports = BaseIntegrationModule.extend({
            fields: {},

            getName: function getName() {
                return 'activecampaign';
            },

            onElementChange: function onElementChange(setting) {
                switch (setting) {
                    case 'activecampaign_api_credentials_source':
                    case 'activecampaign_api_key':
                    case 'activecampaign_api_url':
                        this.onApiUpdate();
                        break;
                    case 'activecampaign_list':
                        this.onListUpdate();
                        break;
                }
            },

            onApiUpdate: function onApiUpdate() {
                var self = this,
                    apikeyControlView = self.getEditorControlView('activecampaign_api_key'),
                    apiUrlControlView = self.getEditorControlView('activecampaign_api_url'),
                    apiCredControlView = self.getEditorControlView('activecampaign_api_credentials_source');

                if ('default' !== apiCredControlView.getControlValue() && ('' === apikeyControlView.getControlValue() || '' === apiUrlControlView.getControlValue())) {
                    self.updateOptions('activecampaign_list', []);
                    self.getEditorControlView('activecampaign_list').setValue('');
                    return;
                }

                self.addControlSpinner('activecampaign_list');

                self.getActiveCampaignCache('lists', 'activecampaign_list', apiCredControlView.getControlValue()).done(function (data) {
                    self.updateOptions('activecampaign_list', data.lists);
                    self.fields = data.fields;
                });
            },

            onListUpdate: function onListUpdate() {
                this.updateFieldsMapping();
            },

            updateFieldsMapping: function updateFieldsMapping() {
                var controlView = this.getEditorControlView('activecampaign_list');

                if (!controlView.getControlValue()) {
                    return;
                }

                var remoteFields = [{
                    remote_label: yjzan.translate('Email'),
                    remote_type: 'email',
                    remote_id: 'email',
                    remote_required: true
                }, {
                    remote_label: yjzan.translate('First Name'),
                    remote_type: 'text',
                    remote_id: 'first_name',
                    remote_required: false
                }, {
                    remote_label: yjzan.translate('Last Name'),
                    remote_type: 'text',
                    remote_id: 'last_name',
                    remote_required: false
                }, {
                    remote_label: yjzan.translate('Phone'),
                    remote_type: 'text',
                    remote_id: 'phone',
                    remote_required: false
                }, {
                    remote_label: yjzan.translate('Organization name'),
                    remote_type: 'text',
                    remote_id: 'orgname',
                    remote_required: false
                }];

                for (var field in this.fields) {
                    if (this.fields.hasOwnProperty(field)) {
                        remoteFields.push(this.fields[field]);
                    }
                }

                this.getEditorControlView('activecampaign_fields_map').updateMap(remoteFields);
            },

            getActiveCampaignCache: function getActiveCampaignCache(type, action, cacheKey, requestArgs) {
                if (_.has(this.cache[type], cacheKey)) {
                    var data = {};
                    data[type] = this.cache[type][cacheKey];
                    return jQuery.Deferred().resolve(data);
                }

                requestArgs = _.extend({}, requestArgs, {
                    service: 'activecampaign',
                    activecampaign_action: action,
                    api_key: this.getEditorControlView('activecampaign_api_key').getControlValue(),
                    api_url: this.getEditorControlView('activecampaign_api_url').getControlValue(),
                    api_cred: this.getEditorControlView('activecampaign_api_credentials_source').getControlValue()
                });

                return this.fetchCache(type, cacheKey, requestArgs);
            }
        });

        /***/ }),
    /* 24 */
    /***/ (function(module, exports, __webpack_require__) {

        "use strict";


        var BaseIntegrationModule = __webpack_require__(1);

        module.exports = BaseIntegrationModule.extend({
            getName: function getName() {
                return 'getresponse';
            },

            onElementChange: function onElementChange(setting) {
                switch (setting) {
                    case 'getresponse_custom_api_key':
                    case 'getresponse_api_key_source':
                        this.onApiUpdate();
                        break;
                    case 'getresponse_list':
                        this.onGetResonseListUpdate();
                        break;
                }
            },

            onApiUpdate: function onApiUpdate() {
                var self = this,
                    controlView = self.getEditorControlView('getresponse_api_key_source'),
                    customControlView = self.getEditorControlView('getresponse_custom_api_key');

                if ('default' !== controlView.getControlValue() && '' === customControlView.getControlValue()) {
                    self.updateOptions('getresponse_list', []);
                    self.getEditorControlView('getresponse_list').setValue('');
                    return;
                }

                self.addControlSpinner('getresponse_list');

                self.getCache('lists', 'lists', controlView.getControlValue()).done(function (data) {
                    self.updateOptions('getresponse_list', data.lists);
                });
            },

            onGetResonseListUpdate: function onGetResonseListUpdate() {
                this.updatGetResonseList();
            },

            updatGetResonseList: function updatGetResonseList() {
                var self = this,
                    controlView = self.getEditorControlView('getresponse_list');

                if (!controlView.getControlValue()) {
                    return;
                }

                self.addControlSpinner('getresponse_fields_map');

                self.getCache('fields', 'get_fields', controlView.getControlValue(), {
                    getresponse_list: controlView.getControlValue()
                }).done(function (data) {
                    self.getEditorControlView('getresponse_fields_map').updateMap(data.fields);
                });
            },

            getCache: function getCache(type, action, cacheKey, requestArgs) {
                if (_.has(this.cache[type], cacheKey)) {
                    var data = {};
                    data[type] = this.cache[type][cacheKey];
                    return jQuery.Deferred().resolve(data);
                }

                requestArgs = _.extend({}, requestArgs, {
                    service: 'getresponse',
                    getresponse_action: action,
                    api_key: this.getEditorControlView('getresponse_api_key_source').getControlValue(),
                    custom_api_key: this.getEditorControlView('getresponse_custom_api_key').getControlValue()
                });

                return this.fetchCache(type, cacheKey, requestArgs);
            },

            onSectionActive: function onSectionActive() {
                BaseIntegrationModule.prototype.onSectionActive.apply(this, arguments);

                this.updatGetResonseList();
            }
        });

        /***/ }),
    /* 25 */
    /***/ (function(module, exports, __webpack_require__) {

        "use strict";


        var BaseIntegrationModule = __webpack_require__(1);

        module.exports = BaseIntegrationModule.extend({

            getName: function getName() {
                return 'convertkit';
            },

            onElementChange: function onElementChange(setting) {
                switch (setting) {
                    case 'convertkit_api_key_source':
                    case 'convertkit_custom_api_key':
                        this.onApiUpdate();
                        break;
                    case 'convertkit_form':
                        this.onListUpdate();
                        break;
                }
            },

            onApiUpdate: function onApiUpdate() {
                var self = this,
                    apiKeyControlView = self.getEditorControlView('convertkit_api_key_source'),
                    customApikeyControlView = self.getEditorControlView('convertkit_custom_api_key');

                if ('default' !== apiKeyControlView.getControlValue() && '' === customApikeyControlView.getControlValue()) {
                    self.updateOptions('convertkit_form', []);
                    self.getEditorControlView('convertkit_form').setValue('');
                    return;
                }

                self.addControlSpinner('convertkit_form');

                self.getConvertKitCache('data', 'convertkit_get_forms', apiKeyControlView.getControlValue()).done(function (data) {
                    self.updateOptions('convertkit_form', data.data.forms);
                    self.updateOptions('convertkit_tags', data.data.tags);
                });
            },

            onListUpdate: function onListUpdate() {
                this.updateFieldsMapping();
            },

            updateFieldsMapping: function updateFieldsMapping() {
                var controlView = this.getEditorControlView('convertkit_form');

                if (!controlView.getControlValue()) {
                    return;
                }

                var remoteFields = [{
                    remote_label: yjzan.translate('Email'),
                    remote_type: 'email',
                    remote_id: 'email',
                    remote_required: true
                }, {
                    remote_label: yjzan.translate('First Name'),
                    remote_type: 'text',
                    remote_id: 'first_name',
                    remote_required: false
                }];

                this.getEditorControlView('convertkit_fields_map').updateMap(remoteFields);
            },

            getConvertKitCache: function getConvertKitCache(type, action, cacheKey, requestArgs) {
                if (_.has(this.cache[type], cacheKey)) {
                    var data = {};
                    data[type] = this.cache[type][cacheKey];
                    return jQuery.Deferred().resolve(data);
                }

                requestArgs = _.extend({}, requestArgs, {
                    service: 'convertkit',
                    convertkit_action: action,
                    api_key: this.getEditorControlView('convertkit_api_key_source').getControlValue(),
                    custom_api_key: this.getEditorControlView('convertkit_custom_api_key').getControlValue()
                });

                return this.fetchCache(type, cacheKey, requestArgs);
            }
        });

        /***/ }),
    /* 26 */
    /***/ (function(module, exports, __webpack_require__) {

        "use strict";


        module.exports = yjzanModules.editor.utils.Module.extend({

            renderField: function renderField(inputField, item, i, settings) {
                var itemClasses = _.escape(item.css_classes),
                    required = '',
                    placeholder = '';

                if (item.required) {
                    required = 'required';
                }

                if (item.placeholder) {
                    placeholder = ' placeholder="' + item.placeholder + '"';
                }

                if ('yes' === item.use_native_time) {
                    itemClasses += ' yjzan-use-native';
                }

                return '<input size="1" type="time"' + placeholder + ' class="yjzan-field-textual yjzan-time-field yjzan-field yjzan-size-' + settings.input_size + ' ' + itemClasses + '" name="form_field_' + i + '" id="form_field_' + i + '" ' + required + ' >';
            },

            onInit: function onInit() {
                yjzan.hooks.addFilter('yjzan_pro/forms/content_template/field/time', this.renderField, 10, 4);
            }
        });

        /***/ }),
    /* 27 */
    /***/ (function(module, exports, __webpack_require__) {

        "use strict";


        module.exports = yjzanModules.editor.utils.Module.extend({

            renderField: function renderField(inputField, item, i, settings) {
                var itemClasses = _.escape(item.css_classes),
                    required = '',
                    min = '',
                    max = '',
                    placeholder = '';

                if (item.required) {
                    required = 'required';
                }

                if (item.min_date) {
                    min = ' min="' + item.min_date + '"';
                }

                if (item.max_date) {
                    max = ' max="' + item.max_date + '"';
                }

                if (item.placeholder) {
                    placeholder = ' placeholder="' + item.placeholder + '"';
                }

                if ('yes' === item.use_native_date) {
                    itemClasses += ' yjzan-use-native';
                }

                return '<input size="1"' + min + max + placeholder + ' pattern="[0-9]{4}-[0-9]{2}-[0-9]{2}" type="date" class="yjzan-field-textual yjzan-date-field yjzan-field yjzan-size-' + settings.input_size + ' ' + itemClasses + '" name="form_field_' + i + '" id="form_field_' + i + '" ' + required + ' >';
            },

            onInit: function onInit() {
                yjzan.hooks.addFilter('yjzan_pro/forms/content_template/field/date', this.renderField, 10, 4);
            }
        });

        /***/ }),
    /* 28 */
    /***/ (function(module, exports, __webpack_require__) {

        "use strict";


        module.exports = yjzanModules.editor.utils.Module.extend({

            renderField: function renderField(inputField, item, i, settings) {
                var itemClasses = _.escape(item.css_classes),
                    required = '',
                    label = '',
                    checked = '';

                if (item.required) {
                    required = 'required';
                }

                if (item.acceptance_text) {
                    label = '<label for="form_field_' + i + '">' + item.acceptance_text + '</label>';
                }

                if (item.checked_by_default) {
                    checked = ' checked="checked"';
                }

                return '<div class="yjzan-field-subgroup">' + '<span class="yjzan-field-option">' + '<input size="1" type="checkbox"' + checked + ' class="yjzan-acceptance-field yjzan-field yjzan-size-' + settings.input_size + ' ' + itemClasses + '" name="form_field_' + i + '" id="form_field_' + i + '" ' + required + ' > ' + label + '</span></div>';
            },

            onInit: function onInit() {
                yjzan.hooks.addFilter('yjzan_pro/forms/content_template/field/acceptance', this.renderField, 10, 4);
            }
        });

        /***/ }),
    /* 29 */
    /***/ (function(module, exports, __webpack_require__) {

        "use strict";


        module.exports = yjzanModules.editor.utils.Module.extend({

            renderField: function renderField(inputField, item, i, settings) {
                var itemClasses = _.escape(item.css_classes),
                    required = '',
                    multiple = '',
                    fieldName = 'form_field_';

                if (item.required) {
                    required = 'required';
                }
                if (item.allow_multiple_upload) {
                    multiple = ' multiple="multiple"';
                    fieldName += '[]';
                }

                return '<input size="1"  type="file" class="yjzan-file-field yjzan-field yjzan-size-' + settings.input_size + ' ' + itemClasses + '" name="' + fieldName + '" id="form_field_' + i + '" ' + required + multiple + ' >';
            },

            onInit: function onInit() {
                yjzan.hooks.addFilter('yjzan_pro/forms/content_template/field/upload', this.renderField, 10, 4);
            }
        });

        /***/ }),
    /* 30 */
    /***/ (function(module, exports, __webpack_require__) {

        "use strict";


        module.exports = yjzanModules.editor.utils.Module.extend({

            renderField: function renderField(inputField, item, i, settings) {
                var itemClasses = _.escape(item.css_classes),
                    required = '',
                    placeholder = '';

                if (item.required) {
                    required = 'required';
                }

                if (item.placeholder) {
                    placeholder = ' placeholder="' + item.placeholder + '"';
                }

                itemClasses = 'yjzan-field-textual ' + itemClasses;

                return '<input size="1" type="' + item.field_type + '" class="yjzan-field-textual yjzan-field yjzan-size-' + settings.input_size + ' ' + itemClasses + '" name="form_field_' + i + '" id="form_field_' + i + '" ' + required + ' ' + placeholder + ' pattern="[0-9()-]" >';
            },

            onInit: function onInit() {
                yjzan.hooks.addFilter('yjzan_pro/forms/content_template/field/tel', this.renderField, 10, 4);
            }
        });

        /***/ }),
    /* 31 */
    /***/ (function(module, exports, __webpack_require__) {

        "use strict";


        module.exports = yjzan.modules.controls.Repeater.extend({
            onBeforeRender: function onBeforeRender() {
                this.$el.hide();
            },

            updateMap: function updateMap(fields) {
                var self = this,
                    savedMapObject = {};

                self.collection.each(function (model) {
                    savedMapObject[model.get('remote_id')] = model.get('local_id');
                });

                self.collection.reset();

                _.each(fields, function (field) {
                    var model = {
                        remote_id: field.remote_id,
                        remote_label: field.remote_label,
                        remote_type: field.remote_type ? field.remote_type : '',
                        remote_required: field.remote_required ? field.remote_required : false,
                        local_id: savedMapObject[field.remote_id] ? savedMapObject[field.remote_id] : ''
                    };

                    self.collection.add(model);
                });

                self.render();
            },

            onRender: function onRender() {
                yjzan.modules.controls.Base.prototype.onRender.apply(this, arguments);

                var self = this;

                self.children.each(function (view) {
                    var localFieldsControl = view.children.last(),
                        options = {
                            '': '- ' + yjzan.translate('None') + ' -'
                        },
                        label = view.model.get('remote_label');

                    if (view.model.get('remote_required')) {
                        label += '<span class="yjzan-required">*</span>';
                    }

                    _.each(self.elementSettingsModel.get('form_fields').models, function (model, index) {
                        // If it's an email field, add only email fields from thr form
                        var remoteType = view.model.get('remote_type');

                        if ('text' !== remoteType && remoteType !== model.get('field_type')) {
                            return;
                        }

                        options[model.get('custom_id')] = model.get('field_label') || 'Field #' + (index + 1);
                    });

                    localFieldsControl.model.set('label', label);
                    localFieldsControl.model.set('options', options);
                    localFieldsControl.render();

                    view.$el.find('.yjzan-repeater-row-tools').hide();
                    view.$el.find('.yjzan-repeater-row-controls').removeClass('yjzan-repeater-row-controls').find('.yjzan-control').css({
                        paddingBottom: 0
                    });
                });

                self.$el.find('.yjzan-button-wrapper').remove();

                if (self.children.length) {
                    self.$el.show();
                }
            }
        });

        /***/ }),
    /* 32 */
    /***/ (function(module, exports, __webpack_require__) {

        "use strict";


        module.exports = yjzanModules.editor.utils.Module.extend({
            onYjzanPreviewLoaded: function onYjzanPreviewLoaded() {
                var EditButton = __webpack_require__(33);
                this.editButton = new EditButton();
            }
        });

        /***/ }),
    /* 33 */
    /***/ (function(module, exports, __webpack_require__) {

        "use strict";


        module.exports = function () {
            var self = this;

            self.onPanelShow = function (panel) {
                var model = panel.content.currentView.collection.findWhere({ name: 'template_id' });
                self.templateIdView = panel.content.currentView.children.findByModelCid(model.cid);

                // Change Edit link on render & on change template.
                self.templateIdView.elementSettingsModel.on('change', self.onTemplateIdChange);
                self.templateIdView.on('render', self.onTemplateIdChange);
            };

            self.onTemplateIdChange = function () {
                var templateID = self.templateIdView.elementSettingsModel.get('template_id'),
                    $editButton = self.templateIdView.$el.find('.yjzan-edit-template');

                if (!templateID) {
                    $editButton.remove();
                    return;
                }

                var editUrl = YjzanConfig.home_url + '?p=' + templateID + '&yjzan';

                if ($editButton.length) {
                    $editButton.prop('href', editUrl);
                } else {
                    $editButton = jQuery('<a />', {
                        target: '_blank',
                        class: 'yjzan-button yjzan-button-default yjzan-edit-template',
                        href: editUrl,
                        html: '<i class="fa fa-pencil" /> ' + YjzanProConfig.i18n.edit_template
                    });

                    self.templateIdView.$el.find('.yjzan-control-input-wrapper').after($editButton);
                }
            };

            self.init = function () {
                yjzan.hooks.addAction('panel/open_editor/widget/template', self.onPanelShow);
            };

            self.init();
        };

        /***/ }),
    /* 34 */
    /***/ (function(module, exports, __webpack_require__) {

        "use strict";


        module.exports = yjzanModules.editor.utils.Module.extend({
            onYjzanInit: function onYjzanInit() {
                var CustomCss = __webpack_require__(35);
                this.customCss = new CustomCss();
            }
        });

        /***/ }),
    /* 35 */
    /***/ (function(module, exports, __webpack_require__) {

        "use strict";


        module.exports = function () {
            var self = this;

            self.init = function () {
                yjzan.hooks.addFilter('editor/style/styleText', self.addCustomCss);

                yjzan.settings.page.model.on('change', self.addPageCustomCss);

                yjzan.on('preview:loaded', self.addPageCustomCss);
            };

            self.addPageCustomCss = function () {
                var customCSS = yjzan.settings.page.model.get('custom_css');

                if (customCSS) {
                    customCSS = customCSS.replace(/selector/g, yjzan.config.settings.page.cssWrapperSelector);

                    yjzan.settings.page.getControlsCSS().elements.$stylesheetElement.append(customCSS);
                }
            };

            self.addCustomCss = function (css, view) {
                var model = view.getEditModel(),
                    customCSS = model.get('settings').get('custom_css');

                if (customCSS) {
                    css += customCSS.replace(/selector/g, '.yjzan-element.yjzan-element-' + view.model.id);
                }

                return css;
            };

            self.init();
        };

        /***/ }),
    /* 36 */
    /***/ (function(module, exports, __webpack_require__) {

        "use strict";


        module.exports = yjzanModules.editor.utils.Module.extend({
            globalModels: {},

            panelWidgets: null,

            templatesAreSaved: true,

            addGlobalWidget: function addGlobalWidget(id, args) {
                args = _.extend({}, args, {
                    categories: [],
                    icon: yjzan.config.widgets[args.widgetType].icon,
                    widgetType: args.widgetType,
                    custom: {
                        templateID: id
                    }
                });

                var globalModel = this.createGlobalModel(id, args);

                return this.panelWidgets.add(globalModel);
            },

            createGlobalModel: function createGlobalModel(id, modelArgs) {
                var globalModel = new yjzan.modules.elements.models.Element(modelArgs),
                    settingsModel = globalModel.get('settings');

                globalModel.set('id', id);

                settingsModel.on('change', _.bind(this.onGlobalModelChange, this));

                return this.globalModels[id] = globalModel;
            },

            onGlobalModelChange: function onGlobalModelChange() {
                this.templatesAreSaved = false;
            },

            setWidgetType: function setWidgetType() {
                yjzan.hooks.addFilter('element/view', function (DefaultView, model) {
                    if (model.get('templateID')) {
                        return __webpack_require__(37);
                    }

                    return DefaultView;
                });

                yjzan.hooks.addFilter('element/model', function (DefaultModel, attrs) {
                    if (attrs.templateID) {
                        return __webpack_require__(38);
                    }

                    return DefaultModel;
                });
            },

            registerTemplateType: function registerTemplateType() {
                yjzan.templates.registerTemplateType('widget', {
                    showInLibrary: false,
                    saveDialog: {
                        title: yjzanPro.translate('global_widget_save_title'),
                        description: yjzanPro.translate('global_widget_save_description')
                    },
                    prepareSavedData: function prepareSavedData(data) {
                        data.widgetType = data.content[0].widgetType;

                        return data;
                    },
                    ajaxParams: {
                        success: this.onWidgetTemplateSaved.bind(this)
                    }
                });
            },

            addSavedWidgetsToPanel: function addSavedWidgetsToPanel() {
                var self = this;

                self.panelWidgets = new Backbone.Collection();

                _.each(yjzanPro.config.widget_templates, function (templateArgs, id) {
                    self.addGlobalWidget(id, templateArgs);
                });

                yjzan.hooks.addFilter('panel/elements/regionViews', function (regionViews) {
                    _.extend(regionViews.global, {
                        view: __webpack_require__(39),
                        options: {
                            collection: self.panelWidgets
                        }
                    });

                    return regionViews;
                });
            },

            addPanelPage: function addPanelPage() {
                yjzan.getPanelView().addPage('globalWidget', {
                    view: __webpack_require__(41)
                });
            },

            getGlobalModels: function getGlobalModels(id) {
                if (!id) {
                    return this.globalModels;
                }

                return this.globalModels[id];
            },

            saveTemplates: function saveTemplates() {
                if (!Object.keys(this.globalModels).length) {
                    return;
                }

                var templatesData = [],
                    self = this;

                _.each(this.globalModels, function (templateModel, id) {
                    if ('loaded' !== templateModel.get('settingsLoadedStatus')) {
                        return;
                    }

                    var data = {
                        content: JSON.stringify([templateModel.toJSON({ removeDefault: true })]),
                        source: 'local',
                        type: 'widget',
                        id: id
                    };

                    templatesData.push(data);
                });

                if (!templatesData.length) {
                    return;
                }

                yjzanCommon.ajax.addRequest('update_templates', {
                    data: {
                        templates: templatesData
                    },
                    success: function success() {
                        self.templatesAreSaved = true;
                    }
                });
            },

            setSaveButton: function setSaveButton() {
                yjzan.saver.on('before:save:publish', _.bind(this.saveTemplates, this));
                yjzan.saver.on('before:save:private', _.bind(this.saveTemplates, this));
            },

            requestGlobalModelSettings: function requestGlobalModelSettings(globalModel, callback) {
                yjzan.templates.requestTemplateContent('local', globalModel.get('id'), {
                    success: function success(data) {
                        globalModel.set('settingsLoadedStatus', 'loaded').trigger('settings:loaded');

                        var settings = data.content[0].settings,
                            settingsModel = globalModel.get('settings');

                        // Don't track it in History
                        yjzan.history.history.setActive(false);

                        settingsModel.handleRepeaterData(settings);

                        settingsModel.set(settings);

                        if (callback) {
                            callback(globalModel);
                        }

                        yjzan.history.history.setActive(true);
                    }
                });
            },

            // setWidgetContextMenuSaveAction: function setWidgetContextMenuSaveAction() {
            //     yjzan.hooks.addFilter('elements/widget/contextMenuGroups', function (groups, widget) {
            //         var saveGroup = _.findWhere(groups, { name: 'save' }),
            //             saveAction = _.findWhere(saveGroup.actions, { name: 'save' });
            //
            //         saveAction.callback = widget.save.bind(widget);
            //
            //         delete saveAction.shortcut;
            //
            //         return groups;
            //     });
            // },

            onYjzanInit: function onYjzanInit() {
                this.setWidgetType();

                this.registerTemplateType();
                //by jack 隐藏全局变量
                //this.setWidgetContextMenuSaveAction();
            },

            onYjzanFrontendInit: function onYjzanFrontendInit() {
                this.addSavedWidgetsToPanel();
            },

            onYjzanPreviewLoaded: function onYjzanPreviewLoaded() {
                this.addPanelPage();
                this.setSaveButton();
            },

            onWidgetTemplateSaved: function onWidgetTemplateSaved(data) {
                yjzan.history.history.startItem({
                    title: yjzan.config.widgets[data.widgetType].title,
                    type: yjzanPro.translate('linked_to_global')
                });

                var widgetModel = yjzan.templates.getLayout().modalContent.currentView.model,
                    widgetModelIndex = widgetModel.collection.indexOf(widgetModel);

                yjzan.templates.closeModal();

                data.elType = data.type;
                data.settings = widgetModel.get('settings').attributes;

                var globalModel = this.addGlobalWidget(data.template_id, data),
                    globalModelAttributes = globalModel.attributes;

                widgetModel.collection.add({
                    id: yjzan.helpers.getUniqueID(),
                    elType: globalModelAttributes.type,
                    templateID: globalModelAttributes.template_id,
                    widgetType: 'global'
                }, { at: widgetModelIndex }, true);

                widgetModel.destroy();

                var panel = yjzan.getPanelView();

                panel.setPage('elements');

                panel.getCurrentPageView().activateTab('global');

                yjzan.history.history.endItem();
            }
        });

        /***/ }),
    /* 37 */
    /***/ (function(module, exports, __webpack_require__) {

        "use strict";


        var WidgetView = yjzan.modules.elements.views.Widget,
            GlobalWidgetView;

        GlobalWidgetView = WidgetView.extend({

            globalModel: null,

            className: function className() {
                return WidgetView.prototype.className.apply(this, arguments) + ' yjzan-global-widget yjzan-global-' + this.model.get('templateID');
            },

            initialize: function initialize() {
                var self = this,
                    previewSettings = self.model.get('previewSettings'),
                    globalModel = self.getGlobalModel();

                if (previewSettings) {
                    globalModel.set('settingsLoadedStatus', 'loaded').trigger('settings:loaded');

                    var settingsModel = globalModel.get('settings');

                    settingsModel.handleRepeaterData(previewSettings);

                    settingsModel.set(previewSettings, { silent: true });
                } else {
                    var globalSettingsLoadedStatus = globalModel.get('settingsLoadedStatus');

                    if (!globalSettingsLoadedStatus) {
                        globalModel.set('settingsLoadedStatus', 'pending');

                        yjzanPro.modules.globalWidget.requestGlobalModelSettings(globalModel);
                    }

                    if ('loaded' !== globalSettingsLoadedStatus) {
                        self.$el.addClass('yjzan-loading');
                    }

                    globalModel.on('settings:loaded', function () {
                        self.$el.removeClass('yjzan-loading');

                        self.render();
                    });
                }

                WidgetView.prototype.initialize.apply(self, arguments);
            },

            getGlobalModel: function getGlobalModel() {
                if (!this.globalModel) {
                    this.globalModel = yjzanPro.modules.globalWidget.getGlobalModels(this.model.get('templateID'));
                }

                return this.globalModel;
            },

            getEditModel: function getEditModel() {
                return this.getGlobalModel();
            },

            getHTMLContent: function getHTMLContent(html) {
                if ('loaded' === this.getGlobalModel().get('settingsLoadedStatus')) {
                    return WidgetView.prototype.getHTMLContent.call(this, html);
                }

                return '';
            },

            serializeModel: function serializeModel() {
                var globalModel = this.getGlobalModel();

                return globalModel.toJSON.apply(globalModel, _.rest(arguments));
            },

            edit: function edit() {
                yjzan.getPanelView().setPage('globalWidget', 'Global Editing', { editedView: this });
            },

            unlink: function unlink() {
                var globalModel = this.getGlobalModel();

                yjzan.history.history.startItem({
                    title: globalModel.getTitle(),
                    type: yjzanPro.translate('unlink_widget')
                });

                var newModel = new yjzan.modules.elements.models.Element({
                    elType: 'widget',
                    widgetType: globalModel.get('widgetType'),
                    id: yjzan.helpers.getUniqueID(),
                    settings: yjzan.helpers.cloneObject(globalModel.get('settings').attributes),
                    defaultEditSettings: yjzan.helpers.cloneObject(globalModel.get('editSettings').attributes)
                });

                this._parent.addChildModel(newModel, { at: this.model.collection.indexOf(this.model) });

                var newWidget = this._parent.children.findByModelCid(newModel.cid);

                this.model.destroy();

                yjzan.history.history.endItem();

                if (newWidget.edit) {
                    newWidget.edit();
                }

                newModel.trigger('request:edit');
            },

            onEditRequest: function onEditRequest() {
                yjzan.getPanelView().setPage('globalWidget', 'Global Editing', { editedView: this });
            }
        });

        module.exports = GlobalWidgetView;

        /***/ }),
    /* 38 */
    /***/ (function(module, exports, __webpack_require__) {

        "use strict";


        module.exports = yjzan.modules.elements.models.Element.extend({
            initialize: function initialize() {
                this.set({ widgetType: 'global' }, { silent: true });

                yjzan.modules.elements.models.Element.prototype.initialize.apply(this, arguments);

                yjzanFrontend.config.elements.data[this.cid].on('change', this.onSettingsChange.bind(this));
            },

            initSettings: function initSettings() {
                var globalModel = this.getGlobalModel(),
                    settingsModel = globalModel.get('settings');

                this.set('settings', settingsModel);

                yjzanFrontend.config.elements.data[this.cid] = settingsModel;

                yjzanFrontend.config.elements.editSettings[this.cid] = globalModel.get('editSettings');
            },

            initEditSettings: function initEditSettings() {},

            getGlobalModel: function getGlobalModel() {
                var templateID = this.get('templateID');

                return yjzanPro.modules.globalWidget.getGlobalModels(templateID);
            },

            getTitle: function getTitle() {
                var title = this.getSetting('_title');

                if (!title) {
                    title = this.getGlobalModel().get('title');
                }

                var global = yjzanPro.translate('global');

                title = title.replace(new RegExp('\\(' + global + '\\)$'), '');

                return title + ' (' + global + ')';
            },

            getIcon: function getIcon() {
                return this.getGlobalModel().getIcon();
            },

            onSettingsChange: function onSettingsChange(model) {
                if (!model.changed.elements) {
                    this.set('previewSettings', model.toJSON({ removeDefault: true }), { silent: true });
                }
            },

            onDestroy: function onDestroy() {
                var panel = yjzan.getPanelView(),
                    currentPageName = panel.getCurrentPageName();

                if (-1 !== ['editor', 'globalWidget'].indexOf(currentPageName)) {
                    panel.setPage('elements');
                }
            }
        });

        /***/ }),
    /* 39 */
    /***/ (function(module, exports, __webpack_require__) {

        "use strict";


        module.exports = yjzan.modules.layouts.panel.pages.elements.views.Elements.extend({
            id: 'yjzan-global-templates',

            getEmptyView: function getEmptyView() {
                if (this.collection.length) {
                    return null;
                }

                return __webpack_require__(40);
            },

            onFilterEmpty: function onFilterEmpty() {}
        });

        /***/ }),
    /* 40 */
    /***/ (function(module, exports, __webpack_require__) {

        "use strict";


        var GlobalWidgetsView = yjzan.modules.layouts.panel.pages.elements.views.Global;

        module.exports = GlobalWidgetsView.extend({
            template: '#tmpl-yjzan-panel-global-widget-no-templates',

            id: 'yjzan-panel-global-widget-no-templates',

            className: 'yjzan-nerd-box yjzan-panel-nerd-box'
        });

        /***/ }),
    /* 41 */
    /***/ (function(module, exports, __webpack_require__) {

        "use strict";


        module.exports = Marionette.ItemView.extend({
            id: 'yjzan-panel-global-widget',

            template: '#tmpl-yjzan-panel-global-widget',

            ui: {
                editButton: '#yjzan-global-widget-locked-edit .yjzan-button',
                unlinkButton: '#yjzan-global-widget-locked-unlink .yjzan-button',
                loading: '#yjzan-global-widget-loading'
            },

            events: {
                'click @ui.editButton': 'onEditButtonClick',
                'click @ui.unlinkButton': 'onUnlinkButtonClick'
            },

            initialize: function initialize() {
                this.initUnlinkDialog();
            },

            buildUnlinkDialog: function buildUnlinkDialog() {
                var self = this;

                return yjzanCommon.dialogsManager.createWidget('confirm', {
                    id: 'yjzan-global-widget-unlink-dialog',
                    headerMessage: yjzanPro.translate('unlink_widget'),
                    message: yjzanPro.translate('dialog_confirm_unlink'),
                    position: {
                        my: 'center center',
                        at: 'center center'
                    },
                    strings: {
                        confirm: yjzanPro.translate('unlink'),
                        cancel: yjzanPro.translate('cancel')
                    },
                    onConfirm: function onConfirm() {
                        self.getOption('editedView').unlink();
                    }
                });
            },

            initUnlinkDialog: function initUnlinkDialog() {
                var dialog;

                this.getUnlinkDialog = function () {
                    if (!dialog) {
                        dialog = this.buildUnlinkDialog();
                    }

                    return dialog;
                };
            },

            editGlobalModel: function editGlobalModel() {
                var editedView = this.getOption('editedView');

                yjzan.getPanelView().openEditor(editedView.getEditModel(), editedView);
            },

            onEditButtonClick: function onEditButtonClick() {
                var self = this,
                    editedView = self.getOption('editedView'),
                    editedModel = editedView.getEditModel();

                if ('loaded' === editedModel.get('settingsLoadedStatus')) {
                    self.editGlobalModel();

                    return;
                }

                self.ui.loading.removeClass('yjzan-hidden');

                yjzanPro.modules.globalWidget.requestGlobalModelSettings(editedModel, function () {
                    self.ui.loading.addClass('yjzan-hidden');

                    self.editGlobalModel();
                });
            },

            onUnlinkButtonClick: function onUnlinkButtonClick() {
                this.getUnlinkDialog().show();
            }
        });

        /***/ }),
    /* 42 */
    /***/ (function(module, exports, __webpack_require__) {

        "use strict";


        module.exports = yjzanModules.editor.utils.Module.extend({
            onYjzanInit: function onYjzanInit() {
                yjzan.channels.editor.on('section:activated', this.onSectionActivated);
            },

            onSectionActivated: function onSectionActivated(sectionName, editor) {
                var editedElement = editor.getOption('editedElementView');

                if ('flip-box' !== editedElement.model.get('widgetType')) {
                    return;
                }

                var isSideBSection = -1 !== ['section_side_b_content', 'section_style_b'].indexOf(sectionName);

                editedElement.$el.toggleClass('yjzan-flip-box--flipped', isSideBSection);

                var $backLayer = editedElement.$el.find('.yjzan-flip-box__back');

                if (isSideBSection) {
                    $backLayer.css('transition', 'none');
                }

                if (!isSideBSection) {
                    setTimeout(function () {
                        $backLayer.css('transition', '');
                    }, 10);
                }
            }
        });

        /***/ }),
    /* 43 */
    /***/ (function(module, exports, __webpack_require__) {

        "use strict";


        module.exports = yjzanModules.editor.utils.Module.extend({
            config: yjzanPro.config.shareButtonsNetworks,

            networksClassDictionary: {
                google: 'fa fa-google-plus',
                pocket: 'fa fa-get-pocket',
                email: 'fa fa-envelope'
            },

            getNetworkClass: function getNetworkClass(networkName) {
                return this.networksClassDictionary[networkName] || 'fa fa-' + networkName;
            },

            getNetworkTitle: function getNetworkTitle(buttonSettings) {
                return buttonSettings.text || this.config[buttonSettings.button].title;
            },

            hasCounter: function hasCounter(networkName, settings) {
                return 'icon' !== settings.view && 'yes' === settings.show_counter && this.config[networkName].has_counter;
            }
        });

        /***/ }),
    /* 40 */
    /***/ (function(module, exports, __webpack_require__) {

        "use strict";


        module.exports = yjzanModules.editor.utils.Module.extend({
            onYjzanInit: function onYjzanInit() {
                var FontsManager = __webpack_require__(45);

                this.assets = {
                    font: new FontsManager()
                };
            }
        });

        /***/ }),
    /* 45 */
    /***/ (function(module, exports, __webpack_require__) {

        "use strict";


        module.exports = yjzanModules.Module.extend({

            _enqueuedFonts: [],
            _enqueuedTypekit: false,

            onFontChange: function onFontChange(fontType, font) {
                if ('custom' !== fontType && 'typekit' !== fontType) {
                    return;
                }

                if (-1 !== this._enqueuedFonts.indexOf(font)) {
                    return;
                }

                if ('typekit' === fontType && this._enqueuedTypekit) {
                    return;
                }

                this.getCustomFont(fontType, font);
            },

            getCustomFont: function getCustomFont(fontType, font) {
                yjzanPro.ajax.addRequest('assets_manager_panel_action_data', {
                    data: {
                        service: 'font',
                        type: fontType,
                        font: font
                    },
                    success: function success(data) {
                        if (data.font_face) {
                            yjzan.$previewContents.find('style:last').after('<style type="text/css">' + data.font_face + '</style>');
                        }

                        if (data.font_url) {
                            yjzan.$previewContents.find('link:last').after('<link href="' + data.font_url + '" rel="stylesheet" type="text/css">');
                        }
                    }
                });

                this._enqueuedFonts.push(font);

                if ('typekit' === fontType) {
                    this._enqueuedTypekit = true;
                }
            },

            onInit: function onInit() {
                yjzan.channels.editor.on('font:insertion', this.onFontChange.bind(this));
            }
        });

        /***/ }),
    /* 46 */
    /***/ (function(module, exports, __webpack_require__) {

        "use strict";


        module.exports = yjzanModules.editor.utils.Module.extend({
            onYjzanPreviewLoaded: function onYjzanPreviewLoaded() {
                var CommentsSkin = __webpack_require__(47);
                this.commentsSkin = new CommentsSkin();
            }
        });

        /***/ }),
    /* 47 */
    /***/ (function(module, exports, __webpack_require__) {

        "use strict";


        module.exports = function () {
            var self = this;

            self.onPanelShow = function (panel, model) {
                var settingsModel = model.get('settings');

                // If no skins - set the skin to `theme_comments`.
                if (!settingsModel.controls._skin.default) {
                    settingsModel.set('_skin', 'theme_comments');
                }
            };

            self.init = function () {
                yjzan.hooks.addAction('panel/open_editor/widget/post-comments', self.onPanelShow);
            };

            self.init();
        };

        /***/ }),
    /* 48 */
    /***/ (function(module, exports, __webpack_require__) {

        "use strict";


        var _layout = __webpack_require__(49);

        var _layout2 = _interopRequireDefault(_layout);

        var _view = __webpack_require__(51);

        var _view2 = _interopRequireDefault(_view);

        function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

        module.exports = yjzanModules.editor.utils.Module.extend({

            onYjzanInit: function onYjzanInit() {
                if (!yjzanPro.config.theme_builder) {
                    return;
                }

                yjzan.channels.editor.on('page_settings:preview_settings:activated', this.onSectionPreviewSettingsActive);

                yjzan.addControlView('Conditions_repeater', __webpack_require__(53));

                yjzan.hooks.addFilter('panel/footer/behaviors', this.addFooterBehavior);

                yjzan.saver.on('save', this.onEditorSave);

                this.initPublishLayout();
            },

            addFooterBehavior: function addFooterBehavior(behaviors) {
                behaviors.saver = {
                    behaviorClass: __webpack_require__(55)
                };

                return behaviors;
            },

            saveAndReload: function saveAndReload() {
                yjzan.saver.saveAutoSave({
                    onSuccess: function onSuccess() {
                        yjzan.dynamicTags.cleanCache();
                        yjzan.reloadPreview();
                    }
                });
            },

            onApplyPreview: function onApplyPreview() {
                this.saveAndReload();
            },

            onSectionPreviewSettingsActive: function onSectionPreviewSettingsActive() {
                this.updatePreviewIdOptions(true);
            },

            onPageSettingsChange: function onPageSettingsChange(model) {
                if (model.changed.preview_type) {
                    model.set({
                        preview_id: '',
                        preview_search_term: ''
                    });

                    if ('page_settings' === yjzan.getPanelView().getCurrentPageName()) {
                        this.updatePreviewIdOptions(true);
                    }
                }

                if (!_.isUndefined(model.changed.page_template)) {
                    yjzan.saver.saveAutoSave({
                        onSuccess: function onSuccess() {
                            yjzan.reloadPreview();

                            yjzan.once('preview:loaded', function () {
                                yjzan.getPanelView().setPage('page_settings');
                            });
                        }
                    });
                }
            },

            updatePreviewIdOptions: function updatePreviewIdOptions(render) {
                var previewType = yjzan.settings.page.model.get('preview_type');
                if (!previewType) {
                    return;
                }
                previewType = previewType.split('/');

                var currentView = yjzan.getPanelView().getCurrentPageView(),
                    controlModel = currentView.collection.findWhere({
                        name: 'preview_id'
                    });

                if ('author' === previewType[1]) {
                    controlModel.set({
                        filter_type: 'author',
                        object_type: 'author'
                    });
                } else if ('taxonomy' === previewType[0]) {
                    controlModel.set({
                        filter_type: 'taxonomy',
                        object_type: previewType[1]
                    });
                } else if ('single' === previewType[0]) {
                    controlModel.set({
                        filter_type: 'post',
                        object_type: previewType[1]
                    });
                } else {
                    controlModel.set({
                        filter_type: '',
                        object_type: ''
                    });
                }

                if (true === render) {
                    // Can be model.
                    var controlView = currentView.children.findByModel(controlModel);

                    controlView.render();

                    controlView.$el.toggle(!!controlModel.get('filter_type'));
                }
            },

            onYjzanPreviewLoaded: function onYjzanPreviewLoaded() {
                if (!yjzanPro.config.theme_builder) {
                    return;
                }

                yjzan.getPanelView().on('set:page:page_settings', this.updatePreviewIdOptions);

                yjzan.settings.page.model.on('change', this.onPageSettingsChange.bind(this));

                yjzan.channels.editor.on('yjzanThemeBuilder:ApplyPreview', this.onApplyPreview.bind(this));

                // Scroll to Editor. Timeout according to preview resize css animation duration.
                setTimeout(function () {
                    yjzan.$previewContents.find('html, body').animate({
                        scrollTop: yjzan.$previewContents.find('#yjzan').offset().top - yjzan.$preview[0].contentWindow.innerHeight / 2
                    });
                }, 500);
            },

            showPublishModal: function showPublishModal() {
                this.getPublishLayout().showModal();
            },

            initPublishLayout: function initPublishLayout() {
                var _this = this;

                var publishLayout = void 0;

                this.getPublishLayout = function () {
                    if (!publishLayout) {
                        publishLayout = new _layout2.default();

                        _this.trigger('publish-layout:init', publishLayout);
                    }

                    return publishLayout;
                };

                this.on('publish-layout:init', this.addConditionsScreen);
            },

            addConditionsScreen: function addConditionsScreen(publishLayout) {
                var themeBuilderModuleConfig = yjzanPro.config.theme_builder,
                    settings = themeBuilderModuleConfig.settings;

                this.conditionsModel = new yjzanModules.editor.elements.models.BaseSettings(settings, {
                    controls: themeBuilderModuleConfig.template_conditions.controls
                });

                publishLayout.addScreen({
                    View: _view2.default,
                    viewOptions: {
                        model: this.conditionsModel,
                        controls: this.conditionsModel.controls
                    },
                    name: 'conditions',
                    title: yjzanPro.translate('conditions'),
                    description: yjzanPro.translate('conditions_publish_screen_description'),
                    image: yjzanPro.config.urls.modules + 'theme-builder/assets/images/conditions-tab.svg'
                });
            },

            onEditorSave: function onEditorSave() {
                var _this2 = this;

                if (!this.conditionsModel) {
                    return;
                }

                yjzanPro.ajax.addRequest('theme_builder_save_conditions', {
                    data: this.conditionsModel.toJSON({ removeDefault: true }),
                    success: function success() {
                        yjzanPro.config.theme_builder.settings.conditions = _this2.conditionsModel.get('conditions');
                    }
                });
            }
        });

        /***/ }),
    /* 49 */
    /***/ (function(module, exports, __webpack_require__) {

        "use strict";


        Object.defineProperty(exports, "__esModule", {
            value: true
        });

        var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

        var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

        var _content = __webpack_require__(50);

        var _content2 = _interopRequireDefault(_content);

        function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

        function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

        function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

        function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

        var _class = function (_yjzanModules$com) {
            _inherits(_class, _yjzanModules$com);

            function _class() {
                _classCallCheck(this, _class);

                return _possibleConstructorReturn(this, (_class.__proto__ || Object.getPrototypeOf(_class)).apply(this, arguments));
            }

            _createClass(_class, [{
                key: 'initialize',
                value: function initialize() {
                    var _get2;

                    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
                        args[_key] = arguments[_key];
                    }

                    (_get2 = _get(_class.prototype.__proto__ || Object.getPrototypeOf(_class.prototype), 'initialize', this)).call.apply(_get2, [this].concat(args));

                    this.screens = [];
                }
            }, {
                key: 'getModalOptions',
                value: function getModalOptions() {
                    return {
                        id: 'yjzan-publish__modal',
                        hide: {
                            onButtonClick: false
                        }
                    };
                }
            }, {
                key: 'getLogoOptions',
                value: function getLogoOptions() {
                    return {
                        title: yjzanPro.translate('publish_settings')
                    };
                }
            }, {
                key: 'initModal',
                value: function initModal() {
                    var _this2 = this;

                    _get(_class.prototype.__proto__ || Object.getPrototypeOf(_class.prototype), 'initModal', this).call(this);

                    this.modal.addButton({
                        name: 'publish',
                        text: yjzanPro.translate('save_and_close'),
                        callback: function callback() {
                            return _this2.onPublishButtonClick();
                        }
                    });

                    this.modal.addButton({
                        name: 'next',
                        text: yjzanPro.translate('next'),
                        callback: function callback() {
                            return _this2.onNextButtonClick();
                        }
                    });

                    var $publishButton = this.modal.getElements('publish');

                    this.modal.getElements('next').addClass('yjzan-button-success').add($publishButton).addClass('yjzan-button').removeClass('dialog-button');
                }
            }, {
                key: 'addScreen',
                value: function addScreen(screenData, at) {
                    var index = undefined !== at ? at : this.screens.length;

                    this.screens.splice(index, 0, screenData);
                }
            }, {
                key: 'showModal',
                value: function showModal() {
                    if (!this.layoutInitialized) {
                        this.showLogo();

                        this.showContentView();

                        this.layoutInitialized = true;
                    }

                    _get(_class.prototype.__proto__ || Object.getPrototypeOf(_class.prototype), 'showModal', this).call(this);
                }
            }, {
                key: 'showContentView',
                value: function showContentView() {
                    var _this3 = this;

                    var contentView = new _content2.default({ screens: this.screens });

                    contentView.on('screen:change', function (screen) {
                        return _this3.onContentViewScreenChange(screen);
                    });

                    this.modalContent.show(contentView);
                }
            }, {
                key: 'onNextButtonClick',
                value: function onNextButtonClick() {
                    var currentScreenIndex = this.screens.indexOf(this.modalContent.currentView.currentScreen);

                    this.modalContent.currentView.showScreenByIndex(currentScreenIndex + 1);
                }
            }, {
                key: 'onPublishButtonClick',
                value: function onPublishButtonClick() {
                    yjzan.saver.defaultSave();

                    this.hideModal();
                }
            }, {
                key: 'onContentViewScreenChange',
                value: function onContentViewScreenChange(screen) {
                    var isLastScreen = this.screens.indexOf(screen) === this.screens.length - 1;

                    this.modal.getElements('next').toggle(!isLastScreen);

                    this.modal.getElements('publish').toggleClass('yjzan-button-success', isLastScreen);
                }
            }]);

            return _class;
        }(yjzanModules.common.views.modal.Layout);

        exports.default = _class;

        /***/ }),
    /* 50 */
    /***/ (function(module, exports, __webpack_require__) {

        "use strict";


        Object.defineProperty(exports, "__esModule", {
            value: true
        });

        var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

        function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

        function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

        function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

        var _class = function (_Marionette$LayoutVie) {
            _inherits(_class, _Marionette$LayoutVie);

            function _class() {
                _classCallCheck(this, _class);

                return _possibleConstructorReturn(this, (_class.__proto__ || Object.getPrototypeOf(_class)).apply(this, arguments));
            }

            _createClass(_class, [{
                key: 'id',
                value: function id() {
                    return 'yjzan-publish';
                }
            }, {
                key: 'getTemplate',
                value: function getTemplate() {
                    return Marionette.TemplateCache.get('#tmpl-yjzan-publish');
                }
            }, {
                key: 'ui',
                value: function ui() {
                    return {
                        tabs: '.yjzan-publish__tab'
                    };
                }
            }, {
                key: 'events',
                value: function events() {
                    return {
                        'click @ui.tabs': 'onTabClick'
                    };
                }
            }, {
                key: 'regions',
                value: function regions() {
                    return {
                        screen: '#yjzan-publish__screen'
                    };
                }
            }, {
                key: 'templateHelpers',
                value: function templateHelpers() {
                    return {
                        screens: this.screens
                    };
                }
            }, {
                key: 'initialize',
                value: function initialize() {
                    this.screens = this.getOption('screens');
                }
            }, {
                key: 'showScreenByName',
                value: function showScreenByName(screenName) {
                    var screen = _.findWhere(this.screens, { name: screenName });

                    this.showScreen(screen);
                }
            }, {
                key: 'showScreenByIndex',
                value: function showScreenByIndex(index) {
                    this.showScreen(this.screens[index]);
                }
            }, {
                key: 'showScreen',
                value: function showScreen(screen) {
                    this.screen.show(new screen.View(screen.viewOptions));

                    if (this.ui.tabs.length) {
                        if (this.$currentTab) {
                            this.$currentTab.removeClass('yjzan-active');
                        }

                        this.$currentTab = this.ui.tabs.filter('[data-screen="' + screen.name + '"]');

                        this.$currentTab.addClass('yjzan-active');
                    }

                    this.currentScreen = screen;

                    this.trigger('screen:change', screen);
                }
            }, {
                key: 'onRender',
                value: function onRender() {
                    this.showScreenByIndex(0);
                }
            }, {
                key: 'onTabClick',
                value: function onTabClick(event) {
                    this.showScreenByName(event.currentTarget.dataset.screen);
                }
            }]);

            return _class;
        }(Marionette.LayoutView);

        exports.default = _class;

        /***/ }),
    /* 51 */
    /***/ (function(module, exports, __webpack_require__) {

        "use strict";


        var inlineControlsStack = __webpack_require__(52);

        module.exports = inlineControlsStack.extend({
            id: 'yjzan-theme-builder-conditions-view',

            template: '#tmpl-yjzan-theme-builder-conditions-view',

            childViewContainer: '#yjzan-theme-builder-conditions-controls',

            childViewOptions: function childViewOptions() {
                return {
                    elementSettingsModel: this.model
                };
            }
        });

        /***/ }),
    /* 52 */
    /***/ (function(module, exports, __webpack_require__) {

        "use strict";


        module.exports = yjzanModules.editor.views.ControlsStack.extend({
            activeTab: 'content',

            activeSection: 'settings',

            initialize: function initialize() {
                this.collection = new Backbone.Collection(_.values(this.options.controls));
            },

            filter: function filter(model) {
                if ('section' === model.get('type')) {
                    return true;
                }

                var section = model.get('section');

                return !section || section === this.activeSection;
            },

            childViewOptions: function childViewOptions() {
                return {
                    elementSettingsModel: this.model
                };
            }
        });

        /***/ }),
    /* 53 */
    /***/ (function(module, exports, __webpack_require__) {

        "use strict";


        var _repeaterRow = __webpack_require__(54);

        var _repeaterRow2 = _interopRequireDefault(_repeaterRow);

        function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

        module.exports = yjzan.modules.controls.Repeater.extend({

            childView: _repeaterRow2.default,

            updateActiveRow: function updateActiveRow() {},

            initialize: function initialize() {
                yjzan.modules.controls.Repeater.prototype.initialize.apply(this, arguments);

                this.config = yjzanPro.config.theme_builder;

                this.updateConditionsOptions(this.config.settings.template_type);
            },

            checkConflicts: function checkConflicts(model) {
                var modelId = model.get('_id'),
                    rowId = 'yjzan-condition-id-' + modelId,
                    errorMessageId = 'yjzan-conditions-conflict-message-' + modelId,
                    $error = jQuery('#' + errorMessageId);

                // On render - the row isn't exist, so don't cache it.
                jQuery('#' + rowId).removeClass('yjzan-error');

                $error.remove();

                yjzanPro.ajax.addRequest('theme_builder_conditions_check_conflicts', {
                    unique_id: rowId,
                    data: {
                        condition: model.toJSON({ removeDefaults: true })
                    },
                    success: function success(data) {
                        if (!_.isEmpty(data)) {
                            jQuery('#' + rowId).addClass('yjzan-error').after('<div id="' + errorMessageId + '" class="yjzan-conditions-conflict-message">' + data + '</div>');
                        }
                    }
                });
            },

            updateConditionsOptions: function updateConditionsOptions(templateType) {
                var self = this,
                    conditionType = self.config.types[templateType].condition_type,
                    options = {};

                _([conditionType]).each(function (conditionId, conditionIndex) {
                    var conditionConfig = self.config.conditions[conditionId],
                        group = {
                            label: conditionConfig.label,
                            options: {}
                        };

                    group.options[conditionId] = conditionConfig.all_label;

                    _(conditionConfig.sub_conditions).each(function (subConditionId) {
                        group.options[subConditionId] = self.config.conditions[subConditionId].label;
                    });

                    options[conditionIndex] = group;
                });

                var fields = this.model.get('fields');

                fields[1].default = conditionType;

                if ('general' === conditionType) {
                    fields[1].groups = options;
                } else {
                    fields[2].groups = options;
                }
            },

            onRender: function onRender() {
                this.ui.btnAddRow.text(yjzanPro.translate('add_condition'));

                var self = this;

                this.collection.each(function (model) {
                    self.checkConflicts(model);
                });
            },

            // Overwrite thr original + checkConflicts.
            onRowControlChange: function onRowControlChange(model) {
                this.checkConflicts(model);
            }
        });

        /***/ }),
    /* 46 */
    /***/ (function(module, exports, __webpack_require__) {

        "use strict";


        module.exports = yjzan.modules.controls.RepeaterRow.extend({

            template: '#tmpl-yjzan-theme-builder-conditions-repeater-row',

            childViewContainer: '.yjzan-theme-builder-conditions-repeater-row-controls',

            id: function id() {
                return 'yjzan-condition-id-' + this.model.get('_id');
            },

            onBeforeRender: function onBeforeRender() {
                var subNameModel = this.collection.findWhere({
                        name: 'sub_name'
                    }),
                    subIdModel = this.collection.findWhere({
                        name: 'sub_id'
                    }),
                    subConditionConfig = this.config.conditions[this.model.attributes.sub_name];

                subNameModel.attributes.groups = this.getOptions();

                if (subConditionConfig && subConditionConfig.controls) {
                    _(subConditionConfig.controls).each(function (control) {
                        subIdModel.set(control);
                        subIdModel.set('name', 'sub_id');
                    });
                }
            },

            initialize: function initialize() {
                yjzan.modules.controls.RepeaterRow.prototype.initialize.apply(this, arguments);

                this.config = yjzanPro.config.theme_builder;
            },

            updateOptions: function updateOptions() {
                if (this.model.changed.name) {
                    this.model.set({
                        sub_name: '',
                        sub_id: ''
                    });
                }

                if (this.model.changed.name || this.model.changed.sub_name) {
                    this.model.set('sub_id', '');

                    var subIdModel = this.collection.findWhere({
                        name: 'sub_id'
                    });

                    subIdModel.set({
                        type: 'select',
                        options: {
                            '': 'All'
                        }
                    });

                    this.render();
                }

                if (this.model.changed.type) {
                    this.setTypeAttribute();
                }
            },

            getOptions: function getOptions() {
                var self = this,
                    conditionConfig = self.config.conditions[this.model.get('name')];

                if (!conditionConfig) {
                    return;
                }

                var options = {
                    '': conditionConfig.all_label
                };

                _(conditionConfig.sub_conditions).each(function (conditionId, conditionIndex) {
                    var subConditionConfig = self.config.conditions[conditionId],
                        group;

                    if (!subConditionConfig) {
                        return;
                    }

                    if (subConditionConfig.sub_conditions.length) {
                        group = {
                            label: subConditionConfig.label,
                            options: {}
                        };
                        group.options[conditionId] = subConditionConfig.all_label;

                        _(subConditionConfig.sub_conditions).each(function (subConditionId) {
                            group.options[subConditionId] = self.config.conditions[subConditionId].label;
                        });

                        // Use a sting key - to keep order
                        options['key' + conditionIndex] = group;
                    } else {
                        options[conditionId] = subConditionConfig.label;
                    }
                });

                return options;
            },

            setTypeAttribute: function setTypeAttribute() {
                var typeView = this.children.findByModel(this.collection.findWhere({ name: 'type' }));

                typeView.$el.attr('data-yjzan-condition-type', typeView.getControlValue());
            },

            onRender: function onRender() {
                var nameModel = this.collection.findWhere({
                        name: 'name'
                    }),
                    subNameModel = this.collection.findWhere({
                        name: 'sub_name'
                    }),
                    subIdModel = this.collection.findWhere({
                        name: 'sub_id'
                    }),
                    nameView = this.children.findByModel(nameModel),
                    subNameView = this.children.findByModel(subNameModel),
                    subIdView = this.children.findByModel(subIdModel),
                    conditionConfig = this.config.conditions[this.model.attributes.name],
                    subConditionConfig = this.config.conditions[this.model.attributes.sub_name],
                    typeConfig = this.config.types[this.config.settings.template_type];

                if (typeConfig.condition_type === nameView.getControlValue() && 'general' !== nameView.getControlValue() && !_.isEmpty(conditionConfig.sub_conditions)) {
                    nameView.$el.hide();
                }

                if (!conditionConfig || _.isEmpty(conditionConfig.sub_conditions) && _.isEmpty(conditionConfig.controls) || !nameView.getControlValue() || 'general' === nameView.getControlValue()) {
                    subNameView.$el.hide();
                }

                if (!subConditionConfig || _.isEmpty(subConditionConfig.controls) || !subNameView.getControlValue()) {
                    subIdView.$el.hide();
                }

                // Avoid set a `single` for a-l-l singular types. (conflicted with 404 & custom cpt like Shops and Events plugins).
                if ('singular' === typeConfig.condition_type) {
                    if ('' === subNameView.getControlValue()) {
                        subNameView.setValue('post');
                    }
                }

                this.setTypeAttribute();
            },

            onModelChange: function onModelChange() {
                yjzan.modules.controls.RepeaterRow.prototype.onModelChange.apply(this, arguments);

                this.updateOptions();
            }
        });

        /***/ }),
    /* 47 */
    /***/ (function(module, exports, __webpack_require__) {

        "use strict";


        var SaverBehavior = yjzan.modules.components.saver.behaviors.FooterSaver;

        module.exports = SaverBehavior.extend({
            ui: function ui() {
                var ui = SaverBehavior.prototype.ui.apply(this, arguments);

                ui.menuConditions = '#yjzan-panel-footer-sub-menu-item-conditions';
                ui.buttonPreviewSettings = '#yjzan-panel-footer-theme-builder-button-preview-settings';
                ui.buttonOpenPreview = '#yjzan-panel-footer-theme-builder-button-open-preview';

                return ui;
            },

            events: function events() {
                var events = SaverBehavior.prototype.events.apply(this, arguments);

                delete events['click @ui.buttonPreview'];

                events['click @ui.buttonPreviewSettings'] = 'onClickButtonPreviewSettings';
                events['click @ui.buttonOpenPreview'] = 'onClickButtonPreview';

                return events;
            },

            initialize: function initialize() {
                SaverBehavior.prototype.initialize.apply(this, arguments);

                yjzan.settings.page.model.on('change', this.onChangeLocation.bind(this));
            },

            toggleMenuConditions: function toggleMenuConditions() {
                this.ui.menuConditions.toggle(!!yjzanPro.config.theme_builder.settings.location && yjzan.config.user.is_yjz_admin);
            },

            onRender: function onRender() {
                SaverBehavior.prototype.onRender.apply(this, arguments);

                this.ui.menuConditions = this.view.addSubMenuItem('saver-options', {
                    before: 'save-template',
                    name: 'conditions',
                    icon: 'fa fa-sliders',
                    title: yjzanPro.translate('display_conditions'),
                    callback: function callback() {
                        return yjzanPro.modules.themeBuilder.showPublishModal();
                    }
                });

                this.toggleMenuConditions();

                this.ui.buttonPreview.tipsy('disable').html(jQuery('#tmpl-yjzan-theme-builder-button-preview').html()).addClass('yjzan-panel-footer-theme-builder-buttons-wrapper yjzan-toggle-state');
            },

            onChangeLocation: function onChangeLocation(settings) {
                if (!_.isUndefined(settings.changed.location)) {
                    yjzanPro.config.theme_builder.settings.location = settings.changed.location;
                    this.toggleMenuConditions();
                }
            },

            onClickButtonPublish: function onClickButtonPublish() {
                var hasConditions = yjzanPro.config.theme_builder.settings.conditions.length,
                    hasLocation = yjzanPro.config.theme_builder.settings.location,
                    isDraft = 'draft' === yjzan.settings.page.model.get('post_status');

                if (hasConditions && !isDraft || !hasLocation) {
                    SaverBehavior.prototype.onClickButtonPublish.apply(this, arguments);
                } else {
                    yjzanPro.modules.themeBuilder.showPublishModal();
                }
            },

            onClickButtonPreviewSettings: function onClickButtonPreviewSettings() {
                var panel = yjzan.getPanelView();
                panel.setPage('page_settings');
                panel.getCurrentPageView().activateSection('preview_settings');
                panel.getCurrentPageView()._renderChildren();
            }
        });

        /***/ })
    /******/ ]);
