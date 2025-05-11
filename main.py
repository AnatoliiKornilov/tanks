import sqlite3 as sql
from flask import Flask, request, jsonify, render_template

app = Flask(__name__, static_folder="static", template_folder="templates")


def connectToDb():
    return sql.connect('leaderboard.db')


def createDb():
    connection = connectToDb()
    connection.execute("""
    CREATE TABLE IF NOT EXISTS leaderboard (
        name TEXT,
        score INTEGER
        );
    """)


@app.route('/')
def openMainWindow():
    return render_template('main_window.html')


@app.route('/game')
def openGameWindow():
    return render_template('game_window.html')


@app.route('/rulls')
def openRullsWindow():
    return render_template('rulls_window.html')


@app.route('/leaderboard')
def openLeaderboard():
    return render_template('leaderboard_window.html')


@app.route('/save_score')
def openSaveScoreWindow():
    return render_template('save_score_window.html')


@app.route('/api/scores', methods=['POST'])
def addScore():
    data = request.json
    name = data['name']
    score = int(data['score'])
    print(name, score)
    connection = connectToDb()
    query = 'INSERT INTO leaderboard (name, score) values(?, ?)'
    connection.execute(query, (name, score))
    connection.commit()
    connection.close()
    return 'OK', 200


@app.route('/api/scores', methods=['GET'])
def getLeaderboard():
    connection = connectToDb()
    data = connection.execute("""SELECT * FROM leaderboard ORDER BY score DESC LIMIT 100""")
    return jsonify([{'name': row[0], 'score': row[1]} for row in data])


createDb()
if __name__ == '__main__':
    app.run(debug=True, port=5000)
