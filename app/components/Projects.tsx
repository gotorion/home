export default function Projects() {
  const projectsData = [
    {
      title: "E-commerce 电商平台",
      description: "基于Next.js和Stripe构建的全栈电商应用，包含用户认证、支付集成、订单管理等功能。",
      technologies: [
        { name: "Next.js", color: "bg-blue-100 text-blue-800" },
        { name: "Stripe", color: "bg-green-100 text-green-800" },
        { name: "PostgreSQL", color: "bg-purple-100 text-purple-800" }
      ],
      link: "#"
    },
    {
      title: "任务管理应用",
      description: "使用React和Node.js开发的协作任务管理工具，支持实时更新和团队协作。",
      technologies: [
        { name: "React", color: "bg-blue-100 text-blue-800" },
        { name: "Node.js", color: "bg-yellow-100 text-yellow-800" },
        { name: "Socket.io", color: "bg-red-100 text-red-800" }
      ],
      link: "#"
    },
    {
      title: "个人博客系统",
      description: "使用Next.js和MDX构建的静态博客，支持Markdown写作和SEO优化。",
      technologies: [
        { name: "Next.js", color: "bg-blue-100 text-blue-800" },
        { name: "MDX", color: "bg-gray-100 text-gray-800" },
        { name: "Tailwind", color: "bg-indigo-100 text-indigo-800" }
      ],
      link: "#"
    },
    {
      title: "API 服务框架",
      description: "基于FastAPI构建的高性能RESTful API服务，包含认证、限流、监控等功能。",
      technologies: [
        { name: "FastAPI", color: "bg-green-100 text-green-800" },
        { name: "Python", color: "bg-blue-100 text-blue-800" },
        { name: "Redis", color: "bg-orange-100 text-orange-800" }
      ],
      link: "#"
    }
  ];

  return (
    <section id="projects" className="w-full bg-zinc-50/50 dark:bg-zinc-900/50 py-12 lg:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-xl sm:text-2xl font-semibold">项目作品</h2>
        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
          {projectsData.map((project, index) => (
            <div key={index} className="rounded-lg border p-4 card-shadow hover-lift">
              <a href={project.link} className="font-medium text-base hover:underline">
                {project.title}
              </a>
              <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
                {project.description}
              </p>
              <div className="mt-2 flex flex-wrap gap-2">
                {project.technologies.map((tech, techIndex) => (
                  <span 
                    key={techIndex} 
                    className={`px-2 py-1 ${tech.color} text-xs rounded`}
                  >
                    {tech.name}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
