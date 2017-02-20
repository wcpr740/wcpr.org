from flask_site import freezer, flask_config

if __name__ == '__main__':
    freezer.run(debug=flask_config.get('DEBUG'))  # build and serve from build directory
