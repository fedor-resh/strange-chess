import {app} from "./firebaseInit.js";
import { getDatabase, ref, set, get } from "firebase/database";

export async function writeData(path, data) {
    const db = getDatabase(app);
    await set(ref(db, path), data);
}

export async function readData(path) {
    const db = getDatabase(app);
    const snapshot = await get(ref(db, path));
    return snapshot.val();
}

