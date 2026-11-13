/* ==========================================================================
   TUGAS PEMROGRAMAN WEB: JAVASCRIPT & API FETCH
   Dosen: Bu Bela
   Mahasiswa: Khansa Kirana Putri Paraswati
   ========================================================================== */

/* --------------------------------------------------------------------------
   1. FITUR LIHAT PROFIL (Navigasi Berwaktu dengan Indikator Loading)
   -------------------------------------------------------------------------- */
function bukaProfil() {
    const loading = document.getElementById("loading");

    if (loading) {
        loading.innerHTML = "⏳ Membuka profil, mohon tunggu sebentar...";
    }

    // Beri jeda 1 detik agar efek loading terlihat sebelum pindah halaman
    setTimeout(function() {
        window.location.href = "about.html";
    }, 1000);
}

/* --------------------------------------------------------------------------
   2. FITUR INTEGRASI API (Mengambil Data Nyata Menggunakan Fetch & Async/Await)
   -------------------------------------------------------------------------- */
async function ambilDataAPI() {
    const status = document.getElementById("api-status");
    const judul = document.getElementById("api-title");
    const isi = document.getElementById("api-body");

    // Jika elemen tidak ditemukan pada halaman ini, hentikan eksekusi
    if (!status || !judul || !isi) return;

    // Tampilkan status proses pengambilan data
    status.textContent = "Sedang mengambil data dari API...";
    judul.textContent = "";
    isi.textContent = "";

    try {
        // Simulasi jeda singkat 600ms agar proses loading terlihat jelas oleh dosen
        await new Promise(resolve => setTimeout(resolve, 600));

        // Mengambil data dari endpoint publik JSONPlaceholder
        const response = await fetch("https://jsonplaceholder.typicode.com/posts/1");

        // Periksa apakah status response sukses (HTTP 200)
        if (!response.ok) {
            throw new Error("Gagal mengambil data API. Status: " + response.status);
        }

        // Parsing response JSON menjadi object JavaScript
        const data = await response.json();

        // Tampilkan hasil data ke dalam elemen DOM
        judul.textContent = "Judul: " + data.title;
        isi.textContent = "Isi: " + data.body;
        status.textContent = "Data API berhasil dimuat!";
    } catch (error) {
        // Penanganan error jika koneksi gagal
        status.textContent = "Gagal memuat API. Silakan periksa koneksi internet.";
        console.error("Detail Error API:", error);
    }
}

/* --------------------------------------------------------------------------
   3. INISIALISASI OTOMATIS SAAT HALAMAN SELESAI DIMUAT
   -------------------------------------------------------------------------- */
document.addEventListener("DOMContentLoaded", function() {
    // Jalankan ambilDataAPI() otomatis jika berada di halaman yang memiliki card API
    if (document.getElementById("api-status")) {
        ambilDataAPI();
    }
});
