'use server'

export async function login(username: string, password: string) {
  // 這裡應該有更安全的驗證邏輯，這只是一個簡單的示例
  if (username === '1234' && password === '1234') {
    return { success: true }
  } else {
    return { success: false, error: '帳號或密碼錯誤' }
  }
}

export async function register(username: string, password: string, email: string) {
  // 這裡應該有實際的註冊邏輯
  if (username && password && email) {
    return { success: true }
  }
  return { success: false, error: '註冊資料不完整' }
}

