import Hero from "./components/home/Hero";
import QuickActions from "./components/home/QuickActions";
import SystemStatus from "./components/home/SystemStatus";

export default function V5HomePage() {
  return (
    <div className="nq-page">
      <Hero />
      <SystemStatus />
      <QuickActions />
    </div>
  );
}

