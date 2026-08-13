"use client";

import { useState } from "react";

export default function SettingsPage() {
  const [showPasswordForm, setShowPasswordForm] = useState(false);

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleUpdatePassword = async (e: React.FormEvent) => {
  e.preventDefault();

  if (newPassword !== confirmPassword) {
    alert("New passwords do not match.");
    return;
  }

  try {
    const response = await fetch("/api/update-password", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        currentPassword,
        newPassword,
        confirmPassword,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      alert(data.error || "Failed to update password.");
      return;
    }

    alert("Password updated successfully.");

    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
    setShowPasswordForm(false);
  } catch (error) {
    console.error("Password update error:", error);
    alert("Something went wrong. Please try again.");
  }
};

 return (
  <div className="min-h-[calc(100vh-2rem)] flex items-center justify-center p-6">
    {!showPasswordForm ? (
      <div className="w-full max-w-md rounded-2xl border border-[#0FB3B7]/20 bg-white p-8 shadow-lg text-center">
        <div className="mb-5">
          <h1 className="text-3xl font-bold text-[#0FB3B7]">
            Settings
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            Manage your account settings
          </p>
        </div>

        <button
          onClick={() => setShowPasswordForm(true)}
          className="w-full rounded-lg bg-[#0FB3B7] px-5 py-3 font-medium text-white shadow-md transition hover:bg-[#0da1a5]"
        >
          Update Password
        </button>
      </div>
    ) : (
      <div className="w-full max-w-lg rounded-2xl border border-[#0FB3B7]/20 bg-white p-8 shadow-xl">
        <div className="mb-7 text-center">
          <h1 className="text-3xl font-bold text-[#0FB3B7]">
            Update Password
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            Enter your current password and choose a new password
          </p>
        </div>

        <form onSubmit={handleUpdatePassword} className="space-y-5">
          {/* Current Password */}
          <div>
            <label className="mb-2 block text-sm font-semibold text-gray-700">
              Current Password
            </label>

            <input
              type="password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              placeholder="Enter current password"
              className="w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-3 text-sm outline-none transition focus:border-[#0FB3B7] focus:bg-white focus:ring-2 focus:ring-[#0FB3B7]/20"
              required
            />
          </div>

          {/* New Password */}
          <div>
            <label className="mb-2 block text-sm font-semibold text-gray-700">
              New Password
            </label>

            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="Enter new password"
              className="w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-3 text-sm outline-none transition focus:border-[#0FB3B7] focus:bg-white focus:ring-2 focus:ring-[#0FB3B7]/20"
              required
            />
          </div>

          {/* Confirm New Password */}
          <div>
            <label className="mb-2 block text-sm font-semibold text-gray-700">
              Confirm New Password
            </label>

            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm new password"
              className="w-full rounded-lg border border-gray-300 bg-gray-50 px-4 py-3 text-sm outline-none transition focus:border-[#0FB3B7] focus:bg-white focus:ring-2 focus:ring-[#0FB3B7]/20"
              required
            />
          </div>

          {/* Buttons */}
          <div className="flex gap-3 pt-3">
            <button
              type="submit"
              className="flex-1 rounded-lg bg-[#0FB3B7] px-5 py-3 font-medium text-white shadow-md transition hover:bg-[#0da1a5]"
            >
              Update Password
            </button>

            <button
              type="button"
              onClick={() => setShowPasswordForm(false)}
              className="flex-1 rounded-lg border border-gray-300 bg-white px-5 py-3 font-medium text-gray-700 transition hover:bg-gray-50"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    )}
  </div>
);
}