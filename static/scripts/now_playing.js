var NOW_PLAYING_URL = 'http://web.stevens.edu/wcpr/now_playing.json',
    delay_on_error = 1000;

function loadNowPlaying() {
    $.ajax({
        'method': 'get',
        'url': NOW_PLAYING_URL,
        'dataType': 'jsonp',
        'jsonpCallback': 'nowPlayingCallback',
        'success': function() {
            delay_on_error = 1000;  // reset delay in case we had errors
        },
        'error': function () {
            setTimeout(loadNowPlaying, delay_on_error);
            delay_on_error *= 2;  // double delay each time we have an error
        }
    });
}

function nowPlayingCallback(data) {
    var text_container = document.getElementById('now_playing'),
        progress_bar = document.getElementById('play_progress'),
        now = data['now'];

    // load current song into now playing
    text_container.innerHTML = now['artist'] + ' - '  + now['title'];

    // get progress bar ready to move
    var start_time = new Date(now['start']),
        elapsed_seconds = (Date.now() - start_time) / 1000,  // timestamps are in ms, so divide by 1000
        len_seconds = parseInt(now['len']),
        percent_finished = (elapsed_seconds / len_seconds * 100).toFixed(2),
        remaining_seconds = (len_seconds - elapsed_seconds).toFixed(3);

    if (remaining_seconds < 0) {  // avoids if we grab now_playing.json while it's updating
        remaining_seconds = 0;
    }

    progress_bar.style.width = percent_finished + '%';
    progress_bar.style.transition = 'width 0s linear';
    setTimeout(function() {
        progress_bar.style.transition = 'width ' + remaining_seconds + 's linear';
        progress_bar.style.width = '100%';
    }, 10);  // wait so bar can load to initial point before starting to move

    // schedule next time to load what's playing
    setTimeout(loadNowPlaying, (remaining_seconds + 3) * 1000);
}


// On page load, start loading now playing info
loadNowPlaying();