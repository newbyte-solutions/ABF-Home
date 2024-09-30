from flask import Flask, request, jsonify, session
from flask_redis import FlaskRedis

# config
app = Flask(__name__)
redis_store = FlaskRedis(app)

# redis connection
try:
    redis_store.ping()
    print("Redis connection successful")
except Exception as e:
    print(f"Redis connection failed: {str(e)}")

# routes
@app.route('/auth/login', methods=['POST'])
def login():
    if request.method == 'POST':
        username = request.form['username']
        password = request.form['password']
        # check if user exists in database
        user = redis_store.hgetall(f"user:{username}")
        
        if user:
            # if user exists, check password
            stored_password = user.get(b'password').decode('utf-8')
            if password == stored_password:
                # if user exists and password is correct, return success message
                return jsonify({'message': 'Login successful'}), 200
            else:
                # if password is incorrect, return error message
                return jsonify({'message': 'Invalid password'}), 401
        else:
            # if user does not exist, return error message
            return jsonify({'message': 'User not found'}), 404

@app.route('/auth/register', methods=['POST'])
def register():
    if request.method == 'POST':
        username = request.form['username']
        password = request.form['password']
        # check if user already exists in
        if redis_store.hexists(f"user:{username}", "username"):
            return jsonify({'message': 'User already exists'}), 409
        else:
            # if user does not exist, create new user
            redis_store.hset(f"user:{username}", "username", username)
            redis_store.hset(f"user:{username}", "password", password)
            return jsonify({'message': 'User created successfully'}), 201
    
@app.route('/auth/logout', methods=['POST'])
def logout():
    if request.method == 'POST':
        # check if user is logged in
        if 'username' in session:
            # if user is logged in, log them out
            session.pop('username', None)
            return jsonify({'message': 'Logout successful'}), 200
        else:
            # if user is not logged in, return error message
            return jsonify({'message': 'User not logged in'}), 401
        
@app.route('/auth/check', methods=['GET'])
def check_auth():
    if request.method == 'GET':
        # check if user is logged in
        if 'username' in session:
            # if user is logged in, return success
            return jsonify({'message': 'User is logged in'}), 200
        else:
            # if user is not logged in, return error message
            return jsonify({'message': 'User is not logged in'}), 401

# news system
@app.route('/news', methods=['GET'])
def get_news():
    if request.method == 'GET':
        # get all news from database
        news = redis_store.hgetall('news')
        # return news
        return jsonify(news), 200

@app.route('/news', methods=['POST'])
def create_news():
    if request.method == 'POST':
        # get news from request
        title = request.form['title']
        content = request.form['content']
        authur = request.form['authur']
        grade = request.form['grade']
        description  = request.form['description']

        # add to db
        redis_store.hset('news', title, {'title': title, 'content': content, 'authur': authur, 'grade': grade, 'description': description})
        return jsonify({'message': 'News created successfully'}), 201

@app.route('/news/<title>', methods=['GET'])
def get_news_by_title(title):
    if request.method == 'GET':
        # get news from database
        news = redis_store.hgetall('news')
        # return news
        return jsonify(news), 200
    
@app.route('/news/<title>', methods=['DELETE'])
def delete_news(title):
    if request.method == 'DELETE':
        # delete news from database
        redis_store.hdel('news', title)
        return jsonify({'message': 'News deleted successfully'}), 200

# run the server
if __name__ == '__main__':
    app.run(debug=True)