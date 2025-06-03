"""This will be the main file for the Flask app"""

from flask import Flask, render_template, request, jsonify

app = Flask(__name__)

@app.route("/")
def index():
    """renders index.html"""
    return render_template("index.html")

@app.route("/about")
def about():
    """renders about.html"""
    return render_template("about.html", active_page='about')

@app.route("/design")
def design():
    """renders design.html"""
    return render_template("design.html", active_page='design')

@app.route("/art")
def art():
    """renders art.html"""
    return render_template("art.html", active_page='art')

@app.route("/code")
def art():
    """renders code.html"""
    return render_template("code.html", active_page='code')


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=8080, debug=True, use_reloader=True)