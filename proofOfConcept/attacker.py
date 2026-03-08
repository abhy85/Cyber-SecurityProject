import requests
import base64

URL = "http://127.0.0.1:5000/decrypt"

BLOCK_SIZE = 16


def oracle(ciphertext):

    r = requests.post(
        URL,
        json={"ciphertext": base64.b64encode(ciphertext).decode()}
    )

    return r.json()["status"] == "valid"


def padding_oracle_attack(ciphertext):

    blocks = [ciphertext[i:i+BLOCK_SIZE] for i in range(0, len(ciphertext), BLOCK_SIZE)]

    iv = b'InitializationVe'

    blocks = [iv] + blocks

    plaintext = b''

    for block_index in range(1, len(blocks)):

        prev = bytearray(blocks[block_index-1])
        curr = blocks[block_index]

        recovered = bytearray(16)
        modified = bytearray(prev)

        print("\nDecrypting block", block_index)

        for i in range(15, -1, -1):

            pad = 16 - i

            for j in range(256):

                modified[i] = j

                for k in range(i+1, 16):
                    modified[k] = prev[k] ^ recovered[k] ^ pad

                test = bytes(modified) + curr

                if oracle(test):

                    recovered[i] = j ^ pad ^ prev[i]

                    print("Recovered byte:", recovered[i])

                    break

        plaintext += recovered

    return plaintext


ciphertext_input = input("Paste ciphertext: ")

ciphertext = base64.b64decode(ciphertext_input)

plaintext = padding_oracle_attack(ciphertext)

print("\nRecovered plaintext:")
print(plaintext)