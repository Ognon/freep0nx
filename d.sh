#!/bin/bash
# Build l'application
npm run build

# Déploie sur gh-pages
npx gh-pages -d dist -r git@github.com:Ognon/freep0nx.git

# Push les changements sur main
git add .
git commit -m "Deploy to Ognon"
git push ognon main
