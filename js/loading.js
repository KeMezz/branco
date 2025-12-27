// ローディングオーバーレイ制御ユーティリティ
const Loading = {
  // ローディング表示
  show() {
    const overlay = document.getElementById("loadingOverlay");
    if (overlay) {
      overlay.classList.add("active");
    }
  },

  // ローディング非表示
  hide() {
    const overlay = document.getElementById("loadingOverlay");
    if (overlay) {
      overlay.classList.remove("active");
    }
  },
};
