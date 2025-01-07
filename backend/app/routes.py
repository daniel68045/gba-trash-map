from flask import Blueprint, request, jsonify
from .models import db, TrashLog

api = Blueprint("api", __name__)


@api.route("/logs", methods=["POST"])
def add_trash_log():
    # Parse the request JSON
    data = request.get_json()

    # Validate the presence of required fields
    if not data:
        return jsonify({"error": "Request body must be JSON"}), 400
    if "latitude" not in data or "longitude" not in data:
        return jsonify({"error": "Latitude and longitude are required fields."}), 400

    # Validate data types
    try:
        latitude = float(data["latitude"])
        longitude = float(data["longitude"])
    except ValueError:
        return jsonify({"error": "Latitude and longitude must be numbers."}), 400

    if "description" in data and not isinstance(data["description"], str):
        return jsonify({"error": "Description must be a string."}), 400

    # Create a new TrashLog instance
    new_log = TrashLog(
        latitude=latitude,
        longitude=longitude,
        # Default to empty string if not provided
        description=data.get("description", ""),
    )

    # Add to database and commit
    db.session.add(new_log)
    db.session.commit()

    # Return the created log as a response
    return jsonify(new_log.to_dict()), 201


@api.route("/logs", methods=["GET"])
def get_trash_logs():
    # Query the database for all trash logs
    logs = TrashLog.query.all()

    # Convert each log to a dictionary
    logs_list = [log.to_dict() for log in logs]

    # Return the logs as JSON
    return jsonify(logs_list), 200


# Route for API landing page


@api.route("/", methods=["GET"])
def home():
    return jsonify({"message": "Landing page... no route specified"}), 200
