import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  X,
  MessageCircle, 
  Send, 
  Phone, 
  Mail, 
  CheckCheck,
  ExternalLink,
  RotateCcw,
  Copy
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface SocialsSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SocialsSidebar = ({ isOpen, onClose }: SocialsSidebarProps) => {
  const { toast } = useToast();
  const [connections, setConnections] = useState({
    discord: false,
    telegram: false,
    phone: false,
    email: false
  });

  const [highlightedBox, setHighlightedBox] = useState<string | null>(null);
  const [telegramState, setTelegramState] = useState<'disconnected' | 'waiting-otp' | 'connected'>('disconnected');
  const [otpCode, setOtpCode] = useState('');
  const [otpTimeLeft, setOtpTimeLeft] = useState(600); // 10 minutes in seconds
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  // Timer for OTP expiration
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (telegramState === 'waiting-otp' && otpTimeLeft > 0) {
      interval = setInterval(() => {
        setOtpTimeLeft(prev => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [telegramState, otpTimeLeft]);

  // Format time as MM:SS
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const generateRandomOTP = () => {
    return Math.random().toString().slice(2, 8);
  };

  const handleTelegramConnect = () => {
    // Redirect to Telegram bot
    window.open('https://t.me/FractionAINotificationsBot', '_blank');
    
    // Start OTP flow
    setTelegramState('waiting-otp');
    setOtpTimeLeft(600); // Reset to 10 minutes
    setOtpCode(generateRandomOTP());
  };

  const handleOtpRefresh = () => {
    setIsRefreshing(true);
    setOtpCode(generateRandomOTP());
    setOtpTimeLeft(600); // Reset to 10 minutes
    
    // Simulate refresh animation
    setTimeout(() => {
      setIsRefreshing(false);
    }, 1000);
  };

  const handleCopyOtp = async () => {
    try {
      await navigator.clipboard.writeText(otpCode);
      setIsCopied(true);
      toast({
        description: "Copied to clipboard",
        duration: 2000,
      });
      
      // Reset copy state after animation
      setTimeout(() => {
        setIsCopied(false);
      }, 1000);
    } catch (err) {
      console.error('Failed to copy OTP:', err);
    }
  };

  const handleConnect = (socialKey: string) => {
    if (socialKey === 'telegram') {
      handleTelegramConnect();
      return;
    }

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
    <>
      {/* Backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-40 transition-opacity duration-300"
          onClick={onClose}
        />
      )}
      
      {/* Sidebar */}
      <div className={`
        fixed right-0 top-0 h-full w-96 bg-gray-900/95 border-l border-amber-500/40 backdrop-blur-xl z-50 shadow-2xl shadow-amber-500/20
        transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : 'translate-x-full'}
      `}>
        <div className="p-6 h-full overflow-y-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <h2 className="text-xl font-bold text-gray-200">Connect Socials</h2>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="text-gray-400 hover:text-gray-200 hover:bg-gray-800/50 border border-amber-500/30 hover:border-amber-500/50 transition-all"
            >
              <X className="w-5 h-5" />
            </Button>
          </div>

          {/* Bonus Badge */}
          <div className="mb-6 p-4 bg-amber-500/25 rounded-xl border border-amber-500/40 shadow-sm shadow-amber-500/20">
            <div className="flex items-center space-x-2 mb-2">
              <span className="text-sm font-semibold text-amber-300">Special Bonus</span>
            </div>
            <p className="text-sm text-gray-300">
              Connect all social accounts and earn an additional <span className="text-amber-400 font-semibold">+250 FAPS</span> bonus!
            </p>
          </div>

          {/* Social Connections */}
          <div className="space-y-4">
            {socialConnections.map((social, index) => (
              <div 
                key={index}
                className={`rounded-xl p-4 border transition-all duration-300 hover:shadow-md hover:shadow-amber-500/15 hover:scale-[1.02] ${
                  social.connected
                    ? 'bg-orange-500/20 border-orange-500/50 shadow-lg shadow-orange-500/15' 
                    : highlightedBox === social.key 
                      ? 'border-orange-500 bg-orange-500/10 shadow-lg shadow-orange-500/20' 
                      : 'bg-gray-800/60 border-amber-500/30 hover:border-amber-500/50'
                }`}
              >
                <div className="flex items-start space-x-4">
                  <div className={`w-12 h-12 rounded-xl ${social.color} flex items-center justify-center flex-shrink-0 shadow-sm border border-amber-500/20`}>
                    <social.icon className="w-6 h-6 text-white" />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold text-gray-200">{social.name}</h3>
                      {social.connected ? (
                        <CheckCheck className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                      ) : social.key === 'telegram' && telegramState === 'waiting-otp' ? (
                        <span className="text-xs text-amber-400">Waiting...</span>
                      ) : (
                        <Button 
                          size="sm"
                          onClick={() => handleConnect(social.key)}
                          className="bg-amber-600 hover:bg-amber-700 text-black font-medium transition-all duration-300 shadow-sm shadow-amber-500/20 border border-amber-500/30"
                        >
                          Connect
                          <ExternalLink className="w-3 h-3 ml-1" />
                        </Button>
                      )}
                    </div>
                    
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-sm text-gray-400">{social.description}</p>
                      <span className={`text-xs font-medium ${social.connected ? 'text-amber-400' : 'text-green-400'}`}>
                        {social.reward}
                      </span>
                    </div>

                    {social.connected && (
                      <p className="text-xs text-amber-400 font-medium">{getConnectionDisplay(social.key)}</p>
                    )}

                    {/* Telegram OTP Section */}
                    {social.key === 'telegram' && telegramState === 'waiting-otp' && (
                      <div className="mt-4 -ml-20 -mr-6 p-6 bg-gray-800/80 rounded-lg border border-amber-500/20 w-[calc(100%+6.5rem)]">
                        <div className="space-y-4">
                          <div className="flex items-center justify-between w-full gap-3">
                            <div className="flex items-center bg-gray-700/50 px-4 py-3 rounded-md border border-amber-500/20 flex-1">
                              <span className="text-lg font-mono text-amber-400 tracking-wider">{otpCode}</span>
                            </div>
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={handleCopyOtp}
                              className="text-gray-400 hover:text-amber-400 p-2 h-10 w-10 hover:bg-transparent"
                              title={isCopied ? "Copied!" : "Copy to clipboard"}
                            >
                              <Copy className={`w-4 h-4 transition-all duration-300 ${isCopied ? 'fill-current' : ''}`} />
                            </Button>
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={handleOtpRefresh}
                              disabled={isRefreshing}
                              className="text-gray-400 hover:text-amber-400 p-2 h-10 w-10 hover:bg-transparent"
                              title="Refresh code"
                            >
                              <RotateCcw className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''} ${isRefreshing ? '-rotate-180' : ''}`} />
                            </Button>
                          </div>
                          
                          <div className="text-center space-y-1">
                            <p className="text-xs text-gray-400">
                              Enter the OTP in the "Fraction AI Notifications" bot on Telegram.
                            </p>
                            <p className="text-xs text-amber-400 font-medium">
                              OTP expires in {formatTime(otpTimeLeft)}
                            </p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Footer */}
          <div className="mt-8 p-4 bg-gray-800/60 rounded-xl border border-amber-500/30 shadow-sm shadow-amber-500/15">
            <div className="text-center">
              <p className="text-sm text-gray-400 mb-2">
                Total potential earnings:
              </p>
              <p className="text-lg font-bold text-amber-400">
                +1,400 FAPS
              </p>
              <p className="text-xs text-gray-500 mt-1">
                Connect all accounts to maximize your rewards
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
