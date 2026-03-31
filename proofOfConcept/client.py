from Crypto.Cipher import AES
from Crypto.Util.Padding import pad
import base64

KEY = b'Sixteen byte key'
IV = b'InitializationVe'

BLOCK_SIZE = 16

message = b"first message is this from client hello"

cipher = AES.new(KEY, AES.MODE_CBC, IV)

ciphertext = cipher.encrypt(pad(message, BLOCK_SIZE))

encoded = base64.b64encode(ciphertext).decode()

print("\nCiphertext to attack:\n")
print(encoded)