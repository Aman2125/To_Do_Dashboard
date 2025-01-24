import React from 'react';
import { Star, Calendar } from 'lucide-react';
import { Task } from '../types';

interface PlannedProps {
  tasks: Task[];
  darkMode: boolean;
  toggleTaskCompletion: (id: number) => void;
  toggleImportant: (id: number) => void;
  setSelectedTask: (id: number | null) => void;
  selectedTask: number | null;
}

function Planned({ 
  tasks, 
  darkMode, 
  toggleTaskCompletion, 
  toggleImportant, 
  setSelectedTask,
  selectedTask 
}: PlannedProps) {
  // Group tasks by due date
  const tasksByDate = tasks.reduce((acc, task) => {
    const date = task.dueDate ? new Date(task.dueDate).toDateString() : 'No Date';
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(task);
    return acc;
  }, {} as Record<string, Task[]>);

  const sortedDates = Object.keys(tasksByDate).sort((a, b) => {
    if (a === 'No Date') return 1;
    if (b === 'No Date') return -1;
    return new Date(a).getTime() - new Date(b).getTime();
  });

  return (
    <div>
      <h2 className="text-xl font-semibold mb-6">Planned Tasks</h2>
      {sortedDates.length === 0 ? (
        <div className={`p-8 text-center rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
          <Calendar className="w-12 h-12 text-green-500 mx-auto mb-4" />
          <h3 className="text-lg font-medium mb-2">No planned tasks</h3>
          <p className="text-gray-500">Add due dates to your tasks to see them here</p>
        </div>
      ) : (
        <div className="space-y-6">
          {sortedDates.map(date => (
            <div key={date}>
              <h3 className="text-lg font-medium mb-3">{date}</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-2">
                {tasksByDate[date].map(task => (
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
                      <span className={task.completed ? 'line-through text-gray-500' : ''}>{task.text}</span>
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
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Planned;