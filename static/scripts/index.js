function rgb2hex(rgb){
    rgb = rgb.match(/^rgba?[\s+]?\([\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?/i);
    return (rgb && rgb.length === 4) ? "#" +
        ("0" + parseInt(rgb[1],10).toString(16)).slice(-2) +
        ("0" + parseInt(rgb[2],10).toString(16)).slice(-2) +
        ("0" + parseInt(rgb[3],10).toString(16)).slice(-2) : '';
}

function setTwitterColor() {
    /** Set up the meta property for Twitter to match the page color.
     *
     * Color property is assigned to #twitter_color in CSS to match the link color.
     * getComputedStyle returns RBG, but meta tag needs hex.
     *
     * Hopefully this executes before the timeline loads.
     */
    var elem = document.getElementById('twitter_color'),
        color = getComputedStyle(elem, null).color;
    elem.setAttribute('content', rgb2hex(color));
}

setTwitterColor();