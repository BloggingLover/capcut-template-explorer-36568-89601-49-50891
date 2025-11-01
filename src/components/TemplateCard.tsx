import { VideoTemplate } from "@/services/api";
import { Link } from "react-router-dom";
import { Play, Heart } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { FavoritesService } from "@/services/favorites";
import { useToast } from "@/hooks/use-toast";

interface TemplateCardProps {
  template: VideoTemplate;
  currentCategory?: number;
  searchQuery?: string;
  allTemplates?: VideoTemplate[];
}

const formatUsage = (amount: number) => {
  return amount >= 1000 ? `${(amount / 1000).toFixed(1)}K` : amount;
};

export const TemplateCard = ({ template, currentCategory, searchQuery, allTemplates }: TemplateCardProps) => {
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const isTouchDevice = 'ontouchstart' in window;
  const { toast } = useToast();
  
  // Get the current location to pass the "from" path to related templates
  const currentPath = window.location.pathname + window.location.search;

  useEffect(() => {
    checkFavoriteStatus();
  }, [template.web_id]);

  const checkFavoriteStatus = async () => {
    const favStatus = await FavoritesService.isFavorite(template.web_id);
    setIsFavorite(favStatus);
  };

  const handleFavoriteClick = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    const newStatus = await FavoritesService.toggleFavorite(template.web_id);
    setIsFavorite(newStatus);
    
    toast({
      description: newStatus ? "Added to favorites" : "Removed from favorites",
      duration: 2000,
    });
  };

  const aspectRatio = template.cover_height / template.cover_width;
  const paddingBottom = aspectRatio > 0 ? `${aspectRatio * 100}%` : '177.78%';

  const handlePlayClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!isVideoLoaded && template.video_dynamic_cover?.url && videoRef.current) {
      videoRef.current.src = template.video_dynamic_cover.url;
      setIsVideoLoaded(true);
    }
    
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play();
        setIsVideoPlaying(true);
      } else {
        videoRef.current.pause();
        setIsVideoPlaying(false);
      }
    }
  };

  const handleMouseEnter = () => {
    if (!isTouchDevice && template.video_dynamic_cover?.url && videoRef.current) {
      if (!isVideoLoaded) {
        videoRef.current.src = template.video_dynamic_cover.url;
        setIsVideoLoaded(true);
      }
      videoRef.current.play().catch(() => {});
      setIsVideoPlaying(true);
    }
  };

  const handleMouseLeave = () => {
    if (!isTouchDevice && videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
      setIsVideoPlaying(false);
    }
  };

  const handleVideoPause = () => {
    setIsVideoPlaying(false);
  };

  // Construct the template link with the current context (category or search) as a 'from' parameter
  let templateLink = `/template/${template.web_id}`;
  
  // Check if we're on a template detail page (indicating this is from "You May Also Like")
  const isFromTemplateDetail = currentPath.startsWith('/template/');
  
  if (isFromTemplateDetail) {
    // Preserve the original "from" parameter from the current URL
    const urlParams = new URLSearchParams(window.location.search);
    const originalFrom = urlParams.get('from');
    if (originalFrom) {
      templateLink += `?from=${encodeURIComponent(originalFrom)}`;
    }
  } else if (searchQuery) {
    templateLink += `?from=${encodeURIComponent(`/search?q=${searchQuery}`)}`;
  } else if (currentCategory) {
    templateLink += `?from=${encodeURIComponent(`/?category=${currentCategory}`)}`;
  }

  return (
    <Link 
      to={templateLink}
      state={allTemplates ? { template, allTemplates } : { template }}
      className="group block"
    >
      <div 
        className="bg-card rounded-xl shadow-sm overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1 hover-scale"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div className="relative w-full overflow-hidden bg-muted" style={{ paddingBottom }}>
          <img
            src={template.cover_url}
            alt={template.short_title}
            loading="lazy"
            onLoad={() => setImageLoaded(true)}
            className={`absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-300 ${
              isVideoPlaying ? 'opacity-0' : imageLoaded ? 'opacity-100' : 'opacity-0'
            }`}
          />
          {template.video_dynamic_cover?.url && (
            <video
              ref={videoRef}
              className={`absolute top-0 left-0 w-full h-full object-cover ${
                isVideoPlaying ? 'block' : 'hidden'
              }`}
              muted
              loop
              playsInline
              preload="metadata"
              onPause={handleVideoPause}
            />
          )}
          
          {/* Favorite button */}
          <button
            onClick={handleFavoriteClick}
            className="absolute top-2 right-2 z-10 bg-black/50 backdrop-blur-sm rounded-full p-2 transition-all duration-200 hover:bg-black/70 hover-scale"
          >
            <Heart
              className={`w-4 h-4 transition-all duration-200 ${
                isFavorite ? 'fill-red-500 text-red-500' : 'text-white'
              }`}
            />
          </button>
          
          {isTouchDevice && template.video_dynamic_cover?.url && (
            <button
              onClick={handlePlayClick}
              className="absolute bottom-2 right-2 w-10 h-10 bg-black/50 backdrop-blur-sm rounded-full flex items-center justify-center text-white z-10 transition-all hover:bg-black/70 hover-scale"
            >
              <Play className="w-5 h-5" />
            </button>
          )}
        </div>
        <div className="p-3">
          <h3 className="font-semibold text-sm truncate text-card-foreground group-hover:text-primary transition-colors">
            {template.short_title}
          </h3>
          <p className="text-xs text-muted-foreground mt-1">
            {formatUsage(template.usage_amount)} uses
          </p>
        </div>
      </div>
    </Link>
  );
};
