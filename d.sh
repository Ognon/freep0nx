#!/bin/bash
# Build
npm run build

# Déploiement avec SSH
npx gh-pages -d dist -r git@github.com:Ognon/freep0nx.git

# Push
git add .
git commit -m "Deploy"
git push ognon main
