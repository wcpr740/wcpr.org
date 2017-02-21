var STREAM_URLS = [
    {
        'name': 'Low - 64kbps',
        'type': 'mp3',
        'url': 'http://740.wcpr.org:8080/stream64.mp3'
    },
    {
        'name': 'Med - 128kbps',
        'type': 'mp3',
        'url': 'http://740.wcpr.org:8080/stream128.mp3'
    },
    {
        'name': 'High - 320kbps',
        'type': 'mp3',
        'url': 'http://740.wcpr.org:8080/stream320.mp3'
    }
];
var player_obj = $("#streaming_player"),
    was_playing = false,
    default_stream = 1;

player_obj.jPlayer({
    ready: function () {
        setMediaURL(default_stream);
    },
    swfPath: '/static/bower_components/jPlayer/dist/jquery.jplayer.swf',
    cssSelectorAncestor: "#jp_container_1",
    solution: "html,flash",
    useStateClassSkin: true,
    autoBlur: false,
    smoothPlayBar: true,
    keyEnabled: true
});

player_obj.bind($.jPlayer.event.canplay, function() {
    $('#play_disabled').addClass('hidden');
    $('#jp_container_1').removeClass('hidden');
    if (was_playing) {  // occurs when a user changes quality while playing
        $(player_obj).jPlayer('play');
    }
});

player_obj.bind($.jPlayer.event.play, function() {
    was_playing = true;
});

player_obj.bind($.jPlayer.event.pause, function() {
    was_playing = false;
});

function setMediaURL(index) {
    var params = {
        title: 'WCPR - Castle Point Radio'
    };
    params[STREAM_URLS[index]['type']] = STREAM_URLS[index]['url'];

    $(player_obj).jPlayer("setMedia", params);
}

function onMediaSelectClick(selected_index) {
    var el = document.getElementById('quality_option_' + selected_index);
    if ($(el).hasClass('selected')) {
        return;
    }
    var quality_buttons = document.getElementsByClassName('stream-quality-btn');
    // change the media stream to the selected one
    setMediaURL(parseInt(selected_index));
    // hide the play button until the media is loaded
    $('#jp_container_1').addClass('hidden');
    $('#play_disabled').removeClass('hidden');

    // change the quality buttons so the correct one has a checkmark and no others do
    for (var i = 0; i < quality_buttons.length; i++) {
        if (quality_buttons[i] == el) {
            quality_buttons[i].className = 'stream-quality-btn selected';
        }
        else {
            quality_buttons[i].className = 'stream-quality-btn';
        }
    }
}

function generateQualityButtons() {
    /* Generate buttons to pick the quality from each option in STREAM_URLS.

     The format of a button is:
     <li>
         <a href="javascript:void(0)" className="stream-quality-btn"
            onclick="onMediaSelectClick(INDEX)">
             {NAME} <i class="fa fa-fw fa-check"></i>
         </a>
     </li>

     */
    var container = document.getElementById('quality_select_dropdown'),
        i, li_elem, a_elem;

    for (i = 0; i < STREAM_URLS.length; i++) {
        li_elem = document.createElement('li');

        a_elem = document.createElement('a');
        a_elem.id = 'quality_option_' + i;
        a_elem.innerHTML = STREAM_URLS[i]['name'] + ' <i class="fa fa-fw fa-check"></i>';
        a_elem.setAttribute('href', 'javascript:onMediaSelectClick(' + i + ');');

        if (i == default_stream) {
            a_elem.className = 'stream-quality-btn selected';
        }
        else {
            a_elem.className = 'stream-quality-btn'
        }

        li_elem.appendChild(a_elem);
        container.appendChild(li_elem);
    }
}

// When page is loaded, generate the quality buttons.
generateQualityButtons();

var CONFIRMATION_MESSAGE = "Leaving the page now will stop your music.\nAre you sure you want leave?",
    has_prompted_to_leave = 0;  // used to prevent multiple prompts


// If music is playing when the user tries to leave, warn the user.
window.onbeforeunload = function() {
    if (was_playing && has_prompted_to_leave == 0) {
        has_prompted_to_leave++;
        // setTimeout used prevent double prompting on most browsers,
        // while still resetting prompt each time it is called.
        setTimeout(function() {has_prompted_to_leave = 0}, 20);

        // custom message is not displayed on most browsers, but send it in case it is.
        return CONFIRMATION_MESSAGE;
    }
};
