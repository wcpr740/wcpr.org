from flask import redirect, url_for

from flask_site import app


@app.route('/mobile_unit/')
def mobile_unit_alt():
    return redirect(url_for('mobile_unit'))


@app.route('/showsignup/')
def show_signup_form():
    return redirect('https://docs.google.com/forms/d/e/'
                    '1FAIpQLScmrvmnkk50c257_xoojpww7C7S4B95B8IQ7zIHywCeNIUZPQ/viewform')


@app.route('/agreement/')
def member_agreement():
    return redirect(url_for('static', filename='/docs/WCPRMemberAgreement.pdf'))
