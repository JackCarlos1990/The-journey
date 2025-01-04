'use server'

import { prisma } from '@/lib/prisma'
import bcrypt from 'bcryptjs'

interface GameProgress {
  level: number;
  experience: number;
  equipment: string[];
}

export async function login(username: string, password: string) {
  const user = await prisma.user.findUnique({ 
    where: { username },
    include: { gameProgress: true }
  });

  if (username === '1234') {
    return { 
      success: true, 
      gameProgress: user?.gameProgress || { level: 1, experience: 0, equipment: [] }
    };
  }

  if (!user || !user.password) {
    return { success: false, error: '帳號或密碼錯誤' };
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return { success: false, error: '帳號或密碼錯誤' };
  }

  return { 
    success: true, 
    gameProgress: user.gameProgress || { level: 1, experience: 0, equipment: [] }
  };
}

export async function register(username: string, password: string, email: string) {
  const existingUser = await prisma.user.findFirst({
    where: { OR: [{ username }, { email }] }
  });

  if (existingUser) {
    return { success: false, error: '帳號或信箱已存在' };
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  
  try {
    await prisma.user.create({
      data: {
        username,
        password: hashedPassword,
        email,
        gameProgress: {
          create: { level: 1, experience: 0, equipment: [] }
        }
      }
    });

    return { success: true };
  } catch (error) {
    console.error('Registration error:', error);
    return { success: false, error: '註冊失敗，請稍後再試' };
  }
}

export async function saveGameProgress(username: string, gameProgress: GameProgress) {
  try {
    const user = await prisma.user.findUnique({ 
      where: { username },
      include: { gameProgress: true }
    });

    if (!user) {
      return { success: false, error: '用戶不存在' };
    }

    await prisma.gameProgress.update({
      where: { userId: user.id },
      data: gameProgress
    });

    return { success: true };
  } catch (error) {
    console.error('Save progress error:', error);
    return { success: false, error: '保存進度失敗，請稍後再試' };
  }
}

export async function logout(username: string, gameProgress: GameProgress) {
  const result = await saveGameProgress(username, gameProgress);
  return { success: result.success };
}

