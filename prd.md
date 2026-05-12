# PRD - Z-Core Balita (Clinical Z-Score Calculator)

## Overview
Aplikasi kalkulator medis khusus untuk ahli gizi rumah sakit untuk menentukan status gizi anak (0-5 tahun) menggunakan perhitungan Z-Score berdasarkan standar antropometri.

## Objectives
- Menyediakan alat hitung yang akurat dan cepat untuk ahli gizi.
- Mengimplementasikan dua standar utama: WHO Child Growth Standards dan Permenkes No. 2 Tahun 2020.
- Meminimalisir kesalahan input data antropometri.

## Target Audience
- Ahli Gizi Rumah Sakit (Nutrisionis).
- Tenaga Kesehatan di Puskesmas/Klinik.

## Technical Specifications
- **Input:**
  - Jenis Kelamin (Laki-laki / Perempuan).
  - Umur (Bulan).
  - Berat Badan (kg, mendukung desimal).
  - Tinggi/Panjang Badan (cm, mendukung desimal).
- **Standards:**
  - Standar WHO 2005/2006.
  - Standar Kemenkes (Permenkes No. 2 Tahun 2020).
- **Core Features:**
  - Perhitungan Indeks: BB/U (Berat Badan menurut Umur), TB/U (Tinggi Badan menurut Umur), BB/TB (Berat Badan menurut Tinggi Badan).
  - Output: Nilai Z-Score dan Kategori Status Gizi (misal: Sangat Pendek, Pendek, Normal).

## UI/UX Requirements
- Clean, clinical look (Preferably Tailwind CSS).
- Mobile-responsive (untuk penggunaan saat visit pasien).
- Toggle switch untuk ganti antara standar WHO dan Kemenkes.
- **Visual Status:** Menampilkan ilustrasi sketsa anak (baduta) yang berubah sesuai status gizi (Normal, Kurus, Sangat Kurus, Gemuk, Obesitas).
- **Interactive Graphs:** Grafik pertumbuhan interaktif untuk memvisualisasikan posisi anak di kurva pertumbuhan standar.

## Constraints
- Maksimal umur 60 bulan (5 tahun).
- Data referensi harus akurat sesuai tabel LMS/SD standar.
