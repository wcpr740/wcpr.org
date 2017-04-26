var error_page_styles = [
    {
        'img': '/static/images/error/explode.jpg',
        'color': '#000',
        'bg_color': '#cbcbcd'
    },
    {
        'img': '/static/images/error/fire.jpg',
        'color': '#fff',
        'bg_color': '#6a280e'
    }
];

function loadErrorPage() {
    var error_page = document.getElementById('error_page'),
        style = error_page_styles[Math.floor(Math.random() * error_page_styles.length)],
        navbar = document.getElementById('navbar'),
        now_playing = document.getElementById('now_playing_container'),
        progress = document.getElementById('play_progress_container');

    error_page.style.backgroundImage = "url(" + style['img'] + ")";
    error_page.style.backgroundColor = style['bg_color'];
    error_page.style.color = style['color'];

    error_page.style.height =
        (window.innerHeight - navbar.clientHeight - now_playing.clientHeight
         - progress.clientHeight - 1)
        + 'px';
}
