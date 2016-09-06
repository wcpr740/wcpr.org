import os

from flask import Flask
from flask_frozen import Freezer

from flask_site.helpers.config import read_config
from flask_site.helpers.assets import register_filters, compile_assets

# THE CONFIGURATION
CONFIG_FOLDER = os.path.abspath('flask_site/config')
MAIN_CONFIG_FILENAME = os.path.join(CONFIG_FOLDER, 'config.yml')
BUNDLES_CONFIG_FILENAME = os.path.join(CONFIG_FOLDER, 'bundles.yml')

config = read_config(MAIN_CONFIG_FILENAME, 'default')
flask_config = config.get('flask', {})

# THE FLASK INSTANCE
app = Flask(flask_config['name'])
app.config.update(flask_config)

# ASSETS
register_filters()
bundles_config = read_config(BUNDLES_CONFIG_FILENAME)
compile_assets(app, bundles_config)

# LOAD THE ROUTES
from flask_site.controllers import *

# INITIALIZE FREEZER
freezer = Freezer(app)
