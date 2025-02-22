"use client"

import { useEffect, useState } from "react";
import api from "@/utils/api";

interface Applicant {
  fullname: string;
  email: string;
  course: string;
  date: string;
  actions: string;
}

export default function ApplicationsTable() {
  const [applicants, setApplicants] = useState<Applicant[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchApplicants = async () => {
      try {
        const userString = localStorage.getItem("user");
        const user = userString ? JSON.parse(userString) : null;

        if (user?.token) {
          api.defaults.headers.Authorization = `Bearer ${user.token}`;
          const response = await api.get("/admin/applicants");
          if (response.status === 200) {
            setApplicants(response.data.data);
          } else {
            setError("Failed to fetch applicants");
          }
        } else {
          setError("No user token found");
        }
      } catch (error) {
        console.error(error);
        setError("An error occurred while fetching the applicants");
      } finally {
        setLoading(false);
      }
    };

    fetchApplicants();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Total Applications</h2>
        <button className="bg-blue-500 text-white px-4 py-2 rounded">Add filter</button>
      </div>
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-white p-4 rounded shadow">
          <h3 className="text-lg font-bold">40,689</h3>
          <p className="text-sm text-gray-500">8.5% Up from yesterday</p>
        </div>
        <div className="bg-white p-4 rounded shadow">
          <h3 className="text-lg font-bold">4,489</h3>
          <p className="text-sm text-gray-500">1.5% Up from yesterday</p>
        </div>
        <div className="bg-white p-4 rounded shadow">
          <h3 className="text-lg font-bold">Pending Applications</h3>
          <p className="text-sm text-gray-500">1.5% Up from yesterday</p>
        </div>
      </div>
      <div className="bg-white rounded shadow overflow-hidden">
        <table className="min-w-full">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Applicant Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email address</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Course Applied</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Applied date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody>
            {applicants.length > 0 ? (
              applicants.map((app, index) => (
                <tr key={index} className="border-b">
                  <td className="px-6 py-4 whitespace-nowrap">{app.fullname}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{app.email}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{app.course}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{app.date}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{app.actions}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="text-center py-4">No applicants found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}