import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Search } from "lucide-react";
import { ApiService, categories, VideoTemplate } from "@/services/api";
import { adMobService } from "@/services/admob";
import { TemplateCard } from "@/components/TemplateCard";
import { CategoryChip } from "@/components/CategoryChip";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import { TemplateGridSkeleton } from "@/components/TemplateSkeleton";
import { ThemeToggle } from "@/components/ThemeToggle";
import { PullToRefresh } from "@/components/PullToRefresh";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { usePullToRefresh } from "@/hooks/usePullToRefresh";

const Home = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [allTemplates, setAllTemplates] = useState<VideoTemplate[]>([]);
  const [displayedCount, setDisplayedCount] = useState(20);
  const [loading, setLoading] = useState(true);
  const categoryFromUrl = parseInt(searchParams.get('category') || '6001');
  const [selectedCategory, setSelectedCategory] = useState(categoryFromUrl);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const TEMPLATES_PER_PAGE = 20;

  const { isPulling, pullDistance, threshold } = usePullToRefresh({
    onRefresh: async () => {
      setDisplayedCount(TEMPLATES_PER_PAGE);
      await loadTemplates(selectedCategory, true);
    },
  });

  useEffect(() => {
    const categoryParam = parseInt(searchParams.get('category') || '6001');
    if (categoryParam !== selectedCategory) {
      setSelectedCategory(categoryParam);
    }
  }, [searchParams]);

  useEffect(() => {
    loadTemplates(selectedCategory);
  }, [selectedCategory]);

  const loadTemplates = async (categoryId: number, forceRefresh = false) => {
    setLoading(true);
    setDisplayedCount(TEMPLATES_PER_PAGE);
    try {
      const response = await ApiService.getCollectionTemplates(categoryId, 200);
      setAllTemplates(response.data?.video_templates || []);
      if (forceRefresh) {
        toast({
          description: "Templates refreshed",
          duration: 2000,
        });
      }
    } catch (error) {
      console.error('Error loading templates:', error);
      setAllTemplates([]);
    } finally {
      setLoading(false);
    }
  };

  const handleLoadMore = async () => {
    // COMMENTED FOR INITIAL RELEASE - Re-enable after AdMob approval
    // const loadingToast = toast({
    //   title: "Loading ad...",
    //   duration: 2000,
    // });

    try {
      const result = await adMobService.showInterstitial();
      if (result) {
        setDisplayedCount(prev => Math.min(prev + TEMPLATES_PER_PAGE, allTemplates.length));
      }
    } catch (error: any) {
      console.error('Error showing ad:', error);
      // COMMENTED FOR INITIAL RELEASE - Re-enable after AdMob approval
      // toast({
      //   title: "Ad failed to load",
      //   description: error?.message || "Continuing without ad.",
      //   variant: "destructive",
      //   duration: 3000,
      // });
      // Continue without ad on error
      setDisplayedCount(prev => Math.min(prev + TEMPLATES_PER_PAGE, allTemplates.length));
    }
  };

  const templates = allTemplates.slice(0, displayedCount);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // COMMENTED FOR INITIAL RELEASE - Re-enable after AdMob approval
      // const loadingToast = toast({
      //   title: "Loading ad...",
      //   duration: 2000,
      // });

      try {
        const result = await adMobService.showRewardedInterstitial();
        if (result) {
          navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
        }
      } catch (error: any) {
        console.error('Error showing rewarded ad:', error);
        // COMMENTED FOR INITIAL RELEASE - Re-enable after AdMob approval
        // toast({
        //   title: "Ad failed to load",
        //   description: error?.message || "Continuing to search...",
        //   variant: "destructive",
        //   duration: 3000,
        // });
        // Continue to search even if ad fails
        navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      }
    }
  };


  return (
    <div className="min-h-screen bg-background">
      <PullToRefresh isPulling={isPulling} pullDistance={pullDistance} threshold={threshold} />
      
      {/* Hero Section */}
      <header className="bg-gradient-hero text-primary-foreground py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="flex justify-end mb-4">
            <ThemeToggle />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-4 animate-fade-in">
            CapCut Template Finder
          </h1>
          <p className="text-center text-lg opacity-90 mb-8 animate-slide-up">
            Discover thousands of trending templates for your videos
          </p>
          
          {/* Search Bar */}
          <form onSubmit={handleSearch} className="max-w-2xl mx-auto animate-scale-in">
            <div className="flex gap-2">
              <Input
                type="text"
                placeholder="Search templates... (e.g., love, travel, summer)"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 h-12 bg-white/10 border-white/20 text-white placeholder:text-white/60"
              />
              <Button type="submit" size="lg" variant="secondary" className="h-12">
                Search
              </Button>
            </div>
          </form>

          {/* How to Use Button */}
          <div className="mt-4 text-center">
            <a 
              href="https://your-tutorial-url.com" 
              target="_blank" 
              rel="noopener noreferrer"
            >
              <Button 
                variant="outline" 
                className="bg-white/10 border-white/20 text-white hover:bg-white/20"
              >
                <Search className="w-4 h-4 mr-2" />
                How to use TemplateFinder
              </Button>
            </a>
          </div>
        </div>
      </header>

      {/* Categories */}
      <section className="py-6 px-4 border-b bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto max-w-6xl">
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide animate-slide-up">
            {categories.map((category) => (
              <CategoryChip
                key={category.id}
                label={category.display_name}
                emoji={category.emoji}
                isActive={selectedCategory === category.id}
                onClick={() => {
                  setSelectedCategory(category.id);
                  setSearchParams({ category: category.id.toString() });
                }}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Templates Grid */}
      <main className="container mx-auto max-w-6xl px-4 py-8">
        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            <TemplateGridSkeleton count={10} />
          </div>
        ) : (
          <>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-foreground">
                {categories.find(c => c.id === selectedCategory)?.display_name || 'Templates'}
              </h2>
              <p className="text-muted-foreground">
                {templates.length} templates
              </p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
              {templates.map((template, index) => (
                <div
                  key={template.web_id}
                  className="animate-fade-in"
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  <TemplateCard 
                    template={template} 
                    currentCategory={selectedCategory}
                  />
                </div>
              ))}
            </div>

            {/* Load More Button */}
            {displayedCount < allTemplates.length && (
              <div className="text-center mt-8">
                <Button
                  onClick={handleLoadMore}
                  size="lg"
                  className="bg-gradient-primary hover:opacity-90 transition-opacity hover-scale"
                >
                  Load More Templates
                </Button>
              </div>
            )}
          </>
        )}
      </main>
    </div>
  );
};

export default Home;
