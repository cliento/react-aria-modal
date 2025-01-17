'use strict';

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

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

var React = require('react');

var ReactDOM = require('react-dom'); // React 16+ supports Portals.


var canUsePortals = !!ReactDOM.createPortal;

function displace(WrappedComponent, options) {
  if (!global.document) {
    return /*#__PURE__*/function (_React$Component) {
      _inherits(EmptyDisplace, _React$Component);

      var _super = _createSuper(EmptyDisplace);

      function EmptyDisplace() {
        _classCallCheck(this, EmptyDisplace);

        return _super.apply(this, arguments);
      }

      _createClass(EmptyDisplace, [{
        key: "render",
        value: function render() {
          return false;
        }
      }]);

      return EmptyDisplace;
    }(React.Component);
  }

  options = options || {};

  var Displaced = /*#__PURE__*/function (_React$Component2) {
    _inherits(Displaced, _React$Component2);

    var _super2 = _createSuper(Displaced);

    function Displaced() {
      var _this;

      _classCallCheck(this, Displaced);

      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      _this = _super2.call.apply(_super2, [this].concat(args));

      _defineProperty(_assertThisInitialized(_this), "renderDisplaced", function () {
        ReactDOM.unstable_renderSubtreeIntoContainer(_assertThisInitialized(_this), React.createElement(WrappedComponent, _this.props, _this.props.children), _this.container);
      });

      _defineProperty(_assertThisInitialized(_this), "removeDisplaced", function () {
        ReactDOM.unmountComponentAtNode(_this.container);
      });

      return _this;
    }

    _createClass(Displaced, [{
      key: "UNSAFE_componentWillMount",
      value: function UNSAFE_componentWillMount() {
        this.container = function () {
          if (!options.renderTo) {
            var result = document.createElement('div');
            document.body.appendChild(result);
            return result;
          } else if (typeof options.renderTo === 'string') {
            return document.querySelector(options.renderTo);
          } else {
            return options.renderTo;
          }
        }();
      }
    }, {
      key: "componentDidMount",
      value: function componentDidMount() {
        if (canUsePortals) return;

        if (this.props.mounted) {
          this.renderDisplaced();
        }
      }
    }, {
      key: "componentDidUpdate",
      value: function componentDidUpdate(prevProps) {
        if (canUsePortals) return;

        if (prevProps.mounted && !this.props.mounted) {
          ReactDOM.unmountComponentAtNode(this.container);
        } else if (this.props.mounted) {
          this.renderDisplaced();
        }
      }
    }, {
      key: "componentWillUnmount",
      value: function componentWillUnmount() {
        if (!canUsePortals) {
          ReactDOM.unmountComponentAtNode(this.container);
        }

        if (!options.renderTo) {
          this.container.parentNode.removeChild(this.container);
        }
      }
    }, {
      key: "render",
      value: function render() {
        if (!canUsePortals || this.props.mounted === false) {
          return null;
        }

        return ReactDOM.createPortal(React.createElement(WrappedComponent, this.props, this.props.children), this.container);
      }
    }]);

    return Displaced;
  }(React.Component);

  _defineProperty(Displaced, "defaultProps", {
    mounted: true
  });

  _defineProperty(Displaced, "WrappedComponent", WrappedComponent);

  return Displaced;
}

module.exports = displace;