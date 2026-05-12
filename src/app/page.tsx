import CalculatorForm from '@/components/CalculatorForm';
import { ThemeToggle } from '@/components/ThemeToggle';

export default function Home() {
  return (
    <main className="min-h-screen bg-[#fafbfc] dark:bg-slate-950 py-12 px-6 transition-colors font-sans selection:bg-blue-100 dark:selection:bg-blue-900/30">
      <div className="max-w-[1400px] mx-auto">
        <header className="flex flex-col items-center mb-12 relative max-w-[1400px] mx-auto">
          <div className="absolute right-0 top-0">
            <ThemeToggle />
          </div>
          <div className="inline-flex items-center px-4 py-1.5 rounded-full bg-teal-50 dark:bg-teal-900/20 text-teal-600 dark:text-teal-400 text-[10px] font-black uppercase tracking-[0.2em] mb-6 border border-teal-100 dark:border-teal-800/50">
            HEALTH DASHBOARD v1.0
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-slate-50 mb-3 tracking-tight text-center">
            Stunting<span className="text-blue-600">Checker</span>
          </h1>
          <p className="text-lg text-slate-500 dark:text-slate-400 font-medium text-center max-w-xl">
            Sistem Pemantauan Gizi Anak Balita Berbasis Standar WHO & Kemenkes RI
          </p>
        </header>

        <CalculatorForm />

        <section className="mt-20 grid grid-cols-1 md:grid-cols-2 gap-8 max-w-[1400px] mx-auto">
            <div className="group bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] shadow-sm border border-slate-100 dark:border-slate-800 transition-all hover:shadow-xl hover:-translate-y-1">
            <div className="w-12 h-12 bg-teal-50 dark:bg-teal-900/20 rounded-2xl flex items-center justify-center mb-6 text-teal-600 dark:text-teal-400 group-hover:scale-110 transition-transform">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            </div>
            <h3 className="font-black text-xl mb-3 text-slate-900 dark:text-slate-50">Pentingnya Pemantauan</h3>
            <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed font-medium">
              Deteksi dini stunting dan masalah gizi lainnya sangat krusial dalam 1000 hari pertama kehidupan anak untuk memastikan pertumbuhan otak dan fisik yang optimal.
            </p>
          </div>
          <div className="group bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] shadow-sm border border-slate-100 dark:border-slate-800 transition-all hover:shadow-xl hover:-translate-y-1">
            <div className="w-12 h-12 bg-blue-50 dark:bg-blue-900/20 rounded-2xl flex items-center justify-center mb-6 text-blue-600 dark:text-blue-400 group-hover:scale-110 transition-transform">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
            </div>
            <h3 className="font-black text-xl mb-3 text-slate-900 dark:text-slate-50">Metode Akurat</h3>
            <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed font-medium">
              Aplikasi ini menggunakan metode LMS (Lambda-Mu-Sigma) sesuai standar WHO Child Growth Standards dan klasifikasi status gizi Permenkes No. 2 Tahun 2020.
            </p>
          </div>
        </section>

        <footer className="mt-20 text-center space-y-4">
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
