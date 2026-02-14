'use client';

import { useState } from 'react';
import { useUsers, useCreateUser, useDeleteUser, usePosts, useCreatePost } from '@/lib/hooks';

export default function Home() {
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [postTitle, setPostTitle] = useState('');
  const [postContent, setPostContent] = useState('');

  const { data: users, isLoading: usersLoading, error: usersError } = useUsers();
  const { data: posts, isLoading: postsLoading, error: postsError } = usePosts();
  const createUserMutation = useCreateUser();
  const deleteUserMutation = useDeleteUser();
  const createPostMutation = useCreatePost();

  const handleCreateUser = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userName || !userEmail) return;
    
    try {
      await createUserMutation.mutateAsync({ name: userName, email: userEmail });
      setUserName('');
      setUserEmail('');
    } catch (error) {
      console.error('Error creating user:', error);
    }
  };

  const handleDeleteUser = async (id: number) => {
    try {
      await deleteUserMutation.mutateAsync(id);
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  const handleCreatePost = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!postTitle || !postContent) return;
    
    try {
      const authorId = users && users.length > 0 ? users[0].id : undefined;
      await createPostMutation.mutateAsync({ 
        title: postTitle, 
        content: postContent,
        authorId 
      });
      setPostTitle('');
      setPostContent('');
    } catch (error) {
      console.error('Error creating post:', error);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8 text-indigo-900">
          NZR.NZ - Fullstack Next.js App
        </h1>
        <p className="text-center text-gray-600 mb-8">
          Next.js + Postgres + TanStack Query + Drizzle ORM
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Users Section */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-semibold mb-4 text-indigo-800">Users</h2>
            
            {/* Create User Form */}
            <form onSubmit={handleCreateUser} className="mb-6 space-y-3">
              <input
                type="text"
                placeholder="Name"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
              <input
                type="email"
                placeholder="Email"
                value={userEmail}
                onChange={(e) => setUserEmail(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
              <button
                type="submit"
                disabled={createUserMutation.isPending}
                className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition disabled:opacity-50"
              >
                {createUserMutation.isPending ? 'Creating...' : 'Create User'}
              </button>
            </form>

            {/* Users List */}
            {usersLoading && <p className="text-gray-500">Loading users...</p>}
            {usersError && <p className="text-red-500">Error loading users</p>}
            {users && users.length === 0 && (
              <p className="text-gray-500">No users yet. Create one above!</p>
            )}
            <div className="space-y-3">
              {users?.map((user) => (
                <div
                  key={user.id}
                  className="flex justify-between items-center p-3 bg-gray-50 rounded-lg"
                >
                  <div>
                    <p className="font-medium text-gray-800">{user.name}</p>
                    <p className="text-sm text-gray-500">{user.email}</p>
                  </div>
                  <button
                    onClick={() => handleDeleteUser(user.id)}
                    disabled={deleteUserMutation.isPending}
                    className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition disabled:opacity-50"
                  >
                    Delete
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Posts Section */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-semibold mb-4 text-indigo-800">Posts</h2>
            
            {/* Create Post Form */}
            <form onSubmit={handleCreatePost} className="mb-6 space-y-3">
              <input
                type="text"
                placeholder="Post Title"
                value={postTitle}
                onChange={(e) => setPostTitle(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
              <textarea
                placeholder="Post Content"
                value={postContent}
                onChange={(e) => setPostContent(e.target.value)}
                rows={3}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
              <button
                type="submit"
                disabled={createPostMutation.isPending}
                className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition disabled:opacity-50"
              >
                {createPostMutation.isPending ? 'Creating...' : 'Create Post'}
              </button>
            </form>

            {/* Posts List */}
            {postsLoading && <p className="text-gray-500">Loading posts...</p>}
            {postsError && <p className="text-red-500">Error loading posts</p>}
            {posts && posts.length === 0 && (
              <p className="text-gray-500">No posts yet. Create one above!</p>
            )}
            <div className="space-y-3">
              {posts?.map((post) => (
                <div key={post.id} className="p-4 bg-gray-50 rounded-lg">
                  <h3 className="font-semibold text-gray-800 mb-1">{post.title}</h3>
                  <p className="text-sm text-gray-600 mb-2">{post.content}</p>
                  <p className="text-xs text-gray-400">
                    Created: {new Date(post.createdAt).toLocaleDateString()}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-8 text-center text-sm text-gray-500">
          <p>🚀 Built with Next.js 15, Postgres, TanStack Query & Drizzle ORM</p>
        </div>
      </div>
    </main>
  );
}
