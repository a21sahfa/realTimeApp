import { useChatStore } from "../store/useChatStore.js";
import React, { useEffect, useState } from 'react';
import Sidebar from "../komponenter/Sidebar.jsx";
import NoChatSelected from "../komponenter/NoChatSelected.jsx";
import ChatContainer from "../komponenter/ChatContainer.jsx";
import { saveAs } from 'file-saver';

const HomePage = () => {
  const [fetchTimes, setFetchTimes] = useState([]);
  const { selectedUser, getMessage } = useChatStore();

  const fetchMessagesMultipleTimes = async () => {
    let times = [];

    for (let i = 0; i < 10; i++) {
      const startTime = performance.now();
      await getMessage(selectedUser.id);
      const endTime = performance.now();
      const fetchTime = endTime - startTime;

      times.push({
        attempt: i + 1,
        fetchTime: fetchTime.toFixed(2)
      });

      console.log(`Fetch ${i + 1}: ${fetchTime.toFixed(2)} ms`);
    }

    setFetchTimes(times);

    const fileBlob = new Blob([JSON.stringify(times, null, 2)], { type: 'application/json' });
    saveAs(fileBlob, 'fetch-times.json');
  };

  useEffect(() => {
    if (selectedUser) {
      fetchMessagesMultipleTimes();
    }
  }, [selectedUser]);

  return (
    <div className="h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-blue-900 text-white overflow-hidden">
      <div className="flex flex-col lg:flex-row items-stretch pt-20 px-4 max-w-7xl mx-auto h-full space-y-4 lg:space-y-0 lg:space-x-4">

        {/* Main Chat Area */}
        <div className="flex-1 bg-gradient-to-r from-blue-800 via-purple-700 to-indigo-800 rounded-2xl shadow-xl h-full overflow-hidden border border-gray-700 backdrop-blur-xl bg-opacity-30">
          <div className="flex h-full">
            <Sidebar />
            {!selectedUser ? <NoChatSelected /> : <ChatContainer />}
          </div>
        </div>

        {/* Fetch Times */}
        <div className="w-full lg:w-80 bg-gradient-to-br from-indigo-700 to-purple-800 border border-gray-700 rounded-2xl shadow-lg p-6 overflow-auto max-h-[calc(100vh-8rem)]">
          <h2 className="text-xl font-bold text-indigo-400 mb-6">Fetch Times</h2>
          {fetchTimes.length > 0 ? (
            <ul className="space-y-4">
              {fetchTimes.map((time, index) => (
                <li
                  key={index}
                  className="bg-gradient-to-r from-blue-800 to-indigo-600 p-4 rounded-lg flex justify-between items-center border border-gray-600 shadow-md transition-all duration-300 hover:scale-105"
                >
                  <span className="text-gray-300">Attempt {time.attempt}</span>
                  <span className="text-indigo-300 font-medium">{time.fetchTime} ms</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-gray-500">No fetch times yet.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
