@echo off
rem Ouvre le site vitrine Valoupe compile (dossier dist) : http://localhost:4321
rem Fermer cette fenetre arrete le site. Apres une modification : npm run build, puis relancer.
if exist "%ProgramFiles%\nodejs\node.exe" set "PATH=%ProgramFiles%\nodejs;%PATH%"
cd /d C:\dev\valoupe
call npx astro preview --port 4321 --open
