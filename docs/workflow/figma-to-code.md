# Workflow: Figma → Code (Pixel-Perfect)

Пошаговый процесс переноса дизайна из Figma в Next.js код с **pixel-perfect** точностью.

## 🎯 Философия

- **Секционный подход:** Работаем по одной секции за раз (Hero, About, Menu, etc.)
- **Pixel-perfect:** 100% соответствие дизайну
- **Component-first:** Каждая секция = переиспользуемый компонент
- **Design tokens:** Цвета, шрифты, spacing из Figma

## 🛠️ Prerequisites

### 1. Figma Desktop App
```bash
# Установить Figma Desktop
# https://www.figma.com/downloads/

# Запустить app
# Включить MCP Server:
#   1. Открыть любой файл
#   2. Shift+D (Dev Mode)
#   3. Enable desktop MCP server
```

### 2. Craft Agent с Figma MCP
```bash
# MCP source уже настроен в workspace
# Проверить статус:
# - Figma Desktop app запущен
# - MCP server активен (зеленый индикатор)
```

## 📋 Процесс (Step-by-Step)

### Step 1: Анализ дизайна

**Задача:** Понять структуру секции перед генерацией кода.

```markdown
1. Открыть Figma файл "Mamma Maria"
2. Найти нужную секцию (например, Hero)
3. Изучить:
   - Layout (flex, grid, positioning)
   - Spacing (margins, paddings)
   - Typography (sizes, weights, colors)
   - Images и их размеры
   - Responsive behavior (если есть варианты)
```

**Output:** Ментальная карта структуры секции.

---

### Step 2: Получение метаданных секции

**Задача:** Получить XML структуру секции для понимания иерархии.

**Команда в Craft Agent:**
```
Получи метаданные секции Hero из файла Mamma Maria:
https://www.figma.com/design/akOFRg6xGEf5wZHCUjPx9U/Mamma-Maria?node-id=4:50
```

**Tool:** `mcp__figma__get_metadata`

**Output:** XML с иерархией элементов, позициями, размерами.

**Пример структуры:**
```xml
<frame id="4:50" name="hero-img" x="0" y="0" width="1920" height="1040">
  <rounded-rectangle id="7:81" name="background-image" .../>
  <text id="4:36" name="subtitle" .../>
  <text id="3:43" name="title" .../>
  <frame id="5:52" name="cta-button" .../>
</frame>
```

**Анализ:**
- Определить root frame
- Понять вложенность элементов
- Увидеть названия layers (используем для CSS классов)

---

### Step 3: Выбор секции в Figma Desktop

**Задача:** Подготовить секцию для генерации кода.

```markdown
1. В Figma Desktop открыть файл
2. Найти нужную секцию (frame)
3. КЛИКНУТЬ на секцию (выделить)
4. Скопировать ссылку:
   - Cmd+L (Mac) или Ctrl+L (Windows)
   - Или: Правый клик → Copy link
```

**Output:** Ссылка вида:
```
https://www.figma.com/design/akOFRg6xGEf5wZHCUjPx9U/Mamma-Maria?node-id=4-50
```

**⚠️ Важно:** Секция должна быть **выбрана** в Figma Desktop перед генерацией!

---

### Step 4: Генерация кода через Figma MCP

**Задача:** Автоматически сгенерировать React + Tailwind код.

**Команда в Craft Agent:**
```
Сгенерируй React компонент с Tailwind для Hero секции:
https://www.figma.com/design/akOFRg6xGEf5wZHCUjPx9U/Mamma-Maria?node-id=4-50

Requirements:
- Framework: React (Next.js 15)
- Styles: Tailwind CSS 4
- TypeScript
- Responsive (mobile-first)
```

**Tool:** `mcp__figma__get_design_context`

**Output:** Сгенерированный код компонента.

**Пример:**
```tsx
export function HeroSection() {
  return (
    <section className="relative w-full h-[1040px]">
      <div className="absolute inset-0">
        <Image
          src="/hero-bg.jpg"
          alt="Background"
          fill
          className="object-cover"
        />
      </div>
      <div className="relative z-10 container mx-auto px-4 pt-[482px]">
        <h1 className="text-[84px] leading-[126px] font-bold">
          Dolce Vita in Oberursel
        </h1>
        <p className="text-[24px] leading-[36px] mt-[386px]">
          Italienisches Frühstück, hausgemachte Pasta...
        </p>
      </div>
    </section>
  );
}
```

