from flask_site import app, config

if __name__ == '__main__':
    app.run(host=config.get('host'), port=config.get('port'))
