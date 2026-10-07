// Sample Data
const initialOrders = [
    { id: 'S8795', name: 'Nguyễn Văn A', pipelineDate: '2026-10-11', content: 'Hướng dẫn cấu hình DNS', isDone: false },
    { id: 'S5904', name: 'Trần Thị B', pipelineDate: '', content: 'Chưa ghi nội dung', isDone: false },
    { id: 'S0230', name: 'Công ty Cổ phần XYZ', pipelineDate: '2026-10-08', content: 'Xác nhận thông tin đơn hàng', isDone: false },
    { id: 'S4488', name: 'Lê Văn C', pipelineDate: '2026-10-15', content: 'Tư vấn nâng cấp Hosting', isDone: false },
    { id: 'S2897', name: 'Phạm Thị D', pipelineDate: '2026-10-31', content: 'Theo dõi xử lý kỹ thuật', isDone: false },
    { id: 'S5840', name: 'Công ty TNHH EY', pipelineDate: '2026-10-24', content: 'Xác nhận thông tin đơn hàng', isDone: false },
    { id: 'S3961', name: 'Công ty Cổ phần Alpha', pipelineDate: '', content: 'Còn trống', isDone: false },
    { id: 'S3424', name: 'Hoàng Văn E', pipelineDate: '2026-10-20', content: 'Tư vấn nâng cấp Hosting', isDone: false },
    { id: 'S4103', name: 'Công ty TNHH Beta', pipelineDate: '2026-10-30', content: 'Theo dõi cấp phát dịch vụ', isDone: false },
    { id: 'S5692', name: 'Công ty TNHH Gamma', pipelineDate: '', content: 'Còn trống', isDone: false },
    { id: 'S7392', name: 'Công ty Cổ phần Delta', pipelineDate: '2026-10-01', content: 'Hẹn gọi lại cho khách hàng', isDone: false },
    { id: 'S3254', name: 'Ngô Văn F', pipelineDate: '2026-10-01', content: 'Theo dõi cấp phát dịch vụ', isDone: false },
    { id: 'S2456', name: 'Đặng Thị G', pipelineDate: '2026-10-03', content: 'Tư vấn nâng cấp Hosting', isDone: false },
    { id: 'S0048', name: 'Công ty TNHH Epsilon', pipelineDate: '2026-10-04', content: 'Nhắc ký hợp đồng', isDone: false },
    { id: 'S9999', name: 'Bùi Văn H', pipelineDate: '2026-10-05', content: 'Cần hỗ trợ gấp', isDone: false },
    { id: 'S1001', name: 'Đỗ Thị I', pipelineDate: '2026-10-02', content: 'Báo giá dịch vụ cloud', isDone: true },
    { id: 'S1002', name: 'Vũ Văn K', pipelineDate: '2026-10-02', content: 'Hỗ trợ kỹ thuật server', isDone: false },
    { id: 'S1003', name: 'Công ty Cổ phần Theta', pipelineDate: '2026-10-03', content: 'Gửi hợp đồng', isDone: true },
    { id: 'S1004', name: 'Trần Văn L', pipelineDate: '2026-10-04', content: 'Tư vấn dịch vụ', isDone: false },
    { id: 'S1005', name: 'Lê Thị M', pipelineDate: '2026-10-05', content: 'Kiểm tra lỗi website', isDone: false },
    { id: 'S1006', name: 'Phạm Văn N', pipelineDate: '2026-10-06', content: 'Lên lịch họp', isDone: false },
    { id: 'S1007', name: 'Công ty TNHH Iota', pipelineDate: '2026-10-07', content: 'Xác nhận thanh toán', isDone: false },
    { id: 'S1008', name: 'Nguyễn Thị O', pipelineDate: '2026-10-08', content: 'Hỗ trợ reset password', isDone: false },
    { id: 'S1009', name: 'Hoàng Văn P', pipelineDate: '2026-10-09', content: 'Gia hạn dịch vụ', isDone: false },
    { id: 'S1010', name: 'Ngô Thị Q', pipelineDate: '2026-10-10', content: 'Gửi báo cáo định kỳ', isDone: false },
    { id: 'S1011', name: 'Đặng Văn R', pipelineDate: '2026-10-11', content: 'Hỗ trợ cài đặt phần mềm', isDone: false },
    { id: 'S1012', name: 'Bùi Thị S', pipelineDate: '2026-10-12', content: 'Tư vấn gói dịch vụ VIP', isDone: false },
    { id: 'S1013', name: 'Công ty Cổ phần Kappa', pipelineDate: '2026-10-13', content: 'Kiểm tra server', isDone: false },
    { id: 'S1014', name: 'Đỗ Văn T', pipelineDate: '2026-10-14', content: 'Gửi hóa đơn VAT', isDone: false },
    { id: 'S1015', name: 'Vũ Thị U', pipelineDate: '2026-10-15', content: 'Xác nhận thông tin email', isDone: false },
    { id: 'S1016', name: 'Trần Văn V', pipelineDate: '2026-10-16', content: 'Hướng dẫn sử dụng CRM', isDone: false },
    { id: 'S1017', name: 'Lê Thị X', pipelineDate: '2026-10-17', content: 'Khảo sát sự hài lòng', isDone: false },
    { id: 'S1018', name: 'Công ty TNHH Lambda', pipelineDate: '2026-10-18', content: 'Ký lại hợp đồng năm mới', isDone: false },
    { id: 'S1019', name: 'Phạm Văn Y', pipelineDate: '2026-10-19', content: 'Giải đáp thắc mắc dịch vụ', isDone: false },
    { id: 'S1020', name: 'Nguyễn Thị Z', pipelineDate: '2026-10-20', content: 'Hỗ trợ di chuyển dữ liệu', isDone: false },
    { id: 'S1021', name: 'Hoàng Văn AA', pipelineDate: '2026-10-21', content: 'Nâng cấp băng thông', isDone: false },
    { id: 'S1022', name: 'Ngô Thị BB', pipelineDate: '2026-10-22', content: 'Xử lý lỗi 502', isDone: false },
    { id: 'S1023', name: 'Công ty Cổ phần Mu', pipelineDate: '2026-10-23', content: 'Mở rộng lưu trữ', isDone: false },
    { id: 'S1024', name: 'Đặng Văn CC', pipelineDate: '2026-10-24', content: 'Tư vấn bảo mật', isDone: false },
    { id: 'S1025', name: 'Bùi Thị DD', pipelineDate: '2026-10-25', content: 'Kiểm tra sao lưu dữ liệu', isDone: false },
    { id: 'S1026', name: 'Đỗ Văn EE', pipelineDate: '2026-10-26', content: 'Đổi tên miền', isDone: false },
    { id: 'S1027', name: 'Vũ Thị FF', pipelineDate: '2026-10-27', content: 'Hỗ trợ config SSL', isDone: false },
    { id: 'S1028', name: 'Trần Văn GG', pipelineDate: '2026-10-28', content: 'Kích hoạt tài khoản email', isDone: false },
    { id: 'S1029', name: 'Lê Thị HH', pipelineDate: '2026-10-29', content: 'Hướng dẫn bảo mật 2FA', isDone: false },
    { id: 'S1030', name: 'Phạm Văn II', pipelineDate: '2026-10-30', content: 'Hỗ trợ tối ưu hóa website', isDone: false },
    { id: 'S1031', name: 'Nguyễn Thị KK', pipelineDate: '2026-10-01', content: 'Gửi báo giá', isDone: false },
    { id: 'S1032', name: 'Hoàng Văn LL', pipelineDate: '2026-10-01', content: 'Xác nhận thông định', isDone: false },
    { id: 'S1033', name: 'Ngô Thị MM', pipelineDate: '2026-10-02', content: 'Tư vấn cấu hình', isDone: false },
    { id: 'S1034', name: 'Đặng Văn NN', pipelineDate: '2026-10-02', content: 'Gia hạn tên miền', isDone: false },
    { id: 'S1035', name: 'Bùi Thị OO', pipelineDate: '2026-10-03', content: 'Cấp phát hosting', isDone: false },
    { id: 'S1036', name: 'Đỗ Văn PP', pipelineDate: '2026-10-03', content: 'Cài đặt VPS', isDone: false },
    { id: 'S1037', name: 'Vũ Thị QQ', pipelineDate: '2026-10-04', content: 'Xử lý hóa đơn', isDone: false },
    { id: 'S1038', name: 'Trần Văn RR', pipelineDate: '2026-10-04', content: 'Thanh toán trực tuyến', isDone: false },
    { id: 'S1039', name: 'Lê Thị SS', pipelineDate: '2026-10-05', content: 'Hỗ trợ kỹ thuật 24/7', isDone: false },
    { id: 'S1040', name: 'Phạm Văn TT', pipelineDate: '2026-10-05', content: 'Dịch vụ Email Server', isDone: false },
    { id: 'S1041', name: 'Nguyễn Thị UU', pipelineDate: '2026-10-06', content: 'Chuyển đổi gói cước', isDone: false },
    { id: 'S1042', name: 'Hoàng Văn VV', pipelineDate: '2026-10-06', content: 'Báo giá SSL', isDone: false },
    { id: 'S1043', name: 'Ngô Thị XX', pipelineDate: '2026-10-07', content: 'Nâng cấp máy chủ', isDone: false },
    { id: 'S1044', name: 'Đặng Văn YY', pipelineDate: '2026-10-07', content: 'Cập nhật hợp đồng', isDone: false },
    { id: 'S1045', name: 'Bùi Thị ZZ', pipelineDate: '2026-10-08', content: 'Khôi phục dữ liệu', isDone: false },
    { id: 'S1046', name: 'Đỗ Văn AB', pipelineDate: '2026-10-08', content: 'Tư vấn giải pháp', isDone: false },
    { id: 'S1047', name: 'Vũ Thị AC', pipelineDate: '2026-10-09', content: 'Xác thực tài khoản', isDone: false },
    { id: 'S1048', name: 'Trần Văn AD', pipelineDate: '2026-10-09', content: 'Hướng dẫn sử dụng', isDone: false },
    { id: 'S1049', name: 'Lê Thị AE', pipelineDate: '2026-10-10', content: 'Giải quyết khiếu nại', isDone: false },
    { id: 'S1050', name: 'Phạm Văn AF', pipelineDate: '2026-10-10', content: 'Thanh lý hợp đồng', isDone: false },
    { id: 'S1051', name: 'Nguyễn Thị AG', pipelineDate: '2026-10-11', content: 'Hỗ trợ đổi pass', isDone: false },
    { id: 'S1052', name: 'Hoàng Văn AH', pipelineDate: '2026-10-11', content: 'Kiểm tra log server', isDone: false },
    { id: 'S1053', name: 'Ngô Thị AI', pipelineDate: '2026-10-12', content: 'Cấu hình lại DNS', isDone: false },
    { id: 'S1054', name: 'Đặng Văn AK', pipelineDate: '2026-10-12', content: 'Hỗ trợ tích hợp API', isDone: false },
    { id: 'S1055', name: 'Bùi Thị AL', pipelineDate: '2026-10-13', content: 'Xóa tài nguyên', isDone: false },
    { id: 'S1056', name: 'Đỗ Văn AM', pipelineDate: '2026-10-13', content: 'Báo lỗi hệ thống', isDone: false },
    { id: 'S1057', name: 'Vũ Thị AN', pipelineDate: '2026-10-14', content: 'Gia hạn chứng chỉ SSL', isDone: false },
    { id: 'S1058', name: 'Trần Văn AO', pipelineDate: '2026-10-14', content: 'Sao lưu định kỳ', isDone: false },
    { id: 'S1059', name: 'Lê Thị AP', pipelineDate: '2026-10-15', content: 'Kiểm tra ping', isDone: false },
    { id: 'S1060', name: 'Phạm Văn AQ', pipelineDate: '2026-10-15', content: 'Tư vấn Firewall', isDone: false }
];

