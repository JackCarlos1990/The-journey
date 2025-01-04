'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { login } from '@/lib/actions'

export default function LoginForm() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    const result = await login(username, password)
    if (result.success) {
      localStorage.setItem('username', username)
      localStorage.setItem('gameProgress', JSON.stringify(result.gameProgress))
      router.push('/game')
    } else {
      setError(result.error || '登入失敗')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-3xl shadow-2xl px-8 pt-10 pb-8 mb-4 transform hover:scale-105 transition-transform duration-300">
      <div className="mb-6">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
          帳號
        </label>
        <input
          className="shadow appearance-none border rounded-full w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-green-100"
          id="username"
          type="text"
          placeholder="輸入帳號"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      {username !== '1234' && (
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
            密碼
          </label>
          <input
            className="shadow appearance-none border rounded-full w-full py-3 px-4 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline bg-green-100"
            id="password"
            type="password"
            placeholder="輸入密碼"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
      )}
      {error && <p className="text-red-500 text-xs italic mb-4">{error}</p>}
      <div className="flex items-center justify-center">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-full focus:outline-none focus:shadow-outline transform hover:scale-110 transition-transform duration-300"
          type="submit"
        >
          登入冒險
        </button>
      </div>
    </form>
  )
}

