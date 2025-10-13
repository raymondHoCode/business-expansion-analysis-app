from flask import Flask, jsonify, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/api/businesses', methods=['GET'])
def get_businesses():
    category = request.args.get('category')
    location = request.args.get('location')
    # Placeholder response
    return jsonify({"category": category, "location": location, "businesses": []})

if __name__ == '__main__':
    app.run(debug=True)