// State
let orders = [...initialOrders];
const offSystemTasks = [
    { id: 'OS001', content: 'OS001 - Xử lý hợp đồng ABC', pipelineDate: '2026-10-06' },
    { id: 'OS002', content: 'OS002 - Gọi điện tư vấn KH VIP', pipelineDate: '2026-10-07' },
    { id: 'OS003', content: 'OS003 - Gửi email báo giá', pipelineDate: '2026-10-08' },
    { id: 'OS004', content: 'OS004 - Xác nhận thanh toán', pipelineDate: '2026-10-09' },
    { id: 'OS005', content: 'OS005 - Cập nhật thông tin website', pipelineDate: '2026-10-10' },
    { id: 'OS006', content: 'OS006 - Họp với team marketing', pipelineDate: '2026-10-11' },
    { id: 'OS007', content: 'OS007 - Gửi hóa đơn đỏ', pipelineDate: '2026-10-12' },
    { id: 'OS008', content: 'OS008 - Đăng bài fanpage', pipelineDate: '2026-10-13' },
    { id: 'OS009', content: 'OS009 - Kiểm tra lỗi server', pipelineDate: '2026-10-14' },
    { id: 'OS010', content: 'OS010 - Liên hệ đối tác XYZ', pipelineDate: '2026-10-15' }
];

