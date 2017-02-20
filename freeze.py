from flask_site import freezer, flask_config

if __name__ == '__main__':
    if flask_config.get('DEBUG', True):
        freezer.run(debug=True)  # build and serve from build directory
    else:
        freezer.freeze()  # only build, don't serve
