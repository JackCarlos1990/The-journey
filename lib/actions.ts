'use server'

import { prisma } from './prisma'
import { cookies } from 'next/headers'

export async function login(username: string, password: string) {
  try {
    // 查找用戶
    const user = await prisma.user.findUnique({
      where: { username },
      include: { gameProgress: true }
    })

    // 特殊處理帳號 '1234'
    if (username === '1234') {
      if (!user) {
        // 如果是第一次登入，創建帳號
        const newUser = await prisma.user.create({
          data: {
            username: '1234',
            password: '',
            email: 'admin@example.com',
            gameProgress: {
              create: {
                level: 1,
                experience: 0,
                equipment: []
              }
            }
          },
          include: { gameProgress: true }
        })
        cookies().set('userId', newUser.id)
        return { success: true, gameProgress: newUser.gameProgress }
      }
      // 已存在的 1234 帳號可直接登入
      cookies().set('userId', user.id)
      return { success: true, gameProgress: user.gameProgress }
    }

    // 一般用戶需要密碼驗證
    if (user && user.password === password) {
      cookies().set('userId', user.id)
      return { success: true, gameProgress: user.gameProgress }
    }

    return { success: false, error: '帳號或密碼錯誤' }
  } catch (error) {
    console.error('Login error:', error)
    return { success: false, error: '登入時發生錯誤' }
  }
}

export async function register(username: string, password: string, email: string) {
  try {
    // 檢查用戶名或郵箱是否已存在
    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [
          { username },
          { email }
        ]
      }
    })

    if (existingUser) {
      return { success: false, error: '帳號或信箱已存在' }
    }

    // 創建新用戶
    const newUser = await prisma.user.create({
      data: {
        username,
        password,
        email,
        gameProgress: {
          create: {
            level: 1,
            experience: 0,
            equipment: []
          }
        }
      }
    })

    return { success: true }
  } catch (error) {
    console.error('Register error:', error)
    return { success: false, error: '註冊時發生錯誤' }
  }
}

export async function saveGameProgress(gameProgress: {
  level: number
  experience: number
  equipment: string[]
}) {
  try {
    const userId = cookies().get('userId')?.value
    if (!userId) {
      return { success: false, error: '未登入' }
    }

    await prisma.gameProgress.update({
      where: { userId },
      data: gameProgress
    })

    return { success: true }
  } catch (error) {
    console.error('Save progress error:', error)
    return { success: false, error: '保存進度時發生錯誤' }
  }
}

export async function logout() {
  try {
    cookies().delete('userId')
    return { success: true }
  } catch (error) {
    console.error('Logout error:', error)
    return { success: false, error: '登出時發生錯誤' }
  }
}

