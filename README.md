# Padding Oracle Attack (Web Demo)

This project demonstrates the **Padding Oracle Attack** using an interactive web application built with Next.js. It complements the proof of concept by providing a visual and user-friendly interface to understand how the attack works in practice.

Demo:- [Website](https://cyber-security-project.vercel.app/)

---

## Overview

The **proof of concept** (in `proofofconcept/`) shows the attack programmatically using Python scripts. It simulates a vulnerable server and an automated attacker to recover plaintext from ciphertext.

This **padding-oracle** module extends that idea into a web-based demonstration where users can:

* Input or generate ciphertext
* Observe how padding validation leaks information
* See how byte-by-byte decryption is performed
* Understand the internal steps of the attack visually

---

## What is a Padding Oracle Attack

A Padding Oracle Attack targets systems using **AES-CBC encryption with PKCS#7 padding**.

When a server:

1. Decrypts ciphertext
2. Checks padding validity
3. Returns different responses for valid vs invalid padding

…it unintentionally leaks information.

An attacker can:

* Modify ciphertext blocks
* Send them to the server
* Use the padding response as a **1-bit oracle**
* Recover plaintext **byte-by-byte without the key**

---

## Web Application (Next.js)

The `padding-oracle/` directory contains a Next.js application that simulates:

* AES-CBC encryption/decryption
* A vulnerable padding oracle endpoint
* Step-by-step attack visualization

---

## Features

* Interactive UI for encryption and attack
* Real-time padding validation feedback
* Visual breakdown of:

  * Ciphertext blocks
  * Intermediate values
  * XOR operations
* Educational demonstration of the full attack flow

---

## Project Structure

```
padding-oracle/
    app/                - Next.js app directory
    components/         - UI components for visualization
    lib/                - Crypto logic (AES-CBC, padding, oracle)
    public/             - Static assets
```

---

## Setup and Run

### 1. Install dependencies

```
cd padding-oracle
npm install
```

### 2. Run development server

```
npm run dev
```

### 3. Open in browser

```
http://localhost:3000
```

---

## Build for Production

```
npm run build
npm start
```

---

## Summary

* `proofofconcept/` → Script-based demonstration (Python)
* `padding-oracle/` → Interactive web-based visualization (Next.js)

Together, they provide both:

* **Practical attack execution**
* **Conceptual understanding through visualization**
