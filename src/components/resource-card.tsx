"use client";

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import type { Resource } from '@/lib/types';
import { SummarizeDialog } from './summarize-dialog';
import { Badge } from './ui/badge';
import { BookText, ExternalLink } from 'lucide-react';

interface ResourceCardProps {
  resource: Resource;
}

export function ResourceCard({ resource }: ResourceCardProps) {
  const [isSummarizeOpen, setSummarizeOpen] = useState(false);

  return (
    <>
      <Card className="h-full flex flex-col bg-card/70 hover:border-primary/60 transition-colors duration-300 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-lg font-bold text-primary/90">{resource.title}</CardTitle>
          <CardDescription>{resource.description}</CardDescription>
        </CardHeader>
        <CardContent className="flex-grow">
          <Badge variant="secondary">{resource.category}</Badge>
        </CardContent>
        <CardFooter className="flex justify-end gap-2">
            {resource.link && (
                <Button variant="ghost" size="sm" asChild>
                    <a href={resource.link} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="mr-2 h-4 w-4" />
                        Visit
                    </a>
                </Button>
            )}
            <Button size="sm" onClick={() => setSummarizeOpen(true)}>
                <BookText className="mr-2 h-4 w-4" />
                Summarize
            </Button>
        </CardFooter>
      </Card>
      <SummarizeDialog 
        isOpen={isSummarizeOpen} 
        onOpenChange={setSummarizeOpen} 
        resourceContent={resource.content} 
        resourceTitle={resource.title}
      />
    </>
  );
}
