import { motion } from "motion/react";
import { useState } from "react";
import { ProjectModal } from "./ProjectModal";
import { AwardStar } from "./AwardStar";
import { AIBadge } from "./AIBadge";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./ui/tooltip";
import spokaneRiverKeeperHero from "figma:asset/211d0f2f641d8962580fba41cfe7eb72f105915b.png";
import blender3DCharacter from "figma:asset/48e5e771b18f7ce9c566020113056739aefaffc3.png";
import verdalisCover from "figma:asset/e085659959f6b329254273ffcd9a440dd2705bf0.png";
import knrdCover from "figma:asset/a44b9bb28604331b6f48beb7e441870b3429b68e.png";
import empowerHourCover from "figma:asset/0b765b70b49bfad44b71069e5de5937c523ad6fa.png";
import leafIcon from "figma:asset/6c3da388443fb551d348f561587301df16ec7e07.png";
import processImage1 from "figma:asset/bf49b3e0e12d6ba92a7726ffd344ac1b17917c80.png";
import processImage2 from "figma:asset/aaa9f4a6d6bbfca38fe6add7815d717bcc41d475.png";
import processImage3 from "figma:asset/e606b008302b546d4e2523729c4b654ec7f70df2.png";
import processImage4 from "figma:asset/def42beef8316e76fed6d52cef5833c3684f21ed.png";
import processImage5 from "figma:asset/3be3e88acbebb9dc3339ff47f831bac56625732a.png";
import processImage6 from "figma:asset/57daab8aa744af8ef72cc6a1fe108a779a5a78a0.png";
import processImage7 from "figma:asset/9399bb29c1222b8c8d73d4b25f85f910a8263d74.png";
import processImage8 from "figma:asset/289a60846a079dcc1d7208be5f2d6c9fa1d47f90.png";
import processImage9 from "figma:asset/90b67a5ade9d96223653d4082c95ae46d868a3e2.png";
import verdalisProcess1 from "figma:asset/d073df347738521bc4d56837a781bb764ecbc679.png";
import verdalisProcess2 from "figma:asset/1c4fe90750bdbb28631bfc2d612bdf2ab8b60c9e.png";
import verdalisProcess3 from "figma:asset/4c0246b6068fb5d3cb87feae3aadaa01ae56b724.png";
import verdalisProcess4 from "figma:asset/f662bddae9e432e70c320d48288e046847a5df52.png";
import verdalisProcess5 from "figma:asset/315713cf2f5ed9cb713920db33c05bac5742055d.png";
import verdalisProcess6 from "figma:asset/545efd294f406cad67e2e52fe35e6366b897188f.png";
import verdalisProcess7 from "figma:asset/e5174d76a565d2484a712d88be11dd9b9da9e8e0.png";
import knrdProcess1 from "figma:asset/902644d8a2e87ce3eb9184424bbe834aae643a89.png";
import knrdProcess2 from "figma:asset/fba9cbc8e48e031ad06bc1de82a426d6e59198f7.png";
import knrdProcess3 from "figma:asset/419680b0cdacac6992a56f92371b0cfba20400d2.png";
import knrdProcess4 from "figma:asset/eed20b9e274d1d80d618882468de5ceae4b897ee.png";
import knrdProcess5 from "figma:asset/7eaaad374f3744ed3d69af97a3e51b1390344eb8.png";
import knrdProcess6 from "figma:asset/68dd10274d47e029006fc4ad7a92074b2d577716.png";
import knrdProcess7 from "figma:asset/194145bd74709b967d7bf1617b085667f49996d4.png";
import knrdProcess8 from "figma:asset/a5180c578a15cd6d2c82247a624911298a9d3215.png";
import knrdProcess9 from "figma:asset/0199356e5a044fc893a3bd98fa62b5fdae9a8ac4.png";
import knrdProcess10 from "figma:asset/c5e0a37edbbbe6789e76372387d65e623132f704.png";
import knrdProcess11 from "figma:asset/27fcab76d901c6e30b558c82c8f6828cab2da1e8.png";
import knrdProcess12 from "figma:asset/d26c1eb15a7b08137c027231e1d07fc9cf639d28.png";
import knrdProcess13 from "figma:asset/246fdb6ea5e3758151f14f419649fa82f1857e49.png";
import knrdProcess14 from "figma:asset/6942bacf79192bc6fee8f7b1116bd2078d163abc.png";
import knrdProcess15 from "figma:asset/c5bbec25f89c944962a688a47fef4d9849b363a9.png";
import knrdProcess16 from "figma:asset/139a9b50423824136508d37f937d53239a3af139.png";
import knrdProcess17 from "figma:asset/24cf9a07e933850635f00363eb9c0e5943ca3af7.png";
import knrdProcess18 from "figma:asset/7e418412265c6f51d324570f2ff881cba0534d84.png";
import knrdProcess19 from "figma:asset/699075d5a1afd386e76a658919baa5786de5ada7.png";
import knrdProcess20 from "figma:asset/4926dc65484f1786da4d515cf24df909ffe87c1f.png";
import knrdProcess21 from "figma:asset/87714a43a5e7a2feecc6f98b19f67528b8eed5a5.png";
import stopMotionCover from "figma:asset/0b9a33ed3a0b624d7b3534b7e36448d688bb6dee.png";
import stopMotionProcess1 from "figma:asset/fcbe25ba46f961e41d19533862c575ed40f2c750.png";
import stopMotionProcess2 from "figma:asset/f7f90b972a383861805aa66d378fbcb9438ef966.png";
import stopMotionProcess3 from "figma:asset/2659a45f67f4b72a00f5961b138284221defd556.png";
import warPigeonsCover from "figma:asset/e33a3985044231f6959494e31cf9febfa2a779c7.png";
import warPigeonsStoryboard from "figma:asset/94a0c8348589f464dd881a2669cf6d4c59d22d35.png";
import designerDialogueCover from "figma:asset/044b3064acc6aa0e62785aabfd21b85b8d54d3a9.png";
import designerDialoguePhoto1 from "figma:asset/11a769ef7a909a91de087e7e0fde0c9ec1bb2ec8.png";
import designerDialoguePhoto2 from "figma:asset/edf7bd2b36db1ade5ccea533bd71ef4648a2983f.png";
import designerDialoguePhoto3 from "figma:asset/8c189228e11ee42bcd5511431188170221769d6a.png";
import littleFeatsCover from "figma:asset/be8c25fa29fd3261f27bcb15e9c97b1c3ee973bc.png";
import littleFeatsProcess1 from "figma:asset/5d4b92f54d66d763f745c5682799b7bcc5357848.png";
import littleFeatsProcess2 from "figma:asset/af2914ea9e5a06541d569e9a9f5bdc2d8bd7d358.png";
import littleFeatsProcess3 from "figma:asset/64e64701d92f530190b88e67299c276a8760751d.png";
import littleFeatsProduction1 from "figma:asset/c2abf7106a70df0a219f87350999bcbe495cafeb.png";
import littleFeatsProduction2 from "figma:asset/e925d2438f2a0d637184820c4957a58c420f5579.png";
import littleFeatsProduction3 from "figma:asset/f104b5e88f34b8a1d4ca047b58008510c3bd2b21.png";
import littleFeatsFinalBoss1 from "figma:asset/01035fca1679571a58123c2a10d87bfd70d03f5f.png";
import littleFeatsFinalBoss2 from "figma:asset/23d2d471b50d543bcb11f21816f0f49231ccee22.png";
import littleFeatsFinalBoss3 from "figma:asset/0709583f6e140e5bb9886fed04e82707223d84bf.png";
import littleFeatsFinalBoss4 from "figma:asset/60d03f21491e2a46c8005a03ec07910d30545eb6.png";
import littleFeatsFinalBoss5 from "figma:asset/73a93b2e9a33e037d876fcab1a1bfe191100def0.png";
import littleFeatsFinalBoss6 from "figma:asset/17cf0715370c979a097149874ea81c6a1c11f716.png";
import berylProcess1 from "figma:asset/b16f0c074eafb8deec5bca04c6ebb0d30c66183c.png";
import berylProcess2 from "figma:asset/bb0577d0207d417e8fb712ff87e96ad76bbfaba2.png";
import berylProcess3 from "figma:asset/3d3b8f3f0b01e40c036c4f53a599f669dbd767fd.png";

