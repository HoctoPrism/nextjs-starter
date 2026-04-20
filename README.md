# Next.js Starter

Stack moderne, opinionnée, prête à l'emploi.

- **Next.js 16** (App Router, Server Actions)
- **React 19** + **TypeScript strict**
- **Tailwind CSS v4** + **shadcn/ui** (Radix primitives)
- **react-hook-form** + **zod** pour les formulaires et la validation
- **Drizzle ORM** + **better-sqlite3** (base locale dans `data/dev.db`)
- **Auth.js v5** avec provider Credentials + DrizzleAdapter + bcrypt
- `next-themes` pour le dark mode, `sonner` pour les toasts

## Démarrage

```bash
cp .env.example .env.local
# Mets un AUTH_SECRET (openssl rand -base64 32)

npm install
npm run db:push       # crée le schéma SQLite
npm run db:seed       # insère un compte démo (demo@example.com / password1234)
npm run dev
```

## Scripts

| Commande | Description |
|---|---|
| `npm run dev` | Serveur de dev |
| `npm run build` | Build production |
| `npm run lint` | ESLint (flat config) |
| `npm run format` | Prettier |
| `npm run db:generate` | Générer une migration depuis `src/db/schema.ts` |
| `npm run db:migrate` | Appliquer les migrations |
| `npm run db:push` | Pousser le schéma (dev) sans migration |
| `npm run db:studio` | Ouvrir Drizzle Studio |
| `npm run db:seed` | Remplir la DB avec des données de démo |

## Architecture

```
src/
  app/                    # App Router
    (auth)/               # login, register (group layout)
    examples/             # CRUD démo
      _components/
      actions.ts          # Server Actions (re-validation zod côté serveur)
    api/auth/[...nextauth]/route.ts
  components/
    ui/                   # composants shadcn
    form/fields/          # 15 champs réutilisables (Text, Select, Combobox, DatePicker, Rating, etc.)
    header.tsx, footer.tsx, providers.tsx, theme-toggle.tsx
  db/
    client.ts             # better-sqlite3 + Drizzle singleton
    schema.ts             # tables auth + examples
    seed.ts, migrate.ts
  lib/
    utils.ts              # cn()
    validators/           # schémas zod
  auth.ts                 # config Auth.js v5
  middleware.ts           # protège /examples
drizzle/                  # migrations SQL générées
```

## Formulaires

Tous les champs dans `src/components/form/fields/` suivent la même API :

```tsx
<TextField
  control={form.control}
  name="name"
  label="Nom"
  description="Optionnel"
/>
```

Validation via zod + `zodResolver`, affichage d'erreur automatique via `<FormMessage>` de shadcn. Les Server Actions re-valident avec le même schéma avant d'écrire dans SQLite.

Champs disponibles : `TextField`, `TextAreaField`, `NumberField`, `SwitchField`, `CheckboxField`, `CheckboxGroupField`, `RadioGroupField`, `SelectField`, `ComboboxField`, `DatePickerField`, `DateTimePickerField`, `SliderField`, `RangeSliderField`, `RatingField`, `FileField`.

## Authentification

Provider Credentials (email + mot de passe hashé avec bcrypt). Session JWT. Route `/examples` protégée par `src/middleware.ts`. Pour ajouter OAuth (Google, GitHub…), éditer `src/auth.ts`.

## Dark mode

`next-themes` écrit la classe `dark` sur `<html>`. Les couleurs shadcn sont définies en OKLCH dans `src/app/globals.css` (`:root` pour light, `.dark` pour dark). `suppressHydrationWarning` dans le layout empêche le flash.
