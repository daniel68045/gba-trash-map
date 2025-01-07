from flask import Flask, jsonify
from flask_cors import CORS
from sqlalchemy.exc import SQLAlchemyError
from .routes import api
from .models import db


def create_app():
    app = Flask(__name__)
    app.config.from_object("app.config.Config")

    db.init_app(app)

    CORS(app)
    
    # Create database tables if they don’t exist
    with app.app_context():
        db.create_all()

    # Register blueprints
    app.register_blueprint(api)

    # Global error handler
    @app.errorhandler(Exception)
    def handle_exception(e):
        response = {"error": "An unexpected error occurred."}
        if isinstance(e, SQLAlchemyError):
            response["error"] = "A database error occurred."
        return jsonify(response), 500

    # Specific 404 error handler
    @app.errorhandler(404)
    def handle_404(e):
        return jsonify({"error": "The requested URL was not found on the server."}), 404

    return app
