"use client";

import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FaCalendarAlt } from "react-icons/fa"; // Import the calendar icon from react-icons

export default function CustomDatePicker({ label, selectedDate, onChange, highlightDates }) {
  return (
    <div className="flex flex-col space-y-2 relative">
      <label className="text-sm font-medium text-gray-700">{label}</label>
      <div className="relative">
        <DatePicker
          selected={selectedDate}
          onChange={onChange}
          placeholderText="Pick a date"
          className="w-full border p-2 rounded-md pl-10 focus:outline-none focus:ring-2 focus:ring-blue-400"
          highlightDates={highlightDates} // Highlight the date range
        />
        {/* Calendar icon positioned inside the input */}
        <FaCalendarAlt className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
      </div>
    </div>
  );
}
