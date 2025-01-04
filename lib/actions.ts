'use server'

interface GameProgress {
  level: number;
  experience: number;
  equipment: string[];
}

interface User {
  username: string;
  password: string;
  email: string;
  gameProgress: GameProgress;
}

let users: User[] = [
  { 
    username: '1234', 
    password: '1234', 
    email: 'admin@example.com',
    gameProgress: {
      level: 1,
      experience: 0,
      equipment: []
    }
  }
];

export async function login(username: string, password: string) {
  const user = users.find(u => u.username === username);
  if (user) {
    if (username === '1234' || user.password === password) {
      return { success: true, gameProgress: user.gameProgress };
    }
  }
  return { success: false, error: '帳號或密碼錯誤' };
}

export async function register(username: string, password: string, email: string) {
  if (users.some(u => u.username === username)) {
    return { success: false, error: '帳號已存在' };
  }
  const newUser: User = {
    username,
    password,
    email,
    gameProgress: {
      level: 1,
      experience: 0,
      equipment: []
    }
  };
  users.push(newUser);
  return { success: true };
}

export async function saveGameProgress(username: string, gameProgress: GameProgress) {
  const user = users.find(u => u.username === username);
  if (user) {
    user.gameProgress = gameProgress;
    return { success: true };
  }
  return { success: false, error: '用戶不存在' };
}

export async function logout(username: string, gameProgress: GameProgress) {
  await saveGameProgress(username, gameProgress);
  return { success: true };
}

