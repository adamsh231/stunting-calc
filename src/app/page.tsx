import CalculatorForm from '@/components/CalculatorForm';
import { ThemeToggle } from '@/components/ThemeToggle';

export default function Home() {
  return (
    <main className="min-h-screen bg-[#fafbfc] dark:bg-slate-950 py-6 md:py-12 px-4 md:px-6 transition-colors font-sans selection:bg-blue-100 dark:selection:bg-blue-900/30">
      <div className="max-w-[1400px] mx-auto">
        <header className="flex flex-col items-center mb-8 md:mb-12 relative max-w-[1400px] mx-auto">
          <div className="absolute right-0 top-0 scale-75 md:scale-100">
            <ThemeToggle />
          </div>
          <div className="inline-flex items-center px-3 py-1 rounded-full bg-teal-50 dark:bg-teal-900/20 text-teal-600 dark:text-teal-400 text-[9px] md:text-[10px] font-black uppercase tracking-[0.2em] mb-4 md:mb-6 border border-teal-100 dark:border-teal-800/50">
            HEALTH DASHBOARD v1.1
          </div>
          <h1 className="text-3xl md:text-5xl font-black text-slate-900 dark:text-slate-50 mb-2 tracking-tight text-center">
            Stunting<span className="text-blue-600">Checker</span>
          </h1>
          <p className="text-sm md:text-lg text-slate-500 dark:text-slate-400 font-medium text-center max-w-sm md:max-w-xl px-4">
            Sistem Pemantauan Gizi Balita Berbasis Standar WHO & Kemenkes RI
          </p>
        </header>

        <CalculatorForm />

        <section className="mt-12 md:mt-20 grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 max-w-[1400px] mx-auto">
            <div className="group bg-white dark:bg-slate-900 p-6 md:p-8 rounded-[1.5rem] md:rounded-[2.5rem] shadow-sm border border-slate-100 dark:border-slate-800 transition-all hover:shadow-xl">
            <div className="w-10 h-10 md:w-12 md:h-12 bg-teal-50 dark:bg-teal-900/20 rounded-xl md:rounded-2xl flex items-center justify-center mb-4 md:mb-6 text-teal-600 dark:text-teal-400 group-hover:scale-110 transition-transform">
              <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            </div>
            <h3 className="font-black text-lg md:text-xl mb-2 md:mb-3 text-slate-900 dark:text-slate-50">Pentingnya Pemantauan</h3>
            <p className="text-slate-500 dark:text-slate-400 text-xs md:text-sm leading-relaxed font-medium">
              Deteksi dini stunting sangat krusial dalam 1000 hari pertama untuk pertumbuhan optimal.
            </p>
          </div>
          <div className="group bg-white dark:bg-slate-900 p-6 md:p-8 rounded-[1.5rem] md:rounded-[2.5rem] shadow-sm border border-slate-100 dark:border-slate-800 transition-all hover:shadow-xl">
            <div className="w-10 h-10 md:w-12 md:h-12 bg-blue-50 dark:bg-blue-900/20 rounded-xl md:rounded-2xl flex items-center justify-center mb-4 md:mb-6 text-blue-600 dark:text-blue-400 group-hover:scale-110 transition-transform">
              <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
            </div>
            <h3 className="font-black text-lg md:text-xl mb-2 md:mb-3 text-slate-900 dark:text-slate-50">Metode Akurat</h3>
            <p className="text-slate-500 dark:text-slate-400 text-xs md:text-sm leading-relaxed font-medium">
              Menggunakan klasifikasi status gizi standar Permenkes No. 2 Tahun 2020.
            </p>
          </div>
        </section>

        <footer className="mt-12 md:mt-20 text-center space-y-4 pb-8">
           <div className="flex items-center justify-center space-x-6 text-slate-400 dark:text-slate-600">
             <span className="text-xs font-bold uppercase tracking-widest">WHO Standards</span>
             <span className="text-xs font-bold uppercase tracking-widest">Kemenkes RI</span>
             <span className="text-xs font-bold uppercase tracking-widest">LMS Method</span>
           </div>
           <p className="text-sm text-slate-400 dark:text-slate-600 font-medium">
             © 2026 StuntingChecker. Dedikasi untuk Generasi Indonesia Emas.
           </p>
        </footer>
      </div>
    </main>
  );
}
