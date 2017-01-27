#!/bin/bash

cd example &&\
yarn run build &&\
cp index.html .. &&\
cd .. &&\
git add index.html &&\
git stash save --keep-index &&\
rm index.html &&\
git checkout gh-pages &&\
git stash pop &&\
cp example/bundle.js . &&\
git add index.html bundle.js &&\
git commit -m 'chore: Build'
git co master
