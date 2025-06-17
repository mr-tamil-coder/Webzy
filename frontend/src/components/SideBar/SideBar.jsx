import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router";
import {
  Search,
  Plus,
  Clock,
  FileText,
  Star,
  Settings,
  ChevronLeft,
  ChevronRight,
  Trash2,
} from "lucide-react";
import Footer from "./Footer";
import axios from "axios";
import { API } from "../../utils/Api";
import { userContext } from "../../context/UserContext";

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("history");
  const { userInfo, setUserInfo } = useContext(userContext);
  const [history, setHistory] = useState([]);

  useEffect(() => {
    if (userInfo?._id) {
      fetchUserHistory();
    }
  }, [userInfo?._id]);

  async function fetchUserHistory() {
    try {
      const response = await axios.get(`${API}/workspace/user/${userInfo._id}`);
      console.log(response.data);
      setHistory(response.data);
    } catch (error) {
      console.error("Error fetching user history:", error);
    }
  }

  const filteredHistory = history.filter((item) =>
    item?.messages?.[0]?.content
      ?.toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  const toggleStar = async (id) => {
    try {
      // Update local state optimistically
      setHistory((items) =>
        items.map((item) =>
          item._id === id ? { ...item, starred: !item.starred } : item
        )
      );

      // Make API call to update starred status
      // await axios.patch(`${API}/workspace/${id}/star`);
    } catch (error) {
      console.error("Error toggling star:", error);
      // Revert optimistic update on error
      setHistory((items) =>
        items.map((item) =>
          item._id === id ? { ...item, starred: !item.starred } : item
        )
      );
    }
  };

  const deleteItem = async (id) => {
    try {
      // Update local state optimistically
      setHistory((items) => items.filter((item) => item._id !== id));

      // Make API call to delete workspace
      // await axios.delete(`${API}/workspace/${id}`);
    } catch (error) {
      console.error("Error deleting workspace:", error);
      // Refresh data on error
      fetchUserHistory();
    }
  };

  return (
    <div
      className={`fixed top-0 left-0 h-full bg-slate-800/95 backdrop-blur-md border-r border-slate-700/50 transition-all duration-300 flex flex-col z-50 ${
        isCollapsed ? "w-16" : "w-80"
      }`}
    >
      {/* Header */}
      <div className="p-4 border-b border-slate-700/50 flex items-center justify-between">
        {!isCollapsed && (
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">W</span>
            </div>
            <span className="font-semibold text-white">Workspaces</span>
          </div>
        )}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="p-2 hover:bg-slate-700/50 rounded-lg transition-colors text-slate-300 hover:text-white"
        >
          {isCollapsed ? (
            <ChevronRight className="w-4 h-4" />
          ) : (
            <ChevronLeft className="w-4 h-4" />
          )}
        </button>
      </div>

      {!isCollapsed && (
        <>
          {/* New Project Button */}
          <div className="p-4">
            <button className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-4 py-2 rounded-lg flex items-center justify-center space-x-2 transition-all duration-300">
              <Plus className="w-4 h-4" />
              <span>New Workspace</span>
            </button>
          </div>

          {/* Search */}
          <div className="p-4 pt-0">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search workspaces..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-slate-700/50 border border-slate-600/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-slate-400"
              />
            </div>
          </div>

          {/* Tabs */}
          <div className="px-4 pb-4">
            <div className="flex space-x-1 bg-slate-700/50 rounded-lg p-1">
              <button
                onClick={() => setActiveTab("history")}
                className={`flex-1 py-2 px-3 rounded-md text-sm font-medium transition-colors ${
                  activeTab === "history"
                    ? "bg-slate-600 text-white shadow-sm"
                    : "text-slate-300 hover:text-white"
                }`}
              >
                Recent
              </button>
              <button
                onClick={() => setActiveTab("starred")}
                className={`flex-1 py-2 px-3 rounded-md text-sm font-medium transition-colors ${
                  activeTab === "starred"
                    ? "bg-slate-600 text-white shadow-sm"
                    : "text-slate-300 hover:text-white"
                }`}
              >
                Starred
              </button>
            </div>
          </div>

          {/* History List */}
          <div className="flex-1 overflow-y-auto px-4 pb-4">
            <div className="space-y-2">
              {filteredHistory
                .filter((item) => activeTab === "history" || item.starred)
                .map((item) => (
                  <div
                    key={item._id}
                    className="group p-3 rounded-lg hover:bg-slate-700/50 border border-transparent hover:border-slate-600/50 transition-all cursor-pointer"
                  >
                    <div className="flex items-start justify-between">
                      <Link
                        to={`/workspace/${item._id}`}
                        className="flex items-start space-x-3 flex-1 min-w-0"
                      >
                        <div className="flex-1 min-w-0">
                          <h3 className="text-sm font-medium text-white truncate">
                            {item?.messages?.[0]?.content ||
                              "Untitled Workspace"}
                          </h3>
                          {item?.messages?.[0]?.timestamp && (
                            <p className="text-xs text-slate-400 mt-1">
                              {new Date(
                                item.messages[0].timestamp
                              ).toLocaleDateString()}
                            </p>
                          )}
                        </div>
                      </Link>
                      <div className="flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            e.preventDefault();
                            toggleStar(item._id);
                          }}
                          className="p-1 hover:bg-slate-600/50 rounded transition-colors"
                        >
                          <Star
                            className={`w-3 h-3 ${
                              item.starred
                                ? "text-yellow-400 fill-current"
                                : "text-slate-400"
                            }`}
                          />
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            e.preventDefault();
                            deleteItem(item._id);
                          }}
                          className="p-1 hover:bg-slate-600/50 rounded transition-colors"
                        >
                          <Trash2 className="w-3 h-3 text-slate-400 hover:text-red-400" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}

              {/* Empty state */}
              {filteredHistory.length === 0 && (
                <div className="text-center py-8">
                  <FileText className="w-8 h-8 text-slate-400 mx-auto mb-3" />
                  <p className="text-slate-400 text-sm">
                    {searchTerm ? "No workspaces found" : "No workspaces yet"}
                  </p>
                  {!searchTerm && (
                    <p className="text-slate-500 text-xs mt-1">
                      Create your first workspace to get started
                    </p>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Footer */}
          <Footer />
        </>
      )}

      {/* Collapsed State Icons */}
      {isCollapsed && (
        <div className="flex flex-col items-center space-y-4 py-4">
          <button className="p-3 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white rounded-lg transition-all duration-300">
            <Plus className="w-4 h-4" />
          </button>
          <button className="p-3 hover:bg-slate-700/50 rounded-lg transition-colors">
            <Clock className="w-4 h-4 text-slate-300" />
          </button>
          <button className="p-3 hover:bg-slate-700/50 rounded-lg transition-colors">
            <Star className="w-4 h-4 text-slate-300" />
          </button>
          <div className="flex-1"></div>
          <button className="p-3 hover:bg-slate-700/50 rounded-lg transition-colors">
            <Settings className="w-4 h-4 text-slate-300" />
          </button>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
