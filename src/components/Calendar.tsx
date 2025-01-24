import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Edit3 } from 'lucide-react';

interface CalendarComponentProps {
  darkMode: boolean;
  onDateSelect?: (date: Date) => void;
}

function CalendarComponent({ darkMode, onDateSelect }: CalendarComponentProps) {
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

  const handleDateSelect = (day: number) => {
    const newDate = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), day);
    setSelectedDate(newDate);
    onDateSelect?.(newDate);
    setShowCalendar(false);
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
                onClick={() => day && handleDateSelect(day)}
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

export default CalendarComponent;