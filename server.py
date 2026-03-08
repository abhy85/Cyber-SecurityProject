from flask import Flask, request, jsonify
from Crypto.Cipher import AES
import base64

app = Flask(__name__)

KEY = b'Sixteen byte key'
IV = b'InitializationVe'

BLOCK_SIZE = 16


def unpad(data):
    pad = data[-1]
    if pad < 1 or pad > 16:
        raise ValueError("bad padding")

    for i in range(pad):
        if data[-1 - i] != pad:
            raise ValueError("bad padding")

    return data[:-pad]


@app.route('/decrypt', methods=['POST'])
def decrypt():

    data = request.json["ciphertext"]
    ciphertext = base64.b64decode(data)

    cipher = AES.new(KEY, AES.MODE_CBC, IV)
    plaintext = cipher.decrypt(ciphertext)

    try:
        unpad(plaintext)
        return jsonify({"status": "valid"})
    except:
        return jsonify({"status": "invalid padding"})


app.run(port=5000)