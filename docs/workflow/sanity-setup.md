# Workflow: Sanity CMS Setup

Пошаговый процесс настройки Sanity CMS для проекта с **полным доступом через MCP**.

## 🎯 Цель

Настроить Sanity CMS как:
- **Content Lake** - хранилище структурированного контента
- **Admin UI** - Sanity Studio для менеджеров
- **API** - доступ к контенту через GROQ/GraphQL
- **MCP Integration** - управление через AI agents (Claude Code)

## 📋 Prerequisites

```bash
# Node.js >= 18
node --version

# npm или pnpm
npm --version
# или
pnpm --version
```

## 🚀 Part 1: Создание Sanity проекта

### Step 1: Инициализация проекта

```bash
cd D:\Claude\projects\mamma-maria-website

# Создать Sanity проект
npm create sanity@latest sanity

# Следовать интерактивному wizard:
# - Project name: Mamma Maria Website
# - Dataset: production
# - Template: Clean project with no predefined schemas
# - Package manager: pnpm
```

**Output:**
```
sanity/
├── package.json
├── sanity.cli.ts
├── sanity.config.ts
└── schemas/
    └── index.ts
```

### Step 2: Получить Project ID

```bash
cd sanity
pnpm sanity manage
```

Откроется браузер с Sanity Manage. Скопировать **Project ID** (например: `abc123xyz`)

Сохранить в `.env.local`:
```env
NEXT_PUBLIC_SANITY_PROJECT_ID=abc123xyz
NEXT_PUBLIC_SANITY_DATASET=production
```

---

## 🗂️ Part 2: Создание Content Schemas

### Step 3: Define схемы для контента

Для проекта "Mamma Maria" создаем следующие типы контента:

#### 3.1 Hero Section

```typescript
// sanity/schemas/heroSection.ts
import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'heroSection',
  title: 'Hero Section',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Заголовок',
      type: 'string',
      validation: Rule => Rule.required().max(100)
    }),
    defineField({
      name: 'subtitle',
      title: 'Подзаголовок',
      type: 'text',
      rows: 3,
      validation: Rule => Rule.required().max(200)
    }),
    defineField({
      name: 'backgroundImage',
      title: 'Фоновое изображение',
      type: 'image',
      options: {
        hotspot: true // Для crop
      },
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'ctaButton',
      title: 'CTA Кнопка',
      type: 'object',
      fields: [
        { name: 'text', type: 'string', title: 'Текст' },
        { name: 'url', type: 'url', title: 'URL' }
      ]
    })
  ],
  preview: {
    select: {
      title: 'title',
      media: 'backgroundImage'
    }
  }
});
```

#### 3.2 Menu Item

```typescript
// sanity/schemas/menuItem.ts
import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'menuItem',
  title: 'Menu Item',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Название блюда',
      type: 'string',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'category',
      title: 'Категория',
      type: 'string',
      options: {
        list: [
          { title: 'Frühstück', value: 'breakfast' },
          { title: 'Kaffee-Spezialitäten', value: 'coffee' },
          { title: 'Tagesgerichte', value: 'daily' },
          { title: 'Panini & Focaccia', value: 'panini' },
          { title: 'Salate', value: 'salad' },
          { title: 'Pizza & Pinsa', value: 'pizza' },
          { title: 'Desserts', value: 'dessert' },
          { title: 'Getränke', value: 'drinks' }
        ]
      },
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'description',
      title: 'Описание',
      type: 'text',
      rows: 2
    }),
    defineField({
      name: 'price',
      title: 'Цена (€)',
      type: 'number',
      validation: Rule => Rule.required().min(0).precision(2)
    }),
    defineField({
      name: 'image',
      title: 'Изображение',
      type: 'image',
      options: { hotspot: true }
    }),
    defineField({
      name: 'tags',
      title: 'Теги',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        layout: 'tags'
      }
    }),
    defineField({
      name: 'available',
      title: 'Доступно',
      type: 'boolean',
      initialValue: true
    }),
    defineField({
      name: 'order',
      title: 'Порядок отображения',
      type: 'number',
      hidden: true // Для internal ordering
    })
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'category',
      media: 'image',
      price: 'price'
    },
    prepare({ title, subtitle, media, price }) {
      return {
        title,
        subtitle: `${subtitle} - €${price}`,
        media
      };
    }
  }
});
```

#### 3.3 Testimonial

```typescript
// sanity/schemas/testimonial.ts
export default defineType({
  name: 'testimonial',
  title: 'Отзыв',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Имя',
      type: 'string',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'avatar',
      title: 'Аватар',
      type: 'image',
      options: { hotspot: true }
    }),
    defineField({
      name: 'text',
      title: 'Текст отзыва',
      type: 'text',
      rows: 4,
      validation: Rule => Rule.required().max(300)
    }),
    defineField({
      name: 'rating',
      title: 'Рейтинг',
      type: 'number',
      validation: Rule => Rule.required().min(1).max(5).integer()
    }),
    defineField({
      name: 'order',
      title: 'Порядок',
      type: 'number'
    })
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'rating',
      media: 'avatar'
    },
    prepare({ title, subtitle, media }) {
      return {
        title,
        subtitle: `${'⭐'.repeat(subtitle)}`,
        media
      };
    }
  }
});
```

