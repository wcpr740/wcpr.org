from flask_site import freezer, flask_config, env

if __name__ == '__main__':
    if flask_config.get('DEBUG', True):
        freezer.run(debug=True)  # build and serve from build directory
    else:
        freezer.freeze()  # only build, don't serve
        if env == 'freeze':
            with open('build/CNAME', 'w+') as f:
                f.write('wcpr.org')
