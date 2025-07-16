
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { 
  Trophy, 
  TrendingUp, 
  Calendar, 
  Flame, 
  Star, 
  Zap, 
  Clock, 
  Target, 
  Award,
  X,
  MessageCircle,
  Phone,
  Mail,
  Link2,
  Sparkles
} from 'lucide-react';
import { SocialsInline } from '@/components/SocialsInline';
import { SocialsSidebar } from '@/components/SocialsSidebar';

const Index = () => {
  const [showSidebar, setShowSidebar] = useState(false);

  const statsCards = [
    {
      title: "Total Earnings",
      value: "0.00",
      currency: "FAPS",
      subtitle: "Your Rank: #NA",
      icon: Trophy,
      gradient: "from-amber-600/30 to-orange-600/30"
    },
    {
      title: "Daily Earnings",
      value: "0.00", 
      currency: "FAPS",
      subtitle: "+0.0% vs last day",
      change: "+0.0%",
      icon: Calendar,
      gradient: "from-amber-600/30 to-yellow-600/30"
    },
    {
      title: "Weekly Earnings",
      value: "0.00",
      currency: "FAPS", 
      subtitle: "+0.0% vs last week",
      change: "+0.0%",
      icon: TrendingUp,
      gradient: "from-yellow-600/30 to-amber-600/30"
    },
    {
      title: "Current Streak",
      value: "0",
      currency: "days",
      subtitle: "in a row",
      icon: Flame,
      gradient: "from-orange-600/30 to-red-600/30"
    }
  ];

  const achievements = [
    {
      title: "First Touch",
      description: "Earn your first 250 FAPS",
      progress: 0,
      bonus: "+25 bonus FAPS",
      icon: Star,
      color: "text-amber-400"
    },
    {
      title: "Rapid Fire", 
      description: "Post 50 original tweets",
      progress: 0,
      bonus: "+50 bonus FAPS",
      icon: Zap,
      color: "text-amber-400"
    },
    {
      title: "Rhythm Keeper",
      description: "14-day engagement streak", 
      progress: 0,
      bonus: "+100 bonus FAPS",
      icon: Clock,
      color: "text-amber-400"
    },
    {
      title: "Almost There",
      description: "Earn 5,000 FAPS",
      progress: 0, 
      bonus: "+250 bonus FAPS",
      icon: Target,
      color: "text-amber-400"
    },
    {
      title: "Stroke of Genius",
      description: "Get 5000+ total likes",
      progress: 0,
      bonus: "+250 bonus FAPS", 
      icon: Award,
      color: "text-amber-400"
    },
    {
      title: "FAP God",
      description: "Earn 10,000+ FAPS",
      progress: 0,
      bonus: "+500 bonus FAPS",
      icon: Trophy,
      color: "text-amber-400"
    }
  ];

  return (
    <div className="min-h-screen bg-black">
      {/* Header */}
      <header className="border-b border-amber-500/20 bg-black/90 backdrop-blur-xl">
        <div className="max-w-[1424px] mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-gradient-to-r from-amber-500 to-orange-600 rounded-lg flex items-center justify-center font-bold text-black">
                F
              </div>
              <h1 className="text-2xl font-bold text-amber-400">Faps</h1>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <div className="text-sm text-gray-400">💳 20369.52 USDC</div>
                <Button className="bg-emerald-600 hover:bg-emerald-700 text-white ml-2">
                  Deposit ↓
                </Button>
              </div>
              <div className="flex items-center space-x-2 bg-gray-800/80 border border-amber-500/20 rounded-lg px-3 py-2">
                <div className="w-6 h-6 bg-green-500 rounded-full"></div>
                <span className="text-gray-300 text-sm">🌐 VisitingShrew9678</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-[1424px] mx-auto px-6 py-8">
        {/* Connect Socials Button */}
        <div className="flex justify-end mb-6">
          <button
            onClick={() => setShowSidebar(true)}
            className="text-sm text-amber-400 hover:text-amber-300 transition-colors cursor-pointer font-medium"
          >
            Connect Socials and Earn FAPS →
          </button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {statsCards.map((stat, index) => (
            <Card key={index} className="bg-gray-900/80 border-amber-500/30 backdrop-blur-sm hover:scale-105 transition-all duration-300 hover:shadow-lg hover:shadow-amber-500/20">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${stat.gradient} border border-amber-500/30 flex items-center justify-center`}>
                    <stat.icon className="w-6 h-6 text-amber-400" />
                  </div>
                  {stat.change && (
                    <Badge variant="secondary" className="bg-green-500/20 text-green-400 border-green-500/30">
                      {stat.change}
                    </Badge>
                  )}
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-gray-400">{stat.title}</p>
                  <div className="flex items-baseline space-x-2">
                    <span className="text-3xl font-bold text-gray-200">{stat.value}</span>
                    <span className="text-lg font-semibold bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">
                      🪙 {stat.currency}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500">{stat.subtitle}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* X Engagement Rewards */}
        <Card className="bg-gray-900/80 border-amber-500/30 backdrop-blur-sm mb-8 hover:scale-[1.02] transition-all duration-300 hover:shadow-lg hover:shadow-amber-500/20">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-3">
                <X className="w-6 h-6 text-gray-200" />
                <h2 className="text-xl font-bold text-gray-200">Engagement Rewards</h2>
              </div>
              <Button className="bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-black font-semibold border border-amber-500/30 shadow-lg shadow-amber-500/20">
                Connect X Account
              </Button>
            </div>
            <p className="text-gray-300 mb-6">
              Connect your X account and earn FAPS for posting about Fraction AI and for every comment, retweet, or quote on posts that mention us.
            </p>

            {/* Achievements Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
              {achievements.map((achievement, index) => (
                <div key={index} className="bg-gray-800/60 rounded-xl p-4 border border-amber-500/20 hover:border-amber-500/40 transition-all duration-300 hover:scale-105 hover:shadow-md hover:shadow-amber-500/10">
                  <div className="flex items-center space-x-3 mb-3">
                    <achievement.icon className={`w-5 h-5 ${achievement.color}`} />
                    <h3 className="font-semibold text-gray-200">{achievement.title}</h3>
                  </div>
                  <p className="text-sm text-gray-400 mb-3">{achievement.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-500">{achievement.progress}% complete</span>
                    <span className="text-xs text-amber-400">{achievement.bonus}</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2 mt-2">
                    <div 
                      className="bg-gradient-to-r from-amber-500 to-orange-600 h-2 rounded-full transition-all duration-500"
                      style={{ width: `${achievement.progress}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>


        {/* Chart Section */}
        <Card className="bg-gray-900/80 border-amber-500/30 backdrop-blur-sm mb-8 hover:scale-[1.02] transition-all duration-300 hover:shadow-lg hover:shadow-amber-500/20">
          <CardContent className="p-6">
            <h3 className="text-lg font-bold text-gray-200 mb-4">Daily Earnings, FAPS (Last 30 days)</h3>
            <div className="h-64 flex items-center justify-center text-gray-500">
              <div className="text-center">
                <Sparkles className="w-12 h-12 mx-auto mb-2 opacity-50 text-amber-400" />
                <p className="text-gray-400">Chart will appear here once you start earning FAPS</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card className="bg-gray-900/80 border-amber-500/30 backdrop-blur-sm hover:scale-[1.02] transition-all duration-300 hover:shadow-lg hover:shadow-amber-500/20">
          <CardContent className="p-6">
            <h3 className="text-lg font-bold text-gray-200 mb-4">Recent Activity</h3>
            <div className="text-center py-8">
              <div className="text-amber-400 mb-2">No Activity detected.</div>
              <p className="text-sm text-gray-400">
                Earn FAPS by posting about <span className="text-amber-400 font-semibold">Fraction AI</span> or by commenting, retweeting, or quoting posts that mention <span className="text-amber-400 font-semibold">Fraction AI</span>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Sidebar */}
      <SocialsSidebar isOpen={showSidebar} onClose={() => setShowSidebar(false)} />
    </div>
  );
};

export default Index;
