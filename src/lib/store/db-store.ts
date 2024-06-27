let db
export const dbInit: () => Promise<IDBDatabase> = async () => {
    return await openConnection('starWars', 5, (db) => {
        // version change transaction code goes here
    });
}

function openConnection(dbName: string, version: number, upgradeTxn: (db: IDBDatabase) => void): Promise<IDBDatabase> {
    return new Promise((resolve,reject) => {
        const request = indexedDB.open(dbName, version);
        // Version change transaction
        request.onupgradeneeded = function (event) {
            debugger;
            db = request.result; // IDBDatabase
            upgradeTxn(request.result);
            const planetsObjectStore = db.createObjectStore("planet-store", {
                keyPath: "id",
            });
            const peopleObjectStore = db.createObjectStore("people-store", {
                keyPath: "id",
            });
        }
        // Update completed successfully, DB connection is established
        request.onsuccess = () => {
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
