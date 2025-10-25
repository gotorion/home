import { Hero, About, Skills, Projects, Roadmap, Contact } from './components';

export default function Home() {
  return (
    <div className="min-h-screen w-full">
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Roadmap />
      <Contact />
    </div>
  );
}
