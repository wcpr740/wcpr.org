from flask_site import app

if __name__ == '__main__':
    app.run(host=app.config.get('host'), port=int(app.config.get('port')))
