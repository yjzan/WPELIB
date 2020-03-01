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
    /******/ 	return __webpack_require__(__webpack_require__.s = 163);
    /******/ })
/************************************************************************/
/******/ ({

    /***/ 163:
    /***/ (function(module, exports, __webpack_require__) {

        "use strict";

        (function ($) {
            var YjzanAdmin = yjzanModules.ViewModule.extend({

                maintenanceMode: null,

                config: yjzanAdminConfig,

                getDefaultElements: function getDefaultElements() {
                    var elements = {
                        $switchMode: $('#yjzan-switch-mode'),
                        $goToEditLink: $('#yjzan-go-to-edit-page-link'),
                        $switchModeInput: $('#yjzan-switch-mode-input'),
                        $switchModeButton: $('#yjzan-switch-mode-button'),
                        $yjzanLoader: $('.yjzan-loader'),
                        $builderEditor: $('#yjzan-editor'),
                        $importButton: $('#yjzan-import-template-trigger'),
                        $importArea: $('#yjzan-import-template-area'),
                        $settingsForm: $('#yjzan-settings-form'),
                        $settingsTabsWrapper: $('#yjzan-settings-tabs-wrapper')
                    };

                    elements.$settingsFormPages = elements.$settingsForm.find('.yjzan-settings-form-page');

                    elements.$activeSettingsPage = elements.$settingsFormPages.filter('.yjzan-active');

                    elements.$settingsTabs = elements.$settingsTabsWrapper.children();

                    elements.$activeSettingsTab = elements.$settingsTabs.filter('.nav-tab-active');

                    return elements;
                },

                toggleStatus: function toggleStatus() {
                    var isYjzanMode = this.isYjzanMode();

                    yjzanCommon.elements.$body.toggleClass('yjzan-editor-active', isYjzanMode).toggleClass('yjzan-editor-inactive', !isYjzanMode);
                },

                bindEvents: function bindEvents() {
                    var self = this;

                    self.elements.$switchModeButton.on('click', function (event) {
                        event.preventDefault();

                        if (!self.isYjzanMode()) {
                            self.elements.$switchModeInput.val(true);

                            var $wpTitle = $('#title');

                            if (!$wpTitle.val()) {
                                $wpTitle.val('新建页面 #' + $('#post_ID').val());
                            }

                            if (wp.autosave) {
                                wp.autosave.server.triggerSave();
                            }

                            self.animateLoader();

                            $(document).on('heartbeat-tick.autosave', function () {
                                yjzanCommon.elements.$window.off('beforeunload.edit-post');

                                location.href = self.elements.$goToEditLink.attr('href');
                            });
                            //self.toggleStatus();
                            if(typeof($switchModeButton)!== 'undefined')
                                $switchModeButton.attr({"disabled":"disabled"});
                        }
                    });

                    self.elements.$goToEditLink.on('click', function () {
                        self.animateLoader();
                    });

                    $('div.notice.yjzan-message-dismissed').on('click', 'button.notice-dismiss, .yjzan-button-notice-dismiss', function (event) {
                        event.preventDefault();

                        $.post(ajaxurl, {
                            action: 'yjzan_set_admin_notice_viewed',
                            notice_id: $(this).closest('.yjzan-message-dismissed').data('notice_id')
                        });

                        var $wrapperElm = $(this).closest('.yjzan-message-dismissed');
                        $wrapperElm.fadeTo(100, 0, function () {
                            $wrapperElm.slideUp(100, function () {
                                $wrapperElm.remove();
                            });
                        });
                    });

                    $('#yjzan-clear-cache-button').on('click', function (event) {
                        event.preventDefault();
                        var $thisButton = $(this);

                        $thisButton.removeClass('success').addClass('loading');

                        $.post(ajaxurl, {
                            action: 'yjzan_clear_cache',
                            _nonce: $thisButton.data('nonce')
                        }).done(function () {
                            $thisButton.removeClass('loading').addClass('success');
                        });
                    });

                    $('#yjzan-library-sync-button').on('click', function (event) {
                        event.preventDefault();
                        var $thisButton = $(this);

                        $thisButton.removeClass('success').addClass('loading');

                        $.post(ajaxurl, {
                            action: 'yjzan_reset_library',
                            _nonce: $thisButton.data('nonce')
                        }).done(function () {
                            $thisButton.removeClass('loading').addClass('success');
                        });
                    });

                    $('#yjzan-replace-url-button').on('click', function (event) {
                        event.preventDefault();
                        var $this = $(this),
                            $tr = $this.parents('tr'),
                            $from = $tr.find('[name="from"]'),
                            $to = $tr.find('[name="to"]');

                        $this.removeClass('success').addClass('loading');

                        $.post(ajaxurl, {
                            action: 'yjzan_replace_url',
                            from: $from.val(),
                            to: $to.val(),
                            _nonce: $this.data('nonce')
                        }).done(function (response) {
                            $this.removeClass('loading');

                            if (response.success) {
                                $this.addClass('success');
                            }

                            yjzanCommon.dialogsManager.createWidget('alert', {
                                message: response.data
                            }).show();
                        });
                    });

                    self.elements.$settingsTabs.on({
                        click: function click(event) {
                            event.preventDefault();

                            event.currentTarget.focus(); // Safari does not focus the tab automatically
                        },
                        focus: function focus() {
                            // Using focus event to enable navigation by tab key
                            var hrefWithoutHash = location.href.replace(/#.*/, '');

                            history.pushState({}, '', hrefWithoutHash + this.hash);

                            self.goToSettingsTabFromHash();
                        }
                    });

                    $('.yjzan-rollback-button').on('click', function (event) {
                        event.preventDefault();

                        var $this = $(this);

                        yjzanCommon.dialogsManager.createWidget('confirm', {
                            headerMessage: self.translate('rollback_to_previous_version'),
                            message: self.translate('rollback_confirm'),
                            strings: {
                                confirm: self.translate('yes'),
                                cancel: self.translate('cancel')
                            },
                            onConfirm: function onConfirm() {
                                $this.addClass('loading');

                                location.href = $this.attr('href');
                            }
                        }).show();
                    });

                    $('.yjzan_css_print_method select').on('change', function () {
                        var $descriptions = $('.yjzan-css-print-method-description');

                        $descriptions.hide();
                        $descriptions.filter('[data-value="' + $(this).val() + '"]').show();
                    }).trigger('change');
                },

                onInit: function onInit() {
                    yjzanModules.ViewModule.prototype.onInit.apply(this, arguments);

                    this.initTemplatesImport();

                    this.initMaintenanceMode();

                    this.goToSettingsTabFromHash();

                    this.roleManager.init();
                },

                initTemplatesImport: function initTemplatesImport() {
                    if (!yjzanCommon.elements.$body.hasClass('post-type-yjzan_library')) {
                        return;
                    }

                    var self = this,
                        $importButton = self.elements.$importButton,
                        $importArea = self.elements.$importArea;

                    self.elements.$formAnchor = $('h1');

                    $('#wpbody-content').find('.page-title-action:last').after($importButton);

                    self.elements.$formAnchor.after($importArea);

                    $importButton.on('click', function () {
                        $('#yjzan-import-template-area').toggle();
                    });
                },

                initMaintenanceMode: function initMaintenanceMode() {
                    var MaintenanceMode = __webpack_require__(164);

                    this.maintenanceMode = new MaintenanceMode();
                },

                isYjzanMode: function isYjzanMode() {
                    return !!this.elements.$switchModeInput.val();
                },

                animateLoader: function animateLoader() {
                    this.elements.$goToEditLink.addClass('yjzan-animate');
                },

                goToSettingsTabFromHash: function goToSettingsTabFromHash() {
                    var hash = location.hash.slice(1);

                    if (hash) {
                        this.goToSettingsTab(hash);
                    }
                },

                goToSettingsTab: function goToSettingsTab(tabName) {
                    var $pages = this.elements.$settingsFormPages;

                    if (!$pages.length) {
                        return;
                    }

                    var $activePage = $pages.filter('#' + tabName);

                    this.elements.$activeSettingsPage.removeClass('yjzan-active');

                    this.elements.$activeSettingsTab.removeClass('nav-tab-active');

                    var $activeTab = this.elements.$settingsTabs.filter('#yjzan-settings-' + tabName);

                    $activePage.addClass('yjzan-active');

                    $activeTab.addClass('nav-tab-active');

                    this.elements.$settingsForm.attr('action', 'options.php#' + tabName);

                    this.elements.$activeSettingsPage = $activePage;

                    this.elements.$activeSettingsTab = $activeTab;
                },

                translate: function translate(stringKey, templateArgs) {
                    return yjzanCommon.translate(stringKey, null, templateArgs, this.config.i18n);
                },

                roleManager: {
                    selectors: {
                        body: 'yjzan-role-manager',
                        row: '.yjzan-role-row',
                        label: '.yjzan-role-label',
                        excludedIndicator: '.yjzan-role-excluded-indicator',
                        excludedField: 'input[name="yjzan_exclude_user_roles[]"]',
                        controlsContainer: '.yjzan-role-controls',
                        toggleHandle: '.yjzan-role-toggle',
                        arrowUp: 'dashicons-arrow-up',
                        arrowDown: 'dashicons-arrow-down'
                    },
                    toggle: function toggle($trigger) {
                        var self = this,
                            $row = $trigger.closest(self.selectors.row),
                            $toggleHandleIcon = $row.find(self.selectors.toggleHandle).find('.dashicons'),
                            $controls = $row.find(self.selectors.controlsContainer);

                        $controls.toggleClass('hidden');
                        if ($controls.hasClass('hidden')) {
                            $toggleHandleIcon.removeClass(self.selectors.arrowUp).addClass(self.selectors.arrowDown);
                        } else {
                            $toggleHandleIcon.removeClass(self.selectors.arrowDown).addClass(self.selectors.arrowUp);
                        }
                        self.updateLabel($row);
                    },
                    updateLabel: function updateLabel($row) {
                        var self = this,
                            $indicator = $row.find(self.selectors.excludedIndicator),
                            excluded = $row.find(self.selectors.excludedField).is(':checked');
                        if (excluded) {
                            $indicator.html($indicator.data('excluded-label'));
                        } else {
                            $indicator.html('');
                        }
                        self.setAdvancedState($row, excluded);
                    },
                    setAdvancedState: function setAdvancedState($row, state) {
                        var self = this,
                            $controls = $row.find('input[type="checkbox"]').not(self.selectors.excludedField);

                        $controls.each(function (index, input) {
                            $(input).prop('disabled', state);
                        });
                    },
                    bind: function bind() {
                        var self = this;
                        $(document).on('click', self.selectors.label + ',' + self.selectors.toggleHandle, function (event) {
                            event.stopPropagation();
                            event.preventDefault();
                            self.toggle($(this));
                        }).on('change', self.selectors.excludedField, function () {
                            self.updateLabel($(this).closest(self.selectors.row));
                        });
                    },
                    init: function init() {
                        var self = this;
                        if (!$('body[class*="' + self.selectors.body + '"]').length) {
                            return;
                        }
                        self.bind();
                        $(self.selectors.row).each(function (index, row) {
                            self.updateLabel($(row));
                        });
                    }
                }
            });

            $(function () {
                window.yjzanAdmin = new YjzanAdmin();

                yjzanCommon.elements.$window.trigger('yjzan/admin/init');
            });
        })(jQuery);

        /***/ }),

    /***/ 164:
    /***/ (function(module, exports, __webpack_require__) {

        "use strict";

        module.exports = yjzanModules.ViewModule.extend({
            getDefaultSettings: function getDefaultSettings() {
                return {
                    selectors: {
                        modeSelect: '.yjzan_maintenance_mode_mode select',
                        maintenanceModeTable: '#tab-maintenance_mode table',
                        maintenanceModeDescriptions: '.yjzan-maintenance-mode-description',
                        excludeModeSelect: '.yjzan_maintenance_mode_exclude_mode select',
                        excludeRolesArea: '.yjzan_maintenance_mode_exclude_roles',
                        templateSelect: '.yjzan_maintenance_mode_template_id select',
                        editTemplateButton: '.yjzan-edit-template',
                        maintenanceModeError: '.yjzan-maintenance-mode-error'
                    },
                    classes: {
                        isEnabled: 'yjzan-maintenance-mode-is-enabled'
                    }
                };
            },

            getDefaultElements: function getDefaultElements() {
                var elements = {},
                    selectors = this.getSettings('selectors');

                elements.$modeSelect = jQuery(selectors.modeSelect);
                elements.$maintenanceModeTable = elements.$modeSelect.parents(selectors.maintenanceModeTable);
                elements.$excludeModeSelect = elements.$maintenanceModeTable.find(selectors.excludeModeSelect);
                elements.$excludeRolesArea = elements.$maintenanceModeTable.find(selectors.excludeRolesArea);
                elements.$templateSelect = elements.$maintenanceModeTable.find(selectors.templateSelect);
                elements.$editTemplateButton = elements.$maintenanceModeTable.find(selectors.editTemplateButton);
                elements.$maintenanceModeDescriptions = elements.$maintenanceModeTable.find(selectors.maintenanceModeDescriptions);
                elements.$maintenanceModeError = elements.$maintenanceModeTable.find(selectors.maintenanceModeError);

                return elements;
            },

            handleModeSelectChange: function handleModeSelectChange() {
                var settings = this.getSettings(),
                    elements = this.elements;

                elements.$maintenanceModeTable.toggleClass(settings.classes.isEnabled, !!elements.$modeSelect.val());
                elements.$maintenanceModeDescriptions.hide();
                elements.$maintenanceModeDescriptions.filter('[data-value="' + elements.$modeSelect.val() + '"]').show();
            },

            handleExcludeModeSelectChange: function handleExcludeModeSelectChange() {
                var elements = this.elements;

                elements.$excludeRolesArea.toggle('custom' === elements.$excludeModeSelect.val());
            },

            handleTemplateSelectChange: function handleTemplateSelectChange() {
                var elements = this.elements;

                var templateID = elements.$templateSelect.val();

                if (!templateID) {
                    elements.$editTemplateButton.hide();
                    elements.$maintenanceModeError.show();
                    return;
                }

                var editUrl = yjzanAdmin.config.home_url + '?p=' + templateID + '&yjzan';

                elements.$editTemplateButton.prop('href', editUrl).show();
                elements.$maintenanceModeError.hide();
            },

            bindEvents: function bindEvents() {
                var elements = this.elements;

                elements.$modeSelect.on('change', this.handleModeSelectChange.bind(this));

                elements.$excludeModeSelect.on('change', this.handleExcludeModeSelectChange.bind(this));

                elements.$templateSelect.on('change', this.handleTemplateSelectChange.bind(this));
            },

            onAdminInit: function onAdminInit() {
                this.handleModeSelectChange();
                this.handleExcludeModeSelectChange();
                this.handleTemplateSelectChange();
            },

            onInit: function onInit() {
                yjzanModules.ViewModule.prototype.onInit.apply(this, arguments);
                yjzanCommon.elements.$window.on('yjzan/admin/init', this.onAdminInit);
                jQuery("#yjzan-switch-mode-button").removeAttr("disabled");
                jQuery("#yjzan-switch-mode-button .yjzan-switch-mode-off").html('可视化编辑');
            }
        });

        /***/ })

    /******/ });
//# sourceMappingURL=admin.js.map