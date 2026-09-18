import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { Compass, Leaf, Pause, Play, Ship, Sun, Volume2, VolumeX } from 'lucide-react';

export interface StoryChapter {
  id: string;
  stage: string;
  title: string;
  subtitle: string;
  description: string;
  specs: { label: string; value: string }[];
  icon: typeof Leaf;
  fallbackImage: string;
}

const chapters: StoryChapter[] = [
  {
    id: 'origin',
    stage: 'STAGE 01 · THE TERROIR',
    title: 'Highland Forest Canopy',
    subtitle: '1,750 – 2,200 m.a.s.l.',
    description: 'Arabica coffee evolved under the biodiverse forest shade of southwestern Ethiopia. Deep volcanic soils, natural cloud cover, and distinct wet and dry seasons cultivate complex acidity and delicate floral cup profiles.',
    specs: [
      { label: 'Varieties', value: 'Indigenous Ethiopian Heirloom' },
      { label: 'Soil Type', value: 'Fertile Humus & Volcanic Loam' },
      { label: 'Ecosystem', value: 'Semi-Forest & Agroforestry' },
    ],
    icon: Leaf,
    fallbackImage: 'https://images.pexels.com/photos/7125601/pexels-photo-7125601.jpeg?auto=compress&cs=tinysrgb&w=2200',
  },
  {
    id: 'harvest',
    stage: 'STAGE 02 · THE HARVEST',
    title: 'Selective Cherry Picking',
    subtitle: 'November – February Harvest',
    description: 'Smallholder farming communities practice selective hand-picking, harvesting solely crimson-ripe cherries at optimal brix sugar concentration while leaving immature cherries on the branch.',
    specs: [
      { label: 'Selection', value: '100% Hand-Harvested' },
      { label: 'Brix Level', value: '20° – 24° Sugar Concentration' },
      { label: 'Delivery', value: 'Same-Day Washing Station Processing' },
    ],
    icon: Compass,
    fallbackImage: 'https://images.unsplash.com/photo-1611162458324-aae1eb4129a4?auto=format&fit=crop&w=2200&q=90',
  },
  {
    id: 'processing',
    stage: 'STAGE 03 · PRIMARY PROCESSING',
    title: 'Washing & African Sun-Drying',
    subtitle: 'Parchment Moisture 10.5% – 11.5%',
    description: 'Cherries undergo meticulous pulping, controlled underwater fermentation in clean spring water, and 12–18 days of slow sun-drying on raised African mesh beds with continuous hand-raking for uniform aeration.',
    specs: [
      { label: 'Methods', value: 'Fully Washed & Natural Sun-Dried' },
      { label: 'Drying Beds', value: 'Raised Wooden Mesh Racks' },
      { label: 'Target Moisture', value: 'Strictly 10.5% – 11.5%' },
    ],
    icon: Sun,
    fallbackImage: 'https://commons.wikimedia.org/wiki/Special:FilePath/Coffee%20Beans%20Drying%20%2811586771164%29.jpg',
  },
  {
    id: 'export',
    stage: 'STAGE 04 · DRY MILL & EXPORT',
    title: 'Optical Sorting & Container Dispatch',
    subtitle: 'FOB Port of Djibouti · 19.2 MT FCL',
    description: 'In Addis Ababa, parchment is hulled, gravity-graded, and passed through Bichromatic optical color sorters before SCAA Q-cupping verification, GrainPro hermetic packaging, and container loading for Port of Djibouti transit.',
    specs: [
      { label: 'Grading', value: 'ECTA Grade 1 & 2 Specialty' },
      { label: 'Protection', value: '60kg GrainPro + Jute Bags' },
      { label: 'Container', value: '1x 20ft FCL (320 Bags / 19.2 MT)' },
    ],
    icon: Ship,
    fallbackImage: 'https://commons.wikimedia.org/wiki/Special:FilePath/Sorting%20coffee%20beans%20for%20size%2C%20Hawassa.jpg',
  },
];

type FrameMode = 'before' | 'active' | 'after';

