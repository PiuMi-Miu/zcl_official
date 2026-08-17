// ========================================
// ZCL BACKGROUND VIDEO CONTROLLER
// Agar video tidak restart saat pindah halaman
// ========================================

document.addEventListener("DOMContentLoaded", function () {

    const video = document.getElementById("zclBackgroundVideo");

    if (!video) return;

    const STORAGE_KEY = "zcl_video_current_time";

    // Ambil posisi video terakhir
    const savedTime = sessionStorage.getItem(STORAGE_KEY);

    // Setelah metadata video berhasil dimuat
    video.addEventListener("loadedmetadata", function () {

        if (savedTime !== null) {

            const time = parseFloat(savedTime);

            if (
                !isNaN(time) &&
                time >= 0 &&
                time < video.duration
            ) {
                video.currentTime = time;
            }
        }

        // Jalankan video
        const playPromise = video.play();

        if (playPromise !== undefined) {
            playPromise.catch(function () {
                // Browser mungkin memblokir autoplay.
                // Karena video sudah muted, biasanya autoplay diperbolehkan.
            });
        }

    });


    // Simpan posisi video secara berkala
    setInterval(function () {

        if (
            video.readyState >= 2 &&
            !video.paused &&
            !isNaN(video.currentTime)
        ) {

            sessionStorage.setItem(
                STORAGE_KEY,
                video.currentTime.toString()
            );

        }

    }, 200);


    // Simpan posisi tepat sebelum pindah halaman
    window.addEventListener("beforeunload", function () {

        if (!isNaN(video.currentTime)) {

            sessionStorage.setItem(
                STORAGE_KEY,
                video.currentTime.toString()
            );

        }

    });

});