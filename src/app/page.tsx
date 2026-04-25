import { WandSparkles } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/ui/badge";
import { Button } from "@/ui/button";
import Navbar from "@/ui/navbar";
import Orb from "@/ui/Orb";

export default function LandingPage() {
  return (
    <header className="min-h-dvh relative">
      <Orb hoverIntensity={2} hue={0} forceHoverState={false} />
      <div className="flex flex-col items-center z-10 relative">
        <div className="w-full pt-4 md:pt-10 px-4">
          <Navbar />
        </div>

        <Badge variant="outline" className="h-7 px-2.5 mt-20 border-none text-muted-foreground gap-2">
          <WandSparkles className="min-h-3.5 min-w-3.min-h-3.5" />
          My Agent v1
        </Badge>
        <h1 className="text-5xl md:text-6xl font-semibold my-5  text-center">
          Your Intelligent Agent
          <br /> for Seamless Booking
        </h1>
        <div className="flex gap-2">
          <Button size="lg" asChild>
            <Link href="/signin">Get Started</Link>
          </Button>
          <Button size="lg" variant="outline" asChild>
            <Link href="/chat">Let's chat!</Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
