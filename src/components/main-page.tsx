"use client";

import { useState, useMemo, type FC } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { ResourceCard } from './resource-card';
import { UploadDialog } from './upload-dialog';
import type { Resource, ResourceCategory } from '@/lib/types';
import { categories, resources as initialResourcesData } from '@/lib/data';
import { Upload } from 'lucide-react';
import Image from 'next/image';

const Section: FC<React.PropsWithChildren<{ id: string, title: string, className?: string }>> = ({ id, title, children, className }) => (
    <section id={id} className={`bg-transparent p-6 md:p-8 rounded-2xl border border-border shadow-lg mb-8 transition-all duration-300 hover:shadow-primary/20 hover:border-primary/50 hover:-translate-y-1 ${className}`}>
        <h2 className="font-headline text-3xl font-bold text-primary mb-4" style={{ textShadow: '0 0 12px hsl(var(--primary) / 0.5)' }}>{title}</h2>
        <div className="space-y-4 text-foreground/80 text-lg">
            {children}
        </div>
    </section>
);

const Highlight: FC<React.PropsWithChildren<{}>> = ({ children }) => (
    <span className="bg-primary/20 text-primary font-bold px-2 py-1 rounded-md shadow-[0_0_8px_hsl(var(--primary)/0.6)]">
        {children}
    </span>
)

export function MainPage() {
  const [resources, setResources] = useState<Resource[]>(initialResourcesData);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<ResourceCategory | 'All'>('All');
  const [isUploadOpen, setUploadOpen] = useState(false);

  const handleAddResource = (newResource: Resource) => {
    setResources(prev => [newResource, ...prev]);
  };

  const filteredResources = useMemo(() => {
    return resources.filter(resource => {
      const matchesCategory = selectedCategory === 'All' || resource.category === selectedCategory;
      const matchesSearch = resource.title.toLowerCase().includes(searchTerm.toLowerCase()) || resource.description.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [resources, searchTerm, selectedCategory]);

  return (
    <div className="max-w-5xl mx-auto">
        <Section id="home" title="Welcome to the PTC Black Market">
            <p>Your centralized platform for BSIT students of Pateros Technological College. Access, organize, and share your learning materials with ease.</p>
        </Section>
        
        <Section id="about-us" title="About Us">
            <p>PTC Black Market is a centralized platform designed to help BSIT students of Pateros Technological College easily access, organize, and share their learning materials, lessons, and videos. Our goal is to foster a collaborative and efficient learning environment by providing a user-friendly and accessible resource hub.</p>
        </Section>
        
        <Section id="disclaimer" title="Disclaimer">
             <p>All materials, lessons, and videos uploaded on this website are intended <Highlight>for educational purposes only</Highlight>. The contents belong to their respective authors, creators, or publishers, and we do not claim ownership unless otherwise stated.</p>
            <p>This platform is created to help <Highlight>BSIT students of PTC</Highlight> access and organize their learning materials in one place. Any misuse, reproduction, or unauthorized distribution of the content is strictly prohibited.</p>
            <p>By using this website, you agree that the developers are <Highlight>not responsible</Highlight> for any misuse of the materials provided here.</p>
        </Section>

      <section id="resources" className="scroll-mt-20">
        <Card className="bg-transparent">
          <CardHeader>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <CardTitle className="font-headline text-3xl font-bold text-primary" style={{ textShadow: '0 0 12px hsl(var(--primary) / 0.5)' }}>
                    Resource Hub
                </CardTitle>
                <Button onClick={() => setUploadOpen(true)}>
                    <Upload className="mr-2 h-4 w-4" />
                    Upload Resource
                </Button>
            </div>
            <div className="flex flex-col md:flex-row gap-4 pt-4">
                <Input
                    placeholder="Search resources..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full md:w-1/3"
                />
                <div className="flex-1 overflow-x-auto">
                    <div className="flex gap-2 pb-2">
                        <Button
                            variant={selectedCategory === 'All' ? 'default' : 'secondary'}
                            onClick={() => setSelectedCategory('All')}
                            className="shrink-0"
                        >
                            All
                        </Button>
                        {categories.map(category => (
                            <Button
                                key={category}
                                variant={selectedCategory === category ? 'default' : 'secondary'}
                                onClick={() => setSelectedCategory(category)}
                                className="shrink-0"
                            >
                                {category}
                            </Button>
                        ))}
                    </div>
                </div>
            </div>
          </CardHeader>
          <CardContent>
            {filteredResources.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredResources.map(resource => (
                        <ResourceCard key={resource.id} resource={resource} />
                    ))}
                </div>
            ) : (
                <div className="text-center py-12 text-muted-foreground">
                    <p className="text-lg">No resources found.</p>
                    <p>Try adjusting your search or filter.</p>
                </div>
            )}
          </CardContent>
        </Card>
      </section>

       <div className="grid md:grid-cols-2 gap-8 mt-8">
            <Section id="developer-info" title="About the Developers">
               <div className="flex flex-col sm:flex-row gap-6 items-center">
                    <Image src="https://picsum.photos/300/200" alt="Modern workspace" data-ai-hint="modern workspace" width={150} height={150} className="rounded-full shadow-lg object-cover w-[150px] h-[150px]" />
                    <p>This platform was envisioned and brought to life by a team of passionate developers dedicated to improving the student experience at PTC.</p>
                </div>
            </Section>
            <Section id="co-developer-info" title="Our Mission">
                 <div className="flex flex-col sm:flex-row gap-6 items-center">
                    <Image src="https://picsum.photos/300/200" alt="Collaborative design studio" data-ai-hint="design studio" width={150} height={150} className="rounded-full shadow-lg object-cover w-[150px] h-[150px]" />
                    <p>Our mission is to create elegant, functional, and user-friendly tools that foster collaboration and simplify access to educational resources.</p>
                </div>
            </Section>
        </div>


      <UploadDialog isOpen={isUploadOpen} onOpenChange={setUploadOpen} onAddResource={handleAddResource} />
    </div>
  );
}
