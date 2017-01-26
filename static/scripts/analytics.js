function googleAnalytics(uid) {
    (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
    (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
    m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
    })(window,document,'script','//www.google-analytics.com/analytics.js','ga');
    ga('create', 'UA-90992004-1', 'auto');
    if (uid != undefined && uid != null && uid != "") {
        ga('set', 'userId', uid); // Set the user ID using signed-in user_id.
    }
    ga('send', 'pageview');
    window.analytics = true;
}


function sendAnalyticsPageChange() {
    ga('set', {
        page: window.location.pathname,
        title: document.title
    });

    ga('send', 'pageview');
}

function trackOutboundLink(url) {
    ga('send', 'event', 'outbound', 'click', url, {
        'transport': 'beacon',
        'hitCallback': function(){
            document.location.href = url;
        }
    });
}


googleAnalytics();  // start immediately because no uid is needed