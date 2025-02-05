## [greaterbostontrashmap.org](https://greaterbostontrashmap.org)

SQLAlchemy, React/Flask/PostgreSQL(via Supabase), using `react-leaflet` to display live trash markers

## Run Locally:

Requires Node v16+ and Python v3.8+

## Clone the Repository

``` bash
git clone https://github.com/your-username/trash-tracker.git
cd trash-tracker
```

## Backend Setup

``` bash
cd backend
```

Create a virtual environment:

``` bash
python3 -m venv .venv
source .venv/bin/activate  # On Windows: .venv\Scripts\activate
```

Install dependencies:

``` bash
pip install -r requirements.txt
```

Configure a .env file with:

``` environment
DATABASE_URL=your_supabase_database_uri
FLASK_APP=run.py
FLASK_ENV=development
```

Run the provided test script to verify connectivity:

``` bash
python test/test_db_connection.py
```

Start the Flask server:

``` bash
python3 run.py
```

## Frontend Setup

``` bash
cd frontend
```

Install dependencies:

``` bash
npm install
```

Configure a .env file with:

``` environment
REACT_APP_API_BASE_URL=http://127.0.0.1:5000
```

Start React:

``` bash
npm start
```
