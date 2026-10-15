# RESQ — Respon Quick

RESQ adalah prototipe antarmuka web untuk membantu pengguna mengakses informasi kebencanaan, melihat gambaran area berisiko, menemukan sumber informasi resmi, dan membuka alur panggilan darurat dengan lebih praktis. Proyek ini dibuat menggunakan HTML, CSS, dan JavaScript tanpa framework.

> **Status proyek:** Prototipe front-end. Informasi bencana yang tampil merupakan data contoh, peta risiko masih berupa ilustrasi antarmuka, dan fitur SOS belum mengirim permintaan bantuan otomatis kepada petugas atau kontak darurat.

## Fitur

- **Dashboard** — ringkasan peringatan dan daftar contoh kejadian bencana.
- **Navigasi ant halaman** — akses ke beranda, peta risiko, daftar bencana, informasi resmi, bantuan darurat, SOS, dan profil.
- **Peta Risiko (prototipe)** — ilustrasi area aman/berisiko dan tombol untuk meminta lokasi perangkat melalui Geolocation API browser.
- **Lokasi perangkat** — meminta izin lokasi browser dan menampilkan koordinat jika berhasil diperoleh.
- **Informasi resmi** — tautan ke BMKG, BNPB, MAGMA Indonesia, dan BPBD DIY.
- **Filter bencana dan detail informasi** — memfilter kartu contoh dan membaca penjelasan singkat terkait kejadian.
- **Tombol SOS** — memiliki hitung mundur konfirmasi yang dapat dibatalkan; setelah hitung mundur, pengguna dapat membuka aplikasi telepon melalui `tel:112`.
- **Tampilan responsif bergaya aplikasi seluler** — dibuat dengan CSS dan dapat dibuka di browser desktop maupun ponsel.

## Teknologi

- HTML5
- CSS3
- JavaScript (Vanilla)
- Google Fonts (Inter), jika koneksi internet tersedia
- Browser Geolocation API untuk akses lokasi, dengan izin pengguna

## Struktur proyek

```text
RESQ/
├── index.html   # Struktur halaman dan konten
├── main.css     # Gaya visual dan tata letak responsif
├── script.js    # Navigasi dan interaksi antarmuka
└── README.md    # Dokumentasi proyek
```

## Cara menjalankan

### Opsi 1 — Buka langsung

1. Unduh atau clone repositori ini.
2. Pastikan `index.html`, `main.css`, dan `script.js` berada di folder yang sama.
3. Buka `index.html` menggunakan browser modern seperti Chrome, Edge, Firefox, atau Safari.

Sebagian besar antarmuka dapat dicoba tanpa proses instalasi atau server.

### Opsi 2 — Jalankan dengan server lokal

Jika ingin menguji akses lokasi dengan hasil yang lebih konsisten, jalankan melalui `localhost`:

**Python**

```bash
python -m http.server 8000
```

Kemudian buka <http://localhost:8000> di browser. Jalankan perintah dari dalam folder `RESQ`.

Alternatifnya, gunakan ekstensi **Live Server** di Visual Studio Code: buka folder proyek, klik kanan `index.html`, lalu pilih **Open with Live Server**.

## Alur penggunaan

1. Buka aplikasi untuk melihat dashboard dan ringkasan informasi bencana contoh.
2. Gunakan navigasi bawah atau menu cepat untuk berpindah halaman.
3. Buka **Peta** untuk melihat ilustrasi peta risiko. Tekan tombol lokasi dan izinkan akses lokasi jika ingin mencoba mengambil koordinat perangkat.
4. Buka **Info Resmi** untuk mengakses situs lembaga terkait kebencanaan.
5. Buka **Bencana** untuk melihat dan memfilter daftar contoh kejadian serta membuka detailnya.
6. Buka **Emergency/SOS** untuk mencoba hitung mundur konfirmasi. Proses dapat dibatalkan sebelum selesai. Setelah hitung mundur, tekan tombol panggilan untuk membuka aplikasi telepon perangkat.

## Catatan penting dan batasan

- **Maps Offline belum diimplementasikan sebagai peta offline sesungguhnya.** Bagian peta saat ini adalah ilustrasi visual, bukan peta geografis yang dapat diunduh atau digunakan untuk navigasi tanpa internet.
- **SOS tidak mengirim lokasi atau pesan otomatis.** Fitur ini hanya menjalankan hitung mundur konfirmasi dan menyediakan tautan panggilan `tel:112`. Perilaku panggilan bergantung pada perangkat, browser, jaringan, serta ketersediaan layanan darurat di wilayah pengguna.
- Data peringatan, waktu kejadian, lokasi, dan tingkat risiko pada dashboard adalah **konten contoh**, bukan peringatan real-time. Jangan menggunakannya sebagai dasar keputusan keselamatan.
- Notifikasi push, integrasi API kebencanaan, penyimpanan data, autentikasi, pengiriman koordinat ke kontak, dan sistem backend belum tersedia.
- Geolocation API memerlukan izin pengguna dan umumnya berjalan pada konteks aman seperti HTTPS atau `localhost`. Jika izin ditolak atau lokasi tidak tersedia, fitur akan menampilkan pesan.
- Google Fonts dan ilustrasi eksternal memerlukan koneksi internet; karena itu keseluruhan halaman belum sepenuhnya berfungsi secara offline.

## Pengembangan selanjutnya

- Integrasi data peringatan resmi melalui API yang sesuai.
- Implementasi peta offline nyata dengan data peta yang dapat diunduh dan penyimpanan lokal.
- Integrasi SOS dengan alur kontak darurat yang terverifikasi, berbagi lokasi secara aman, serta konfirmasi bahwa bantuan benar-benar terkirim.
- Pengujian aksesibilitas, kompatibilitas perangkat, dan penanganan kondisi jaringan buruk.
- Menambahkan pengujian otomatis dan panduan kontribusi jika proyek dikembangkan bersama.

## Kontribusi

Kontribusi dan saran pengembangan dipersilakan. Untuk perubahan besar, buat issue terlebih dahulu agar tujuan dan cakupan perubahan dapat didiskusikan. Pastikan perubahan tidak menyajikan data contoh sebagai informasi darurat yang nyata.

## Lisensi

Lisensi belum ditentukan. Tambahkan file `LICENSE` sebelum mendistribusikan proyek ini dengan ketentuan lisensi tertentu.
