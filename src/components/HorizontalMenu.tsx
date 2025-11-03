import { Home, Info, Shield, Star, MessageCircle } from "lucide-react";
import { NavLink } from "react-router-dom";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

const menuItems = [
  { title: "Home", url: "/", icon: Home },
  { title: "About Us", url: "/about", icon: Info },
  { title: "Privacy Policy", url: "/privacy", icon: Shield },
  { 
    title: "Rate this App", 
    url: "https://play.google.com/store/apps/details?id=YOUR_APP_ID", 
    icon: Star,
    external: true 
  },
  { 
    title: "Join Telegram Channel", 
    url: "https://t.me/CapCutTemplateLink", 
    icon: MessageCircle,
    external: true 
  },
];

export function HorizontalMenu() {
  return (
    <ScrollArea className="w-full">
      <div className="flex gap-2 px-4 py-2 justify-center">
        {menuItems.map((item) => (
          item.external ? (
            <a
              key={item.title}
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                "inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap",
                "bg-secondary text-secondary-foreground hover:bg-secondary/80 transition-colors"
              )}
            >
              <item.icon className="h-4 w-4" />
              <span>{item.title}</span>
            </a>
          ) : (
            <NavLink
              key={item.title}
              to={item.url}
              end
              className={({ isActive }) =>
                cn(
                  "inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors",
                  isActive
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                )
              }
            >
              <item.icon className="h-4 w-4" />
              <span>{item.title}</span>
            </NavLink>
          )
        ))}
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  );
}
