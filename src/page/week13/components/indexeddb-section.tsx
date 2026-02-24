import { useEffect, useState } from 'react';
import { Trans, useTranslation } from 'react-i18next';
import { DemoBox } from '../../../components/demo-box';
import { InfoBox } from '../../../components/info-box';
import { SectionCard } from '../../../components/section-card';
import { SubSection } from '../../../components/sub-section';
import { CodeBlock } from '../../../components/ui/code-block';

interface Todo {
  id: number;
  text: string;
  completed: boolean;
  createdAt: number;
}

export const IndexedDBSection = () => {
  const { t } = useTranslation('week13');
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState('');
  const [db, setDb] = useState<IDBDatabase | null>(null);
  const [dbStatus, setDbStatus] = useState<string>(
    t('indexedDB.demo.initializing'),
  );

  useEffect(() => {
    const request = indexedDB.open('week13-demo', 1);

    request.onerror = () => {
      setDbStatus('Error opening database');
    };

    request.onsuccess = () => {
      const database = request.result;
      setDb(database);
      setDbStatus(t('indexedDB.demo.connected'));
      loadTodos(database);
    };

    request.onupgradeneeded = (event) => {
      const database = (event.target as IDBOpenDBRequest).result;
      if (!database.objectStoreNames.contains('todos')) {
        const store = database.createObjectStore('todos', { keyPath: 'id' });
        store.createIndex('completed', 'completed', { unique: false });
        store.createIndex('createdAt', 'createdAt', { unique: false });
      }
    };
  }, []);

  const loadTodos = (database: IDBDatabase) => {
    const transaction = database.transaction('todos', 'readonly');
    const store = transaction.objectStore('todos');
    const request = store.getAll();

    request.onsuccess = () => {
      setTodos(request.result);
    };
  };

  const addTodo = () => {
    if (!db || !newTodo.trim()) return;

    const todo: Todo = {
      id: Date.now(),
      text: newTodo.trim(),
      completed: false,
      createdAt: Date.now(),
    };

    const transaction = db.transaction('todos', 'readwrite');
    const store = transaction.objectStore('todos');
    store.add(todo);

    transaction.oncomplete = () => {
      setTodos([...todos, todo]);
      setNewTodo('');
    };
  };

  const toggleTodo = (id: number) => {
    if (!db) return;

    const todo = todos.find((t) => t.id === id);
    if (!todo) return;

    const updated = { ...todo, completed: !todo.completed };
    const transaction = db.transaction('todos', 'readwrite');
    const store = transaction.objectStore('todos');
    store.put(updated);

    transaction.oncomplete = () => {
      setTodos(todos.map((t) => (t.id === id ? updated : t)));
    };
  };

  const deleteTodo = (id: number) => {
    if (!db) return;

    const transaction = db.transaction('todos', 'readwrite');
    const store = transaction.objectStore('todos');
    store.delete(id);

    transaction.oncomplete = () => {
      setTodos(todos.filter((t) => t.id !== id));
    };
  };

  const clearAll = () => {
    if (!db) return;

    const transaction = db.transaction('todos', 'readwrite');
    const store = transaction.objectStore('todos');
    store.clear();

    transaction.oncomplete = () => {
      setTodos([]);
    };
  };

  return (
    <SectionCard
      badge={{ label: t('indexedDB.badge'), color: 'purple' }}
      title={t('indexedDB.title')}
      description={t('indexedDB.description')}
    >
      <div className="space-y-8">
        <SubSection title={t('indexedDB.whatIs.title')} icon iconColor="blue">
          <InfoBox variant="purple" title={t('indexedDB.whatIs.infoTitle')}>
            <p className="text-sm leading-relaxed">
              <Trans t={t} i18nKey="indexedDB.whatIs.description" />
            </p>
            <ul className="list-disc pl-5 space-y-1 text-sm mt-3">
              <li>
                <Trans t={t} i18nKey="indexedDB.whatIs.largeStorage" />
              </li>
              <li>
                <Trans t={t} i18nKey="indexedDB.whatIs.asyncAPI" />
              </li>
              <li>
                <Trans t={t} i18nKey="indexedDB.whatIs.transactions" />
              </li>
              <li>
                <Trans t={t} i18nKey="indexedDB.whatIs.indexes" />
              </li>
            </ul>
          </InfoBox>
        </SubSection>

        <SubSection
          title={t('indexedDB.comparison.title')}
          icon
          iconColor="purple"
        >
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="bg-gray-50">
                  <th className="p-2 text-left border border-gray-200">
                    {t('indexedDB.comparison.feature')}
                  </th>
                  <th className="p-2 text-left border border-gray-200">
                    {t('indexedDB.comparison.localStorage')}
                  </th>
                  <th className="p-2 text-left border border-gray-200">
                    {t('indexedDB.comparison.indexedDB')}
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="p-2 border border-gray-200 font-medium">
                    {t('indexedDB.comparison.capacity')}
                  </td>
                  <td className="p-2 border border-gray-200">
                    {t('indexedDB.comparison.capacityLS')}
                  </td>
                  <td className="p-2 border border-gray-200 text-green-600">
                    {t('indexedDB.comparison.capacityIDB')}
                  </td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="p-2 border border-gray-200 font-medium">
                    {t('indexedDB.comparison.dataType')}
                  </td>
                  <td className="p-2 border border-gray-200">
                    {t('indexedDB.comparison.dataTypeLS')}
                  </td>
                  <td className="p-2 border border-gray-200 text-green-600">
                    {t('indexedDB.comparison.dataTypeIDB')}
                  </td>
                </tr>
                <tr>
                  <td className="p-2 border border-gray-200 font-medium">
                    {t('indexedDB.comparison.api')}
                  </td>
                  <td className="p-2 border border-gray-200 text-green-600">
                    {t('indexedDB.comparison.apiLS')}
                  </td>
                  <td className="p-2 border border-gray-200">
                    {t('indexedDB.comparison.apiIDB')}
                  </td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="p-2 border border-gray-200 font-medium">
                    {t('indexedDB.comparison.indexing')}
                  </td>
                  <td className="p-2 border border-gray-200 text-red-600">
                    {t('indexedDB.comparison.indexingLS')}
                  </td>
                  <td className="p-2 border border-gray-200 text-green-600">
                    {t('indexedDB.comparison.indexingIDB')}
                  </td>
                </tr>
                <tr>
                  <td className="p-2 border border-gray-200 font-medium">
                    {t('indexedDB.comparison.transactions')}
                  </td>
                  <td className="p-2 border border-gray-200 text-red-600">
                    {t('indexedDB.comparison.transactionsLS')}
                  </td>
                  <td className="p-2 border border-gray-200 text-green-600">
                    {t('indexedDB.comparison.transactionsIDB')}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </SubSection>

        <SubSection title={t('indexedDB.demo.title')} icon iconColor="green">
          <DemoBox label={t('indexedDB.demo.label')}>
            <div className="space-y-4">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs font-medium text-gray-500">
                  {t('indexedDB.demo.dbStatus')}
                </span>
                <span
                  className={`text-xs px-2 py-0.5 rounded ${
                    dbStatus === t('indexedDB.demo.connected')
                      ? 'bg-green-100 text-green-700'
                      : 'bg-yellow-100 text-yellow-700'
                  }`}
                >
                  {dbStatus}
                </span>
              </div>

              <div className="flex gap-2">
                <input
                  type="text"
                  value={newTodo}
                  onChange={(e) => setNewTodo(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && addTodo()}
                  placeholder={t('indexedDB.demo.placeholder')}
                  className="flex-1 px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
                <button
                  type="button"
                  onClick={addTodo}
                  className="px-4 py-2 text-sm bg-purple-500 text-white rounded-lg hover:bg-purple-600"
                >
                  {t('indexedDB.demo.add')}
                </button>
              </div>

              <div className="space-y-2 max-h-48 overflow-y-auto">
                {todos.length === 0 ? (
                  <p className="text-sm text-gray-400 text-center py-4">
                    {t('indexedDB.demo.noTodos')}
                  </p>
                ) : (
                  todos.map((todo) => (
                    <div
                      key={todo.id}
                      className="flex items-center gap-3 p-2 bg-white rounded border border-gray-100"
                    >
                      <input
                        type="checkbox"
                        checked={todo.completed}
                        onChange={() => toggleTodo(todo.id)}
                        className="w-4 h-4"
                      />
                      <span
                        className={`flex-1 text-sm ${
                          todo.completed
                            ? 'line-through text-gray-400'
                            : 'text-gray-700'
                        }`}
                      >
                        {todo.text}
                      </span>
                      <button
                        type="button"
                        onClick={() => deleteTodo(todo.id)}
                        className="text-red-400 hover:text-red-600 text-sm"
                      >
                        ✕
                      </button>
                    </div>
                  ))
                )}
              </div>

              {todos.length > 0 && (
                <button
                  type="button"
                  onClick={clearAll}
                  className="text-xs text-red-500 hover:text-red-700"
                >
                  {t('indexedDB.demo.clearAll')}
                </button>
              )}

              <p className="text-xs text-gray-400">
                {t('indexedDB.demo.persistMessage')}
              </p>
            </div>
          </DemoBox>
        </SubSection>

        <SubSection
          title={t('indexedDB.vanillaAPI.title')}
          icon
          iconColor="orange"
        >
          <CodeBlock
            code={`// Open database (creates if not exists)
const request = indexedDB.open('myDatabase', 1);

request.onupgradeneeded = (event) => {
  const db = event.target.result;

  // Create object store with auto-incrementing key
  const store = db.createObjectStore('users', {
    keyPath: 'id',
    autoIncrement: true
  });

  // Create indexes for efficient queries
  store.createIndex('email', 'email', { unique: true });
  store.createIndex('age', 'age', { unique: false });
};

request.onsuccess = (event) => {
  const db = event.target.result;

  // Add data
  const tx = db.transaction('users', 'readwrite');
  const store = tx.objectStore('users');
  store.add({ name: 'Alice', email: 'alice@example.com', age: 25 });

  // Query by index
  const emailIndex = store.index('email');
  const query = emailIndex.get('alice@example.com');
  query.onsuccess = () => console.log(query.result);
};`}
            className="text-xs"
          />
        </SubSection>

        <SubSection
          title={t('indexedDB.idbLibrary.title')}
          icon
          iconColor="red"
        >
          <InfoBox variant="blue" title={t('indexedDB.idbLibrary.infoTitle')}>
            <p className="text-sm">
              <Trans t={t} i18nKey="indexedDB.idbLibrary.description" />
            </p>
          </InfoBox>

          <CodeBlock
            code={`import { openDB } from 'idb';

// Open/create database
const db = await openDB('app-db', 1, {
  upgrade(db) {
    const store = db.createObjectStore('todos', { keyPath: 'id' });
    store.createIndex('completed', 'completed');
  },
});

// CRUD operations with clean async/await
// Create
await db.put('todos', { id: 1, text: 'Learn IndexedDB', completed: false });

// Read
const todo = await db.get('todos', 1);
const allTodos = await db.getAll('todos');

// Read by index
const incompleteTodos = await db.getAllFromIndex('todos', 'completed', false);

// Update
await db.put('todos', { ...todo, completed: true });

// Delete
await db.delete('todos', 1);

// Transaction (multiple operations atomically)
const tx = db.transaction('todos', 'readwrite');
await Promise.all([
  tx.store.put({ id: 2, text: 'Task 2', completed: false }),
  tx.store.put({ id: 3, text: 'Task 3', completed: false }),
  tx.done,
]);`}
            className="text-xs mt-4"
          />
        </SubSection>

        <SubSection
          title={t('indexedDB.useCases.title')}
          icon
          iconColor="purple"
        >
          <div className="grid grid-cols-2 gap-3">
            {[
              {
                title: t('indexedDB.useCases.offlineFirstApps'),
                desc: t('indexedDB.useCases.offlineFirstAppsDesc'),
              },
              {
                title: t('indexedDB.useCases.fileStorage'),
                desc: t('indexedDB.useCases.fileStorageDesc'),
              },
              {
                title: t('indexedDB.useCases.reactQueryPersist'),
                desc: t('indexedDB.useCases.reactQueryPersistDesc'),
              },
              {
                title: t('indexedDB.useCases.formDrafts'),
                desc: t('indexedDB.useCases.formDraftsDesc'),
              },
              {
                title: t('indexedDB.useCases.syncQueue'),
                desc: t('indexedDB.useCases.syncQueueDesc'),
              },
              {
                title: t('indexedDB.useCases.analyticsBuffer'),
                desc: t('indexedDB.useCases.analyticsBufferDesc'),
              },
            ].map((item) => (
              <div
                key={item.title}
                className="bg-purple-50 p-3 rounded border border-purple-200"
              >
                <p className="text-sm font-semibold text-purple-900">
                  {item.title}
                </p>
                <p className="text-xs text-purple-700 mt-1">{item.desc}</p>
              </div>
            ))}
          </div>
        </SubSection>
      </div>
    </SectionCard>
  );
};
