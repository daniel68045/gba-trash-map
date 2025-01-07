from flask import Flask

# Flask app initialization

def create_app():
    app = Flask(__name__)
    from .routes import api
    app.register_blueprint(api)
    return app
