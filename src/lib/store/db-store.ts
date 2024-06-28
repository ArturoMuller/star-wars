import {
  PAGE,
  PAGES_INDEX,
  PAGES_STORE,
  PEOPLE_STORE,
  PLANET_STORE,
} from '$lib/store/constants';

let db;

export const dbInit: () => Promise<IDBDatabase> = async () => {
  return await openConnection('starWars', 10, (db) => {
    // version change transaction code goes here
  });
};

function openConnection(
  dbName: string,
  version: number,
  upgradeTxn: (db: IDBDatabase) => void
): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(dbName, version);
    // Version change transaction
    request.onupgradeneeded = function (event) {
      db = request.result; // IDBDatabase
      if (!db.objectStoreNames.contains(PLANET_STORE)) {
        const planetsObjectStore = db.createObjectStore(PLANET_STORE, {
          keyPath: 'url',
        });
        planetsObjectStore.createIndex(PAGES_INDEX, PAGE, {
          unique: false,
        });
      }
      if (!db.objectStoreNames.contains(PEOPLE_STORE)) {
        const peopleObjectStore = db.createObjectStore(PEOPLE_STORE, {
          keyPath: 'url',
        });
      }
      if (!db.objectStoreNames.contains(PAGES_STORE)) {
        const peopleObjectStore = db.createObjectStore(PAGES_STORE, {
          keyPath: PAGE,
        });
      }
      upgradeTxn(request.result);
      resolve(request.result);
    };
    // Update completed successfully, DB connection is established
    request.onsuccess = () => {
      db = request.result; // IDBDatabase
      resolve(request.result);
    };

    // Something goes wrong during connection opening and / or
    // during version upgrade
    request.onerror = (errorEvent) => {
      console.error('Cannot open db');
      reject(errorEvent);
    };

    // Stands for blocked DB
    request.onblocked = () => {
      console.warn('Db is blocked');
      reject('db is blocked');
    };
  });
}

export function addData(storeName, data) {
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(storeName, 'readwrite');
    const store = transaction.objectStore(storeName);
    const request = store.put(data);

    request.onsuccess = () => {
      resolve(request.result);
    };

    request.onerror = () => {
      reject(request.error);
    };

    transaction.oncomplete = () => {
      console.log('Transaction completed: database modification finished.');
    };

    transaction.onerror = () => {
      console.error('Transaction not opened due to error: ', transaction.error);
    };
  });
}

export function addBulk(storeName, data, page = undefined) {
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(storeName, 'readwrite');
    const store = transaction.objectStore(storeName);
    const pageParams = page ? { page: page } : {};

    for (const item of data) {
      store.put({ ...item, ...pageParams });
    }

    transaction.oncomplete = () => {
      console.log('Transaction completed: database modification finished.');
    };

    transaction.onerror = () => {
      console.error('Transaction not opened due to error: ', transaction.error);
    };
  });
}

export function getElem(storeName, key) {
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(storeName, 'readonly');
    const objectStore = transaction.objectStore(storeName);
    const request = objectStore.get(key);

    request.onsuccess = function (event) {
      const elem = event.target.result;
      if (elem) {
        resolve(elem);
      } else {
        resolve(undefined);
      }
    };

    request.onerror = function (event) {
      reject(event.target.error);
    };
  });
}

export function loadPlanets(page) {
  return new Promise((resolve, reject) => {
    const txn = db.transaction([PLANET_STORE, PAGES_STORE], 'readonly');
    const planetStore = txn.objectStore(PLANET_STORE);
    const pageStore = txn.objectStore(PAGES_STORE);
    const planetIndex = planetStore.index(PAGES_INDEX);
    const requestPlanet = planetIndex.getAll(page);
    const requestPage = pageStore.get(page);
    txn.oncomplete = function (event) {
      if (requestPlanet.result && requestPage.result) {
        const results = requestPlanet.result;
        const { next, previous } = requestPage.result;
        debugger;
        resolve({ results, next, previous });
      } else {
        resolve(undefined);
      }
    };

    txn.onerror = function (event) {
      reject(event.target.error);
    };
  });
}

export function getElems(storeName, key) {
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(storeName, 'readonly');
    const objectStore = transaction.objectStore(storeName);
    const request = objectStore.getAll(key);

    request.onsuccess = function (event) {
      const elem = event.target.result;
      if (elem) {
        resolve(elem);
      } else {
        resolve(undefined);
      }
    };

    request.onerror = function (event) {
      reject(event.target.error);
    };
  });
}
