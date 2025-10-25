export default function Skills() {
  const skillsData = [
    {
      title: "前端开发",
      technologies: "React, Next.js, TypeScript, Tailwind CSS, Vue.js"
    },
    {
      title: "后端开发", 
      technologies: "Node.js, Python, Express, FastAPI, PostgreSQL"
    },
    {
      title: "工具与平台",
      technologies: "Git, Docker, AWS, Vercel, GitHub Actions"
    },
    {
      title: "其他技能",
      technologies: "UI/UX设计, 项目管理, 团队协作"
    }
  ];

  return (
    <section id="skills" className="w-full bg-transparent py-12 lg:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-xl sm:text-2xl font-semibold">技能专长</h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {skillsData.map((skill, index) => (
            <div key={index} className="rounded-lg border p-4 card-shadow hover-lift">
              <h3 className="font-medium text-base">{skill.title}</h3>
              <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
                {skill.technologies}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