export function CoffeeScrollytelling() {
  const trackRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const reduceMotion = useReducedMotion();

  const [frameMode, setFrameMode] = useState<FrameMode>('before');
  const [isMuted, setIsMuted] = useState(true);
  const [isAutoPlay, setIsAutoPlay] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [progressRatio, setProgressRatio] = useState(0);
  const [videoLoaded, setVideoLoaded] = useState(false);

  const base = import.meta.env.BASE_URL;
  const primaryVideoSrc = `${base}assets/video/coffee-journey.mp4`;
  const fallbackVideoSrc = `${base}assets/video/0919.mp4`;

  useEffect(() => {
    let animFrame = 0;

    const update = () => {
      const track = trackRef.current;
      if (!track) return;

      const rect = track.getBoundingClientRect();
      const viewportHeight = Math.max(window.innerHeight, 1);
      const travel = Math.max(track.offsetHeight - viewportHeight, 1);
      const travelled = Math.min(Math.max(-rect.top, 0), travel);
      const progress = travelled / travel;

      const nextMode: FrameMode =
        rect.top > 0
          ? 'before'
          : rect.bottom <= viewportHeight
            ? 'after'
            : 'active';

      setFrameMode(nextMode);

      // In scroll scrub mode (when autoplay is OFF), sync progress with scroll position
      if (!isAutoPlay) {
        setProgressRatio(progress);
        const nextIndex = Math.min(
          chapters.length - 1,
          Math.floor(Math.min(progress, 0.999999) * chapters.length)
        );
        setActiveIndex(nextIndex);

        if (videoRef.current && videoRef.current.duration) {
          const dur = videoRef.current.duration;
          const target = Math.min(dur - 0.05, Math.max(0, progress * dur));
          if (Math.abs(videoRef.current.currentTime - target) > 0.08) {
            videoRef.current.currentTime = target;
          }
        }
      }
    };

    const onScroll = () => {
      window.cancelAnimationFrame(animFrame);
      animFrame = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);

    return () => {
      window.cancelAnimationFrame(animFrame);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [isAutoPlay]);

  const handleTimeUpdate = () => {
    if (isAutoPlay && videoRef.current && videoRef.current.duration) {
      const current = videoRef.current.currentTime;
      const dur = videoRef.current.duration;
      const ratio = current / dur;
      setProgressRatio(ratio);
      const nextIndex = Math.min(
        chapters.length - 1,
        Math.floor(Math.min(ratio, 0.999999) * chapters.length)
      );
      setActiveIndex(nextIndex);
    }
  };

  function toggleAudio() {
    if (!videoRef.current) return;
    const next = !isMuted;
    videoRef.current.muted = next;
    setIsMuted(next);
  }

  function toggleAutoPlay() {
    if (!videoRef.current) return;
    const next = !isAutoPlay;
    setIsAutoPlay(next);
    if (next) {
      videoRef.current.play().catch(() => {});
    } else {
      videoRef.current.pause();
      if (videoRef.current.duration) {
        videoRef.current.currentTime = progressRatio * videoRef.current.duration;
      }
    }
  }

  function jumpToStage(index: number) {
    if (!trackRef.current) return;
    const track = trackRef.current;
    const rect = track.getBoundingClientRect();
    const scrollTop = window.scrollY + rect.top;
    const runway = track.offsetHeight - window.innerHeight;
    const targetScroll = scrollTop + (index / (chapters.length - 1)) * runway;
    window.scrollTo({ top: targetScroll, behavior: 'smooth' });
  }

  const currentChapter = chapters[activeIndex];
  const IconComponent = currentChapter.icon;

  return (
    <section
      className="coffee-scrolly-container"
      ref={trackRef}
      id="coffee-story"
      aria-label="Interactive coffee origin scrollytelling journey"
    >
      <div className={`coffee-scrolly-frame coffee-scrolly-frame--${frameMode}`}>
        {/* Layer 1: Documentary Photography Fallbacks (Smoothly crossfaded behind video) */}
        <div className="coffee-scrolly-fallback-layer" aria-hidden="true">
          {chapters.map((ch, idx) => (
            <div
              key={ch.id}
              className={`coffee-scrolly-fallback-image ${activeIndex === idx ? 'is-active' : ''}`}
              style={{ backgroundImage: `url(${ch.fallbackImage})` }}
            />
          ))}
        </div>

        {/* Layer 2: Universal H.264 Web Video */}
        <video
          ref={videoRef}
          className={`coffee-scrolly-video ${videoLoaded ? 'is-loaded' : ''}`}
          playsInline
          muted={isMuted}
          loop
          preload="auto"
          onLoadedData={() => setVideoLoaded(true)}
          onTimeUpdate={handleTimeUpdate}
          poster={chapters[0].fallbackImage}
        >
          <source src={primaryVideoSrc} type="video/mp4" />
          <source src={fallbackVideoSrc} type="video/mp4" />
        </video>

        {/* Layer 3: Cinematic Scrim */}
        <div className="coffee-scrolly-scrim" aria-hidden="true" />

        {/* Layer 4: Top HUD */}
        <header className="coffee-scrolly-hud-top">
          <div className="container coffee-scrolly-hud-top__inner">
            <div className="coffee-scrolly-hud-badge">
              <span className="live-dot" />
              <span>THE LIVING ORIGIN · ETHIOPIAN COFFEE JOURNEY</span>
            </div>
            <div className="coffee-scrolly-hud-stats">
              <span>{isAutoPlay ? 'Autoplay Documentary Streaming' : 'Scroll to Scrub Through Origin Stages'}</span>
            </div>
          </div>
        </header>

        {/* Mobile Horizontal Stage Bar */}
        <nav className="coffee-scrolly-mobile-nav" aria-label="Mobile story navigation">
          {chapters.map((ch, idx) => {
            const isActive = activeIndex === idx;
            return (
              <button
                key={ch.id}
                type="button"
                className={`coffee-scrolly-mobile-pill ${isActive ? 'is-active' : ''}`}
                onClick={() => jumpToStage(idx)}
              >
                0{idx + 1} {ch.title.split(' ')[0]}
              </button>
            );
          })}
        </nav>

        {/* Layer 5: Narrative Stage Card & Rail */}
        <div className="container coffee-scrolly-layout">
          <div className="coffee-scrolly-content-area">
            <AnimatePresence mode="wait">
              <motion.article
                key={currentChapter.id}
                className="coffee-scrolly-card"
                initial={reduceMotion ? false : { opacity: 0, y: 22 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduceMotion ? undefined : { opacity: 0, y: -18 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className="coffee-scrolly-card__top">
                  <div className="coffee-scrolly-card__icon-badge">
                    <IconComponent size={22} aria-hidden="true" />
                  </div>
                  <div>
                    <span className="coffee-scrolly-card__stage">{currentChapter.stage}</span>
                    <h3 className="coffee-scrolly-card__title">{currentChapter.title}</h3>
                  </div>
                </div>

                <div className="coffee-scrolly-card__subtitle">{currentChapter.subtitle}</div>
                <p className="coffee-scrolly-card__desc">{currentChapter.description}</p>

                <div className="coffee-scrolly-card__specs">
                  {currentChapter.specs.map((item) => (
                    <div key={item.label} className="coffee-scrolly-spec-item">
                      <span className="coffee-scrolly-spec-label">{item.label}</span>
                      <strong className="coffee-scrolly-spec-val">{item.value}</strong>
                    </div>
                  ))}
                </div>
              </motion.article>
            </AnimatePresence>
          </div>

          {/* Vertical Chapter Progress Rail (Desktop) */}
          <nav className="coffee-scrolly-rail" aria-label="Story stages">
            <div className="coffee-scrolly-rail__track">
              <div
                className="coffee-scrolly-rail__fill"
                style={{ height: `${Math.min(100, Math.max(0, progressRatio * 100))}%` }}
              />
            </div>
            <div className="coffee-scrolly-rail__markers">
              {chapters.map((ch, idx) => {
                const isActive = activeIndex === idx;
                return (
                  <button
                    type="button"
                    key={ch.id}
                    onClick={() => jumpToStage(idx)}
                    className={`coffee-scrolly-marker ${isActive ? 'is-active' : ''}`}
                    aria-label={`Jump to stage ${idx + 1}: ${ch.title}`}
                    aria-current={isActive ? 'step' : undefined}
                  >
                    <span className="marker-dot" />
                    <span className="marker-info">
                      <small>STAGE 0{idx + 1}</small>
                      <strong>{ch.title}</strong>
                    </span>
                  </button>
                );
              })}
            </div>
          </nav>
        </div>

        {/* Layer 6: Bottom Interactive HUD */}
        <footer className="coffee-scrolly-hud-bottom">
          <div className="container coffee-scrolly-hud-bottom__inner">
            <div className="coffee-scrolly-controls">
              <button
                type="button"
                className={`coffee-scrolly-btn ${isAutoPlay ? 'active' : ''}`}
                onClick={toggleAutoPlay}
                aria-label={isAutoPlay ? 'Switch to scroll scrub mode' : 'Switch to continuous autoplay'}
              >
                {isAutoPlay ? <Pause size={15} /> : <Play size={15} />}
                <span>{isAutoPlay ? 'Autoplay Active' : 'Scroll Scrub Active'}</span>
              </button>

              <button
                type="button"
                className="coffee-scrolly-btn"
                onClick={toggleAudio}
                aria-label={isMuted ? 'Unmute video audio' : 'Mute audio'}
              >
                {isMuted ? <VolumeX size={15} /> : <Volume2 size={15} />}
                <span>{isMuted ? 'Muted' : 'Sound On'}</span>
              </button>
            </div>

            <div className="coffee-scrolly-progress-label">
              <span>Stage 0{activeIndex + 1} of 0{chapters.length}</span>
              <div className="coffee-scrolly-mini-bar">
                <div style={{ width: `${Math.round(progressRatio * 100)}%` }} />
              </div>
              <small>{Math.round(progressRatio * 100)}% Journey</small>
            </div>
          </div>
        </footer>
      </div>
    </section>
  );
}