interface Project {
  id: number;
  title: string;
  category: string;
  categories?: string[];
  image: string;
  description?: string;
  details?: string;
  skills?: string[];
  year?: string;
  award?: boolean | string;
  environmental?: boolean; // NEW: leaf indicator
  ai?: boolean; // NEW: AI badge indicator
  videoUrl?: string;
  caseStudy?: {
    overview: string;
    challenge: string;
    solution: string;
    result: string;
    images?: string[];
  };
  processImages?: string[];
  processVideos?: string[];
  productionImages?: string[];
  finalBossImages?: string[];
  instagramPosts?: string[];
  figmaEmbed?: string;
}

const projects: Project[] = [
  {
    id: 1,
    title: "Logo Design",
    category: "design",
    image: spokaneRiverKeeperHero,
    description: "Conceptual Redesign: Spokane River Keeper",
    details: "This design represents a clean, thriving river through the imagery of a salmon, symbolizing a healthy ecosystem. The 'S' shape reinforces its connection to Spokane, reflecting the local conservation efforts dedicated to protecting the river and its wildlife.",
    skills: ["Logo Design", "Branding", "Illustration", "Adobe Illustrator"],
    year: "2024",
    award: "2024 Cobalt Addy's Award",
    environmental: true, // NEW: has leaf
    caseStudy: {
      overview: "A conceptual redesign for Spokane River Keeper, a local non-profit dedicated to protecting the Spokane River and its ecosystem.",
      challenge: "The existing logo needed a fresh perspective that would better communicate the organization's mission of river conservation while maintaining a connection to the local community and the wildlife it protects.",
      solution: "I began by researching local wildlife and the visual language of regional logos, then sketched multiple concepts built around Spokane's connection to the river. The final direction uses a stylized salmon forming an 'S' to merge movement, water flow, and locality into one cohesive mark. Careful iteration refined the shapes, line weight, and balance to make it adaptable across print and digital use.",
      result: "This design won the 2024 Cobalt Addy's Award, recognizing its effectiveness in communicating the organization's mission through thoughtful, symbolic imagery that resonates with both the local community and the conservation cause.",
      images: [
        spokaneRiverKeeperHero,
      ]
    },
    processImages: [
      processImage1,
      processImage2,
      processImage3,
      processImage4,
      processImage5,
      processImage6,
      processImage7,
      processImage8,
      processImage9,
    ]
  },
  {
    id: 2,
    title: "Blender 3D Character",
    category: "multimedia",
    image: blender3DCharacter,
    description: "3D Character Creation: Original Design",
    details: "An original character brought to life in Blender, developed from initial sketch to final render. The project includes a short animated video showcasing the character interacting naturally within their environment.",
    skills: ["Blender", "3D Modeling", "Rigging", "Animation", "Lighting"],
    year: "2025",
    videoUrl: "https://www.youtube.com/embed/gj6LP5gKwP0",
    caseStudy: {
      overview: "An original character brought to life in Blender, developed from initial sketch to final render. The project includes a short animated video showcasing the character interacting naturally within their environment.",
      challenge: "Building a fully functional, retopologized, and rigged character that could be animated smoothly for storytelling in Blender.",
      solution: "I implemented a customized quadruped bone rig tailored to my character's proportions and movement style, allowing for expressive motion and seamless interaction within the scene.",
      result: "A stylized 3D character featured in a cozy, storybook-inspired environment with warm lighting and gentle atmosphere, capturing both personality and place.",
      images: [
        blender3DCharacter,
      ]
    },
    processImages: [
      berylProcess2,
      berylProcess1,
      berylProcess3,
    ]
  },
  {
    id: 3,
    title: "Verdalis",
    category: "illustration",
    image: verdalisCover,
    description: "Illustrated Storybook: Fantasy World of Sentient Plants",
    details: "An illustrated storybook set in the imaginative world of Verdalis, where sentient flowers and mushrooms learn about harmony, empathy, and growth. The book blends whimsical storytelling with nature-inspired design and character development.",
    skills: ["Worldbuilding", "Character Design", "Digital Illustration", "Storyboarding", "Visual Development", "Color Theory"],
    year: "2025",
    caseStudy: {
      overview: "Verdalis is an original illustrated storybook created to explore themes of understanding, coexistence, and emotional growth through a fantasy world inhabited by plant-based characters. The story aims to engage children with its visual charm while introducing deeper ideas about empathy and perspective.",
      challenge: "Designing a cohesive world and character system that feels magical yet meaningful. The project needed a visual and narrative balance—appealing to children while conveying emotional depth and environmental symbolism.",
      solution: "Developed the world of Verdalis from concept to illustrated spreads, beginning with environmental design, character exploration, and species development. Each scene was painted to emphasize mood, storytelling, and movement, supported by soft color palettes and organic forms. The illustrations reflect the duality of beauty and tension within the world's ecosystems, helping communicate moral lessons through visual storytelling.",
      result: "The project evolved into a rich, storybook-style visual world with strong narrative and emotional impact. The final illustrations highlight friendship, understanding, and balance between different plant species, positioning Verdalis as both a visual art piece and a foundation for future animation or interactive storytelling projects.",
      images: [
        verdalisCover,
      ]
    },
    processImages: [
      verdalisProcess1,
      verdalisProcess2,
      verdalisProcess3,
      verdalisProcess4,
      verdalisProcess5,
      verdalisProcess6,
      verdalisProcess7,
    ]
  },
  {
    id: 4,
    title: "EmpowerHOUR",
    category: "design",
    categories: ["design", "multimedia"],
    image: empowerHourCover,
    description: "Spokane AAF Event Series (formerly EmpowerHER)",
    details: "A recurring event series by Spokane AAF focused on inspiring and uplifting the local creative community. I developed the logo, social media graphics, and video content to establish a sleek, elegant visual identity while keeping the overall tone fun, inclusive, and engaging.",
    skills: ["Branding", "Event Design", "Social Media Graphics", "Video Editing", "Collaboration", "Notion", "Adobe Illustrator"],
    year: "2024 – 2025",
    caseStudy: {
      overview: "EmpowerHOUR is an ongoing Spokane AAF event series designed to highlight voices in design, marketing, and the arts. Each session brings together local professionals to share personal stories and insights that inspire growth and connection within the creative community. My role includes designing and updating event graphics and videos, assisting in panelist outreach, and supporting event setup and promotion.",
      challenge: "Panelists are sometimes confirmed close to event deadlines, leading to last-minute design updates and content changes. As the reliable, quick-turnaround designer on the team, I've become the go-to person for ensuring that high-quality visuals are ready on time despite evolving event details.",
      solution: "To streamline coordination, our team began using Notion as a central source of truth—tracking event dates, panelists, and design needs. Managed by our Programs Chair, this system allows us to stay aligned, update materials quickly, and maintain consistency across recurring events.",
      result: "EmpowerHOUR has become one of AAF Spokane's most successful and well-attended event series. The cohesive branding and timely visuals contribute to strong community engagement and positive attendee feedback, helping the series continue to grow and spotlight diverse voices within the creative industry.",
      images: [
        empowerHourCover,
      ]
    },
    instagramPosts: [
      "https://www.instagram.com/p/DKDeO9ou3jt/"
    ],
    processVideos: [
      "https://drive.google.com/file/d/1XUsugc4D-jLF8dkJxd3BM_h3IbZ2Tyb4/preview"
    ]
  },
  {
    id: 5,
    title: "KNRD",
    category: "illustration",
    categories: ["design", "multimedia", "illustration"],
    image: knrdCover,
    description: "Youth-Focused Campaign: Native Fish Awareness",
    details: "This **collaborative project** with Ashleigh Hughes and Brittany Wallace combined design, copy, and interactivity. I focused on illustrations, the coloring book, rack card design, and the video game component, with all three of us contributing to mockups. Ashleigh refined text and layouts, built the sign, prepped files, and assembled the final presentation deck. Brittany handled copywriting, designed the fold-out booklet, and supported production logistics. KNRD will be using these illustrations for older student audiences.",
    skills: ["Illustration", "Graphic Design", "Game Design", "Educational Materials", "Print Design", "Collaboration"],
    year: "2025",
    environmental: true, // NEW: has leaf
    caseStudy: {
      overview: "This project extended across multiple mediums to reach a young audience. Our team created educational print materials, apparel, and an interactive fishing game to help kids connect with native fish and conservation in a fun, memorable way.",
      challenge: "The coloring book introduced kids to local fish species through fun facts and approachable illustrations. It was designed to make learning feel personal and creative, encouraging kids to recognize and care about the native fish in their area.",
      solution: "I created an interactive fishing game as an extra element for the project, which the client loved. It was not part of the original brief but expanded the campaign's reach through play. The game lets players catch and identify the native fish found in local rivers, rewarding curiosity while reinforcing what they learn from the print materials.\n\nThe campaign illustrations were adapted into stickers, bumper stickers, and apparel to expand community reach. These items turned the fish artwork into wearable, shareable ambassadors for the Kalispel Natural Resources Department's native fish initiative.",
      result: "The Kalispel Natural Resources Department selected our project for its youth education programs. They praised the campaign's professional quality, playful illustrations, and expanded deliverables like apparel, stickers, and an interactive fishing game.\n\n\"Perfect fit for elementary school audiences — playful, fun, and educational.\"\n\n\"This was the best presentation. On par with presentations we've seen from our design agency partners — fantastic job!\"\n\n\"The illustrations were my favorite. Beautiful use of color and movement, adorable and professional.\"\n\n**— Kalispel Natural Resources Department Review Team**",
      images: [
        knrdCover,
      ]
    },
    processImages: [
      knrdProcess1,
      knrdProcess2,
      knrdProcess3,
      knrdProcess4,
      knrdProcess5,
      knrdProcess6,
      knrdProcess7,
      knrdProcess8,
      knrdProcess9,
      knrdProcess10,
      knrdProcess11,
      knrdProcess12,
      knrdProcess13,
      knrdProcess14,
      knrdProcess15,
      knrdProcess16,
      knrdProcess17,
      knrdProcess18,
      knrdProcess19,
      knrdProcess20,
      knrdProcess21,
    ]
  },
  {
    id: 6,
    title: "Stop Motion Animation",
    category: "illustration",
    categories: ["illustration", "multimedia"],
    image: stopMotionCover,
    description: "Paper Cutout Film: A Handcrafted Animation",
    details: "A short stop motion film created using paper cutouts, Dragonframe, Procreate, and After Effects. This project explored the full animation pipeline from concept development to post-production, blending traditional methods with digital enhancement.",
    skills: ["Stop Motion", "Storyboarding", "Dragonframe", "Procreate", "Adobe After Effects", "Lighting & Composition", "Sound Design"],
    year: "2024",
    videoUrl: "https://www.youtube.com/embed/S78sK0fBjLc",
    caseStudy: {
      overview: "This project involved creating an original stop motion short using paper cutouts and digital compositing. I developed the idea from scratch, planned every scene using a dope sheet and thumbnails, illustrated all assets in Procreate, assembled the physical pieces, and animated the captured frames in After Effects.",
      challenge: "Managing a physical and digital hybrid workflow required careful pre-planning. Lighting reflections on glossy paper and the precision of piece placement presented unique challenges that impacted the final visuals.",
      solution: "I dedicated extensive time to pre-production—organizing scenes, designing characters and props, and building a consistent visual rhythm before shooting. During production, I refined my lighting setup and used After Effects to enhance key details like glow effects and subtle motion corrections.",
      result: "The project came together over two weeks of planning and two days of shooting and editing. It became an invaluable learning experience in timing, lighting, sound design, and the tactile nature of frame-by-frame animation. The final video successfully captured a whimsical, handcrafted aesthetic and solidified my love for combining analog and digital techniques.",
      images: [
        stopMotionCover,
      ]
    },
    processImages: [
      stopMotionProcess1,
      stopMotionProcess2,
      stopMotionProcess3,
    ]
  },
  {
    id: 7,
    title: "War Pigeons",
    category: "multimedia",
    categories: ["illustration", "multimedia"],
    image: warPigeonsCover,
    description: "2D Animated Infographic",
    details: "A 2D animated infographic exploring how pigeons were used during WWII to deliver critical messages and aid soldiers on the front lines. Created to educate and inspire appreciation for these often-overlooked heroes of history.",
    skills: ["2D Animation", "Storyboarding", "Research", "Motion Graphics", "Adobe After Effects", "Sound Design"],
    year: "2025",
    videoUrl: "https://www.youtube.com/embed/VEm3yNS6UD4",
    caseStudy: {
      overview: "War Pigeons is an educational short animation combining storytelling, design, and motion graphics. Inspired by my lifelong love for animals, the piece was created to highlight the courage and intelligence of pigeons and their essential role during wartime. The project began with extensive research, script planning, and storyboarding before developing the animation in After Effects.",
      challenge: "The biggest challenge was balancing accurate historical information with engaging visuals. I needed to manage timing, pacing, and color planning to keep the content digestible while still informative and emotionally resonant.",
      solution: "Using After Effects, I designed a cohesive motion style with expressive illustrations and a muted color palette to reflect the WWII era. Careful frame and time count planning during the storyboarding phase ensured the pacing felt natural. I also built in playful character moments to give the pigeons personality and heart, turning facts into a narrative viewers could connect with.",
      result: "The final animation blends educational storytelling with heartfelt advocacy, showing how these birds served bravely alongside humans. The project resonated with viewers for its blend of warmth, humor, and respect for its subject — helping shed light on how extraordinary pigeons truly are.",
      images: [
        warPigeonsCover,
      ]
    },
    processImages: [
      warPigeonsStoryboard,
    ],
    processVideos: [
      "https://www.youtube.com/embed/mY1i-R9Feo0",
    ]
  },
  {
    id: 8,
    title: "Designer Dialogue",
    category: "design",
    image: designerDialogueCover,
    description: "Podcast-Inspired Editorial Design",
    details: "A design exploration inspired by weekly podcast discussions on design, creativity, and process. Each week, I created a new booklet spread that visually captured the main message or theme from that episode through layout, color, and imagery.",
    skills: ["Editorial Design", "Typography", "Layout Design", "Conceptual Thinking", "Adobe InDesign", "Figma"],
    year: "2025",
    award: "2025 Cobalt Addy's Award",
    caseStudy: {
      overview: "Designer Dialogue was a multi-week design challenge combining research, experimentation, and conceptual storytelling. Each spread was based on a podcast episode focused on design theory and creative growth. The project pushed me to translate abstract ideas into visual form while staying consistent across a cohesive booklet format.",
      challenge: "Every week came with unique design constraints — from color limitations to specific typographic or layout challenges. Balancing these creative restrictions with the episode's tone required both flexibility and restraint. Early concepts were scrapped as I refined the overall visual identity to better match the intended mood.",
      solution: "I approached each spread as a self-contained story, using composition, hierarchy, and visual metaphors to represent the podcast's message. Through research, iteration, and critique, I developed a clean, structured design style that unified the collection while letting each spread retain its own character.",
      result: "The completed booklet became an interactive visual experience presented as a Figma flipbook. The project won a 2025 ADDY's Cobalt Award for its strong conceptual design and polished execution, recognized for its thoughtful integration of message and medium.",
      images: [
        designerDialogueCover,
      ]
    },
    processImages: [
      designerDialoguePhoto1,
      designerDialoguePhoto2,
      designerDialoguePhoto3,
    ],
    figmaEmbed: "https://embed.figma.com/proto/r0b9YnLhzR459EDyQx54ZG/Paper-Magazine--Mockup-with-Page-Animation--Community-?kind=proto&node-id=8001-777&starting-point-node-id=8001%3A777&embed-host=share"
  },
  {
    id: 9,
    title: "Little Feats",
    category: "design",
    categories: ["multimedia", "design"],
    image: littleFeatsCover,
    description: "A five-week solo project combining AI-assisted illustration, game design, and physical production to create a fully playable tabletop RPG.",
    details: "A cooperative, replayable board game for 2–4 players centered on small heroes and big adventures. The project blended AI-generated visuals with traditional design and 3D modeling to build a cohesive tabletop experience.",
    skills: ["Game Design", "3D Modeling", "AI-Assisted Design", "Research & Iteration", "Adobe Illustrator", "Blender", "Leonardo.Ai", "ChatGPT", "Tripo.Ai"],
    year: "2025",
    ai: true, // AI badge
    caseStudy: {
      overview: "Little Feats is a cooperative, replayable board game for 2–4 players centered on small heroes and big adventures. The project blended AI-generated visuals with traditional design and 3D modeling to build a cohesive tabletop experience. Every aspect — from stat balancing to tile layout — was developed from scratch using a combination of research, sketching, digital exploration, and physical prototyping.",
      challenge: "Balancing creativity, mechanics, and physical production within a tight five-week timeline. Each phase required shifting mindsets — from systems design to visual art to 3D fabrication — while ensuring everything connected into one polished, playable experience. Early iterations felt too busy or unbalanced, so refining the look and gameplay became a major focus.",
      solution: "I started with deep research into over 25 tabletop games to study mechanics, pacing, and balance structures. Using paper prototypes, I tested stat systems and player interactions before digitizing. AI tools like Leonardo.Ai, ChatGPT, and Tripo.AI helped develop concept art, 3D characters, and assets, which I refined in Blender for 3D printing and painting. The visuals evolved through iteration — aiming for a cohesive, painterly fantasy aesthetic that tied gameplay and story together.",
      result: "The final product was a professional-quality tabletop game featuring modular map tiles, collectible cards, and hand-painted 3D characters. The project demonstrated how AI and human creativity can merge to produce something tactile and emotionally engaging. Little Feats became a standout example of design thinking, iteration, and worldbuilding — earning praise for its originality and cohesive presentation.",
      images: [
        littleFeatsCover,
      ]
    },
    processImages: [
      littleFeatsProcess1,
      littleFeatsProcess2,
      littleFeatsProcess3,
    ],
    productionImages: [
      littleFeatsProduction1,
      littleFeatsProduction2,
      littleFeatsProduction3,
    ],
    finalBossImages: [
      littleFeatsFinalBoss1,
      littleFeatsFinalBoss2,
      littleFeatsFinalBoss3,
      littleFeatsFinalBoss4,
      littleFeatsFinalBoss5,
      littleFeatsFinalBoss6,
    ]
  },
];

