from flask import render_template

from flask_site import app


@app.route('/')
def index():
    return render_template('index.html')
