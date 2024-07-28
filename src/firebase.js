import {app} from "./firebaseInit.js";
import { getDatabase, ref, set, get, onValue } from "firebase/database";

class Firebase {
    constructor() {
        this.db = getDatabase(app);
    }

    async connect(id) {
        this.roomId = id;
    }
    async set(path, data) {
        await set(ref(this.db, this.roomId + '/' + path), data);
    }

    async read(path) {
        const snapshot = await get(ref(this.db, this.roomId + '/' + path));
        return snapshot.val();
    }

    async listen(path, callback) {
        return onValue(ref(this.db, this.roomId + '/' + path), (snapshot) => {
            callback(snapshot.val());
        })
    }
}

export const firebase = new Firebase();
