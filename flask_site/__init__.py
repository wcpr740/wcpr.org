
from flask import Flask
from flask_frozen import Freezer

from flask_site.config import read_config

config = read_config()
flask_config = config.get('flask', {})

app = Flask(flask_config['name'])
app.config.update(flask_config)

from flask_site.controllers import *

freezer = Freezer(app)
