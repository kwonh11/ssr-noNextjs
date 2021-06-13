"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = App;

var _react = _interopRequireDefault(require("react"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function App() {
  const onClickButton = () => {
    window.alert("clicked !!");
  };

  return /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement("button", {
    onClick: onClickButton
  }, "\uD074\uB9AD"));
}