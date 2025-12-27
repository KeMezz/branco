// 予約フォームのエラー表示トグル
document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("reservationForm");

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    // ローディング表示
    Loading.show();

    // すべての.form-groupに.errorクラスを追加（デモ用）
    // 実際の実装では、バリデーション後にサーバー送信処理を行う
    setTimeout(function () {
      Loading.hide();
      const allGroups = form.querySelectorAll(".form-group");
      allGroups.forEach((group) => {
        group.classList.add("error");
      });
    }, 2000);
  });
});
