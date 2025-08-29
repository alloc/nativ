# My Nativ App

A React Native app built with [Nativ](https://github.com/alloc/nativ), Expo, and modern tooling.

## Project Structure

```
├── assets/           # Fonts, icons, images, sounds
├── src/
│   ├── app/          # Expo Router pages
│   ├── core/         # Core application files
│   │   ├── theme.ts  # Restyle theme
│   │   └── ui.ts     # UI primitives
│   └── db/           # Drizzle ORM setup
├── app.config.ts     # Expo configuration
├── drizzle.config.ts # Database configuration
└── tsconfig.json     # TypeScript configuration
```

## Customization

### Theme

Edit `src/core/theme.ts` to customize colors, spacing, and typography.

```ts
// Import the theme type:
import type { Theme } from '~/theme'
```

### UI Components

UI primitives are exported from `src/core/ui.ts` using the nativ library.

```ts
// Import UI primitives:
import { Button, View, Text } from '~/ui'
```

### Database

- Schema: `~/db/schema`
- Client: `~/db/client`
- Migrations: `~/db/migrations`

### Assets

- **Icons**: Add to `assets/icons/`
- **Images**: Add to `assets/images/`
- **Fonts**: Add to `assets/fonts/` and `app.config.ts`

## Learn More

- [Nativ Documentation](https://github.com/alloc/nativ)
- [Expo Documentation](https://docs.expo.dev/)
- [Restyle Documentation](https://github.com/alloc/restyle)
- [Drizzle Documentation](https://orm.drizzle.team/)
