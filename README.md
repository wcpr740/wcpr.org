# wcpr.org

## Setup

  1. Setup a virtualenv: `virtualenv env` (and activate: `env\Scripts\activate`)
  2. Install Python requirements: `pip install -r requirements.txt`
  3. Install npm requirements: `npm install -g less -g bower`
  4. Install bower requirements: `bower install`
  
## Developing

Run `start.py dev` to run a local Flask test server

## Build

Run `freeze.py freeze` to build a static site to `/build` and then 
serve that static site. Contents of `/build` will be silently replaced with new site.

When deploying, the only folders needed from `static` are the `out` and `images` folder.

## Needs

 - stream 740.wcpr.org:8080
    - 64kbps
    - 128kbps
    - 320kbps
 - now playing
 - radio schedule
 - staff (with contact info)
 - mobile unit info
 - record library link
 - rules
 - calendar for mobile units and events
 - social media:
    - Facebook
    - Twitter
    - Instagram
    - Spotify


## Wants

 - DJ's can adjust "Now Playing"
 - links to playlists
 - automatically pick stream quality