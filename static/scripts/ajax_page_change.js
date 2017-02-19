var PAGE_EVENT_MAP = {
    'click': {
        'class': {
            'format-toggle': onShowFormatToggle
        },
        'id': {
        }
    },
    'change': {
        'class': {
        },
        'id': {
        }
    },
    'keypress': {
        'class': {

        },
        'id': {
        }
    },
    'exists': {
        'class': {
        },
        'id': {
            'schedule_calendar': createScheduleCalendar
        }
    }
};


function loadPageEvents() {
    /**
     * Executed each time page is loaded to make sure links and clickables work with
     * AJAX page changer.
     *
     * Relies on the PAGE_EVENT_MAP object, which connects page event types to elements.
     * An extra event "exists" will execute the supplied function once on page load.
     */
    var className, id, event;
    var classEventMap, idEventMap, elems, i;

    for (event in PAGE_EVENT_MAP) {
        if (!PAGE_EVENT_MAP.hasOwnProperty(event) || event == 'exists') {
            continue;
        }

        classEventMap = PAGE_EVENT_MAP[event]['class'];
        for (className in classEventMap) {
            if (!classEventMap.hasOwnProperty(className)) {
                continue;
            }

            elems = document.getElementsByClassName(className);
            for (i = 0; i < elems.length; i++) {
                elems[i]['on' + event] = classEventMap[className];
            }
        }

        idEventMap = PAGE_EVENT_MAP[event]['id'];
        for (id in idEventMap) {
            if (!idEventMap.hasOwnProperty(id)) {
                continue;
            }

            i = document.getElementById(id);
            if (i != undefined) {
                i['on' + event] = idEventMap[id];
            }
        }
    }
    
    var links = document.getElementsByTagName('a');
    for (i = 0; i < links.length; i++) {
        links[i].onclick = onLinkClick;
    }

    var ifExistsClasses = PAGE_EVENT_MAP['exists']['class'];
    for (className in ifExistsClasses) {
        if (!ifExistsClasses.hasOwnProperty(className)) {
            continue;
        }
        elems = document.getElementsByClassName(className);
        if (elems.length > 0) {
            setTimeout(ifExistsClasses[className], 0);
        }
    }
    var ifExistsIds = PAGE_EVENT_MAP['exists']['id'];
    for (id in ifExistsIds) {
        if (!ifExistsIds.hasOwnProperty(id)) {
            continue;
        }
        i = document.getElementById(id);
        if (i != undefined) {
            setTimeout(ifExistsIds[id], 0);
        }
    }
}


function onLinkClick(e) {
    /**
     * Bound to all link elements on the page to override default behaviour.
     *
     * Outbound links - anything with a "data-x" tag - get default behaviour, otherwise
     * navigation is through AJAX loading.
     */
    var href = this.getAttribute('href');
    if (href.indexOf('javascript:') >= 0 || href.indexOf('mailto:') >= 0 ||
        href.indexOf('tel:') >= 0 ||
        e.which != 1 || this.getAttribute('target') != undefined) {
        return;
    }
    if (href.indexOf('#') >= 0) {
        if (href.indexOf('#') == 0 || href.split('#')[0] == document.location.pathname) {
            // anchor on the same page, no page change
            return;
        } // otherwise, page change
    }

    if (this.getAttribute('data-x')) {  // is an outbound link
        // if the music is playing, warn the user that leaving will stop it.
        if (was_playing && !window.confirm(CONFIRMATION_MESSAGE)) {
            // was_playing essentially means "is playing currently"
            e.preventDefault();
            return false;
        } else {
            has_prompted_to_leave++;  // they do want to leave the page, so don't prompt them again
        }
        if (window.analytics) {
            trackOutboundLink(href);
        }
    }
    else {
        e.preventDefault();
        navigate(href);
        this.blur();
        return false;
    }
}


function navigate(href) {
    /**
     * Replaces document.location.href navigation with AJAX loading.
     */
    $.ajax({
        dataType: "text",
        cache: false,
        url: href,
        success: function(data) {
            history.pushState(href, href, href); // in actuality only need the last one
            linkCallback(data);
        },
        error: function () {
            // when there's an error, navigate to the error'd page.
            document.location.href = href;
        }
    });
}

function linkCallback(data) {
    /**
     * After the page is grabbed via AJAX, put the proper elements in the page.
     */
    if (data['url'] != undefined) {
        navigate(data['url']);  // received a redirect
        return;
    }
    var title = data.split('<title>', 2)[1].split('</title>', 2)[0],
        body = data.split('<!--START_ANCHOR-->', 2)[1].split('<!--END_ANCHOR-->', 2)[0];

    document.title = title;
    document.getElementById('page_container').innerHTML = body;
    loadPageEvents();
    if (window.analytics) {
        sendAnalyticsPageChange();
    }
}


// load the page events once in the beginning
loadPageEvents();