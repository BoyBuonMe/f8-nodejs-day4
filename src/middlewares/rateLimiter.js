// /src/middlewares/rateLimiter.js

export function createRateLimiter(config) {
  const { windowMs, maxRequests, message } = config;

  // Lưu theo IP: { count, startTime }
  const store = new Map();

  return (req, res, next) => {
    const ip = req.ip; // Express đã parse sẵn IP
    const now = Date.now();

    const record = store.get(ip);

    // Nếu chưa có record cho IP này
    if (!record) {
      store.set(ip, { count: 1, startTime: now });
      return next();
    }

    const elapsed = now - record.startTime;

    // Nếu đã quá windowMs => reset cửa sổ
    if (elapsed > windowMs) {
      store.set(ip, { count: 1, startTime: now });
      return next();
    }

    // Còn trong cửa sổ => tăng count
    record.count += 1;

    // Nếu vượt quá giới hạn
    if (record.count > maxRequests) {
      return res.status(429).json({ error: message });
    }

    // Cập nhật lại (Map giữ reference object nhưng set lại cho chắc)
    store.set(ip, record);

    return next();
  };
}

// Instance mặc định theo đề
export const apiRateLimiter = createRateLimiter({
  windowMs: 60000,
  maxRequests: 100,
  message: "Too many requests",
});
