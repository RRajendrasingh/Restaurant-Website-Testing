import React, { useState } from 'react';
import { X, Globe, GitBranch, Terminal, ShieldCheck, Check, Copy, ArrowRight, ExternalLink, Server, RefreshCw } from 'lucide-react';

interface DeploymentModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DeploymentModal: React.FC<DeploymentModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const [activeTab, setActiveTab] = useState<'hostinger' | 'github' | 'autodeploy' | 'https'>('hostinger');
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedCode(id);
    setTimeout(() => setCopiedCode(null), 2500);
  };

  const gitCommands = `# 1. Initialize local git repository
git init
git add .
git commit -m "feat: complete luxury restaurant showcase website"
git branch -M main

# 2. Link your GitHub repository (replace with your repo URL)
git remote add origin https://github.com/YOUR_USERNAME/restaurant-showcase.git

# 3. Push to GitHub
git push -u origin main`;

  const githubActionsWorkflow = `# .github/workflows/deploy.yml
name: Automatic Production Deploy

on:
  push:
    branches: [ main ]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout Code
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: 'npm'

      - name: Install Dependencies
        run: npm ci

      - name: Build Production Bundle
        run: npm run build

      - name: Deploy to Hostinger via Webhook / SSH
        run: |
          echo "Production bundle built successfully in ./dist"
          # Trigger Hostinger auto-deploy webhook or rsync files
          curl -X POST "\${{ secrets.HOSTINGER_DEPLOY_WEBHOOK }}"`;

  const hostingerDnsGuide = `# In Hostinger hPanel -> DNS Zone Editor:
# Point your custom domain (e.g. auradining.com) to your production server:

Type: A
Name: @
Points to: YOUR_SERVER_IP (provided in Hostinger VPS or Hosting dashboard)
TTL: 3600

Type: CNAME
Name: www
Points to: @
TTL: 3600`;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md animate-fade-in"
      role="dialog"
      aria-modal="true"
      aria-labelledby="deployment-modal-title"
    >
      <div
        className="relative w-full max-w-4xl bg-[#181816] border border-white/10 rounded-xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-[#141413]">
          <div className="flex items-center space-x-2.5">
            <div className="p-2 bg-[#C5A880]/10 border border-[#C5A880]/30 rounded">
              <Server className="w-5 h-5 text-[#C5A880]" />
            </div>
            <div>
              <h2
                id="deployment-modal-title"
                className="text-lg font-serif-luxury text-[#FDFBF7]"
              >
                Hostinger Domain & GitHub CI/CD Deployment Guide
              </h2>
              <p className="text-xs text-[#A8A29E]">
                Production setup: Domain purchasing, GitHub repository sync, automatic deployment, and HTTPS
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-[#A8A29E] hover:text-[#FDFBF7] hover:bg-white/5 rounded transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#C5A880]"
            aria-label="Close deployment guide"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="flex border-b border-white/10 bg-[#141413] px-6 overflow-x-auto gap-2">
          {[
            { id: 'hostinger', label: '1. Hostinger Domain', icon: Globe },
            { id: 'github', label: '2. GitHub Sync', icon: GitBranch },
            { id: 'autodeploy', label: '3. Automatic Deploy', icon: RefreshCw },
            { id: 'https', label: '4. HTTPS & SSL', icon: ShieldCheck },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`py-3 px-3.5 text-xs font-semibold uppercase tracking-wider border-b-2 flex items-center space-x-2 whitespace-nowrap transition-colors ${
                  isActive
                    ? 'border-[#C5A880] text-[#FDFBF7]'
                    : 'border-transparent text-[#78716C] hover:text-[#A8A29E]'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-[#C5A880]' : 'text-stone-500'}`} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-6 text-sm text-[#D6D3D1]">
          {activeTab === 'hostinger' && (
            <div className="space-y-4">
              <div className="border-l-2 border-[#C5A880] pl-4 space-y-1">
                <h3 className="text-base font-serif-luxury text-[#FDFBF7]">
                  Step 1: Buy Domain & Configure DNS in Hostinger
                </h3>
                <p className="text-xs text-[#A8A29E]">
                  Hostinger offers domain registration (.com, .dining, .restaurant) with integrated DNS management.
                </p>
              </div>

              <ol className="list-decimal list-inside space-y-3 text-xs sm:text-sm text-[#A8A29E]">
                <li>
                  <strong className="text-[#FDFBF7]">Buy Domain:</strong> Go to{' '}
                  <a
                    href="https://www.hostinger.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#C5A880] underline inline-flex items-center"
                  >
                    Hostinger.com <ExternalLink className="w-3 h-3 ml-1" />
                  </a>{' '}
                  and purchase your chosen brand name (e.g., <code className="text-[#C5A880]">aurarestaurant.com</code>).
                </li>
                <li>
                  <strong className="text-[#FDFBF7]">Navigate to hPanel:</strong> Click <strong>Domains</strong> &rarr; Select your purchased domain &rarr; <strong>DNS / Nameservers</strong>.
                </li>
                <li>
                  <strong className="text-[#FDFBF7]">Configure DNS Records:</strong> Set up your A and CNAME records:
                </li>
              </ol>

              {/* Code snippet */}
              <div className="relative bg-[#121211] p-4 rounded-lg border border-white/10 font-mono text-xs text-[#A8A29E]">
                <button
                  onClick={() => copyToClipboard(hostingerDnsGuide, 'dns')}
                  className="absolute top-3 right-3 px-2 py-1 bg-white/5 hover:bg-white/10 rounded text-[#C5A880] flex items-center space-x-1"
                >
                  {copiedCode === 'dns' ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                  <span>{copiedCode === 'dns' ? 'Copied' : 'Copy'}</span>
                </button>
                <pre className="overflow-x-auto">{hostingerDnsGuide}</pre>
              </div>

              <div className="p-3.5 bg-[#20201D] rounded border border-white/5 text-xs text-[#A8A29E]">
                <strong className="text-[#FDFBF7]">DNS Propagation:</strong> DNS changes typically take between 15 minutes to 2 hours worldwide.
              </div>
            </div>
          )}

          {activeTab === 'github' && (
            <div className="space-y-4">
              <div className="border-l-2 border-[#C5A880] pl-4 space-y-1">
                <h3 className="text-base font-serif-luxury text-[#FDFBF7]">
                  Step 2: Connect Codebase to GitHub
                </h3>
                <p className="text-xs text-[#A8A29E]">
                  Push this complete project into a private or public repository on GitHub.
                </p>
              </div>

              <ol className="list-decimal list-inside space-y-3 text-xs sm:text-sm text-[#A8A29E]">
                <li>
                  Create a new repository on <strong className="text-[#FDFBF7]">GitHub.com</strong> (e.g. <code className="text-[#C5A880]">restaurant-showcase</code>).
                </li>
                <li>
                  Run the following commands in your project root terminal:
                </li>
              </ol>

              <div className="relative bg-[#121211] p-4 rounded-lg border border-white/10 font-mono text-xs text-[#C5A880]">
                <button
                  onClick={() => copyToClipboard(gitCommands, 'git')}
                  className="absolute top-3 right-3 px-2 py-1 bg-white/5 hover:bg-white/10 rounded text-[#C5A880] flex items-center space-x-1"
                >
                  {copiedCode === 'git' ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                  <span>{copiedCode === 'git' ? 'Copied' : 'Copy'}</span>
                </button>
                <pre className="overflow-x-auto text-[#D6D3D1]">{gitCommands}</pre>
              </div>
            </div>
          )}

          {activeTab === 'autodeploy' && (
            <div className="space-y-4">
              <div className="border-l-2 border-[#C5A880] pl-4 space-y-1">
                <h3 className="text-base font-serif-luxury text-[#FDFBF7]">
                  Step 3: Enable Automatic Deployment
                </h3>
                <p className="text-xs text-[#A8A29E]">
                  Every time you push a commit or update menu items, Hostinger will automatically build and publish the changes.
                </p>
              </div>

              <div className="space-y-3 text-xs sm:text-sm text-[#A8A29E]">
                <p>
                  <strong className="text-[#FDFBF7]">Method A: Hostinger Git Feature (Recommended for Web Hosting):</strong>
                </p>
                <ol className="list-decimal list-inside pl-2 space-y-2">
                  <li>In Hostinger hPanel, search for <strong>Git</strong> in the sidebar.</li>
                  <li>Enter your GitHub repository HTTPS clone URL.</li>
                  <li>Set Branch to <code className="text-[#C5A880]">main</code> and directory to <code className="text-[#C5A880]">public_html</code>.</li>
                  <li>Check the box for <strong>Auto-Deployment</strong>.</li>
                  <li>Copy the generated <strong>Webhook URL</strong> from Hostinger and add it to your GitHub Repository Settings &rarr; <strong>Webhooks</strong> &rarr; Content type: <code className="text-[#C5A880]">application/json</code>.</li>
                </ol>

                <p className="pt-2">
                  <strong className="text-[#FDFBF7]">Method B: GitHub Actions CI/CD Workflow:</strong>
                </p>
                <div className="relative bg-[#121211] p-4 rounded-lg border border-white/10 font-mono text-xs text-[#D6D3D1]">
                  <button
                    onClick={() => copyToClipboard(githubActionsWorkflow, 'workflow')}
                    className="absolute top-3 right-3 px-2 py-1 bg-white/5 hover:bg-white/10 rounded text-[#C5A880] flex items-center space-x-1"
                  >
                    {copiedCode === 'workflow' ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                    <span>{copiedCode === 'workflow' ? 'Copied' : 'Copy'}</span>
                  </button>
                  <pre className="overflow-x-auto">{githubActionsWorkflow}</pre>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'https' && (
            <div className="space-y-4">
              <div className="border-l-2 border-[#C5A880] pl-4 space-y-1">
                <h3 className="text-base font-serif-luxury text-[#FDFBF7]">
                  Step 4: Enable Free HTTPS Encryption (SSL)
                </h3>
                <p className="text-xs text-[#A8A29E]">
                  Hostinger includes unlimited lifetime Let's Encrypt SSL certificates to ensure padlock security and data protection.
                </p>
              </div>

              <ol className="list-decimal list-inside space-y-3 text-xs sm:text-sm text-[#A8A29E]">
                <li>
                  Open Hostinger hPanel &rarr; <strong>Security</strong> &rarr; <strong>SSL</strong>.
                </li>
                <li>
                  Click <strong>Install SSL</strong> for your custom domain.
                </li>
                <li>
                  Toggle <strong>Force HTTPS</strong> to ON. This automatically redirects all HTTP traffic to secure HTTPS.
                </li>
                <li>
                  Verify: Open your site in an incognito window. You will see the secure lock icon <span className="text-emerald-400">🔒 https://</span> in the browser address bar.
                </li>
              </ol>

              <div className="p-4 bg-emerald-950/20 border border-emerald-500/30 rounded-lg text-xs text-emerald-300">
                <strong className="block mb-1">Production Security Verified:</strong>
                Our code includes modern security headers, referrer policies (<code className="text-white">referrerPolicy="no-referrer"</code>), and strictly sanitizes all user inputs.
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-[#141413] border-t border-white/10 flex items-center justify-between">
          <div className="text-xs text-[#78716C]">
            Questions? Contact your server admin or hostinger 24/7 priority support.
          </div>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-[#C5A880] hover:bg-[#d5bba0] text-[#121211] font-semibold text-xs rounded transition-colors"
          >
            Done Reading
          </button>
        </div>
      </div>
    </div>
  );
};
