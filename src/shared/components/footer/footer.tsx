const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="w-full border-t border-slate-800 bg-slate-950 text-slate-200 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100">
      <div className="mx-auto max-w-7xl px-4 md:px-6 py-10 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="space-y-3">
          <p className="text-sm font-semibold">Mediatheque</p>
          <p className="text-xs text-slate-400 dark:text-slate-300 leading-relaxed">
            Creative photo platform inspired by modern visual libraries.
            Discover, publish, and track your work in one place.
          </p>
        </div>

        <div>
          <p className="text-sm font-semibold mb-3">Product</p>
          <ul className="space-y-2 text-xs text-slate-400 dark:text-slate-300">
            <li>Explore photos</li>
            <li>Collections</li>
            <li>Popular tags</li>
            <li>Analytics</li>
            <li>FAQ</li>
          </ul>
        </div>

        <div>
          <p className="text-sm font-semibold mb-3">Company</p>
          <ul className="space-y-2 text-xs text-slate-400 dark:text-slate-300">
            <li>About</li>
            <li>Careers</li>
            <li>Press kit</li>
            <li>Contact</li>
          </ul>
        </div>

        <div>
          <p className="text-sm font-semibold mb-3">Legal</p>
          <ul className="space-y-2 text-xs text-slate-400 dark:text-slate-300">
            <li>Terms of service</li>
            <li>Privacy policy</li>
            <li>Cookies</li>
            <li>Licensing</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-slate-800 dark:border-slate-700">
        <div className="mx-auto max-w-7xl px-4 md:px-6 py-3 text-xs text-slate-500 dark:text-slate-400 flex flex-col md:flex-row gap-2 md:items-center md:justify-between">
          <p>(c) {year} Mediatheque. All rights reserved.</p>
          <p>Built by Rojo Tina with React + TypeScript.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
