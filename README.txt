TRAFFIC Story Playbook - web edition (12 November 2026)

Contents
  index.html   the deck (30 slides)
  style.css    design (forest theme, marine/timber hub style)
  main.js      slide navigation, Present button, reveal motion
  images/      all photos, logos and the TRAFFIC 50 logo
  sharepoint-embed-code.txt   iframe code for the SharePoint Embed web part

Keep the folder structure as it is: upload the whole folder; index.html opens the deck.
Fonts load from Google Fonts (Playfair Display, Figtree, IBM Plex Mono); offline, the page falls back to system fonts.

GitHub Pages: upload everything in this folder to the root of the repository, then Settings > Pages > Deploy from a branch > main / (root).
SharePoint: the host must allow framing (traffic.org currently sends X-Frame-Options: SAMEORIGIN, which blocks it).
Add the host domain under Site settings > HTML Field Security, then paste the iframe code with the real address.
The page carries a noindex tag so search engines do not list it.
