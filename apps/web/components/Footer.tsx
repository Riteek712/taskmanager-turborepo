'use client';

const Footer = () => {
  return (
    <footer className="fixed bottom-0 w-full bg-neutral-900 border-t border-neutral-800 py-2">
      <div className="container mx-auto px-4">
        <p className="text-neutral-400 text-sm text-center">
          Made by{' '}
          <a 
            href="https://github.com/Riteek712" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-purple-500 hover:text-purple-400 transition-colors"
          >
            Riteek Rakesh
          </a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;