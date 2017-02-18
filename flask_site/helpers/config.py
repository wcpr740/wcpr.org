import os

from flask_site.libraries.yaml_ordered_loader import ordered_load

CONFIG_FOLDER = os.path.abspath('flask_site/config')


def read_config(filename='config.yml', env=None):
    """ Open the YAML config if it exists, and load an environment if specified.

    :param str filename: defaults to `config.yml`
    :param str env: defaults to `default`, make it `dev`, `prod`, `test`, etc.
    :return: the loaded config `dict`
    :rtype: dict
    """
    full_path = os.path.join(CONFIG_FOLDER, filename)
    if not os.path.isfile(full_path):
        raise IOError('The file %s is not found' % full_path)

    with open(full_path, 'r') as f:
        doc = ordered_load(f)

    if env is None:
        return doc

    if env not in doc:
        raise ValueError("Specified environment doesn't exist in config file")
    return doc[env]


__all__ = ['read_config']
