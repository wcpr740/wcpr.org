var DEFAULT_ERROR_DELAY = 2,
    delay_on_error = DEFAULT_ERROR_DELAY,
    last_now_playing_data;

function loadNowPlaying() {
    $.ajax({
        'method': 'get',
        'url': window.GLOBAL_SITE_CONFIG['NOW_PLAYING_URL'],
        'dataType': 'jsonp',
        'jsonpCallback': 'nowPlayingCallback',
        'success': function() {
            delay_on_error = DEFAULT_ERROR_DELAY;  // reset delay in case we had errors
        },
        'error': function () {
            setTimeout(loadNowPlaying, delay_on_error * 1000);
            delay_on_error *= 2;  // double delay each time we have an error
        }
    });
}

function nowPlayingCallback(data) {
    /* Only used as AJAX callback because WebSockets don't need to schedule next grab
     */

    var remaining_seconds = updateNowPlaying(data) + 2;  // two extra so there's no chance of 0-second timeout
    setTimeout(loadNowPlaying, (remaining_seconds) * 1000);
}

function makeLastPlayingRow(entry) {
    var row = document.createElement('tr'),
        start = new Date(entry['start']),
        hour = ((start.getHours() + 11) % 12 + 1),
        minute = start.getMinutes() + '',
        dd,
        contents;
    if (start.getHours() >= 12) {
        dd = 'PM';
    }
    else {
        dd = 'AM';
    }
    if (hour < 10) {
        hour = '0' + hour;
    }
    if (minute.length < 2) {
        minute = '0' + minute;
    }
    contents = '<td><b>' + hour +  ':' + minute + ' ' + dd + '</b></td><td>'
             + entry['title'] + ' - ' + entry['artist'] + '</td>';

    row.innerHTML = contents;
    return row;
}

function insertSimpleNowPlaying() {
    var data = last_now_playing_data,
        simple = document.getElementById('now_playing_simple'),
        live = data['now'];
    // load current song into now playing, it's always on page
    if (live['ad'] || live['tag']) {
        simple.innerHTML = live['title'];
    }
    else {
        simple.innerHTML = live['artist'] + ' - '  + live['title'];
    }
}

function insertDetailedNowPlaying() {
    var data = last_now_playing_data,
        full = document.getElementById('now_playing_full');

    if (!full || !last_now_playing_data) {
        return;  // don't load the now_playing_full if it's not on page.
    }

    var live = data['now'];
    if (live['ad'] || live['tag']) {
        live['img'] = '/static/images/logos/740disk_thumb.jpg';
    }

    full.innerHTML = '<h3>On Air</h3>';  // empty previous entries
    var now = document.createElement('div'),
        now_link = document.createElement('a'),
        now_img = document.createElement('img'),
        now_para = document.createElement('h4');

    now_link.href = live['url'];
    now_link.title = 'Click to purchase on Amazon';

    now.className = 'now-on-air';
    now_img.src = live['img'];
    now_para.innerHTML = live['title'] + '<br><small>' + live['artist'] + '</small>';

    now_link.appendChild(now_img);
    now.appendChild(now_para);
    now.appendChild(now_link);

    full.appendChild(now);
    full.innerHTML += '<div class="clearfix"></div>';

    full.innerHTML += '<h3>Past</h3>';
    var previous = document.createElement('table');
    previous.className = 'list-unstyled';
    for (var i = 1, key = 'last' + i, added = 0; i <= 6; i += 1, key = 'last' + i) {
        if (!data[key]['ad'] && !data[key]['tag']) {
            previous.appendChild(makeLastPlayingRow(data[key]));
            added++
        }
        if (added >= 3) {
            break;
        }
    }
    full.appendChild(previous);
}

function updateNowPlaying(data) {
    var progress_bar = document.getElementById('play_progress'),
        live = data['now'];
    last_now_playing_data = data;
    insertSimpleNowPlaying();
    insertDetailedNowPlaying();

    // get progress bar ready to move
    var start_time = new Date(live['start']).getTime(),
        elapsed_seconds = (Date.now() - start_time) / 1000,  // timestamps are in ms, so divide by 1000
        len_seconds = parseInt(live['len']),
        percent_finished = (elapsed_seconds / len_seconds * 100).toFixed(2),
        remaining_seconds = Math.floor(len_seconds - elapsed_seconds);

    if (remaining_seconds < 0) {  // avoids if function is called while song is updating
        remaining_seconds = 0;
    }

    progress_bar.style.width = percent_finished + '%';
    progress_bar.style.transition = 'width 0s linear';

    setTimeout(function() {
        progress_bar.style.transition = 'width ' + remaining_seconds + 's linear';
        progress_bar.style.width = '100%';
    }, 50);  // wait so bar can load to initial point before starting to move

    return remaining_seconds;
}