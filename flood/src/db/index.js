import { openDB } from "idb";


const dbPromise = openDB('floodassess-db', 1, {
    upgrade(db) {
        db.createObjectStore('assessments', { keyPath: 'localId' });
        const photoStore = db.createObjectStore('photos', {
            keyPath: 'id',
            autoIncrement: true,
        });
        photoStore.createIndex('localId', 'localId');
    },
});

export const saveAssessment = async (body) => {
    const db = await dbPromise;
    await db.add('assessments', body);
    return { success: true, message: 'Assessment saved locally!' };
}

export const getAllAssessments = async () => {
    const db = await dbPromise;
    return await db.getAll('assessments');
}

export const savePhoto = async (localId, images) => {
    const db = await dbPromise;
    for (const file of images) {
        await db.add('photos', { localId, file });
    }
}

export const getPhotosByLocalId = async (localId) => {
    const db = await dbPromise;
    return await db.getAllFromIndex('photos', 'localId', localId);
}

export const deletePhotosByLocalId = async (localId) => {
    const db = await dbPromise;
    const photos = await getPhotosByLocalId(localId);
    for (const photo of photos) {
        await db.delete('photos', photo.id);
    }
};

export const deleteAssessment = async (localId) => {
    const db = await dbPromise;
    await db.delete('assessments', localId);
    await deletePhotosByLocalId(localId);
}

export default dbPromise
