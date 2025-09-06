"use client";

import { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from './ui/dialog';
import { summarizeResource } from '@/ai/flows/summarize-resource';
import { Skeleton } from './ui/skeleton';
import { useToast } from '@/hooks/use-toast';

interface SummarizeDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  resourceContent: string;
  resourceTitle: string;
}

export function SummarizeDialog({ isOpen, onOpenChange, resourceContent, resourceTitle }: SummarizeDialogProps) {
  const [summary, setSummary] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const { toast } = useToast();

  useEffect(() => {
    if (isOpen && !summary) {
      const getSummary = async () => {
        setIsLoading(true);
        setError('');
        try {
          const result = await summarizeResource({ text: resourceContent });
          setSummary(result.summary);
        } catch (e) {
          console.error(e);
          setError('Failed to generate summary. Please try again later.');
          toast({
            title: "Error",
            description: "Could not generate summary.",
            variant: "destructive",
          });
        } finally {
          setIsLoading(false);
        }
      };
      getSummary();
    }
  }, [isOpen, resourceContent, summary, toast]);

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl bg-card/90 backdrop-blur-md">
        <DialogHeader>
          <DialogTitle className="font-headline text-2xl text-primary">{`Summary of "${resourceTitle}"`}</DialogTitle>
          <DialogDescription>
            AI-generated summary of the resource content.
          </DialogDescription>
        </DialogHeader>
        <div className="mt-4 prose prose-invert prose-p:text-foreground/80 max-h-[60vh] overflow-y-auto pr-4">
            {isLoading && (
                <div className="space-y-3">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-[80%]" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-[90%]" />
                </div>
            )}
            {error && <p className="text-destructive">{error}</p>}
            {!isLoading && !error && summary && <p>{summary}</p>}
        </div>
      </DialogContent>
    </Dialog>
  );
}
