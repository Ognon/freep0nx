from Crypto.PublicKey import RSA
from Crypto.Cipher import PKCS1_OAEP
from Crypto.Util.number import bytes_to_long


sk = RSA.generate(2048)
pk = sk.public_key()

oignon = pow(sk.p + sk.q * int(b"freep0nx".hex(), 16), sum(ord(c)**2 for c in "freep0nx"), sk.n)
vorstag = pow(sk.p + 2025, sk.q, sk.n)
c = bytes_to_long(PKCS1_OAEP.new(pk).encrypt(open("flag.txt", "rb").read()))
print(f"n = { pk.n }")
print(f"{oignon = }")
print(f"{vorstag = }")
print(f"{c = }")
