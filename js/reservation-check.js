// 予約確認ページのロジック
document.addEventListener("DOMContentLoaded", function () {
  // ==========================================
  // ダミーデータ
  // ==========================================
  const DUMMY_RESERVATIONS = {
    ヤマダタロウ_08012345678: {
      date: "2025-11-09",
      time: "10:00~10:45",
      name: "ヤマダタロウ",
      phone: "08012345678",
      adult: 1,
      elementary: 1,
      child: 1,
      infant: 1,
      message: "hogehoge",
    },
    サトウハナコ_09087654321: {
      date: "2025-11-15",
      time: "14:00~14:45",
      name: "サトウハナコ",
      phone: "09087654321",
      adult: 2,
      elementary: 0,
      child: 0,
      infant: 0,
      message: "車椅子利用希望",
    },
    "1_1": {
      date: "2025-11-15",
      time: "14:00~14:45",
      name: "1",
      phone: "1",
      adult: 1,
      elementary: 1,
      child: 0,
      infant: 0,
      message: "車椅子利用希望",
    },
  };

  // 現在表示中の予約データ
  let currentReservation = null;

  // ==========================================
  // 要素取得
  // ==========================================
  const checkForm = document.getElementById("checkForm");
  const checkName = document.getElementById("checkName");
  const checkPhone = document.getElementById("checkPhone");
  const errorNotice = document.getElementById("errorNotice");
  const checkSection = document.getElementById("checkSection");
  const detailSection = document.getElementById("detailSection");

  const btnOpenModal = document.getElementById("btnOpenModal");
  const btnCancelModal = document.getElementById("btnCancelModal");
  const btnConfirmEdit = document.getElementById("btnConfirmEdit");
  const editModal = document.getElementById("editModal");

  // ==========================================
  // 予約確認フォーム送信
  // ==========================================
  checkForm.addEventListener("submit", function (e) {
    e.preventDefault();

    // エラー表示をリセット
    errorNotice.classList.remove("active");

    const name = checkName.value.trim();
    const phone = checkPhone.value.trim();

    // 検索キーを作成
    const searchKey = name + "_" + phone;

    // ダミーデータから検索
    if (DUMMY_RESERVATIONS[searchKey]) {
      // 予約が見つかった
      currentReservation = DUMMY_RESERVATIONS[searchKey];
      displayReservationDetail(currentReservation);

      // 詳細セクションを表示
      detailSection.style.display = "block";

      // スクロール
      detailSection.scrollIntoView({ behavior: "smooth", block: "start" });
    } else {
      // 予約が見つからない
      errorNotice.classList.add("active");
    }
  });

  // ==========================================
  // 予約詳細表示
  // ==========================================
  function displayReservationDetail(data) {
    // 日付をフォーマット
    const dateObj = new Date(data.date);
    const formattedDate = `${dateObj.getFullYear()}年${
      dateObj.getMonth() + 1
    }月${dateObj.getDate()}日`;

    document.getElementById("displayDate").textContent = formattedDate;
    document.getElementById("displayTime").textContent = data.time;
    document.getElementById("displayName").textContent = data.name;
    document.getElementById("displayPhone").textContent = data.phone;
    document.getElementById("displayAdult").textContent = data.adult + "名";
    document.getElementById("displayElementary").textContent =
      data.elementary + "名";
    document.getElementById("displayChild").textContent = data.child + "名";
    document.getElementById("displayInfant").textContent = data.infant + "名";
    document.getElementById("displayMessage").textContent =
      data.message || "なし";
  }

  // ==========================================
  // モーダル開く
  // ==========================================
  btnOpenModal.addEventListener("click", function () {
    if (!currentReservation) return;

    // モーダルフォームに現在のデータを設定
    document.getElementById("editDate").value = currentReservation.date;
    document.getElementById("editTime").value = currentReservation.time;
    document.getElementById("editName").value = currentReservation.name;
    document.getElementById("editPhone").value = currentReservation.phone;
    document.getElementById("editAdult").value = currentReservation.adult;
    document.getElementById("editElementary").value =
      currentReservation.elementary;
    document.getElementById("editChild").value = currentReservation.child;
    document.getElementById("editInfant").value = currentReservation.infant;
    document.getElementById("editMessage").value = currentReservation.message;

    // モーダル表示
    editModal.classList.add("active");
    document.body.classList.add("modal-open");

    // 最初の入力欄にフォーカス
    document.getElementById("editDate").focus();
  });

  // ==========================================
  // モーダル閉じる
  // ==========================================
  function closeModal() {
    editModal.classList.remove("active");
    document.body.classList.remove("modal-open");
  }

  btnCancelModal.addEventListener("click", closeModal);

  // オーバーレイクリックで閉じる
  editModal.addEventListener("click", function (e) {
    if (e.target === editModal) {
      closeModal();
    }
  });

  // ESCキーで閉じる
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && editModal.classList.contains("active")) {
      closeModal();
    }
  });

  // ==========================================
  // 予約変更確定
  // ==========================================
  btnConfirmEdit.addEventListener("click", function () {
    // フォームデータ取得
    const newData = {
      date: document.getElementById("editDate").value,
      time: document.getElementById("editTime").value,
      name: document.getElementById("editName").value,
      phone: document.getElementById("editPhone").value,
      adult: parseInt(document.getElementById("editAdult").value) || 0,
      elementary:
        parseInt(document.getElementById("editElementary").value) || 0,
      child: parseInt(document.getElementById("editChild").value) || 0,
      infant: parseInt(document.getElementById("editInfant").value) || 0,
      message: document.getElementById("editMessage").value,
    };

    // 古いキーを削除して新しいキーで保存
    const oldKey = currentReservation.name + "_" + currentReservation.phone;
    const newKey = newData.name + "_" + newData.phone;

    delete DUMMY_RESERVATIONS[oldKey];
    DUMMY_RESERVATIONS[newKey] = newData;

    // 現在の予約データを更新
    currentReservation = newData;

    // 表示を更新
    displayReservationDetail(newData);

    // モーダルを閉じる
    closeModal();

    // 確認セクションの入力値も更新
    checkName.value = newData.name;
    checkPhone.value = newData.phone;

    // 完了メッセージ（簡易版）
    alert("予約内容を変更しました。");
  });
});
