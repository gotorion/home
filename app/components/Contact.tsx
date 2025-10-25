export default function Contact() {
  const contactLinks = [
    {
      href: "mailto:lijunhui.me@hotmail.com",
      text: "Email",
      color:
        "bg-amber-100 hover:bg-amber-200 dark:bg-amber-900/30 dark:hover:bg-amber-800/40",
    },
    {
      href: "https://github.com/gotorion",
      text: "GitHub",
      color:
        "bg-gray-800 hover:bg-gray-900 dark:bg-gray-700 dark:hover:bg-gray-600 text-white",
    },
    {
      href: "https://linkedin.com/in/lijunhui99",
      text: "LinkedIn",
      color:
        "bg-blue-100 hover:bg-blue-200 dark:bg-blue-900/30 dark:hover:bg-blue-800/40",
    },
    {
      href: "https://www.xiaohongshu.com/user/profile/your-profile-id",
      text: "小红书",
      color:
        "bg-red-100 hover:bg-red-200 dark:bg-red-900/30 dark:hover:bg-red-800/40",
    },
    {
      href: "https://www.douyin.com/user/your-douyin-id",
      text: "抖音",
      color:
        "bg-gray-800 hover:bg-gray-900 dark:bg-gray-700 dark:hover:bg-gray-600 text-white",
    },
    {
      href: "https://twitter.com/_gotorion",
      text: "Twitter",
      color:
        "bg-blue-100 hover:bg-blue-200 dark:bg-blue-900/30 dark:hover:bg-blue-800/40",
    },
  ];

  return (
    <section id="contact" className="w-full bg-transparent py-4 lg:py-6">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-xl sm:text-2xl font-semibold">联系方式</h2>
        <div className="mt-2 text-zinc-700 dark:text-zinc-300 text-base sm:text-lg space-y-2">
          <p>很高兴认识你！如果你有任何问题或合作机会，欢迎随时联系我。</p>
          <div className="flex flex-col sm:flex-row lg:justify-center gap-4 mt-4">
            {contactLinks.map((link, index) => (
              <a
                key={index}
                href={link.href}
                className={`flex items-center justify-center gap-2 px-6 py-3 rounded-lg border hover-lift transition-colors duration-200 ${link.color}`}
              >
                <span>{link.text}</span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