---

### Step 5: Review и адаптация кода

**Задача:** Проверить сгенерированный код и адаптировать для production.

#### 5.1 Проверка соответствия дизайну

```markdown
✅ Checklist:
- [ ] Размеры точно соответствуют Figma (px values)
- [ ] Цвета правильные (#HEX из дизайна)
- [ ] Шрифты: family, size, weight
- [ ] Spacing: margins, paddings
- [ ] Images: правильные src и alt
- [ ] Z-index: overlay порядок
```

#### 5.2 Адаптация для Tailwind 4

Figma MCP может сгенерировать старый синтаксис Tailwind. Обновить:

```tsx
// ❌ Tailwind 3
<div className="bg-gray-100">

// ✅ Tailwind 4
<div className="bg-gray-100">  // Если есть в design tokens
// Или
<div style={{ backgroundColor: '#F5F5F5' }}>  // Точное значение из Figma
```

#### 5.3 Responsive Design

Добавить breakpoints если их нет:

```tsx
<h1 className="
  text-[48px] leading-[60px]      // mobile (default)
  md:text-[64px] md:leading-[80px]  // tablet
  lg:text-[84px] lg:leading-[126px] // desktop (из Figma)
">
```

#### 5.4 Next.js оптимизации

```tsx
// ✅ Использовать Next.js Image
import Image from 'next/image';

<Image
  src="/hero-bg.jpg"
  alt="Mamma Maria Restaurant"
  fill
  priority  // для Hero image
  className="object-cover"
/>

// ✅ Использовать next/font
import { Playfair_Display } from 'next/font/google';

const playfair = Playfair_Display({ subsets: ['latin'] });

<h1 className={playfair.className}>
```

---

### Step 6: Сохранение компонента

**Задача:** Структурированно сохранить сгенерированный код.

#### 6.1 Создать файл компонента

```bash
# Структура:
website/components/sections/HeroSection.tsx
```

#### 6.2 Добавить exports

```tsx
// website/components/sections/index.ts
export { HeroSection } from './HeroSection';
export { AboutSection } from './AboutSection';
// ... другие секции
```

#### 6.3 Документация компонента

```tsx
/**
 * Hero Section
 *
 * Главная секция лендинга с фоновым изображением и заголовком.
 *
 * @figma https://www.figma.com/design/.../node-id=4-50
 * @responsive Mobile-first, адаптируется на 3 breakpoints
 */
export function HeroSection() {
  // ...
}
```

---

### Step 7: Интеграция с Sanity (если нужен динамический контент)

**Задача:** Подключить компонент к Sanity CMS для редактируемого контента.

#### 7.1 Определить динамические части

```tsx
// Статичные (hardcoded):
- Layout
- Styling
- Structure

// Динамические (из Sanity):
- Тексты (title, subtitle)
- Изображения (hero background)
- CTA кнопка (текст, ссылка)
```

#### 7.2 Создать Sanity schema

```typescript
// sanity/schemas/heroSection.ts
export default {
  name: 'heroSection',
  title: 'Hero Section',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Заголовок',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'subtitle',
      title: 'Подзаголовок',
      type: 'text'
    },
    {
      name: 'backgroundImage',
      title: 'Фоновое изображение',
      type: 'image'
    },
    {
      name: 'ctaButton',
      title: 'CTA кнопка',
      type: 'object',
      fields: [
        { name: 'text', type: 'string' },
        { name: 'url', type: 'url' }
      ]
    }
  ]
}
```

#### 7.3 Обновить компонент

