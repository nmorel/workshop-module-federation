#!/bin/bash

git fetch

git checkout step-00
git pull --rebase --autostash
git push

git checkout step-01
git pull --rebase --autostash
git merge step-00
git push

git checkout step-01-result
git pull --rebase --autostash
git merge step-01
git push

git checkout step-02
git pull --rebase --autostash
git merge step-01-result
git push

git checkout step-02-result
git pull --rebase --autostash
git merge step-02
git push

git checkout step-03
git pull --rebase --autostash
git merge step-02-result
git push

git checkout step-03-result
git pull --rebase --autostash
git merge step-03
git push

git checkout step-04
git pull --rebase --autostash
git merge step-03-result
git push

git checkout step-04-result
git pull --rebase --autostash
git merge step-04
git push

git checkout step-05
git pull --rebase --autostash
git merge step-04-result
git push

git checkout step-05-result
git pull --rebase --autostash
git merge step-05
git push

git checkout step-06
git pull --rebase --autostash
git merge step-05-result
git push

git checkout step-06-result
git pull --rebase --autostash
git merge step-06
git push

git checkout step-07
git pull --rebase --autostash
git merge step-06-result
git push

git checkout step-07-result
git pull --rebase --autostash
git merge step-07
git push

git checkout step-08
git pull --rebase --autostash
git merge step-07-result
git push

git checkout step-08-result
git pull --rebase --autostash
git merge step-08
git push

git checkout step-00
echo "Done !"
