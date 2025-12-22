export default function WaveBackground() {
    return (
      <div className="fixed inset-0 z-[-1] overflow-hidden">
        <svg
          className="absolute bottom-0 left-0 w-full h-auto"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 320"
          preserveAspectRatio="none"
        >
          <path
            fill="url(#gradient)"
            fillOpacity="0.3"
            d="M0,64L48,80C96,96,192,128,288,128C384,128,480,96,576,90.7C672,85,768,107,864,128C960,149,1056,171,1152,165.3C1248,160,1344,128,1392,112L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          ></path>
          <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#800000" stopOpacity="0.7" />
              <stop offset="50%" stopColor="#FFA500" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#FFFDD0" stopOpacity="0.3" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    )
  }
  
  