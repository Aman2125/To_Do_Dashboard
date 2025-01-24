import React, { useState } from 'react';
import { 
  Bell, 
  Menu, 
  LayoutGrid, 
  Sun, 
  Moon,
  Plus,
  Star,
  Repeat,
  Calendar,
  X,
  Trash2,
  ListTodo,
  CalendarCheck,
  Star as StarIcon,
  Users,
  ChevronLeft,
  ChevronRight,
  Edit3,
} from 'lucide-react';
import { Task } from './types';
import AllTasks from './pages/AllTasks';
import Important from './pages/Important';
import Planned from './pages/Planned';
import AssignedToMe from './pages/AssignedToMe';
import CalendarComponent from './components/Calendar';

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [tasks, setTasks] = useState<Task[]>([
    { 
      id: 1, 
      text: 'Buy groceries', 
      completed: false, 
      important: false,
      createdAt: new Date().toISOString(),
      dueDate: new Date(Date.now() + 86400000).toISOString(), // Tomorrow
    },
    { 
      id: 2, 
      text: 'Finish project report', 
      completed: false, 
      important: true,
      createdAt: new Date().toISOString(),
      assignedTo: 'me',
    },
    { 
      id: 3, 
      text: 'Call the bank', 
      completed: false, 
      important: false,
      createdAt: new Date().toISOString(),
    },
    { 
      id: 4, 
      text: 'Schedule dentist appointment', 
      completed: false, 
      important: false,
      createdAt: new Date().toISOString(),
      dueDate: new Date(Date.now() + 172800000).toISOString(), // Day after tomorrow
    },
    { 
      id: 5, 
      text: 'Plan weekend trip', 
      completed: false, 
      important: false,
      createdAt: new Date().toISOString(),
      assignedTo: 'me',
    },
    { 
      id: 6, 
      text: 'Read a book', 
      completed: true, 
      important: false,
      createdAt: new Date().toISOString(),
    },
    { 
      id: 7, 
      text: 'Clean the house', 
      completed: true, 
      important: false,
      createdAt: new Date().toISOString(),
    },
    { 
      id: 8, 
      text: 'Prepare presentation', 
      completed: true, 
      important: false,
      createdAt: new Date().toISOString(),
      assignedTo: 'me',
    },
    { 
      id: 9, 
      text: 'Update blog', 
      completed: true, 
      important: false,
      createdAt: new Date().toISOString(),
      dueDate: new Date(Date.now() + 259200000).toISOString(), // 3 days from now
    },
  ]);
  const [newTask, setNewTask] = useState('');
  const [selectedTask, setSelectedTask] = useState<number | null>(1);
  const [currentPage, setCurrentPage] = useState<'all' | 'today' | 'important' | 'planned' | 'assigned'>('today');

  const pendingTasks = tasks.filter(task => !task.completed).length;
  const completedTasks = tasks.filter(task => task.completed).length;
  const totalTasks = tasks.length;

  const toggleTheme = () => setDarkMode(!darkMode);

  const toggleTaskCompletion = (id: number) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const toggleImportant = (id: number) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, important: !task.important } : task
    ));
  };

  const addTask = () => {
    if (!newTask.trim()) return;
    
    const task: Task = {
      id: Math.max(...tasks.map(t => t.id)) + 1,
      text: newTask,
      completed: false,
      important: false,
      createdAt: new Date().toISOString(),
    };

    setTasks([task, ...tasks]);
    setNewTask('');
  };

  const renderCurrentPage = () => {
    const props = {
      tasks,
      darkMode,
      toggleTaskCompletion,
      toggleImportant,
      setSelectedTask,
      selectedTask,
    };

    switch (currentPage) {
      case 'all':
        return <AllTasks {...props} />;
      case 'important':
        return <Important {...props} />;
      case 'planned':
        return <Planned {...props} />;
      case 'assigned':
        return <AssignedToMe {...props} />;
      default:
        return <AllTasks {...props} />;
    }
  };

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-900'}`}>
      <div className="flex flex-col lg:flex-row">
        {/* Sidebar */}
        <div className={`w-full lg:w-72 p-4 ${darkMode ? 'bg-gray-800' : 'bg-gray-50'}`}>
          <div className="flex items-center gap-2 mb-8">
            <Menu className="w-6 h-6" />
            <span className="text-2xl font-semibold text-green-600">DoIt</span>
          </div>

          <div className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <img
                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150"
                alt="Profile"
                className="w-12 h-12 rounded-full"
              />
              <div>
                <p className="font-semibold">Hey, ABCD</p>
              </div>
            </div>

            <nav>
              <ul className="space-y-2">
                <li 
                  onClick={() => setCurrentPage('all')}
                  className={`p-2 rounded-lg flex items-center gap-2 cursor-pointer ${
                    currentPage === 'all' 
                      ? 'bg-green-600 text-white' 
                      : darkMode 
                        ? 'hover:bg-gray-700' 
                        : 'hover:bg-gray-200'
                  }`}
                >
                  <ListTodo className="w-5 h-5" />
                  All Tasks
                </li>
                <li 
                  onClick={() => setCurrentPage('today')}
                  className={`p-2 rounded-lg flex items-center gap-2 cursor-pointer ${
                    currentPage === 'today' 
                      ? 'bg-green-600 text-white' 
                      : darkMode 
                        ? 'hover:bg-gray-700' 
                        : 'hover:bg-gray-200'
                  }`}
                >
                  <CalendarCheck className="w-5 h-5" />
                  Today
                </li>
                <li 
                  onClick={() => setCurrentPage('important')}
                  className={`p-2 rounded-lg flex items-center gap-2 cursor-pointer ${
                    currentPage === 'important' 
                      ? 'bg-green-600 text-white' 
                      : darkMode 
                        ? 'hover:bg-gray-700' 
                        : 'hover:bg-gray-200'
                  }`}
                >
                  <StarIcon className="w-5 h-5" />
                  Important
                </li>
                <li 
                  onClick={() => setCurrentPage('planned')}
                  className={`p-2 rounded-lg flex items-center gap-2 cursor-pointer ${
                    currentPage === 'planned' 
                      ? 'bg-green-600 text-white' 
                      : darkMode 
                        ? 'hover:bg-gray-700' 
                        : 'hover:bg-gray-200'
                  }`}
                >
                  <Calendar className="w-5 h-5" />
                  Planned
                </li>
                <li 
                  onClick={() => setCurrentPage('assigned')}
                  className={`p-2 rounded-lg flex items-center gap-2 cursor-pointer ${
                    currentPage === 'assigned' 
                      ? 'bg-green-600 text-white' 
                      : darkMode 
                        ? 'hover:bg-gray-700' 
                        : 'hover:bg-gray-200'
                  }`}
                >
                  <Users className="w-5 h-5" />
                  Assigned to me
                </li>
              </ul>
            </nav>
          </div>

          <button className={`w-full p-2 rounded-lg flex items-center gap-2 ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-200'}`}>
            <Plus className="w-5 h-5" />
            Add list
          </button>

          <div className="mt-8">
            <h3 className="font-semibold mb-2">Today Tasks</h3>
            <p className="text-3xl font-bold mb-4">{totalTasks}</p>
            <div className="relative h-4 bg-green-200 rounded-full">
              <div 
                className="absolute h-full bg-green-600 rounded-full"
                style={{ width: `${(completedTasks / totalTasks) * 100}%` }}
              />
            </div>
            <div className="mt-2 text-sm">
              <span>Pending ({pendingTasks})</span>
              <span className="float-right">Done ({completedTasks})</span>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-4 min-w-0">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-xl font-semibold">To Do</h2>
            <div className="flex items-center gap-4">
              <button onClick={toggleTheme}>
                {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>
              <button><Bell className="w-5 h-5" /></button>
              <button><LayoutGrid className="w-5 h-5" /></button>
            </div>
          </div>

          <div className={`p-4 rounded-lg mb-4 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
            <input
              type="text"
              placeholder="Add A Task"
              className={`w-full bg-transparent outline-none ${darkMode ? 'placeholder-gray-400' : 'placeholder-gray-500'}`}
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && addTask()}
            />
            <div className="flex justify-between items-center mt-4">
              <div className="flex gap-4">
                <button><Bell className="w-5 h-5" /></button>
                <button><Repeat className="w-5 h-5" /></button>
                <button><Calendar className="w-5 h-5" /></button>
              </div>
              <button 
                onClick={addTask}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
              >
                ADD TASK
              </button>
            </div>
          </div>

          {renderCurrentPage()}
        </div>

        {/* Right Sidebar */}
        <div className={`w-full lg:w-72 p-4 relative ${darkMode ? 'bg-gray-800' : 'bg-gray-50'} min-h-screen lg:min-h-0`}>
          {selectedTask && (
            <>
              <div className="flex items-center justify-between mb-4">
                <input
                  type="checkbox"
                  checked={tasks.find(t => t.id === selectedTask)?.completed}
                  onChange={() => toggleTaskCompletion(selectedTask)}
                  className="w-5 h-5 rounded-sm border-2 border-gray-300 checked:bg-green-600"
                />
                <span className="flex-1 mx-4 truncate">{tasks.find(t => t.id === selectedTask)?.text}</span>
                <button
                  onClick={() => toggleImportant(selectedTask)}
                  className={`${tasks.find(t => t.id === selectedTask)?.important ? 'text-yellow-500' : ''} hover:text-yellow-500`}
                >
                  <Star className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-4">
                <button className={`w-full p-2 rounded-lg flex items-center gap-2 ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-200'}`}>
                  <Plus className="w-5 h-5" />
                  Add Step
                </button>
                <button className={`w-full p-2 rounded-lg flex items-center gap-2 ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-200'}`}>
                  <Bell className="w-5 h-5" />
                  Set Reminder
                </button>
                <div className="relative">
                  <CalendarComponent darkMode={darkMode} />
                </div>
                <button className={`w-full p-2 rounded-lg flex items-center gap-2 ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-200'}`}>
                  <Repeat className="w-5 h-5" />
                  Repeat
                </button>
              </div>

              <div className="absolute bottom-0 left-0 right-0 p-4 flex items-center justify-between">
                <button><X className="w-5 h-5" /></button>
                <span className="text-sm text-gray-500">Created Today</span>
                <button><Trash2 className="w-5 h-5" /></button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;