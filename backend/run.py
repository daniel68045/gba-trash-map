from app import create_app

# Flask entry point

app = create_app()

if __name__ == "__main__":
    app.run(debug=True)
