import { useState } from 'react';
import { Upload } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

interface CibilResponse {
  score: number;
  status: 'success' | 'warning' | 'error';
  message: string;
}

interface CibilScoreUploadProps {
  onScoreUpdate?: (score: number) => void;
}

export function CibilScoreUpload({ onScoreUpdate }: CibilScoreUploadProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<CibilResponse | null>(null);

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsLoading(true);
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('http://localhost:5000/api/upload', {
        method: 'POST',
        body: formData,
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Failed to upload file');
      }
      
      setResult({
        score: data.score,
        status: data.status,
        message: data.message
      });

      // Call the onScoreUpdate callback if provided and score is valid
      if (onScoreUpdate && data.status === 'success' && data.score) {
        onScoreUpdate(data.score);
      }
    } catch (error) {
      console.error('Upload error:', error);
      setResult({
        score: 0,
        status: 'error',
        message: error instanceof Error ? error.message : 'Failed to upload file. Please try again.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Upload CIBIL Report</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex flex-col items-center gap-4">
          <label
            htmlFor="file-upload"
            className="w-full cursor-pointer"
          >
            <div className="border-2 border-dashed rounded-lg p-6 text-center hover:border-primary transition-colors">
              <Upload className="w-8 h-8 mx-auto mb-2" />
              <p className="text-sm text-muted-foreground">
                Click to upload your CIBIL report (PDF)
              </p>
            </div>
            <input
              id="file-upload"
              type="file"
              className="hidden"
              accept=".pdf,.txt,.csv"
              onChange={handleFileUpload}
              disabled={isLoading}
            />
          </label>

          {isLoading && (
            <div className="text-center">
              <p>Processing your report...</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
} 