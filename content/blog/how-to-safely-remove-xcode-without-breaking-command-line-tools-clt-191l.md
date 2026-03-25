---
title: "How to Safely Remove Xcode Without Breaking Command Line Tools (CLT)"
description: "Free up disk space on your Mac by removing Xcode while keeping Command Line Tools fully functional for development."
date: "2025-06-17"
tags: ["macos","xcode","terminal","developertools"]
canonical: "https://dev.to/oler/how-to-safely-remove-xcode-without-breaking-command-line-tools-clt-191l"
devto: "https://dev.to/oler/how-to-safely-remove-xcode-without-breaking-command-line-tools-clt-191l"
readingTime: "2 min read"
coverImage: "https://media2.dev.to/dynamic/image/width=1000,height=420,fit=cover,gravity=auto,format=auto/https%3A%2F%2Fdev-to-uploads.s3.amazonaws.com%2Fuploads%2Farticles%2Ffig8azexxi7uwumz551u.jpg"
featured: false
---

If you once built iOS/macOS apps but no longer need Xcode — or you simply want to free up tens of gigabytes of disk space — this guide shows how to safely remove Xcode without losing Command Line Tools (CLT) that keep your terminal environment working.

## Why Would You Remove Xcode?

* Xcode occupies 10–30 GB depending on version and simulators.
* You no longer develop for iOS/macOS.
* You want to free SSD space but keep `git`, `clang`, `make`, `brew`, etc., functional.

## Step 1: Ensure Command Line Tools (CLT) Are Installed

Before deleting Xcode, you must have CLT installed. Check with:

```bash
xcode-select -p
```

If you see:

```
/Applications/Xcode.app/Contents/Developer
```

That means the CLT isn't set.

To install CLT directly:

```bash
softwareupdate --list
```

Find the latest Command Line Tools, like:

```
* Label: Command Line Tools for Xcode-16.4
```

Then install it:

```bash
sudo softwareupdate -i "Command Line Tools for Xcode-16.4"
```

Once done, verify:

```bash
xcode-select -p
```

Expected:

```
/Library/Developer/CommandLineTools
```

Now your CLI tools will work without Xcode.

## Step 2: Remove Xcode Safely

To fully remove Xcode:

```bash
sudo rm -rf /Applications/Xcode.app
```

Or simply drag `Xcode.app` to the Trash via Finder and empty the Trash.

## Step 3 (Optional): Free Additional Space

Xcode leaves extra files. You can remove them:

```bash
sudo rm -rf ~/Library/Developer/Xcode
sudo rm -rf ~/Library/Caches/com.apple.dt.Xcode
sudo rm -rf ~/Library/Application\ Support/Xcode
sudo rm -rf ~/Library/Preferences/com.apple.dt.Xcode.plist
sudo rm -rf ~/Library/Developer/CoreSimulator
```

Warning: The last line removes all iOS simulators, if any remain.

## Step 4: Reset Command Line Tools (if needed)

If `xcode-select` complains:

```bash
sudo xcode-select --switch /Library/Developer/CommandLineTools
```

## Step 5: Confirm Everything Works

Test key tools:

```bash
git --version
clang --version
make --version
```

All should work fine without Xcode.

## Summary

| Task                     | Command                                                          |
| ------------------------ | ---------------------------------------------------------------- |
| Check CLT                | `xcode-select -p`                                                |
| Install CLT via terminal | `sudo softwareupdate -i "Command Line Tools for Xcode-XX.X"`     |
| Remove Xcode             | `sudo rm -rf /Applications/Xcode.app`                            |
| Remove extra files       | `rm -rf ~/Library/...` (as listed above)                         |
| Set CLT path manually    | `sudo xcode-select --switch /Library/Developer/CommandLineTools` |
| Verify tools             | `git --version`, `clang --version`, `make --version`             |

## Why This Is Useful

* Saves \~20 GB of space.
* Keeps Terminal fully working.
* Great for backend, Python, Rust, Go, or web developers who don’t build for Apple platforms anymore.

## Bonus: Automation Script

Here’s a simple shell script to automate this process:

```bash
#!/bin/bash

echo "Checking for Command Line Tools..."
if ! xcode-select -p | grep -q CommandLineTools; then
  echo "Installing Command Line Tools..."
  latest_clt=$(softwareupdate --list | grep -B 1 "Command Line Tools" | head -n 1 | awk -F'* Label: ' '{print $2}')
  sudo softwareupdate -i "$latest_clt"
else
  echo "Command Line Tools already installed."
fi

echo "Removing Xcode..."
sudo rm -rf /Applications/Xcode.app

echo "Cleaning extra files..."
rm -rf ~/Library/Developer/Xcode
rm -rf ~/Library/Caches/com.apple.dt.Xcode
rm -rf ~/Library/Application\ Support/Xcode
rm -rf ~/Library/Preferences/com.apple.dt.Xcode.plist
rm -rf ~/Library/Developer/CoreSimulator

echo "Setting Command Line Tools path..."
sudo xcode-select --switch /Library/Developer/CommandLineTools

echo "Done. Your Terminal environment is safe and clean!"
```