interface PortfolioGridProps {
  category: string;
}

export function PortfolioGrid({ category }: PortfolioGridProps) {
  const [hoveredId, setHoveredId] = useState<number | null>(null);
  const [clickedId, setClickedId] = useState<number | null>(null);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  
  const filteredProjects = category === "all" 
    ? projects 
    : projects.filter(p => p.category === category || (p.categories && p.categories.includes(category)));

  // Helper function to get color for a category
  const getCategoryColor = (cat: string) => {
    if (cat === "multimedia") return "#6867ae";
    if (cat === "illustration") return "#20B2AA";
    return "#FF1493"; // design
  };

  // Helper function to get color class for a category
  const getCategoryColorClass = (cat: string) => {
    if (cat === "multimedia") return "text-[#6867ae]";
    if (cat === "illustration") return "text-secondary";
    return "text-primary"; // design
  };

  // Get a random color from project's categories
  const getProjectColor = (project: Project) => {
    if (project.categories && project.categories.length > 0) {
      const randomCat = project.categories[project.id % project.categories.length];
      return getCategoryColor(randomCat);
    }
    return getCategoryColor(project.category);
  };

  // Get a random color class from project's categories
  const getProjectColorClass = (project: Project) => {
    if (project.categories && project.categories.length > 0) {
      const randomCat = project.categories[project.id % project.categories.length];
      return getCategoryColorClass(randomCat);
    }
    return getCategoryColorClass(project.category);
  };

  return (
    <>
      <div className="min-h-[60vh] py-12">
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 xl:gap-10"
          layout
        >
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              onHoverStart={() => setHoveredId(project.id)}
              onHoverEnd={() => setHoveredId(null)}
              onClick={() => {
                setClickedId(project.id);
                setTimeout(() => setClickedId(null), 300);
                setSelectedProject(project);
              }}
              className="group cursor-pointer relative"
            >
              <motion.div 
                className="relative aspect-[4/3] overflow-hidden rounded-xl bg-muted"
                whileHover={{ y: -8 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                {/* Hand-drawn border effect on hover - color based on category */}
                <svg
                  className="absolute inset-0 w-full h-full pointer-events-none z-10"
                  viewBox="0 0 300 225"
                  style={{ opacity: (hoveredId === project.id || clickedId === project.id) ? 1 : 0, transition: "opacity 0.3s" }}
                >
                  <motion.rect
                    x="5"
                    y="5"
                    width="290"
                    height="215"
                    rx="12"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="4"
                    className={getProjectColorClass(project)}
                    style={{ filter: "url(#sketch)" }}
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: (hoveredId === project.id || clickedId === project.id) ? 1 : 0 }}
                    transition={{ duration: 0.6, ease: "easeInOut" }}
                  />
                </svg>

                {/* Award star and leaf in top-left corner */}
                {(project.award || project.environmental || project.ai) && (
                  <div className="absolute top-3 left-3 z-20 flex items-center gap-2">
                    {project.award && (
                      <AwardStar 
                        size="small" 
                        awardText={typeof project.award === "string" ? project.award : undefined}
                      />
                    )}
                    {project.environmental && (
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <motion.div
                              initial={{ opacity: 0, scale: 0.8 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ delay: 0.2 }}
                              className="w-8 h-8 flex items-center justify-center"
                            >
                              <img 
                                src={leafIcon}
                                alt="Environmental project" 
                                className="w-full h-full object-contain drop-shadow-md cursor-help"
                              />
                            </motion.div>
                          </TooltipTrigger>
                          <TooltipContent
                            style={{
                              backgroundColor: "#60d986",
                              color: "#ffffff",
                              border: "none",
                            }}
                          >
                            <p>Environmental project</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    )}
                    {project.ai && (
                      <AIBadge 
                        size="small"
                      />
                    )}
                  </div>
                )}

                {/* Category tag badges in top-right corner */}
                {project.categories ? (
                  <div className="absolute top-3 right-3 z-20 flex flex-col gap-1 items-end">
                    {project.categories.map((cat, idx) => (
                      <motion.div
                        key={cat}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: idx * 0.1 }}
                        className="px-3 py-1 rounded-full backdrop-blur-sm text-xs uppercase tracking-wide"
                        style={{
                          backgroundColor: cat === "multimedia" 
                            ? "rgba(104, 103, 174, 0.9)" 
                            : cat === "illustration" 
                            ? "rgba(32, 178, 170, 0.9)" 
                            : "rgba(255, 20, 147, 0.9)",
                          color: "#ffffff"
                        }}
                      >
                        {cat}
                      </motion.div>
                    ))}
                  </div>
                ) : (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="absolute top-3 right-3 z-20 px-3 py-1 rounded-full backdrop-blur-sm text-xs uppercase tracking-wide"
                    style={{
                      backgroundColor: project.category === "multimedia" 
                        ? "rgba(104, 103, 174, 0.9)" 
                        : project.category === "illustration" 
                        ? "rgba(32, 178, 170, 0.9)" 
                        : "rgba(255, 20, 147, 0.9)",
                      color: "#ffffff"
                    }}
                  >
                    {project.category}
                  </motion.div>
                )}

                <motion.img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover rounded-xl"
                  style={
                    project.id === 2 
                      ? { objectPosition: 'left center' } 
                      : project.id === 3 
                      ? { objectPosition: '80% center' } 
                      : project.id === 5
                      ? { objectPosition: 'center 0%' }
                      : undefined
                  }
                  whileHover={{ scale: 1.08 }}
                  transition={{ duration: 0.4 }}
                />
                
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  whileHover={{ opacity: 1 }}
                  className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent flex flex-col justify-end p-6 md:opacity-0"
                >
                  <div className="text-white">
                    <h3 className="text-xl mb-1 relative inline-block">
                      {project.title}
                      {/* Sharpie underline - color based on category */}
                      <svg className="absolute -bottom-1 left-0 w-full h-2" viewBox="0 0 100 5">
                        <path
                          d="M 0 2.5 Q 25 1.5, 50 2.5 T 100 2.5"
                          stroke="currentColor"
                          strokeWidth="2"
                          fill="none"
                          className={getProjectColorClass(project)}
                          style={{ filter: "url(#roughen)" }}
                        />
                      </svg>
                    </h3>
                    {project.description && (
                      <p className="text-sm text-white/90 mt-2">{project.description}</p>
                    )}
                  </div>
                </motion.div>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>

        {filteredProjects.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <p className="text-xl text-muted-foreground">
              No projects found in this category yet.
            </p>
          </motion.div>
        )}
      </div>

      {/* Project Modal */}
      <ProjectModal 
        project={selectedProject} 
        onClose={() => setSelectedProject(null)} 
      />
    </>
  );
}