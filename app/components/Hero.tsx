import Image from "next/image";

export default function Hero() {
  return (
    <section className="w-full bg-transparent py-12 lg:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center gap-8 text-center py-8 lg:py-12">
          <div className="w-28 h-28 lg:w-32 lg:h-32 rounded-full overflow-hidden hover-lift">
            <Image
              src="/avatar.png"
              alt="Jimmy的头像"
              width={128}
              height={128}
              className="w-full h-full object-cover"
            />
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold">
            Jimmy
          </h1>
          <p className="max-w-2xl text-lg sm:text-xl lg:text-2xl text-zinc-600 dark:text-zinc-400 leading-relaxed">
            我是一名全栈开发工程师，专注于构建现代化、高性能的Web应用。
            热爱技术，喜欢学习新技术，致力于创造优秀的用户体验。
          </p>

          <div className="flex justify-center mt-4">
            <a
              href="#contact"
              className="bg-orange-400 px-8 py-4 text-base font-medium text-white hover:bg-orange-500 hover-lift shadow-lg hover:shadow-xl transition-all duration-300 rounded-xl"
            >
              联系我
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
