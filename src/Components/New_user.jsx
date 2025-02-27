import React, { useState } from 'react';
import { Users, ArrowLeft, UserPlus, Save, Search, Edit, Trash2, CheckCircle, XCircle } from 'lucide-react';

function New_user() {
  const [activeTab, setActiveTab] = useState('new');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    gender: 'female',
    status: 'active'
  });

  // Mock users data
  const [users, setUsers] = useState([
    { id: 1, name: 'Jaya Dakhale', email: 'jaya@gmail.com', gender: 'female', status: 'active' },
    { id: 2, name: 'Alex Johnson', email: 'alex@example.com', gender: 'male', status: 'active' },
    { id: 3, name: 'Sarah Williams', email: 'sarah@example.com', gender: 'female', status: 'inactive' }
  ]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (event) => {
    e.preventDefault();
    const form = event.target;
    const name = form.name.value;
    const email = form.email.value;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-50 p-6">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
        {/* Header */}
        <div className="bg-emerald-500 text-white p-5">
          <div className="flex items-center justify-center">
            <Users className="mr-2" size={24} />
            <h1 className="text-2xl font-bold text-center">User Management System</h1>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex border-b border-gray-200">
          <button
            onClick={() => setActiveTab('all')}
            className={`flex items-center px-6 py-4 text-sm font-medium transition-colors duration-200 ${
              activeTab === 'all'
                ? 'text-emerald-600 border-b-2 border-emerald-500'
                : 'text-gray-600 hover:text-emerald-500'
            }`}
          >
            <Users size={18} className="mr-2" />
            All Users
          </button>
          <button
            onClick={() => setActiveTab('new')}
            className={`flex items-center px-6 py-4 text-sm font-medium transition-colors duration-200 ${
              activeTab === 'new'
                ? 'text-emerald-600 border-b-2 border-emerald-500'
                : 'text-gray-600 hover:text-emerald-500'
            }`}
          >
            <UserPlus size={18} className="mr-2" />
            New User
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {activeTab === 'all' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center pt-4">
              </div>
            </div>
          )}

          {activeTab === 'new' && (
            <div className="space-y-6">
              <div className="flex items-center mb-6">
                <button
                  onClick={() => setActiveTab('all')}
                  className="flex items-center text-emerald-600 hover:text-emerald-700 transition-colors duration-200"
                >
                  <ArrowLeft size={18} className="mr-1" />
                  All Users
                </button>
              </div>

              <div className="text-center mb-6">
                <h2 className="text-2xl font-semibold text-gray-800">New User</h2>
                <p className="text-gray-500 mt-1">Use the below form to create a new account</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-medium text-gray-700">
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-colors duration-200"
                      placeholder="Enter full name"
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium text-gray-700">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-colors duration-200"
                      placeholder="Enter email address"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Gender</label>
                    <div className="flex space-x-6 mt-1">
                      <div className="flex items-center">
                        <input
                          type="radio"
                          id="male"
                          name="gender"
                          value="male"
                          checked={formData.gender === 'male'}
                          onChange={handleInputChange}
                          className="h-4 w-4 text-emerald-500 focus:ring-emerald-400"
                        />
                        <label htmlFor="male" className="ml-2 text-sm text-gray-700">
                          Male
                        </label>
                      </div>
                      <div className="flex items-center">
                        <input
                          type="radio"
                          id="female"
                          name="gender"
                          value="female"
                          checked={formData.gender === 'female'}
                          onChange={handleInputChange}
                          className="h-4 w-4 text-emerald-500 focus:ring-emerald-400"
                        />
                        <label htmlFor="female" className="ml-2 text-sm text-gray-700">
                          Female
                        </label>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">Status</label>
                    <div className="flex space-x-6 mt-1">
                      <div className="flex items-center">
                        <input
                          type="radio"
                          id="active"
                          name="status"
                          value="active"
                          checked={formData.status === 'active'}
                          onChange={handleInputChange}
                          className="h-4 w-4 text-emerald-500 focus:ring-emerald-400"
                        />
                        <label htmlFor="active" className="ml-2 flex items-center text-sm text-gray-700">
                          <CheckCircle size={16} className="mr-1 text-green-500" />
                          Active
                        </label>
                      </div>
                      <div className="flex items-center">
                        <input
                          type="radio"
                          id="inactive"
                          name="status"
                          value="inactive"
                          checked={formData.status === 'inactive'}
                          onChange={handleInputChange}
                          className="h-4 w-4 text-emerald-500 focus:ring-emerald-400"
                        />
                        <label htmlFor="inactive" className="ml-2 flex items-center text-sm text-gray-700">
                          <XCircle size={16} className="mr-1 text-red-500" />
                          Inactive
                        </label>
                      </div>
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full flex items-center justify-center px-4 py-3 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors duration-200"
                >
                  <Save size={18} className="mr-2" />
                  Save
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
      
      <footer className="mt-8 text-center text-gray-500 text-sm">
        <p>© 2025 User Management System. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default New_user;