"use client";

import React, { useState, useEffect } from "react";

const TYPING_SPEED = 50;

function Typewriter({ text }: { text: string }) {
  const [displayedText, setDisplayedText] = useState("");
  useEffect(() => {
    let i = 0;
    setDisplayedText("");
    const intervalId = setInterval(() => {
      setDisplayedText(text.slice(0, i + 1));
      i++;
      if (i >= text.length) clearInterval(intervalId);
    }, TYPING_SPEED);
    return () => clearInterval(intervalId);
  }, [text]);

  return <span>{displayedText}</span>;
}

export default function Home() {
  const [demoInput, setDemoInput] = useState("Write a React hook for dark mode");
  const [demoOutput, setDemoOutput] = useState("");
  const [demoRunning, setDemoRunning] = useState(false);

  const runDemo = () => {
    setDemoRunning(true);
    setDemoOutput("");
    const fullMockOutput = `import { useState, useEffect } from 'react';\n\nexport function useDarkMode() {\n  const [isDark, setIsDark] = useState(false);\n  useEffect(() => {\n    setIsDark(document.documentElement.classList.contains('dark'));\n  }, []);\n  return isDark;\n}`;
    let i = 0;
    const interval = setInterval(() => {
      setDemoOutput(fullMockOutput.slice(0, i + 1));
      i++;
      if (i >= fullMockOutput.length) {
        clearInterval(interval);
        setDemoRunning(false);
      }
    }, 15);
  };

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-accent/30 flex flex-col font-sans">
      {/* NAV */}
      <nav className="sticky top-0 z-50 backdrop-blur-md bg-background/80 border-b border-border">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="font-mono font-bold text-xl tracking-tighter">
            brandoncode
          </div>
          <div className="hidden md:flex space-x-8 text-sm font-medium text-text-secondary">
            <a href="#docs" className="hover:text-foreground transition-colors">Docs</a>
            <a href="#pricing" className="hover:text-foreground transition-colors">Pricing</a>
            <a href="#github" className="hover:text-foreground transition-colors">GitHub</a>
          </div>
          <button className="bg-foreground text-background px-4 py-2 text-sm font-medium rounded hover:bg-white/90 transition-colors">
            Get Started
          </button>
        </div>
      </nav>

      {/* HERO */}
      <section className="pt-32 pb-24 px-6 flex flex-col items-center text-center max-w-4xl mx-auto">
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
          zilix is awesome
        </h1>
        <p className="text-xl text-text-secondary mb-10 max-w-2xl">
          Instantly generate, refactor, and debug code without leaving your command line. The fastest way to write software.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 mb-20">
          <button className="bg-accent text-white px-6 py-3 rounded text-sm font-medium hover:bg-accent/90 transition-colors">
            Install Now
          </button>
          <button className="bg-transparent border border-border text-foreground px-6 py-3 rounded text-sm font-medium hover:bg-surface transition-colors">
            View Docs
          </button>
        </div>
        
        {/* Hero Terminal */}
        <div className="w-full max-w-3xl border border-border rounded-lg bg-surface shadow-2xl overflow-hidden text-left">
          <div className="flex items-center px-4 py-3 border-b border-border bg-background">
            <div className="flex space-x-2">
              <div className="w-3 h-3 rounded-full bg-border opacity-50"></div>
              <div className="w-3 h-3 rounded-full bg-border opacity-50"></div>
              <div className="w-3 h-3 rounded-full bg-border opacity-50"></div>
            </div>
            <div className="ml-4 text-xs font-mono text-text-secondary">~/project</div>
          </div>
          <div className="p-6 font-mono text-sm leading-relaxed text-text-secondary h-48 overflow-auto">
            <span className="text-accent">❯</span> brandoncode "optimize this function"
            <br/><br/>
            <span className="text-foreground">
              <Typewriter text="Analyzing logic... Replacing nested loops with Set. Complexity reduced from O(n^2) to O(n)." />
            </span>
            <br/><br/>
            <span className="text-accent animate-pulse">_</span>
          </div>
        </div>
      </section>

      {/* LIVE DEMO / PLAYGROUND */}
      <section className="py-24 px-6 bg-surface border-y border-border">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight mb-4">See it in action</h2>
            <p className="text-text-secondary">Try a prompt to see how brandoncode writes code for you directly in the terminal.</p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-px bg-border rounded-lg overflow-hidden border border-border">
            {/* Left Box (Input) */}
            <div className="bg-background flex flex-col relative h-[400px]">
              <div className="p-4 border-b border-border text-xs font-mono font-bold text-text-secondary uppercase">
                Input Prompt
              </div>
              <textarea 
                className="flex-1 w-full p-6 bg-transparent resize-none outline-none font-mono text-sm text-foreground placeholder:text-text-secondary/50"
                value={demoInput}
                onChange={(e) => setDemoInput(e.target.value)}
                placeholder="Type your command..."
              />
              <div className="absolute bottom-6 right-6">
                <button 
                  onClick={runDemo}
                  disabled={demoRunning}
                  className="bg-accent hover:bg-accent/90 disabled:opacity-50 text-white font-mono text-xs px-4 py-2 rounded shadow flex items-center gap-2 transition-colors">
                  <span className="text-white/70">❯</span> Run
                </button>
              </div>
            </div>
            
            {/* Right Box (Output) */}
            <div className="bg-surface flex flex-col h-[400px]">
              <div className="p-4 border-b border-border text-xs font-mono font-bold text-text-secondary uppercase">
                brandoncode Output
              </div>
              <div className="p-6 font-mono text-sm text-text-secondary whitespace-pre overflow-auto flex-1">
                {demoOutput && (
                  <div className="text-foreground">
                    {demoOutput}
                    {demoRunning && <span className="inline-block w-2 bg-foreground ml-1 animate-pulse h-4 align-middle"/>}
                  </div>
                )}
                {!demoOutput && !demoRunning && (
                  <div className="text-text-secondary/50 italic">Output will appear here...</div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* DOCS / COMMAND REFERENCE */}
      <section id="docs" className="py-24 px-6 max-w-6xl mx-auto w-full">
        <h2 className="text-3xl font-bold tracking-tight mb-16 text-center">Powerful Commands. Simple Syntax.</h2>
        <div className="grid md:grid-cols-[250px_1fr] gap-12">
          {/* Sidebar */}
          <div className="flex md:flex-col space-x-4 md:space-x-0 space-y-0 md:space-y-2 overflow-x-auto pb-4 md:pb-0 text-sm font-medium text-text-secondary">
            <button className="text-foreground border-l-2 border-foreground pl-4 text-left whitespace-nowrap">Core Commands</button>
            <button className="hover:text-foreground border-l-2 border-transparent pl-4 text-left transition-colors whitespace-nowrap">Context Management</button>
            <button className="hover:text-foreground border-l-2 border-transparent pl-4 text-left transition-colors whitespace-nowrap">Configuration</button>
            <button className="hover:text-foreground border-l-2 border-transparent pl-4 text-left transition-colors whitespace-nowrap">Plugins</button>
          </div>
          
          {/* Details */}
          <div className="space-y-6">
            <div className="p-6 border border-border rounded-lg bg-surface">
              <div className="font-mono text-sm font-semibold mb-2 text-foreground">
                <span className="text-accent">brandoncode</span> chat <span className="text-text-secondary italic">--interactive</span>
              </div>
              <p className="text-text-secondary text-sm">Starts an interactive terminal chat session with the assistant directly connected to your workspace context.</p>
            </div>
            
            <div className="p-6 border border-border rounded-lg bg-surface">
              <div className="font-mono text-sm font-semibold mb-2 text-foreground">
                <span className="text-accent">brandoncode</span> fix <span className="text-text-secondary italic">./src/api.ts</span>
              </div>
              <p className="text-text-secondary text-sm">Analyzes the specified file for syntax errors or logical bugs, and automatically applies patches.</p>
            </div>
            
            <div className="p-6 border border-border rounded-lg bg-surface">
              <div className="font-mono text-sm font-semibold mb-2 text-foreground">
                <span className="text-accent">brandoncode</span> explain <span className="text-text-secondary italic">--lines 45-60</span>
              </div>
              <p className="text-text-secondary text-sm">Generates a detailed summary of what a specific code block does, breaking down complex logic.</p>
            </div>
            
            <div className="p-6 border border-border rounded-lg bg-surface">
              <div className="font-mono text-sm font-semibold mb-2 text-foreground">
                <span className="text-accent">brandoncode</span> init
              </div>
              <p className="text-text-secondary text-sm">Creates a local configuration file in your project to customize rules and ignore paths.</p>
            </div>
          </div>
        </div>
      </section>

      {/* INSTALL & PRICING */}
      <section id="pricing" className="py-24 px-6 bg-surface border-y border-border">
        <div className="max-w-6xl mx-auto">
          {/* Install Steps */}
          <div className="mb-32">
            <h2 className="text-3xl font-bold tracking-tight mb-12 text-center">Get Started in 3 Steps</h2>
            <div className="grid md:grid-cols-3 gap-8 relative">
              <div className="hidden md:block absolute top-[28px] left-[16.66%] right-[16.66%] h-px bg-border z-0"></div>
              
              <div className="relative z-10 flex flex-col items-center text-center">
                <div className="w-14 h-14 rounded-full bg-background border-2 border-border flex items-center justify-center font-bold text-lg mb-6">1</div>
                <h3 className="font-bold mb-4">Install</h3>
                <div className="bg-background border border-border rounded px-4 py-3 font-mono text-sm text-text-secondary w-full max-w-[280px]">
                  <span className="text-accent">npm</span> install -g brandoncode
                </div>
              </div>
              
              <div className="relative z-10 flex flex-col items-center text-center">
                <div className="w-14 h-14 rounded-full bg-background border-2 border-border flex items-center justify-center font-bold text-lg mb-6">2</div>
                <h3 className="font-bold mb-4">Configure</h3>
                <div className="bg-background border border-border rounded px-4 py-3 font-mono text-sm text-text-secondary w-full max-w-[280px]">
                  brandoncode auth
                </div>
              </div>
              
              <div className="relative z-10 flex flex-col items-center text-center">
                <div className="w-14 h-14 rounded-full bg-accent border-[4px] border-surface shadow-lg shadow-accent/20 flex items-center justify-center font-bold text-lg text-white mb-6">3</div>
                <h3 className="font-bold mb-4">Run</h3>
                <div className="bg-background border border-border rounded px-4 py-3 font-mono text-sm text-text-secondary w-full max-w-[280px] truncate" title='brandoncode "write me a React hook"'>
                  brandoncode "write..."
                </div>
              </div>
            </div>
          </div>

          {/* Pricing */}
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight mb-4">Simple, transparent pricing</h2>
            <p className="text-text-secondary">Start for free, upgrade when you need more power.</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Free Tier */}
            <div className="border border-border rounded-xl p-8 flex flex-col bg-background">
              <div className="mb-8">
                <h3 className="text-lg font-medium mb-2">Hobby</h3>
                <div className="text-4xl font-bold mb-2">$0<span className="text-lg font-normal text-text-secondary">/mo</span></div>
                <p className="text-sm text-text-secondary">Perfect for individual developers working on side projects.</p>
              </div>
              <ul className="space-y-4 mb-8 text-sm flex-1">
                <li className="flex items-start gap-3"><span className="text-accent">✓</span> 500 requests per month</li>
                <li className="flex items-start gap-3"><span className="text-accent">✓</span> Basic code generation</li>
                <li className="flex items-start gap-3"><span className="text-accent">✓</span> Standard support</li>
              </ul>
              <button className="w-full py-2 rounded bg-surface border border-border hover:bg-border transition-colors text-sm font-medium">Get Started</button>
            </div>
            
            {/* Pro Tier (Recommended) */}
            <div className="border border-accent rounded-xl p-8 flex flex-col bg-background relative shadow-[0_0_30px_-10px_rgba(99,102,241,0.2)]">
              <div className="absolute top-0 right-8 transform -translate-y-1/2">
                <span className="bg-accent text-white text-xs font-bold px-3 py-1 rounded-full">RECOMMENDED</span>
              </div>
              <div className="mb-8">
                <h3 className="text-lg font-medium mb-2 text-accent">Pro</h3>
                <div className="text-4xl font-bold mb-2">$15<span className="text-lg font-normal text-text-secondary">/mo</span></div>
                <p className="text-sm text-text-secondary">For professional developers who rely on AI daily.</p>
              </div>
              <ul className="space-y-4 mb-8 text-sm flex-1">
                <li className="flex items-start gap-3"><span className="text-accent">✓</span> Unlimited requests</li>
                <li className="flex items-start gap-3"><span className="text-accent">✓</span> Advanced context & logic analysis</li>
                <li className="flex items-start gap-3"><span className="text-accent">✓</span> Fast priority processing</li>
                <li className="flex items-start gap-3"><span className="text-accent">✓</span> Custom rules & configs</li>
              </ul>
              <button className="w-full py-2 rounded bg-accent text-white hover:bg-accent/90 transition-colors text-sm font-medium">Subscribe Now</button>
            </div>
            
            {/* Team Tier */}
            <div className="border border-border rounded-xl p-8 flex flex-col bg-background">
              <div className="mb-8">
                <h3 className="text-lg font-medium mb-2">Team</h3>
                <div className="text-4xl font-bold mb-2">$49<span className="text-lg font-normal text-text-secondary">/seat</span></div>
                <p className="text-sm text-text-secondary">For engineering teams building at scale.</p>
              </div>
              <ul className="space-y-4 mb-8 text-sm flex-1">
                <li className="flex items-start gap-3"><span className="text-accent">✓</span> Everything in Pro</li>
                <li className="flex items-start gap-3"><span className="text-accent">✓</span> Shared organization context</li>
                <li className="flex items-start gap-3"><span className="text-accent">✓</span> Admin dashboard & billing</li>
                <li className="flex items-start gap-3"><span className="text-accent">✓</span> SSO Integration</li>
              </ul>
              <button className="w-full py-2 rounded bg-surface border border-border hover:bg-border transition-colors text-sm font-medium">Contact Sales</button>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-12 px-6 border-t border-border">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="font-mono font-bold text-lg tracking-tighter">
            brandoncode
          </div>
          <div className="text-sm text-text-secondary">
            © {new Date().getFullYear()} brandoncode Inc. All rights reserved.
          </div>
          <div className="flex space-x-6 text-sm text-text-secondary">
            <a href="#" className="hover:text-foreground transition-colors">Twitter</a>
            <a href="#" className="hover:text-foreground transition-colors">GitHub</a>
            <a href="#" className="hover:text-foreground transition-colors">Discord</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
