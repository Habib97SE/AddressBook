"use client";
import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";

export default function Home() {
    const [addresses, setAddresses] = useState([]);
    const [users, setUsers] = useState([]);

    return (
        <div className="min-h-screen flex flex-col">
            <header className="bg-blue-500 text-white p-6 text-center">
                <h1 className="text-3xl font-black">
                    Find Address Easier with Our Address Management
                </h1>
                <div className="flex justify-start mt-4">
                    <input
                        type="text"
                        placeholder="Search"
                        className="border p-2 rounded"
                        id="searchQueryInput"
                    />
                    <button
                        className="bg-blue-700 text-white p-2 ml-2 flex items-center"
                        id="searchResultsModalBtn"
                    >
                        <FaSearch /> Search
                    </button>
                </div>
            </header>

            <main className="flex-grow container mx-auto py-8">
                <div className="text-center mb-8">
                    <p>
                        You can add more addresses to your phone book using the
                        button below:
                        <br />
                        <button
                            className="bg-green-500 text-white p-2 mt-4"
                            id="openAddModalBtn"
                        >
                            <i className="fas fa-plus"></i> Add New
                        </button>
                    </p>
                </div>

                <div className="flex justify-start mb-4">
                    <div>
                        <label htmlFor="filterByAddressTypes">
                            Filter by Address Type
                        </label>
                        <select
                            id="filterByAddressTypes"
                            className="border p-2 rounded ml-2 capitalize"
                        >
                            <option value="all">All</option>
                            {/* Dynamic options */}
                        </select>
                    </div>

                    <div>
                        <label htmlFor="sortAddressByCreatedDate">
                            Sort by
                        </label>
                        <select
                            id="sortAddressByCreatedDate"
                            className="border p-2 rounded ml-2 capitalize"
                        >
                            <option value="oldToNew">
                                From oldest to newest
                            </option>
                            <option value="newToOld">
                                From newest to oldest
                            </option>
                            <option value="aToZ">Address: A-Z</option>
                            <option value="zToA">Address: Z-A</option>
                        </select>
                    </div>

                    <div>
                        <label htmlFor="filterByUsers">Filter by user</label>
                        <select
                            id="filterByUsers"
                            className="border p-2 rounded ml-2 capitalize"
                        >
                            <option value="all">All</option>
                            {/* Dynamic options */}
                        </select>
                    </div>
                </div>

                <div className="table-responsive">
                    <table className="w-full table-auto">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Name</th>
                                <th>Address</th>
                                <th>Email</th>
                                <th>Phone</th>
                                <th>Address Type</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody id="viewAddressesTable">
                            {/* Dynamic rows */}
                            {addresses.length == 0 && (
                                <tr>
                                    <p className="text-red-400 font-bold text-center">
                                        There are no addresses
                                    </p>
                                </tr>
                            )}
                            {addresses.map((address, index) => (
                                <tr key={index}>
                                    <td>{address.id}</td>
                                    <td>{address.name}</td>
                                    <td>{address.address}</td>
                                    <td>{address.email}</td>
                                    <td>{address.phone}</td>
                                    <td>{address.type}</td>
                                    <td>
                                        <button className="bg-yellow-500 text-white p-2 mr-2">
                                            Update
                                        </button>
                                        <button className="bg-red-500 text-white p-2">
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </main>

            <footer className="bg-gray-800 text-white text-center p-4">
                <p>All rights reserved &copy; 2024</p>
            </footer>
        </div>
    );
}
