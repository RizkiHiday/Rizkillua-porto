import { useRef, useState, useEffect } from "react";
import ProfileCard from "./components/ProfileCard/ProfileCard";
import ShinyText from "./components/ShinyText/ShinyText";
import BlurText from "./components/BlurText/BlurText";
import ScrambledText from "./components/ScrambledText/ScrambledText";
import SplitText from "./components/SplitText/SplitText";
import GlassIcons from "./components/GlassIcons/GlassIcons";
import { listTools } from "./data";
import Aurora from "./components/Aurora/Aurora";
import DecayCard from "./components/DecayCard/DecayCard";
import Masonry from "./components/Masonry/Masonry";
import VideoGrid from "./components/VideoGrid/VideoGrid";
import AOS from 'aos';

const BASE = (import.meta.env.BASE_URL || '/portofolio/').replace(/\/?$/, '');
const decayCardImage = BASE + '/assets/' + encodeURIComponent('lanyard rizki.png');

const photographyImages = [
  'DSC06873.jpg',
  'DSC06895.jpg',
  'DSC03264.jpg',
  'DSC06750.jpg',
  'DSC05614.JPG',
  'DSC03328.jpg',
  'DSC06848.jpg',
  'DSC05527.jpg',
  'DSC06701.jpg',
  'DSC04688-2.jpg',
  'DSC06709.jpg',
  'DSC03335.jpg',
  'DSC04689-2.jpg',
  'DSC05575.jpg',
  'DSC04687-2.jpg'
].map(name => ({ src: BASE + '/assets/Photography/' + name, alt: name.replace(/\.[^.]+$/, '') }));

const posterImages = [
  'Satrunz.png',
  'Kasendratuwondo.png',
  'fallin_ my feellin_.png',
  'POSTER UTAMMA.png',
  'POSTER MDS fix banget asli ini mah.png'
].map(name => ({ src: BASE + '/assets/Poster/' + encodeURIComponent(name), alt: name.replace(/\.[^.]+$/, '') }));

const galleryImages = [...photographyImages, ...posterImages];

const masonryItems = galleryImages.map((img, index) => ({
  id: String(index + 1),
  img: img.src,
  url: img.src,
  height: 260 + (index % 3) * 100, // variasi tinggi supaya grid hidup
}));

const videoData = [
  {
    image: BASE + '/assets/video-thumbnails/ngonten-thumb.jpg',
    title: 'Ngonten Itu Ngobrol, Bukan Pidato',
    subtitle: 'Content Creation Tips',
    borderColor: '#3B82F6',
    gradient: 'linear-gradient(145deg, #3B82F6, #000)',
    videoUrl: BASE + '/video/compressed/ngonten.mp4',
    isLocal: true
  },
  {
    image: BASE + '/assets/video-thumbnails/tur-virtual-thumb.jpg',
    title: 'Tur Virtual yang Menakjubkan',
    subtitle: 'Virtual Tour Experience',
    borderColor: '#10B981',
    gradient: 'linear-gradient(180deg, #10B981, #000)',
    videoUrl: BASE + '/video/compressed/tur-virtual.mp4',
    isLocal: true
  },
  {
    image: BASE + '/assets/video-thumbnails/drone-pilot-thumb.jpg',
    title: 'Drone Pilot Full-Time Career',
    subtitle: 'Aerial Videography',
    borderColor: '#F59E0B',
    gradient: 'linear-gradient(165deg, #F59E0B, #000)',
    videoUrl: BASE + '/video/compressed/drone-pilot.mp4',
    isLocal: true
  },
  {
    image: BASE + '/video/cover/cover1.png',
    title: 'After Movie MDS 2024',
    subtitle: 'Event Documentation',
    borderColor: '#EC4899',
    gradient: 'linear-gradient(225deg, #EC4899, #000)',
    videoUrl: 'https://drive.google.com/file/d/1meFJX04GQ6SRY9vCt75v9KWgn_EeMR4c/preview',
    isLocal: false
  },
  {
    image: BASE + '/video/cover/' + encodeURIComponent('cover 2.png'),
    title: 'After Movie MDS 2025',
    subtitle: 'Event Documentation',
    borderColor: '#8B5CF6',
    gradient: 'linear-gradient(135deg, #8B5CF6, #000)',
    videoUrl: 'https://drive.google.com/file/d/1T4O4YFjvB4RNPhNjyEcfY6MEMG2J55OD/view?usp=drive_link',
    isLocal: false
  },
  {
    image: BASE + '/video/cover/' + encodeURIComponent('cover 3.png'),
    title: 'Pelatihan Drone Borobudur',
    subtitle: 'Drone Training - Public Communications',
    borderColor: '#06B6D4',
    gradient: 'linear-gradient(180deg, #06B6D4, #000)',
    videoUrl: 'https://drive.google.com/file/d/1jjXDdTJPgKylaT_7iLmnMyLnWPJj7Y7o/preview',
    isLocal: false
  },
  {
    image: BASE + '/video/cover/' + encodeURIComponent('cover 4.png'),
    title: 'Short Movie',
    subtitle: 'Cinematic Short Film',
    borderColor: '#F97316',
    gradient: 'linear-gradient(195deg, #F97316, #000)',
    videoUrl: 'https://drive.google.com/file/d/1vDYbFoLAecKBgPEBH0sJlwVDC4U-IUwn/preview',
    isLocal: false
  },
  {
    image: BASE + '/video/cover/cover5.png',
    title: 'Teaser MDS 2024',
    subtitle: 'Event Teaser Video',
    borderColor: '#64748B',
    gradient: 'linear-gradient(145deg, #64748B, #000)',
    videoUrl: 'https://drive.google.com/file/d/17zX6MvYOFZKhzA5GizY_yYrxK6pmJeWq/preview',
    isLocal: false
  },
  {
        image: BASE + '/video/cover/cover6.png',
    title: 'Teaser MDS 2025',
    subtitle: 'Event Teaser Video',
    borderColor: '#EF4444',
    gradient: 'linear-gradient(165deg, #EF4444, #000)',
    videoUrl: 'https://drive.google.com/file/d/1u8hdjtL_QNnqDUJHjMteLzM-nArYHp93/preview',
    isLocal: false
  }
];

