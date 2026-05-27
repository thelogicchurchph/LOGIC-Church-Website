import { useEffect } from 'react';

export default function useSEO(title, description) {
  useEffect(() => {
    document.title = title ? `${title} | LOGIC Church Port Harcourt` : 'LOGIC Church Port Harcourt';
    
    if (description) {
      let metaDescription = document.querySelector('meta[name="description"]');
      if (metaDescription) {
        metaDescription.setAttribute('content', description);
      } else {
        metaDescription = document.createElement('meta');
        metaDescription.name = 'description';
        metaDescription.content = description;
        document.head.appendChild(metaDescription);
      }
    }
  }, [title, description]);
}