let currentDate = new Date();
let viewingDate = new Date(currentDate);
let currentTab = 'unassigned';
let selectedCalendarDate = null; // Used when clicking a date in calendar

// Elements
const elMonthSelect = document.getElementById('month-select');
const elYearSelect = document.getElementById('year-select');
const elCalendarDays = document.getElementById('calendar-days');
const elOrdersBody = document.getElementById('orders-body');
const elViewTitle = document.getElementById('view-title');
const elEmptyState = document.getElementById('empty-state');
const elTable = document.getElementById('orders-table');
const tabBtns = document.querySelectorAll('.tab-btn');
const elDefaultView = document.getElementById('default-view');
const elOffSystemView = document.getElementById('off-system-view');
const elHeaderActions = document.querySelector('.header-actions');

// Modal Elements
const modal = document.getElementById('pipeline-modal');
const overlay = document.getElementById('modal-overlay');
const closeBtns = document.querySelectorAll('.close-modal');
const form = document.getElementById('pipeline-form');
const elModalOrderId = document.getElementById('modal-order-id');
const elModalDate = document.getElementById('modal-date');
const elModalContent = document.getElementById('modal-content');

// Formatting
const formatDateStr = (dateObj) => {
    const y = dateObj.getFullYear();
    const m = String(dateObj.getMonth() + 1).padStart(2, '0');
    const d = String(dateObj.getDate()).padStart(2, '0');
    return `${y}-${m}-${d}`;
};

