# wcpr.org [![Build Status](https://travis-ci.org/wcpr740/wcpr.org.svg?branch=master)](https://travis-ci.org/wcpr740/wcpr.org)

## Setup :package:

  1. Setup a virtualenv: `virtualenv env` (and activate: `env\Scripts\activate`
     on windows
     or source: `env/bin/sctivate` on macOS and Linux)
  2. Install Python requirements: `pip install -r requirements.txt` * **NOTE:**
     this site is built with Python 2, all pip dependencies must install their
     python2 versions, if this is a problem, use pip2 *
  3. Install npm requirements: `npm install -g less -g bower`
  4. Install bower requirements: `bower install`
  
## Develop :pencil:

Run `start.py dev` to run a local Flask test server

## Build :hammer:

Run `freeze.py freeze` to build a static site to `/build`.
Contents of `/build` will be silently replaced with new site.

## Deploy :rocket:

Anything pushed to the `develop` branch will be built by [Travis CI](https://travis-ci.org/wcpr740/wcpr.org)
and uploaded to [https://wcpr740.github.io/](https://wcpr740.github.io/).

When the `develop` branch is merged into the `master` branch, it will be built by Travis and automatically
uploaded to [https://wcpr.org](https://wcpr.org).

## Needs

 - record library link
 - calendar for mobile units and events
 - Link to TuneIn http://tunein.com/radio/WCPR-s45408/


## Wants

 - DJ's can adjust "Now Playing"
 - links to playlists
 - automatically pick stream quality
