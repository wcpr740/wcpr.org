from flask import render_template

from flask_site import app


@app.route('/404.html')
@app.errorhandler(404)
def error_404(error=None):
    if error:
        status = 404
    else:
        status = 200
    return render_template('404.html'), status