const formatDateVN = (dateStr) => {
    if (!dateStr) return '';
    const parts = dateStr.split('-');
    return `${parts[2]}/${parts[1]}/${parts[0]}`;
};

const getTodayStr = () => formatDateStr(currentDate);

// Categorize order
const getOrderStatus = (order) => {
    if (order.isDone) return 'done';
    if (!order.pipelineDate) return 'unassigned';
    
    const today = getTodayStr();
    if (order.pipelineDate === today) return 'today';
    if (order.pipelineDate < today) return 'late';
    return 'future';
};

// Initialize
function init() {
    setupCalendarSelectors();
    renderCalendar();
    setupTabs();
    setupModal();
    updateView();
}

function setupCalendarSelectors() {
    const months = ['Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6', 'Tháng 7', 'Tháng 8', 'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12'];
    months.forEach((m, i) => {
        const option = document.createElement('option');
        option.value = i;
        option.textContent = m;
        elMonthSelect.appendChild(option);
    });

    const currentYear = currentDate.getFullYear();
    for (let i = currentYear - 5; i <= currentYear + 5; i++) {
        const option = document.createElement('option');
        option.value = i;
        option.textContent = `Năm ${i}`;
        elYearSelect.appendChild(option);
    }

    elMonthSelect.value = viewingDate.getMonth();
    elYearSelect.value = viewingDate.getFullYear();

    elMonthSelect.addEventListener('change', (e) => {
        viewingDate.setMonth(parseInt(e.target.value));
        renderCalendar();
    });

    elYearSelect.addEventListener('change', (e) => {
        viewingDate.setFullYear(parseInt(e.target.value));
        renderCalendar();
    });

    document.getElementById('prev-month').addEventListener('click', () => {
        viewingDate.setMonth(viewingDate.getMonth() - 1);
        elMonthSelect.value = viewingDate.getMonth();
        elYearSelect.value = viewingDate.getFullYear();
        renderCalendar();
    });

    document.getElementById('next-month').addEventListener('click', () => {
        viewingDate.setMonth(viewingDate.getMonth() + 1);
        elMonthSelect.value = viewingDate.getMonth();
        elYearSelect.value = viewingDate.getFullYear();
        renderCalendar();
    });
}

