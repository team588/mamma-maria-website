# Mamma Maria Website

**Пилотный проект** для перехода команды на современный стек разработки сайтов вместо WordPress.

## 🎯 Цель проекта

Создать pixel-perfect лендинг ресторана "Mamma Maria" с использованием современных технологий и задокументировать весь процесс для команды.

## 🛠️ Технологический стек

### Frontend
- **Next.js 15** (App Router) - React framework
- **Tailwind CSS 4** - Utility-first CSS framework
- **TypeScript** - Type safety

### CMS
- **Sanity CMS** - Headless CMS для управления контентом
- **Sanity Studio** - Admin interface для менеджеров

### Design
- **Figma** - Source of truth для дизайна
- **Figma MCP Server** - Автоматическая генерация кода из дизайна

### Deployment
- **Vercel** - Hosting для Next.js app
- **Sanity Cloud** - Hosting для Sanity Studio

## 📁 Структура проекта

```
mamma-maria-website/
├── docs/                    # Документация
│   ├── workflow/            # Workflow гайды
│   ├── figma-to-code/       # Процесс переноса из Figma
│   └── sanity-setup/        # Настройка Sanity
├── website/                 # Next.js приложение
│   ├── app/                 # App Router pages
│   ├── components/          # React компоненты
│   ├── lib/                 # Utilities и Sanity client
│   └── public/              # Static assets
├── sanity/                  # Sanity Studio
│   ├── schemas/             # Content schemas
│   └── studio/              # Studio configuration
└── figma-exports/           # Экспортированный код из Figma
    └── sections/            # По секциям
```

## 🚀 Quick Start (для команды)

### 1. Prerequisites
```bash
node >= 18
npm или pnpm
Figma Desktop app (для генерации кода)
```

### 2. Clone & Install
```bash
git clone <repo>
cd mamma-maria-website
pnpm install
```

### 3. Запуск Development
```bash
# Next.js app
cd website
pnpm dev

# Sanity Studio (в отдельном терминале)
cd sanity
pnpm dev
```

## 📚 Документация

### Для разработчиков
- [Workflow: Figma → Code](./docs/workflow/figma-to-code.md)
- [Настройка Sanity CMS](./docs/workflow/sanity-setup.md)
- [Работа с компонентами](./docs/workflow/components.md)
- [Tailwind 4 Guidelines](./docs/workflow/tailwind-guidelines.md)

### Для менеджеров контента
- [Sanity Studio: Руководство](./docs/content-management/sanity-guide.md)
- [Управление меню](./docs/content-management/menu-management.md)
- [Загрузка изображений](./docs/content-management/images.md)

## 🎨 Design System

Все компоненты следуют дизайн-системе из Figma:
- Цвета, типографика, spacing - из Figma design tokens
- Компоненты 1:1 с Figma frames
- Responsive breakpoints: mobile (< 768px), tablet (768-1024px), desktop (> 1024px)

## 🔄 Workflow

### Добавление новой секции из Figma

1. **Выбрать секцию в Figma Desktop**
2. **Скопировать ссылку** (Cmd/Ctrl + L)
3. **Запустить генерацию:**
   ```bash
   pnpm figma:generate <figma-url>
   ```
4. **Review и адаптация** сгенерированного кода
5. **Интеграция с Sanity** (если нужен динамический контент)
6. **Commit & Deploy**

Детальный процесс: [docs/workflow/figma-to-code.md](./docs/workflow/figma-to-code.md)

## 📦 Scripts

```bash
# Development
pnpm dev              # Запуск Next.js dev server
pnpm dev:sanity       # Запуск Sanity Studio

# Build
pnpm build            # Build Next.js для production
pnpm build:sanity     # Build Sanity Studio

# Lint & Format
pnpm lint             # ESLint проверка
pnpm format           # Prettier форматирование

# Deployment
pnpm deploy           # Deploy на Vercel
pnpm deploy:sanity    # Deploy Sanity Studio
```

## 🔐 Environment Variables

Создать `.env.local` в `website/`:
```env
# Sanity
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=your_api_token

# Site
NEXT_PUBLIC_SITE_URL=https://mamma-maria.de
```

## 📈 Advantages over WordPress

### Для команды разработки:
- ✅ **Type safety** с TypeScript
- ✅ **Modern tooling** (VS Code, hot reload, etc.)
- ✅ **Git-based workflow**
- ✅ **Component reusability**
- ✅ **Automatic code generation** из Figma

### Для клиента:
- ✅ **Быстрая загрузка** (Static Generation)
- ✅ **SEO-оптимизация** из коробки
- ✅ **Безопасность** (no PHP vulnerabilities)
- ✅ **Масштабируемость**

### Для контент-менеджеров:
- ✅ **Простой интерфейс** Sanity Studio
- ✅ **Live preview** изменений
- ✅ **Structured content** с валидацией
- ✅ **Image optimization** автоматически

## 🎓 Learning Resources

### Next.js
- [Next.js Documentation](https://nextjs.org/docs)
- [App Router Guide](https://nextjs.org/docs/app)

### Tailwind CSS 4
- [Tailwind 4 Docs](https://tailwindcss.com/docs)
- [Tailwind 4 Migration Guide](https://tailwindcss.com/docs/upgrade-guide)

### Sanity
- [Sanity Documentation](https://www.sanity.io/docs)
- [Content Lake Intro](https://www.sanity.io/docs/content-lake)

### Figma MCP
- [Figma MCP Server Guide](https://developers.figma.com/docs/figma-mcp-server/)

## 📝 Notes

- **Design Source of Truth:** Все измерения и стили берутся из Figma
- **Content Source of Truth:** Весь контент хранится в Sanity
- **Code Source of Truth:** Git repository

## 🤝 Contributing

1. Create feature branch from `develop`
2. Make changes with proper commits
3. Create Pull Request
4. Review → Merge → Deploy

## 📧 Support

Вопросы по проекту: info@mamma-maria.de

---

**Created:** February 2026
**Status:** In Development
**Team:** 2Penguins Digital
