import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

// Types
export interface User {
  id: number;
  name: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Post {
  id: number;
  title: string;
  content: string;
  authorId: number | null;
  createdAt: Date;
  updatedAt: Date;
}

// API functions
async function fetchUsers(): Promise<User[]> {
  const response = await fetch('/api/users');
  if (!response.ok) throw new Error('Failed to fetch users');
  return response.json();
}

async function fetchUser(id: number): Promise<User> {
  const response = await fetch(`/api/users?id=${id}`);
  if (!response.ok) throw new Error('Failed to fetch user');
  return response.json();
}

async function createUser(data: { name: string; email: string }): Promise<User> {
  const response = await fetch('/api/users', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error('Failed to create user');
  return response.json();
}

async function deleteUser(id: number): Promise<void> {
  const response = await fetch(`/api/users?id=${id}`, { method: 'DELETE' });
  if (!response.ok) throw new Error('Failed to delete user');
}

async function fetchPosts(): Promise<Post[]> {
  const response = await fetch('/api/posts');
  if (!response.ok) throw new Error('Failed to fetch posts');
  return response.json();
}

async function fetchPost(id: number): Promise<Post> {
  const response = await fetch(`/api/posts?id=${id}`);
  if (!response.ok) throw new Error('Failed to fetch post');
  return response.json();
}

async function createPost(data: { title: string; content: string; authorId?: number }): Promise<Post> {
  const response = await fetch('/api/posts', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error('Failed to create post');
  return response.json();
}

async function updatePost(id: number, data: { title: string; content: string }): Promise<Post> {
  const response = await fetch(`/api/posts?id=${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error('Failed to update post');
  return response.json();
}

async function deletePost(id: number): Promise<void> {
  const response = await fetch(`/api/posts?id=${id}`, { method: 'DELETE' });
  if (!response.ok) throw new Error('Failed to delete post');
}

// Custom hooks
export function useUsers() {
  return useQuery({
    queryKey: ['users'],
    queryFn: fetchUsers,
  });
}

export function useUser(id: number) {
  return useQuery({
    queryKey: ['users', id],
    queryFn: () => fetchUser(id),
    enabled: !!id,
  });
}

export function useCreateUser() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
    },
  });
}

export function useDeleteUser() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
    },
  });
}

export function usePosts() {
  return useQuery({
    queryKey: ['posts'],
    queryFn: fetchPosts,
  });
}

export function usePost(id: number) {
  return useQuery({
    queryKey: ['posts', id],
    queryFn: () => fetchPost(id),
    enabled: !!id,
  });
}

export function useCreatePost() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createPost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] });
    },
  });
}

export function useUpdatePost() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: { title: string; content: string } }) =>
      updatePost(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] });
    },
  });
}

export function useDeletePost() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deletePost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] });
    },
  });
}
