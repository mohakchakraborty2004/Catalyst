'use client';

import { motion } from 'framer-motion';
import { redirect } from 'next/navigation';

const features = [
  {
    title: "Startup Networking with YnotNow",
    desc: `Catalyst enables early-stage founders to post their projects via our YnotNow system — a Web3-native platform for finding co-builders. Users can apply to contribute or directly fund projects using Solana, fostering instant collaboration and decentralized investment.`,
  },
  {
    title: "VORTEX – AI-Powered Community Engine",
    desc: `VORTEX is Catalyst’s neural heart. It analyzes community issues, categorizes them using intelligent tagging, and automatically routes each problem to the right contributors, experts, or moderators — making community problem-solving seamless.`,
  },
  {
    title: "Web3 Moderator Markets",
    desc: `Moderators are no longer just gatekeepers — they're assets. Catalyst turns moderation into a tradable role. Users can "bet" on moderators based on performance, turning reputation and consistency into economic value using Solana.`,
  },
  {
    title: "Risk-Free Hackathons",
    desc: `Join live projects and startups through time-boxed hackathons without upfront commitments. Get hands-on experience, exposure, and the chance to earn rewards or become a core contributor — without financial risk.`,
  },
  {
    title: "Catalyzers – Power Users of the Future",
    desc: `The best users on Catalyst are known as Catalyzers. You can support them like creators on-chain — back their growth, track their success, and profit from their impact in the community.`,
  },
];

export default function LearnMorePage() {
  return (
    <div
      className="min-h-screen bg-cover bg-center bg-no-repeat  bg-fixed overflow-auto"
      style={{ backgroundImage: "url('https://wallpapercave.com/wp/wp8974127.jpg')" }}
    >
      <div className="bg-black bg-opacity-60 min-h-screen">
        {/* Content */}
        <main className="relative z-10 px-6 py-24 max-w-5xl mx-auto">
          {/* Hero Section */}
          <motion.h1
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-4xl md:text-6xl font-extrabold text-center bg-gradient-to-r from-yellow-400 to-yellow-300 bg-clip-text text-transparent mb-6"
          >
            Learn More About Catalyst
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-center text-lg md:text-xl text-white/80 max-w-3xl mx-auto mb-20"
          >
            Catalyst is your gateway to a new way of building, solving, and collaborating. Powered by AI, Web3, and community energy — here’s everything that makes Catalyst extraordinary.
          </motion.p>

          {/* Features Section */}
          <div className="space-y-12">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                viewport={{ once: true }}
                className="bg-white/5 border border-yellow-400/30 backdrop-blur-sm p-6 rounded-xl hover:scale-[1.02] transition-transform"
              >
                <h3 className="text-2xl font-semibold text-yellow-400 mb-3">{feature.title}</h3>
                <p className="text-white/90 text-lg">{feature.desc}</p>
              </motion.div>
            ))}
          </div>

          {/* CTA */}
          <div className="text-center mt-24">
            <motion.h3
              whileInView={{ opacity: 1 }}
              initial={{ opacity: 0 }}
              transition={{ delay: 0.2 }}
              className="text-2xl font-bold text-white mb-4"
            >
              Ready to become a Catalyzer?
            </motion.h3>
            <div className="flex justify-center gap-4 flex-wrap">
              <button 
              onClick={()=> {
                redirect('/startups');
              }}
              className="px-6 py-2 rounded-full bg-yellow-400 text-black hover:bg-yellow-300 font-medium transition">
                Apply to Projects
              </button>
              <button
               onClick={()=> {
                redirect('/startups');
              }}
              className="px-6 py-2 rounded-full border border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-black transition">
                Fund via Solana
              </button>
              <button 
               onClick={()=> {
                redirect('/vortex');
              }}
              className="px-6 py-2 rounded-full bg-white text-black hover:bg-gray-100 transition">
                Join the Community
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
