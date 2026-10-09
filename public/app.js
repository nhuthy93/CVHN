// --- START MOBILE DEBUG SCRIPT ---
(function() {
    function sendLog(data) {
        fetch('/api/debug', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        }).catch(e => console.error("Debug send failed", e));
        
        // Also show an alert overlay on screen for the user
        let toast = document.getElementById('debug-toast');
        if (!toast) {
            toast = document.createElement('div');
            toast.id = 'debug-toast';
            toast.style.cssText = 'position: fixed; top: 10px; left: 10px; right: 10px; background: rgba(0,0,0,0.9); color: #0f0; padding: 15px; z-index: 2147483647; font-size: 11px; pointer-events: none; border-radius: 8px; font-family: monospace; word-wrap: break-word; max-height: 50vh; overflow-y: auto;';
            document.body.appendChild(toast);
        }
        let msg = `[${data.event}] Target: <${data.targetTag}> .${data.targetClass} | Top: <${data.elementFromPoint ? data.elementFromPoint.tag : 'null'}> .${data.elementFromPoint ? data.elementFromPoint.className : 'none'} (z-index: ${data.elementFromPoint ? data.elementFromPoint.zIndex : ''})`;
        toast.innerHTML = msg + '<br>' + toast.innerHTML;
    }

    const eventsToMonitor = ['touchstart', 'touchend', 'pointerdown', 'click'];
    eventsToMonitor.forEach(eventName => {
        document.addEventListener(eventName, (e) => {
            let x = 0, y = 0;
            if (e.touches && e.touches.length > 0) {
                x = e.touches[0].clientX;
                y = e.touches[0].clientY;
            } else if (e.clientX !== undefined) {
                x = e.clientX;
                y = e.clientY;
            } else if (e.changedTouches && e.changedTouches.length > 0) {
                x = e.changedTouches[0].clientX;
                y = e.changedTouches[0].clientY;
            }

            let topEl = null;
            if (x > 0 && y > 0) {
                topEl = document.elementFromPoint(x, y);
            }
            
            const logData = {
                event: eventName,
                phase: e.eventPhase === 1 ? 'CAPTURE' : (e.eventPhase === 2 ? 'AT_TARGET' : 'BUBBLING'),
                targetTag: e.target ? e.target.tagName : 'NULL',
                targetClass: e.target ? e.target.className : 'NULL',
                targetId: e.target ? e.target.id : 'NULL',
                x: x,
                y: y,
                elementFromPoint: topEl ? {
                    tag: topEl.tagName,
                    className: topEl.className,
                    id: topEl.id,
                    zIndex: window.getComputedStyle(topEl).zIndex,
                    pointerEvents: window.getComputedStyle(topEl).pointerEvents
                } : null
            };
            
            sendLog(logData);
        }, true); // Use capture phase
    });
})();
// --- END MOBILE DEBUG SCRIPT ---

// State
let orders = [];
let offSystemTasks = [];

async function loadData() {
    try {
        const [ordersRes, osTasksRes] = await Promise.all([
            fetch('/api/orders'),
            fetch('/api/off-system-tasks')
        ]);
        const ordersData = await ordersRes.json();
        const osTasksData = await osTasksRes.json();
        
        orders = ordersData.map(o => ({
            id: o.id,
            name: o.customerName || '',
            pipelineDate: o.pipelineDate || '',
            content: o.content || '',
            isDone: o.isDone
        }));

        offSystemTasks = osTasksData.map(t => ({
            id: t.id,
            content: t.content || '',
            pipelineDate: t.pipelineDate || ''
        }));
    } catch (e) {
        console.error('Failed to load data', e);
    }
}

let currentDate = new Date();
let viewingDate = new Date(currentDate);
let currentTab = 'today';
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
async function init() {
    await loadData();
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
    let todayCount = 0, late = 0;
    const todayStr = getTodayStr();

    orders.forEach(o => {
        const status = getOrderStatus(o);
        if (status === 'today') todayCount++;
        else if (status === 'late') late++;
    });

    const badgeToday = document.getElementById('badge-today');
    if (badgeToday) badgeToday.textContent = todayCount;
    
    const badgeLate = document.getElementById('badge-late');
    if (badgeLate) badgeLate.textContent = late;

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
            'today': 'Hôm nay xử lý',
            'late': 'Đơn hàng trễ pipeline'
        };
        elViewTitle.textContent = titles[currentTab] || 'Đơn hàng';
        
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

    tr.innerHTML = `
        <td><strong>${order.id}</strong><br>${statusHtml}</td>
        <td>${order.name}</td>
        <td>${formatDateVN(order.pipelineDate) || '<span style="color:#9ca3af;font-style:italic">Chưa có</span>'}</td>
        <td>${order.content || '<span style="color:#9ca3af;font-style:italic">Chưa có</span>'}</td>
        <td>${actionsHtml}</td>
    `;
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
            orders[orderIndex].isDone = false;
            
            // Re-render
            updateView();
            renderCalendar();
            closeModal();
            
            // "cuộn để sang tab tiêu đề: Hôm nay xử lý" if we set to today
            if (newDate === getTodayStr()) {
                const todayTab = document.querySelector('.tab-btn[data-tab="today"]');
                if (todayTab) todayTab.click();
            }

            // API Call
            fetch(`/api/orders/${id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ pipelineDate: newDate, content: newContent, isDone: false })
            });
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
        
        fetch(`/api/orders/${orderId}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ isDone: true })
        });
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
        
        const newTask = {
            id: 'OS' + Date.now(),
            content: contentVal,
            pipelineDate: dateVal
        };
        offSystemTasks.push(newTask);
        
        // Reset and switch to list
        osForm.reset();
        document.querySelector('.sub-tab-btn[data-subtab="list_task"]').click();
        updateBadges(); // Refresh badges

        fetch('/api/off-system-tasks', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id: newTask.id, content: contentVal, pipelineDate: dateVal })
        });
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

            // API Call
            fetch(`/api/off-system-tasks/${id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ pipelineDate: newDate, content: newContent })
            });
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
