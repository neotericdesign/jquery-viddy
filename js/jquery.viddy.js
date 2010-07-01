;(function($){
    $.fn.viddy =    function(options){
        var config = {
            playerPath: 'jwplayer.swf',
            playIcon: 'img/icon-play.png'
        };

        if(options) $.extend(config, options);

        // Browser ability detection. Returns boolean
        function canPlayMP4() {
            var vid = document.createElement("video");
            if ( typeof(vid.canPlayType) == 'undefined' || // detect browsers with no <video> support
            vid.canPlayType('video/mp4') == ''){
                return false;
            } else {
                return true;
            }
        }

        return this.each(function() {
            var video = $(this);
            var videoUrl = video.find('source').attr('src'),
                image = config.image || video.attr('poster'),
                height = config.height || video.height(),
                width = config.width || video.width();

            // Using feature detection
            if (canPlayMP4()) {
                video.wrap('<div class="video_wrap" style="position:relative; width:'+width+'; height:'+height+';" />');
                video.after('<img class="video_still" src="'+ image +'" style="cursor:pointer; position:absolute; top:5px; left:5px; width:'+width+'; height:'+height+';" />');

                $('.video_still').live('click', function(){
                    $(this).prev('video')[0].play();
                    $(this).remove();
                });

            } else { // Fallback to JWPlayer
                if(height < 150) height = 250;
                if (width < 250)  width = 400;

                // create flash container div
                var flashdiv = $('<div />');
                flashdiv.flash(
                    {
                        src: config.playerPath,
                        width: width,
                        height: height,
                        flashvars: { file: videoUrl, image: image }
                    },
                    { version: 8 }
                );

                // insert flash and remove video
                video.before(flashdiv);
                video.detach();
            }
        });
    };
})(jQuery);
