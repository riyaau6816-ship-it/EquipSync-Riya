export interface Equipment {
  id: number;
  name: string;
  category: string;
  price: number;
  image: string;
  description: string;
}

export const equipmentData: Equipment[] = [
  {
    id: 3,
    name: "Angle Grinder",
    category: "Tools",
    price: 900,
    image: "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&w=800&q=80",
    description: "Versatile angle grinder for cutting, grinding, and polishing various materials."
  },
  {
    id: 13,
    name: "Arduino Starter Kit",
    category: "Engineering",
    price: 150,
    image: "https://images.unsplash.com/photo-1555421689-491a97ff2040?auto=format&fit=crop&w=800&q=80",
    description: "Complete Arduino starter kit with sensors, modules, and breadboard for electronics projects."
  },
  {
    id: 2,
    name: "Circular Saw",
    category: "Tools",
    price: 2000,
    image: "https://images.unsplash.com/photo-1572981779307-38b8cabb2407?auto=format&fit=crop&w=800&q=80",
    description: "Professional grade circular saw for precise straight cuts in timber and wood materials."
  },
  {
    id: 19,
    name: "DC Power Supply",
    category: "Engineering",
    price: 600,
    image: "https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?auto=format&fit=crop&w=800&q=80",
    description: "Adjustable DC power supply (0-30V, 0-5A) for testing electronic circuits."
  },
  {
    id: 14,
    name: "Digital Multimeter",
    category: "Engineering",
    price: 100,
    image: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&w=800&q=80",
    description: "High-precision digital multimeter for measuring voltage, current, and resistance."
  },
  {
    id: 10,
    name: "Drone Camera",
    category: "Electronics",
    price: 3500,
    image: "https://images.unsplash.com/photo-1507582020474-9a35b7d455d9?auto=format&fit=crop&w=800&q=80",
    description: "Professional drone with 4K camera for aerial photography and videography."
  },
  {
    id: 4,
    name: "DSLR Camera Kit",
    category: "Photography",
    price: 1500,
    image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=800&q=80",
    description: "Professional DSLR camera with 18-55mm lens, perfect for high-quality photography and video."
  },
  {
    id: 12,
    name: "Foam Machine",
    category: "Event Equipment",
    price: 2200,
    image: "https://images.unsplash.com/photo-1514525253440-b393452e3720?auto=format&fit=crop&w=800&q=80",
    description: "High-output foam machine for parties and events, creates a fun foam party atmosphere."
  },
  {
    id: 20,
    name: "Function Generator",
    category: "Engineering",
    price: 900,
    image: "https://images.unsplash.com/photo-1581092947058-b44650b80f1b?auto=format&fit=crop&w=800&q=80",
    description: "DDS Function Signal Generator for producing sine, square, triangle, and other waveforms."
  },
  {
    id: 22,
    name: "Graphics Tablet",
    category: "Electronics",
    price: 800,
    image: "https://images.unsplash.com/photo-1563206767-5b1d97299337?auto=format&fit=crop&w=800&q=80",
    description: "Professional graphics tablet for digital art, design, and photo editing."
  },
  {
    id: 23,
    name: "Jackhammer",
    category: "Construction",
    price: 2500,
    image: "https://images.unsplash.com/photo-1585669678446-243577d34346?auto=format&fit=crop&w=800&q=80",
    description: "Heavy-duty electric jackhammer for breaking concrete and demolition work."
  },
  {
    id: 8,
    name: "Ladder (10 ft)",
    category: "Construction",
    price: 500,
    image: "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?auto=format&fit=crop&w=800&q=80",
    description: "10ft aluminum extension ladder, lightweight and durable for reaching heights."
  },
  {
    id: 9,
    name: "Laptop (i7, 16GB)",
    category: "Electronics",
    price: 2200,
    image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=800&q=80",
    description: "High-performance laptop with Intel i7 processor and 16GB RAM for demanding tasks."
  },
  {
    id: 24,
    name: "Laser Level",
    category: "Construction",
    price: 700,
    image: "https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?auto=format&fit=crop&w=800&q=80",
    description: "Self-leveling laser level for precise alignment and layout in construction projects."
  },
  {
    id: 16,
    name: "Oscilloscope",
    category: "Engineering",
    price: 800,
    image: "https://images.unsplash.com/photo-1581092335397-9583eb92d232?auto=format&fit=crop&w=800&q=80",
    description: "Digital storage oscilloscope for analyzing electronic signals and waveforms."
  },
  {
    id: 7,
    name: "Portable Generator",
    category: "Construction",
    price: 1800,
    image: "https://images.unsplash.com/photo-1589820296156-2454bb8a6d54?auto=format&fit=crop&w=800&q=80",
    description: "Reliable portable generator for power backup on construction sites or outdoor events."
  },
  {
    id: 1,
    name: "Power Drill",
    category: "Tools",
    price: 1200,
    image: "https://images.unsplash.com/photo-1504148455328-c376907d081c?auto=format&fit=crop&w=800&q=80",
    description: "High-performance cordless power drill suitable for drilling into wood, metal, and masonry."
  },
  {
    id: 17,
    name: "Raspberry Pi 4 Kit",
    category: "Engineering",
    price: 300,
    image: "https://images.unsplash.com/photo-1550009158-9ebf69173e03?auto=format&fit=crop&w=800&q=80",
    description: "Raspberry Pi 4 Model B (4GB RAM) starter kit with case, power supply, and SD card."
  },
  {
    id: 25,
    name: "Smart Home Kit",
    category: "Electronics",
    price: 400,
    image: "https://images.unsplash.com/photo-1558002038-1091a166111c?auto=format&fit=crop&w=800&q=80",
    description: "Complete smart home starter kit with hub, bulbs, and sensors."
  },
  {
    id: 15,
    name: "Soldering Iron Kit",
    category: "Engineering",
    price: 200,
    image: "https://images.unsplash.com/photo-1593720213428-28a5b9e94613?auto=format&fit=crop&w=800&q=80",
    description: "Adjustable temperature soldering iron kit with stand and solder wire."
  },
  {
    id: 11,
    name: "Sound System",
    category: "Event Equipment",
    price: 2500,
    image: "https://images.unsplash.com/photo-1545128485-c400e7702796?auto=format&fit=crop&w=800&q=80",
    description: "Powerful sound system with speakers and amplifier for parties and events."
  },
  {
    id: 6,
    name: "Studio Lighting Kit",
    category: "Photography",
    price: 1800,
    image: "https://images.unsplash.com/photo-1527011046414-4781f1f94f8c?auto=format&fit=crop&w=800&q=80",
    description: "Complete studio lighting setup including softboxes and stands for professional lighting."
  },
  {
    id: 26,
    name: "Thermal Camera",
    category: "Construction",
    price: 1500,
    image: "https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?auto=format&fit=crop&w=800&q=80",
    description: "Handheld thermal imaging camera for detecting heat leaks and electrical issues."
  },
  {
    id: 5,
    name: "Tripod Stand",
    category: "Photography",
    price: 300,
    image: "https://images.unsplash.com/photo-1500634245200-e5245c7574ef?auto=format&fit=crop&w=800&q=80",
    description: "Sturdy aluminum tripod stand for stable shots, adjustable height."
  },
  {
    id: 21,
    name: "VR Headset",
    category: "Electronics",
    price: 2500,
    image: "https://images.unsplash.com/photo-1622979135225-d2ba269fb1bd?auto=format&fit=crop&w=800&q=80",
    description: "Immersive VR headset for gaming and virtual experiences."
  }
];
