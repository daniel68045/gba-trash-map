from flask import Blueprint, request, jsonify
from .models import db, TrashLog

api = Blueprint("api", __name__)


@api.route("/logs", methods=["POST"])
def add_trash_log():
    data = request.get_json()

    if not data:
        return jsonify({"error": "Request body must be JSON"}), 400
    if "latitude" not in data or "longitude" not in data:
        return jsonify({"error": "Latitude and longitude are required fields."}), 400

    try:
        latitude = float(data["latitude"])
        longitude = float(data["longitude"])
    except ValueError:
        return jsonify({"error": "Latitude and longitude must be numbers."}), 400

    if "description" in data and not isinstance(data["description"], str):
        return jsonify({"error": "Description must be a string."}), 400

    new_log = TrashLog(
        latitude=latitude,
        longitude=longitude,
        description=data.get("description", ""),
    )

    db.session.add(new_log)
    db.session.commit()

    return jsonify(new_log.to_dict()), 201


@api.route("/logs", methods=["GET"])
def get_trash_logs():
    logs = TrashLog.query.all()

    logs_list = [log.to_dict() for log in logs]

    return jsonify(logs_list), 200


@api.route("/", methods=["GET"])
def home():
    return jsonify({"message": "Landing page... no route specified"}), 200
