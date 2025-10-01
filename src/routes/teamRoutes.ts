import { Router } from 'express';
const router = Router();

// تعریف روت‌ها
router.get('/', (req, res) => {
  res.send('Hello user!');
});

// فقط export پیش‌فرض رو نداریم
export default router;