function renderCalendar() {
    elCalendarDays.innerHTML = '';
    const year = viewingDate.getFullYear();
    const month = viewingDate.getMonth();
    
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    
    // Empty slots before first day (0 is Sunday)
    for (let i = 0; i < firstDay; i++) {
        const div = document.createElement('div');
        div.className = 'calendar-day empty';
        elCalendarDays.appendChild(div);
    }
    
    for (let i = 1; i <= daysInMonth; i++) {
        const div = document.createElement('div');
        div.className = 'calendar-day';
        div.textContent = i;
        
        const cellDateStr = formatDateStr(new Date(year, month, i));
        const todayStr = getTodayStr();
        
        if (cellDateStr === todayStr) {
            div.classList.add('today');
        }

        if (selectedCalendarDate === cellDateStr) {
            div.classList.add('active');
        }
        
        // Check tasks for this day
        const hasUnprocessed = orders.some(o => o.pipelineDate === cellDateStr && !o.isDone);
        
        if (cellDateStr < todayStr) {
            if (hasUnprocessed) {
                div.classList.add('past-has-unprocessed');
            } else {
                div.classList.add('past-no-unprocessed');
                div.innerHTML = `<span class="date-num">${i}</span>`;
            }
        } else {
            if (hasUnprocessed) {
                div.classList.add('has-task');
            }
        }
        
        div.addEventListener('click', () => {
            selectedCalendarDate = cellDateStr;
            currentTab = 'calendar_date';
            
            // Remove active from tabs
            tabBtns.forEach(btn => btn.classList.remove('active'));
            
            renderCalendar(); // Re-render to update active styling
            updateView();
        });
        
        elCalendarDays.appendChild(div);
    }
}

function setupTabs() {
    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            tabBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentTab = btn.dataset.tab;
            selectedCalendarDate = null;
            renderCalendar(); // clear active calendar date
            updateView();
        });
    });
}

function updateBadges() {
    let unassigned = 0, todayCount = 0, late = 0, done = 0;
    const todayStr = getTodayStr();

    orders.forEach(o => {
        const status = getOrderStatus(o);
        if (status === 'unassigned') unassigned++;
        else if (status === 'today') todayCount++;
        else if (status === 'late') late++;
        else if (status === 'done') done++;
    });

    document.getElementById('badge-unassigned').textContent = unassigned;
    document.getElementById('badge-today').textContent = todayCount;
    document.getElementById('badge-late').textContent = late;
    document.getElementById('badge-done').textContent = done;

    let offSystemToday = 0;
    offSystemTasks.forEach(t => {
        if (t.pipelineDate === todayStr) {
            offSystemToday++;
        }
    });
    const badgeOffSystem = document.getElementById('badge-offsystem');
    if (badgeOffSystem) badgeOffSystem.textContent = offSystemToday;
}

