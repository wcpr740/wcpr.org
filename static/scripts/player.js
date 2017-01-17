var STREAM_URL = 'http://740.wcpr.org:8080/stream128.mp3';

$("#player_toggle").jPlayer({
    ready: function () {
        $(this).jPlayer("setMedia", {
            title: "WCPR - Castle Point Radio",
            mp3: STREAM_URL
        });
    },
    swfPath: '/static/bower_components/jPlayer/dist/jquery.jplayer.swf',
    cssSelectorAncestor: "#player_toggle",
    supplied: "mp3",
    solution: "html, flash",
    useStateClassSkin: true,
    autoBlur: false,
    smoothPlayBar: true,
    keyEnabled: true
});
