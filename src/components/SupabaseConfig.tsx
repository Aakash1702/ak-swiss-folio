
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Label } from '@/components/ui/label';

interface SupabaseConfigProps {
  onConfigSaved: (url: string, key: string) => void;
}

const SupabaseConfig: React.FC<SupabaseConfigProps> = ({ onConfigSaved }) => {
  const [url, setUrl] = useState('');
  const [key, setKey] = useState('');

  const handleSave = () => {
    if (url && key) {
      localStorage.setItem('VITE_SUPABASE_URL', url);
      localStorage.setItem('VITE_SUPABASE_ANON_KEY', key);
      onConfigSaved(url, key);
    }
  };

  return (
    <Card className="p-6 m-4 max-w-md mx-auto">
      <h3 className="text-lg font-semibold mb-4">Configure Supabase</h3>
      <p className="text-sm text-gray-600 mb-4">
        Please enter your Supabase credentials to enable the chatbot.
      </p>
      
      <div className="space-y-4">
        <div>
          <Label htmlFor="supabase-url">Supabase URL</Label>
          <Input
            id="supabase-url"
            type="text"
            placeholder="https://your-project.supabase.co"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
        </div>
        
        <div>
          <Label htmlFor="supabase-key">Supabase Anon Key</Label>
          <Input
            id="supabase-key"
            type="password"
            placeholder="Your anon key"
            value={key}
            onChange={(e) => setKey(e.target.value)}
          />
        </div>
        
        <Button onClick={handleSave} className="w-full">
          Save Configuration
        </Button>
      </div>
    </Card>
  );
};

export default SupabaseConfig;