function updateView() {
    updateBadges();
    
    if (currentTab === 'off_system') {
        elViewTitle.textContent = 'Công việc ngoài hệ thống';
        if (elHeaderActions) elHeaderActions.classList.add('hidden');
        if (elDefaultView) elDefaultView.classList.add('hidden');
        if (elOffSystemView) elOffSystemView.classList.remove('hidden');
        renderOffSystemList(); // will be defined later
        return;
    } else {
        if (elHeaderActions) elHeaderActions.classList.remove('hidden');
        if (elDefaultView) elDefaultView.classList.remove('hidden');
        if (elOffSystemView) elOffSystemView.classList.add('hidden');
    }
    
    let filteredOrders = [];
    
    if (currentTab === 'calendar_date') {
        elViewTitle.textContent = `Đơn hàng ngày ${formatDateVN(selectedCalendarDate)}`;
        filteredOrders = orders.filter(o => o.pipelineDate === selectedCalendarDate);
    } else {
        const titles = {
            'unassigned': 'Đơn hàng chưa set pipeline',
            'today': 'Hôm nay xử lý',
            'late': 'Đơn hàng trễ pipeline',
            'done': 'Đơn hàng đã hoàn thành'
        };
        elViewTitle.textContent = titles[currentTab];
        
        filteredOrders = orders.filter(o => getOrderStatus(o) === currentTab);
        
        if (currentTab === 'late') {
            filteredOrders.sort((a, b) => (a.pipelineDate || '').localeCompare(b.pipelineDate || ''));
        }
    }
    
    renderTable(filteredOrders);
}

function renderRowContent(tr, order) {
    let statusHtml = '';
    if (currentTab === 'unassigned') {
         statusHtml = `<span class="status-badge missing">Chưa set</span>`;
    } else if (order.isDone) {
         statusHtml = `<span class="status-badge set" style="background:#d1fae5;color:#059669">Done</span>`;
    } else if (order.pipelineDate < getTodayStr()) {
         statusHtml = `<span class="status-badge late">Trễ</span>`;
    } else {
         statusHtml = `<span class="status-badge set">Đã set</span>`;
    }

    let actionsHtml = '';
    if (!order.isDone) {
         actionsHtml += `<button class="btn-action" onclick="openModal('${order.id}')" title="Set Pipeline"><i class="fas fa-edit"></i> Set</button>`;
         if (order.pipelineDate) {
             actionsHtml += `<button class="btn-action" onclick="markDone('${order.id}')" title="Đánh dấu Done" style="color:var(--success)"><i class="fas fa-check"></i> Done</button>`;
         }
    } else {
         actionsHtml = `<button class="btn-action" onclick="openModal('${order.id}')" title="Chỉnh sửa"><i class="fas fa-edit"></i></button>`;
    }

    if (order.isDone) {
        tr.innerHTML = `
            <td><strong>${order.id}</strong><br>${statusHtml}</td>
            <td>${order.name}</td>
            <td style="color:#9ca3af; text-align:center;">-</td>
            <td style="color:#9ca3af; text-align:center;">-</td>
            <td>${actionsHtml}</td>
        `;
    } else {
        tr.innerHTML = `
            <td><strong>${order.id}</strong><br>${statusHtml}</td>
            <td>${order.name}</td>
            <td>${formatDateVN(order.pipelineDate) || '<span style="color:#9ca3af;font-style:italic">Chưa có</span>'}</td>
            <td>${order.content || '<span style="color:#9ca3af;font-style:italic">Chưa có</span>'}</td>
            <td>${actionsHtml}</td>
        `;
    }
}

