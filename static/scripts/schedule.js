function extendEventDataFromDescription(eventData) {
    /**
     * Extracts key:value pairs from separate lines in the event description and leaves regular text.
     *
     * Example: if a google calendar event has the following description:
     *  ``` backgroundColor:pink
     *      className: example
     *
     *      A brand new event! ```
     *  eventData = {
     *      ...
     *      'backgroundColor': 'pink',
     *      'className': 'example',
     *      'description': 'A brand new event!'
     *  }
     */
    if (eventData == undefined || eventData['description'] == undefined) {
        return eventData;
    }
    var key_value_pairs = eventData['description'].split('\n'),
        i, split_on_colon, key, value,
        desc = '';  // will override the description with only regular text
    for (i = 0; i < key_value_pairs.length; i++) {
        if (key_value_pairs[i].indexOf(':') > 0) {  // if the line has a colon, it might be a key-value pair
            split_on_colon = key_value_pairs[i].split(':');
            key = split_on_colon.shift().trim();
            value = split_on_colon.join(':').trim();
            if (key.indexOf(' ') > 0) {
                // if the index has a space in it, it is definitely not a key -- false alarm
            }
            else {
                eventData[key] = value;
                continue;  // if we take out the continue, it gets appended to the description as well.
            }
        }
        // anything without a colon or falsely-identified is a not a key-value pair
        if (desc != '') {  // add a newline if this is a multi-line description
            desc += '\n';
        }
        desc += key_value_pairs[i];
    }
    eventData['description'] = desc;

    return eventData;
}

function defaultEventDataTransform(eventData) {
    /**
     * Finds extended parameter data in description, and uses any custom tags to apply styling.
     */
    eventData = extendEventDataFromDescription(eventData);
    if (eventData['format'] != undefined) {
        eventData['className'] += ' show-format-' + eventData['format'];
    }
    return eventData;
}

function toggleShowsAndAutoDJ() {
    /**
     * When pressing either button, toggles styles to show or hide.
     *
     * Relies on one being hidden at start.
     */
    $('#schedule_calendar').toggleClass('hide-shows hide-autodj');
}

var num_toggled_formats = 0;
function onShowFormatToggle() {
    var elem = $(this),
        format = this.getAttribute('data-format'),
        container = $('#schedule_calendar');

    if (num_toggled_formats == 0) {
        container.addClass('hide-formats');
    }
    if (elem.hasClass('selected')) {
        container.removeClass('except-' + format);
        num_toggled_formats--;
    }
    else {
        container.addClass('except-' + format);
        num_toggled_formats++;
    }
    elem.toggleClass('selected');

    if (num_toggled_formats == 0) {
        container.removeClass('hide-formats');
    }
}

function defaultEventClick(event, jsEvent, view) {
    return false;  // disable visiting the Google Calendar URL
}


function createScheduleCalendar() {
    $('#schedule_calendar').fullCalendar({
        googleCalendarApiKey: GLOBAL_SITE_CONFIG['calendar']['api_key'],
        eventSources: [
            {
                googleCalendarId: GLOBAL_SITE_CONFIG['calendar']['autodj_id'],
                className: 'schedule-autodj',
                textColor: 'black',
                eventDataTransform: defaultEventDataTransform
            },
            {
                googleCalendarId: GLOBAL_SITE_CONFIG['calendar']['shows_id'],
                className: 'schedule-shows',
                textColor: 'black',
                eventDataTransform: defaultEventDataTransform
            }
        ],
        eventClick: defaultEventClick,
        defaultView: 'agendaWeek',
        allDaySlot: false,
        slotEventOverlap: true,
        nowIndicator: true,
        height: 'auto',
        columnFormat: 'ddd',
        customButtons: {
            'autodj-toggle': {
                text: 'AutoDJ',
                click: toggleShowsAndAutoDJ
            },
            'shows-toggle': {
                text: 'Shows',
                click: toggleShowsAndAutoDJ
            }
        },
        header: {
            left: 'title',
            center: '',
            right: 'autodj-toggle,shows-toggle'
        }
    });
}