from flask import Flask, jsonify, request
import mysql.connector
from flask_cors import CORS  # Add this import

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

def get_products_from_db(page, per_page):
    offset = (page - 1) * per_page
    conn = mysql.connector.connect(
        host="localhost",
        user="root",
        password="Praveen Kumar",
        database="ecommerce"
    )
    cursor = conn.cursor(dictionary=True)
    cursor.execute(
        "SELECT id, name, price, image FROM products LIMIT %s OFFSET %s",
        (per_page, offset)
    )
    products = cursor.fetchall()
    cursor.close()
    conn.close()
    return products

@app.route('/products', methods=['GET'])
def get_products():
    page = int(request.args.get('page', 1))
    per_page = int(request.args.get('per_page', 10))
    products = get_products_from_db(page, per_page)
    return jsonify(products)

@app.route('/product/<int:product_id>', methods=['GET'])
def get_product_detail(product_id):
    conn = mysql.connector.connect(
        host="localhost",
        user="root",
        password="Praveen Kumar",
        database="ecommerce"
    )
    cursor = conn.cursor(dictionary=True)
    cursor.execute(
        "SELECT name AS title, image, price FROM products WHERE id = %s",
        (product_id,)
    )
    product = cursor.fetchone()
    cursor.close()
    conn.close()
    if product:
        product['description'] = (
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. "
            "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
        )
        return jsonify(product)
    else:
        return jsonify({"error": "Product not found"}), 404

if __name__ == '__main__':
    app.run(debug=True)