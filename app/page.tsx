export default function Home() {
  return (
    <main className="flex flex-col h-screen">
      {/* 上區塊 */}
      <header className="bg-gray-100 p-4">
        <div className="flex items-start">
          <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center">
            <svg
              className="w-8 h-8 text-gray-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
          </div>
          <div className="ml-2 flex flex-col">
            <span className="text-lg font-semibold text-blue-800">Lv.1</span>
            <span className="text-sm text-indigo-600">彌樣</span>
          </div>
        </div>
      </header>

      {/* 中區塊（主區塊） */}
      <section className="flex-grow bg-white p-8">
        {/* 這裡可以添加新的內容 */}
      </section>

      {/* 下區塊 */}
      <footer className="bg-gray-200 p-4">
        <p className="text-center text-gray-600">遊戲選單區域</p>
      </footer>
    </main>
  );
}