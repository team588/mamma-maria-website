# Sanity Quick Start (Рекомендуемый способ для команды)

**Самый простой и надежный способ** настроить Sanity для новых проектов.

## ✅ Почему через Web UI?

- **Надежнее:** Нет проблем с версиями Node.js
- **Быстрее:** 5 минут вместо 15
- **Проще:** Визуальный интерфейс вместо CLI
- **Меньше ошибок:** Нет конфликтов зависимостей

---

## 🚀 Шаг 1: Создать проект через Web UI (5 минут)

### 1.1 Регистрация/Вход

```
Перейти: https://www.sanity.io/manage
→ Sign Up / Log In (Google/GitHub account)
```

### 1.2 Создать новый проект

```
Dashboard → "Create new project"

Settings:
- Project name: "Mamma Maria Website"
- Plan: Free (или paid по необходимости)
- Dataset: production
```

**✅ Output:** Project ID (например: `abc123xyz`)

**📝 Сохрани Project ID!** Понадобится для `.env` файлов.

---

## 🔑 Шаг 2: Получить API Token

```
Sanity Manage → Your Project → API → Tokens
→ "Add API token"

Settings:
- Label: "Development & MCP Access"
- Permissions: Editor (full read/write)
```

**✅ Output:** API Token (показывается только один раз!)

**📝 Сохрани токен в безопасном месте!**

---

## 📦 Шаг 3: Setup локального Sanity Studio

### 3.1 Клонировать starter template

```bash
cd D:\Claude\projects\mamma-maria-website

# Клонировать Sanity Studio template
git clone https://github.com/sanity-io/sanity-template-nextjs-clean.git temp-sanity
mv temp-sanity/studio ./sanity
rm -rf temp-sanity
```

### 3.2 Установить зависимости

```bash
cd sanity
npm install

# Или с pnpm (рекомендуется):
pnpm install
```

### 3.3 Настроить конфигурацию

Создать `.env.local`:
```env
SANITY_STUDIO_PROJECT_ID=abc123xyz  # Из шага 1.2
SANITY_STUDIO_DATASET=production
```

Обновить `sanity.config.ts`:
```typescript
import { defineConfig } from 'sanity';
import { deskTool } from 'sanity/desk';
import { visionTool } from '@sanity/vision';
import { schemaTypes } from './schemas';

export default defineConfig({
  name: 'mamma-maria',
  title: 'Mamma Maria Website',

  projectId: process.env.SANITY_STUDIO_PROJECT_ID!,
  dataset: 'production',

  plugins: [
    deskTool(),
    visionTool() // GROQ playground для тестирования
  ],

  schema: {
    types: schemaTypes
  }
});
```

### 3.4 Создать базовые schemas

```bash
mkdir -p sanity/schemas
```

**sanity/schemas/index.ts:**
```typescript
// Экспорт всех schemas
import heroSection from './heroSection';
import menuItem from './menuItem';
import testimonial from './testimonial';
import faqItem from './faqItem';
import contactInfo from './contactInfo';

export const schemaTypes = [
  heroSection,
  menuItem,
  testimonial,
  faqItem,
  contactInfo
];
```

**Schemas уже готовы!** См. [sanity-setup.md](./sanity-setup.md) → Part 2 для полных определений.

### 3.5 Запустить Studio локально

```bash
cd sanity
pnpm dev

# → http://localhost:3333
```

При первом запуске:
1. Browser откроется автоматически
2. **"Continue with Google/GitHub"** для авторизации
3. **Разрешить доступ** к проекту

**✅ Sanity Studio готов!**

---

## 🔗 Шаг 4: Подключить к Next.js

### 4.1 Установить Sanity Client

```bash
cd ../website  # Next.js app
pnpm add @sanity/client @sanity/image-url next-sanity
```

### 4.2 Создать Sanity Client

**website/lib/sanity/client.ts:**
```typescript
import { createClient } from 'next-sanity';

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  useCdn: false, // для preview mode
  token: process.env.SANITY_API_TOKEN // для write operations
});
```

### 4.3 Environment Variables

**website/.env.local:**
```env
NEXT_PUBLIC_SANITY_PROJECT_ID=abc123xyz
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=your_api_token_from_step_2
```

**⚠️ Важно:** `.env.local` в `.gitignore`!

### 4.4 Использовать в компонентах

