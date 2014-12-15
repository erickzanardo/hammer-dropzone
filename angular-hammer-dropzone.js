(function() {
    angular.module('hammerjs', []).directive('dropOnZone', function() {
        return {
            restrict: 'A',
            link: function(scope, elem, attrs) {
                var values = attrs.dropOnZone.split(',');
                var cssSelector = values[0] ? values[0].trim() : '';
                var callbackFunction = values[1] ? values[1].trim() : '';
             
                $(elem).hammerDropZone(cssSelector, function(cloneObj, dropZone) {
                    var _f = scope[callbackFunction];
                    scope.$apply(function() {
                        if (_f) {
                            _f(cloneObj, dropZone);
                        }
                    });
                });
            }
        }
    });
})();