#!/bin/bash

cd example &&\
yarn run build &&\
cd .. &&\
git checkout gh-pages &&\
cp example/bundle.js . &&\
git add bundle.js &&\
git commit -m 'chore: Build'
git co master
