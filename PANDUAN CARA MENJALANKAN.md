# Panduan Cara Menjalankan (Pemula) — Diagnova Frontend Prototype

Dokumen ini ditujukan untuk kamu yang **baru pertama kali** menjalankan project ini setelah clone / download.

> Project ini **frontend-only** (tidak ada backend/API/database). Data diagnosis masih **mock** dari `src/data/mockDiagnosis.ts`.

---

## Quick Start (3 langkah)

Kalau kamu sudah punya Node.js & npm:

1. Install dependency: `npm install`
2. Jalankan dev server: `npm run dev`
3. Buka di browser: http://localhost:5173

Kalau kamu belum punya Node.js, ikuti langkah detail di bawah.

---

## Langkah Detail (Step-by-step)

### 0) (Kalau pakai VS Code) Buka folder project + Terminal

1. Buka VS Code
2. Klik **File → Open Folder...**
3. Pilih folder `Sistem_Pakar_THT-Prototype` (yang berisi `package.json`)
4. Buka terminal: **Terminal → New Terminal**

Setelah itu, semua perintah di bawah dijalankan di terminal tersebut.

### 1) Install yang dibutuhkan

Wajib:

- **Node.js**: disarankan **Node 18+** (paling aman: **Node 20 LTS**) — download: https://nodejs.org/
- **npm**: otomatis ikut terpasang saat install Node.js

Opsional tapi sangat disarankan:

- **Git**: kalau kamu clone dari repository
- Download Git: https://git-scm.com/downloads
- **VS Code**: editor yang nyaman untuk React/TypeScript

Setelah install, tutup lalu buka lagi terminal / VS Code, lalu cek versi:

```bash
node -v
npm -v
```

Kalau perintah `node`/`npm` tidak dikenali, lihat bagian Troubleshooting.

### 2) Pastikan kamu berada di folder project yang benar

Folder yang benar itu yang **berisi** file `package.json`.

Tips cek cepat (opsional):

```bash
ls
```

Kamu seharusnya melihat `package.json` di daftar file.

Kalau kamu clone:

```bash
git clone <URL_REPO_KAMU>
cd Sistem_Pakar_THT-Prototype
```

Kalau kamu dapat zip:

- Ekstrak zip
- Buka foldernya
- Pastikan ada `package.json` di root folder itu

### 3) Install dependency (sekali saja setelah clone)

Jalankan:

```bash
npm install
```

Penjelasan singkat:

- Ini akan mengunduh semua library yang dibutuhkan React/Vite/Tailwind.
- Setelah selesai, akan muncul folder `node_modules/` (folder ini normal, dan tidak di-commit ke git).

Alternatif (lebih konsisten, biasanya untuk CI):

```bash
npm ci
```

### 4) Jalankan project (development)

Jalankan:

```bash
npm run dev
```

Yang kamu harapkan:

- Terminal menampilkan URL lokal seperti `http://localhost:5173/`
- Browser biasanya kebuka otomatis (karena Vite diset `open: true`)

Kalau browser tidak kebuka, buka manual:

- http://localhost:5173

Untuk menghentikan server: tekan `Ctrl + C` di terminal.

### 5) Build dan preview (opsional)

Build versi production:

```bash
npm run build
```

Hasil build ada di folder `dist/`.

Preview hasil build:

```bash
npm run preview
```

Vite akan menampilkan URL preview di terminal.

### 6) Cek TypeScript (opsional)

Project ini punya pengecekan TypeScript (tanpa ESLint):

```bash
npm run lint
```

---

## Troubleshooting (Masalah yang sering muncul)

### A) `node` atau `npm` tidak dikenali

Gejala: muncul error seperti “command not found” / “is not recognized”.

Yang bisa kamu lakukan:

1. Pastikan Node.js sudah terinstall
2. Tutup lalu buka lagi terminal/VS Code
3. Coba cek lagi:

```bash
node -v
npm -v
```

### B) Port 5173 sudah dipakai

Gejala: error port in use saat `npm run dev`.

Solusi:

- Tutup aplikasi lain yang memakai port tersebut, atau
- Ubah port di `vite.config.ts` (bagian `server.port`).

### C) Error saat install dependency

Biasanya karena `node_modules` rusak / lockfile tidak cocok.

**Git Bash / terminal berbasis bash**:

```bash
rm -rf node_modules package-lock.json
npm install
```

**Windows PowerShell**:

```powershell
Remove-Item -Recurse -Force node_modules
Remove-Item -Force package-lock.json
npm install
```

Catatan: setelah hapus `package-lock.json`, npm akan membuat lockfile baru.

### D) Halaman blank / styling tidak muncul

- Jangan buka `index.html` secara langsung.
- Jalankan lewat `npm run dev` lalu buka URL `http://localhost:5173`.
- Cek error di terminal dan di Console browser (DevTools).

---

## Catatan Singkat Struktur Folder (biar nggak bingung)

- `src/pages/` — halaman (Landing, Consultation, Result, dll.)
- `src/components/` — komponen UI (shared, consultation, result, ui)
- `src/data/` — data statis + mock diagnosis
- `src/stores/` — state management (Zustand)
