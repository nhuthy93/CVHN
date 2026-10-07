"use client";

import { useState, useMemo } from 'react';
import { format, isPast, isToday, parseISO } from 'date-fns';
import { vi } from 'date-fns/locale';

// MOCK DATA: Remove when connecting to actual DB via Prisma
const MOCK_TASKS = [
  {
    id: 't1',
    orderCode: 'ORD-2023-001',
    content: 'Liên hệ khách hàng xác nhận địa chỉ',
    assigneeName: 'Nguyễn Văn A',
    status: 'PENDING',
    dueDate: '2023-10-25T14:00:00Z',
  },
  {
    id: 't2',
    orderCode: 'ORD-2023-002',
    content: 'Gửi hóa đơn VAT cho đối tác',
    assigneeName: 'Trần Thị B',
    status: 'IN_PROGRESS',
    dueDate: new Date().toISOString(), // Today
  },
  {
    id: 't3',
    orderCode: 'ORD-2023-003',
    content: 'Kiểm tra tình trạng vận chuyển',
    assigneeName: 'Lê Văn C',
    status: 'PENDING',
    dueDate: '2025-11-20T10:00:00Z',
  }
];

export default function Dashboard() {
  const [tasks, setTasks] = useState(MOCK_TASKS);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');

  const filteredTasks = useMemo(() => {
    return tasks.filter(task => {
      // Filter out completed tasks from default view unless specified?
      // The PRD says: "Đơn hoàn tất không còn nằm trong danh sách cần xử lý nhưng vẫn tra cứu được"
      // If status is completed, only show if specifically searched or filtered?
      // For now, if statusFilter is ALL, we hide COMPLETED unless searched.
      const matchSearch = task.orderCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          task.content.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchStatus = statusFilter === 'ALL' ? task.status !== 'COMPLETED' : task.status === statusFilter;
      
      // If searching, maybe show completed if they match? 
      if (searchQuery && statusFilter === 'ALL') {
        return matchSearch;
      }

      return matchSearch && matchStatus;
    });
  }, [tasks, searchQuery, statusFilter]);

  const handleStatusChange = (taskId: string, newStatus: string) => {
    setTasks(prev => prev.map(t => t.id === taskId ? { ...t, status: newStatus } : t));
    // In real implementation: Call Server Action or API to update DB
  };

  return (
    <div className="dashboard-container">
      <header className="header">
        <h1 className="title">Theo dõi Đơn hàng CS Online</h1>
      </header>

      <div className="panel">
        <div className="filters">
          <div className="input-control">
            <label>Tìm kiếm đơn hàng</label>
            <input 
              type="text" 
              className="input" 
              placeholder="Nhập mã đơn hoặc nội dung..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="input-control">
            <label>Trạng thái</label>
            <select 
              className="select"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="ALL">Cần xử lý (Tất cả trừ Hoàn tất)</option>
              <option value="PENDING">Chưa xử lý</option>
              <option value="IN_PROGRESS">Đang xử lý</option>
              <option value="COMPLETED">Hoàn tất</option>
            </select>
          </div>
        </div>

        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Mã Đơn</th>
                <th>Nội dung cần xử lý</th>
                <th>Người phụ trách</th>
                <th>Ngày đến hạn</th>
                <th>Trạng thái</th>
                <th>Hành động</th>
              </tr>
            </thead>
            <tbody>
              {filteredTasks.length > 0 ? (
                filteredTasks.map(task => {
                  const dueDate = parseISO(task.dueDate);
                  const isOverdue = isPast(dueDate) && !isToday(dueDate) && task.status !== 'COMPLETED';
                  
                  return (
                    <tr key={task.id} className={isOverdue ? 'overdue-row' : ''}>
                      <td>{task.orderCode}</td>
                      <td>
                        {task.content}
                        {isOverdue && (
                          <div className="overdue-indicator">
                            ⚠️ Quá hạn xử lý
                          </div>
                        )}
                      </td>
                      <td>{task.assigneeName}</td>
                      <td>{format(dueDate, 'dd/MM/yyyy HH:mm', { locale: vi })}</td>
                      <td>
                        <span className={`status-badge status-${task.status.toLowerCase()}`}>
                          {task.status === 'PENDING' ? 'Chưa xử lý' : 
                           task.status === 'IN_PROGRESS' ? 'Đang xử lý' : 'Hoàn tất'}
                        </span>
                      </td>
                      <td>
                        <select 
                          className="action-select"
                          value={task.status}
                          onChange={(e) => handleStatusChange(task.id, e.target.value)}
                        >
                          <option value="PENDING">Chưa xử lý</option>
                          <option value="IN_PROGRESS">Đang xử lý</option>
                          <option value="COMPLETED">Hoàn tất</option>
                        </select>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={6} style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-secondary)' }}>
                    Không tìm thấy đơn hàng nào.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
