import { Card } from "@/components/ui/card";
import { Waves, Mountain, TreePine, Ship } from "lucide-react";
import WaveDividerTop from "./WaveDividerTop";
import HeroBat from "@/assets/Campa_gallery3.jpg";
import Forest from "@/assets/Campa_gallery1.jpg";
import Tent from "@/assets/Campa_gallery2.jpg";
import River from "@/assets/Campa_gallery4.jpg";


import HarboursImg from "@/assets/sidney-harbour-bridge.png";
import EstuariesImg from "@/assets/Estuary.png";
import LakesImg from "@/assets/lake.png";
import RiversImg from "@/assets/river.png";
import ForestImg from "@/assets/forest.png";
import TentImg from "@/assets/tent.png";
const locations = [
  { icon: Ship, title: "Harbours", color: "text-primary", image: HarboursImg },
  { icon: Waves, title: "Estuaries", color: "text-accent", image: EstuariesImg },
  { icon: Mountain, title: "Lakes", color: "text-primary-light", image: LakesImg },
  { icon: Waves, title: "Rivers", color: "text-primary-dark", image: RiversImg },
  { icon: TreePine, title: "Forest", color: "text-secondary-foreground", image: ForestImg },
  { icon: Tent, title: "Camp Grounds", color: "text-primary", image: TentImg },
];

const About = () => {
  return (
    <>
    <section id="about" className="py-4 sm:py-8">
      <div className="w-full mx-auto px-2 sm:px-4">       
            <div className="flex flex-wrap justify-center items-center gap-4 sm:gap-6 md:gap-8 lg:gap-12 xl:gap-16 px-2 sm:px-4 md:px-8">
              {locations.map((location, index) => {
                return (
                  <div key={index} style={{ background: 'linear-gradient(to bottom, #5bbaf1 0%, #06376e 100%)' }} className="rounded-full shadow-lg border-2 sm:border-4 border-[#e0f2fe] flex flex-col items-center justify-center w-[120px] h-[120px] sm:w-[140px] sm:h-[140px] md:w-[160px] md:h-[160px] lg:w-[180px] lg:h-[180px]">
                    <img 
                      src={location.image} 
                      alt={location.title}
                      className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 object-contain mb-1 sm:mb-2"
                    />
                    <span className="text-[#ffffff] font-semibold text-xs sm:text-sm md:text-base leading-tight text-center px-1">{location.title}</span>
                  </div>
                );
              })}
            </div>
      </div>
      <div className="w-full mx-auto px-4 py-8 sm:py-12 md:py-16 flex justify-center items-center pb-12 sm:pb-16 md:pb-20">
        <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl 2xl:text-6xl font-bold text-center leading-tight">
          Anytime, anywhere, for various purposes
        </h2>
      </div>
      <div className="relative mb-8 sm:mb-12 md:mb-16">
          {/* Main image container */}
          <div className="w-full px-2 sm:px-4">
            {/* Original complex grid layout with enhanced responsiveness */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-1 sm:gap-2 md:gap-3 lg:gap-4 xl:gap-0">
              
              {/* Mobile: stacks vertically */}
              {/* Small: 2 columns */}
              {/* Medium: 2 columns with adjusted spans */}
              {/* Large+: Original 4-column complex layout */}
              
              {/* Left tall image */}
              <div className="sm:col-span-1 md:col-span-1 lg:col-span-1 lg:row-span-2 order-1">
                <img 
                  src={HeroBat} 
                  alt="Hero Boat" 
                  className="w-full h-[250px] sm:h-[300px] md:h-[350px] lg:h-[800px] object-cover shadow-lg border-4 border-white"
                />
              </div>
              
              {/* Top middle wide image */}
              <div className="sm:col-span-1 md:col-span-1 lg:col-span-2 order-2 lg:order-2">
                <img 
                  src={Forest} 
                  alt="Forest" 
                  className="w-full h-[250px] sm:h-[300px] md:h-[350px] lg:h-[400px] object-cover shadow-lg border-4 border-white"
                />
              </div>
              
              {/* Right tall image */}
              <div className="sm:col-span-1 md:col-span-1 lg:col-span-1 lg:row-span-2 order-4 sm:order-3">
                <img 
                  src={River} 
                  alt="River" 
                  className="w-full h-[250px] sm:h-[300px] md:h-[350px] lg:h-[800px] object-cover shadow-lg border-4 border-white"
                />
              </div>
              
              {/* Bottom middle wide image */}
              <div className="sm:col-span-1 md:col-span-1 lg:col-span-2 order-3 sm:order-4 lg:order-4">
                <img 
                  src={Tent} 
                  alt="Tent" 
                  className="w-full h-[250px] sm:h-[300px] md:h-[350px] lg:h-[400px] object-cover shadow-lg border-4 border-white"
                />
              </div>
              
            </div>
        </div>
      </div>
    </section>

      <div className="relative">
        <WaveDividerTop fill="hsla(173.84, 66.97%, 42.75%, 1.00)" />
      </div>
    </>
  );
};

export default About;
