from flask import render_template

from flask_site import app


@app.route('/logos/')
def logos():
    return render_template('logos.html')