#### 3.4 FAQ Item

```typescript
// sanity/schemas/faqItem.ts
export default defineType({
  name: 'faqItem',
  title: 'FAQ',
  type: 'document',
  fields: [
    defineField({
      name: 'question',
      title: 'Вопрос',
      type: 'string',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'answer',
      title: 'Ответ',
      type: 'text',
      rows: 4,
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'order',
      title: 'Порядок',
      type: 'number',
      validation: Rule => Rule.required()
    })
  ],
  preview: {
    select: {
      title: 'question',
      subtitle: 'order'
    },
    prepare({ title, subtitle }) {
      return {
        title,
        subtitle: `#${subtitle}`
      };
    }
  },
  orderings: [
    {
      title: 'Order',
      name: 'orderAsc',
      by: [{ field: 'order', direction: 'asc' }]
    }
  ]
});
```

#### 3.5 Contact Info (Singleton)

```typescript
// sanity/schemas/contactInfo.ts
export default defineType({
  name: 'contactInfo',
  title: 'Контактная информация',
  type: 'document',
  fields: [
    defineField({
      name: 'phone',
      title: 'Телефон',
      type: 'string',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'email',
      title: 'Email',
      type: 'string',
      validation: Rule => Rule.required().email()
    }),
    defineField({
      name: 'address',
      title: 'Адрес',
      type: 'text',
      rows: 2,
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'hours',
      title: 'Часы работы',
      type: 'object',
      fields: [
        { name: 'monday', type: 'string', title: 'Понедельник' },
        { name: 'tuesday', type: 'string', title: 'Вторник' },
        { name: 'wednesday', type: 'string', title: 'Среда' },
        { name: 'thursday', type: 'string', title: 'Четверг' },
        { name: 'friday', type: 'string', title: 'Пятница' },
        { name: 'saturday', type: 'string', title: 'Суббота' },
        { name: 'sunday', type: 'string', title: 'Воскресенье' }
      ]
    })
  ],
  preview: {
    prepare() {
      return {
        title: 'Contact Information'
      };
    }
  }
});
```

### Step 4: Register schemas

```typescript
// sanity/schemas/index.ts
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

---

## 🔐 Part 3: API Token для MCP

### Step 5: Создать API Token

```bash
cd sanity
pnpm sanity manage
```

В Sanity Manage:
1. Перейти в **API** → **Tokens**
2. **Add API token**
3. **Label:** "MCP Server Access"
4. **Permissions:** Editor (full read/write)
5. **Copy token** (показывается только один раз!)

Сохранить токен в безопасном месте.

---

## 🤖 Part 4: MCP Integration (Remote Server)

### Step 6: Настроить Sanity Remote MCP

Sanity предоставляет **hosted MCP server** с OAuth:
- URL: `https://mcp.sanity.io` (или подобный)
- Auth: OAuth через Sanity account
- 40+ tools из коробки

**Создать MCP source в Craft Agent:**

```json
// C:\Users\alexa\.craft-agent\workspaces\my-workspace\sources\sanity\config.json
{
  "id": "sanity_remote_abc",
  "name": "Sanity CMS",
  "slug": "sanity",
  "enabled": true,
  "provider": "sanity",
  "type": "mcp",
  "icon": "https://www.sanity.io/static/images/favicons/favicon-32x32.png",
  "tagline": "Content management via MCP",
  "mcp": {
    "url": "https://mcp.sanity.io",  // Актуальный URL от Sanity
    "authType": "oauth"
  }
}
```

**Authenticate:**
```
В Craft Agent:
- source_oauth_trigger для Sanity source
- Пройти OAuth flow в браузере
```

---

## 📊 Part 5: Initial Content Migration

### Step 7: Наполнить Sanity данными из Figma

После настройки schemas и MCP:

#### 7.1 Hero Section
```
Через Craft Agent с Sanity MCP:

"Создай heroSection документ в Sanity:
- title: 'Dolce Vita in Oberursel'
- subtitle: 'Italienisches Frühstück, hausgemachte Pasta, Pizza & Pinsa...'
- backgroundImage: загрузить из figma-exports/hero-bg.jpg
- ctaButton: { text: 'Besuchen Sie uns', url: '/contact' }
"
```

#### 7.2 Menu Items
```
"Создай menuItem документы из списка:
1. Cornetto - breakfast - 3.50€ - 'Italienisches Croissant...'
2. Kleines Frühstück - breakfast - 6.90€ - 'Cornetto, Kaffee & O-Saft'
3. Espresso - coffee - 2.20€ - 'Klassischer italienischer Espresso'
..."
```

#### 7.3 Testimonials
```
"Создай testimonial документы:
1. Anna K. - 5 stars - 'Die authentische italienische Küche...'
2. Marco S. - 5 stars - 'Jeden Morgen starten wir hier...'
3. Julia S. - 5 stars - 'Die Pizza und Pinsa sind fantastisch!'
"
```

