import { motion } from "motion/react";
import bioswaleSign from "figma:asset/5bdd8c18b7aea234cfa8e069bb3f9edeb39d1f21.png";
import groupPhoto from "figma:asset/bb75923f15dba8747339f762802e9345bcc3d283.png";
import eventPhotos from "figma:asset/5d50fc7db85c3b55a250dc557ea29eff060722cd.png";
import helveticaScholarship from "figma:asset/2ac8b765b51a542f7890dd99373a90415c3236b7.png";
import sfccPennant from "figma:asset/73c6cb38f865e645b0cff657ac02529a16c573e8.png";
import ewuLogo from "figma:asset/0e2bded56bccfd5f7ce80f54026845ace54ec96b.png";
import scholarshipPhoto from "figma:asset/09b780a228cb68dfaebb5169da67863e95f58233.png";
import scholarshipWinner from "figma:asset/287a4e24d5237449a0d865188608605bca09b1bb.png";
import phiThetaKappa from "figma:asset/0d779312341701717fd07538363277b09e726ac5.png";
import tmrWinners from "figma:asset/d9cb89a32df28f96b95d4efae540be8d01d3a81f.png";
import cobaltAward from "figma:asset/6aeebd5a3f2fa651dc69cd78cca29c0f369b8a14.png";

export function AutoScrollGallery() {
  
  // Images that will scroll through the gallery - randomized order
  const galleryImages = [
    { src: scholarshipWinner, alt: "2023 Scholarship Winner" },
    { src: eventPhotos, alt: "Event Photos" },
    { src: phiThetaKappa, alt: "Phi Theta Kappa Honor Society" },
    { src: bioswaleSign, alt: "SFCC Bioswale Sign Project" },
    { src: tmrWinners, alt: "TMR Scholarship Winners" },
    { src: sfccPennant, alt: "SFCC Pennant" },
    { src: scholarshipPhoto, alt: "Scholarship Winner Photo" },
    { src: groupPhoto, alt: "Group Photo" },
    { src: cobaltAward, alt: "Cobalt Award Winner" },
    { src: helveticaScholarship, alt: "Helvetica Scholarship Winner" },
    { src: ewuLogo, alt: "EWU Logo" },
  ];

  // Duplicate images multiple times for seamless infinite loop
  const duplicatedImages = [...galleryImages, ...galleryImages, ...galleryImages, ...galleryImages];

  return (
    <div className="w-full py-12 overflow-hidden">
      <div className="w-full">
        {/* Scrolling Container - wider by 200px on each side */}
        <div className="relative -mx-[200px]">
          {/* Auto-scrolling images - postcard style */}
          <div className="overflow-hidden py-4">
            <motion.div
              className="flex gap-8 items-center"
              animate={{
                x: [0, -(100 / 4) + "%"],
              }}
              transition={{
                x: {
                  repeat: Infinity,
                  repeatType: "loop",
                  duration: 18,
                  ease: "linear",
                },
              }}
            >
              {duplicatedImages.map((image, index) => (
                <div
                  key={index}
                  className="flex-shrink-0 relative"
                  style={{ maxWidth: "350px" }}
                >
                  {/* Image as postcard */}
                  <img 
                    src={image.src} 
                    alt={image.alt}
                    className="w-full h-auto"
                    style={{
                      maxHeight: "280px",
                      objectFit: "contain"
                    }}
                  />
                </div>
              ))}
            </motion.div>
          </div>

          {/* Decorative elements */}
          <motion.div
            className="absolute -top-2 left-8 text-quaternary"
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            <svg width="40" height="40" viewBox="0 0 40 40" fill="currentColor">
              <path d="M20 5 L22 18 L35 20 L22 22 L20 35 L18 22 L5 20 L18 18 Z" />
            </svg>
          </motion.div>
          
          <motion.div
            className="absolute -bottom-2 right-8 text-primary"
            animate={{ rotate: [0, -10, 10, 0] }}
            transition={{ duration: 3, repeat: Infinity, delay: 1 }}
          >
            <svg width="40" height="40" viewBox="0 0 40 40" fill="currentColor">
              <path d="M20 5 L22 18 L35 20 L22 22 L20 35 L18 22 L5 20 L18 18 Z" />
            </svg>
          </motion.div>
        </div>
      </div>
    </div>
  );
}