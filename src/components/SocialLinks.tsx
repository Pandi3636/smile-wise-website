
import { Instagram, Youtube } from "lucide-react";

const SocialLinks = () => {
  return (
    <div className="flex items-center space-x-4">
      <a
        href="https://instagram.com"
        target="_blank"
        rel="noopener noreferrer"
        className="text-gray-600 hover:text-dental-blue transition-colors"
        aria-label="Instagram"
      >
        <Instagram size={24} />
      </a>
      <a
        href="https://youtube.com"
        target="_blank"
        rel="noopener noreferrer"
        className="text-gray-600 hover:text-dental-blue transition-colors"
        aria-label="YouTube"
      >
        <Youtube size={24} />
      </a>
    </div>
  );
};

export default SocialLinks;
