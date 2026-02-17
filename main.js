document.addEventListener("DOMContentLoaded", function () {

  /* ===========================
     חיבור ל-SCORM בעת טעינת העמוד
  ============================ */

  let scormConnected = false;

  if (window.pipwerks && pipwerks.SCORM) {
    scormConnected = pipwerks.SCORM.init();
  }


  /* ===========================
     מנגנון חיפוש
  ============================ */

  const searchBtn = document.getElementById("searchBtn");
  const searchInput = document.getElementById("searchInput");
  const cards = document.querySelectorAll("#units .col-12");

  function filterUnits() {

    const value = searchInput.value.trim().toLowerCase();
    let visibleCount = 0;

    cards.forEach(card => {

      const text = card.innerText.toLowerCase();

      if (value === "" || text.includes(value)) {
        card.style.display = "block";
        visibleCount++;
      } else {
        card.style.display = "none";
      }

    });

  }

  if (searchBtn) {
    searchBtn.addEventListener("click", filterUnits);
  }

  if (searchInput) {
    searchInput.addEventListener("keyup", function (e) {
      if (e.key === "Enter") {
        filterUnits();
      }
    });
  }


  /* ===========================
     דיווח טופס ל-LMS
  ============================ */

  const reportForm = document.getElementById("reportForm");

  if (reportForm) {

    reportForm.addEventListener("submit", function (e) {

      e.preventDefault();

      const allergy = document.getElementById("fieldAllergy").value;
      const confidence = document.getElementById("fieldConfidence").value;
      const unit = document.getElementById("fieldUnit").value;
      const note = document.getElementById("fieldNote").value;

      if (scormConnected) {

        // שמירת נתונים ב-suspend_data
        const dataToSave = {
          allergy: allergy,
          confidence: confidence,
          favoriteUnit: unit,
          note: note
        };

        pipwerks.SCORM.set("cmi.core.lesson_status", "completed");
        pipwerks.SCORM.set("cmi.suspend_data", JSON.stringify(dataToSave));
        pipwerks.SCORM.save();
        pipwerks.SCORM.quit();
      }

      alert("המשוב נשלח בהצלחה");

      reportForm.reset();

    });

  }

});
