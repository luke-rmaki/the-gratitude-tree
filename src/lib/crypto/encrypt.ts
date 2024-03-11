/**
 * Encrypts plaintext using AES-GCM with supplied password, for decryption with aesGcmDecrypt().
 *                                                                      (c) Chris Veness MIT Licence
 *
 * @param   {String} plaintext - Plaintext to be encrypted.
 * @param   {String} password - Password to use to encrypt plaintext.
 * @returns {String} Encrypted ciphertext.
 *
 * @example
 *   const ciphertext = await aesGcmEncrypt('my secret text', 'pw');
 *   aesGcmEncrypt('my secret text', 'pw').then(function(ciphertext) { console.log(ciphertext); });
 */
export async function aesGcmEncrypt(plaintext: string, password: string) {
	const pwUtf8 = new TextEncoder().encode(password); // encode password as UTF-8
	const pwHash = await crypto.subtle.digest('SHA-256', pwUtf8); // hash the password

	const iv = crypto.getRandomValues(new Uint8Array(12)); // get 96-bit random iv
	const ivStr = Array.from(iv)
		.map((b) => String.fromCharCode(b))
		.join(''); // iv as utf-8 string

	const alg = { name: 'AES-GCM', iv: iv }; // specify algorithm to use

	const key = await crypto.subtle.importKey('raw', pwHash, alg, false, ['encrypt']); // generate key from pw

	const ptUint8 = new TextEncoder().encode(plaintext); // encode plaintext as UTF-8
	const ctBuffer = await crypto.subtle.encrypt(alg, key, ptUint8); // encrypt plaintext using key

	const ctArray = Array.from(new Uint8Array(ctBuffer)); // ciphertext as byte array
	const ctStr = ctArray.map((byte) => String.fromCharCode(byte)).join(''); // ciphertext as string

	return btoa(ivStr + ctStr); // iv+ciphertext base64-encoded
}