---

## 🔗 Part 6: Next.js Integration

### Step 8: Установить Sanity Client

```bash
cd website
pnpm add @sanity/client @sanity/image-url next-sanity
```

### Step 9: Configure Sanity Client

```typescript
// website/lib/sanity/client.ts
import { createClient } from 'next-sanity';

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: '2024-01-01',
  useCdn: false // для preview mode
});
```

### Step 10: Fetch data в компонентах

```typescript
// website/components/sections/HeroSection.tsx
import { client } from '@/lib/sanity/client';

interface HeroData {
  title: string;
  subtitle: string;
  backgroundImage: { asset: { url: string } };
  ctaButton: { text: string; url: string };
}

export async function HeroSection() {
  const data = await client.fetch<HeroData>(`
    *[_type == "heroSection"][0] {
      title,
      subtitle,
      backgroundImage { asset-> { url } },
      ctaButton
    }
  `);

  return (
    <section>
      <h1>{data.title}</h1>
      <p>{data.subtitle}</p>
      {/* ... */}
    </section>
  );
}
```

---

## 🎨 Part 7: Sanity Studio Customization

### Step 11: Configure Studio UI

```typescript
// sanity/sanity.config.ts
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
    deskTool({
      structure: (S) =>
        S.list()
          .title('Content')
          .items([
            S.listItem()
              .title('Hero Section')
              .child(
                S.document()
                  .schemaType('heroSection')
                  .documentId('heroSection')
              ),
            S.divider(),
            S.documentTypeListItem('menuItem').title('Menu'),
            S.documentTypeListItem('testimonial').title('Testimonials'),
            S.documentTypeListItem('faqItem').title('FAQ'),
            S.divider(),
            S.listItem()
              .title('Contact Info')
              .child(
                S.document()
                  .schemaType('contactInfo')
                  .documentId('contactInfo')
              )
          ])
    }),
    visionTool() // GROQ playground
  ],

  schema: {
    types: schemaTypes
  }
});
```

---

## 🚀 Part 8: Deploy Sanity Studio

### Step 12: Deploy на Sanity Cloud

```bash
cd sanity
pnpm sanity deploy
```

Follow prompts:
- Studio hostname: `mamma-maria`
- Deploy to: `mamma-maria.sanity.studio`

**Output:** URL для доступа к Studio (например: `https://mamma-maria.sanity.studio`)

---

## 📚 Part 9: Documentation для команды

### Step 13: Content Management Guide

Создать гайд для контент-менеджеров:

```markdown
# Sanity Studio Guide

## Доступ
https://mamma-maria.sanity.studio

## Управление меню

1. Перейти в **Menu** в левом sidebar
2. **Create** → New Menu Item
3. Заполнить:
   - Название блюда
   - Категория (dropdown)
   - Описание
   - Цена
   - Изображение (Upload)
   - Теги (optional)
4. **Publish**

Изменения появятся на сайте через ~30 секунд (ISR revalidation).

## Управление отзывами

1. Перейти в **Testimonials**
2. **Create** → New Testimonial
3. Заполнить поля
4. **Publish**

## FAQ

1. Перейти в **FAQ**
2. **Create** → New FAQ Item
3. Порядок отображения контролируется полем "Order"
4. **Publish**
```

---

## ✅ Checklist

После завершения setup:

```markdown
- [ ] Sanity проект создан
- [ ] Schemas определены (5 types)
- [ ] API token получен
- [ ] MCP source настроен и authenticated
- [ ] Initial content migrated
- [ ] Next.js client configured
- [ ] Sanity Studio deployed
- [ ] Content management guide created
- [ ] Team trained on Sanity Studio
```

---

## 📊 Advantages for Team

### Для разработчиков:
- ✅ **Type-safe** queries с TypeScript
- ✅ **Schema validation** из коробки
- ✅ **Real-time preview** в Studio
- ✅ **Version control** для content
- ✅ **MCP integration** для AI-powered content management

### Для контент-менеджеров:
- ✅ **Простой UI** - intuitive Studio interface
- ✅ **Live preview** изменений
- ✅ **Image optimization** автоматически
- ✅ **No technical knowledge** required
- ✅ **Undo/Redo** для безопасности

### Для клиента:
- ✅ **Fast content updates** - без deploy
- ✅ **Structured content** - consistency
- ✅ **Multi-language** ready (будущее)
- ✅ **Scalable** - растет с бизнесом

---

## 🔗 Resources

- [Sanity Documentation](https://www.sanity.io/docs)
- [Sanity MCP Server](https://www.sanity.io/docs/compute-and-ai/mcp-server)
- [GROQ Cheat Sheet](https://www.sanity.io/docs/query-cheat-sheet)
- [Next.js + Sanity Guide](https://www.sanity.io/plugins/next-sanity)

---

**Last Updated:** 2026-02-08
**Version:** 1.0
**Team:** 2Penguins Digital
