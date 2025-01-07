from flask import Blueprint, jsonify

# API routes

api = Blueprint('api', __name__)

@api.route('/ping', methods=['GET'])
def ping():
    return jsonify({"message": "pong!"})
