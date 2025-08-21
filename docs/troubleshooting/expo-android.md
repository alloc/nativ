# Expo Android Troubleshooting Guide

This guide documents common Expo Android build issues and their fixes.

---

## Problem: NDK Missing `source.properties`

### The Error

When running:

```bash
pnpm android
```

You may encounter an error like this:

```
FAILURE: Build failed with an exception.

* Where:
Build file '/path/to/project/android/build.gradle' line: 37

* What went wrong:
A problem occurred evaluating root project 'My Nativ App'.
> Failed to apply plugin 'com.facebook.react.rootproject'.
   > A problem occurred configuring project ':app'.
      > [CXX1101] NDK at /Users/johndoe/Library/Android/sdk/ndk/27.1.12297006 did not have a source.properties file
```

This means the project expects a specific **NDK version** that is either missing or incomplete.

### The Fix

Install the required NDK version:

```bash
sdkmanager --install 'ndk;27.1.12297006'
```

This ensures the Android project can build correctly.

### Additional Notes

- Use `sdkmanager --list` to see available and installed SDK/NDK versions.
- If `sdkmanager` is not available, install it via [Android command-line tools](https://developer.android.com/tools/sdkmanager).
- You may need to accept licenses by running:

  ```bash
  yes | sdkmanager --licenses
  ```

- After installation, re-run:

  ```bash
  pnpm android
  ```

---

## References

- [Android SDK Manager](https://developer.android.com/tools/sdkmanager)
- [Gradle Command-Line Reference](https://docs.gradle.org/current/userguide/command_line_interface.html)

---

✅ If you still encounter issues, check the generated `android/build/reports/problems/problems-report.html` for detailed Gradle problem reports.
