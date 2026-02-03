export default function Footer() {
  return (
    <footer className="py-6 px-8 text-center text-sm text-slate-400 border-t border-slate-100 bg-white/50">
      © {new Date().getFullYear()} SmartShop — Managed by Mustapha
    </footer>
  );
}