var STREAM_URLS = [  // URLs cannot have params or cache-buster in setMediaURL() needs to be adjusted
    {
        'name': 'Low - 64kbps',
        'type': 'mp3',
        'url': 'https://740.wcpr.org:8080/stream64.mp3'
    },
    {
        'name': 'Med - 128kbps',
        'type': 'mp3',
        'url': 'https://740.wcpr.org:8080/stream128.mp3'
    },
    {
        'name': 'High - 320kbps',
        'type': 'mp3',
        'url': 'https://740.wcpr.org:8080/stream320.mp3'
    }
];
var player_obj = $("#streaming_player"),
    was_playing = false,
    default_stream = 1,
    playing_stream_index = default_stream;

player_obj.jPlayer({
    ready: function () {
        setMediaURL(default_stream);
    },
    swfPath: '/static/bower_components/jPlayer/dist/jquery.jplayer.swf',
    cssSelectorAncestor: "#jp_toggle_play",
    solution: "html,flash",
    useStateClassSkin: true,
    autoBlur: false,
    smoothPlayBar: true,
    keyEnabled: false,
    preload: 'none',
    volume: 1
});


function setPlayerLoading(yes) {
    var loading_icon = $('#play_disabled'),
        player_buttons = $('#jp_toggle_play');

    if (yes) {
        loading_icon.removeClass('hidden');
        player_buttons.addClass('hidden');
    }
    else {
        loading_icon.addClass('hidden');
        player_buttons.removeClass('hidden');
    }
}


function playStream() {
    was_playing = true;
    setPlayerLoading(true);
    setMediaURL(playing_stream_index);
    $(player_obj).jPlayer('play');
}

function stopStream() {
    was_playing = false;
    player_obj.jPlayer('clearMedia');
}

function onStreamToggleClick() {
    if (was_playing) {
        stopStream();
    }
    else {
        playStream();
    }
    closeListenNowNotification();
}

document.getElementById('jp_toggle_play').onclick = onStreamToggleClick;


player_obj.bind($.jPlayer.event.canplay, function() {
    // triggers after jPlayer has loaded the media URL
    setPlayerLoading(false);
});


function setMediaURL(index) {
    var params = {
        title: 'WCPR - Castle Point Radio'
    };
    params[STREAM_URLS[index]['type']] = STREAM_URLS[index]['url'] + '?_=' + Date.now();  // cache-buster

    $(player_obj).jPlayer("setMedia", params);
}


/*
 * Media selection buttons
 */


function onMediaSelectClick(selected_index) {
    var el = document.getElementById('quality_option_' + selected_index);
    if ($(el).hasClass('selected')) {
        return;
    }
    playing_stream_index = selected_index;

    if (was_playing) {
        playStream();
    }

    // change the quality buttons so the correct one has a checkmark and no others do
    var quality_buttons = document.getElementsByClassName('stream-quality-btn');
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

var listen_now_timeout = undefined;
function showListenNowNotification() {
    if (Cookies.get('notified')) {
        return;
    }
    var play_button = $('#jp_toggle_play');
    play_button.popover({
        'template': '<div class="popover popover-listen" role="tooltip"><div class="arrow"></div><div class="popover-content"></div></div>',
        'content': 'Click here to listen now!',
        'container': 'body',
        'placement': 'bottom',
        'trigger': 'manual',
        'delay': 1000
    });
    listen_now_timeout = setTimeout(function() {
        play_button.popover('show');
        Cookies.set('notified', 'yes', {expires: 365});
        setTimeout(closeListenNowNotification, 10000);
    }, 5000);
}

function closeListenNowNotification() {
    $('#jp_toggle_play').popover('hide');
    if (listen_now_timeout) {
        clearTimeout(listen_now_timeout);
    }
}

// When page is loaded, show notification to listen.
showListenNowNotification();


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
