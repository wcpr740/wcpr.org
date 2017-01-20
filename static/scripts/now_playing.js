var NOW_PLAYING_URL = 'http://web.stevens.edu/wcpr/now_playing.json',
    delay_on_error = 1000;

function loadNowPlaying() {
    $.ajax({
        'method': 'get',
        'url': NOW_PLAYING_URL,
        'dataType': 'json',
        'success': function(data) {
            delay_on_error = 1000;  // reset delay in case we had errors
            nowPlayingCallback(data);
        },
        'error': function () {
            setTimeout(loadNowPlaying, delay_on_error);
            delay_on_error *= 2;  // double delay each time we have an error
        }
    });
}

function nowPlayingCallback(data) {

}


// On page load, start loading now playing info
loadNowPlaying();