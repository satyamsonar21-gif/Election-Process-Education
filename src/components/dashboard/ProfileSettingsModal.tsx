"use client";

import { useState } from "react";
import { X, User, Save, RefreshCw } from "lucide-react";

interface ProfileSettingsModalProps {
  user: any;
  onClose: () => void;
  onUpdate: (updatedUser: any) => void;
}

export default function ProfileSettingsModal({ user, onClose, onUpdate }: ProfileSettingsModalProps) {
  const [name, setName] = useState(user.name || "");
  const [picture, setPicture] = useState(user.picture || "");
  const [isResetting, setIsResetting] = useState(false);

  const handleSave = () => {
    const updatedUser = { ...user, name, picture };
    localStorage.setItem("election_edu_user", JSON.stringify(updatedUser));
    onUpdate(updatedUser);
  };

  const handleResetProgress = () => {
    if (confirm("Are you sure you want to reset all your progress? This cannot be undone.")) {
      setIsResetting(true);
      const defaultProgress = {
        guideCompleted: false,
        lastStepId: "registration",
        quizScores: [],
        hasVoted: false
      };
      localStorage.setItem(`progress_${user.email}`, JSON.stringify(defaultProgress));
      
      setTimeout(() => {
        window.location.reload();
      }, 500);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl overflow-hidden animate-scale-in">
        <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-slate-50">
          <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <User className="w-5 h-5 text-indigo-600" /> Profile Settings
          </h2>
          <button onClick={onClose} className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-200 rounded-lg transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-5">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1.5">Display Name</label>
            <input 
              type="text" 
              value={name} 
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all"
              placeholder="Your name"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1.5">Profile Picture URL (Optional)</label>
            <input 
              type="url" 
              value={picture} 
              onChange={(e) => setPicture(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all"
              placeholder="https://example.com/avatar.jpg"
            />
          </div>

          <div className="pt-4 border-t border-slate-100">
            <h3 className="text-sm font-semibold text-slate-900 mb-2">Danger Zone</h3>
            <button 
              onClick={handleResetProgress}
              disabled={isResetting}
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 border border-red-200 text-red-600 hover:bg-red-50 font-semibold rounded-xl transition-colors disabled:opacity-50"
            >
              <RefreshCw className={`w-4 h-4 ${isResetting ? "animate-spin" : ""}`} />
              {isResetting ? "Resetting..." : "Reset Learning Progress"}
            </button>
          </div>
        </div>

        <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex justify-end gap-3">
          <button onClick={onClose} className="px-4 py-2 font-semibold text-slate-600 hover:bg-slate-200 rounded-xl transition-colors">
            Cancel
          </button>
          <button onClick={handleSave} className="px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl transition-colors flex items-center gap-2">
            <Save className="w-4 h-4" /> Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}
