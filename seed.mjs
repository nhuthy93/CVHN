import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

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

async function main() {
  console.log('Seeding data...');
  
  const orderCount = await prisma.order.count();
  if (orderCount === 0) {
      console.log('Seeding initial orders...');
      for (const o of initialOrders) {
          await prisma.order.create({
              data: {
                  id: o.id,
                  customerName: o.name,
                  pipelineDate: o.pipelineDate || null,
                  content: o.content || null,
                  isDone: o.isDone || false,
              }
          });
      }
  }

  const osCount = await prisma.offSystemTask.count();
  if (osCount === 0) {
      console.log('Seeding initial off-system tasks...');
      for (const os of offSystemTasks) {
          await prisma.offSystemTask.create({
              data: {
                  id: os.id,
                  content: os.content,
                  pipelineDate: os.pipelineDate || null,
              }
          });
      }
  }
  
  console.log('Seed completed successfully!');
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
