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
                video.wrap('<div class="viddy_video_wrap" style="width:'+width+'px; height:'+height+'px;" />');
                video.after('<img class="viddy_video_still" src="'+ image +'" style="width:'+width+'px; height:'+height+'px;" />\
															<img src="'+config.playIcon+'" id="viddy_play_icon" style="margin:-'+height/16+'px 0 0 -'+width/16+'px"/>');

                $('#viddy_play_icon').live('click', function(){
										$(this).parent().find('video')[0].play();
                    $(this).parent().find('img').remove();
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
