import os

from webassets import filter

from flask_assets import Environment, Bundle

from flask_site.libraries.csscompressor_webassets import CSSCompressor


def register_filters():
    # This compressor is better than the one built into webassets
    filter.register_filter(CSSCompressor)


def compile_assets(app, bundle_config):
    """ Compile Bundles from a config dictionary, loaded from a file.

    :param flask.Flask app: the flask application after it has been initialized
    :param dict bundle_config: configuration, see example config.
    :return:
    """
    if not bundle_config:
        raise IOError('Bundles config is empty')
    assets = Environment(app)

    for name, settings in bundle_config.iteritems():
        bundle = check_and_compile_bundle(name, settings)
        assets.register(name, bundle)


def check_and_compile_bundle(name, settings):
    if len(name) == 0:
        raise ValueError('The bundle name must have a length of more than 0')
    if not isinstance(settings['type'], str):
        raise ValueError('The "%s" bundle must have a string type associated with it' % name)
    if len(settings['type']) == 0:
        raise ValueError('The "%s" bundle type must have a type length of more than 0' % name)
    if len(settings['files']) == 0:
        raise ValueError('The "%s" bundle must have files associated with it' % name)

    # Check each file in bundle to make sure it exists.
    static_abs_path = os.path.abspath('static')
    for filename in settings['files']:
        if not os.path.isfile(os.path.join(static_abs_path, filename)):
            raise IOError('File "%s" in bundle "%s" does not exist.' % (filename, name))

    if settings.get('filters', None) is None:
        filters = None
    else:
        filters = ','.join(settings['filters'])

    if settings.get('output', None) is None:
        output = 'out/' + name + '.%(version)s' + '.' + settings['type']
    else:
        output = settings['output']

    if settings.get('depends', None) is None:
        depends = None
    else:
        depends = ','.join(settings['depends'])

    return Bundle(*settings['files'], filters=filters, output=output, depends=depends)


__all__ = ['compile_assets', 'register_filters']
