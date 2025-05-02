import React, { useState, useEffect } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { Button } from "./ui/button";

// Track the last clicked link
let lastClickedLink = '';

// Auto-close popup after this many milliseconds (3 minutes = 180000ms)
const AUTO_CLOSE_DELAY = 180000;

const Popup = () => {
  const [isOpen, setIsOpen] = useState(false);

  // Function to handle the "Join Discord" button click
  const handleJoinDiscord = () => {
    // Open Discord in a new tab
    window.open('https://discord.gg/Qe9J74GrAY', '_blank');
    setIsOpen(false);
  };

  // Function to handle the "No thanks" button
  const handleNoThanks = () => {
    setIsOpen(false);
  };

  // Function to handle link click (still needed for external links)
  const handleLinkClick = (e) => {
    // Find the closest anchor tag
    const link = e.target.closest('a');
    if (!link) return;

    const href = link.getAttribute('href');
    if (!href) return;

    // Skip internal links
    if (href.startsWith('/') || href.startsWith('#')) return;

    // Skip if it's not an external link
    if (!href.startsWith('http') && !href.includes('://')) return;

    // Prevent default link behavior
    e.preventDefault();
    e.stopPropagation();

    // Store the clicked link
    lastClickedLink = href;

    // Open the link directly
    window.open(href, '_blank');
  };

  // Function to capture all links
  const captureExternalLinks = () => {
    // Use a global document click handler instead of individual link handlers
    document.addEventListener('click', handleLinkClick);
  };

  // Run once on mount - show popup automatically and set up auto-close
  useEffect(() => {
    // Add the global click handler for external links
    captureExternalLinks();

    // Show the popup automatically after a short delay
    const showTimer = setTimeout(() => {
      setIsOpen(true);
    }, 1000); // 1 second delay before showing

    // Set up auto-close timer
    const closeTimer = setTimeout(() => {
      setIsOpen(false);
    }, AUTO_CLOSE_DELAY);

    // Cleanup
    return () => {
      document.removeEventListener('click', handleLinkClick);
      clearTimeout(showTimer);
      clearTimeout(closeTimer);
    };
  }, []);

  return (
    <Dialog.Root open={isOpen} onOpenChange={setIsOpen}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-50 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
          <Dialog.Content className="fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] rounded-lg">
          <div className="flex flex-col space-y-1.5 text-center sm:text-left">
            <Dialog.Title className="text-2xl font-semibold text-slate-900 dark:text-white">
              Join AI DATA Foundation Discord
            </Dialog.Title>
            <Dialog.Description className="text-sm text-slate-600 dark:text-slate-400">
              Connect with fellow researchers and AI enthusiasts. Contribute to our tools directory, participate in discussions, and help shape the future of AI.
            </Dialog.Description>
          </div>

          <div className="relative overflow-hidden rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 p-6">
            {/* Discord-style graphic */}
            <div className="absolute -top-10 -right-10 w-24 h-24 bg-indigo-500/20 rounded-full"></div>
            <div className="absolute -bottom-8 -left-8 w-20 h-20 bg-cyan-500/20 rounded-full"></div>

            <div className="relative flex flex-col items-center text-center space-y-4">
              <div className="w-16 h-16 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 rounded-full flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.317 4.492c-1.53-.69-3.17-1.2-4.885-1.49a.075.075 0 0 0-.079.036c-.21.39-.444.885-.608 1.28a18.566 18.566 0 0 0-5.487 0 12.36 12.36 0 0 0-.617-1.28.077.077 0 0 0-.079-.036A19.4 19.4 0 0 0 3.677 4.492a.07.07 0 0 0-.032.027C.533 9.988-.32 15.285.099 20.505a.082.082 0 0 0 .031.057 19.54 19.54 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 12.88 12.88 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 13.79 13.79 0 0 0 .373-.297.074.074 0 0 1 .078-.01c3.927 1.793 8.18 1.793 12.061 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.297a.077.077 0 0 1-.006.127 12.79 12.79 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.49 19.49 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.647-.838-10.9-3.549-15.986a.061.061 0 0 0-.031-.03zM8.02 15.278c-1.182 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
                </svg>
              </div>
              <h3 className="text-lg font-medium text-slate-900 dark:text-white">Join Our Community</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Connect with AI researchers, developers, and enthusiasts. Get help, share ideas, and collaborate on projects.
              </p>
            </div>
          </div>

          <div className="flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2">
            <Dialog.Close asChild>
              <Button
                variant="outline"
                onClick={handleNoThanks}
              >
                No thanks, continue
              </Button>
            </Dialog.Close>
            <Button
              id="join-discord-button"
              onClick={handleJoinDiscord}
              className="bg-indigo-600 hover:bg-indigo-700"
            >
              Join Discord
            </Button>
          </div>

          <Dialog.Close className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
            <span className="sr-only">Close</span>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default Popup;
