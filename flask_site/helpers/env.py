import sys
import os


def read_env():

    if os.environ.get('TRAVIS_BRANCH') == 'develop':
        return 'freeze_staging'
    elif os.environ.get('TRAVIS_BRANCH') == 'master':
        return 'freeze'

    args = sys.argv

    if 'nose' in args[0]:  # Detect nosetests
        return 'test'

    if len(args) == 1:
        return 'prod'

    return args[1]


__all__ = ['read_env']
