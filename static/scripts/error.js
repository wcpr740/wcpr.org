
function loadErrorPage() {
    var error_page = document.getElementById('error_page'),
        all_styles = $.parseJSON(document.getElementById('error_styles').innerHTML),
        style = all_styles[Math.floor(Math.random() * all_styles.length)],
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
