# My Nativ App

A React Native app built with [Nativ](https://github.com/alloc/nativ), Expo, and modern tooling.

## Project Structure

```
├── assets/           # Fonts, icons, images
├── src/
│   ├── app/          # Expo Router pages
│   ├── db/           # Drizzle ORM setup
│   ├── theme.ts      # Restyle theme
│   └── ui.ts         # UI primitives
├── app.config.ts     # Expo configuration
├── drizzle.config.ts # Database configuration
└── tsconfig.json     # TypeScript configuration
```

## Features

- ✅ **Expo Router** - File-based routing
- ✅ **Restyle** - Type-safe styling system
- ✅ **Drizzle ORM** - Type-safe database with SQLite
- ✅ **TypeScript** - Strict type checking
- ✅ **Moti** - Smooth animations
- ✅ **Radashi** - Modern utility library
- ✅ **Variable Fonts** - InterTight font family

## Customization

### Theme

Edit `src/theme.ts` to customize colors, spacing, and typography.

### UI Components

UI primitives are exported from `src/ui.ts` using the nativ library. Import them from `~/ui`.

### Database

- Schema: `~/db/schema`
- Client: `~/db/client`
- Migrations: `~/db/migrations`

### Assets

- **Icons**: Add SVG files to `assets/icons/` and run `pnpm nativ generate-icons`
- **Images**: Add to `assets/images/`
- **Fonts**: Add to `assets/fonts/` and update the theme

## Learn More

- [Nativ Documentation](https://github.com/alloc/nativ)
- [Expo Documentation](https://docs.expo.dev/)
- [Restyle Documentation](https://github.com/alloc/restyle)
- [Drizzle Documentation](https://orm.drizzle.team/)
