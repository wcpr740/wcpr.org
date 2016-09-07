import sys


def read_env():

    args = sys.argv

    if 'nose' in args[0]:  # Detect nosetests
        return 'test'

    if len(args) == 1:
        return 'prod'

    return args[1]


__all__ = ['read_env']
