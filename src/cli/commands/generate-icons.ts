import { command } from 'cmd-ts'
import { execSync } from 'node:child_process'
import { existsSync, mkdirSync } from 'node:fs'
import { join, parse } from 'node:path'
import { glob } from 'tinyglobby'

/**
 * Generate a scaled PNG icon from an SVG file
 * @param svgPath Path to the source SVG file
 * @param pngPath Path where the PNG should be saved
 * @param scale Scale factor (e.g. '2x', '3x')
 * @returns boolean indicating success or failure
 */
function generateScaledIcon(
  svgPath: string,
  pngPath: string,
  scale: string
): boolean {
  try {
    execSync(`svgexport "${svgPath}" "${pngPath}" ${scale}`, {
      stdio: 'pipe',
      env: {
        ...process.env,
        NODE_PATH: join(__dirname, '../../node_modules'),
      },
    })
    return true
  } catch (error) {
    console.error(`  ❌ Failed to generate ${scale}:`, error)
    return false
  }
}

export default command({
  name: 'generate-icons',
  description:
    'Generate @2x and @3x PNG versions of SVG icons in ./assets/icons',
  args: {},
  handler: async () => {
    const iconsDir = './assets/icons'

    // Create icons directory if it doesn't exist
    if (!existsSync(iconsDir)) {
      mkdirSync(iconsDir, { recursive: true })
    }

    console.log('🔍 Searching for SVG files in ./assets/icons...')

    // Find all SVG files in the icons directory
    const svgFiles = await glob('**/*.svg', {
      cwd: iconsDir,
      absolute: false,
    })

    if (svgFiles.length === 0) {
      console.log('📁 No SVG files found in ./assets/icons')
      return
    }

    console.log(`📋 Found ${svgFiles.length} SVG file(s)`)

    let generatedCount = 0

    for (const svgFile of svgFiles) {
      const fullSvgPath = join(iconsDir, svgFile)
      const { dir, name } = parse(fullSvgPath)

      const png2xPath = join(dir, `${name}@2x.png`)
      const png3xPath = join(dir, `${name}@3x.png`)

      const needs2x = !existsSync(png2xPath)
      const needs3x = !existsSync(png3xPath)

      if (needs2x || needs3x) {
        console.log(`\n🎨 Processing: ${svgFile}`)

        if (needs2x) {
          console.log('  → Generating @2x version...')
          if (generateScaledIcon(fullSvgPath, png2xPath, '2x')) {
            console.log('  ✅ @2x generated')
            generatedCount++
          }
        } else {
          console.log('  ⏭️  @2x already exists')
        }

        if (needs3x) {
          console.log('  → Generating @3x version...')
          if (generateScaledIcon(fullSvgPath, png3xPath, '3x')) {
            console.log('  ✅ @3x generated')
            generatedCount++
          }
        } else {
          console.log('  ⏭️  @3x already exists')
        }
      } else {
        console.log(`⏭️  ${svgFile} - both @2x and @3x already exist`)
      }
    }

    console.log(`\n🎉 Done! Generated ${generatedCount} PNG file(s)`)
  },
})
