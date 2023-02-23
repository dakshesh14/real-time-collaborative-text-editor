# Collaborative Text Editor

A rich-text collaborative editor which allows multiple users to edit the same document at the same time.

Made using:

- Django
- Django Channels
- Redis
- Vite React
- Yjs
- Remirror

## Installation:

1. Fork the repo
2. Clone the repo: `$ git clone`
3. **For backend:**
   - `cd` into `app-server`
   - Create a virtual environment: `$ python3 -m venv env`
   - Activate the virtual environment: `$ source env/bin/activate`
   - Install the dependencies: `$ pip install -r requirements.txt`
   - Create a `.env` file.
   - Make migrations: `$ python manage.py makemigrations`
   - Migrate: `$ python manage.py migrate`
   - If you want to spin up redis server using docker: `$ docker run -p 6379:6379 -d redis:5`
   - Run the server: `$ python manage.py runserver`
4. **For frontend:**
   - `cd` into `app`
   - Run `yarn install` or `npm install`
   - Run `yarn dev` or `npm run dev`
   - Open `http://localhost:3000`

## Future plans

- [ ] Optimize backend
- [ ] Optimize frontend
