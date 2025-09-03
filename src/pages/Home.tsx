import React from 'react';
import Hero from '@/components/Hero';
import MangaCard from '@/components/MangaCard';
import { useApp } from '@/contexts/AppContext';
import { mangaData } from '@/data/manga';

const Home: React.FC = () => {
  const { translation } = useApp();
  const mangas = Object.values(mangaData);
  
  // Get latest chapters (first 5 mangas)
  const latestMangas = mangas.slice(0, 5);
  
  // Get popular mangas (last 5 mangas)
  const popularMangas = mangas.slice(-5);

  return (
    <div className="min-h-screen">
      <Hero />
      
      <div className="container mx-auto px-4">
        {/* Latest Chapters Section */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6 text-primary border-b-2 border-primary pb-2 inline-block">
            {translation.latestChapters}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {latestMangas.map((manga) => (
              <MangaCard 
                key={manga.id} 
                manga={manga} 
                showLatestChapter={true}
              />
            ))}
          </div>
        </section>
            
        {/* Popular Manga Section */}  
        <section className="mb-12">
          <h2 className="text-3xl font-bold mb-6 text-primary border-b-2 border-primary pb-2 inline-block">
            {translation.popularManga}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {popularMangas.map((manga) => (
              <MangaCard 
                key={manga.id} 
                manga={manga}
              />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Home;