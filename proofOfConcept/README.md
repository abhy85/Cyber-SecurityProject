# Padding Oracle Attack

A demonstration of the Padding Oracle Attack against an AES-CBC encrypted HTTP service. This project shows how an attacker can decrypt ciphertext without knowing the encryption key, purely by exploiting the information leaked through padding validation responses.

AES-CBC (Cipher Block Chaining) mode requires that plaintext be padded to a multiple of the block size before encryption (PKCS#7 standard). If a server decrypts data and reports back whether the padding was valid or invalid, an attacker can use that single bit of information as an oracle to recover the plaintext byte by byte.

---

## Proof of Concept

The proof of concept is located in the `proofofconcept/` folder and consists of three scripts that together demonstrate the full attack in a local environment.

#### [Demo Video](https://www.youtube.com/watch?v=Ku4TqYv__EM)

### Files

```
proofofconcept/
    client.py      - Encrypts a plaintext message and outputs the base64 ciphertext
    server.py      - Vulnerable Flask server that leaks padding validity
    attacker.py    - Attack script that recovers plaintext using the oracle
```

### How It Works

**client.py**

Encrypts a hardcoded plaintext message using AES-CBC with a fixed 16-byte key and IV. Outputs a base64-encoded ciphertext that is passed to the attacker.

**server.py**

Runs a local Flask server on port 5000 exposing a `/decrypt` endpoint. It accepts a base64-encoded ciphertext, decrypts it using AES-CBC, and checks the PKCS#7 padding. If padding is valid, it returns `{"status": "valid"}`; otherwise it returns `{"status": "invalid padding"}`. This difference in response is the vulnerability being exploited.

**attacker.py**

Takes the base64 ciphertext as input and queries the server repeatedly with modified ciphertext blocks. By flipping bytes in the previous ciphertext block and observing the server response, it recovers the intermediate decryption bytes through XOR arithmetic. This process is repeated for every byte of every block until the full plaintext is recovered, without ever knowing the encryption key.

### Running the Proof of Concept

1. Install dependencies:
   ```
   pip install flask pycryptodome requests
   ```

2. Start the vulnerable server:
   ```
   python proofofconcept/server.py
   ```

3. Generate the ciphertext:
   ```
   python proofofconcept/client.py
   ```

4. Run the attack (paste the ciphertext when prompted):
   ```
   python proofofconcept/attacker.py
   ```

The attacker will recover and print the original plaintext.
