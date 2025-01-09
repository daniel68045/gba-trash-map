from sqlalchemy import create_engine


DATABASE_URL = "postgresql://postgres:Clairofan132?@localhost/trash_tracker"

try:
    engine = create_engine(DATABASE_URL)
    connection = engine.connect()
    print("Connected to the database successfully!")
    connection.close()
except Exception as e:
    print("Failed to connect to the database.")
    print(e)
