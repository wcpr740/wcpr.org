from flask_site import freezer, config

if __name__ == '__main__':
    freezer.run(debug=config.get('debug'))  # build and serve from build directory
