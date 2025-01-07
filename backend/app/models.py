from flask_sqlalchemy import SQLAlchemy
from datetime import datetime

# Initialize SQLAlchemy instance
db = SQLAlchemy()


# Define the TrashLog model
class TrashLog(db.Model):
    __tablename__ = "trash_logs"

    id = db.Column(db.Integer, primary_key=True)  # Unique ID for each log
    latitude = db.Column(db.Float, nullable=False)  # Latitude of the trash location
    longitude = db.Column(db.Float, nullable=False)  # Longitude of the trash location
    description = db.Column(
        db.String(255), nullable=True
    )  # Optional description of the trash
    created_at = db.Column(
        db.DateTime, default=datetime.utcnow
    )  # Timestamp of when the log was created

    def __repr__(self):
        return f"<TrashLog id={self.id} lat={self.latitude} lng={self.longitude}>"

    def to_dict(self):
        """Convert the model instance to a dictionary for JSON responses."""
        return {
            "id": self.id,
            "latitude": self.latitude,
            "longitude": self.longitude,
            "description": self.description,
            "created_at": self.created_at.isoformat(),
        }
