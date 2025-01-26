from flask import Flask, jsonify
from flask_cors import CORS
from sqlalchemy.exc import SQLAlchemyError
from .routes import api
from .models import db


def create_app():
    app = Flask(__name__)
    app.config.from_object("app.config.Config")

    CORS(
        app,
        resources={
            r"/*": {
                "origins": [
                    "http://localhost:3000",
                    "https://greaterbostontrashmap.netlify.app/",
                    "https://greaterbostontrashmap.org",
                    "https://www.greaterbostontrashmap.org",
                ]
            }
        },
    )

    db.init_app(app)

    with app.app_context():
        db.create_all()

    app.register_blueprint(api)

    @app.errorhandler(Exception)
    def handle_exception(e):
        response = {"error": "An unexpected error occurred."}
        if isinstance(e, SQLAlchemyError):
            response["error"] = "A database error occurred."
        return jsonify(response), 500

    @app.errorhandler(404)
    def handle_404(e):
        return jsonify({"error": "The requested URL was not found on the server."}), 404

    @app.teardown_appcontext
    def shutdown_session(exception=None):
        """Ensure that database sessions are removed after each request."""
        db.session.remove()

    return app
