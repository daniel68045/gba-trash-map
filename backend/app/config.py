import os


class Config:
    SQLALCHEMY_DATABASE_URI = os.getenv(
        "DATABASE_URL", "postgresql://postgres.dvmobqweaombbhiwhsci:Clairofan1324@aws-0-us-east-1.pooler.supabase.com:5432/postgres"
    )
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    # SECRET_KEY = os.getenv("SECRET_KEY", "your_secret_key")  # Optional for Flask session security
