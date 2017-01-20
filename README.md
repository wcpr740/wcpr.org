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

## Deploy

now_playing.json needs to be configured as the template for StationPlaylist output.
In most cases, copy the file to "C:\Program Files (x86)\StationPlaylist\Studio\Templates".
Thereafter, StationPlaylist can be configured to use that template and output it to the index of
the WCPR site directory.

This is current configured by saving the file to the server via Windows SMB file-sharing protocol.

When deploying, the only folders needed from `static` are:
  
  - `out` 
  - `images` 
  - `fonts`

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