import { Hero, About, Contact } from "./components";

export default function Home() {
  return (
    <div className="min-h-screen w-full home-container">
      <Hero />
      <About />
      <Contact />
    </div>
  );
}
