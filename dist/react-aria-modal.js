"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var React = require('react');

var FocusTrap = require('focus-trap-react');

var noScroll = require('no-scroll');

var displace = require('./displace');

var Modal = /*#__PURE__*/function (_React$Component) {
  _inherits(Modal, _React$Component);

  var _super = _createSuper(Modal);

  function Modal() {
    var _this;

    _classCallCheck(this, Modal);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));

    _defineProperty(_assertThisInitialized(_this), "getApplicationNode", function () {
      if (_this.props.getApplicationNode) return _this.props.getApplicationNode();
      return _this.props.applicationNode;
    });

    _defineProperty(_assertThisInitialized(_this), "checkUnderlayClick", function (event) {
      if (_this.dialogNode && _this.dialogNode.contains(event.target) || // If the click is on the scrollbar we don't want to close the modal.
      event.pageX > event.target.ownerDocument.documentElement.offsetWidth || event.pageY > event.target.ownerDocument.documentElement.offsetHeight) return;

      _this.exit(event);
    });

    _defineProperty(_assertThisInitialized(_this), "checkDocumentKeyDown", function (event) {
      if (_this.props.escapeExits && (event.key === 'Escape' || event.key === 'Esc' || event.keyCode === 27)) {
        _this.exit(event);
      }
    });

    _defineProperty(_assertThisInitialized(_this), "exit", function (event) {
      if (_this.props.onExit) {
        _this.props.onExit(event);
      }
    });

    return _this;
  }

  _createClass(Modal, [{
    key: "UNSAFE_componentWillMount",
    value: function UNSAFE_componentWillMount() {
      if (!this.props.titleText && !this.props.titleId) {
        throw new Error('react-aria-modal instances should have a `titleText` or `titleId`');
      }
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      if (this.props.onEnter) {
        this.props.onEnter();
      } // Timeout to ensure this happens *after* focus has moved


      var applicationNode = this.getApplicationNode();
      setTimeout(function () {
        if (applicationNode) {
          applicationNode.setAttribute('aria-hidden', 'true');
        }
      }, 0);

      if (this.props.escapeExits) {
        this.addKeyDownListener();
      }

      if (this.props.scrollDisabled) {
        noScroll.on();
      }
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps) {
      if (prevProps.scrollDisabled && !this.props.scrollDisabled) {
        noScroll.off();
      } else if (!prevProps.scrollDisabled && this.props.scrollDisabled) {
        noScroll.on();
      }

      if (this.props.escapeExits && !prevProps.escapeExits) {
        this.addKeyDownListener();
      } else if (!this.props.escapeExits && prevProps.escapeExits) {
        this.removeKeyDownListener();
      }
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      if (this.props.scrollDisabled) {
        noScroll.off();
      }

      var applicationNode = this.getApplicationNode();

      if (applicationNode) {
        applicationNode.setAttribute('aria-hidden', 'false');
      }

      this.removeKeyDownListener();
    }
  }, {
    key: "addKeyDownListener",
    value: function addKeyDownListener() {
      var _this2 = this;

      setTimeout(function () {
        document.addEventListener('keydown', _this2.checkDocumentKeyDown);
      });
    }
  }, {
    key: "removeKeyDownListener",
    value: function removeKeyDownListener() {
      var _this3 = this;

      setTimeout(function () {
        document.removeEventListener('keydown', _this3.checkDocumentKeyDown);
      });
    }
  }, {
    key: "render",
    value: function render() {
      var props = this.props;
      var style = {};

      if (props.includeDefaultStyles) {
        style = {
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: 1050,
          overflowX: 'hidden',
          overflowY: 'auto',
          WebkitOverflowScrolling: 'touch',
          textAlign: 'center'
        };

        if (props.underlayColor) {
          style.background = props.underlayColor;
        }

        if (props.underlayClickExits) {
          style.cursor = 'pointer';
        }
      }

      if (props.underlayStyle) {
        for (var key in props.underlayStyle) {
          if (!props.underlayStyle.hasOwnProperty(key)) continue;
          style[key] = props.underlayStyle[key];
        }
      }

      var underlayProps = {
        className: props.underlayClass,
        style: style
      };

      if (props.underlayClickExits) {
        underlayProps.onMouseDown = this.checkUnderlayClick;
      }

      for (var prop in this.props.underlayProps) {
        underlayProps[prop] = this.props.underlayProps[prop];
      }

      var verticalCenterStyle = {};

      if (props.includeDefaultStyles) {
        verticalCenterStyle = {
          display: 'inline-block',
          height: '100%',
          verticalAlign: 'middle'
        };
      }

      var verticalCenterHelperProps = {
        key: 'a',
        style: verticalCenterStyle
      };
      var dialogStyle = {};

      if (props.includeDefaultStyles) {
        dialogStyle = {
          display: 'inline-block',
          textAlign: 'left',
          top: 0,
          maxWidth: '100%',
          cursor: 'default',
          outline: props.focusDialog ? 0 : null
        };

        if (props.verticallyCenter) {
          dialogStyle.verticalAlign = 'middle';
          dialogStyle.top = 0;
        }
      }

      if (props.dialogStyle) {
        for (var _key2 in props.dialogStyle) {
          if (!props.dialogStyle.hasOwnProperty(_key2)) continue;
          dialogStyle[_key2] = props.dialogStyle[_key2];
        }
      }

      var dialogProps = {
        key: 'b',
        ref: function (el) {
          this.dialogNode = el;
        }.bind(this),
        role: props.alert ? 'alertdialog' : 'dialog',
        id: props.dialogId,
        className: props.dialogClass,
        style: dialogStyle
      };

      if (props.titleId) {
        dialogProps['aria-labelledby'] = props.titleId;
      } else if (props.titleText) {
        dialogProps['aria-label'] = props.titleText;
      }

      if (props.focusDialog) {
        dialogProps.tabIndex = '-1';
      } // Apply data- and aria- attributes passed as props


      for (var _key3 in props) {
        if (/^(data-|aria-)/.test(_key3)) {
          dialogProps[_key3] = props[_key3];
        }
      }

      var childrenArray = [React.createElement('div', dialogProps, props.children)];

      if (props.verticallyCenter) {
        childrenArray.unshift(React.createElement('div', verticalCenterHelperProps));
      }

      var focusTrapOptions = props.focusTrapOptions || {};

      if (props.focusDialog || props.initialFocus) {
        focusTrapOptions.initialFocus = props.focusDialog ? "#".concat(this.props.dialogId) : props.initialFocus;
      }

      focusTrapOptions.escapeDeactivates = props.escapeExits;
      return React.createElement(FocusTrap, {
        focusTrapOptions: focusTrapOptions,
        paused: props.focusTrapPaused
      }, React.createElement('div', underlayProps, childrenArray));
    }
  }]);

  return Modal;
}(React.Component);

_defineProperty(Modal, "defaultProps", {
  underlayProps: {},
  dialogId: 'react-aria-modal-dialog',
  underlayClickExits: true,
  escapeExits: true,
  underlayColor: 'rgba(0,0,0,0.5)',
  includeDefaultStyles: true,
  focusTrapPaused: false,
  scrollDisabled: true
});

var DisplacedModal = displace(Modal);

DisplacedModal.renderTo = function (input) {
  return displace(Modal, {
    renderTo: input
  });
};

module.exports = DisplacedModal;