This folder is a mirror/skeleton of your D:\Github\BlueTEXT.in tree with placeholder files.

How to use:
1. Review placeholder files and replace them with your real HTML/CSS/JS.
2. To copy to your live folder, run (PowerShell):

robocopy "d:\Bluetext\BlueTEXT\site_mirror" "D:\Github\BlueTEXT.in" /E

3. Serve locally for testing:

python -m http.server --directory . 8080

Notes:
- Verify .htaccess rules and service-worker paths after copying.
- If you maintain both the scaffold and live site, use a script to sync instead of manual copy.