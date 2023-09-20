import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {
  const putDb = await openDB('jate', 1);
  const tx = putDb.transaction('jate', 'readwrite');
  const store = tx.objectStore('jate');
  const request = store.put({ id: 1, value: content });
  const result = await request;

  if (!result) {
    console.log('Data not saved to database!');
  } else {
    console.log('Data saved to the database', result);
  }
};

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {
  const jateDb = await openDB('todos', 1);
  const tx = jateDb.transaction('jate', 'readonly');
  const store = tx.objectStore('todos');
  const request = store.getAll();
  const result = await request;

  if (!result) {
    console.log('No data found in database');
  } else {
    console.log('Data from database:');
    return result;
  }
};

initdb();
