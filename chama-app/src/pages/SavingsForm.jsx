import React, { useState } from "react";

const SavingsForm = () => {
  const [formData, setFormData] = useState({
    membershipNumber: "", // Changed from memberId to membershipNumber
    amount: "",
    type: "monthly",
    description: "",
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ text: "", type: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ text: "", type: "" });

    try {
      const response = await fetch("http://localhost:5000/api/savings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage({ text: "Savings recorded successfully!", type: "success" });
        setFormData({
          membershipNumber: "",
          amount: "",
          type: "monthly",
          description: "",
        });
      } else {
        throw new Error(data.error || "Failed to record savings");
      }
    } catch (error) {
      setMessage({ text: error.message, type: "error" });
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900">Record Savings</h2>
          <p className="mt-2 text-gray-600">
            Enter member's contribution details below
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="membershipNumber"
                className="block text-sm font-medium text-gray-700"
              >
                Membership Number
              </label>
              <input
                type="text"
                id="membershipNumber"
                name="membershipNumber"
                required
                value={formData.membershipNumber}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-gray-900"
                placeholder="Enter membership number"
              />
            </div>

            <div>
              <label
                htmlFor="amount"
                className="block text-sm font-medium text-gray-700"
              >
                Amount (KSh)
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="text-gray-500 sm:text-sm">KSh</span>
                </div>
                <input
                  type="number"
                  id="amount"
                  name="amount"
                  required
                  min="0"
                  value={formData.amount}
                  onChange={handleChange}
                  className="block w-full pl-12 pr-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 text-gray-900"
                  placeholder="0.00"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="type"
                className="block text-sm font-medium text-gray-700"
              >
                Contribution Type
              </label>
              <select
                id="type"
                name="type"
                required
                value={formData.type}
                onChange={handleChange}
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:ring-blue-500 focus:border-blue-500 rounded-md text-gray-900"
              >
                <option value="monthly">Monthly Contribution</option>
                <option value="special">Special Contribution</option>
              </select>
            </div>

            <div>
              <label
                htmlFor="description"
                className="block text-sm font-medium text-gray-700"
              >
                Description
              </label>
              <textarea
                id="description"
                name="description"
                rows="3"
                value={formData.description}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-gray-900"
                placeholder="Add any additional notes..."
              />
            </div>

            {message.text && (
              <div
                className={`p-4 rounded-md ${
                  message.type === "success"
                    ? "bg-green-50 text-green-700"
                    : "bg-red-50 text-red-700"
                }`}
              >
                {message.text}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white 
                ${
                  loading
                    ? "bg-blue-400 cursor-not-allowed"
                    : "bg-blue-600 hover:bg-blue-700 focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                }
              `}
            >
              {loading ? (
                <div className="flex items-center">
                  <div className="w-5 h-5 border-t-2 border-b-2 border-white rounded-full animate-spin mr-2"></div>
                  Processing...
                </div>
              ) : (
                "Record Savings"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SavingsForm;
