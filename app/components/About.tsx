export default function About() {
  return (
    <section id="about" className="w-full bg-transparent py-4 lg:py-6">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-xl sm:text-2xl font-semibold">关于我</h2>
        <div className="mt-2 text-zinc-700 dark:text-zinc-300 text-base sm:text-lg space-y-2">
          <p>目前在AI算力领域工作，主要使用C++进行国产芯片的AI适配。</p>
          <p>
            除了编程，我正在尝试通过电商和自媒体改变收入结构。希望能够在不确定性中找到属于自己的路。
          </p>
        </div>
      </div>
    </section>
  );
}
