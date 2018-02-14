"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Stopwatch = function (_React$Component) {
    _inherits(Stopwatch, _React$Component);

    function Stopwatch() {
        _classCallCheck(this, Stopwatch);

        var _this = _possibleConstructorReturn(this, (Stopwatch.__proto__ || Object.getPrototypeOf(Stopwatch)).call(this));

        _this.state = {
            times: {
                minutes: 0,
                seconds: 0,
                miliseconds: 0

            },
            running: false
        };

        return _this;
    }

    _createClass(Stopwatch, [{
        key: "reset",
        value: function reset() {
            var resTimes = {
                minutes: this.state.times.miliseconds = 0,
                seconds: this.state.times.seconds = 0,
                miliseconds: this.state.times.miliseconds = 0
            };
            this.setState({
                times: resTimes, running: false
            });
        }
    }, {
        key: "format",
        value: function format(times) {
            return this.pad0(times.minutes) + ":" + this.pad0(times.seconds) + ":" + this.pad0(times.miliseconds);
        }
    }, {
        key: "pad0",
        value: function pad0(value) {
            var result = value.toString();
            if (result.length < 2) {
                result = '0' + result;
            }
            return result;
        }
    }, {
        key: "start",
        value: function start() {
            var _this2 = this;

            if (!this.state.running) {
                this.setState({ running: true });
                this.watch = setInterval(function () {
                    return _this2.step();
                }, 10);
            }
        }
    }, {
        key: "step",
        value: function step() {
            if (!this.state.running) return;
            this.calculate();
        }
    }, {
        key: "calculate",
        value: function calculate() {
            var newTimes = {
                miliseconds: this.state.times.miliseconds,
                seconds: this.state.times.seconds,
                minutes: this.state.times.minutes
            };
            newTimes.miliseconds += 1;
            if (newTimes.miliseconds >= 100) {
                newTimes.seconds += 1;
                newTimes.miliseconds = 0;
            }
            if (newTimes.seconds >= 60) {
                newTimes.minutes += 1;
                newTimes.seconds = 0;
            }
            this.setState({
                times: newTimes
            });
        }
    }, {
        key: "stop",
        value: function stop() {
            this.setState({ running: false });
            clearInterval(this.watch);
        }
    }, {
        key: "render",
        value: function render() {
            var _this3 = this;

            return React.createElement(
                "nav",
                { className: "controls" },
                React.createElement(
                    "a",
                    { href: "#", onClick: function onClick() {
                            return _this3.start();
                        }, className: "button" },
                    "Start"
                ),
                React.createElement(
                    "a",
                    { href: "#", onClick: function onClick() {
                            return _this3.stop();
                        }, className: "button" },
                    "Stop"
                ),
                React.createElement(
                    "ul",
                    { id: "results" },
                    this.format(this.state.times)
                )
            );
        }
    }]);

    return Stopwatch;
}(React.Component);

ReactDOM.render(React.createElement(Stopwatch, null), document.getElementById('stopwatch'));
