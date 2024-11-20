import VideoTig from "./ui/VideoTig";
import Home from "../Landing/ui/Home"
import TrabajosTig from "./ui/TrabajosTig";
import InformacionTig from "./ui/InformacionTig"
import FinalLanding from "./ui/FinalLanding";


export default function LandingView() {
  return (
    <div className="bg-gray-900 min-h-screen">
      <Home />
      <VideoTig />
      <TrabajosTig />
      <InformacionTig />
      <FinalLanding/>
    </div>
  );
}

