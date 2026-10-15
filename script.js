"use strict";

document.addEventListener("DOMContentLoaded", () => {
  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];

  const pages = ["home", "peta", "sos", "bencana", "info", "darurat", "profile"];
  const toastElement = $("#toast");
  const detailDialog = $("#detail-dialog");

  let toastTimeout;
  let sosTimer = null;
  let sosCountdown = 3;
  let sosActivated = false;

  const disasterDetails = {
    erupsi: {
      title: "Peringatan Erupsi Gunung",
      description:
        "Waspadai potensi aktivitas gunung api. Jauhi kawasan berbahaya, perhatikan arah angin dan hujan abu, serta ikuti rekomendasi resmi dari PVMBG, BPBD, dan petugas setempat."
    },
    cuaca: {
      title: "Peringatan Cuaca Ekstrem",
      description:
        "Waspadai hujan lebat, angin kencang, petir, dan kemungkinan genangan atau banjir. Hindari berteduh di bawah pohon saat badai dan pantau informasi cuaca resmi dari BMKG."
    }
  };

  function showToast(message, duration = 2800) {
    clearTimeout(toastTimeout);
    toastElement.textContent = message;
    toastElement.classList.add("visible");

    toastTimeout = setTimeout(() => {
      toastElement.classList.remove("visible");
    }, duration);
  }

  function updateClock() {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");

    $("#status-time").textContent = `${hours}.${minutes}`;
  }

  function navigateTo(page) {
    if (!pages.includes(page)) return;

    pages.forEach((name) => {
      const element = $(`#${name}-page`);
      if (element) {
        element.classList.toggle("hidden", name !== page);
      }
    });

    $$(".nav-item").forEach((item) => {
      const active = item.dataset.page === page;
      item.classList.toggle("active", active);

      if (active) {
        item.setAttribute("aria-current", "page");
      } else {
        item.removeAttribute("aria-current");
      }
    });

    window.scrollTo({
      top: 0,
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "auto"
        : "smooth"
    });
  }

  function openDisasterDetail(type) {
    const detail = disasterDetails[type];

    if (!detail) {
      showToast("Informasi bencana tidak tersedia.");
      return;
    }

    $("#dialog-title").textContent = detail.title;
    $("#dialog-description").textContent = detail.description;

    if (typeof detailDialog.showModal === "function") {
      if (!detailDialog.open) detailDialog.showModal();
    } else {
      showToast(detail.title);
    }
  }

  function closeDetailDialog() {
    if (detailDialog.open) {
      detailDialog.close();
    }
  }

  $$(".nav-item").forEach((item) => {
    item.addEventListener("click", () => {
      navigateTo(item.dataset.page);
    });
  });

  $$("[data-page]").forEach((item) => {
    if (item.classList.contains("nav-item")) return;

    item.addEventListener("click", () => {
      navigateTo(item.dataset.page);
    });
  });

  $$("[data-detail]").forEach((button) => {
    button.addEventListener("click", (event) => {
      event.stopPropagation();
      openDisasterDetail(button.dataset.detail);
    });
  });

  $("#alert-banner").addEventListener("click", () => {
    openDisasterDetail("erupsi");
  });

  $("#dialog-close").addEventListener("click", closeDetailDialog);
  $("#dialog-ok").addEventListener("click", closeDetailDialog);

  detailDialog.addEventListener("click", (event) => {
    if (event.target === detailDialog) {
      closeDetailDialog();
    }
  });

  detailDialog.addEventListener("cancel", () => {
    clearTimeout(sosTimer);
  });

  $("#notification-button").addEventListener("click", () => {
    navigateTo("bencana");
    showToast("Menampilkan informasi bencana terkini.");
  });

  $("#location-button").addEventListener("click", requestLocation);
  $("#map-locate").addEventListener("click", requestLocation);
  $("#profile-location").addEventListener("click", requestLocation);

  function requestLocation() {
    if (!("geolocation" in navigator)) {
      showToast("Perangkat Anda tidak mendukung layanan lokasi.");
      return;
    }

    showToast("Meminta izin akses lokasi...", 4500);

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude, accuracy } = position.coords;

        $("#location-name").textContent =
          `${latitude.toFixed(4)}, ${longitude.toFixed(4)}`;

        showToast(
          `Lokasi berhasil diperoleh. Akurasi sekitar ${Math.round(accuracy)} meter.`,
          4500
        );
      },
      (error) => {
        const messages = {
          1: "Izin lokasi ditolak. Aktifkan izin lokasi di pengaturan browser.",
          2: "Lokasi tidak tersedia. Coba lagi beberapa saat.",
          3: "Permintaan lokasi melewati batas waktu."
        };

        showToast(
          messages[error.code] ||
            "Tidak dapat mengambil lokasi. Periksa pengaturan perangkat.",
          4000
        );
      },
      {
        enableHighAccuracy: true,
        timeout: 12000,
        maximumAge: 60000
      }
    );
  }

  $("#evacuation-button").addEventListener("click", () => {
    showToast(
      "Periksa arahan evakuasi dan lokasi posko dari BPBD setempat sebelum bergerak.",
      4000
    );
  });

  $$(".filter-tab").forEach((tab) => {
    tab.addEventListener("click", () => {
      $$(".filter-tab").forEach((item) => {
        item.classList.toggle("active", item === tab);
      });

      const filter = tab.dataset.filter;

      $$(".filtered-disaster").forEach((card) => {
        const visible = filter === "semua" || card.dataset.risk === filter;
        card.classList.toggle("hidden", !visible);
      });
    });
  });

  function resetSos() {
    clearTimeout(sosTimer);
    sosTimer = null;
    sosCountdown = 3;
    sosActivated = false;

    $("#sos-countdown").textContent = "Siap membantu";
    $("#sos-trigger").textContent = "Aktifkan SOS";
    $("#sos-status-title").textContent = "Status Pertolongan";
    $("#sos-status-text").textContent =
      "Belum ada panggilan yang dilakukan.";

    $$(".status-step .step-dot").forEach((dot) => {
      dot.style.background = "#fff";
      dot.style.borderColor = "#cfd5dc";
    });
  }

  function setSosStep(index) {
    $$(".status-step .step-dot").forEach((dot, i) => {
      if (i <= index) {
        dot.style.background = "#15966a";
        dot.style.borderColor = "#15966a";
      } else {
        dot.style.background = "#fff";
        dot.style.borderColor = "#cfd5dc";
      }
    });
  }

  function activateSos() {
    if (sosActivated) {
      resetSos();
      showToast("Proses SOS dibatalkan. Tidak ada panggilan yang dilakukan.");
      return;
    }

    sosActivated = true;
    sosCountdown = 3;

    $("#sos-trigger").textContent = "Batalkan SOS";
    $("#sos-countdown").textContent = `${sosCountdown} detik`;
    $("#sos-status-title").textContent = "Konfirmasi Pertolongan";
    $("#sos-status-text").textContent =
      "Konfirmasi sedang berlangsung. Batalkan jika tidak membutuhkan bantuan.";

    setSosStep(0);

    function tick() {
      if (!sosActivated) return;

      sosCountdown -= 1;

      if (sosCountdown > 0) {
        $("#sos-countdown").textContent = `${sosCountdown} detik`;
        sosTimer = setTimeout(tick, 1000);
        return;
      }

      sosActivated = false;
      sosTimer = null;

      $("#sos-countdown").textContent = "Perlu bantuan?";
      $("#sos-trigger").textContent = "Hubungi Darurat 112";
      $("#sos-status-title").textContent = "Siap Menghubungi Petugas";
      $("#sos-status-text").textContent =
        "Panggilan belum dilakukan. Tekan tombol di bawah untuk membuka aplikasi telepon.";

      setSosStep(0);

      showToast(
        "SOS belum menghubungi petugas. Tekan tombol darurat untuk memulai panggilan.",
        5000
      );

      $("#sos-trigger").onclick = () => {
        window.location.href = "tel:112";
      };
    }

    sosTimer = setTimeout(tick, 1000);
  }

  $("#sos-trigger").addEventListener("click", () => {
    if ($("#sos-trigger").textContent === "Hubungi Darurat 112") {
      window.location.href = "tel:112";
      return;
    }

    activateSos();
  });

  $("#sos-wide-button").addEventListener("click", () => {
    resetSos();
    navigateTo("sos");
  });

  $("#profile-notifications").addEventListener("click", () => {
    showToast(
      "Notifikasi pada demo ini belum terhubung ke layanan push notification."
    );
  });

  $("#profile-info").addEventListener("click", () => {
    showToast(
      "RESQ — Respon Quick. Kenali risikonya, pahami tindakannya, lindungi diri dan orang tersayang.",
      4000
    );
  });

  updateClock();
  setInterval(updateClock, 30000);

  navigateTo("home");
});