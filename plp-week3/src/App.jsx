import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import TaskManager from './components/TaskManager';
import { Button } from '@/components/ui/Button';


function App() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 6;

  useEffect(() => {
    fetch('https://dummyjson.com/posts')
      .then((res) => {
        if (!res.ok) throw new Error('Network error');
        return res.json();
      })
      .then((data) => {
        setPosts(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message || 'Failed to fetch');
        setLoading(false);
      });
  }, []);

  const filteredPosts = posts.filter((post) =>
    post.title.toLowerCase().includes(search.toLowerCase())
  );

  const indexOfLastPost = currentPage * postsPerPage;
  const currentPosts = filteredPosts.slice(
    indexOfLastPost - postsPerPage,
    indexOfLastPost
  );

  return (
    <div className="min-h-screen flex flex-col bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <Navbar />
      <main className="flex-grow max-w-7xl mx-auto py-6 px-4 space-y-10">
        <TaskManager />

        {/* Search and API Cards */}
        <section>
          <h2 className="text-2xl font-bold mb-4">Posts from API</h2>
          <input
            type="text"
            placeholder="Search posts..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setCurrentPage(1);
            }}
            className="w-full px-4 py-2 mb-4 border rounded dark:bg-gray-800"
          />

          {loading ? (
            <p>Loading...</p>
          ) : error ? (
            <p className="text-red-500">{error}</p>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {currentPosts.map((post) => (
                  <div key={post.id} className="p-4 bg-white dark:bg-gray-800 rounded shadow">
                    <h3 className="text-lg font-semibold mb-1">{post.title}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300">{post.body}</p>
                  </div>
                ))}
              </div>

              <div className="flex justify-center gap-4 mt-6">
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() =>
                    setCurrentPage((prev) => Math.max(prev - 1, 1))
                  }
                >
                  Prev
                </Button>
                <span className="text-sm">Page {currentPage}</span>
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() =>
                    setCurrentPage((prev) =>
                      prev * postsPerPage < filteredPosts.length ? prev + 1 : prev
                    )
                  }
                >
                  Next
                </Button>
              </div>
            </>
          )}
        </section>
      </main>
      <Footer />
    </div>
  );
}

export default App;
