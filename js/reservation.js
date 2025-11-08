// 予約フォームのエラー表示トグル
document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("reservationForm");

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    // すべての.form-groupに.errorクラスを追加
    const allGroups = form.querySelectorAll(".form-group");
    allGroups.forEach((group) => {
      group.classList.add("error");
    });
  });
});