```typescript
// website/components/sections/HeroSection.tsx
import { client } from '@/lib/sanity/client';

export async function HeroSection() {
  const data = await client.fetch(`
    *[_type == "heroSection"][0] {
      title,
      subtitle,
      "backgroundImage": backgroundImage.asset->url,
      ctaButton
    }
  `);

  return (
    <section>
      <h1>{data.title}</h1>
      <p>{data.subtitle}</p>
    </section>
  );
}
```

---

## 🤖 Шаг 5: Настроить Sanity MCP (для AI agents)

После создания проекта и получения токена:

### 5.1 Обновить Sanity MCP config

**C:\Users\alexa\.craft-agent\workspaces\my-workspace\sources\sanity\config.json:**

```json
{
  "id": "sanity_mcp_s1a2b3",
  "name": "Sanity CMS",
  "slug": "sanity",
  "enabled": true,
  "provider": "sanity",
  "type": "mcp",
  "icon": "https://www.sanity.io/static/images/favicons/favicon-32x32.png",
  "tagline": "Content management via MCP",
  "mcp": {
    "transport": "stdio",
    "command": "node",
    "args": ["-e", "require('@sanity-io/mcp-server')"],
    "env": {
      "SANITY_PROJECT_ID": "abc123xyz",
      "SANITY_DATASET": "production",
      "SANITY_API_TOKEN": "your_api_token"
    },
    "authType": "none"
  }
}
```

### 5.2 Тест подключения

```
В Craft Agent:
source_test для sanity source
```

**✅ Sanity MCP готов для AI-powered content management!**

---

## 🚀 Шаг 6: Deploy Sanity Studio

### 6.1 Deploy на Sanity Cloud (рекомендуется)

```bash
cd sanity
npx sanity deploy

# Выбрать hostname: mamma-maria
# → URL: https://mamma-maria.sanity.studio
```

**✅ Studio доступен для команды!**

### 6.2 Или deploy на Vercel (альтернатива)

```bash
cd sanity
vercel

# Настроить environment variables в Vercel Dashboard:
# - SANITY_STUDIO_PROJECT_ID
# - SANITY_STUDIO_DATASET
```

---

## ✅ Checklist: Sanity Setup Complete

- [ ] Проект создан через Sanity Web UI
- [ ] Project ID получен
- [ ] API Token получен и сохранен
- [ ] Sanity Studio setup локально
- [ ] Schemas определены (5 типов)
- [ ] Studio запускается на localhost:3333
- [ ] Next.js client настроен
- [ ] Environment variables добавлены
- [ ] Sanity MCP source настроен
- [ ] Studio deployed (Cloud или Vercel)
- [ ] Команда trained на Studio UI

---

## 📊 Time Estimate

- **Setup (Web UI + Local):** 15 минут
- **Schemas Creation:** 30 минут
- **Next.js Integration:** 10 минут
- **MCP Setup:** 5 минут
- **Deploy:** 5 минут

**Total:** ~1 час для полной настройки

---

## 🎓 Для Content Менеджеров

После deploy Studio на `https://mamma-maria.sanity.studio`:

### Доступ
```
URL: https://mamma-maria.sanity.studio
Login: Google/GitHub account (с доступом к проекту)
```

### Quick Actions

**Добавить Menu Item:**
```
1. Sidebar → Menu
2. "+ Create" → Menu Item
3. Fill fields:
   - Name: "Cornetto"
   - Category: "Frühstück"
   - Price: 3.50
   - Description: "..."
   - Image: Upload
4. "Publish"
```

**Изменения появятся на сайте через ~30 секунд** (Next.js ISR revalidation).

---

## 🚨 Common Issues

### "Authentication failed" в MCP

**Solution:**
1. Проверить `SANITY_API_TOKEN` в MCP config
2. Убедиться что token scope = "Editor"
3. Перезапустить Craft Agent

### "Project ID not found"

**Solution:**
1. Проверить Project ID в Sanity Manage
2. Убедиться что ID в `.env.local` правильный
3. Перезапустить dev server

### Studio не загружается

**Solution:**
```bash
cd sanity
rm -rf node_modules
pnpm install
pnpm dev
```

---

## 🔗 Resources

- [Sanity Docs](https://www.sanity.io/docs)
- [Sanity Manage](https://www.sanity.io/manage)
- [GROQ Query Language](https://www.sanity.io/docs/groq)
- [Next.js + Sanity](https://www.sanity.io/plugins/next-sanity)

---

**Last Updated:** 2026-02-08
**Version:** 1.0 (Web UI method)
**Team:** 2Penguins Digital