function renderTable(data) {
    elOrdersBody.innerHTML = '';
    
    if (data.length === 0) {
        elTable.classList.add('hidden');
        elEmptyState.classList.remove('hidden');
        return;
    }
    
    elTable.classList.remove('hidden');
    elEmptyState.classList.add('hidden');
    
    if (currentTab === 'late') {
        const groups = {};
        data.forEach(order => {
            const dateStr = order.pipelineDate || 'Chưa có';
            if (!groups[dateStr]) groups[dateStr] = [];
            groups[dateStr].push(order);
        });

        Object.keys(groups).forEach(dateStr => {
            const headerTr = document.createElement('tr');
            headerTr.className = 'date-group-header';
            headerTr.innerHTML = `<td colspan="5"><i class="fas fa-chevron-right"></i> Ngày hẹn: ${formatDateVN(dateStr) || dateStr} (${groups[dateStr].length} đơn)</td>`;
            elOrdersBody.appendChild(headerTr);

            const rowElements = [];
            
            groups[dateStr].forEach(order => {
                const tr = document.createElement('tr');
                tr.className = 'date-group-row hidden';
                renderRowContent(tr, order);
                elOrdersBody.appendChild(tr);
                rowElements.push(tr);
            });

            headerTr.addEventListener('click', () => {
                const isOpen = headerTr.classList.toggle('open');
                rowElements.forEach(row => {
                    if (isOpen) row.classList.remove('hidden');
                    else row.classList.add('hidden');
                });
            });
        });
    } else {
        data.forEach(order => {
            const tr = document.createElement('tr');
            renderRowContent(tr, order);
            elOrdersBody.appendChild(tr);
        });
    }
}

function setupModal() {
    closeBtns.forEach(btn => {
        btn.addEventListener('click', closeModal);
    });
    
    overlay.addEventListener('click', closeModal);
    
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const id = elModalOrderId.value;
        const newDate = elModalDate.value;
        const newContent = elModalContent.value;
        
        const orderIndex = orders.findIndex(o => o.id === id);
        if (orderIndex > -1) {
            orders[orderIndex].pipelineDate = newDate;
            orders[orderIndex].content = newContent;
            
            // Re-render
            updateView();
            renderCalendar();
            closeModal();
            
            // "cuộn để sang tab tiêu đề: Hôm nay xử lý" -> Let's switch if it was unassigned
            if (currentTab === 'unassigned' && newDate === getTodayStr()) {
                document.querySelector('.tab-btn[data-tab="today"]').click();
            }
        }
    });
}

window.openModal = function(orderId) {
    const order = orders.find(o => o.id === orderId);
    if (!order) return;
    
    elModalOrderId.value = order.id;
    elModalDate.value = order.pipelineDate || getTodayStr();
    elModalContent.value = order.content !== 'Chưa ghi nội dung' && order.content !== 'Còn trống' ? order.content : '';
    
    modal.classList.remove('hidden');
    overlay.classList.remove('hidden');
}

function closeModal() {
    modal.classList.add('hidden');
    overlay.classList.add('hidden');
    form.reset();
}

window.markDone = function(orderId) {
    const orderIndex = orders.findIndex(o => o.id === orderId);
    if (orderIndex > -1) {
        orders[orderIndex].isDone = true;
        updateView();
        renderCalendar();
    }
}

// Off-system logic
const osSubTabs = document.querySelectorAll('.sub-tab-btn');
const subViewAdd = document.getElementById('sub-view-add');
const subViewList = document.getElementById('sub-view-list');
const osForm = document.getElementById('off-system-form');
const osTableBody = document.getElementById('os-body');

if (osSubTabs) {
    osSubTabs.forEach(btn => {
        btn.addEventListener('click', () => {
            osSubTabs.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            if (btn.dataset.subtab === 'add_task') {
                subViewAdd.classList.remove('hidden');
                subViewList.classList.add('hidden');
            } else {
                subViewAdd.classList.add('hidden');
                subViewList.classList.remove('hidden');
                renderOffSystemList();
            }
        });
    });
}

