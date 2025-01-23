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

function CalendarComponent({ darkMode }: { darkMode: boolean }) {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showCalendar, setShowCalendar] = useState(false);

  const daysInMonth = new Date(selectedDate.getFullYear(), selectedDate.getMonth() + 1, 0).getDate();
  const firstDayOfMonth = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), 1).getDay();
  
  const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const days = [];
  for (let i = 0; i < firstDayOfMonth; i++) {
    days.push(null);
  }
  for (let i = 1; i <= daysInMonth; i++) {
    days.push(i);
  }

  const prevMonth = () => {
    setSelectedDate(new Date(selectedDate.getFullYear(), selectedDate.getMonth() - 1));
  };

  const nextMonth = () => {
    setSelectedDate(new Date(selectedDate.getFullYear(), selectedDate.getMonth() + 1));
  };

  return (
    <div className="relative">
      <button 
        onClick={() => setShowCalendar(!showCalendar)}
        className={`w-full p-2 rounded-lg flex items-center justify-between ${
          darkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-white hover:bg-gray-100'
        }`}
      >
        <span>
          {selectedDate.toLocaleDateString('en-US', { 
            weekday: 'short',
            month: 'short',
            day: 'numeric'
          })}
        </span>
        <Edit3 className="w-4 h-4" />
      </button>

      {showCalendar && (
        <div className={`absolute left-0 mt-2 p-4 rounded-lg shadow-lg z-50 w-[300px] ${
          darkMode ? 'bg-gray-800' : 'bg-white'
        }`}>
          <div className="flex justify-between items-center mb-4">
            <button onClick={prevMonth} className={`p-1 rounded ${
              darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
            }`}>
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="font-medium">
              {monthNames[selectedDate.getMonth()]} {selectedDate.getFullYear()}
            </span>
            <button onClick={nextMonth} className={`p-1 rounded ${
              darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
            }`}>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-7 gap-1 text-center text-xs text-gray-400 mb-2">
            <div>S</div>
            <div>M</div>
            <div>T</div>
            <div>W</div>
            <div>T</div>
            <div>F</div>
            <div>S</div>
          </div>

          <div className="grid grid-cols-7 gap-1">
            {days.map((day, index) => (
              <button
                key={index}
                className={`
                  w-8 h-8 text-sm flex items-center justify-center rounded-full
                  ${day === selectedDate.getDate() ? 'bg-green-600 text-white' : darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'}
                  ${!day && 'invisible'}
                  ${day === new Date().getDate() && 
                    selectedDate.getMonth() === new Date().getMonth() && 
                    selectedDate.getFullYear() === new Date().getFullYear() 
                    ? 'ring-1 ring-green-500' 
                    : ''}
                `}
                onClick={() => day && setSelectedDate(new Date(selectedDate.getFullYear(), selectedDate.getMonth(), day))}
              >
                {day}
              </button>
            ))}
          </div>

          <div className="mt-4 flex justify-end gap-2">
            <button 
              className={`px-3 py-1 text-sm rounded ${
                darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
              }`}
              onClick={() => setShowCalendar(false)}
            >
              Clear
            </button>
            <button 
              className={`px-3 py-1 text-sm rounded ${
                darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
              }`}
              onClick={() => setShowCalendar(false)}
            >
              Cancel
            </button>
            <button 
              className="px-3 py-1 text-sm rounded bg-green-600 text-white hover:bg-green-700"
              onClick={() => setShowCalendar(false)}
            >
              OK
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [tasks, setTasks] = useState([
    { id: 1, text: 'Buy groceries', completed: false, important: false },
    { id: 2, text: 'Finish project report', completed: false, important: true },
    { id: 3, text: 'Call the bank', completed: false, important: false },
    { id: 4, text: 'Schedule dentist appointment', completed: false, important: false },
    { id: 5, text: 'Plan weekend trip', completed: false, important: false },
    { id: 6, text: 'Read a book', completed: true, important: false },
    { id: 7, text: 'Clean the house', completed: true, important: false },
    { id: 8, text: 'Prepare presentation', completed: true, important: false },
    { id: 9, text: 'Update blog', completed: true, important: false },
  ]);
  const [newTask, setNewTask] = useState('');
  const [selectedTask, setSelectedTask] = useState<number | null>(1);

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
                <li className={`p-2 rounded-lg flex items-center gap-2 ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-200'}`}>
                  <ListTodo className="w-5 h-5" />
                  All Tasks
                </li>
                <li className={`p-2 rounded-lg flex items-center gap-2 bg-green-600 text-white`}>
                  <CalendarCheck className="w-5 h-5" />
                  Today
                </li>
                <li className={`p-2 rounded-lg flex items-center gap-2 ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-200'}`}>
                  <StarIcon className="w-5 h-5" />
                  Important
                </li>
                <li className={`p-2 rounded-lg flex items-center gap-2 ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-200'}`}>
                  <Calendar className="w-5 h-5" />
                  Planned
                </li>
                <li className={`p-2 rounded-lg flex items-center gap-2 ${darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-200'}`}>
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
              <span>Pending</span>
              <span className="float-right">Done</span>
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
            />
            <div className="flex justify-between items-center mt-4">
              <div className="flex gap-4">
                <button><Bell className="w-5 h-5" /></button>
                <button><Repeat className="w-5 h-5" /></button>
                <button><Calendar className="w-5 h-5" /></button>
              </div>
              <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
                ADD TASK
              </button>
            </div>
          </div>

          <div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-2">
              {tasks.filter(task => !task.completed).map(task => (
                <div 
                  key={task.id} 
                  className={`p-4 rounded-lg flex items-center justify-between cursor-pointer ${
                    darkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-white hover:bg-gray-50'
                  } ${selectedTask === task.id ? 'ring-1 ring-green-500' : ''}`}
                  onClick={() => setSelectedTask(task.id)}
                >
                  <div className="flex items-center gap-4">
                    <input
                      type="checkbox"
                      checked={task.completed}
                      onChange={(e) => {
                        e.stopPropagation();
                        toggleTaskCompletion(task.id);
                      }}
                      className="w-5 h-5 rounded-sm border-2 border-gray-300 checked:bg-green-600"
                    />
                    <span>{task.text}</span>
                  </div>
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleImportant(task.id);
                    }}
                    className={`${task.important ? 'text-yellow-500' : ''} hover:text-yellow-500`}
                  >
                    <Star className="w-5 h-5" />
                  </button>
                </div>
              ))}
            </div>

            {completedTasks > 0 && (
              <>
                <h3 className="text-lg font-medium mt-8 mb-4">Completed</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-2">
                  {tasks.filter(task => task.completed).map(task => (
                    <div 
                      key={task.id} 
                      className={`p-4 rounded-lg flex items-center justify-between cursor-pointer ${
                        darkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-white hover:bg-gray-50'
                      } ${selectedTask === task.id ? 'ring-1 ring-green-500' : ''}`}
                      onClick={() => setSelectedTask(task.id)}
                    >
                      <div className="flex items-center gap-4">
                        <input
                          type="checkbox"
                          checked={task.completed}
                          onChange={(e) => {
                            e.stopPropagation();
                            toggleTaskCompletion(task.id);
                          }}
                          className="w-5 h-5 rounded-sm border-2 border-gray-300 checked:bg-green-600"
                        />
                        <span className="line-through text-gray-500">{task.text}</span>
                      </div>
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleImportant(task.id);
                        }}
                        className={`${task.important ? 'text-yellow-500' : ''} hover:text-yellow-500`}
                      >
                        <Star className="w-5 h-5" />
                      </button>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>

        {/* Right Sidebar */}
        <div className={`w-full lg:w-72 p-4 relative ${darkMode ? 'bg-gray-800' : 'bg-gray-50'}`}>
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