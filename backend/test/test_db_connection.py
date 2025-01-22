from sqlalchemy import create_engine


DATABASE_URL = "postgresql://postgres.dvmobqweaombbhiwhsci:Clairofan1324@aws-0-us-east-1.pooler.supabase.com:5432/postgres"

try:
    engine = create_engine(DATABASE_URL)
    connection = engine.connect()
    print("Connected to the database successfully!")
    connection.close()
except Exception as e:
    print("Failed to connect to the database.")
    print(e)
