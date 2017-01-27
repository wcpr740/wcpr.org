from flask import redirect

from flask_site import app


@app.route('/mobileunit/')
def mobile_unit_request():
    return redirect('https://orgsync.com/48047/forms/207703/submission')


@app.route('/showsignup/')
def show_signup_form():
    return redirect('https://docs.google.com/forms/d/e/'
                    '1FAIpQLScmrvmnkk50c257_xoojpww7C7S4B95B8IQ7zIHywCeNIUZPQ/viewform')


@app.route('/agreement/')
def member_agreement():
    return redirect('/static/docs/WCPRMemberAgreement.pdf')
