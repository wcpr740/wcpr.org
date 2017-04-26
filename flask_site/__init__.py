from flask import Flask
from flask_frozen import Freezer

from flask_site.helpers.config import read_config
from flask_site.helpers.assets import register_filters, compile_assets
from flask_site.helpers.env import read_env

# THE CONFIGURATION
env = read_env()

config = read_config('config.yml', env)
flask_config = config.get('flask', {})

# THE FLASK INSTANCE
app = Flask(flask_config['name'])
app.config.update(flask_config)

# ASSETS
register_filters()
bundles_config = read_config('bundles.yml')
compile_assets(app, bundles_config)

# INITIALIZE FREEZER
freezer = Freezer(app)

# LOAD THE ROUTES
from flask_site.controllers import *