import 'aos/dist/aos.css'; // You can also use <link> for styles
// ..
AOS.init();

function App() {
  const aboutRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  // -------------------------

  useEffect(() => {
    const isReload =
      performance.getEntriesByType("navigation")[0]?.type === "reload";

    if (isReload) {
      // Ambil path tanpa hash
      const baseUrl = window.location.origin + "/portofolio/";
      window.location.replace(baseUrl);
    }
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    if (aboutRef.current) {
      observer.observe(aboutRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <>
      <div className="absolute top-0 left-0 w-full h-full -z-10 ">
        <Aurora
          colorStops={["#577870", "#1F97A6", "#127B99"]}
          blend={0.5}
          amplitude={1.0}
          speed={0.5}
        />
      </div>
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="hero grid md:grid-cols-2 items-center pt-10 xl:gap-0 gap-6 grid-cols-1">
          <div className="animate__animated animate__fadeInUp animate__delay-3s">
            <div className="flex items-center gap-3 mb-6 bg bg-zinc-800 w-fit p-4 rounded-2xl">
              <img src="./assets/rizki.png" className="w-10 rounded-md" />
              <q>stay hungry stay foolish</q>
            </div>
            <h1 className="text-5xl font-bold mb-6">
              <ShinyText text="Hi I'm Rizki Hidayat" disabled={false} speed={3} className='custom-class' />
            </h1>
            <BlurText
              text="A passionate video editor and creative content creator dedicated to crafting professional, high-quality visual experiences through innovative and engaging solutions."
              delay={150}
              animateBy="words"
              direction="top"
              className=" mb-6"
            />
            <div className="flex items-center sm:gap-4 gap-2">
              <a
                href={BASE + '/assets/' + encodeURIComponent('CV TERBARU.pdf')}
                download="Rizki_Hidayat_CV.pdf"
                className="font-semibold bg-[#1a1a1a] p-4 px-6 rounded-full border border-gray-700 hover:bg-[#222] transition-colors"
              >
                <ShinyText text="Download CV" disabled={false} speed={3} className="custom-class" />
              </a>

              <a href="#contact" className="font-semibold bg-[#1a1a1a] p-4 px-6 rounded-full border border-gray-700 hover:bg-[#222] transition-colors">
                <ShinyText text="Contact Me" disabled={false} speed={3} className="custom-class" />
              </a>
            </div>

          </div>
          <div className="md:ml-auto animate__animated animate__fadeInUp animate__delay-4s">
            <ProfileCard
              name="Rizki Hidayat"
              title="Video Editor"
              handle="ulatngesot"
              status="Online"
              contactText="Contact Me"
              avatarUrl="./assets/rizki.png"
              showUserInfo={true}
              enableTilt={true}
              enableMobileTilt={false}
              onContactClick={() => console.log('Contact clicked')}
            />
          </div>
        </div>
        {/* tentang */}
        <div className="mt-15 mx-auto w-full max-w-[1600px] rounded-3xl border-[5px] border-violet-500/40 shadow-[0_0_30px_rgba(168,85,247,0.4)] bg-gradient-to-br from-[#0a0a0a] via-[#111111] to-[#1a1a1a] p-6" id="about">
          <div className="flex flex-col md:flex-row items-center justify-between gap-10 pt-0 px-8" data-aos="fade-up" data-aos-duration="1000" data-aos-once="true">
            <div className="basis-full md:basis-7/12 pr-0 md:pr-8 border-b md:border-b-0 md:border-r border-violet-500/30">
              {/* Kolom kiri */}
              <div className="flex-1 text-left">
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-5">
                  About Me
                </h2>

                <BlurText
                  text="I’m Rizki Hidayat, a professional video editor passionate about building high-quality visual content with an intuitive and cinematic experience. I enjoy working with the latest editing software and techniques, blending creativity with precision to deliver impactful visual stories. With over three years of experience and more than 20 completed projects, I’m committed to helping clients and brands grow in the digital era through functional, aesthetic, and high-quality video products."
                  delay={150}
                  animateBy="words"
                  direction="top"
                  className="text-base md:text-lg leading-relaxed mb-10 text-gray-300"
                />

                <div className="flex flex-col sm:flex-row items-center sm:justify-between text-center sm:text-left gap-y-8 sm:gap-y-0 mb-4 w-full">
                  <div>
                    <h1 className="text-3xl md:text-4xl mb-1">
                      20<span className="text-violet-500">+</span>
                    </h1>
                    <p>Project Finished</p>
                  </div>
                  <div>
                    <h1 className="text-3xl md:text-4xl mb-1">
                      1<span className="text-violet-500">+</span>
                    </h1>
                    <p>Years of Experience</p>
                  </div>
                </div>


                <ShinyText
                  text="Working with heart, creating with mind."
                  disabled={false}
                  speed={3}
                  className="text-sm md:text-base text-violet-400"
                />
              </div>
            </div>

            {/* Kolom kanan - Decay Card */}
            <div className="basis-full md:basis-5/12 pl-0 md:pl-8 flex justify-center items-center overflow-visible">
              <DecayCard
                width={300}
                height={450}
                image={decayCardImage}
              >
                <h2 className="text-white">Rizki<br />Video Editor</h2>
              </DecayCard>
            </div>
          </div>

        </div>
        <div className="tools mt-32">
          <h1 className="text-4xl/snug font-bold mb-4" data-aos="fade-up" data-aos-duration="1000" data-aos-once="true" >Tools & Technologies</h1>
          <p className="w-2/5 text-base/loose opacity-50" data-aos="fade-up" data-aos-duration="1000" data-aos-delay="300" data-aos-once="true">My Profesional Skills</p>
          <div className="tools-box mt-14 grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4">

            {listTools.map((tool) => (
              <div
                key={tool.id} data-aos="fade-up" data-aos-duration="1000" data-aos-delay={tool.dad} data-aos-once="true"
                className="flex items-center gap-4 p-4 border border-zinc-700 rounded-xl bg-zinc-900/60 backdrop-blur-md hover:bg-zinc-800/80 transition-all duration-300 group shadow-lg"
              >
                <img
                  src={tool.gambar}
                  alt="Tools Image"
                  className="w-16 h-16 object-contain bg-zinc-800 p-2 rounded-lg group-hover:bg-zinc-900 transition-all duration-300"
                />
                <div className="flex flex-col overflow-hidden">
                  <div className="truncate">
                    <ShinyText
                      text={tool.nama}
                      disabled={false}
                      speed={3}
                      className="text-lg font-semibold block"
                    />
                  </div>
                  <p className="text-sm text-zinc-400 truncate">{tool.ket}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* tentang */}

        {/* Photography & Design */}
        <div
          className="photography-design mt-32 pt-12 pb-16"
          id="gallery"
          style={{
            borderTop: '1px solid rgba(255,255,255,0.12)',
            borderBottom: '1px solid rgba(255,255,255,0.12)',
            marginBottom: '1px',
          }}
        >
          <h1
            className="text-center text-4xl font-bold mb-2"
            data-aos="fade-up"
            data-aos-duration="1000"
            data-aos-once="true"
          >
            Photography & Design
          </h1>
          <p
            className="text-base/loose text-center opacity-50 mb-10"
            data-aos="fade-up"
            data-aos-duration="1000"
            data-aos-delay="300"
            data-aos-once="true"
          >
            Capturing moments and creating visual stories through my lens and design work
          </p>
          <div
            style={{
              width: '100vw',
              minHeight: '400px',
              marginLeft: 'calc(-50vw + 50%)',
              marginRight: 'calc(-50vw + 50%)',
              position: 'relative',
              isolation: 'isolate',
            }}
            data-aos="fade-up"
            data-aos-duration="1000"
            data-aos-delay="400"
            data-aos-once="true"
          >
            <Masonry
              items={masonryItems}
              ease="power3.out"
              duration={0.6}
              stagger={0.05}
              animateFrom="bottom"
              scaleOnHover
              hoverScale={0.95}
              blurToFocus
              colorShiftOnHover={false}
              openInModal
            />
          </div>
          <div
            className="section-divider"
            style={{
              height: '1px',
              marginTop: '32px',
              marginBottom: '8px',
              background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.15), transparent)',
              pointerEvents: 'none',
            }}
            aria-hidden="true"
          />
          <div
            style={{
              height: '24px',
              background: 'linear-gradient(to bottom, rgba(0,0,0,0.2), transparent)',
              pointerEvents: 'none',
            }}
            aria-hidden="true"
          />
        </div>
        {/* Photography & Design */}

        {/* Video Edit & Content */}
        <div className="video-content mt-32 py-10 w-full" id="videos" style={{ position: 'relative', zIndex: 1 }}>
          <h1 className="text-center text-4xl font-bold mb-2" data-aos="fade-up" data-aos-duration="1000" data-aos-once="true">
            Video Edit & Content
          </h1>
          <p className="text-base/loose text-center opacity-50 mb-10" data-aos="fade-up" data-aos-duration="1000" data-aos-delay="300" data-aos-once="true">
            Bringing stories to life through creative video editing and engaging content
          </p>
          <div className="w-full" data-aos="fade-up" data-aos-duration="1000" data-aos-delay="400" data-aos-once="true">
            <VideoGrid videos={videoData} radius={500} damping={0.45} fadeOut={0.6} ease="power3.out" />
          </div>
        </div>
        {/* Video Edit & Content */}


        {/* Kontak */}
        <div className="kontak mt-32 sm:p-10 p-0" id="contact">
          <h1
            className="text-4xl mb-2 font-bold text-center"
            data-aos="fade-up"
            data-aos-duration="1000"
            data-aos-once="true"
          >
            Contact & Chat
          </h1>
          <p
            className="text-base/loose text-center mb-10 opacity-50"
            data-aos="fade-up"
            data-aos-duration="1000"
            data-aos-delay="300"
            data-aos-once="true"
          >
            Get in touch with me or chat in real-time
          </p>

          {/* Container dua kolom */}
          <div className="flex flex-col md:flex-row gap-8">


            {/* Contact Form di kanan */}
            <div className="flex-1">
              <form
                action="https://formsubmit.co/rizkihidayat110011@gmail.com"
                method="POST"
                className="bg-zinc-800 p-10 w-full rounded-md"
                autoComplete="off"
                data-aos="fade-up"
                data-aos-duration="1000"
                data-aos-delay="500"
                data-aos-once="true"
              >
                <div className="flex flex-col gap-6">
                  <div className="flex flex-col gap-2">
                    <label className="font-semibold">Full Name</label>
                    <input
                      type="text"
                      name="Name"
                      placeholder="Input Name..."
                      className="border border-zinc-500 p-2 rounded-md"
                      required
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="font-semibold">Email</label>
                    <input
                      type="email"
                      name="Email"
                      placeholder="Input Email..."
                      className="border border-zinc-500 p-2 rounded-md"
                      required
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label htmlFor="message" className="font-semibold">Message</label>
                    <textarea
                      name="message"
                      id="message"
                      cols="45"
                      rows="7"
                      placeholder="Message..."
                      className="border border-zinc-500 p-2 rounded-md"
                      required
                    ></textarea>
                  </div>
                  <div className="text-center">
                    <button
                      type="submit"
                      className="font-semibold bg-[#1a1a1a] p-4 px-6 rounded-full w-full cursor-pointer border border-gray-700 hover:bg-[#222] transition-colors"
                    >
                      <ShinyText text="Send" disabled={false} speed={3} className="custom-class" />
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
        {/* Kontak */}
      </main>
    </>
  )
}

export default App
