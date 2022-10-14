#!/bin/bash -e

git fetch

git checkout step-00
git push

git checkout step-01
git merge origin/step-00 --no-edit
git push

git checkout step-01-result
git merge origin/step-01 --no-edit
git push

git checkout step-02
git merge origin/step-01-result --no-edit
git push

git checkout step-02-result
git merge origin/step-02 --no-edit
git push

git checkout step-03
git merge origin/step-02-result --no-edit
git push

git checkout step-03-result
git merge origin/step-03 --no-edit
git push

git checkout step-04
git merge origin/step-03-result --no-edit
git push

git checkout step-04-result
git merge origin/step-04 --no-edit
git push

git checkout step-05
git merge step-04-result
git push

git checkout step-05-result
git merge origin/step-05 --no-edit
git push

git checkout step-06
git merge origin/step-05-result --no-edit
git push

git checkout step-06-result
git merge origin/step-06 --no-edit
git push

git checkout step-07
git merge origin/step-06-result --no-edit
git push

git checkout step-07-result
git merge origin/step-07 --no-edit
git push

git checkout step-08
git merge origin/step-07-result --no-edit
git push

git checkout step-08-result
git merge origin/step-08 --no-edit
git push

git checkout step-00
echo "Done !"
