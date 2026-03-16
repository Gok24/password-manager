// db.js
const DB_NAME = 'LoginVault';
const DB_VERSION = 1;
const STORE_NAME = 'credentials';

function openDB() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);
    request.onerror = (e) => reject(e.target.error);
    request.onsuccess = (e) => resolve(e.target.result);
    request.onupgradeneeded = (e) => {
      const db = e.target.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: 'id', autoIncrement: true });
      }
    };
  });
}




function strToArrayBuffer(str) {
  return new TextEncoder().encode(str);
}

function arrayBufferToStr(buffer) {
  return new TextDecoder().decode(buffer);
}

function bufferToBase64(buffer) {
  return btoa(String.fromCharCode(...new Uint8Array(buffer)));
}

function base64ToBuffer(base64) {
  const binary = atob(base64);
  const buffer = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) {
      buffer[i] = binary.charCodeAt(i);
  }
  return buffer;
}

async function generateRandomKey() {
  return await crypto.subtle.generateKey(
      { name: "AES-GCM", length: 256 },
      true,
      ["encrypt", "decrypt"]
  );
}





async function encryptField(value, key, iv) {
  if (typeof value !== 'string') {
      console.warn("encryptField: value is not a string:", value);
  }

  const encrypted = await crypto.subtle.encrypt(
      { name: "AES-GCM", iv },
      key,
      strToArrayBuffer(value)
  );
  return bufferToBase64(encrypted);
}


async function addCredential({ key, username, email, password, logourl }) {
  try {
      
      const aesKey = await generateRandomKey();
      const iv = crypto.getRandomValues(new Uint8Array(12));

      const encryptedUsername = await encryptField(username, aesKey, iv);
      const encryptedEmail = await encryptField(email, aesKey, iv);
      const encryptedPassword = await encryptField(password, aesKey, iv);

      const exportedKey = await crypto.subtle.exportKey("raw", aesKey);
      const keyBase64 = bufferToBase64(exportedKey);
      const ivBase64 = bufferToBase64(iv);

      const record = {
          key,
          username: encryptedUsername,
          email: encryptedEmail,
          password: encryptedPassword,
          logourl,
          encryptionKey: keyBase64,
          iv: ivBase64
      };

      
      const db = await openDB();
      const tx = db.transaction(STORE_NAME, 'readwrite');
      const store = tx.objectStore(STORE_NAME);

      store.add(record); 
      return tx.complete;
  } catch (err) {
      console.error("Error saving credential:", err);
      throw err;
  }
}





async function decryptField(encryptedBase64, key, iv) {
  const encrypted = base64ToBuffer(encryptedBase64);
  const decrypted = await crypto.subtle.decrypt(
      { name: "AES-GCM", iv },
      key,
      encrypted
  );
  return arrayBufferToStr(decrypted);
}

async function decryptCredential(credential) {
  const keyBuffer = base64ToBuffer(credential.encryptionKey);
  const key = await crypto.subtle.importKey("raw", keyBuffer, { name: "AES-GCM" }, false, ["decrypt"]);
  const iv = base64ToBuffer(credential.iv);

  return {
      ...credential,
      username: await decryptField(credential.username, key, iv),
      email: await decryptField(credential.email, key, iv),
      password: await decryptField(credential.password, key, iv)
  };
}


async function getCredentialsByKey(key) {
  const db = await openDB();
  const rawResults = [];

  await new Promise((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, 'readonly');
      const store = tx.objectStore(STORE_NAME);

      const request = store.openCursor();
      request.onsuccess = (e) => {
          const cursor = e.target.result;
          if (cursor) {
              if (cursor.value.key === key) {
                  rawResults.push(cursor.value);  
              }
              cursor.continue();
          } else {
              resolve();
          }
      };
      request.onerror = () => reject(request.error);
  });

  const decryptedResults = await Promise.all(
      rawResults.map(decryptCredential)
  );

  return decryptedResults;
}



async function getAllCredentials() {
  const db = await openDB();
  const rawResults = [];

  
  await new Promise((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, 'readonly');
      const store = tx.objectStore(STORE_NAME);

      const request = store.openCursor();
      request.onsuccess = (e) => {
          const cursor = e.target.result;
          if (cursor) {
              rawResults.push(cursor.value);  
              cursor.continue();
          } else {
              resolve();
          }
      };
      request.onerror = () => reject(request.error);
  });

  
  const decryptedResults = await Promise.all(
      rawResults.map(decryptCredential)
  );

  return decryptedResults;
}


// db.js
async function updateCredential(id, { key, username, email, password, logourl }) {
  try {
    
    const aesKey = await generateRandomKey();
    const iv = crypto.getRandomValues(new Uint8Array(12));

    const encryptedUsername = await encryptField(username, aesKey, iv);
    const encryptedEmail = await encryptField(email, aesKey, iv);
    const encryptedPassword = await encryptField(password, aesKey, iv);

    const exportedKey = await crypto.subtle.exportKey("raw", aesKey);
    const keyBase64 = bufferToBase64(exportedKey);
    const ivBase64 = bufferToBase64(iv);

   
    const db = await openDB();
    const tx = db.transaction(STORE_NAME, 'readwrite');
    const store = tx.objectStore(STORE_NAME);

    
    const existing = await new Promise((resolve, reject) => {
      const request = store.get(id);
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });

    if (!existing) {
      console.warn("Credential not found for update:", id);
      return false;
    }


    const updated = {
      ...existing,
      key,
      username: encryptedUsername,
      email: encryptedEmail,
      password: encryptedPassword,
      logourl,
      encryptionKey: keyBase64,
      iv: ivBase64
    };

    store.put(updated);
    return tx.complete;
  } catch (err) {
    console.error("Error updating credential:", err);
    throw err;
  }
}


async function deleteCredential(id) {
    const db = await openDB();
    const tx = db.transaction(STORE_NAME, 'readwrite');
    const store = tx.objectStore(STORE_NAME);
    store.delete(id);
    return tx.complete;
  }

async function deleteDatabase() {
    return new Promise((resolve, reject) => {
      const request = indexedDB.deleteDatabase(DB_NAME);
      
      request.onerror = (e) => reject(`Error deleting database: ${e.target.error}`);
      request.onsuccess = () => resolve(`Database ${DB_NAME} deleted successfully`);
    });
  }
  