const today = "2026-05-25";

const state = {
  view: "dashboard",
  settingsSection: "overview",
  roomFilter: "all",
  selectedStayId: null,
  financeStart: today,
  financeEnd: today,
  modal: null,
  toast: "",
  rooms: [
    { id: "201", type: "大床房", floor: 2, physical: "clean", sales: "available", price: 188 },
    { id: "202", type: "大床房", floor: 2, physical: "dirty", sales: "available", price: 188 },
    { id: "203", type: "双床房", floor: 2, physical: "clean", sales: "reserved", price: 228 },
    { id: "205", type: "双床房", floor: 2, physical: "clean", sales: "occupied", price: 228 },
    { id: "301", type: "商务大床", floor: 3, physical: "clean", sales: "available", price: 268 },
    { id: "302", type: "商务大床", floor: 3, physical: "clean", sales: "occupied", price: 268 },
    { id: "303", type: "家庭房", floor: 3, physical: "clean", sales: "reserved", price: 328 },
    { id: "305", type: "家庭房", floor: 3, physical: "maintenance", sales: "locked", price: 328 },
    { id: "401", type: "影音房", floor: 4, physical: "clean", sales: "available", price: 298 },
    { id: "402", type: "影音房", floor: 4, physical: "dirty", sales: "available", price: 298 },
    { id: "403", type: "套房", floor: 4, physical: "clean", sales: "available", price: 468 },
    { id: "405", type: "套房", floor: 4, physical: "clean", sales: "occupied", price: 468 }
  ],
  reservations: [
    { id: "R1001", guest: "张女士", phone: "13800001111", roomId: "203", roomType: "双床房", arrival: today, departure: "2026-05-26", status: "confirmed", source: "电话", deposit: 100 },
    { id: "R1002", guest: "陈先生", phone: "13900002222", roomId: "303", roomType: "家庭房", arrival: today, departure: "2026-05-27", status: "confirmed", source: "携程", deposit: 200 }
  ],
  stays: [
    { id: "S2001", guest: "李先生", phone: "13600003333", roomId: "205", arrival: "2026-05-24", departure: today, status: "inhouse", rate: 228, deposit: 200 },
    { id: "S2002", guest: "王女士", phone: "13700004444", roomId: "302", arrival: "2026-05-25", departure: "2026-05-26", status: "inhouse", rate: 268, deposit: 300 },
    { id: "S2003", guest: "赵先生", phone: "13500005555", roomId: "405", arrival: "2026-05-23", departure: "2026-05-26", status: "inhouse", rate: 468, deposit: 500 }
  ],
  transactions: [
    { id: "T1", stayId: "S2001", type: "charge", item: "房费", amount: 228, date: today, time: "09:10", operator: "前台A" },
    { id: "T2", stayId: "S2001", type: "payment", item: "押金", amount: 200, date: today, time: "09:12", operator: "前台A" },
    { id: "T3", stayId: "S2002", type: "charge", item: "房费", amount: 268, date: today, time: "10:20", operator: "前台B" },
    { id: "T4", stayId: "S2002", type: "payment", item: "押金", amount: 300, date: today, time: "10:21", operator: "前台B" },
    { id: "T5", stayId: "S2003", type: "charge", item: "房费", amount: 936, date: today, time: "08:30", operator: "前台A" },
    { id: "T6", stayId: "S2003", type: "payment", item: "押金", amount: 500, date: today, time: "08:31", operator: "前台A" }
  ],
  shiftHandovers: [
    { id: "H1", date: today, time: "08:00", shift: "早班", from: "前台A", to: "前台B", note: "203、303 为预约到店；205 今日离店需检查 minibar。" }
  ],
  shifts: [
    { id: "morning", name: "早班", start: "08:00", end: "16:00" },
    { id: "middle", name: "中班", start: "16:00", end: "00:00" },
    { id: "night", name: "夜班", start: "00:00", end: "08:00" }
  ],
  audit: [
    "20:35 王女士办理入住 302",
    "19:20 303 接收携程预订",
    "18:10 202 标记为空脏",
    "17:42 305 设置维修锁房"
  ],
  floors: [
    { id: "2", name: "二楼客房", sort: 2 },
    { id: "3", name: "三楼客房", sort: 3 },
    { id: "4", name: "四楼客房", sort: 4 }
  ],
  employees: [
    { id: "E001", name: "周敏", role: "店长", phone: "13800008888", status: "在职", shift: "早班", handoverPassword: "123456" },
    { id: "E002", name: "刘洋", role: "前台", phone: "13900009999", status: "在职", shift: "中班", handoverPassword: "123456" },
    { id: "E003", name: "何洁", role: "保洁", phone: "13700006666", status: "在职", shift: "早班", handoverPassword: "" },
    { id: "E004", name: "孙强", role: "夜班", phone: "13600007777", status: "休假", shift: "夜班", handoverPassword: "123456" }
  ],
  printer: {
    defaultPrinter: "前台热敏小票机",
    paper: "80mm",
    copies: 1,
    printOnCheckout: true,
    printReportHeader: true
  }
};

const labels = {
  clean: "空净",
  dirty: "空脏",
  maintenance: "维修",
  available: "可售",
  reserved: "已预订",
  occupied: "在住",
  locked: "锁房",
  confirmed: "已确认",
  checkedin: "已入住",
  inhouse: "在住",
  checkedout: "已退房"
};

const icons = {
  dashboard: "▦",
  reservations: "□",
  stays: "▤",
  finance: "￥",
  handover: "⇄",
  audit: "≡",
  settings: "⚙"
};

const defaultRoomNotes = {
  "201": "靠近电梯，适合快速入住",
  "202": "待保洁查房",
  "203": "电话预订，预计晚到",
  "205": "今日离店，需查 minibar",
  "301": "安静房",
  "302": "客人要求延迟退房",
  "303": "携程预订，亲子入住",
  "305": "空调检修，暂不可售",
  "401": "投影已检查",
  "402": "待换床品",
  "403": "VIP 推荐房",
  "405": "长住客，退房前联系店长"
};

function $(selector) {
  return document.querySelector(selector);
}

function money(value) {
  return `¥${Number(value || 0).toLocaleString("zh-CN")}`;
}

function nights(arrival, departure) {
  const start = new Date(arrival);
  const end = new Date(departure);
  return Math.max(1, Math.round((end - start) / 86400000));
}

