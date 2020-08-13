(function(){'use strict';function styleInject(css, ref) {
  if ( ref === void 0 ) ref = {};
  var insertAt = ref.insertAt;

  if (!css || typeof document === 'undefined') { return; }

  var head = document.head || document.getElementsByTagName('head')[0];
  var style = document.createElement('style');
  style.type = 'text/css';

  if (insertAt === 'top') {
    if (head.firstChild) {
      head.insertBefore(style, head.firstChild);
    } else {
      head.appendChild(style);
    }
  } else {
    head.appendChild(style);
  }

  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    style.appendChild(document.createTextNode(css));
  }
}var css_248z = ".privacywire{position:fixed;bottom:-250%;left:0;right:0;box-shadow:0 -1px 3px rgba(0,0,0,.3);opacity:0;background:#fff;z-index:1;padding:1rem;transition:bottom .3s ease,opacity 1s ease}.privacywire header{font-weight:700}.show-banner .privacywire.privacywire-banner,.show-message .privacywire.privacywire-message,.show-options .privacywire.privacywire-options{bottom:0;opacity:1;transition:bottom .3s ease,opacity .3s ease}.privacywire button[hidden]{display:none}";
styleInject(css_248z);if (window.NodeList && !NodeList.prototype.forEach) {
  NodeList.prototype.forEach = Array.prototype.forEach;
}
/* ######### initiate functions  ######### */


var priw_showBanner = function priw_showBanner() {
  priw_wrapper.classList.add("show-banner");
};

var priw_hideBanner = function priw_hideBanner() {
  priw_wrapper.classList.remove('show-banner');
  priw_wrapper.classList.remove('show-options');
};

var priw_setOnlyNecessaryConsent = function priw_setOnlyNecessaryConsent() {
  priw_consent.necessary = true;
  priw_consent.functional = false;
  priw_consent.statistics = false;
  priw_consent.marketing = false;
  priw_consent.external_media = false;
};

var priw_handleButtons = function priw_handleButtons() {
  priw_btn_allowAll.onclick = function () {
    priw_consent.necessary = true;
    priw_consent.functional = true;
    priw_consent.statistics = true;
    priw_consent.marketing = true;
    priw_consent.external_media = true;
    priw_savePreferences();
  };

  priw_btn_allowNecessary.onclick = function () {
    priw_setOnlyNecessaryConsent();
    priw_savePreferences();
  };

  priw_btn_choose.onclick = function () {
    priw_showOptions();
  };

  priw_btn_toggle.onclick = function () {
    priw_btn_options.forEach(function (el) {
      el.checked = priw_toggle_to_status;
    });
    priw_toggle_to_status = !priw_toggle_to_status;
  };

  priw_btn_save.onclick = function () {
    priw_consent.necessary = true;
    priw_consent.functional = priw_btn_options_functional.checked;
    priw_consent.statistics = priw_btn_options_statistics.checked;
    priw_consent.marketing = priw_btn_options_marketing.checked;
    priw_consent.external_media = priw_btn_options_external_media.checked;
    priw_savePreferences();
  };
};

var priw_showOptions = function priw_showOptions() {
  priw_wrapper.classList.remove('show-banner');
  priw_wrapper.classList.add("show-options");
};

var priw_showMessage = function priw_showMessage() {
  priw_wrapper.classList.add('show-message');
  setTimeout(function () {
    priw_wrapper.classList.remove('show-message');
  }, 1500);
};

var priw_savePreferences = function priw_savePreferences() {
  var silent = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

  if (priw_consent.version === 0) {
    priw_consent.version = priw_settings.version;
  }

  window.localStorage.setItem(priw, JSON.stringify(priw_consent));
  priw_hideBanner();

  if (!silent) {
    priw_showMessage();
  }

  priw_updateElements();
  priw_trigger_custom_function();
};

var priw_trigger_custom_function = function priw_trigger_custom_function() {
  if (typeof window[priw_settings.cstFn] === 'function') {
    window[priw_settings.cstFn]();
  }
};

var priw_updateElements = function priw_updateElements() {
  var elements = document.querySelectorAll("[data-category]");

  if (elements.length === 0) {
    return;
  }

  elements.forEach(function (el) {
    var dataset = el.dataset;
    var category = dataset.category;
    var allowed = false;

    if (category) {
      for (var consentCategory in priw_consent) {
        if (consentCategory === category && priw_consent[consentCategory] === true) {
          allowed = true;
          break;
        }
      }
    }

    if (!allowed) {
      return;
    }

    var parent = el.parentElement;
    var newEl = document.createElement(el.tagName);

    for (var _i = 0, _Object$keys = Object.keys(dataset); _i < _Object$keys.length; _i++) {
      var key = _Object$keys[_i];
      newEl.dataset[key] = el.dataset[key];
    }

    newEl.type = dataset.type;
    newEl.innerText = el.innerText;
    newEl.text = el.text;
    newEl["class"] = el["class"];
    newEl.style.cssText = el.style.cssText;
    newEl.id = el.id;
    newEl.name = el.name;
    newEl.defer = el.defer;
    newEl.async = el.async;

    if (dataset.src) {
      newEl.src = dataset.src;
    }

    parent.insertBefore(newEl, el);
    parent.removeChild(el);
  });
};

var priw_handleExternalTriggers = function priw_handleExternalTriggers() {
  var showButtons = document.querySelectorAll(".privacywire-show-options");

  if (!showButtons.length) {
    return;
  }

  showButtons.forEach(function (showButton) {
    showButton.onclick = function (e) {
      e.preventDefault();
      priw_showOptions();
      priw_handleButtons();
    };
  });
};
/* ######### initiate variables  ######### */


var priw_settings = {};
priw_settings.dnt = Boolean(parseInt(PrivacyWireSettings.dnt));
priw_settings.version = parseInt(PrivacyWireSettings.version);
priw_settings.cstFn = PrivacyWireSettings.customFunction;
var priw = "privacywire";
var priw_wrapper = document.querySelector(".privacywire-wrapper");
var priw_btn_allowAll = priw_wrapper.querySelector(".allow-all");
var priw_btn_allowNecessary = priw_wrapper.querySelector(".allow-necessary");
var priw_btn_choose = priw_wrapper.querySelector(".choose");
var priw_btn_save = priw_wrapper.querySelector(".save");
var priw_btn_toggle = priw_wrapper.querySelector(".toggle");
var priw_btn_options = priw_wrapper.querySelectorAll(".optional");
var priw_btn_options_functional = priw_wrapper.querySelector("#functional");
var priw_btn_options_statistics = priw_wrapper.querySelector("#statistics");
var priw_btn_options_marketing = priw_wrapper.querySelector("#marketing");
var priw_btn_options_external_media = priw_wrapper.querySelector("#external_media");
var priw_toggle_to_status = true;
var priw_consent = {};
var priw_storage = window.localStorage.getItem(priw) ? JSON.parse(window.localStorage.getItem(priw)) : "";

if (priw_storage) {
  var _parseInt, _Boolean, _Boolean2, _Boolean3, _Boolean4, _Boolean5;

  priw_consent.version = (_parseInt = parseInt(priw_storage.version)) !== null && _parseInt !== void 0 ? _parseInt : 0;
  priw_consent.necessary = (_Boolean = Boolean(priw_storage.statistics)) !== null && _Boolean !== void 0 ? _Boolean : true;
  priw_consent.functional = (_Boolean2 = Boolean(priw_storage.functional)) !== null && _Boolean2 !== void 0 ? _Boolean2 : false;
  priw_consent.statistics = (_Boolean3 = Boolean(priw_storage.statistics)) !== null && _Boolean3 !== void 0 ? _Boolean3 : false;
  priw_consent.marketing = (_Boolean4 = Boolean(priw_storage.marketing)) !== null && _Boolean4 !== void 0 ? _Boolean4 : false;
  priw_consent.external_media = (_Boolean5 = Boolean(priw_storage.marketing)) !== null && _Boolean5 !== void 0 ? _Boolean5 : false; // prefill the option checkboxes

  priw_btn_options_functional.checked = priw_consent.functional;
  priw_btn_options_statistics.checked = priw_consent.statistics;
  priw_btn_options_marketing.checked = priw_consent.marketing;
  priw_btn_options_external_media.checked = priw_consent.external_media;
} else {
  priw_consent.version = 0;
  priw_setOnlyNecessaryConsent();

  if (priw_settings.dnt === true && navigator.doNotTrack === "1") {
    priw_consent.version = 1;
    priw_savePreferences(true);
  }
}

var priw_valid_consent = priw_consent.version > 0 && priw_consent.version === priw_settings.version;
/* ######### initiate the whole thing  ######### */

if (!priw_valid_consent) {
  priw_showBanner();
}

priw_updateElements();
priw_handleButtons();
priw_handleExternalTriggers();}());