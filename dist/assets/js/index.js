(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Calisto = function () {
  function Calisto(settings) {
    _classCallCheck(this, Calisto);

    this.container = settings.container || false;

    if (this.container === false) {
      console.error('You must choose a container to initialize Calisto.');
      return false;
    }

    // public variables
    this.infinite = settings.infinite || true;
    this.slides = [].slice.call(this.container.children) || false; // converst htmlobject to array
    this.length = this.slides.length;
    this.speed = settings.speed || '300ms';

    console.log(this.slides);

    this.wrap();

    this.goToSlide(0);
  }

  _createClass(Calisto, [{
    key: 'wrap',
    value: function wrap() {
      this.container.classList.add('calisto');

      this._rail = document.createElement('div');
      this._rail.classList.add('calisto--rail');

      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = this.slides[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var slide = _step.value;

          slide.classList.add('calisto--slide');
          this._rail.appendChild(slide);
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }

      this.container.appendChild(this._rail);
    }
  }, {
    key: 'goToSlide',
    value: function goToSlide(index) {
      var transition = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
      var vertical = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

      if (transition === true) {
        this._transition = 'transform ' + this.speed + ' linear';
      } else {
        this._transition = 'none';
      }

      var tx = vertical == false ? -Math.abs(100 * index) + '%' : '0px';
      var ty = vertical == true ? 100 * (index / this.length) : '0px';
      var tz = '0px';

      console.log(tx);

      this._transform = 'translate3d(' + tx + ',' + ty + ',' + tz + ')';

      this._rail.style.transform = this._transform;
      this._rail.style.webkitTransform = this._transform;

      this._rail.style.transition = this._transition;
      this._rail.style.webkitTransition = this._transition;
    }
  }]);

  return Calisto;
}();

exports.Calisto = Calisto;

},{}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Calisto = undefined;

var _component = require('./component');

