const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="w-full border-t border-slate-200 bg-slate-950 text-slate-200">
      <div className="mx-auto max-w-7xl px-4 md:px-6 py-10 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="space-y-3">
          <p className="text-sm font-semibold text-white">Mediatheque</p>
          <p className="text-xs text-slate-400 leading-relaxed">
            Creative photo platform inspired by modern visual libraries.
            Discover, publish, and track your work in one place.
          </p>
        </div>

        <div>
          <p className="text-sm font-semibold text-white mb-3">Product</p>
          <ul className="space-y-2 text-xs text-slate-400">
            <li>Explore photos</li>
            <li>Collections</li>
            <li>Popular tags</li>
            <li>Analytics</li>
            <li>FAQ</li>
          </ul>
        </div>

        <div>
          <p className="text-sm font-semibold text-white mb-3">Company</p>
          <ul className="space-y-2 text-xs text-slate-400">
            <li>About</li>
            <li>Careers</li>
            <li>Press kit</li>
            <li>Contact</li>
          </ul>
        </div>

        <div>
          <p className="text-sm font-semibold text-white mb-3">Legal</p>
          <ul className="space-y-2 text-xs text-slate-400">
            <li>Terms of service</li>
            <li>Privacy policy</li>
            <li>Cookies</li>
            <li>Licensing</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-slate-800">
        <div className="mx-auto max-w-7xl px-4 md:px-6 py-3 text-xs text-slate-500 flex flex-col md:flex-row gap-2 md:items-center md:justify-between">
          <p>(c) {year} Mediatheque. All rights reserved.</p>
          <p>Built by Rojo Tina with React + TypeScript.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
