import { useEffect, useState } from 'react';

type Transaction = {
  id: number;
  description: string;
  amount: number;
};

function App() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [darkMode, setDarkMode] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const fetchTransactions = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await fetch('http://127.0.0.1:8000/transactions');
      if (!res.ok) throw new Error('Failed to fetch transactions');
      const data = await res.json();
      setTransactions(data);
    } catch (err) {
      setError('Error fetching transactions. Please try again.');
      console.error('Error fetching:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!description.trim()) {
      setError('Description is required');
      return;
    }
    const amountValue = parseFloat(amount);
    if (isNaN(amountValue) || amountValue <= 0) {
      setError('Amount must be a positive number');
      return;
    }

    setIsLoading(true);
    setError(null);
    try {
      const res = await fetch('http://127.0.0.1:8000/transactions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ description, amount: amountValue }),
      });
      if (!res.ok) throw new Error('Failed to add transaction');
      setDescription('');
      setAmount('');
      await fetchTransactions();
    } catch (err) {
      setError('Error adding transaction. Please try again.');
      console.error('Error posting:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={`min-h-screen ${darkMode ? 'dark bg-gray-900' : 'bg-gray-100'} transition-colors duration-300`}>
      <nav className="bg-indigo-600 dark:bg-indigo-800 text-white p-4">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">💰 DataLens</h1>
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="p-2 rounded-full hover:bg-indigo-500 dark:hover:bg-indigo-700"
          >
            {darkMode ? '☀️ Light' : '🌙 Dark'}
          </button>
        </div>
      </nav>
      <div className="max-w-3xl mx-auto p-6">
        <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6">
          <h2 className="text-3xl font-bold text-center text-indigo-600 dark:text-indigo-400 mb-6">
            Transaction Viewer
          </h2>
          {error && (
            <p className="text-red-500 text-center mb-4">{error}</p>
          )}
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 mb-8 justify-center">
            <input
              type="text"
              placeholder="Description"
              className="border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded px-4 py-2 flex-1 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              disabled={isLoading}
            />
            <input
              type="number"
              step="0.01"
              placeholder="Amount"
              className="border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded px-4 py-2 w-40 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              disabled={isLoading}
            />
            <button
              type="submit"
              className="bg-indigo-600 dark:bg-indigo-500 text-white px-6 py-2 rounded hover:bg-indigo-700 dark:hover:bg-indigo-600 disabled:opacity-50"
              disabled={isLoading}
            >
              {isLoading ? 'Adding...' : 'Add'}
            </button>
          </form>
          {isLoading ? (
            <p className="text-center text-gray-500 dark:text-gray-400">Loading transactions...</p>
          ) : (
            <ul className="divide-y divide-gray-200 dark:divide-gray-700">
              {transactions.length === 0 ? (
                <p className="text-center text-gray-500 dark:text-gray-400">No transactions yet.</p>
              ) : (
                transactions.map((txn) => (
                  <li key={txn.id} className="py-3 flex justify-between">
                    <span className="text-gray-700 dark:text-gray-200">{txn.description}</span>
                    <span className="text-green-600 dark:text-green-400 font-semibold">
                      ${txn.amount.toFixed(2)}
                    </span>
                  </li>
                ))
              )}
            </ul>
          )}
        </div>
      </div>
      <footer className="bg-gray-200 dark:bg-gray-800 text-gray-600 dark:text-gray-300 p-4 text-center">
        <p>
          Built by Abdishakur |{' '}
          <a
            href="https://github.com/your-github-username"
            target="_blank"
            rel="noopener noreferrer"
            className="text-indigo-600 dark:text-indigo-400 hover:underline"
          >
            GitHub
          </a>{' '}
          | DataLens © {new Date().getFullYear()}
        </p>
      </footer>
    </div>
  );
}

export default App;