import React, { useState } from 'react';
import { Users, ArrowLeft, UserPlus, Save, Search, Edit, Trash2, CheckCircle, XCircle } from 'lucide-react';
import { useLoaderData } from 'react-router-dom';
import Swal from 'sweetalert2';

function All_user() {
      const users_data = useLoaderData();
      const [activeTab, setActiveTab] = useState('new');
      const [formData, setFormData] = useState({
            // name: '',
            // email: '',
            // gender: 'female',
            // status: 'active'
      });

      const handleInputChange = (e) => {
            const { name, value } = e.target;
            setFormData({
                  ...formData,
                  [name]: value
            });
            console.log("Form Data:", formData);
      };

      const handle_delete = (id) => {
            console.log('specific id', id);

            Swal.fire({
                  title: "Are you sure?",
                  text: "Are you sure that you want to delete it?",
                  icon: "warning",
                  showCancelButton: true,
                  confirmButtonColor: "#3085d6",
                  cancelButtonColor: "#d33",
                  confirmButtonText: "Yes, delete it!"
            }).then((result) => {
                  if (result.isConfirmed) {
                        fetch(`http://localhost:5000/users/${id}`, { 
                              method: 'DELETE'
                        })
                              .then(res => res.json())
                              .then((data) => {
                                    console.log(data);
                                    if (data.deletedCount > 0) {
                                          Swal.fire({
                                                title: "Deleted!",
                                                text: "User has been deleted.",
                                                icon: "success"
                                          });

                                          if (Array.isArray(users_data)) {
                                                const remaining = users_data.filter((user) => user._id !== id);
                                                console.log('remaining', remaining);
                                          } else {
                                                console.log("users_data is not an array.");
                                          }
                                    }
                              })
                              .catch(error => console.error("Error deleting user:", error));
                  }
            });
      };


      const handleSubmit = (event) => {
            event.preventDefault();
            const form = event.target;
            const name = form.name.value;
            const email = form.email.value;
            const gender = form.gender.value;
            const status = form.status.value;
            const users = { name, email, gender, status };

            console.log(users); 

            fetch("http://localhost:5000/users", {
                  method: "POST",
                  headers: {
                        "content-type": "application/json",
                  },
                  body: JSON.stringify(users),
            })
                  .then((res) => res.json())
                  .then((data) => {
                        console.log("Server Response:", data);

                        if (data.insertedId) {
                              Swal.fire({
                                    title: "Good job!",
                                    text: "User added successfully!",
                                    icon: "success",
                              }).then(() => {
                                    form.reset();
                                    form.elements["name"].value = "";
                                    form.elements["email"].value = "";
                              });
                        }
                  })
                  .catch((error) => {
                        console.error("Error:", error);
                  });
            setActiveTab('all')
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
                                    className={`cursor-pointer flex items-center px-6 py-4 text-sm font-medium transition-colors duration-200 ${activeTab === 'all'
                                          ? 'text-emerald-600 border-b-2 border-emerald-500'
                                          : 'text-gray-600 hover:text-emerald-500'
                                          }`}
                              >
                                    <Users size={18} className="mr-2" />
                                    All Users
                              </button>
                              <button
                                    onClick={() => setActiveTab('new')}
                                    className={`cursor-pointer flex items-center px-6 py-4 text-sm font-medium transition-colors duration-200 ${activeTab === 'new'
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
                                          <div className="flex justify-between items-center">
                                                <h2 className="text-xl font-semibold text-gray-800">User List : {users_data.length}</h2>
                                                <div className="relative">
                                                      <input
                                                            type="text"
                                                            placeholder="Search users..."
                                                            className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none"
                                                      />
                                                      <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
                                                </div>
                                          </div>

                                          <div className="overflow-x-auto">
                                                <table className="min-w-full divide-y divide-gray-200">
                                                      <thead className="bg-gray-50">
                                                            <tr>
                                                                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                                                                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                                                                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Gender</th>
                                                                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                                                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                                                            </tr>
                                                      </thead>
                                                      <tbody className="bg-white divide-y divide-gray-200">
                                                            {users_data.map((user) => (
                                                                  <tr key={user._id} className="hover:bg-gray-50 transition-colors duration-150">
                                                                        <td className="px-6 py-4 whitespace-nowrap">
                                                                              <div className="text-sm font-medium text-gray-900">{user.name}</div>
                                                                        </td>
                                                                        <td className="px-6 py-4 whitespace-nowrap">
                                                                              <div className="text-sm text-gray-500">{user.email}</div>
                                                                        </td>
                                                                        <td className="px-6 py-4 whitespace-nowrap">
                                                                              <div className="text-sm text-gray-500 capitalize">{user.gender}</div>
                                                                        </td>
                                                                        <td className="px-6 py-4 whitespace-nowrap">
                                                                              <span
                                                                                    className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${user.status === 'active'
                                                                                          ? 'bg-green-100 text-green-800'
                                                                                          : 'bg-red-100 text-red-800'
                                                                                          }`}
                                                                              >
                                                                                    {user.status}
                                                                              </span>
                                                                        </td>
                                                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                                                              <div className="flex space-x-2">
                                                                                    <button className="cursor-pointer text-indigo-600 hover:text-indigo-900">
                                                                                          <Edit size={18} />
                                                                                    </button>
                                                                                    <button onClick={() => handle_delete(user._id)} className="cursor-pointer text-red-600 hover:text-red-900">
                                                                                          <Trash2 size={18} />
                                                                                    </button>
                                                                              </div>
                                                                        </td>
                                                                  </tr>
                                                            ))}
                                                      </tbody>
                                                </table>
                                          </div>

                                          <div className="flex justify-between items-center pt-4">
                                                <button
                                                      onClick={() => setActiveTab('new')}
                                                      className="cursor-pointer flex items-center px-4 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors duration-200"
                                                >
                                                      <UserPlus size={18} className="mr-2" />
                                                      Add New User
                                                </button>
                                                <div className="flex space-x-2">
                                                      <button className="cursor-pointer px-3 py-1 border border-gray-300 rounded-md hover:bg-gray-50">Previous</button>
                                                      <button className="cursor-pointer px-3 py-1 bg-emerald-500 text-white rounded-md hover:bg-emerald-600">Next</button>
                                                </div>
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
                                                      className="w-full cursor-pointer flex items-center justify-center px-4 py-3 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors duration-200"
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

export default All_user;