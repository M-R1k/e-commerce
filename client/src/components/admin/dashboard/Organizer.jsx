import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import localhost from "../../../config";

export default function Organizer() {

    return (
        <div className="flex items-start">
            {/* SIDE BAR */}
                <div className="h-full">
                    <nav>
                        <Link to="/users" className="block mb-2">Users</Link>
                        <Link to="/categories" className="block mb-2">Categories</Link>
                        <Link to="/products" className="block mb-2">Products</Link>
                        <Link to="/promo" className="block mb-2">Promotions</Link>
                    </nav>
                </div>

            {/* MAIN CONTENT */}
            <div className="ml-8">
                <div className="flex justify-between mb-4">
                    <h2 className="text-xl font-bold">Post</h2>
                    <button className="bg-blue-500 text-white px-4 py-2 rounded">Add Post</button>
                </div>
                <input
                    type="text"
                    placeholder="Search"
                    className="w-full p-2 mb-4 border border-gray-300 rounded"
                />
                <table className="min-w-full bg-white border border-gray-300">
                    <thead>
                        <tr>
                            <th className="px-4 py-2 border-b">Title</th>
                            <th className="px-4 py-2 border-b">Author</th>
                            <th className="px-4 py-2 border-b">Comments</th>
                            <th className="px-4 py-2 border-b">Published At</th>
                            <th className="px-4 py-2 border-b">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* {posts.map((post) => (
                            <tr key={post.id}>
                                <td className="px-4 py-2 border-b">{post.title}</td>
                                <td className="px-4 py-2 border-b">{post.author}</td>
                                <td className="px-4 py-2 border-b text-center">{post.comments}</td>
                                <td className="px-4 py-2 border-b">{post.publishedAt}</td>
                                <td className="px-4 py-2 border-b text-blue-500">
                                    <button className="mr-2">Show</button>
                                    <button>Edit</button>
                                </td>
                            </tr>
                        ))} */}
                    </tbody>
                </table>
                <div className="flex justify-between mt-4">
                    <span>30 results</span>
                    <div>
                        <button className="px-4 py-2">Previous</button>
                        <button className="px-4 py-2">1</button>
                        <button className="px-4 py-2">2</button>
                        <button className="px-4 py-2">Next</button>
                    </div>
                </div>
            </div>
        </div>
    );
}
