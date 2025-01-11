'use client';

import React from 'react';

interface TaskItemProps {
  text: string;
  checked: boolean;
}

const TaskItem = ({ text, checked }: TaskItemProps) => {
  return (
    <div className="flex items-center">
      <input
        type="checkbox"
        defaultChecked={checked}
        className="w-4 h-4 rounded bg-purple-500 border-transparent focus:ring-purple-500"
      />
      <span className={`ml-3 ${checked ? 'text-gray-400 line-through' : 'text-white'}`}>{text}</span>
    </div>
  );
};

export default function Hero() {
  const tasks = [
    { text: "Update landing page", checked: true },
    { text: "Client meeting", checked: true },
    { text: "Review project timeline", checked: false },
    { text: "Send weekly report", checked: false },
  ];

  return (
    <section className="bg-neutral-900 min-h-screen flex items-center w-full">
      {/* Add top padding to account for fixed navbar */}
      <div className="w-full pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Column - Text Content */}
            <div className="text-center lg:text-left">
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                <span className="bg-gradient-to-r from-purple-500 to-pink-500 text-transparent bg-clip-text">
                  Organize Tasks,
                </span>
                <br />
                <span className="text-white">Boost Productivity</span>
              </h1>
              <p className="text-gray-300 text-lg md:text-xl mb-8">
                Streamline your workflow with our intuitive task management solution. Stay organized, meet deadlines, and
                achieve more together.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <button className="px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg font-medium hover:opacity-90 transition-opacity transform hover:scale-105">
                  Get Started Free
                </button>
                <button className="px-8 py-4 border border-purple-500 text-purple-500 rounded-lg font-medium hover:bg-purple-500 hover:text-white transition-all">
                  Log In!
                </button>
              </div>
              <div className="mt-8 flex items-center justify-center lg:justify-start space-x-4">
                <div className="flex -space-x-2">
                  <div className="w-8 h-8 rounded-full bg-purple-500 flex items-center justify-center text-white text-xs">
                    JD
                  </div>
                  <div className="w-8 h-8 rounded-full bg-pink-500 flex items-center justify-center text-white text-xs">
                    MK
                  </div>
                  <div className="w-8 h-8 rounded-full bg-purple-600 flex items-center justify-center text-white text-xs">
                    AL
                  </div>
                </div>
                <p className="text-gray-400 text-sm">Joined by 10,000+ teams worldwide in my dreams!</p>
              </div>
            </div>

            {/* Right Column - Task Card */}
            <div className="relative">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg blur opacity-75 animate-pulse"></div>
              <div className="relative bg-neutral-800 p-4 rounded-lg">
                <div className="bg-neutral-900 rounded-lg p-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-white font-medium">Today's Tasks</h3>
                    <span className="text-purple-500">5/8</span>
                  </div>
                  <div className="space-y-3">
                    {tasks.map((task, index) => (
                      <TaskItem key={index} text={task.text} checked={task.checked} />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}