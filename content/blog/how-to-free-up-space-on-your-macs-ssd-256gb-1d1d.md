---
title: "How to free up space on your Mac's ssd (256GB)"
description: "Learn how to free up space on your Mac's SSD using simple Terminal commands"
date: "2025-03-08"
tags: ["mac","cleanup","ssd","storage"]
canonical: "https://dev.to/oler/how-to-free-up-space-on-your-macs-ssd-256gb-1d1d"
devto: "https://dev.to/oler/how-to-free-up-space-on-your-macs-ssd-256gb-1d1d"
readingTime: "2 min read"
coverImage: "https://media2.dev.to/dynamic/image/width=1000,height=500,fit=cover,gravity=auto,format=auto/https%3A%2F%2Fdev-to-uploads.s3.amazonaws.com%2Fuploads%2Farticles%2F504m8hd711butil5nerl.png"
featured: false
---

![Wallpaper MacOS](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/hbr1jmmm9ealn6z1ljun.png)

If you have a Mac with a 256GB SSD, you might notice that your storage fills up quickly. I managed to **free up 100GB**, going from only **20GB free to 120GB**! Here’s a simple guide to help you do the same, using a built-in Terminal command and the CleanMyMac app.

---

## 1. Find Big Files with `du`

The `du` (disk usage) command helps you see which folders and files are taking up the most space. Open **Terminal** and type:

```sh
cd ~  # Go to your user folder

du -sh -- * .[^.]* | sort -hr
```

### What does this command do?
- `du -sh -- * .[^.]*`: Shows the size of each file and folder, including hidden files.
- `sort -hr`: Sorts the results from largest to smallest, so you can easily find the biggest files.

### Where to Look for Large Files
Once you run the command, check these common storage hogs:

- `~/Downloads`: Old downloads you no longer need.
- `~/Library/Caches`: App caches that build up over time.
- `~/Movies` and `~/Music`: Large media files.
- `~/Desktop`: Temporary files left on your desktop.

To delete files you no longer need, use:

```sh
rm -rf path/to/file-or-folder
```
**Be careful!** Make sure you don’t delete important files.

---

## 2. Use CleanMyMac for Easy Cleanup

[**CleanMyMac**](https://macpaw.com/cleanmymac) is a simple app that helps clean up your Mac automatically.

### How to Use CleanMyMac:
1. Download and install CleanMyMac from the official website.
2. Open the app and click **Smart Scan**.
3. Review the files it suggests for deletion.
4. Confirm the cleanup to free up space.

CleanMyMac removes junk files, app leftovers, and system caches safely.

---

## 3. More Tips to Free Up Space

### 🗑️ Empty the Trash
Sometimes, files stay in the Trash and still take up space. Open **Finder > Trash** and click **Empty**.

### 🗃️ Manage iCloud Storage
If you use iCloud Drive, old files might be taking up local space. Go to **System Preferences > Apple ID > iCloud** and adjust storage settings.

### 🚀 Delete Unused Apps
Check your installed apps in **Finder > Applications** and delete ones you don’t need.

---

## Conclusion

By following these simple steps, you can easily **free up gigabytes of space** on your Mac. The `du` command helps you find large files, while CleanMyMac makes cleaning easy. 

Try it out and let me know if it worked for you! 🚀
