"use client";

import { useState, useMemo, useEffect } from 'react';
import { format, isPast, isToday, parseISO } from 'date-fns';
import { vi } from 'date-fns/locale';

interface Task {
  id: string;
  orderCode: string;
  content: string;
  assigneeName: string;
  status: string;
  dueDate: string;
}

export default function Dashboard() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await fetch(`/api/orders`);
        if (!res.ok) throw new Error('Failed to fetch');
        const data = await res.json();
        
        const mappedTasks: Task[] = data.map((order: any) => ({
          id: order.id,
          orderCode: order.id,
          content: order.content || 'N/A',
          assigneeName: order.customerName || 'N/A',
          status: order.isDone ? 'COMPLETED' : 'PENDING',
          dueDate: order.pipelineDate || order.createdAt
        }));
        setTasks(mappedTasks);
      } catch (error) {
        console.error('Error fetching tasks:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchOrders();
  }, []);
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

  const handleStatusChange = async (taskId: string, newStatus: string) => {
    setTasks(prev => prev.map(t => t.id === taskId ? { ...t, status: newStatus } : t));
    
    try {
      const isDone = newStatus === 'COMPLETED';
      await fetch(`/api/orders/${taskId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ isDone })
      });
    } catch (error) {
      console.error('Failed to update status', error);
    }
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
              {isLoading ? (
                <tr>
                  <td colSpan={6} style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-secondary)' }}>
                    Đang tải dữ liệu...
                  </td>
                </tr>
              ) : filteredTasks.length > 0 ? (
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
