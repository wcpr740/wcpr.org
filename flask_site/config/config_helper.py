import os

import yaml


def read_config(filename='flask_site/config/config.yml', env='default'):
    """ Open the YAML config if it exists, and load an environment if specified.

    :param str filename: defaults to `config.yml`
    :param str env: defaults to `default`, make it `dev`, `prod`, `test`, etc.
    :return: the loaded config `dict`
    :rtype: dict
    """
    if not os.path.isfile(filename):
        raise IOError('The file %s is not found' % filename)

    with open(filename, 'r') as f:
        doc = yaml.load(f)

    if env is None:
        return doc

    if env not in doc:
        raise ValueError("Specified environment doesn't exist in config file")
    return doc[env]
