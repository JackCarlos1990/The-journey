'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { UserIcon, ShieldIcon, BookOpenIcon } from 'lucide-react'
import { saveGameProgress, logout } from '@/lib/actions'

interface GameProgress {
  level: number;
  experience: number;
  equipment: string[];
}

const MAX_LEVEL = 50;

export default function GamePage() {
  const router = useRouter()
  const [username, setUsername] = useState<string>('')
  const [gameProgress, setGameProgress] = useState<GameProgress>({
    level: 1,
    experience: 0,
    equipment: []
  })

  useEffect(() => {
    const storedUsername = localStorage.getItem('username')
    const storedGameProgress = localStorage.getItem('gameProgress')
    
    if (storedUsername) {
      setUsername(storedUsername)
    }
    
    if (storedGameProgress) {
      setGameProgress(JSON.parse(storedGameProgress))
    }
  }, [])

  useEffect(() => {
    if (username && gameProgress) {
      localStorage.setItem('username', username)
      localStorage.setItem('gameProgress', JSON.stringify(gameProgress))
    }
  }, [username, gameProgress])

  const handleLogout = async () => {
    await logout(username, gameProgress)
    localStorage.removeItem('username')
    localStorage.removeItem('gameProgress')
    router.push('/')
  }

  const handleGainExperience = () => {
    setGameProgress(prev => ({
      ...prev,
      level: Math.min(prev.level + 1, MAX_LEVEL),
      experience: 0
    }))
  }

  return (
    <main className="flex flex-col h-screen bg-gradient-to-b from-blue-100 to-white text-gray-800">
      {/* 頂部狀態欄 */}
      <header className="bg-white shadow-md p-4 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center">
            <UserIcon className="w-6 h-6 text-white" />
          </div>
          <div>
            <p className="font-bold">{username}</p>
            <p className="text-xs text-gray-500">等級 {gameProgress.level}</p>
          </div>
          <div className="ml-4 flex items-center">
            <p className="text-xs text-gray-500 mr-2">經驗</p>
            <Progress value={gameProgress.experience} className="w-20 h-2" />
          </div>
        </div>
        <Button 
          variant="outline" 
          size="sm" 
          onClick={handleLogout}
          className="transition-all duration-200 active:scale-90 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 text-white border-none hover:from-pink-600 hover:via-purple-600 hover:to-indigo-600 active:from-pink-700 active:via-purple-700 active:to-indigo-700"
        >
          登出
        </Button>
      </header>

      {/* 主要遊戲區域 */}
      <section className="flex-grow p-4 overflow-y-auto">
        <div className="space-y-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center">
                <ShieldIcon className="w-5 h-5 mr-2" />
                裝備
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm mb-2">管理和升級你的裝備</p>
              <Button variant="outline" className="w-full">查看裝備</Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center">
                <BookOpenIcon className="w-5 h-5 mr-2" />
                任務
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm mb-2">接受並完成任務以獲得獎勵</p>
              <Button variant="outline" className="w-full">查看任務</Button>
            </CardContent>
          </Card>

          {/* 測試按鈕 */}
          <div className="flex space-x-4">
            <Button 
              onClick={handleGainExperience}
              disabled={gameProgress.level >= MAX_LEVEL}
            >
              {gameProgress.level >= MAX_LEVEL ? '已達最高等級' : '獲得經驗並升級'}
            </Button>
          </div>
        </div>
      </section>

      {/* 底部導航欄 */}
      <footer className="bg-white shadow-inner p-2">
        <nav className="flex justify-around">
          <Button variant="ghost" size="sm" className="flex-col items-center">
            <ShieldIcon className="h-5 w-5" />
            <span className="text-xs">裝備</span>
          </Button>
          <Button variant="ghost" size="sm" className="flex-col items-center">
            <BookOpenIcon className="h-5 w-5" />
            <span className="text-xs">任務</span>
          </Button>
        </nav>
      </footer>
    </main>
  );
}

