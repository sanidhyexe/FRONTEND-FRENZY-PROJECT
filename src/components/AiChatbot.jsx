import React, { useEffect, useMemo, useRef, useState } from 'react';
import { MdSmartToy, MdSend, MdClose } from 'react-icons/md';

const CHAT_HISTORY_KEY = 'edutrackBotHistory';

const getBotReply = (userMessage, appContext) => {
    const query = userMessage.toLowerCase().trim();
    const pendingTasks = appContext.tasks.filter((task) => !task.completed).length;

    if (query.includes('help') || query.includes('what can you do') || query.includes('features')) {
        return `I can help with:\n• Dashboard overview and widgets\n• Tasks (add, complete, delete, filter)\n• Messages tab (send/delete messages)\n• Attendance/CGPA card info\n• Dark mode and navigation tabs\n\nYou are currently on: ${appContext.activeTab}.`;
    }

    if (query.includes('dashboard')) {
        return 'The dashboard combines profile stats, academic performance chart, announcements, and your weekly task checklist. Use the search bar to filter tasks and announcements.';
    }

    if (query.includes('task') || query.includes('checklist')) {
        return `You currently have ${pendingTasks} pending task(s) out of ${appContext.tasks.length}. Use "New Task" in the Weekly Task Checklist to add one.`;
    }

    if (query.includes('message') || query.includes('chat')) {
        return `In the Messages tab, you can choose a recipient, send a new message, and delete existing ones. You currently have ${appContext.messages.length} stored message(s).`;
    }

    if (query.includes('attendance')) {
        return 'Attendance is shown in dashboard cards and in the Attendance tab (subject-wise percentages).';
    }

    if (query.includes('cgpa') || query.includes('gpa')) {
        return 'CGPA/GPA is visualized in the dashboard cards and trend chart. It is currently display-only.';
    }

    if (query.includes('dark') || query.includes('theme')) {
        return `Use the sidebar theme toggle to switch Light/Dark mode. Current theme: ${appContext.darkMode ? 'Dark' : 'Light'}.`;
    }

    if (query.includes('login') || query.includes('logout') || query.includes('auth')) {
        return 'The app opens on login for new sessions. After login, refresh keeps you signed in for the current browser session. Logout is available from the profile menu in the header.';
    }

    if (query.includes('tab') || query.includes('navigate') || query.includes('sidebar')) {
        return `Use the sidebar to switch between Dashboard, Courses, Assignments, Attendance, and Messages. Active tab: ${appContext.activeTab}.`;
    }

    if (query.includes('search')) {
        return 'Search in the header filters dashboard tasks and announcements in real-time.';
    }

    if (query.includes('who are you') || query.includes('ai')) {
        return 'I am your EduTrack assistant. I answer questions about this app’s features and current dashboard state.';
    }

    return 'I can explain any app feature. Try asking about tasks, messages, dark mode, tabs, login, search, or dashboard widgets.';
};

const AiChatbot = ({ appContext }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [isThinking, setIsThinking] = useState(false);
    const [input, setInput] = useState('');
    const [chatHistory, setChatHistory] = useState(() => {
        const saved = sessionStorage.getItem(CHAT_HISTORY_KEY);
        if (saved) return JSON.parse(saved);

        return [
            {
                id: 1,
                role: 'bot',
                text: 'Hi! I am your EduTrack AI assistant. Ask me anything about this app.',
            },
        ];
    });

    const scrollRef = useRef(null);

    useEffect(() => {
        sessionStorage.setItem(CHAT_HISTORY_KEY, JSON.stringify(chatHistory));
    }, [chatHistory]);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [chatHistory, isThinking, isOpen]);

    const quickPrompts = useMemo(
        () => [
            'What can you do?',
            'How do tasks work?',
            'Explain the Messages tab',
            'How does login/session work?',
        ],
        []
    );

    const handleSend = (messageText) => {
        const message = messageText.trim();
        if (!message) return;

        const userEntry = {
            id: Date.now(),
            role: 'user',
            text: message,
        };

        setChatHistory((previousHistory) => [...previousHistory, userEntry]);
        setInput('');
        setIsThinking(true);

        window.setTimeout(() => {
            const botEntry = {
                id: Date.now() + 1,
                role: 'bot',
                text: getBotReply(message, appContext),
            };
            setChatHistory((previousHistory) => [...previousHistory, botEntry]);
            setIsThinking(false);
        }, 450);
    };

    return (
        <>
            {!isOpen && (
                <button
                    onClick={() => setIsOpen(true)}
                    className="fixed bottom-6 right-6 z-50 flex items-center gap-2 rounded-full bg-blue-500 text-white px-4 py-3 shadow-lg hover:bg-blue-600 transition-all duration-200 hover:-translate-y-0.5"
                >
                    <MdSmartToy className="text-xl" />
                    <span className="text-sm font-semibold">AI Chat</span>
                </button>
            )}

            {isOpen && (
                <div className="fixed bottom-6 right-6 z-50 w-[360px] max-w-[calc(100vw-2rem)] bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl shadow-xl overflow-hidden">
                    <div className="flex items-center justify-between px-4 py-3 border-b border-slate-200 dark:border-slate-700">
                        <div className="flex items-center gap-2">
                            <MdSmartToy className="text-xl text-blue-500" />
                            <p className="text-sm font-bold text-slate-800 dark:text-slate-200">EduTrack AI Assistant</p>
                        </div>
                        <button
                            onClick={() => setIsOpen(false)}
                            className="p-1 rounded-lg text-slate-500 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
                        >
                            <MdClose className="text-lg" />
                        </button>
                    </div>

                    <div ref={scrollRef} className="h-80 overflow-y-auto px-4 py-3 space-y-3 custom-scrollbar">
                        {chatHistory.map((entry) => (
                            <div
                                key={entry.id}
                                className={`max-w-[90%] rounded-xl px-3 py-2 text-sm whitespace-pre-line ${entry.role === 'user'
                                    ? 'ml-auto bg-blue-500 text-white'
                                    : 'bg-slate-100 dark:bg-slate-700/70 text-slate-700 dark:text-slate-200'
                                    }`}
                            >
                                {entry.text}
                            </div>
                        ))}

                        {isThinking && (
                            <div className="max-w-[90%] rounded-xl px-3 py-2 text-sm bg-slate-100 dark:bg-slate-700/70 text-slate-500 dark:text-slate-300">
                                Thinking...
                            </div>
                        )}
                    </div>

                    <div className="px-3 pb-2 flex flex-wrap gap-2">
                        {quickPrompts.map((prompt) => (
                            <button
                                key={prompt}
                                onClick={() => handleSend(prompt)}
                                className="text-xs font-medium px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors"
                            >
                                {prompt}
                            </button>
                        ))}
                    </div>

                    <form
                        onSubmit={(event) => {
                            event.preventDefault();
                            handleSend(input);
                        }}
                        className="p-3 border-t border-slate-200 dark:border-slate-700 flex items-center gap-2"
                    >
                        <input
                            value={input}
                            onChange={(event) => setInput(event.target.value)}
                            placeholder="Ask about the app..."
                            className="flex-1 bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-lg px-3 py-2 text-sm dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500/30"
                        />
                        <button
                            type="submit"
                            className="p-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition-colors"
                        >
                            <MdSend className="text-lg" />
                        </button>
                    </form>
                </div>
            )}
        </>
    );
};

export default AiChatbot;
