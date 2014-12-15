(function($) {
    $.fn.hammerDropZone = function(dropZoneSelector, onDrop) {
        
        $(this).each(function() {
            var hammertime = Hammer(this);
            var obj = null;
            var middleX;
            var middleY;

            hammertime.on('panstart', function(evt) {
                obj = $(evt.target).clone().appendTo('body');
                obj.css('position', 'absolute');
                middleX = obj.width() / 2;
                middleY = obj.height() / 2;
            });

            hammertime.on('pan', function(evt) {
                obj.css('left', evt.center.x - middleX);
                obj.css('top', evt.center.y - middleY);
            });

            hammertime.on('panend', function(evt) {
                var dropZones = $(dropZoneSelector);
                var hit = false;
                dropZones.each(function() {
                    var me = $(this);
                    var offset = me.offset();

                    var x = offset.left;
                    var x2 = x + me.width();

                    var y = offset.top;
                    var y2 = y + me.height();

                    var currX = evt.center.x - middleX;
                    var currY = evt.center.y - middleY;

                    if (((currX >= x && currX <= x2) && (currY >= y && currY <= y2))) {
                        hit = true;
                        onDrop(obj, me);
                    }
                });
                if (!hit) {
                    obj.remove();
                }
            });
        });
    };
})(jQuery);