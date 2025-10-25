export default function Contact() {
  const contactLinks = [
    {
      href: "mailto:lijunhui.me@hotmail.com",
      icon: "📧",
      text: "lijunhui.me@hotmail.com"
    },
    {
      href: "https://github.com/gotorion",
      icon: "🐙", 
      text: "GitHub"
    },
    {
      href: "https://linkedin.com/in/lijunhui99",
      icon: "💼",
      text: "LinkedIn"
    }
  ];

  return (
    <section id="contact" className="w-full bg-transparent py-12 lg:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-xl sm:text-2xl font-semibold">联系方式</h2>
        <div className="mt-4 text-zinc-700 dark:text-zinc-300 text-sm sm:text-base space-y-4">
          <p>
            很高兴认识你！如果你有任何问题或合作机会，欢迎随时联系我。
          </p>
          <div className="flex flex-col sm:flex-row lg:justify-center gap-4 mt-6">
            {contactLinks.map((link, index) => (
              <a 
                key={index}
                href={link.href} 
                className="flex items-center justify-center gap-2 px-6 py-3 rounded-lg border hover:bg-zinc-50 dark:hover:bg-zinc-900 hover-lift"
              >
                <span>{link.icon}</span>
                <span>{link.text}</span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
