from flask import render_template

from flask_site.helpers.config import read_config
from flask_site import app

staff = read_config('staff.yml')
show_formats = read_config('show_formats.yml')


@app.route('/')
def index():
    return render_template('index.html')


@app.route('/contact/')
def contact():
    return render_template('contact.html', staff=staff)


@app.route('/policies/')
def policies():
    return render_template('policies.html')


@app.route('/schedule/')
def schedule():
    return render_template('schedule.html', show_formats=show_formats)
