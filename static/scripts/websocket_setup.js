function openSocket() {
    socket = io.connect(NOW_PLAYING_URL);
    socket.on('connected', function () {
        socket.emit('get', {'delay': true});
    });

    socket.on('on_air', updateNowPlaying);

    return socket;
}

var socket = openSocket();