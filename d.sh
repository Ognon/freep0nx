#!/bin/bash
npm run build
gh-pages -d dist -r git@github.com:Ognon/freep0nx.git
git add .
git commit -m "Deploy to Ognon"
git push ognon main
