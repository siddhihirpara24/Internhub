import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import {
    FaBell,
    FaCheckCircle,
    FaCalendarAlt,
    FaBriefcase,
    FaBullhorn,
    FaTimesCircle,
    FaClock,
    FaCheckDouble,
    FaTrash,
    FaArrowLeft,
    FaSearch
} from "react-icons/fa";

import "./Notification.css";

function Notification() {
    const navigate = useNavigate();

    const [notifications, setNotifications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [filter, setFilter] = useState("All");

    // ==========================================
    // UTILS FOR SCHEDULE DATE & DYNAMIC STATUS
    // ==========================================
    const formatDate = (dateString) => {
        if (!dateString) return "-";
        const date = new Date(dateString);
        if (isNaN(date.getTime())) return dateString;
        return date.toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
    };

    const formatTime = (timeString) => {
        if (!timeString) return "-";
        const parts = timeString.split(":");
        if (parts.length < 2) return timeString;
        const date = new Date();
        date.setHours(parseInt(parts[0], 10));
        date.setMinutes(parseInt(parts[1], 10));
        return date.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" });
    };

    // 🌟 DYNAMIC STATUS CALCULATION (Midnight precise)
    const getScheduleStatus = (dateStr) => {
        if (!dateStr) return "Upcoming";
        const today = new Date();
        today.setHours(0, 0, 0, 0); 
        const scheduleDate = new Date(dateStr);
        scheduleDate.setHours(0, 0, 0, 0); 
        
        if (scheduleDate < today) return "Completed";
        if (scheduleDate.getTime() === today.getTime()) return "Active";
        return "Upcoming";
    };

    // ==========================================
    // FETCH BOTH NOTIFICATIONS & SCHEDULES
    // ==========================================
    useEffect(() => {
        let ignore = false;

        const fetchAllData = async () => {
            try {
                setLoading(true);

                // 🌟 FETCH FROM BOTH APIS SIMULTANEOUSLY!
                const [notifRes, schedRes] = await Promise.allSettled([
                    axios.get("http://localhost:8080/api/notifications"),
                    axios.get("http://localhost:8081/api/interview-schedule")
                ]);

                if (!ignore) {
                    let fetchedNotifs = [];
                    let fetchedSchedules = [];

                    // 1. Process Normal Notifications
                    if (notifRes.status === "fulfilled" && Array.isArray(notifRes.value.data)) {
                        fetchedNotifs = notifRes.value.data;
                    }

                    // 2. Process Interview Schedules and convert them into Notification cards!
                    if (schedRes.status === "fulfilled" && Array.isArray(schedRes.value.data)) {
                        fetchedSchedules = schedRes.value.data.map(schedule => {
                            const id = schedule.interviewId || schedule.id;
                            const companyName = schedule.companyName || schedule.company?.companyName || "N/A";
                            const dynamicStatus = getScheduleStatus(schedule.interviewDate);

                            return {
                                notificationId: `schedule-${id}`, 
                                isSchedule: true,                 // Flag to hide delete buttons
                                type: `Interview - ${dynamicStatus}`,
                                title: `Scheduled: ${companyName} (${schedule.interviewRound} Round)`,
                                message: `Location: ${schedule.venue} (${schedule.interviewMode}) | Time: ${formatTime(schedule.interviewTime)} | Duration: ${schedule.duration}`,
                                date: formatDate(schedule.interviewDate),
                                read: true,                       // Automatically marked read so it doesn't inflate counts
                                isRead: true
                            };
                        });
                    }

                    // 3. Merge them together!
                    setNotifications([...fetchedNotifs, ...fetchedSchedules]);
                }
            } catch (error) {
                console.error("Fetch Error:", error);
            } finally {
                if (!ignore) setLoading(false);
            }
        };

        fetchAllData();

        return () => { ignore = true; };
    }, []);

    // ==========================================
    // GET NOTIFICATION ICON
    // ==========================================
    const getNotificationIcon = (type) => {
        const value = (type || "").toLowerCase();
        if (value.includes("interview")) return <FaCalendarAlt />;
        if (value.includes("application")) return <FaBriefcase />;
        if (value.includes("selected")) return <FaCheckCircle />;
        if (value.includes("rejected")) return <FaTimesCircle />;
        if (value.includes("announcement")) return <FaBullhorn />;
        return <FaBell />;
    };

    // ==========================================
    // GET ICON CLASS & BADGE CLASS
    // ==========================================
    const getIconClass = (type) => {
        const value = (type || "").toLowerCase();
        if (value.includes("interview")) return "interview-icon";
        if (value.includes("selected")) return "success-icon";
        if (value.includes("rejected")) return "danger-icon";
        if (value.includes("application")) return "application-icon";
        if (value.includes("announcement")) return "announcement-icon";
        return "default-icon";
    };

    const getBadgeClass = (type) => {
        const value = (type || "").toLowerCase();
        if (value.includes("active")) return "type-active";
        if (value.includes("completed")) return "type-completed";
        if (value.includes("upcoming")) return "type-upcoming";
        return "";
    };

    // ==========================================
    // MARK AS READ
    // ==========================================
    const markAsRead = async (id) => {
        try {
            await axios.put(`http://localhost:8080/api/notifications/${id}/read`);
            setNotifications((previous) =>
                previous.map((notification) =>
                    notification.notificationId === id
                        ? { ...notification, read: true, isRead: true }
                        : notification
                )
            );
        } catch (error) {
            console.error("Mark Read Error:", error);
        }
    };

    // ==========================================
    // MARK ALL AS READ
    // ==========================================
    const markAllAsRead = async () => {
        try {
            await axios.put("http://localhost:8080/api/notifications/read-all");
            setNotifications((previous) =>
                previous.map((notification) => ({
                    ...notification,
                    read: true,
                    isRead: true
                }))
            );
        } catch (error) {
            console.error("Mark All Read Error:", error);
        }
    };

    // ==========================================
    // DELETE NOTIFICATION
    // ==========================================
    const deleteNotification = async (id) => {
        if (!window.confirm("Delete this notification?")) return;

        try {
            await axios.delete(`http://localhost:8080/api/notifications/${id}`);
            setNotifications((previous) =>
                previous.filter((notification) => notification.notificationId !== id)
            );
        } catch (error) {
            console.error("Delete Notification Error:", error);
        }
    };

    // ==========================================
    // SEARCH + FILTER
    // ==========================================
    const filteredNotifications = notifications.filter((notification) => {
        const title = notification.title || "";
        const message = notification.message || "";
        const type = notification.type || "";
        const text = `${title} ${message} ${type}`.toLowerCase();
        const matchesSearch = text.includes(search.toLowerCase());
        const isRead = notification.read || notification.isRead || false;

        let matchesFilter = true;
        if (filter === "Unread") matchesFilter = !isRead;
        if (filter === "Read") matchesFilter = isRead;

        return matchesSearch && matchesFilter;
    });

    // ==========================================
    // UNREAD COUNT
    // ==========================================
    const unreadCount = notifications.filter(
        (notification) => !(notification.read || notification.isRead)
    ).length;

    return (
        <div className="notification-page">

            {/* HEADER */}
            <div className="notification-header">
                <div>
                    <h2>Notifications & Schedules</h2>
                    <p>Stay updated with your applications, interviews and placement activities.</p>
                </div>
                <button className="back-btn" onClick={() => navigate("/student/dashboard")}>
                    <FaArrowLeft /> Back
                </button>
            </div>

            {/* TOP SUMMARY */}
            <div className="notification-summary">
                <div className="summary-card">
                    <div className="summary-icon blue">
                        <FaBell />
                    </div>
                    <div>
                        <h3>{notifications.length}</h3>
                        <p>Total Updates</p>
                    </div>
                </div>

                <div className="summary-card">
                    <div className="summary-icon orange">
                        <FaClock />
                    </div>
                    <div>
                        <h3>{unreadCount}</h3>
                        <p>Unread Messages</p>
                    </div>
                </div>

                <div className="summary-card">
                    <div className="summary-icon green">
                        <FaCheckDouble />
                    </div>
                    <div>
                        <h3>{notifications.length - unreadCount}</h3>
                        <p>Read / Schedules</p>
                    </div>
                </div>
            </div>

            {/* TOOLBAR */}
            <div className="notification-toolbar">
                <div className="search-box">
                    <FaSearch />
                    <input
                        type="text"
                        placeholder="Search notification or schedule..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>

                <div className="toolbar-right">
                    <select value={filter} onChange={(e) => setFilter(e.target.value)}>
                        <option value="All">All Updates</option>
                        <option value="Unread">Unread</option>
                        <option value="Read">Read</option>
                    </select>

                    {unreadCount > 0 && (
                        <button className="read-all-btn" onClick={markAllAsRead}>
                            <FaCheckDouble /> Mark All Read
                        </button>
                    )}
                </div>
            </div>

            {/* NOTIFICATION CARD */}
            <div className="notification-card">
                <div className="notification-card-header">
                    <div>
                        <h3>Your Timeline</h3>
                        <p>Latest updates from the placement department.</p>
                    </div>
                    {unreadCount > 0 && (
                        <span className="unread-badge">{unreadCount} Unread</span>
                    )}
                </div>

                {/* NOTIFICATION LIST */}
                <div className="notification-list">
                    {loading ? (
                        <div className="empty-notification">
                            <FaBell />
                            <p>Loading notifications and schedules...</p>
                        </div>
                    ) : filteredNotifications.length === 0 ? (
                        <div className="empty-notification">
                            <FaBell />
                            <h3>No Notifications Found</h3>
                            <p>You don't have any notifications or schedules matching your search.</p>
                        </div>
                    ) : (
                        filteredNotifications.map((notification, index) => {
                            const id = notification.notificationId || notification.id || index;
                            const isRead = notification.read || notification.isRead || false;
                            const isSchedule = notification.isSchedule || false; // 🌟 FLAG
                            const type = notification.type || "General";
                            const title = notification.title || "Notification";
                            const message = notification.message || "";
                            const date = notification.date || "";

                            return (
                                <div className={`notification-item ${!isRead ? "unread" : ""}`} key={id}>
                                    
                                    {/* Icon */}
                                    <div className={`notification-icon ${getIconClass(type)}`}>
                                        {getNotificationIcon(type)}
                                    </div>

                                    {/* Content */}
                                    <div className="notification-content">
                                        <div className="notification-title-row">
                                            <h4>{title}</h4>
                                            {!isRead && <span className="new-badge">New</span>}
                                        </div>

                                        <p>{message}</p>

                                        <div className="notification-meta">
                                            <span>
                                                <FaClock /> {date || "Recently"}
                                            </span>
                                            
                                            {/* 🌟 Dynamic Status Badge */}
                                            <span className={`notification-type ${getBadgeClass(type)}`}>
                                                {type}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Actions */}
                                    <div className="notification-actions">
                                        {/* Hides buttons if it is a company schedule! */}
                                        {!isRead && !isSchedule && (
                                            <button className="read-btn" onClick={() => markAsRead(id)} title="Mark as read">
                                                <FaCheckDouble />
                                            </button>
                                        )}

                                        {!isSchedule && (
                                            <button className="delete-btn" onClick={() => deleteNotification(id)} title="Delete notification">
                                                <FaTrash />
                                            </button>
                                        )}
                                    </div>
                                </div>
                            );
                        })
                    )}
                </div>
            </div>
        </div>
    );
}

export default Notification;