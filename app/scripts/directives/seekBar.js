(function() {
  function seekBar($document) {

    /**
    * @function calculatePercent
    * @desc Calculates the percent of the seek bar based on where user clicks.
    */
    var calculatePercent = function(seekBar, event) {
      var offsetX = event.pageX - seekBar.offset().left;
      var seekBarWidth = seekBar.width();
      var offsetXPercent = offsetX / seekBarWidth;
      offsetXPercent = Math.max(0, offsetXPercent);
      offsetXPercent = Math.min(1, offsetXPercent);
      return offsetXPercent;
    };

    return {
      templateUrl: '/templates/directives/seek_bar.html',
      replace: true,
      restrict: 'E',
      scope: {
        onChange: '&'
      },
      link: function(scope, element, attributes) {
        // directive logic to return
        scope.value = 0;
        scope.max = 100;

        /**
        * @desc Seek bar node/element
        * @type {node}
        */
        var seekBar = $(element);

        attributes.$observe('value', function(newValue) {
          scope.value = newValue;
        });

        attributes.$observe('max', function(newValue) {
          scope.max = newValue;
        })

        /**
        * @function percentString
        * @desc returns the percentage of seek bar as a string
        * @returns {String}
        */
        var percentString = function() {
          var value = scope.value;
          var max = scope.max;
          var percent = value / max * 100;
          return percent + "%";
        };

        /**
        * @function scope.fillStyle
        * @desc returns a string with the CSS for the seek bar fill.
        * @returns {String}
        */
        scope.fillStyle = function() {
          return {width: percentString()};
        };

        /**
        * @function scope.thumbStyle
        * @desc Updates position of the thumb style CSS
        * @returns {String}
        */
        scope.thumbStyle = function() {
          return {left: percentString()};
        };

        /**
        * @function scope.onClickSeekBar
        * @desc click handler to calculate percent
        */
        scope.onClickSeekBar = function(event) {
          var percent = calculatePercent(seekBar, event);
          scope.value = percent * scope.max;
          notifyOnChange(scope.value);
        }

        /**
        * @function scope.trackThumb
        * @desc Click handler for click and drag of seek bar marker.
        */
        scope.trackThumb = function() {
          $document.bind('mousemove.thumb', function(event) {
            var percent = calculatePercent(seekBar, event);
            scope.$apply(function() {
              scope.value = percent * scope.max;
              notifyOnChange(scope.value);
            });
          });

          $document.bind('mouseup.thumb', function() {
            $document.unbind('mousemove.thumb');
            $document.unbind('mouseup.thumb');
          });
        };

        var notifyOnChange = function(newValue) {
          if (typeof scope.onChange === 'function') {
            scope.onChange({value: newValue});
          }
        };

      }
    };
  }

  angular
    .module('blocJams')
    .directive('seekBar', ['$document', seekBar]);
})();
