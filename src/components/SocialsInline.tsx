
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  MessageCircle, 
  Send, 
  Phone, 
  Mail, 
  Check
} from 'lucide-react';

export const SocialsInline = () => {
  const [connections, setConnections] = useState({
    discord: false,
    telegram: true,
    phone: false,
    email: false
  });

  const [highlightedBox, setHighlightedBox] = useState<string | null>(null);

  const handleConnect = (socialKey: string) => {
    setConnections(prev => ({
      ...prev,
      [socialKey]: true
    }));
    setHighlightedBox(socialKey);
    setTimeout(() => setHighlightedBox(null), 2000);
  };

  const getConnectionDisplay = (socialKey: string) => {
    switch (socialKey) {
      case 'phone':
        return '+91854XXXXX89';
      case 'email':
        return 'shiXXXXXXXXXtb@gmail.com';
      case 'telegram':
        return '@userXXXXXX123';
      case 'discord':
        return 'UserXXXXX#1234';
      default:
        return '';
    }
  };

  const socialConnections = [
    {
      key: "discord",
      name: "Discord",
      description: "Join our community",
      reward: "+500 FAPS",
      icon: MessageCircle,
      color: "bg-indigo-600/80",
      hoverColor: "hover:bg-indigo-700/80",
      connected: connections.discord
    },
    {
      key: "telegram",
      name: "Telegram", 
      description: "Get instant updates",
      reward: "+300 FAPS",
      icon: Send,
      color: "bg-blue-500/80",
      hoverColor: "hover:bg-blue-600/80", 
      connected: connections.telegram
    },
    {
      key: "phone",
      name: "Phone Number",
      description: "SMS notifications",
      reward: "+200 FAPS", 
      icon: Phone,
      color: "bg-green-600/80",
      hoverColor: "hover:bg-green-700/80",
      connected: connections.phone
    },
    {
      key: "email",
      name: "Email",
      description: "Weekly newsletter",
      reward: "+150 FAPS",
      icon: Mail, 
      color: "bg-orange-600/80",
      hoverColor: "hover:bg-orange-700/80",
      connected: connections.email
    }
  ];

  return (
    <Card className="bg-gray-900/80 border-amber-500/40 shadow-lg shadow-amber-500/10 mb-8 hover:scale-[1.02] transition-all duration-300 hover:shadow-xl hover:shadow-amber-500/20">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <h2 className="text-xl font-bold text-gray-200">Connect Your Socials</h2>
          </div>
          <Badge className="bg-amber-500/30 text-amber-300 border-amber-500/50 shadow-sm shadow-amber-500/20">
            🎁 Bonus: +250 FAPS for connecting all!
          </Badge>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {socialConnections.map((social, index) => (
            <div 
              key={index}
              className={`bg-gray-800/60 rounded-xl p-4 border transition-all duration-300 group hover:shadow-md hover:shadow-amber-500/15 hover:scale-105 ${
                highlightedBox === social.key 
                  ? 'border-orange-500 bg-orange-500/10 shadow-lg shadow-orange-500/20' 
                  : 'border-amber-500/30 hover:border-amber-500/50'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className={`w-12 h-12 rounded-xl ${social.color} flex items-center justify-center transition-colors duration-300 ${social.hoverColor} shadow-sm border border-amber-500/20`}>
                    <social.icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-200 mb-1">{social.name}</h3>
                    <p className="text-sm text-gray-400">{social.description}</p>
                    {social.connected && (
                      <p className="text-xs text-amber-400 font-medium mt-1">{getConnectionDisplay(social.key)}</p>
                    )}
                    <span className="text-xs text-amber-400 font-medium">{social.reward}</span>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  {social.connected ? (
                    <div className="flex items-center space-x-2">
                      <Check className="w-5 h-5 text-emerald-400" />
                      <span className="text-sm text-emerald-400 font-medium">Connected</span>
                    </div>
                  ) : (
                    <Button 
                      onClick={() => handleConnect(social.key)}
                      className="bg-amber-600 hover:bg-amber-700 text-black font-medium transition-all duration-300 group-hover:scale-105 shadow-sm shadow-amber-500/20 border border-amber-500/30"
                    >
                      Connect
                    </Button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
