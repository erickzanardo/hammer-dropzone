(function($) {
    $.fn.hammerDropZone = function(dropZoneSelector, onDrop) {
        
        $(this).each(function() {
            
            
            
            var hammertime = Hammer(this);
            var obj = null;
            var middleX;
            var middleY;

            var dropZones = $(dropZoneSelector);
            var dropZonesObjs = [];

            
            var currPos = function(evt) {
                return {
                    currX: evt.center.x - middleX,
                    currY: evt.center.y - middleY
                };
            };
            
            var verifyDropZoneBounds = function(pos, onHit, onMiss) {
                for (var i = 0; i < dropZonesObjs.length; i++) {
                    var dz = dropZonesObjs[i];

                    if (((pos.currX >= dz.x && pos.currX <= dz.x2) && (pos.currY >= dz.y && pos.currY <= dz.y2))) {
                        if (onHit) {
                            onHit(dz);
                        }
                    } else {
                        if (onMiss) {
                            onMiss(dz);
                        }
                    }
                }
            };
            
            hammertime.on('panstart', function(evt) {

                // Calculate the dropzones bounds
                dropZones.each(function() {
                    var me = $(this);
                    var offset = me.offset();

                    var x = offset.left;
                    var x2 = x + me.width();

                    var y = offset.top;
                    var y2 = y + me.height();

                    dropZonesObjs.push({
                        obj: me,
                        x: x,
                        x2: x2,
                        y: y,
                        y2: y2
                    });
                });
                
                var panObject = $(evt.target);
                var clone;
                if (panObject.is('.droppable')) {
                    clone = panObject.clone();
                } else {
                    clone = panObject.parents('.droppable').clone();
                }
                
                obj = clone.appendTo('body');
                obj.css('position', 'absolute');
                middleX = obj.width() / 2;
                middleY = obj.height() / 2;
                
                $(dropZoneSelector).addClass('drop-zone-target');
                
                evt.preventDefault();
            });

            hammertime.on('pan', function(evt) {
                obj.css('left', evt.center.x - middleX);
                obj.css('top', evt.center.y - middleY);
                
                var pos = currPos(evt);
                verifyDropZoneBounds(pos, function(dz) {
                    if (!dz.obj.is('.drop-zone-target-hover')) {
                        dz.obj.addClass('drop-zone-target-hover')
                    }
                }, function(dz) {
                    if (dz.obj.is('.drop-zone-target-hover')) {
                        dz.obj.removeClass('drop-zone-target-hover')
                    }
                });
                
                evt.preventDefault();
            });

            hammertime.on('panend', function(evt) {
                dropZones.removeClass('drop-zone-target');
                dropZones.removeClass('drop-zone-target-hover');
                var hit = false;

                var pos = currPos(evt);
                verifyDropZoneBounds(pos, function(dz) {
                    hit = true;
                    onDrop(obj, dz.obj);
                });

                if (!hit) {
                    obj.remove();
                }
            });
        });
    };
})(jQuery);