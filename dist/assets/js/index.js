(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

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
    this.slideStart = settings.slideStart || 0;
    this.controls = settings.controls || true;
    this.currentSlide = this.slideStart;

    this._max = this.length - 1;
    this._min = 0;

    console.log(this.slides);

    this.wrap();

    this.goToSlide(this.slideStart, false);

    if (this.controls == true) {
      this.appendControls();
    }
  }

  _createClass(Calisto, [{
    key: 'wrap',
    value: function wrap() {
      this.container.style.position = 'relative';

      this._rail = document.createElement('div');
      this._rail.classList.add('calisto--rail');

      var before = this.slides[this.length - 1].cloneNode(true);
      before.classList.add('calisto--slide');
      before.classList.add('calisto--clone');
      before.setAttribute('data-index', -1);

      this._rail.appendChild(before);

      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = this.slides.entries()[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var _step$value = _slicedToArray(_step.value, 2),
              index = _step$value[0],
              slide = _step$value[1];

          slide.classList.add('calisto--slide');
          slide.setAttribute('data-index', index);
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

      var after = this.slides[0].cloneNode(true);
      after.classList.add('calisto--slide');
      after.classList.add('calisto--clone');
      after.setAttribute('data-index', this.length);

      this._rail.appendChild(after);

      var wrap = document.createElement('div');
      wrap.classList.add('calisto');

      wrap.appendChild(this._rail);

      this.container.appendChild(wrap);
    }
  }, {
    key: 'goToSlide',
    value: function goToSlide(index) {
      var _this = this;

      var transition = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
      var vertical = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

      this.currentSlide = index;
      console.log(this.currentSlide);
      index = this.infinite == true ? index + 1 : index;

      var active = document.querySelector('.calisto--slide.calisto--active');
      if (active) {
        active.classList.remove('calisto--active');
      }

      if (document.querySelector('[data-index="' + this.currentSlide + '"]')) {
        document.querySelector('[data-index="' + this.currentSlide + '"]').classList.add('calisto--active');
      }

      var tx = vertical == false ? -Math.abs(index * 100) + '%' : '0px';
      var ty = vertical == true ? -Math.abs(index * 100) + '%' : '0px';
      var tz = '0px';

      this._transform = 'translate3d(' + tx + ',' + ty + ',' + tz + ')';

      this._rail.style.transform = this._transform;
      this._rail.style.webkitTransform = this._transform;

      if (transition == true) {
        this._rail.style.transition = 'transform ' + this.speed + ' linear';;
        this._rail.style.webkitTransition = 'transform ' + this.speed + ' linear';;
      }

      this._rail.addEventListener('transitionend', function () {
        _this._rail.style.transition = 'transform 0s linear';
        _this._rail.style.webkitTransition = 'transform 0s linear';
      }, false);
    }
  }, {
    key: 'appendControls',
    value: function appendControls() {
      var _this2 = this;

      var controls = document.createElement('div');
      controls.classList.add('calisto--controls');

      var controlNext = document.createElement('div');
      controlNext.classList.add('control');
      controlNext.classList.add('control--next');
      controlNext.addEventListener('click', function () {
        _this2.goToNextSlide();
      });

      controls.appendChild(controlNext);

      var controlPrev = document.createElement('div');
      controlPrev.classList.add('control');
      controlPrev.classList.add('control--prev');
      controlPrev.addEventListener('click', function () {
        _this2.goToPrevSlide();
      });

      controls.appendChild(controlPrev);

      this.container.appendChild(controls);
    }
  }, {
    key: 'goToNextSlide',
    value: function goToNextSlide() {
      var _this3 = this;

      var _infinite = function _infinite() {
        _this3.goToSlide(_this3._min, false);
        _this3._rail.removeEventListener('transitionend', _infinite, false);
      };

      if (this.currentSlide >= this._max) {

        if (this.infinite != true) {
          return false;
        }

        this.goToSlide(this._max);
        this._rail.addEventListener('transitionend', _infinite, false);
      }

      this.goToSlide(++this.currentSlide);
      console.log(this.currentSlide);
    }
  }, {
    key: 'goToPrevSlide',
    value: function goToPrevSlide() {
      var _this4 = this;

      var _infinite = function _infinite() {
        _this4.goToSlide(_this4._max, false);
        _this4._rail.removeEventListener('transitionend', _infinite, false);
      };

      if (this.currentSlide <= this._min) {

        if (this.infinite != true) {
          return false;
        }

        this.goToSlide(this._min);
        this._rail.addEventListener('transitionend', _infinite, false);
      }

      this.goToSlide(--this.currentSlide);
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

window.Calisto = _calisto.Calisto; // make Calisto public

window.slider = new _calisto.Calisto({
  infinite: true,
  container: document.getElementById('slider-1')
});

},{"./calisto":2}]},{},[3])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvc2NyaXB0cy9jYWxpc3RvL2NvbXBvbmVudC5qcyIsInNyYy9zY3JpcHRzL2NhbGlzdG8vaW5kZXguanMiLCJzcmMvc2NyaXB0cy9pbmRleC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7Ozs7OztJQ0FNLE87QUFDSixtQkFBYSxRQUFiLEVBQXdCO0FBQUE7O0FBRXRCLFNBQUssU0FBTCxHQUFpQixTQUFTLFNBQVQsSUFBc0IsS0FBdkM7O0FBRUEsUUFBSSxLQUFLLFNBQUwsS0FBbUIsS0FBdkIsRUFBK0I7QUFDN0IsY0FBUSxLQUFSLENBQWMsb0RBQWQ7QUFDQSxhQUFPLEtBQVA7QUFDRDs7QUFFRDtBQUNBLFNBQUssUUFBTCxHQUFnQixTQUFTLFFBQVQsSUFBcUIsSUFBckM7QUFDQSxTQUFLLE1BQUwsR0FBYyxHQUFHLEtBQUgsQ0FBUyxJQUFULENBQWUsS0FBSyxTQUFMLENBQWUsUUFBOUIsS0FBNEMsS0FBMUQsQ0FYc0IsQ0FXMkM7QUFDakUsU0FBSyxNQUFMLEdBQWMsS0FBSyxNQUFMLENBQVksTUFBMUI7QUFDQSxTQUFLLEtBQUwsR0FBYSxTQUFTLEtBQVQsSUFBa0IsT0FBL0I7QUFDQSxTQUFLLFVBQUwsR0FBa0IsU0FBUyxVQUFULElBQXVCLENBQXpDO0FBQ0EsU0FBSyxRQUFMLEdBQWdCLFNBQVMsUUFBVCxJQUFxQixJQUFyQztBQUNBLFNBQUssWUFBTCxHQUFvQixLQUFLLFVBQXpCOztBQUVBLFNBQUssSUFBTCxHQUFjLEtBQUssTUFBTCxHQUFjLENBQTVCO0FBQ0EsU0FBSyxJQUFMLEdBQVksQ0FBWjs7QUFFQSxZQUFRLEdBQVIsQ0FBWSxLQUFLLE1BQWpCOztBQUVBLFNBQUssSUFBTDs7QUFFQSxTQUFLLFNBQUwsQ0FBZSxLQUFLLFVBQXBCLEVBQWdDLEtBQWhDOztBQUVBLFFBQUksS0FBSyxRQUFMLElBQWlCLElBQXJCLEVBQTRCO0FB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aUIsSUFBckIsRUFBNEI7QUFDMUIsaUJBQU8sS0FBUDtBQUNEOztBQUVELGFBQUssU0FBTCxDQUFnQixLQUFLLElBQXJCO0FBQ0EsYUFBSyxLQUFMLENBQVcsZ0JBQVgsQ0FBNEIsZUFBNUIsRUFBNkMsU0FBN0MsRUFBd0QsS0FBeEQ7QUFDRDs7QUFFRCxXQUFLLFNBQUwsQ0FBZ0IsRUFBRSxLQUFLLFlBQXZCO0FBQ0Q7Ozs7OztRQUlNLE8sR0FBQSxPOzs7Ozs7Ozs7O0FDOUtUOztRQUNTLE87Ozs7O0FDRFQ7O0FBRUEsT0FBTyxPQUFQLG9CLENBQTBCOztBQUUxQixPQUFPLE1BQVAsR0FBZ0IscUJBQVk7QUFDMUIsWUFBVyxJQURlO0FBRTFCLGFBQVcsU0FBUyxjQUFULENBQXdCLFVBQXhCO0FBRmUsQ0FBWixDQUFoQiIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJjbGFzcyBDYWxpc3RvIHtcbiAgY29uc3RydWN0b3IoIHNldHRpbmdzICkge1xuXG4gICAgdGhpcy5jb250YWluZXIgPSBzZXR0aW5ncy5jb250YWluZXIgfHwgZmFsc2U7XG5cbiAgICBpZiggdGhpcy5jb250YWluZXIgPT09IGZhbHNlICkge1xuICAgICAgY29uc29sZS5lcnJvcignWW91IG11c3QgY2hvb3NlIGEgY29udGFpbmVyIHRvIGluaXRpYWxpemUgQ2FsaXN0by4nKTtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICAvLyBwdWJsaWMgdmFyaWFibGVzXG4gICAgdGhpcy5pbmZpbml0ZSA9IHNldHRpbmdzLmluZmluaXRlIHx8IHRydWU7XG4gICAgdGhpcy5zbGlkZXMgPSBbXS5zbGljZS5jYWxsKCB0aGlzLmNvbnRhaW5lci5jaGlsZHJlbiApIHx8IGZhbHNlOyAvLyBjb252ZXJzdCBodG1sb2JqZWN0IHRvIGFycmF5XG4gICAgdGhpcy5sZW5ndGggPSB0aGlzLnNsaWRlcy5sZW5ndGg7XG4gICAgdGhpcy5zcGVlZCA9IHNldHRpbmdzLnNwZWVkIHx8ICczMDBtcyc7XG4gICAgdGhpcy5zbGlkZVN0YXJ0ID0gc2V0dGluZ3Muc2xpZGVTdGFydCB8fCAwO1xuICAgIHRoaXMuY29udHJvbHMgPSBzZXR0aW5ncy5jb250cm9scyB8fCB0cnVlO1xuICAgIHRoaXMuY3VycmVudFNsaWRlID0gdGhpcy5zbGlkZVN0YXJ0O1xuXG4gICAgdGhpcy5fbWF4ID0gKCB0aGlzLmxlbmd0aCAtIDEgKTtcbiAgICB0aGlzLl9taW4gPSAwO1xuXG4gICAgY29uc29sZS5sb2codGhpcy5zbGlkZXMpO1xuXG4gICAgdGhpcy53cmFwKCk7XG5cbiAgICB0aGlzLmdvVG9TbGlkZSh0aGlzLnNsaWRlU3RhcnQsIGZhbHNlKTtcblxuICAgIGlmKCB0aGlzLmNvbnRyb2xzID09IHRydWUgKSB7XG4gICAgICB0aGlzLmFwcGVuZENvbnRyb2xzKCk7XG4gICAgfVxuXG4gIH1cblxuICB3cmFwKCkge1xuICAgIHRoaXMuY29udGFpbmVyLnN0eWxlLnBvc2l0aW9uID0gJ3JlbGF0aXZlJztcblxuICAgIHRoaXMuX3JhaWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICB0aGlzLl9yYWlsLmNsYXNzTGlzdC5hZGQoJ2NhbGlzdG8tLXJhaWwnKTtcblxuICAgIGNvbnN0IGJlZm9yZSA9IHRoaXMuc2xpZGVzWyB0aGlzLmxlbmd0aCAtIDEgXS5jbG9uZU5vZGUodHJ1ZSk7XG4gICAgICAgICAgYmVmb3JlLmNsYXNzTGlzdC5hZGQoJ2NhbGlzdG8tLXNsaWRlJyk7XG4gICAgICAgICAgYmVmb3JlLmNsYXNzTGlzdC5hZGQoJ2NhbGlzdG8tLWNsb25lJyk7XG4gICAgICAgICAgYmVmb3JlLnNldEF0dHJpYnV0ZSgnZGF0YS1pbmRleCcsIC0xICk7XG5cbiAgICB0aGlzLl9yYWlsLmFwcGVuZENoaWxkKGJlZm9yZSk7XG5cbiAgICBmb3IoIGxldCBbaW5kZXgsIHNsaWRlXSBvZiB0aGlzLnNsaWRlcy5lbnRyaWVzKCkgKSB7XG4gICAgICBzbGlkZS5jbGFzc0xpc3QuYWRkKCdjYWxpc3RvLS1zbGlkZScpO1xuICAgICAgc2xpZGUuc2V0QXR0cmlidXRlKCdkYXRhLWluZGV4JywgaW5kZXggKVxuICAgICAgdGhpcy5fcmFpbC5hcHBlbmRDaGlsZCggc2xpZGUgKTtcbiAgICB9XG5cbiAgICBjb25zdCBhZnRlciA9IHRoaXMuc2xpZGVzWzBdLmNsb25lTm9kZSh0cnVlKTtcbiAgICAgICAgICBhZnRlci5jbGFzc0xpc3QuYWRkKCdjYWxpc3RvLS1zbGlkZScpO1xuICAgICAgICAgIGFmdGVyLmNsYXNzTGlzdC5hZGQoJ2NhbGlzdG8tLWNsb25lJyk7XG4gICAgICAgICAgYWZ0ZXIuc2V0QXR0cmlidXRlKCdkYXRhLWluZGV4JywgdGhpcy5sZW5ndGggKTtcblxuICAgIHRoaXMuX3JhaWwuYXBwZW5kQ2hpbGQoYWZ0ZXIpO1xuXG4gICAgY29uc3Qgd3JhcCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICAgIHdyYXAuY2xhc3NMaXN0LmFkZCgnY2FsaXN0bycpO1xuXG4gICAgd3JhcC5hcHBlbmRDaGlsZCh0aGlzLl9yYWlsKTtcblxuICAgIHRoaXMuY29udGFpbmVyLmFwcGVuZENoaWxkKHdyYXApO1xuICB9XG5cbiAgZ29Ub1NsaWRlKCBpbmRleCwgdHJhbnNpdGlvbiA9IHRydWUsIHZlcnRpY2FsID0gZmFsc2UgKSB7XG4gICAgdGhpcy5jdXJyZW50U2xpZGUgPSBpbmRleDtcbiAgICBjb25zb2xlLmxvZyh0aGlzLmN1cnJlbnRTbGlkZSk7XG4gICAgaW5kZXggPSAoIHRoaXMuaW5maW5pdGUgPT0gdHJ1ZSApID8gaW5kZXggKyAxIDogaW5kZXg7XG5cbiAgICBjb25zdCBhY3RpdmUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuY2FsaXN0by0tc2xpZGUuY2FsaXN0by0tYWN0aXZlJyk7XG4gICAgaWYoIGFjdGl2ZSApIHtcbiAgICAgIGFjdGl2ZS5jbGFzc0xpc3QucmVtb3ZlKCdjYWxpc3RvLS1hY3RpdmUnKTtcbiAgICB9XG5cbiAgICBpZiggZG9jdW1lbnQucXVlcnlTZWxlY3RvcignW2RhdGEtaW5kZXg9XCInK3RoaXMuY3VycmVudFNsaWRlKydcIl0nKSApIHtcbiAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLWluZGV4PVwiJyt0aGlzLmN1cnJlbnRTbGlkZSsnXCJdJykuY2xhc3NMaXN0LmFkZCgnY2FsaXN0by0tYWN0aXZlJyk7XG4gICAgfVxuXG4gICAgbGV0IHR4ID0gKCB2ZXJ0aWNhbCA9PSBmYWxzZSApID8gLU1hdGguYWJzKCBpbmRleCAqIDEwMCApICsgJyUnIDogJzBweCc7XG4gICAgbGV0IHR5ID0gKCB2ZXJ0aWNhbCA9PSB0cnVlICkgPyAtTWF0aC5hYnMoIGluZGV4ICogMTAwICkgKyAnJScgOiAnMHB4JztcbiAgICBsZXQgdHogPSAnMHB4JztcblxuICAgIHRoaXMuX3RyYW5zZm9ybSA9ICd0cmFuc2xhdGUzZCgnICsgdHggKycsJyArIHR5ICsnLCcrIHR6ICsnKSc7XG5cbiAgICB0aGlzLl9yYWlsLnN0eWxlLnRyYW5zZm9ybSA9IHRoaXMuX3RyYW5zZm9ybTtcbiAgICB0aGlzLl9yYWlsLnN0eWxlLndlYmtpdFRyYW5zZm9ybSA9IHRoaXMuX3RyYW5zZm9ybTtcblxuICAgIGlmKCB0cmFuc2l0aW9uID09IHRydWUgKSB7XG4gICAgICB0aGlzLl9yYWlsLnN0eWxlLnRyYW5zaXRpb24gPSAndHJhbnNmb3JtICcgKyB0aGlzLnNwZWVkICsgJyBsaW5lYXInOztcbiAgICAgIHRoaXMuX3JhaWwuc3R5bGUud2Via2l0VHJhbnNpdGlvbiA9ICd0cmFuc2Zvcm0gJyArIHRoaXMuc3BlZWQgKyAnIGxpbmVhcic7O1xuICAgIH1cblxuICAgIHRoaXMuX3JhaWwuYWRkRXZlbnRMaXN0ZW5lcigndHJhbnNpdGlvbmVuZCcsICgpID0+IHtcbiAgICAgIHRoaXMuX3JhaWwuc3R5bGUudHJhbnNpdGlvbiA9ICd0cmFuc2Zvcm0gMHMgbGluZWFyJztcbiAgICAgIHRoaXMuX3JhaWwuc3R5bGUud2Via2l0VHJhbnNpdGlvbiA9ICd0cmFuc2Zvcm0gMHMgbGluZWFyJztcbiAgICB9LCBmYWxzZSk7XG5cbiAgfVxuXG4gIGFwcGVuZENvbnRyb2xzKCkge1xuXG4gICAgY29uc3QgY29udHJvbHMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgICBjb250cm9scy5jbGFzc0xpc3QuYWRkKCdjYWxpc3RvLS1jb250cm9scycpO1xuXG4gICAgY29uc3QgY29udHJvbE5leHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgICAgICBjb250cm9sTmV4dC5jbGFzc0xpc3QuYWRkKCdjb250cm9sJyk7XG4gICAgICAgICAgY29udHJvbE5leHQuY2xhc3NMaXN0LmFkZCgnY29udHJvbC0tbmV4dCcpO1xuICAgICAgICAgIGNvbnRyb2xOZXh0LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5nb1RvTmV4dFNsaWRlKCk7XG4gICAgICAgICAgfSk7XG5cbiAgICBjb250cm9scy5hcHBlbmRDaGlsZChjb250cm9sTmV4dCk7XG5cblxuICAgIGNvbnN0IGNvbnRyb2xQcmV2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgICAgY29udHJvbFByZXYuY2xhc3NMaXN0LmFkZCgnY29udHJvbCcpO1xuICAgICAgICAgIGNvbnRyb2xQcmV2LmNsYXNzTGlzdC5hZGQoJ2NvbnRyb2wtLXByZXYnKTtcbiAgICAgICAgICBjb250cm9sUHJldi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgICAgICAgIHRoaXMuZ29Ub1ByZXZTbGlkZSgpO1xuICAgICAgICAgIH0pO1xuXG4gICAgY29udHJvbHMuYXBwZW5kQ2hpbGQoY29udHJvbFByZXYpO1xuXG4gICAgdGhpcy5jb250YWluZXIuYXBwZW5kQ2hpbGQoY29udHJvbHMpO1xuXG4gIH1cblxuICBnb1RvTmV4dFNsaWRlKCkge1xuXG4gICAgY29uc3QgX2luZmluaXRlID0gKCkgPT4ge1xuICAgICAgdGhpcy5nb1RvU2xpZGUodGhpcy5fbWluLCBmYWxzZSk7XG4gICAgICB0aGlzLl9yYWlsLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3RyYW5zaXRpb25lbmQnLCBfaW5maW5pdGUsIGZhbHNlKTtcbiAgICB9XG5cbiAgICBpZiggdGhpcy5jdXJyZW50U2xpZGUgPj0gdGhpcy5fbWF4ICApIHtcblxuICAgICAgaWYoIHRoaXMuaW5maW5pdGUgIT0gdHJ1ZSApIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuXG4gICAgICB0aGlzLmdvVG9TbGlkZSggdGhpcy5fbWF4ICk7XG4gICAgICB0aGlzLl9yYWlsLmFkZEV2ZW50TGlzdGVuZXIoJ3RyYW5zaXRpb25lbmQnLCBfaW5maW5pdGUsIGZhbHNlKTtcbiAgICB9XG5cbiAgICB0aGlzLmdvVG9TbGlkZSggKyt0aGlzLmN1cnJlbnRTbGlkZSApO1xuICAgIGNvbnNvbGUubG9nKHRoaXMuY3VycmVudFNsaWRlKTtcbiAgfVxuXG4gIGdvVG9QcmV2U2xpZGUoKSB7XG5cbiAgICBjb25zdCBfaW5maW5pdGUgPSAoKSA9PiB7XG4gICAgICB0aGlzLmdvVG9TbGlkZSh0aGlzLl9tYXgsIGZhbHNlKTtcbiAgICAgIHRoaXMuX3JhaWwucmVtb3ZlRXZlbnRMaXN0ZW5lcigndHJhbnNpdGlvbmVuZCcsIF9pbmZpbml0ZSwgZmFsc2UpO1xuICAgIH1cblxuICAgIGlmKCB0aGlzLmN1cnJlbnRTbGlkZSA8PSB0aGlzLl9taW4gICkge1xuXG4gICAgICBpZiggdGhpcy5pbmZpbml0ZSAhPSB0cnVlICkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG5cbiAgICAgIHRoaXMuZ29Ub1NsaWRlKCB0aGlzLl9taW4gKTtcbiAgICAgIHRoaXMuX3JhaWwuYWRkRXZlbnRMaXN0ZW5lcigndHJhbnNpdGlvbmVuZCcsIF9pbmZpbml0ZSwgZmFsc2UpO1xuICAgIH1cblxuICAgIHRoaXMuZ29Ub1NsaWRlKCAtLXRoaXMuY3VycmVudFNsaWRlICk7XG4gIH1cblxufVxuXG5leHBvcnQgeyBDYWxpc3RvIH07XG4iLCJpbXBvcnQgeyBDYWxpc3RvIH0gZnJvbSAnLi9jb21wb25lbnQnO1xuZXhwb3J0IHsgQ2FsaXN0byB9O1xuIiwiaW1wb3J0IHsgQ2FsaXN0byB9IGZyb20gJy4vY2FsaXN0byc7XG5cbndpbmRvdy5DYWxpc3RvID0gQ2FsaXN0bzsgLy8gbWFrZSBDYWxpc3RvIHB1YmxpY1xuXG53aW5kb3cuc2xpZGVyID0gbmV3IENhbGlzdG8oe1xuICBpbmZpbml0ZSA6IHRydWUsXG4gIGNvbnRhaW5lcjogZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3NsaWRlci0xJylcbn0pO1xuIl19
