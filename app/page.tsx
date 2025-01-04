import Link from 'next/link'
import LoginForm from '@/components/LoginForm'

export default function LoginPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-green-200 to-emerald-300 p-4">
      <h1 className="text-4xl font-bold mb-8 text-purple-600 animate-bounce">旅途</h1>
      <div className="w-full max-w-[280px]">
        <LoginForm />
        <div className="mt-4 text-center">
          <Link href="/register" className="text-blue-600 hover:underline">
            註冊新會員
          </Link>
        </div>
      </div>
    </div>
  )
}