function addDays(date, days) {
  const value = new Date(`${date}T00:00:00`);
  value.setDate(value.getDate() + Number(days || 1));
  const year = value.getFullYear();
  const month = String(value.getMonth() + 1).padStart(2, "0");
  const day = String(value.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function roomById(id) {
  return state.rooms.find((room) => room.id === id);
}

function roomNote(room) {
  return room.note || defaultRoomNotes[room.id] || "无";
}

function floorById(id) {
  return state.floors.find((floor) => floor.id === String(id));
}

function floorName(id) {
  const floor = floorById(id);
  return floor ? floor.name : `${id}楼`;
}

function sortedFloors() {
  return [...state.floors].sort((a, b) => a.sort - b.sort || a.name.localeCompare(b.name, "zh-CN"));
}

function stayBalance(stayId) {
  return state.transactions
    .filter((item) => item.stayId === stayId)
    .reduce((sum, item) => sum + (item.type === "charge" ? item.amount : -item.amount), 0);
}

function selectedStay() {
  return state.stays.find((stay) => stay.id === state.selectedStayId) || state.stays.find((stay) => stay.status === "inhouse");
}

function showToast(message) {
  state.toast = message;
  render();
  window.clearTimeout(showToast.timer);
  showToast.timer = window.setTimeout(() => {
    state.toast = "";
    render();
  }, 2200);
}

function setView(view) {
  state.view = view;
  render();
}

function setSettingsSection(section) {
  state.settingsSection = section;
  render();
}

function setRoomFilter(filter) {
  state.roomFilter = filter;
  render();
}

function openModal(type, data = {}) {
  state.modal = { type, data };
  render();
}

function closeModal() {
  state.modal = null;
  render();
}

function availableRooms() {
  return state.rooms.filter((room) => room.sales === "available" && room.physical === "clean");
}

function dutyBarEmployee() {
  return state.employees.find((employee) => employee.status === "在职" && employee.role === "前台")
    || state.employees.find((employee) => employee.status === "在职")
    || state.employees[0];
}

function addTransaction(stayId, type, item, amount) {
  state.transactions.unshift({
    id: `T${Date.now()}`,
    stayId,
    type,
    item,
    amount: Number(amount),
    date: today,
    time: new Date().toLocaleTimeString("zh-CN", { hour: "2-digit", minute: "2-digit" }),
    operator: "当前用户"
  });
}

function createReservation(event) {
  event.preventDefault();
  const form = new FormData(event.target);
  const roomId = form.get("roomId");
  const room = roomById(roomId);
  const reservation = {
    id: `R${Date.now().toString().slice(-5)}`,
    guest: form.get("guest"),
    phone: form.get("phone"),
    roomId,
    roomType: room.type,
    arrival: form.get("arrival"),
    departure: form.get("departure"),
    source: form.get("source"),
    deposit: Number(form.get("deposit") || 0),
    status: "confirmed"
  };
  state.reservations.unshift(reservation);
  room.sales = "reserved";
  state.audit.unshift(`${timeNow()} 新增预订 ${reservation.guest} ${roomId}`);
  closeModal();
  showToast("预订已创建，房态已锁定");
}

function saveFloor(event) {
  event.preventDefault();
  const form = new FormData(event.target);
  const originalId = form.get("originalId");
  const id = String(form.get("id")).trim();
  const name = String(form.get("name")).trim();
  const sort = Number(form.get("sort") || id || 0);
  if (!id || !name) return showToast("楼层编号和名称不能为空");
  if (state.floors.some((floor) => floor.id === id && floor.id !== originalId)) return showToast("楼层编号已存在");
  if (originalId) {
    const floor = floorById(originalId);
    floor.id = id;
    floor.name = name;
    floor.sort = sort;
    state.rooms.forEach((room) => {
      if (String(room.floor) === originalId) room.floor = id;
    });
    state.audit.unshift(`${timeNow()} 编辑楼层 ${name}`);
  } else {
    state.floors.push({ id, name, sort });
    state.audit.unshift(`${timeNow()} 新增楼层 ${name}`);
  }
  closeModal();
  showToast("楼层信息已保存");
}

function saveRoom(event) {
  event.preventDefault();
  const form = new FormData(event.target);
  const originalId = form.get("originalId");
  const id = String(form.get("id")).trim();
  if (!id) return showToast("房间号不能为空");
  if (state.rooms.some((room) => room.id === id && room.id !== originalId)) return showToast("房间号已存在");
  const payload = {
    id,
    type: String(form.get("type")).trim(),
    floor: String(form.get("floor")),
    price: Number(form.get("price") || 0),
    physical: form.get("physical"),
    sales: form.get("sales"),
    note: String(form.get("note") || "").trim()
  };
  if (originalId) {
    const room = roomById(originalId);
    Object.assign(room, payload);
    state.reservations.forEach((reservation) => {
      if (reservation.roomId === originalId) {
        reservation.roomId = id;
        reservation.roomType = payload.type;
      }
    });
    state.stays.forEach((stay) => {
      if (stay.roomId === originalId) stay.roomId = id;
    });
    state.audit.unshift(`${timeNow()} 编辑房间 ${originalId} → ${id}`);
  } else {
    state.rooms.push(payload);
    state.audit.unshift(`${timeNow()} 新增房间 ${id}`);
  }
  closeModal();
  showToast("房间信息已保存");
}

function saveRoomNote(event) {
  event.preventDefault();
  const form = new FormData(event.target);
  const roomId = form.get("roomId");
  const room = roomById(roomId);
  if (!room) return;
  room.note = String(form.get("note") || "").trim();
  state.audit.unshift(`${timeNow()} 编辑房间备注 ${roomId}`);
  closeModal();
  showToast("房间备注已保存");
}

function saveEmployee(event) {
  event.preventDefault();
  const form = new FormData(event.target);
  const originalId = form.get("originalId");
  const id = String(form.get("id")).trim();
  if (!id) return showToast("员工编号不能为空");
  if (state.employees.some((employee) => employee.id === id && employee.id !== originalId)) return showToast("员工编号已存在");
  const payload = {
    id,
    name: String(form.get("name")).trim(),
    role: form.get("role"),
    phone: String(form.get("phone")).trim(),
    status: form.get("status"),
    shift: form.get("shift"),
    handoverPassword: String(form.get("handoverPassword") || "").trim()
  };
  if (originalId) {
    Object.assign(state.employees.find((employee) => employee.id === originalId), payload);
    state.audit.unshift(`${timeNow()} 编辑员工 ${payload.name}`);
  } else {
    state.employees.push(payload);
    state.audit.unshift(`${timeNow()} 新增员工 ${payload.name}`);
  }
  closeModal();
  showToast("员工信息已保存");
}

function saveShiftSetting(event) {
  event.preventDefault();
  const form = new FormData(event.target);
  const name = String(form.get("name")).trim();
  if (!name) return showToast("班次名称不能为空");
  if (state.shifts.some((shift) => shift.name === name)) return showToast("班次名称已存在");
  state.shifts.push({
    id: `shift-${Date.now()}`,
    name,
    start: form.get("start") || "08:00",
    end: form.get("end") || "16:00"
  });
  state.audit.unshift(`${timeNow()} 新增交接班班次 ${name}`);
  event.target.reset();
  showToast("班次已添加");
}

function deleteShiftSetting(id) {
  const shift = state.shifts.find((item) => item.id === id);
  if (!shift) return;
  const used = state.employees.some((employee) => employee.shift === shift.name) || state.shiftHandovers.some((item) => item.shift === shift.name);
  if (used) return showToast("该班次已有员工或交接班记录使用，不能删除");
  state.shifts = state.shifts.filter((item) => item.id !== id);
  state.audit.unshift(`${timeNow()} 删除交接班班次 ${shift.name}`);
  showToast("班次已删除");
}

function deleteFloor(id) {
  const floor = floorById(id);
  if (!floor) return;
  const usedRooms = state.rooms.filter((room) => String(room.floor) === id).length;
  if (usedRooms) return showToast(`该楼层还有 ${usedRooms} 间房，不能删除`);
  state.floors = state.floors.filter((item) => item.id !== id);
  state.audit.unshift(`${timeNow()} 删除楼层 ${floor.name}`);
  closeModal();
  showToast("楼层已删除");
}

function deleteRoom(id) {
  const room = roomById(id);
  if (!room) return;
  const hasReservation = state.reservations.some((reservation) => reservation.roomId === id && reservation.status === "confirmed");
  const hasStay = state.stays.some((stay) => stay.roomId === id && stay.status === "inhouse");
  if (hasReservation || hasStay) return showToast("该房间仍有预订或在住单，不能删除");
  state.rooms = state.rooms.filter((item) => item.id !== id);
  state.audit.unshift(`${timeNow()} 删除房间 ${id}`);
  closeModal();
  showToast("房间已删除");
}

function deleteEmployee(id) {
  const employee = state.employees.find((item) => item.id === id);
  if (!employee) return;
  state.employees = state.employees.filter((item) => item.id !== id);
  state.audit.unshift(`${timeNow()} 删除员工 ${employee.name}`);
  closeModal();
  showToast("员工已删除");
}

function checkInReservation(id) {
  const reservation = state.reservations.find((item) => item.id === id);
  if (!reservation) return;
  const room = roomById(reservation.roomId);
  const stay = {
    id: `S${Date.now().toString().slice(-5)}`,
    guest: reservation.guest,
    phone: reservation.phone,
    roomId: reservation.roomId,
    arrival: today,
    departure: reservation.departure,
    status: "inhouse",
    rate: room.price,
    deposit: reservation.deposit
  };
  state.stays.unshift(stay);
  addTransaction(stay.id, "charge", "房费", room.price * nights(today, reservation.departure));
  if (reservation.deposit) addTransaction(stay.id, "payment", "预订押金转入", reservation.deposit);
  reservation.status = "checkedin";
  room.sales = "occupied";
  room.physical = "clean";
  state.selectedStayId = stay.id;
  state.audit.unshift(`${timeNow()} ${stay.guest}办理入住 ${stay.roomId}`);
  showToast("已办理入住并生成账单");
}

function assistRefund(id) {
  const reservation = state.reservations.find((item) => item.id === id);
  if (!reservation) return;
  state.audit.unshift(`${timeNow()} 协助退款 ${reservation.guest} ${reservation.roomId}`);
  showToast(`已记录 ${reservation.guest} 的协助退款请求`);
}

function walkIn(roomId) {
  const room = roomById(roomId);
  openModal("walkin", { roomId, rate: room.price });
}

function syncWalkinDeparture() {
  const form = $("#walkinForm");
  if (!form) return;
  const days = Math.max(1, Number(form.nights.value || 1));
  form.nights.value = days;
  form.departure.value = addDays(today, days);
}

function syncWalkinNights() {
  const form = $("#walkinForm");
  if (!form) return;
  form.nights.value = nights(today, form.departure.value);
}

function syncWalkinRoomDetails(select) {
  const form = $("#walkinForm");
  const room = roomById(select.value);
  if (!form || !room) return;
  form.rate.value = room.price;
  form.note.value = roomNote(room) === "无" ? "" : roomNote(room);
}

function handleRoomDoubleClick(roomId) {
  const room = roomById(roomId);
  const stay = state.stays.find((item) => item.roomId === roomId && item.status === "inhouse");
  if (room.sales === "available" && room.physical === "clean") {
    walkIn(roomId);
    return;
  }
  if (room.sales === "occupied" && stay) {
    checkout(stay.id);
    return;
  }
  if (room.sales === "reserved") return showToast(`${roomId} 已有预订，请从预约到店办理入住`);
  if (room.physical === "dirty") return showToast(`${roomId} 当前为空脏，置净后才可入住`);
  if (room.sales === "locked" || room.physical === "maintenance") return showToast(`${roomId} 正在维修或锁房，不能办理入住`);
  showToast(`${roomId} 当前状态不允许办理入住`);
}

function createWalkIn(event) {
  event.preventDefault();
  const form = new FormData(event.target);
  const roomId = form.get("roomId");
  const room = roomById(roomId);
  if (!room || room.sales !== "available" || room.physical !== "clean") return showToast("请选择当前可入住的房间");
  const stay = {
    id: `S${Date.now().toString().slice(-5)}`,
    guest: form.get("guest"),
    phone: form.get("phone"),
    idNumber: String(form.get("idNumber") || "").trim(),
    gender: form.get("gender"),
    address: String(form.get("address") || "").trim(),
    memberLevel: form.get("memberLevel"),
    isMember: form.get("memberLevel") !== "非会员",
    source: form.get("source"),
    registrar: form.get("registrar"),
    roomId,
    arrival: today,
    departure: form.get("departure"),
    status: "inhouse",
    rate: Number(form.get("rate")),
    deposit: Number(form.get("deposit") || 0)
  };
  state.stays.unshift(stay);
  addTransaction(stay.id, "charge", "房费", stay.rate * nights(today, stay.departure));
  if (stay.deposit) addTransaction(stay.id, "payment", "押金", stay.deposit);
  room.sales = "occupied";
  room.physical = "clean";
  room.note = String(form.get("note") || "").trim();
  state.selectedStayId = stay.id;
  state.audit.unshift(`${timeNow()} 散客入住 ${stay.guest} ${roomId}`);
  closeModal();
  showToast("散客入住完成");
}

function addFolioItem(event) {
  event.preventDefault();
  const form = new FormData(event.target);
  const stayId = form.get("stayId");
  addTransaction(stayId, form.get("type"), form.get("item"), Number(form.get("amount")));
  state.audit.unshift(`${timeNow()} 账务入账 ${form.get("item")} ${money(form.get("amount"))}`);
  closeModal();
  showToast("账务流水已记录");
}

function checkout(stayId) {
  const stay = state.stays.find((item) => item.id === stayId);
  if (!stay) return;
  const balance = stayBalance(stayId);
  if (balance > 0) {
    openModal("collect", { stayId, balance });
    return;
  }
  completeCheckout(stayId);
}

function collectAndCheckout(event) {
  event.preventDefault();
  const form = new FormData(event.target);
  const stayId = form.get("stayId");
  addTransaction(stayId, "payment", form.get("item"), Number(form.get("amount")));
  completeCheckout(stayId);
}

function completeCheckout(stayId) {
  const stay = state.stays.find((item) => item.id === stayId);
  const room = roomById(stay.roomId);
  stay.status = "checkedout";
  room.sales = "available";
  room.physical = "dirty";
  state.audit.unshift(`${timeNow()} ${stay.guest}退房 ${stay.roomId}`);
  closeModal();
  showToast("退房完成，房间已转为空脏");
}

function markClean(roomId) {
  const room = roomById(roomId);
  room.physical = "clean";
  state.audit.unshift(`${timeNow()} ${roomId} 标记为空净`);
  showToast(`${roomId} 已改为空净`);
}

function toggleMaintenance(roomId) {
  const room = roomById(roomId);
  if (room.sales === "locked") {
    room.sales = "available";
    room.physical = "dirty";
    showToast(`${roomId} 已解除锁房`);
  } else {
    room.sales = "locked";
    room.physical = "maintenance";
    showToast(`${roomId} 已设置维修锁房`);
  }
  state.audit.unshift(`${timeNow()} ${roomId} ${room.sales === "locked" ? "锁房" : "解除锁房"}`);
}

function timeNow() {
  return new Date().toLocaleTimeString("zh-CN", { hour: "2-digit", minute: "2-digit" });
}

function metrics() {
  const total = state.rooms.length;
  const occupied = state.rooms.filter((room) => room.sales === "occupied").length;
  const reserved = state.rooms.filter((room) => room.sales === "reserved").length;
  const cleanAvailable = availableRooms().length;
  const revenue = state.transactions
    .filter((item) => item.type === "charge")
    .reduce((sum, item) => sum + item.amount, 0);
  const adr = occupied ? Math.round(revenue / occupied) : 0;
  return { total, occupied, reserved, cleanAvailable, occupancy: Math.round((occupied / total) * 100), revenue, adr };
}

function render() {
  const app = $("#app");
  app.innerHTML = `
    <div class="shell">
      ${renderSidebar()}
      <main class="main">
        ${renderTopbar()}
        ${state.view === "dashboard" ? renderMetrics() : ""}
        ${renderView()}
      </main>
    </div>
    ${state.modal ? renderModal() : ""}
    ${state.toast ? `<div class="toast">${state.toast}</div>` : ""}
  `;
}

function renderSidebar() {
  const items = [
    ["dashboard", "前台工作台"],
    ["reservations", "预订管理"],
    ["stays", "在住与退房"],
    ["finance", "财务报表"],
    ["handover", "前台交班"],
    ["audit", "操作审计"],
    ["settings", "系统设置"]
  ];
  return `
    <aside class="sidebar">
      <div class="brand">
        <div class="brand-mark">P</div>
        <div>
          <div class="brand-title">松庭宾馆 PMS</div>
          <div class="brand-subtitle">单门店前台版</div>
        </div>
      </div>
      <nav class="nav">
        ${items.map(([id, label]) => `
          <button class="${state.view === id ? "active" : ""}" onclick="setView('${id}')">
            <span class="nav-icon">${icons[id]}</span><span>${label}</span>
          </button>
        `).join("")}
      </nav>
      <div class="sidebar-footer">
        今日营业日：${today}<br />
        操作规则：先看房态，再办预订/入住，账务只记流水。
      </div>
    </aside>
  `;
}

function renderTopbar() {
  const titles = {
    dashboard: ["前台工作台", "预约到店、今日离店、房态与关键操作集中处理。"],
    reservations: ["预订管理", "管理确认预订、到店入住和取消风险。"],
    stays: ["在住与退房", "查看当前住客，处理续住、挂账、收款和退房。"],
    finance: ["财务报表", "合并账务流水与经营报表，支持导出、打印和长期查询。"],
    handover: ["前台交班", "记录交班人、接班人、班次和重点事项，方便下一班追溯。"],
    audit: ["操作审计", "查看前台、房态、账务和设置维护的最近操作记录。"],
    settings: ["系统设置", "维护楼层、房间号、房型价格和员工基础信息。"]
  };
  const [title, hint] = titles[state.view];
  return `
    <div class="topbar">
      <div>
        <h1>${title}</h1>
        <div class="hint">${hint}</div>
      </div>
      <div class="actions">
        <button class="btn secondary" onclick="openModal('reservation')">＋ 新建预订</button>
        <button class="btn" onclick="openModal('walkin')">＋ 散客入住</button>
      </div>
    </div>
  `;
}

function renderMetrics() {
  const item = metrics();
  return `
    <section class="metrics">
      <div class="metric"><div class="metric-label">入住率</div><div class="metric-value">${item.occupancy}%</div><div class="metric-note">${item.occupied}/${item.total} 间在住</div></div>
      <div class="metric"><div class="metric-label">可售空净房</div><div class="metric-value">${item.cleanAvailable}</div><div class="metric-note">${item.reserved} 间今日预订锁定</div></div>
      <div class="metric"><div class="metric-label">今日房费收入</div><div class="metric-value">${money(item.revenue)}</div><div class="metric-note">按当前账务流水汇总</div></div>
      <div class="metric"><div class="metric-label">ADR</div><div class="metric-value">${money(item.adr)}</div><div class="metric-note">平均已入账房价</div></div>
    </section>
  `;
}

function renderView() {
  if (state.view === "reservations") return renderReservations();
  if (state.view === "stays") return renderStays();
  if (state.view === "finance") return renderFinance();
  if (state.view === "handover") return renderHandoverPage();
  if (state.view === "audit") return renderAuditPage();
  if (state.view === "settings") return renderSettings();
  return renderDashboard();
}

function renderDashboard() {
  return `
    <div class="layout">
      ${renderRoomPanel()}
      <div class="list">
        ${renderArrivalsPanel()}
        ${renderDeparturesPanel()}
      </div>
    </div>
  `;
}

function renderRoomPanel() {
  const filtered = state.rooms.filter((room) => {
    if (state.roomFilter === "all") return true;
    if (state.roomFilter === "clean") return room.physical === "clean" && room.sales === "available";
    if (state.roomFilter === "dirty") return room.physical === "dirty";
    return room.sales === state.roomFilter;
  });
  const filters = [
    ["all", "全部"],
    ["clean", "空净"],
    ["dirty", "空脏"],
    ["reserved", "预订"],
    ["occupied", "在住"],
    ["locked", "锁房"]
  ];
  return `
    <section class="panel">
      <div class="panel-head">
        <div class="panel-title">实时房态</div>
        <div class="tabs">
          ${filters.map(([id, label]) => `<button class="tab ${state.roomFilter === id ? "active" : ""}" onclick="setRoomFilter('${id}')">${label}</button>`).join("")}
        </div>
      </div>
      <div class="panel-body">
        <div class="room-grid">
          ${filtered.map(renderRoom).join("")}
        </div>
      </div>
    </section>
  `;
}

function renderRoom(room) {
  const stay = state.stays.find((item) => item.roomId === room.id && item.status === "inhouse");
  const reservation = state.reservations.find((item) => item.roomId === room.id && item.status === "confirmed");
  const guest = stay?.guest || reservation?.guest || "无住客";
  const canWalkIn = room.sales === "available" && room.physical === "clean";
  const roomTone = room.physical === "dirty" || room.physical === "maintenance" ? room.physical : room.sales;
  return `
    <article class="room room-${roomTone}" ondblclick="handleRoomDoubleClick('${room.id}')" title="双击根据房态办理入住、退房或查看提示">
      <div class="room-top">
        <div class="room-no">${room.id}</div>
        <span class="tag ${room.sales}">${labels[room.sales]}</span>
      </div>
      <div class="room-meta">${floorName(room.floor)} · ${room.type} · ${money(room.price)} / 晚</div>
      <div><span class="tag ${room.physical}">${labels[room.physical]}</span></div>
      <div class="room-meta">客人：${guest}</div>
      <div class="room-note" ondblclick="event.stopPropagation(); openModal('roomNote', { id: '${room.id}' })" title="双击编辑备注"><span>备注</span>${roomNote(room)}</div>
      <div class="room-actions">
        ${canWalkIn ? `<button class="btn small" onclick="walkIn('${room.id}')">入住</button>` : ""}
        ${room.physical === "dirty" ? `<button class="btn small secondary" onclick="markClean('${room.id}')">置净</button>` : ""}
        <button class="btn small secondary" onclick="toggleMaintenance('${room.id}')">${room.sales === "locked" ? "解锁" : "锁房"}</button>
      </div>
    </article>
  `;
}

function renderArrivalsPanel() {
  const arrivals = state.reservations.filter((item) => item.arrival === today && item.status === "confirmed");
  return `
    <section class="panel">
      <div class="panel-head"><div class="panel-title">预约到店</div><span class="tag reserved">${arrivals.length} 单</span></div>
      <div class="panel-body list">
        ${arrivals.length ? arrivals.map((item) => renderReservationRow(item, true)).join("") : `<div class="empty">暂无预约到店</div>`}
      </div>
    </section>
  `;
}

function renderDeparturesPanel() {
  const departures = state.stays.filter((item) => item.departure === today && item.status === "inhouse");
  return `
    <section class="panel">
      <div class="panel-head"><div class="panel-title">今日离店</div><span class="tag occupied">${departures.length} 间</span></div>
      <div class="panel-body list">
        ${departures.length ? departures.map(renderStayRow).join("") : `<div class="empty">暂无今日离店住客</div>`}
      </div>
    </section>
  `;
}

function renderAuditPage() {
  return `
    <section class="panel">
      <div class="panel-head">
        <div class="panel-title">操作审计</div>
        <span class="tag available">${state.audit.length} 条</span>
      </div>
      <div class="panel-body audit-page-list">
        ${state.audit.map((line, index) => `
          <div class="audit-row">
            <span class="audit-index">${String(index + 1).padStart(2, "0")}</span>
            <span>${line}</span>
          </div>
        `).join("")}
      </div>
    </section>
  `;
}

function renderReservations() {
  return `
    <section class="panel">
      <div class="panel-head"><div class="panel-title">预订列表</div><button class="btn small" onclick="openModal('reservation')">新建预订</button></div>
      <div class="panel-body list">
        ${state.reservations.map((item) => renderReservationRow(item)).join("")}
      </div>
    </section>
  `;
}

function renderReservationRow(item, forceArrivalAction = false) {
  const canCheckIn = item.status === "confirmed";
  const canRefund = item.status === "checkedin";
  const statusTone = item.status === "confirmed" ? "reserved" : item.status === "checkedin" ? "occupied" : "available";
  return `
    <div class="list-row">
      <div class="row-main">
        <div>
          <div class="row-title">${item.guest} · ${item.roomId} ${item.roomType}</div>
          <div class="row-sub">${item.arrival} 到店，${item.departure} 离店 · ${item.source} · 押金 ${money(item.deposit)}</div>
          ${canCheckIn ? `<div class="row-actions inline-actions"><button class="btn compact" onclick="checkInReservation('${item.id}')">办理入住</button></div>` : ""}
          ${canRefund && !forceArrivalAction ? `<div class="row-actions inline-actions"><button class="btn compact secondary" onclick="assistRefund('${item.id}')">协助退款</button></div>` : ""}
        </div>
        <span class="tag ${statusTone}">${labels[item.status] || item.status}</span>
      </div>
    </div>
  `;
}

function renderStays() {
  const active = state.stays.filter((item) => item.status === "inhouse");
  return `
    <section class="panel">
      <div class="panel-head"><div class="panel-title">在住列表</div></div>
      <div class="panel-body list">
        ${active.map(renderStayRow).join("")}
      </div>
    </section>
  `;
}

function renderStayRow(item) {
  const balance = stayBalance(item.id);
  return `
    <div class="list-row">
      <div class="row-main">
        <div>
          <div class="row-title">${item.guest} · ${item.roomId} · ${roomById(item.roomId)?.type || ""}</div>
          <div class="row-sub">${item.arrival} 至 ${item.departure} · 房价 ${money(item.rate)} · 账单余额 <strong>${money(balance)}</strong></div>
          <div class="row-actions inline-actions">
            <button class="btn compact secondary" onclick="state.selectedStayId='${item.id}'; openModal('folio', { stayId: '${item.id}' })">挂账/收款</button>
            <button class="btn compact" onclick="checkout('${item.id}')">退房结账</button>
          </div>
        </div>
        <span class="tag occupied">在住</span>
      </div>
    </div>
  `;
}

function transactionDate(item) {
  return item.date || today;
}

function inFinanceDateRange(item) {
  const date = transactionDate(item);
  return (!state.financeStart || date >= state.financeStart) && (!state.financeEnd || date <= state.financeEnd);
}

function setFinanceDateRange(field, value) {
  state[field] = value;
  render();
}

function openCalendarInput(id) {
  const input = document.getElementById(id);
  if (!input) return;
  input.focus();
  if (typeof input.showPicker === "function") input.showPicker();
}

function applyFinanceDateRange(event) {
  event.preventDefault();
  const form = new FormData(event.target);
  state.financeStart = form.get("financeStart") || "";
  state.financeEnd = form.get("financeEnd") || "";
  if (state.financeStart && state.financeEnd && state.financeStart > state.financeEnd) {
    const start = state.financeStart;
    state.financeStart = state.financeEnd;
    state.financeEnd = start;
  }
  render();
}

function resetFinanceDateRange() {
  state.financeStart = "";
  state.financeEnd = "";
  render();
}

function financeRows() {
  const rows = state.selectedStayId
    ? state.transactions.filter((item) => item.stayId === state.selectedStayId)
    : state.transactions;
  return rows.filter(inFinanceDateRange);
}

function financeReportRows() {
  return financeRows().map((item) => {
    const stay = state.stays.find((entry) => entry.id === item.stayId);
    return {
      date: transactionDate(item),
      time: item.time,
      room: stay?.roomId || "-",
      guest: stay?.guest || "-",
      item: item.item,
      type: item.type === "charge" ? "费用" : "收款",
      amount: item.amount,
      operator: item.operator
    };
  });
}

function groupedFinanceRows(rows) {
  const groups = new Map();
  rows.forEach((row) => {
    if (!groups.has(row.date)) groups.set(row.date, { date: row.date, charges: 0, payments: 0, count: 0 });
    const group = groups.get(row.date);
    group.count += 1;
    if (row.type === "费用") group.charges += row.amount;
    if (row.type === "收款") group.payments += row.amount;
  });
  return [...groups.values()].sort((a, b) => b.date.localeCompare(a.date));
}

function exportFinanceReport() {
  const header = ["日期", "时间", "房间", "住客", "项目", "类型", "金额", "操作员"];
  const lines = [header, ...financeReportRows().map((row) => [row.date, row.time, row.room, row.guest, row.item, row.type, row.amount, row.operator])];
  const csv = lines.map((line) => line.map((cell) => `"${String(cell).replaceAll('"', '""')}"`).join(",")).join("\r\n");
  const blob = new Blob([`\ufeff${csv}`], { type: "text/csv;charset=utf-8" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = `finance-report-${today}.csv`;
  link.click();
  URL.revokeObjectURL(link.href);
  state.audit.unshift(`${timeNow()} 导出财务报表`);
  showToast("财务报表已导出");
}

function printFinanceReport() {
  state.audit.unshift(`${timeNow()} 打印财务报表`);
  showToast(`已调用 ${state.printer.defaultPrinter} 打印设置`);
  window.setTimeout(() => window.print(), 80);
}

function savePrinterSettings(event) {
  event.preventDefault();
  const form = new FormData(event.target);
  state.printer = {
    defaultPrinter: String(form.get("defaultPrinter")).trim() || "前台热敏小票机",
    paper: form.get("paper"),
    copies: Number(form.get("copies") || 1),
    printOnCheckout: form.get("printOnCheckout") === "on",
    printReportHeader: form.get("printReportHeader") === "on"
  };
  state.audit.unshift(`${timeNow()} 保存打印机设置 ${state.printer.defaultPrinter}`);
  showToast("打印机设置已保存");
  render();
}

function submitShiftHandover(event) {
  event.preventDefault();
  const form = new FormData(event.target);
  const from = String(form.get("from")).trim();
  const to = String(form.get("to")).trim();
  if (!from || !to) return showToast("请选择交班人和接班人");
  if (from === to) return showToast("交班人与接班人不能是同一个人");
  const record = {
    id: `H${Date.now()}`,
    date: today,
    time: timeNow(),
    shift: form.get("shift"),
    from,
    to,
    note: ""
  };
  state.shiftHandovers.unshift(record);
  state.audit.unshift(`${timeNow()} 前台交接班 ${record.from} → ${record.to}`);
  event.target.reset();
  showToast("交班已确认");
}

function handoverSummary(dirty) {
  return [
    ["预约到店", state.reservations.filter((item) => item.arrival === today && item.status === "confirmed").length],
    ["今日离店", state.stays.filter((item) => item.departure === today && item.status === "inhouse").length],
    ["待打扫房", dirty],
    ["未结余额", state.stays.filter((s) => s.status === "inhouse" && stayBalance(s.id) > 0).length]
  ];
}

function renderHandoverFormPanel(dirty) {
  const handoverEmployees = state.employees.filter((employee) => employee.status === "在职");
  const fallbackEmployees = handoverEmployees.length ? handoverEmployees : state.employees;
  return `
    <section class="panel handover-panel">
      <div class="panel-head"><div class="panel-title">前台交接班</div></div>
      <div class="panel-body list">
        <form class="handover-form" onsubmit="submitShiftHandover(event)">
          <div class="handover-summary-grid">
            ${handoverSummary(dirty).map(([label, value]) => `
              <div class="handover-summary-item">
                <span>${label}</span>
                <strong>${value}</strong>
              </div>
            `).join("")}
          </div>
          <div class="form-grid">
            <div class="field"><label>交班日期</label><div class="readonly-field">${today}</div></div>
            <div class="field"><label>班次</label><select name="shift">${state.shifts.map((shift) => `<option>${shift.name}</option>`).join("")}</select></div>
            <div class="field"><label>交班人</label><select name="from" required>${fallbackEmployees.map((employee, index) => `<option ${index === 0 ? "selected" : ""}>${employee.name}</option>`).join("")}</select></div>
            <div class="field"><label>接班人</label><select name="to" required>${fallbackEmployees.map((employee, index) => `<option ${index === 1 ? "selected" : ""}>${employee.name}</option>`).join("")}</select></div>
          </div>
          <div class="settings-form-actions"><button class="btn small">确认交班</button></div>
        </form>
      </div>
    </section>
  `;
}

function renderHandoverPage() {
  const dirty = state.rooms.filter((room) => room.physical === "dirty").length;
  return `
    <div class="handover-page">
      ${renderHandoverFormPanel(dirty)}
      <section class="panel">
        <div class="panel-head"><div class="panel-title">交班记录</div><span class="tag available">${state.shiftHandovers.length} 条</span></div>
        <div class="panel-body handover-history">
          ${state.shiftHandovers.map((item) => `
            <div class="list-row">
              <div class="row-title">${item.date} ${item.shift} · ${item.from} → ${item.to}</div>
              <div class="row-sub">${item.time} · 已确认交班</div>
            </div>
          `).join("")}
        </div>
      </section>
    </div>
  `;
}

function renderFinance() {
  const item = metrics();
  const dirty = state.rooms.filter((room) => room.physical === "dirty").length;
  const locked = state.rooms.filter((room) => room.sales === "locked").length;
  const selected = state.stays.find((entry) => entry.id === state.selectedStayId);
  const billStay = selected || state.stays.find((entry) => entry.status === "inhouse");
  const rows = financeReportRows();
  const groupedRows = groupedFinanceRows(rows);
  const rangeRevenue = rows.filter((row) => row.type === "费用").reduce((sum, row) => sum + row.amount, 0);
  const rangePayments = rows.filter((row) => row.type === "收款").reduce((sum, row) => sum + row.amount, 0);
  return `
    <div class="finance-page printable">
      <section class="panel finance-ledger">
        <div class="panel-head">
          <div class="panel-title">财务报表</div>
          <div class="panel-actions">
            ${billStay ? `<button class="btn small secondary" onclick="openModal('folio', { stayId: '${billStay.id}' })">新增流水</button>` : ""}
            <button class="btn small secondary" onclick="exportFinanceReport()">导出</button>
            <button class="btn small" onclick="printFinanceReport()">打印</button>
          </div>
        </div>
        <div class="panel-body">
          <form class="finance-filters" onsubmit="applyFinanceDateRange(event)">
            <div class="field">
              <label>开始日期</label>
              <div class="date-picker-field">
                <input id="financeStartInput" type="date" name="financeStart" value="${state.financeStart}" />
                <button type="button" class="date-picker-btn" onclick="openCalendarInput('financeStartInput')">日历</button>
              </div>
            </div>
            <div class="field">
              <label>结束日期</label>
              <div class="date-picker-field">
                <input id="financeEndInput" type="date" name="financeEnd" value="${state.financeEnd}" />
                <button type="button" class="date-picker-btn" onclick="openCalendarInput('financeEndInput')">日历</button>
              </div>
            </div>
            <button class="btn small">查询</button>
            <button type="button" class="btn small secondary" onclick="state.financeStart='${today}'; state.financeEnd='${today}'; render()">今天</button>
            <button type="button" class="btn small secondary" onclick="resetFinanceDateRange()">全部日期</button>
          </form>
          <div class="date-summary">
            ${groupedRows.length ? groupedRows.map((group) => `
              <div class="date-summary-item">
                <strong>${group.date}</strong>
                <span>${group.count} 笔 · 费用 ${money(group.charges)} · 收款 ${money(group.payments)}</span>
              </div>
            `).join("") : `<div class="empty">当前日期范围内暂无流水</div>`}
          </div>
          <div class="tabs finance-tabs">
            <button class="tab ${!state.selectedStayId ? "active" : ""}" onclick="state.selectedStayId=null; render()">全部流水</button>
            ${state.stays.filter((entry) => entry.status === "inhouse").map((entry) => `<button class="tab ${state.selectedStayId === entry.id ? "active" : ""}" onclick="state.selectedStayId='${entry.id}'; render()">${entry.roomId} ${entry.guest}</button>`).join("")}
          </div>
          <div class="table-wrap finance-table">
            <table>
              <thead><tr><th>日期</th><th>时间</th><th>房间</th><th>住客</th><th>项目</th><th>类型</th><th>金额</th><th>操作员</th></tr></thead>
              <tbody>
                ${rows.map((row) => `<tr><td>${row.date}</td><td>${row.time}</td><td>${row.room}</td><td>${row.guest}</td><td>${row.item}</td><td>${row.type}</td><td class="money">${money(row.amount)}</td><td>${row.operator}</td></tr>`).join("")}
              </tbody>
            </table>
          </div>
        </div>
      </section>
      <div class="finance-side">
        <section class="panel">
          <div class="panel-head"><div class="panel-title">账单摘要</div></div>
          <div class="panel-body">
            ${billStay ? renderFolioSummary(billStay) : `<div class="empty">请选择账单</div>`}
          </div>
        </section>
        <section class="panel">
          <div class="panel-head"><div class="panel-title">经营日报</div></div>
          <div class="panel-body ledger">
            <div class="ledger-line"><span>可售房总数</span><strong>${item.total - locked}</strong></div>
            <div class="ledger-line"><span>在住房</span><strong>${item.occupied}</strong></div>
            <div class="ledger-line"><span>空脏房</span><strong>${dirty}</strong></div>
            <div class="ledger-line"><span>维修锁房</span><strong>${locked}</strong></div>
            <div class="ledger-line"><span>查询费用</span><strong>${money(rangeRevenue)}</strong></div>
            <div class="ledger-line"><span>查询收款</span><strong>${money(rangePayments)}</strong></div>
            <div class="ledger-line"><span>ADR</span><strong>${money(item.adr)}</strong></div>
          </div>
        </section>
      </div>
    </div>
  `;
}

function renderFolios() {
  const stay = selectedStay();
  state.selectedStayId = stay?.id || null;
  const rows = state.transactions.filter((item) => item.stayId === state.selectedStayId);
  return `
    <div class="layout">
      <section class="panel">
        <div class="panel-head">
          <div class="panel-title">账务流水</div>
          ${stay ? `<button class="btn small" onclick="openModal('folio', { stayId: '${stay.id}' })">新增流水</button>` : ""}
        </div>
        <div class="panel-body">
          ${stay ? `
            <div class="tabs" style="margin-bottom:12px">
              ${state.stays.filter((item) => item.status === "inhouse").map((item) => `<button class="tab ${state.selectedStayId === item.id ? "active" : ""}" onclick="state.selectedStayId='${item.id}'; render()">${item.roomId} ${item.guest}</button>`).join("")}
            </div>
            <div class="table-wrap">
              <table>
                <thead><tr><th>时间</th><th>项目</th><th>类型</th><th>金额</th><th>操作员</th></tr></thead>
                <tbody>
                  ${rows.map((item) => `<tr><td>${item.time}</td><td>${item.item}</td><td>${item.type === "charge" ? "费用" : "收款"}</td><td class="money">${money(item.amount)}</td><td>${item.operator}</td></tr>`).join("")}
                </tbody>
              </table>
            </div>
          ` : `<div class="empty">暂无在住账单</div>`}
        </div>
      </section>
      <section class="panel">
        <div class="panel-head"><div class="panel-title">账单摘要</div></div>
        <div class="panel-body">
          ${stay ? renderFolioSummary(stay) : `<div class="empty">请选择账单</div>`}
        </div>
      </section>
    </div>
  `;
}

function renderFolioSummary(stay) {
  const charges = state.transactions.filter((item) => item.stayId === stay.id && item.type === "charge").reduce((sum, item) => sum + item.amount, 0);
  const payments = state.transactions.filter((item) => item.stayId === stay.id && item.type === "payment").reduce((sum, item) => sum + item.amount, 0);
  return `
    <div class="ledger">
      <div class="ledger-line"><span>住客</span><strong>${stay.guest}</strong></div>
      <div class="ledger-line"><span>房间</span><strong>${stay.roomId}</strong></div>
      <div class="ledger-line"><span>费用合计</span><strong>${money(charges)}</strong></div>
      <div class="ledger-line"><span>收款合计</span><strong>${money(payments)}</strong></div>
      <div class="ledger-line"><span>当前余额</span><strong>${money(charges - payments)}</strong></div>
      <button class="btn" onclick="checkout('${stay.id}')">退房结账</button>
    </div>
  `;
}

function renderReports() {
  const item = metrics();
  const dirty = state.rooms.filter((room) => room.physical === "dirty").length;
  const locked = state.rooms.filter((room) => room.sales === "locked").length;
  return `
    <div class="split">
      <section class="panel">
        <div class="panel-head"><div class="panel-title">经营日报</div></div>
        <div class="panel-body ledger">
          <div class="ledger-line"><span>可售房总数</span><strong>${item.total - locked}</strong></div>
          <div class="ledger-line"><span>在住房</span><strong>${item.occupied}</strong></div>
          <div class="ledger-line"><span>空脏房</span><strong>${dirty}</strong></div>
          <div class="ledger-line"><span>维修锁房</span><strong>${locked}</strong></div>
          <div class="ledger-line"><span>房费收入</span><strong>${money(item.revenue)}</strong></div>
          <div class="ledger-line"><span>ADR</span><strong>${money(item.adr)}</strong></div>
        </div>
      </section>
      <section class="panel">
        <div class="panel-head"><div class="panel-title">前台交班要点</div></div>
        <div class="panel-body list">
          <div class="list-row"><div class="row-title">预约到店</div><div class="row-sub">${state.reservations.filter((r) => r.status === "confirmed").length} 单确认预订未入住</div></div>
          <div class="list-row"><div class="row-title">待打扫</div><div class="row-sub">${dirty} 间空脏房需保洁处理</div></div>
          <div class="list-row"><div class="row-title">需关注余额</div><div class="row-sub">${state.stays.filter((s) => s.status === "inhouse" && stayBalance(s.id) > 0).length} 个账单仍有未结余额</div></div>
        </div>
      </section>
    </div>
  `;
}

function renderSettings() {
  const sections = [
    { id: "overview", title: "设置首页", desc: "基础资料总览与维护入口" },
    { id: "floors", title: "楼层管理", desc: "维护楼层编号、名称与排序" },
    { id: "rooms", title: "房间管理", desc: "维护房号、楼层、房型、价格和房态" },
    { id: "employees", title: "员工管理", desc: "维护员工岗位、联系方式和状态" },
    { id: "handover", title: "交接班设置", desc: "维护班次名称、开始时间和结束时间" },
    { id: "printer", title: "打印机设置", desc: "维护默认打印机、纸张和打印偏好" }
  ];
  return `
    <div class="settings-page">
      <aside class="settings-menu">
        <div class="settings-menu-title">设置目录</div>
        ${sections.map((section) => `
          <button class="settings-menu-item ${state.settingsSection === section.id ? "active" : ""}" onclick="setSettingsSection('${section.id}')">
            <span>${section.title}</span>
            <small>${section.desc}</small>
          </button>
        `).join("")}
      </aside>
      <section class="settings-content">
        ${renderSettingsSection()}
      </section>
    </div>
  `;
}

function renderSettingsSection() {
  if (state.settingsSection === "floors") return renderFloorSettings();
  if (state.settingsSection === "rooms") return renderRoomSettings();
  if (state.settingsSection === "employees") return renderEmployeeSettings();
  if (state.settingsSection === "handover") return renderHandoverSettings();
  if (state.settingsSection === "printer") return renderPrinterSettings();
  return renderSettingsOverview();
}

function renderSettingsOverview() {
  const locked = state.rooms.filter((room) => room.sales === "locked").length;
  const dirty = state.rooms.filter((room) => room.physical === "dirty").length;
  return `
    <div class="settings-section-head">
      <div>
        <div class="section-kicker">基础资料</div>
        <h2>系统设置首页</h2>
        <p>从左侧目录进入具体设置项。这里保留关键资料的数量和最近维护状态，避免一进设置就被表格淹没。</p>
      </div>
    </div>
    <div class="settings-summary">
      <button class="settings-summary-item" onclick="setSettingsSection('floors')">
        <strong>${state.floors.length}</strong>
        <span>楼层</span>
      </button>
      <button class="settings-summary-item" onclick="setSettingsSection('rooms')">
        <strong>${state.rooms.length}</strong>
        <span>房间</span>
      </button>
      <button class="settings-summary-item" onclick="setSettingsSection('employees')">
        <strong>${state.employees.length}</strong>
        <span>员工</span>
      </button>
      <button class="settings-summary-item" onclick="setSettingsSection('handover')">
        <strong>${state.shifts.length}</strong>
        <span>交接班班次</span>
      </button>
      <button class="settings-summary-item" onclick="setSettingsSection('printer')">
        <strong>${state.printer.paper}</strong>
        <span>打印纸张</span>
      </button>
    </div>
    <div class="settings-guide">
      <div class="guide-row"><span>1</span><div><strong>先维护楼层</strong><p>楼层决定房间的归属和显示顺序。</p></div></div>
      <div class="guide-row"><span>2</span><div><strong>再维护房间</strong><p>房间号、房型、价格和房态会同步到前台看板。</p></div></div>
      <div class="guide-row"><span>3</span><div><strong>维护员工与交班</strong><p>员工班次、交接班密码和班次设置会影响前台交接班记录。</p></div></div>
    </div>
  `;
}

function renderFloorSettings() {
  return `
    <div class="settings-section-head">
      <div>
        <div class="section-kicker">基础资料 / 楼层管理</div>
        <h2>楼层管理</h2>
        <p>维护楼层编号、名称和显示排序。修改楼层编号后，已归属该楼层的房间会自动跟随。</p>
      </div>
      <button class="btn" onclick="openModal('floor')">新增楼层</button>
    </div>
    <div class="settings-list">
      ${sortedFloors().map(renderFloorRow).join("")}
    </div>
  `;
}

function renderRoomSettings() {
  return `
    <div class="settings-section-head">
      <div>
        <div class="section-kicker">基础资料 / 房间管理</div>
        <h2>房间管理</h2>
        <p>维护房间号、楼层、房型、价格、销售状态和物理房态。改房间号会同步预订、在住单与看板。</p>
      </div>
      <button class="btn" onclick="openModal('room')">新增房间</button>
    </div>
    <div class="table-wrap settings-table">
      <table>
        <thead><tr><th>房间号</th><th>楼层</th><th>房型</th><th>门市价</th><th>房态</th><th>操作</th></tr></thead>
        <tbody>${[...state.rooms].sort((a, b) => String(a.id).localeCompare(String(b.id), "zh-CN")).map(renderRoomSettingRow).join("")}</tbody>
      </table>
    </div>
  `;
}

function renderEmployeeSettings() {
  return `
    <div class="settings-section-head">
      <div>
        <div class="section-kicker">基础资料 / 员工管理</div>
        <h2>员工管理</h2>
        <p>维护员工编号、岗位、手机号、所属班次和交接班密码。密码只显示设置状态，不在列表中明文展示。</p>
      </div>
      <button class="btn" onclick="openModal('employee')">新增员工</button>
    </div>
    <div class="table-wrap settings-table">
      <table>
        <thead><tr><th>编号</th><th>姓名</th><th>岗位</th><th>班次</th><th>手机号</th><th>交班密码</th><th>状态</th><th>操作</th></tr></thead>
        <tbody>${state.employees.map(renderEmployeeRow).join("")}</tbody>
      </table>
    </div>
  `;
}

function renderHandoverSettings() {
  return `
    <div class="settings-section-head">
      <div>
        <div class="section-kicker">基础资料 / 交接班设置</div>
        <h2>交接班设置</h2>
        <p>维护前台可选择的班次。已经被员工或历史交接班记录使用的班次不能直接删除。</p>
      </div>
    </div>
    <form class="settings-form shift-form" onsubmit="saveShiftSetting(event)">
      <div class="form-grid">
        <div class="field"><label>班次名称</label><input name="name" required placeholder="例如 晚班" /></div>
        <div class="field"><label>开始时间</label><input type="time" name="start" value="16:00" /></div>
        <div class="field"><label>结束时间</label><input type="time" name="end" value="00:00" /></div>
        <div class="field shift-submit"><label>&nbsp;</label><button class="btn">添加班次</button></div>
      </div>
    </form>
    <div class="settings-list">
      ${state.shifts.map((shift) => `
        <div class="list-row">
          <div class="row-main">
            <div>
              <div class="row-title">${shift.name}</div>
              <div class="row-sub">${shift.start} - ${shift.end} · ${state.employees.filter((employee) => employee.shift === shift.name).length} 名员工</div>
            </div>
            <div class="row-actions">
              <button class="btn small danger" onclick="deleteShiftSetting('${shift.id}')">删除</button>
            </div>
          </div>
        </div>
      `).join("")}
    </div>
  `;
}

function renderPrinterSettings() {
  const printer = state.printer;
  return `
    <div class="settings-section-head">
      <div>
        <div class="section-kicker">基础资料 / 打印机设置</div>
        <h2>打印机设置</h2>
        <p>设置财务报表、退房账单和小票默认使用的打印机参数。浏览器会在打印时继续使用本机可用打印机。</p>
      </div>
    </div>
    <form id="printerSettingsForm" class="settings-form" onsubmit="savePrinterSettings(event)">
      <div class="form-grid">
        <div class="field">
          <label>默认打印机</label>
          <input name="defaultPrinter" value="${printer.defaultPrinter}" placeholder="例如 前台热敏小票机" />
        </div>
        <div class="field">
          <label>纸张规格</label>
          <select name="paper">
            ${["80mm", "58mm", "A4"].map((paper) => `<option value="${paper}" ${printer.paper === paper ? "selected" : ""}>${paper}</option>`).join("")}
          </select>
        </div>
        <div class="field">
          <label>默认份数</label>
          <input type="number" min="1" max="5" name="copies" value="${printer.copies}" />
        </div>
        <label class="check-field">
          <input type="checkbox" name="printOnCheckout" ${printer.printOnCheckout ? "checked" : ""} />
          <span>退房结账后自动提示打印账单</span>
        </label>
        <label class="check-field">
          <input type="checkbox" name="printReportHeader" ${printer.printReportHeader ? "checked" : ""} />
          <span>打印财务报表时显示宾馆抬头</span>
        </label>
      </div>
      <div class="settings-form-actions">
        <button class="btn" form="printerSettingsForm">保存打印设置</button>
      </div>
    </form>
  `;
}

function renderFloorRow(floor) {
  const count = state.rooms.filter((room) => String(room.floor) === floor.id).length;
  return `
    <div class="list-row">
      <div class="row-main">
        <div>
          <div class="row-title">${floor.name}</div>
          <div class="row-sub">编号 ${floor.id} · 排序 ${floor.sort} · ${count} 间房</div>
        </div>
        <div class="row-actions">
          <button class="btn small secondary" onclick="openModal('floor', { id: '${floor.id}' })">编辑</button>
          <button class="btn small danger" onclick="openModal('deleteFloor', { id: '${floor.id}' })">删除</button>
        </div>
      </div>
    </div>
  `;
}

function renderRoomSettingRow(room) {
  return `
    <tr>
      <td><strong>${room.id}</strong></td>
      <td>${floorName(room.floor)}</td>
      <td>${room.type}</td>
      <td class="money">${money(room.price)}</td>
      <td><span class="tag ${room.sales}">${labels[room.sales]}</span> <span class="tag ${room.physical}">${labels[room.physical]}</span></td>
      <td>
        <div class="row-actions">
          <button class="btn small secondary" onclick="openModal('room', { id: '${room.id}' })">编辑</button>
          <button class="btn small danger" onclick="openModal('deleteRoom', { id: '${room.id}' })">删除</button>
        </div>
      </td>
    </tr>
  `;
}

function renderEmployeeRow(employee) {
  const tone = employee.status === "在职" ? "available" : employee.status === "休假" ? "dirty" : "locked";
  return `
    <tr>
      <td><strong>${employee.id}</strong></td>
      <td>${employee.name}</td>
      <td>${employee.role}</td>
      <td>${employee.shift || "-"}</td>
      <td>${employee.phone}</td>
      <td><span class="tag ${employee.handoverPassword ? "available" : "locked"}">${employee.handoverPassword ? "已设置" : "未设置"}</span></td>
      <td><span class="tag ${tone}">${employee.status}</span></td>
      <td>
        <div class="row-actions">
          <button class="btn small secondary" onclick="openModal('employee', { id: '${employee.id}' })">编辑</button>
          <button class="btn small danger" onclick="openModal('deleteEmployee', { id: '${employee.id}' })">删除</button>
        </div>
      </td>
    </tr>
  `;
}

function renderModal() {
  const { type, data } = state.modal;
  if (type === "reservation") return renderReservationModal();
  if (type === "walkin") return renderWalkinModal(data);
  if (type === "folio") return renderFolioModal(data);
  if (type === "collect") return renderCollectModal(data);
  if (type === "floor") return renderFloorModal(data);
  if (type === "room") return renderRoomModal(data);
  if (type === "roomNote") return renderRoomNoteModal(data);
  if (type === "employee") return renderEmployeeModal(data);
  if (type === "deleteFloor") return renderDeleteFloorModal(data);
  if (type === "deleteRoom") return renderDeleteRoomModal(data);
  if (type === "deleteEmployee") return renderDeleteEmployeeModal(data);
  return "";
}

function renderReservationModal() {
  return modalShell("新建预订", `
    <form id="reservationForm" class="form-grid" onsubmit="createReservation(event)">
      <div class="field"><label>客人姓名</label><input name="guest" required value="新客人" /></div>
      <div class="field"><label>手机号</label><input name="phone" required value="13800006666" /></div>
      <div class="field"><label>到店日期</label><input type="date" name="arrival" required value="${today}" /></div>
      <div class="field"><label>离店日期</label><input type="date" name="departure" required value="2026-05-26" /></div>
      <div class="field"><label>房间</label><select name="roomId" required>${availableRooms().map((room) => `<option value="${room.id}">${room.id} ${room.type} ${money(room.price)}</option>`).join("")}</select></div>
      <div class="field"><label>来源</label><select name="source"><option>电话</option><option>前台</option><option>携程</option><option>美团</option></select></div>
      <div class="field full"><label>预收押金</label><input type="number" name="deposit" min="0" value="100" /></div>
    </form>
  `, `<button class="btn secondary" onclick="closeModal()">取消</button><button class="btn" form="reservationForm">保存预订</button>`);
}

function renderWalkinModal(data = {}) {
  const rooms = data.roomId ? [roomById(data.roomId)] : availableRooms();
  const firstRoom = rooms[0];
  const initialNights = 1;
  const initialDeparture = addDays(today, initialNights);
  const registrar = dutyBarEmployee()?.name || "值班吧台";
  if (!firstRoom) {
    return modalShell("散客入住", `<div class="empty">暂无可入住状态的房间</div>`, `<button class="btn secondary" onclick="closeModal()">关闭</button>`);
  }
  return modalShell("散客入住", `
    <form id="walkinForm" class="form-grid" onsubmit="createWalkIn(event)">
      <div class="field"><label>姓名</label><input name="guest" required value="散客" /></div>
      <div class="field"><label>手机号</label><input name="phone" required value="13900007777" /></div>
      <div class="field"><label>身份证号</label><input name="idNumber" required placeholder="请输入身份证号" /></div>
      <div class="field"><label>性别</label><select name="gender"><option>男</option><option>女</option><option>其他</option></select></div>
      <div class="field full"><label>地址</label><input name="address" placeholder="身份证或常住地址" /></div>
      <div class="field"><label>房间号</label><select name="roomId" required onchange="syncWalkinRoomDetails(this)">${rooms.map((room) => `<option value="${room.id}">${room.id} ${room.type}</option>`).join("")}</select></div>
      <div class="field"><label>房价</label><input type="number" name="rate" min="0" value="${data.rate || firstRoom.price || 188}" /></div>
      <div class="field"><label>入住天数</label><input type="number" name="nights" min="1" value="${initialNights}" oninput="syncWalkinDeparture()" /></div>
      <div class="field"><label>离店日期</label><input type="date" name="departure" required value="${initialDeparture}" onchange="syncWalkinNights()" /></div>
      <div class="field"><label>押金</label><input type="number" name="deposit" min="0" value="200" /></div>
      <div class="field"><label>会员等级</label><select name="memberLevel"><option>非会员</option><option>普通会员</option><option>银卡会员</option><option>金卡会员</option><option>协议客户</option></select></div>
      <div class="field"><label>渠道</label><select name="source"><option>前台散客</option><option>电话</option><option>携程</option><option>美团</option><option>会员预订</option><option>其他</option></select></div>
      <div class="field"><label>登记人</label><div class="readonly-field">${registrar}</div><input type="hidden" name="registrar" value="${registrar}" /></div>
      <div class="field full"><label>备注</label><textarea name="note" rows="3" placeholder="会同步到房态卡片备注">${roomNote(firstRoom) === "无" ? "" : roomNote(firstRoom)}</textarea></div>
    </form>
  `, `<button class="btn secondary" onclick="closeModal()">取消</button><button class="btn" form="walkinForm">办理入住</button>`);
}

function renderFolioModal(data) {
  const stay = state.stays.find((item) => item.id === data.stayId);
  return modalShell(`新增流水 · ${stay.roomId} ${stay.guest}`, `
    <form id="folioForm" class="form-grid" onsubmit="addFolioItem(event)">
      <input type="hidden" name="stayId" value="${stay.id}" />
      <div class="field"><label>类型</label><select name="type"><option value="charge">费用</option><option value="payment">收款</option></select></div>
      <div class="field"><label>项目</label><select name="item"><option>房费</option><option>押金</option><option>商品消费</option><option>现金收款</option><option>微信收款</option><option>冲账</option></select></div>
      <div class="field full"><label>金额</label><input type="number" name="amount" min="1" value="100" required /></div>
    </form>
  `, `<button class="btn secondary" onclick="closeModal()">取消</button><button class="btn" form="folioForm">记录流水</button>`);
}

function renderCollectModal(data) {
  return modalShell("退房收款", `
    <form id="collectForm" class="form-grid" onsubmit="collectAndCheckout(event)">
      <input type="hidden" name="stayId" value="${data.stayId}" />
      <div class="field"><label>收款项目</label><select name="item"><option>退房补收</option><option>微信收款</option><option>现金收款</option></select></div>
      <div class="field"><label>需收金额</label><input type="number" name="amount" min="0" value="${data.balance}" required /></div>
      <div class="field full"><div class="hint">当前账单仍有 ${money(data.balance)} 未结，收款后将自动退房并转为空脏。</div></div>
    </form>
  `, `<button class="btn secondary" onclick="closeModal()">取消</button><button class="btn" form="collectForm">收款并退房</button>`);
}

function renderFloorModal(data = {}) {
  const floor = data.id ? floorById(data.id) : { id: "", name: "", sort: state.floors.length + 1 };
  return modalShell(data.id ? "编辑楼层" : "新增楼层", `
    <form id="floorForm" class="form-grid" onsubmit="saveFloor(event)">
      <input type="hidden" name="originalId" value="${floor.id}" />
      <div class="field"><label>楼层编号</label><input name="id" required value="${floor.id}" placeholder="例如 5" /></div>
      <div class="field"><label>楼层名称</label><input name="name" required value="${floor.name}" placeholder="例如 五楼客房" /></div>
      <div class="field full"><label>显示排序</label><input type="number" name="sort" value="${floor.sort}" /></div>
    </form>
  `, `<button class="btn secondary" onclick="closeModal()">取消</button><button class="btn" form="floorForm">保存楼层</button>`);
}

function renderRoomModal(data = {}) {
  const room = data.id ? roomById(data.id) : { id: "", floor: sortedFloors()[0]?.id || "1", type: "大床房", price: 188, physical: "clean", sales: "available", note: "" };
  return modalShell(data.id ? `编辑房间 ${room.id}` : "新增房间", `
    <form id="roomForm" class="form-grid" onsubmit="saveRoom(event)">
      <input type="hidden" name="originalId" value="${room.id}" />
      <div class="field"><label>房间号</label><input name="id" required value="${room.id}" placeholder="例如 501" /></div>
      <div class="field"><label>所属楼层</label><select name="floor">${sortedFloors().map((floor) => `<option value="${floor.id}" ${String(room.floor) === floor.id ? "selected" : ""}>${floor.name}</option>`).join("")}</select></div>
      <div class="field"><label>房型</label><input name="type" required value="${room.type}" /></div>
      <div class="field"><label>门市价</label><input type="number" name="price" min="0" value="${room.price}" /></div>
      <div class="field"><label>销售状态</label><select name="sales">${["available", "reserved", "occupied", "locked"].map((key) => `<option value="${key}" ${room.sales === key ? "selected" : ""}>${labels[key]}</option>`).join("")}</select></div>
      <div class="field"><label>物理房态</label><select name="physical">${["clean", "dirty", "maintenance"].map((key) => `<option value="${key}" ${room.physical === key ? "selected" : ""}>${labels[key]}</option>`).join("")}</select></div>
      <div class="field full"><label>房间备注</label><textarea name="note" rows="3" placeholder="例如：靠近电梯、待保洁、客人要求等">${roomNote(room)}</textarea></div>
    </form>
  `, `<button class="btn secondary" onclick="closeModal()">取消</button><button class="btn" form="roomForm">保存房间</button>`);
}

function renderRoomNoteModal(data = {}) {
  const room = roomById(data.id);
  return modalShell(`编辑备注 · ${room.id}`, `
    <form id="roomNoteForm" class="form-grid" onsubmit="saveRoomNote(event)">
      <input type="hidden" name="roomId" value="${room.id}" />
      <div class="field full"><label>房间备注</label><textarea name="note" rows="4" autofocus>${roomNote(room) === "无" ? "" : roomNote(room)}</textarea></div>
    </form>
  `, `<button class="btn secondary" onclick="closeModal()">取消</button><button class="btn" form="roomNoteForm">保存备注</button>`);
}

function renderEmployeeModal(data = {}) {
  const employee = data.id ? state.employees.find((item) => item.id === data.id) : { id: `E${String(state.employees.length + 1).padStart(3, "0")}`, name: "", role: "前台", phone: "", status: "在职", shift: state.shifts[0]?.name || "早班", handoverPassword: "" };
  return modalShell(data.id ? `编辑员工 ${employee.name}` : "新增员工", `
    <form id="employeeForm" class="form-grid" onsubmit="saveEmployee(event)">
      <input type="hidden" name="originalId" value="${data.id ? employee.id : ""}" />
      <div class="field"><label>员工编号</label><input name="id" required value="${employee.id}" /></div>
      <div class="field"><label>姓名</label><input name="name" required value="${employee.name}" /></div>
      <div class="field"><label>岗位</label><select name="role">${["店长", "前台", "夜班", "保洁", "财务", "维修"].map((role) => `<option ${employee.role === role ? "selected" : ""}>${role}</option>`).join("")}</select></div>
      <div class="field"><label>员工班次</label><select name="shift">${state.shifts.map((shift) => `<option ${employee.shift === shift.name ? "selected" : ""}>${shift.name}</option>`).join("")}</select></div>
      <div class="field"><label>手机号</label><input name="phone" value="${employee.phone}" /></div>
      <div class="field"><label>交接班密码</label><input type="password" name="handoverPassword" value="${employee.handoverPassword || ""}" placeholder="用于交接确认" /></div>
      <div class="field"><label>状态</label><select name="status">${["在职", "休假", "停用"].map((status) => `<option ${employee.status === status ? "selected" : ""}>${status}</option>`).join("")}</select></div>
    </form>
  `, `<button class="btn secondary" onclick="closeModal()">取消</button><button class="btn" form="employeeForm">保存员工</button>`);
}

function renderDeleteFloorModal(data) {
  const floor = floorById(data.id);
  const count = state.rooms.filter((room) => String(room.floor) === data.id).length;
  return modalShell("删除楼层", `
    <div class="confirm-copy">
      <strong>${floor.name}</strong>
      <p>${count ? `该楼层还有 ${count} 间房。请先把房间迁走或删除后再删除楼层。` : "确认删除这个楼层？删除后不会影响历史审计记录。"}</p>
    </div>
  `, `<button class="btn secondary" onclick="closeModal()">取消</button><button class="btn danger" ${count ? "disabled" : ""} onclick="deleteFloor('${floor.id}')">确认删除</button>`);
}

function renderDeleteRoomModal(data) {
  const room = roomById(data.id);
  const hasReservation = state.reservations.some((reservation) => reservation.roomId === data.id && reservation.status === "confirmed");
  const hasStay = state.stays.some((stay) => stay.roomId === data.id && stay.status === "inhouse");
  const blocked = hasReservation || hasStay;
  return modalShell("删除房间", `
    <div class="confirm-copy">
      <strong>${room.id} ${room.type}</strong>
      <p>${blocked ? "该房间仍有预订或在住单。请先处理预订/退房后再删除。" : "确认删除这个房间？删除后房态看板将不再显示该房间。"}</p>
    </div>
  `, `<button class="btn secondary" onclick="closeModal()">取消</button><button class="btn danger" ${blocked ? "disabled" : ""} onclick="deleteRoom('${room.id}')">确认删除</button>`);
}

function renderDeleteEmployeeModal(data) {
  const employee = state.employees.find((item) => item.id === data.id);
  return modalShell("删除员工", `
    <div class="confirm-copy">
      <strong>${employee.id} ${employee.name}</strong>
      <p>确认删除该员工资料？后续正式版可以改为停用员工以保留历史操作归属。</p>
    </div>
  `, `<button class="btn secondary" onclick="closeModal()">取消</button><button class="btn danger" onclick="deleteEmployee('${employee.id}')">确认删除</button>`);
}

function modalShell(title, body, actions) {
  return `
    <div class="modal-backdrop">
      <div class="modal">
        <div class="modal-head"><div class="modal-title">${title}</div><button class="close" onclick="closeModal()">×</button></div>
        <div class="modal-body">${body}</div>
        <div class="modal-actions">${actions}</div>
      </div>
    </div>
  `;
}

render();
