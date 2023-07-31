from flask import Flask, render_template, request, redirect, url_for, flash
from flask_sqlalchemy import SQLAlchemy
from flask_login import LoginManager, current_user, UserMixin, login_user, logout_user, login_required
app = Flask(__name__)

db = SQLAlchemy()

DB_NAME = "database.db"
def create_app():
    app = Flask(__name__)
    app.config['SECRET_KEY'] = 'secret'
    app.config['SQLALCHEMY_DATABASE_URI'] = f'sqlite:///{DB_NAME}'
    db.init_app(app)
    with app.app_context():
        db.create_all()
    login_manager = LoginManager()
    login_manager.login_view = 'login'
    login_manager.init_app(app)

    @login_manager.user_loader
    def load_user(id):
        return User.query.get(int(id))
    
    return app

app = create_app()

class User(db.Model,UserMixin):
    id = db.Column(db.Integer, primary_key = True)
    username = db.Column(db.String(100), nullable=False)
    password = db.Column(db.String(100))


@app.route("/")
def index():
    return render_template('index.html')

@app.route("/login", methods=['GET', 'POST'])
def login():
    if current_user.is_authenticated:
        return redirect(url_for('home'))
    else:
        if request.method == 'POST':
                username = request.form.get('username')
                password = request.form.get('password')
                user = User.query.filter_by(username=username).first()
                if user:
                    if (user.password == password):
                        login_user(user, remember=True)
                        return redirect(url_for('home'))
                    else:
                        flash('Log in error.', category = 'error')

    return render_template('login.html')
@app.route("/logout")
@login_required
def logout():
    logout_user()
    return redirect(url_for('index'))

@app.route("/sign_up", methods = ['GET', 'POST'])
def signup():
        if request.method == 'POST':

            password = request.form.get('password')
            password2 = request.form.get('password2')
            username = request.form.get('username')
            if username:
                flash('Name already exists.', category='error')

            if(password == password2):
                account = User(username = username, password = password)
                db.session.add(account)
                db.session.commit()
                login_user(account, remember=True)
                return redirect(url_for('home'))
        return render_template('sign_up.html')

@app.route("/home")
def home():
    return render_template('home.html', username=current_user.username)

if (__name__ == "__main__"):
    app.run(debug = True)
    