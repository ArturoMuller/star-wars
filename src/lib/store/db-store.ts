let db;

export const dbInit: () => Promise<IDBDatabase> = async () => {
    return await openConnection('starWars', 6, (db) => {
        // version change transaction code goes here
    });
}

function openConnection(dbName: string, version: number, upgradeTxn: (db: IDBDatabase) => void): Promise<IDBDatabase> {
    return new Promise((resolve,reject) => {
        const request = indexedDB.open(dbName, version);
        // Version change transaction
        request.onupgradeneeded = function (event) {
            db = request.result; // IDBDatabase
            if (!db.objectStoreNames.contains('planet-store')) {
                const planetsObjectStore = db.createObjectStore('planet-store', {
                    keyPath: 'id',
                });
            }
            if (!db.objectStoreNames.contains('people-store')) {
                const peopleObjectStore = db.createObjectStore('people-store', {
                    keyPath: 'id',
                });
            }
            upgradeTxn(request.result);
        }
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

        const request = store.add(data);

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
