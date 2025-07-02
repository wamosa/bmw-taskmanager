import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/Button';


// Custom hook for persisting tasks in localStorage
const useLocalStorageTasks = () => {
  const [tasks, setTasks] = useState(() => {
    const stored = localStorage.getItem('tasks');
    return stored ? JSON.parse(stored) : [];
  });

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (text) => {
    if (text.trim()) {
      setTasks([
        ...tasks,
        {
          id: Date.now(),
          text,
          completed: false,
          createdAt: new Date().toISOString(),
        },
      ]);
    }
  };

  const toggleTask = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  return { tasks, addTask, toggleTask, deleteTask };
};

// TaskManager Component
const TaskManager = () => {
  const { tasks, addTask, toggleTask, deleteTask } = useLocalStorageTasks();
  const [newTaskText, setNewTaskText] = useState('');
  const [filter, setFilter] = useState('all');

  const handleSubmit = (e) => {
    e.preventDefault();
    addTask(newTaskText);
    setNewTaskText('');
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === 'active') return !task.completed;
    if (filter === 'completed') return task.completed;
    return true;
  });

  return (
    <section className="bg-white dark:bg-gray-800 p-6 rounded shadow space-y-6">
      <h2 className="text-2xl font-bold mb-2">Task Manager</h2>

      {/* Add Task */}
      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="text"
          value={newTaskText}
          onChange={(e) => setNewTaskText(e.target.value)}
          placeholder="Add a new task..."
          className="flex-grow px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
        />
        <Button type="submit" variant="primary">
          Add
        </Button>
      </form>

      {/* Filter Controls */}
      <div className="flex gap-2">
        <Button
          size="sm"
          variant={filter === 'all' ? 'primary' : 'secondary'}
          onClick={() => setFilter('all')}
        >
          All
        </Button>
        <Button
          size="sm"
          variant={filter === 'active' ? 'primary' : 'secondary'}
          onClick={() => setFilter('active')}
        >
          Active
        </Button>
        <Button
          size="sm"
          variant={filter === 'completed' ? 'primary' : 'secondary'}
          onClick={() => setFilter('completed')}
        >
          Completed
        </Button>
      </div>

      {/* Task List */}
      <ul className="space-y-2">
        {filteredTasks.length === 0 ? (
          <li className="text-center text-gray-500 dark:text-gray-400">No tasks</li>
        ) : (
          filteredTasks.map((task) => (
            <li
              key={task.id}
              className="flex items-center justify-between p-3 border rounded dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700"
            >
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => toggleTask(task.id)}
                  className="h-5 w-5 text-blue-600 rounded"
                />
                <span
                  className={`${
                    task.completed ? 'line-through text-gray-500 dark:text-gray-400' : ''
                  }`}
                >
                  {task.text}
                </span>
              </div>
              <Button
                variant="danger"
                size="sm"
                onClick={() => deleteTask(task.id)}
              >
                Delete
              </Button>
            </li>
          ))
        )}
      </ul>

      {/* Remaining Tasks */}
      <div className="text-sm text-gray-500 dark:text-gray-400">
        {tasks.filter((task) => !task.completed).length} task(s) remaining
      </div>
    </section>
  );
};

export default TaskManager;