exports.Calisto = _component.Calisto;

},{"./component":1}],3:[function(require,module,exports){
'use strict';

var _calisto = require('./calisto');

var slider = new _calisto.Calisto({
  infinite: true,
  container: document.getElementById('slider-1')
});

},{"./calisto":2}]},{},[3])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvc2NyaXB0cy9jYWxpc3RvL2NvbXBvbmVudC5qcyIsInNyYy9zY3JpcHRzL2NhbGlzdG8vaW5kZXguanMiLCJzcmMvc2NyaXB0cy9pbmRleC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7Ozs7SUNBTSxPO0FBQ0osbUJBQWEsUUFBYixFQUF3QjtBQUFBOztBQUV0QixTQUFLLFNBQUwsR0FBaUIsU0FBUyxTQUFULElBQXNCLEtBQXZDOztBQUVBLFFBQUksS0FBSyxTQUFMLEtBQW1CLEtBQXZCLEVBQStCO0FBQzdCLGNBQVEsS0FBUixDQUFjLG9EQUFkO0FBQ0EsYUFBTyxLQUFQO0FBQ0Q7O0FBRUQ7QUFDQSxTQUFLLFFBQUwsR0FBZ0IsU0FBUyxRQUFULElBQXFCLElBQXJDO0FBQ0EsU0FBSyxNQUFMLEdBQWMsR0FBRyxLQUFILENBQVMsSUFBVCxDQUFlLEtBQUssU0FBTCxDQUFlLFFBQTlCLEtBQTRDLEtBQTFELENBWHNCLENBVzJDO0FBQ2pFLFNBQUssTUFBTCxHQUFjLEtBQUssTUFBTCxDQUFZLE1BQTFCO0FBQ0EsU0FBSyxLQUFMLEdBQWEsU0FBUyxLQUFULElBQWtCLE9BQS9COztBQUVBLFlBQVEsR0FBUixDQUFZLEtBQUssTUFBakI7O0FBRUEsU0FBSyxJQUFMOztBQUVBLFNBQUssU0FBTCxDQUFlLENBQWY7QUFFRDs7OzsyQkFFTTtBQUNMLFdBQUssU0FBTCxDQUFlLFNBQWYsQ0FBeUIsR0FBekIsQ0FBNkIsU0FBN0I7O0FBRUEsV0FBSyxLQUFMLEdBQWEsU0FBUyxhQUFULENBQXVCLEtBQXZCLENBQWI7QUFDQSxXQUFLLEtBQUwsQ0FBVyxTQUFYLENBQXFCLEdBQXJCLENBQXlCLGVBQXpCOztBQUpLO0FBQUE7QUFBQTs7QUFBQTtBQU1MLDZCQUFrQixLQUFLLE1BQXZCLDhIQUFnQztBQUFBLGNBQXZCLEtBQXVCOztBQUM5QixnQkFBTSxTQUFOLENBQWdCLEdBQWhCLENBQW9CLGdCQUFwQjtBQUNBLGVBQUssS0FBTCxDQUFXLFdBQVgsQ0FBd0IsS0FBeEI7QUFDRDtBQVRJO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7O0FBV0wsV0FBSyxTQUFMLENBQWUsV0FBZixDQUEyQixLQUFLLEtBQWhDO0FBQ0Q7Ozs4QkFFVSxLLEVBQTZDO0FBQUEsVUFBdEMsVUFBc0MsdUVBQXpCLElBQXlCO0FBQUEsVUFBbkIsUUFBbUIsdUVBQVIsS0FBUTs7QUFDdEQsVUFBSSxlQUFlLElBQW5CLEVBQTBCO0FBQ3hCLGFBQUssV0FBTCxHQUFtQixlQUFlLEtBQUssS0FBcEIsR0FBNEIsU0FBL0M7QUFDRCxPQUZELE1BRU87QUFDTCxhQUFLLFdBQUwsR0FBbUIsTUFBbkI7QUFDRDs7QUFFRCxVQUFJLEtBQU8sWUFBWSxLQUFkLEdBQXdCLENBQUMsS0FBSyxHQUFMLENBQVUsTUFBUSxLQUFsQixDQUFELEdBQStCLEdBQXZELEdBQTZELEtBQXRFO0FBQ0EsVUFBSSxLQUFPLFlBQVksSUFBZCxHQUF1QixPQUFRLFFBQVEsS0FBSyxNQUFyQixDQUF2QixHQUF1RCxLQUFoRTtBQUNBLFVBQUksS0FBSyxLQUFUOztBQUVBLGNBQVEsR0FBUixDQUFZLEVBQVo7O0FBRUEsV0FBSyxVQUFMLEdBQWtCLGlCQUFpQixFQUFqQixHQUFxQixHQUFyQixHQUEyQixFQUEzQixHQUErQixHQUEvQixHQUFvQyxFQUFwQyxHQUF3QyxHQUExRDs7QUFFQSxXQUFLLEtBQUwsQ0FBVyxLQUFYLENBQWlCLFNBQWpCLEdBQTZCLEtBQUssVUFBbEM7QUFDQSxXQUFLLEtBQUwsQ0FBVyxLQUFYLENBQWlCLGVBQWpCLEdBQW1DLEtBQUssVUFBeEM7O0FBRUEsV0FBSyxLQUFMLENBQVcsS0FBWCxDQUFpQixVQUFqQixHQUE4QixLQUFLLFdBQW5DO0FBQ0EsV0FBSyxLQUFMLENBQVcsS0FBWCxDQUFpQixnQkFBakIsR0FBb0MsS0FBSyxXQUF6QztBQUdEOzs7Ozs7UUFNTSxPLEdBQUEsTzs7Ozs7Ozs7OztBQ2xFVDs7UUFDUyxPOzs7OztBQ0RUOztBQUVBLElBQU0sU0FBUyxxQkFBWTtBQUN6QixZQUFXLElBRGM7QUFFekIsYUFBVyxTQUFTLGNBQVQsQ0FBd0IsVUFBeEI7QUFGYyxDQUFaLENBQWYiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiY2xhc3MgQ2FsaXN0byB7XG4gIGNvbnN0cnVjdG9yKCBzZXR0aW5ncyApIHtcblxuICAgIHRoaXMuY29udGFpbmVyID0gc2V0dGluZ3MuY29udGFpbmVyIHx8IGZhbHNlO1xuXG4gICAgaWYoIHRoaXMuY29udGFpbmVyID09PSBmYWxzZSApIHtcbiAgICAgIGNvbnNvbGUuZXJyb3IoJ1lvdSBtdXN0IGNob29zZSBhIGNvbnRhaW5lciB0byBpbml0aWFsaXplIENhbGlzdG8uJyk7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgLy8gcHVibGljIHZhcmlhYmxlc1xuICAgIHRoaXMuaW5maW5pdGUgPSBzZXR0aW5ncy5pbmZpbml0ZSB8fCB0cnVlO1xuICAgIHRoaXMuc2xpZGVzID0gW10uc2xpY2UuY2FsbCggdGhpcy5jb250YWluZXIuY2hpbGRyZW4gKSB8fCBmYWxzZTsgLy8gY29udmVyc3QgaHRtbG9iamVjdCB0byBhcnJheVxuICAgIHRoaXMubGVuZ3RoID0gdGhpcy5zbGlkZXMubGVuZ3RoO1xuICAgIHRoaXMuc3BlZWQgPSBzZXR0aW5ncy5zcGVlZCB8fCAnMzAwbXMnO1xuXG4gICAgY29uc29sZS5sb2codGhpcy5zbGlkZXMpO1xuXG4gICAgdGhpcy53cmFwKCk7XG5cbiAgICB0aGlzLmdvVG9TbGlkZSgwKTtcblxuICB9XG5cbiAgd3JhcCgpIHtcbiAgICB0aGlzLmNvbnRhaW5lci5jbGFzc0xpc3QuYWRkKCdjYWxpc3RvJyk7XG5cbiAgICB0aGlzLl9yYWlsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgdGhpcy5fcmFpbC5jbGFzc0xpc3QuYWRkKCdjYWxpc3RvLS1yYWlsJyk7XG5cbiAgICBmb3IoIGxldCBzbGlkZSBvZiB0aGlzLnNsaWRlcyApIHtcbiAgICAgIHNsaWRlLmNsYXNzTGlzdC5hZGQoJ2NhbGlzdG8tLXNsaWRlJyk7XG4gICAgICB0aGlzLl9yYWlsLmFwcGVuZENoaWxkKCBzbGlkZSApO1xuICAgIH1cblxuICAgIHRoaXMuY29udGFpbmVyLmFwcGVuZENoaWxkKHRoaXMuX3JhaWwpO1xuICB9XG5cbiAgZ29Ub1NsaWRlKCBpbmRleCwgdHJhbnNpdGlvbiA9IHRydWUsIHZlcnRpY2FsID0gZmFsc2UgKSB7XG4gICAgaWYoIHRyYW5zaXRpb24gPT09IHRydWUgKSB7XG4gICAgICB0aGlzLl90cmFuc2l0aW9uID0gJ3RyYW5zZm9ybSAnICsgdGhpcy5zcGVlZCArICcgbGluZWFyJztcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5fdHJhbnNpdGlvbiA9ICdub25lJztcbiAgICB9XG5cbiAgICBsZXQgdHggPSAoIHZlcnRpY2FsID09IGZhbHNlICkgPyAtTWF0aC5hYnMoIDEwMCAqICggaW5kZXggKSApICsgJyUnIDogJzBweCc7XG4gICAgbGV0IHR5ID0gKCB2ZXJ0aWNhbCA9PSB0cnVlICkgPyAxMDAgKiAoIGluZGV4IC8gdGhpcy5sZW5ndGggKSA6ICcwcHgnO1xuICAgIGxldCB0eiA9ICcwcHgnO1xuXG4gICAgY29uc29sZS5sb2codHgpO1xuXG4gICAgdGhpcy5fdHJhbnNmb3JtID0gJ3RyYW5zbGF0ZTNkKCcgKyB0eCArJywnICsgdHkgKycsJysgdHogKycpJztcblxuICAgIHRoaXMuX3JhaWwuc3R5bGUudHJhbnNmb3JtID0gdGhpcy5fdHJhbnNmb3JtO1xuICAgIHRoaXMuX3JhaWwuc3R5bGUud2Via2l0VHJhbnNmb3JtID0gdGhpcy5fdHJhbnNmb3JtO1xuXG4gICAgdGhpcy5fcmFpbC5zdHlsZS50cmFuc2l0aW9uID0gdGhpcy5fdHJhbnNpdGlvbjtcbiAgICB0aGlzLl9yYWlsLnN0eWxlLndlYmtpdFRyYW5zaXRpb24gPSB0aGlzLl90cmFuc2l0aW9uO1xuXG5cbiAgfVxuXG5cblxufVxuXG5leHBvcnQgeyBDYWxpc3RvIH07XG4iLCJpbXBvcnQgeyBDYWxpc3RvIH0gZnJvbSAnLi9jb21wb25lbnQnO1xuZXhwb3J0IHsgQ2FsaXN0byB9O1xuIiwiaW1wb3J0IHsgQ2FsaXN0byB9IGZyb20gJy4vY2FsaXN0byc7XG5cbmNvbnN0IHNsaWRlciA9IG5ldyBDYWxpc3RvKHtcbiAgaW5maW5pdGUgOiB0cnVlLFxuICBjb250YWluZXI6IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzbGlkZXItMScpXG59KTtcbiJdfQ==
