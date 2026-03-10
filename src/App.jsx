import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import TopRow from './components/TopRow';
import MiddleRow from './components/MiddleRow';
import BottomRow from './components/BottomRow';
import LoginPage from './components/LoginPage';
import AiChatbot from './components/AiChatbot';
import ProfilePage from './components/ProfilePage';
import './index.css';

function App() {
  const [currentUser, setCurrentUser] = useState(() => {
    const persistedUser = sessionStorage.getItem('authUser');
    return persistedUser ? JSON.parse(persistedUser) : null;
  });
  const [isEnteringAfterLogin, setIsEnteringAfterLogin] = useState(false);
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(true);
  const [darkMode, setDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') return true;
    if (savedTheme === 'light') return false;
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });
  const [activeTab, setActiveTab] = useState('dashboard');
  const [dashboardSearch, setDashboardSearch] = useState('');
  const [profile, setProfile] = useState(() => {
    const savedProfile = localStorage.getItem('edutrackProfile');
    if (savedProfile) {
      return JSON.parse(savedProfile);
    }

    return {
      name: 'Alex Johnson',
      email: 'alex@edutrack.com',
      phone: '+91 98765 43210',
      semester: 'Semester 6',
      department: 'Computer Science',
      about: 'Focused on full-stack development, AI tooling, and hackathon projects.',
    };
  });
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem('dashboardTasks');
    if (savedTasks) {
      return JSON.parse(savedTasks);
    }

    return [
      { id: 1, title: 'Database Management HW', due: 'Due tomorrow', priority: 'High', completed: false },
      { id: 2, title: 'UI/UX Project Prototype', due: '3 days left', priority: 'Normal', completed: false },
      { id: 3, title: 'Network Security Quiz', due: 'Completed', priority: 'Done', completed: true },
    ];
  });
  const [messages, setMessages] = useState(() => {
    const savedMessages = localStorage.getItem('dashboardMessages');
    if (savedMessages) {
      return JSON.parse(savedMessages);
    }

    return [
      { id: 1, from: 'Prof. Miller', text: 'Please submit your lab work before Friday.', time: '9:45 AM' },
      { id: 2, from: 'Class Group', text: 'Team meeting moved to 4 PM today.', time: '11:10 AM' },
      { id: 3, from: 'Admin Office', text: 'Semester fee receipt is now available.', time: '1:20 PM' },
    ];
  });
  const [newMessageText, setNewMessageText] = useState('');
  const [messageRecipient, setMessageRecipient] = useState('Class Group');

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [darkMode]);

  useEffect(() => {
    localStorage.setItem('dashboardMessages', JSON.stringify(messages));
  }, [messages]);

  useEffect(() => {
    localStorage.setItem('dashboardTasks', JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    localStorage.setItem('edutrackProfile', JSON.stringify(profile));
  }, [profile]);

  useEffect(() => {
    if (!isEnteringAfterLogin) return;

    const animationTimer = window.setTimeout(() => {
      setIsEnteringAfterLogin(false);
    }, 700);

    return () => {
      window.clearTimeout(animationTimer);
    };
  }, [isEnteringAfterLogin]);

  const toggleDarkMode = () => {
    setDarkMode((previousMode) => !previousMode);
  };

  const handleLogin = ({ email, password }) => {
    const demoEmail = 'alex@edutrack.com';
    const demoPassword = '123456';

    if (email.toLowerCase() !== demoEmail || password !== demoPassword) {
      return {
        success: false,
        message: 'Invalid email or password. Please use demo credentials.',
      };
    }

    const authenticatedUser = {
      name: profile.name,
      email: demoEmail,
    };

    setCurrentUser(authenticatedUser);
    setIsEnteringAfterLogin(true);
    sessionStorage.setItem('authUser', JSON.stringify(authenticatedUser));
    localStorage.removeItem('authUser');

    return { success: true };
  };

  const handleLogout = () => {
    setCurrentUser(null);
    sessionStorage.removeItem('authUser');
    localStorage.removeItem('authUser');
    setActiveTab('dashboard');
    setDashboardSearch('');
  };

  const handleSendMessage = (event) => {
    event.preventDefault();

    if (!newMessageText.trim()) return;

    const messageTime = new Date().toLocaleTimeString([], {
      hour: 'numeric',
      minute: '2-digit',
    });

    const newMessage = {
      id: Date.now(),
      from: `You → ${messageRecipient}`,
      text: newMessageText.trim(),
      time: messageTime,
    };

    setMessages((previousMessages) => [newMessage, ...previousMessages]);
    setNewMessageText('');
  };

  const handleDeleteMessage = (messageId) => {
    setMessages((previousMessages) => previousMessages.filter((message) => message.id !== messageId));
  };

  const handleSaveProfile = (updatedProfile) => {
    setProfile(updatedProfile);
    setCurrentUser((previousUser) => {
      const nextUser = {
        ...previousUser,
        name: updatedProfile.name,
        email: updatedProfile.email,
      };

      sessionStorage.setItem('authUser', JSON.stringify(nextUser));
      return nextUser;
    });
  };

  const renderTabContent = () => {
    const searchValue = dashboardSearch.trim().toLowerCase();

    if (activeTab === 'dashboard') {
      const pendingTasks = tasks.filter((task) => !task.completed).length;

      return (
        <>
          <TopRow pendingTasks={pendingTasks} profile={profile} />
          <MiddleRow searchQuery="" />
          <BottomRow tasks={tasks} setTasks={setTasks} searchQuery={dashboardSearch} />
        </>
      );
    }

    if (activeTab === 'profile') {
      if (searchValue) {
        const profileText = `${profile.name} ${profile.email} ${profile.phone} ${profile.semester} ${profile.department} ${profile.about}`.toLowerCase();

        if (!profileText.includes(searchValue)) {
          return (
            <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm text-center">
              <p className="text-sm text-slate-500 dark:text-slate-400">No profile fields match your search.</p>
            </div>
          );
        }
      }

      return <ProfilePage profile={profile} onSaveProfile={handleSaveProfile} />;
    }

    if (activeTab === 'courses') {
      const courses = [
        { title: 'Data Structures', instructor: 'Prof. Miller', progress: '72%', nextClass: 'Tue, 10:00 AM' },
        { title: 'Database Systems', instructor: 'Dr. Singh', progress: '64%', nextClass: 'Wed, 1:00 PM' },
        { title: 'Computer Networks', instructor: 'Prof. Garcia', progress: '81%', nextClass: 'Thu, 9:00 AM' },
      ];

      const filteredCourses = courses.filter((course) => {
        if (!searchValue) return true;

        const courseText = `${course.title} ${course.instructor} ${course.nextClass}`.toLowerCase();
        return courseText.includes(searchValue);
      });

      return (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredCourses.map((course) => (
            <div key={course.title} className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm">
              <h3 className="text-lg font-bold dark:text-white">{course.title}</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">{course.instructor}</p>
              <div className="mt-4">
                <p className="text-xs text-slate-400 dark:text-slate-500 mb-1">Progress</p>
                <div className="h-2 w-full bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
                  <div className="h-full bg-blue-500 rounded-full" style={{ width: course.progress }}></div>
                </div>
                <p className="text-xs text-blue-600 dark:text-blue-400 mt-2 font-semibold">{course.progress} completed</p>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-4">Next class: {course.nextClass}</p>
            </div>
          ))}

          {filteredCourses.length === 0 && (
            <div className="md:col-span-2 xl:col-span-3 bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm text-center">
              <p className="text-sm text-slate-500 dark:text-slate-400">No courses match your search.</p>
            </div>
          )}
        </div>
      );
    }

    if (activeTab === 'assignments') {
      const assignments = [
        { task: 'Database Normalization Case Study', due: 'Due Mar 14', status: 'In Progress' },
        { task: 'React Dashboard UI Polish', due: 'Due Mar 16', status: 'Pending Review' },
        { task: 'Routing Protocols Quiz Prep', due: 'Due Mar 18', status: 'Not Started' },
      ];

      const filteredAssignments = assignments.filter((assignment) => {
        if (!searchValue) return true;

        const assignmentText = `${assignment.task} ${assignment.due} ${assignment.status}`.toLowerCase();
        return assignmentText.includes(searchValue);
      });

      return (
        <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm">
          <h3 className="text-lg font-bold dark:text-white mb-4">Upcoming Assignments</h3>
          <div className="space-y-3">
            {filteredAssignments.map((assignment) => (
              <div key={assignment.task} className="border border-slate-200 dark:border-slate-700 rounded-lg p-4 flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold text-slate-800 dark:text-slate-200">{assignment.task}</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{assignment.due}</p>
                </div>
                <span className="text-xs font-bold px-3 py-1 rounded-full bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300">
                  {assignment.status}
                </span>
              </div>
            ))}

            {filteredAssignments.length === 0 && (
              <div className="p-6 rounded-lg border border-dashed border-slate-300 dark:border-slate-700 text-center">
                <p className="text-sm text-slate-500 dark:text-slate-400">No assignments match your search.</p>
              </div>
            )}
          </div>
        </div>
      );
    }

    if (activeTab === 'attendance') {
      const attendanceItems = [
        { subject: 'Data Structures', attended: 24, total: 28 },
        { subject: 'Database Systems', attended: 21, total: 26 },
        { subject: 'Computer Networks', attended: 25, total: 29 },
      ];

      const filteredAttendance = attendanceItems.filter((item) => {
        if (!searchValue) return true;

        const percentage = Math.round((item.attended / item.total) * 100);
        const attendanceText = `${item.subject} ${item.attended} ${item.total} ${percentage}`.toLowerCase();
        return attendanceText.includes(searchValue);
      });

      return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {filteredAttendance.map((item) => {
            const percentage = Math.round((item.attended / item.total) * 100);
            return (
              <div key={item.subject} className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm">
                <h3 className="text-base font-bold dark:text-white">{item.subject}</h3>
                <p className="text-3xl font-bold mt-4 text-slate-800 dark:text-slate-100">{percentage}%</p>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{item.attended}/{item.total} classes attended</p>
                <div className="mt-4 h-2 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
                  <div className="h-full bg-emerald-500" style={{ width: `${percentage}%` }}></div>
                </div>
              </div>
            );
          })}

          {filteredAttendance.length === 0 && (
            <div className="lg:col-span-3 bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm text-center">
              <p className="text-sm text-slate-500 dark:text-slate-400">No attendance records match your search.</p>
            </div>
          )}
        </div>
      );
    }

    if (activeTab === 'messages') {
      const filteredMessages = messages.filter((message) => {
        if (!searchValue) return true;

        const messageText = `${message.from} ${message.text} ${message.time}`.toLowerCase();
        return messageText.includes(searchValue);
      });

      return (
        <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm">
          <h3 className="text-lg font-bold dark:text-white mb-4">Messages</h3>

          <form onSubmit={handleSendMessage} className="grid grid-cols-1 md:grid-cols-4 gap-3 mb-6">
            <select
              value={messageRecipient}
              onChange={(event) => setMessageRecipient(event.target.value)}
              className="md:col-span-1 bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-lg px-3 py-2 text-sm dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/30"
            >
              <option>Class Group</option>
              <option>Prof. Miller</option>
              <option>Admin Office</option>
            </select>

            <input
              type="text"
              value={newMessageText}
              onChange={(event) => setNewMessageText(event.target.value)}
              placeholder="Type a message..."
              className="md:col-span-2 bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-lg px-4 py-2 text-sm dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/30"
            />

            <button
              type="submit"
              className="md:col-span-1 bg-blue-500 hover:bg-blue-600 text-white rounded-lg px-4 py-2 text-sm font-semibold transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md"
            >
              Send Message
            </button>
          </form>

          <div className="space-y-4">
            {filteredMessages.map((message) => (
              <div key={message.id} className="p-4 rounded-lg border border-slate-200 dark:border-slate-700">
                <div className="flex items-center justify-between gap-4">
                  <p className="text-sm font-semibold text-slate-800 dark:text-slate-200">{message.from}</p>
                  <div className="flex items-center gap-3">
                    <span className="text-xs text-slate-400 dark:text-slate-500">{message.time}</span>
                    <button
                      onClick={() => handleDeleteMessage(message.id)}
                      className="text-xs font-semibold text-red-500 hover:text-red-600 dark:text-red-400 dark:hover:text-red-300 transition-colors"
                    >
                      Delete
                    </button>
                  </div>
                </div>
                <p className="text-sm text-slate-600 dark:text-slate-400 mt-2">{message.text}</p>
              </div>
            ))}

            {filteredMessages.length === 0 && (
              <div className="p-6 rounded-lg border border-dashed border-slate-300 dark:border-slate-700 text-center">
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  {messages.length === 0 ? 'No messages yet. Send one to get started.' : 'No messages match your search.'}
                </p>
              </div>
            )}
          </div>
        </div>
      );
    }

    return null;
  };

  if (!currentUser) {
    return <LoginPage onLogin={handleLogin} />;
  }

  return (
    <div className="animated-bg bg-background-light dark:bg-background-dark font-display text-slate-900 dark:text-slate-100 min-h-screen">
      <div className={`flex min-h-screen ${isEnteringAfterLogin ? 'dashboard-enter' : ''}`}>
        <Sidebar
          darkMode={darkMode}
          toggleDarkMode={toggleDarkMode}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          isExpanded={isSidebarExpanded}
          toggleExpanded={() => setIsSidebarExpanded((previousState) => !previousState)}
        />
        <main className={`flex-1 p-8 transition-all duration-300 ${isSidebarExpanded ? 'ml-72' : 'ml-24'}`}>
          <Header
            userName={currentUser.name}
            onLogout={handleLogout}
            onOpenProfile={() => setActiveTab('profile')}
            onNavigateTab={setActiveTab}
            searchQuery={dashboardSearch}
            setSearchQuery={setDashboardSearch}
          />
          {renderTabContent()}
        </main>
      </div>
      <AiChatbot
        appContext={{
          activeTab,
          darkMode,
          messages,
          tasks,
          userName: profile.name,
        }}
      />
    </div>
  );
}

export default App;
