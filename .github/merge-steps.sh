#!/bin/bash -e

git fetch

git checkout step-00
git push

git checkout step-01
git merge --no-edit origin/step-00 
git push

git checkout step-01-result
git merge --no-edit origin/step-01 
git push

git checkout step-02
git merge --no-edit origin/step-01-result 
git push

git checkout step-02-result
git merge --no-edit origin/step-02 
git push

git checkout step-03
git merge --no-edit origin/step-02-result 
git push

git checkout step-03-result
git merge --no-edit origin/step-03 
git push

git checkout step-04
git merge --no-edit origin/step-03-result 
git push

git checkout step-04-result
git merge --no-edit origin/step-04 
git push

git checkout step-05
git merge step-04-result
git push

git checkout step-05-result
git merge --no-edit origin/step-05 
git push

git checkout step-06
git merge --no-edit origin/step-05-result 
git push

git checkout step-06-result
git merge --no-edit origin/step-06 
git push

git checkout step-07
git merge --no-edit origin/step-06-result 
git push

git checkout step-07-result
git merge --no-edit origin/step-07 
git push

git checkout step-08
git merge --no-edit origin/step-07-result 
git push

git checkout step-08-result
git merge --no-edit origin/step-08 
git push

git checkout step-00
echo "Done !"
