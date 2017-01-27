#!/bin/bash

cd example &&\
yarn run build &&\
cp index.html bundle.js .. &&\
cd .. &&\
git add index.html bundle.js &&\
git stash save --keep-index &&\
git checkout gh-pages &&\
git stash pop &&\
git commit -m 'chore: Build'
git co master
