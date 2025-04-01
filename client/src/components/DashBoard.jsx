import React, { useState } from "react";
import companyData from "../assets/companyData.json";

const Dashboard = () => {
  const [formData, setFormData] = useState({
    accountStatus: "title",
    glAccount: "101000",
    name: "Initialised Formation Expense",
    externalCode: "",
    currency: "All Currencies",
    confidential: false,
    level: "5",
    balance: "0.00",
    currencyType: "INR",
    // GL Accounts Properties
    accountType: "Other",
    controlAccount: false,
    cashAccount: false,
    revaluation: false,
    blockManualPosting: false,
    cashFlowRelevant: false,
    projectRelevant: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data:", formData);
  };

  const [isOpen, setIsOpen] = useState(false);
  const [activeButton, setActiveButton] = useState(null);
  const [activeData, setActiveData] = useState(null);

  const toggleDrawer = (label) => {
    setActiveButton(label);
    setIsOpen(true);
    setActiveData(companyData[label]); // Set the data based on the label
  };

  // const closeDrawer = () => {
  //   setIsOpen(false);
  //   setActiveButton(null);
  //   setActiveData(null);
  // };

  // State to manage expand/collapse state of tree nodes
  const [expanded, setExpanded] = useState({});

  const toggleExpand = (key) => {
    setExpanded((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const renderTree = (data, path = "") => {
    const assetTitle = path === "" ? activeButton : null;
    const assetData = path === "" && data ? data : data;

    return (
      <>
        {assetTitle && (
          <h2 className="bg-blue-400 p-2 text-white font-medium sticky top-0 left-0">
            {assetTitle}
          </h2>
        )}

        <ul className="ml-2 border-l border-gray-300 pl-2 space-y-2">
          {Object.entries(assetData).map(([key, value]) => {
            const fullPath = `${path}.${key}`;
            const isExpanded = expanded[fullPath];

            const isObject = typeof value === "object" && value !== null;
            const hasName = isObject && value?.name;
            const isLeaf = typeof value === "string";

            const displayName = hasName
              ? `${key}: ${value.name}`
              : isLeaf
              ? `${key}: ${value}`
              : key;

            return (
              <li key={fullPath} className="group">
                <div
                  className={`flex items-center cursor-pointer hover:bg-blue-100 rounded ${
                    isLeaf ? "text-gray-500" : "text-black font-semibold"
                  }`}
                  onClick={() => !isLeaf && toggleExpand(fullPath)}
                >
                  <div className="flex-1">
                    <strong className="text-sm font-medium text-[10px]">
                      {displayName}
                    </strong>
                    {isObject && (
                      <span className="ml-2 text-gray-500 text-[10px]">
                        {isExpanded ? "▼" : "▶"}
                      </span>
                    )}
                  </div>
                </div>

                {isExpanded && isObject && (
                  <div className="ml-4">
                    {renderTree(
                      Object.fromEntries(
                        Object.entries(value).filter(
                          ([childKey]) => childKey !== "name"
                        )
                      ),
                      fullPath
                    )}
                  </div>
                )}
              </li>
            );
          })}
        </ul>
      </>
    );
  };

  return (
    <>
      <nav className="bg-blue-400 p-1 text-white pl-8 font-medium ">
        Chart of Accounts
      </nav>
      <div className="min-h-screen flex gap-1 bg-gray-100 p-2 w-full">
        {/* Form */}
        <aside className="bg-white px-4 py-3 rounded-lg shadow-md max-w-lg w-3/12">
          <h2 className="font-bold mb-2 text-sm">G/L Account Details</h2>

          <form onSubmit={handleSubmit} className="space-y-3">
            {/* Radio Buttons */}
            <div className="flex gap-4 items-center">
              <label className="flex items-center text-[9px]">
                <input
                  type="radio"
                  name="accountStatus"
                  value="title"
                  checked={formData.accountStatus === "title"} // Dynamic checked state
                  onChange={handleChange}
                  className="mr-2 transform transition-all duration-300 hover:scale-120"
                />
                Title
              </label>
              <label className="flex items-center text-[9px]">
                <input
                  type="radio"
                  name="accountStatus"
                  value="active"
                  checked={formData.accountStatus === "active"} // Dynamic checked state
                  onChange={handleChange}
                  className="mr-2 transform transition-all duration-300 hover:scale-120"
                />
                Active Account
              </label>
            </div>

            {/* Form Fields with Legend Labels */}
            <div className="rounded relative w-full">
              <legend className="absolute -top-3 left-2 bg-white px-2 text-[9px] font-medium transform transition-all duration-300 group-hover:-translate-y-1">
                G/L Account
              </legend>
              <input
                type="number"
                name="glAccount"
                value={formData.glAccount}
                onChange={handleChange}
                className="w-full border text-[12px] rounded focus:outline-none focus:border-[1.5px] focus:border-blue-700 p-1 transition-all duration-200"
              />
            </div>

            <div className="rounded relative w-full">
              <legend className="absolute -top-3 left-2 bg-white px-2 text-[9px] font-medium transform transition-all duration-300 group-hover:-translate-y-1">
                Name
              </legend>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full border text-[12px] rounded focus:outline-none focus:border-[1.5px] focus:border-blue-700 p-1 transition-all duration-200"
              />
            </div>

            <div className="rounded relative w-full">
              <legend className="absolute -top-3 left-2 bg-white px-2 text-[9px] font-medium transform transition-all duration-300 group-hover:-translate-y-1">
                External Code
              </legend>
              <input
                type="text"
                name="externalCode"
                value={formData.externalCode}
                onChange={handleChange}
                className="w-full border text-[12px] rounded focus:outline-none focus:border-[1.5px] focus:border-blue-700 p-1 transition-all duration-200"
              />
            </div>

            <div className="rounded relative w-full">
              <legend className="absolute -top-3 left-2 bg-white px-2 text-[9px] font-medium transform transition-all duration-300 group-hover:-translate-y-1">
                Currency
              </legend>
              <select
                name="currency"
                value={formData.currency}
                onChange={handleChange}
                className="w-full border text-[12px] rounded focus:outline-none focus:border-[1.5px] focus:border-blue-700 p-1 transition-all duration-200"
              >
                <option>All Currencies</option>
                <option>INR</option>
                <option>USD</option>
              </select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <label className="flex items-center text-[9px]">
                <input
                  type="checkbox"
                  name="confidential"
                  checked={formData.confidential}
                  onChange={handleChange}
                  className="mr-2 transform transition-all duration-300 hover:scale-120"
                />
                Confidential
              </label>
              <div className="rounded relative w-full">
                <legend className="absolute -top-3 left-2 bg-white px-2 text-[9px] font-medium transform transition-all duration-300 group-hover:-translate-y-1">
                  Level
                </legend>
                <input
                  type="number"
                  name="level"
                  value={formData.level}
                  onChange={handleChange}
                  className="w-full border text-[12px] rounded focus:outline-none focus:border-[1.5px] focus:border-blue-700 p-1 transition-all duration-200"
                />
              </div>
            </div>

            <div className="rounded relative w-full flex items-center">
              {/* Balance Field with Equal Width */}
              <div className="relative w-1/2">
                <legend className="absolute -top-3 left-2 bg-white px-2 text-[9px] font-medium transform transition-all duration-300 group-hover:-translate-y-1">
                  Balance
                </legend>
                <input
                  type="text"
                  name="balance"
                  value={formData.balance}
                  onChange={handleChange}
                  className="w-full border text-[12px] rounded-l focus:outline-none focus:border-[1.5px] focus:border-blue-700 p-1 transition-all duration-300"
                />
              </div>

              {/* Currency Select Box with Equal Width */}
              <div className="w-1/2">
                <select
                  name="currencyType"
                  value={formData.currencyType}
                  onChange={handleChange}
                  className="w-full border-l border text-[12px] rounded-r focus:outline-none focus:border-[1.5px] focus:border-blue-700 p-1 transition-all duration-300"
                >
                  <option value="INR">INR</option>
                  <option value="USD">USD</option>
                </select>
              </div>
            </div>

            <h2 className="font-bold mb-5 text-sm">G/L Account Properties</h2>
            {/* Account Properties */}
            <div className="rounded relative w-full">
              <legend className="absolute -top-3 left-2 bg-white px-2 text-[9px] font-medium transform transition-all duration-300 group-hover:-translate-y-1">
                Account Type
              </legend>
              <select
                name="accountType"
                value={formData.accountType}
                onChange={handleChange}
                className="w-full border text-[12px] rounded focus:outline-none focus:border-[1.5px] focus:border-blue-700 p-1 transition-all duration-200"
              >
                <option>Other</option>
                <option>Fixed</option>
              </select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <label className="flex items-center text-[9px]">
                <input
                  type="checkbox"
                  name="controlAccount"
                  checked={formData.controlAccount}
                  onChange={handleChange}
                  className="mr-2 transform transition-all duration-300 hover:scale-120"
                />
                Control Account
              </label>
              <label className="flex items-center text-[9px]">
                <input
                  type="checkbox"
                  name="cashAccount"
                  checked={formData.cashAccount}
                  onChange={handleChange}
                  className="mr-2 transform transition-all duration-300 hover:scale-120"
                />
                Cash Account
              </label>
              <label className="flex items-center text-[9px]">
                <input
                  type="checkbox"
                  name="revaluation"
                  checked={formData.revaluation}
                  onChange={handleChange}
                  className="mr-2 transform transition-all duration-300 hover:scale-120"
                />
                Reval. (Currency)
              </label>

              <label className="flex items-center text-[9px]">
                <input
                  type="checkbox"
                  name="blockManualPosting"
                  checked={formData.blockManualPosting}
                  onChange={handleChange}
                  className="mr-2 transform transition-all duration-300 hover:scale-120"
                />
                Block Manual Posting
              </label>

              <label className="flex items-center text-[9px]">
                <input
                  type="checkbox"
                  name="cashFlowRelevant"
                  checked={formData.cashFlowRelevant}
                  onChange={handleChange}
                  className="mr-2 transform transition-all duration-300 hover:scale-120"
                />
                Cash Flow Relevant
              </label>
            </div>

            <h2 className="font-bold mb-2 text-sm">
              Relevant for Cost Accounting
            </h2>
            <div className="flex justify-between items-center gap-2 mt-5">
              {/* Checkbox */}
              <label className="flex items-center text-[9px] whitespace-nowrap">
                <input
                  type="checkbox"
                  name="projectRelevant"
                  checked={formData.projectRelevant}
                  onChange={handleChange}
                  className="mr-2 transform transition-all duration-300 hover:scale-120"
                />
                Project Relevant
              </label>

              {/* Empty Input Field */}
              <input
                type="text"
                placeholder="Enter text"
                className="w-full border text-[12px] rounded focus:outline-none focus:border-[1.5px] focus:border-blue-700 p-1 transition-all duration-200"
              />
            </div>

            {/* Buttons */}
            <div className="flex justify-between items-center mt-5">
              {/* Submit Button */}
              <button
                type="submit"
                className="bg-blue-500 text-white text-base px-4 py-1 rounded hover:bg-green-600 transition-all duration-300 transform hover:scale-105 active:scale-95"
              >
                OK
              </button>

              {/* Reset Button */}
              <button
                type="reset"
                className="bg-blue-500 text-white text-base px-3 py-1 rounded hover:bg-yellow-600 transition-all duration-300 transform hover:scale-105 active:scale-95"
              >
                Cancel
              </button>

              {/* Account Details Button */}
              <button
                type="button"
                className="bg-blue-500 text-white text-base px-2 py-1 rounded hover:bg-blue-600 transition-all duration-300 transform hover:scale-105 active:scale-95"
                onClick={() => alert("Account Details Clicked!")}
              >
                Account Details
              </button>
            </div>
          </form>
        </aside>

        {/* Main Content */}
        <main className="w-8/12 bg-white rounded-lg shadow-md">
          {isOpen && (
            <div className="text-left shadow-md bg-white rounded-md relative overflow-y-auto h-[100vh]">
              {renderTree(activeData)}
            </div>
          )}
        </main>

        {/* Drawer */}
        <aside className="bg-white px-2 py-3 rounded-lg shadow-md flex flex-col gap-2 w-1/12">
          {["Asset", "Liability", "Equity", "Revenue", "Expenditure"].map(
            (label, index) => (
              <button
                key={index}
                aria-label={`Toggle ${label} Drawer`}
                onClick={() => toggleDrawer(label)}
                className={`h-20 rounded-md shadow-md text-sm transition-all duration-300 ${
                  activeButton === label
                    ? "bg-[#27AE60] text-white" // Active button style
                    : "bg-[#4A90E2] text-white hover:bg-[#E67E22] text-sm p-2 font-normal"
                }`}
              >
                {label}
              </button>
            )
          )}
        </aside>
      </div>
    </>
  );
};

export default Dashboard;
