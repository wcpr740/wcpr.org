from flask import render_template

from flask_site.helpers.config import read_config
from flask_site import app

staff = read_config('staff.yml')
show_formats = read_config('show_formats.yml')
mobile_unit_faq = read_config('mobile_unit_faq.yml')
contact_list = read_config('contact.yml')


@app.route('/')
def index():
    return render_template('index.html')


@app.route('/contact/')
def contact():
    return render_template('contact.html', staff=staff, contact_list=contact_list)


@app.route('/policies/')
def policies():
    return render_template('policies.html')


@app.route('/mobileunit/')
def mobile_unit():
    return render_template('mobile_unit.html', faq=mobile_unit_faq)


@app.route('/schedule/')
def schedule():
    return render_template('schedule.html', show_formats=show_formats)