if (osForm) {
    osForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const contentVal = document.getElementById('os-content').value;
        const dateVal = document.getElementById('os-date').value;
        
        // Add to list
        const newTask = {
            id: 'OS' + (offSystemTasks.length + 1).toString().padStart(3, '0'),
            content: contentVal,
            pipelineDate: dateVal
        };
        offSystemTasks.push(newTask);
        
        // Reset and switch to list
        osForm.reset();
        document.querySelector('.sub-tab-btn[data-subtab="list_task"]').click();
        updateBadges(); // Refresh badges
    });
}

function renderOffSystemList() {
    if(!osTableBody) return;
    osTableBody.innerHTML = '';
    
    // Sort tasks by date
    const sortedTasks = [...offSystemTasks].sort((a, b) => (a.pipelineDate || '').localeCompare(b.pipelineDate || ''));
    
    // Group tasks by date
    const groups = {};
    sortedTasks.forEach(task => {
        const dateStr = task.pipelineDate || 'Chưa có';
        if (!groups[dateStr]) groups[dateStr] = [];
        groups[dateStr].push(task);
    });
    
    const todayStr = getTodayStr();

    Object.keys(groups).forEach(dateStr => {
        const tasks = groups[dateStr];
        tasks.forEach((task, index) => {
            const tr = document.createElement('tr');
            let dateTd = '';
            if (index === 0) {
                // Ensure rowspan matches the number of tasks in this date group
                const isToday = (task.pipelineDate === todayStr);
                const colorStyle = isToday ? 'color: var(--success);' : '';
                dateTd = `<td rowspan="${tasks.length}" style="vertical-align: top; font-weight: 600; ${colorStyle}">${formatDateVN(task.pipelineDate) || dateStr}</td>`;
            }
            tr.innerHTML = `
                ${dateTd}
                <td>${task.content}</td>
                <td><button class="btn-action" onclick="openOsEditModal('${task.id}')" title="Chỉnh sửa"><i class="fas fa-edit"></i></button></td>
            `;
            osTableBody.appendChild(tr);
        });
    });
}

// OS Edit Modal logic
const osEditModal = document.getElementById('os-edit-modal');
const osCloseBtns = document.querySelectorAll('.close-os-modal');
const osEditForm = document.getElementById('os-edit-form');
const elOsEditId = document.getElementById('os-edit-id');
const elOsEditDate = document.getElementById('os-edit-date');
const elOsEditContent = document.getElementById('os-edit-content');

if (osCloseBtns) {
    osCloseBtns.forEach(btn => {
        btn.addEventListener('click', closeOsEditModal);
    });
}

if (osEditForm) {
    osEditForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const id = elOsEditId.value;
        const newDate = elOsEditDate.value;
        const newContent = elOsEditContent.value;
        
        const taskIndex = offSystemTasks.findIndex(t => t.id === id);
        if (taskIndex > -1) {
            offSystemTasks[taskIndex].pipelineDate = newDate;
            offSystemTasks[taskIndex].content = newContent;
            renderOffSystemList();
            updateBadges(); // Refresh badges
            closeOsEditModal();
        }
    });
}

window.openOsEditModal = function(taskId) {
    const task = offSystemTasks.find(t => t.id === taskId);
    if (!task) return;
    
    elOsEditId.value = task.id;
    elOsEditDate.value = task.pipelineDate;
    elOsEditContent.value = task.content;
    
    osEditModal.classList.remove('hidden');
    overlay.classList.remove('hidden');
}

function closeOsEditModal() {
    osEditModal.classList.add('hidden');
    // Only close overlay if the other modal is not open
    if (document.getElementById('pipeline-modal').classList.contains('hidden')) {
        overlay.classList.add('hidden');
    }
    if (osEditForm) osEditForm.reset();
}

// Start
init();
