"""This will be the main file for the Flask app"""

from flask import Flask, render_template, request, jsonify

app = Flask(__name__)

@app.route("/")
def index():
    """renders index.html"""
    return render_template("index.html")


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)