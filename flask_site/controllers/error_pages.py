import json

from flask import render_template

from flask_site import app, resize

ERROR_BG_DIMEN = '800x600'
ERROR_BG_FORMAT = 'JPEG'


@app.route('/404.html')
@app.errorhandler(404)
def error_404(error=None):
    error_styles = [
        {
            'img': resize('/static/images/error/explode.jpg', ERROR_BG_DIMEN, format=ERROR_BG_FORMAT),
            'color': '#000',
            'bg_color': '#cbcbcd'
        },
        {
            'img': resize('/static/images/error/fire.jpg', ERROR_BG_DIMEN, format=ERROR_BG_FORMAT),
            'color': '#fff',
            'bg_color': '#6a280e'
        }
    ]
    if error:
        status = 404
    else:
        status = 200
    return render_template('404.html', error_styles=json.dumps(error_styles)), status
