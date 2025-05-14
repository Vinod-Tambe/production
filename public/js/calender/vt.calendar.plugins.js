const dayNames = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
const currentDate = new Date();
const formattedDate = currentDate.toISOString().split('T')[0]; // Format as "YYYY-MM-DD"
const formattedDateString = String(formattedDate);

const config = {
  attendanceData: {
    "2025-05-01": "present",
    "2025-05-02": "absent",
    "2025-05-04": "holiday", // Sunday override
    "2025-05-05": "present",
    "2025-05-07": "leave",
    "2025-05-10": "present",
    "2025-05-08": "late",
     [formattedDateString]: "today",
  },
  weekOffDays: [0,6], // 0 = Sunday only, 6 = Saturday, or both [0, 6]
};
console.log(config);
let currentYear, currentMonth;

function renderMonth(year, month, calendarContainer) {
  calendarContainer.innerHTML = "";

  const monthName = new Date(year, month).toLocaleString("default", {
    month: "long",
  });

  const colDiv = document.createElement("div");
  const card = document.createElement("div");
  card.className = "card shadow";

  const cardBody = document.createElement("div");
  cardBody.className = "card-body";

  // Navigation
  const navRow = document.createElement("div");
  navRow.className = "d-flex justify-content-between align-items-center mb-3";

  const prevBtn = document.createElement("button");
  prevBtn.className = "btn btn-outline-secondary btn-sm";
  prevBtn.textContent = "←";
  prevBtn.onclick = () => {
    currentMonth--;
    if (currentMonth < 0) {
      currentMonth = 11;
      currentYear--;
    }
    renderMonth(currentYear, currentMonth, calendarContainer);
  };

  const nextBtn = document.createElement("button");
  nextBtn.className = "btn btn-outline-secondary btn-sm";
  nextBtn.textContent = "→";
  nextBtn.onclick = () => {
    currentMonth++;
    if (currentMonth > 11) {
      currentMonth = 0;
      currentYear++;
    }
    renderMonth(currentYear, currentMonth, calendarContainer);
  };

  const title = document.createElement("h5");
  title.className = "mb-0 text-center flex-grow-1";
  title.textContent = `${monthName} ${year}`;

  navRow.appendChild(prevBtn);
  navRow.appendChild(title);
  navRow.appendChild(nextBtn);

  cardBody.appendChild(navRow);

  // Day Headers
  const headerRow = document.createElement("div");
  headerRow.className = "row text-center fw-bold";
  dayNames.forEach((day) => {
    const col = document.createElement("div");
    col.className = "col";
    col.textContent = day;
    headerRow.appendChild(col);
  });
  cardBody.appendChild(headerRow);

  // Dates
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  let date = 1;
  for (let row = 0; row < 6 && date <= daysInMonth; row++) {
    const weekRow = document.createElement("div");
    weekRow.className = "row text-center";

    for (let col = 0; col < 7; col++) {
      const dayCol = document.createElement("div");
      dayCol.className =
        "col d-flex align-items-center justify-content-center p-0 m-0";

      if ((row === 0 && col < firstDay) || date > daysInMonth) {
        dayCol.innerHTML = "&nbsp;";
      } else {
        const dateObj = new Date(year, month, date);
        const dayOfWeek = dateObj.getDay();
        const currentDate = `${year}-${String(month + 1).padStart(
          2,
          "0"
        )}-${String(date).padStart(2, "0")}`;

        const dayText = document.createElement("div");
        dayText.className =
          "m-1 p-2 rounded-circle d-flex align-items-center justify-content-center text-center";
        dayText.style.width = "30px";
        dayText.style.height = "30px";
        dayText.style.fontSize = "0.9rem";
        dayText.innerHTML = `<strong>${date}</strong>`;

        const status =
          config.attendanceData[currentDate] ??
          (config.weekOffDays.includes(dayOfWeek) ? "holiday" : null);

        switch (status) {
          case "present":
            dayText.classList.add("bg-success", "text-white");
            break;
          case "absent":
            dayText.classList.add("bg-danger", "text-white");
            break;
          case "holiday":
            dayText.classList.add("bg-secondary", "text-dark");
            break;
          case "today":
            dayText.classList.add("bg-info", "text-white");
            break;
          case "leave":
            dayText.classList.add("bg-warning", "text-white");
            break;
          case "late":
            dayText.classList.add("bg-primary", "text-white");
            break;
        }

        dayCol.appendChild(dayText);
        date++;
      }

      weekRow.appendChild(dayCol);
    }
    cardBody.appendChild(weekRow);
  }

  card.appendChild(cardBody);
  colDiv.appendChild(card);
  calendarContainer.appendChild(colDiv);

  // Add legend inside #calendar
  const legend = document.createElement("div");
  legend.className = "text-center";
  legend.innerHTML = `
 <div class="d-flex flex-wrap justify-content-center align-items-cente">
        <div>
          <span class="badge text-dark p-2 me-1">
            <i class="bi bi-circle-fill text-info me-1"></i> Today
          </span>
        </div>
        <div>
          <span class="badge text-dark p-2 me-1">
            <i class="bi bi-circle-fill text-success me-1"></i> Present
          </span>
        </div>
        <div>
          <span class="badge text-dark p-2 me-1">
            <i class="bi bi-circle-fill text-warning me-1"></i> Leave
          </span>
        </div>
        <div>
          <span class="badge text-dark p-2 me-1">
            <i class="bi bi-circle-fill text-danger me-1"></i> Absent
          </span>
        </div>
        <div>
          <span class="badge text-dark p-2">
            <i class="bi bi-circle-fill text-secondary me-1"></i> Holiday
          </span>
        </div>
        <div>
          <span class="badge text-dark p-2">
            <i class="bi bi-circle-fill text-primary me-1"></i> Late
          </span>
        </div>
      </div>
    `;
  card.appendChild(legend);
}

window.addEventListener("DOMContentLoaded", () => {
  const today = new Date();
  currentYear = today.getFullYear();
  currentMonth = today.getMonth();

  // Loop through all elements with name="calendar"
  const calendarContainers = document.getElementsByName("calendar");

  Array.from(calendarContainers).forEach((calendarContainer) => {
    renderMonth(currentYear, currentMonth, calendarContainer);
  });
});
