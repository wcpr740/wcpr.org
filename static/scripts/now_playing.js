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
    var start_pieces = now['start'].split(':'),
        start_time = new Date();
    start_time = start_time.setHours(start_pieces[0], start_pieces[1], start_pieces[2]);
    if (start_time > Date.now())  {
        // account for when day rolls over.
        start_time.setDate(start_time.getDate() - 1);
    }

    var len_seconds = parseInt(now['len']),
        elapsed_seconds = (Date.now() - start_time) / 1000,
        percent_finished = elapsed_seconds / len_seconds * 100,
        remaining_seconds = len_seconds - elapsed_seconds;  // get time in seconds

    progress_bar.style.width = percent_finished + '%';
    progress_bar.style.transition = 'width 0s linear';
    setTimeout(function() {
        progress_bar.style.transition = 'width ' + (remaining_seconds - 1) + 's linear';
        progress_bar.style.width = '100%';
    }, 1000);

    // schedule next time to load what's playing
    setTimeout(loadNowPlaying, (remaining_seconds + 1) * 1000);
}


// On page load, start loading now playing info
loadNowPlaying();