from flask_sqlalchemy import SQLAlchemy
from datetime import datetime

db = SQLAlchemy()


class TrashLog(db.Model):
    __tablename__ = "trash_logs"

    id = db.Column(db.Integer, primary_key=True)
    latitude = db.Column(db.Float, nullable=False)
    longitude = db.Column(db.Float, nullable=False)
    description = db.Column(db.String(255), nullable=True)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

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