```tsx
import { client } from '@/lib/sanity/client';

interface HeroData {
  title: string;
  subtitle: string;
  backgroundImage: string;
  ctaButton: { text: string; url: string };
}

export async function HeroSection() {
  const data: HeroData = await client.fetch(`
    *[_type == "heroSection"][0] {
      title,
      subtitle,
      "backgroundImage": backgroundImage.asset->url,
      ctaButton
    }
  `);

  return (
    <section className="relative w-full h-[1040px]">
      <Image src={data.backgroundImage} ... />
      <h1>{data.title}</h1>
      <p>{data.subtitle}</p>
      <a href={data.ctaButton.url}>{data.ctaButton.text}</a>
    </section>
  );
}
```

---

### Step 8: Testing & Quality Check

**Задача:** Проверить компонент перед commit.

```markdown
✅ Checklist:
- [ ] Visual regression: сравнить с Figma (скриншот vs live)
- [ ] Responsive: проверить на mobile, tablet, desktop
- [ ] Performance: Lighthouse score > 90
- [ ] Accessibility: ARIA labels, semantic HTML
- [ ] TypeScript: no errors
- [ ] Linter: ESLint pass
```

#### Visual Regression Check

```bash
# Открыть в браузере
pnpm dev
# Перейти на страницу с компонентом

# Сравнить с Figma:
# 1. Скриншот Figma секции
# 2. Скриншот live компонента
# 3. Overlay в Photoshop/Figma для сравнения
```

---

### Step 9: Commit & Documentation

**Задача:** Зафиксировать изменения с документацией.

```bash
git add .
git commit -m "feat(sections): add Hero section from Figma

- Generated from Figma MCP (node-id: 4-50)
- Pixel-perfect implementation
- Responsive design (3 breakpoints)
- Integrated with Sanity CMS

Figma: https://www.figma.com/design/.../node-id=4-50
"
```

**Обновить project docs:**

```markdown
# website/components/sections/README.md

## Hero Section

### Figma Source
https://www.figma.com/design/.../node-id=4-50

### Sanity Schema
`heroSection` - см. sanity/schemas/heroSection.ts

### Props
- Все данные загружаются из Sanity

### Responsive
- Mobile: < 768px
- Tablet: 768-1024px
- Desktop: > 1024px (design baseline)

### Images
- Background: 1920x1040px (optimized via Next.js Image)

### Created
2026-02-08

### Updated
2026-02-08
```

---

## 📊 Metrics & KPIs

Для отслеживания качества процесса:

### Design Fidelity
- **Target:** 99% pixel-perfect соответствие
- **Measure:** Visual diff tools (Figma vs Live)

### Performance
- **Target:** Lighthouse Score > 90
- **Measure:** Chrome DevTools

### Development Speed
- **Target:** 1 секция = 2-3 часа (including Sanity)
- **Measure:** Time tracking

### Code Quality
- **Target:** 0 TypeScript errors, 0 ESLint warnings
- **Measure:** CI/CD pipeline

---

## 🚨 Common Issues & Solutions

### Issue: Figma MCP возвращает "Nothing is selected"

**Solution:**
1. Убедиться что Figma Desktop app запущен
2. Открыть нужный файл
3. **КЛИКНУТЬ** на секцию (выделить)
4. Повторить запрос

### Issue: Generated код использует inline styles вместо Tailwind

**Solution:**
1. Review сгенерированный код
2. Конвертировать inline styles → Tailwind classes
3. Использовать Tailwind theme для custom values

### Issue: Размеры не совпадают с Figma

**Solution:**
1. Проверить что использованы **точные px values** из Figma
2. Убедиться что нет CSS reset конфликтов
3. Проверить browser zoom = 100%

### Issue: Fonts не загружаются

**Solution:**
1. Использовать next/font для Google Fonts
2. Или добавить в public/fonts/ для custom fonts
3. Обновить tailwind.config для font family

---

## 📚 Resources

- [Figma MCP Tools](https://developers.figma.com/docs/figma-mcp-server/tools-and-prompts/)
- [Tailwind 4 Docs](https://tailwindcss.com/docs)
- [Next.js Image Optimization](https://nextjs.org/docs/app/building-your-application/optimizing/images)
- [Sanity Content Lake](https://www.sanity.io/docs/content-lake)

---

**Last Updated:** 2026-02-08
**Version:** 1.0
**Team:** 2Penguins Digital
