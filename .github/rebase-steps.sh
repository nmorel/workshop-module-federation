#!/bin/bash

git fetch

git checkout step-00
git pull --rebase --autostash
git push

git checkout step-01
git pull --rebase --autostash
git rebase step-00
git push --force-with-lease origin step-01

git checkout step-01-result
git pull --rebase --autostash
git rebase --onto step-01 step-01@{1} step-01-result
git push --force-with-lease origin step-01-result

git checkout step-02
git pull --rebase --autostash
git rebase --onto step-01-result step-01-result@{1} step-02
git push --force-with-lease origin step-02

git checkout step-02-result
git pull --rebase --autostash
git rebase --onto step-02 step-02@{1} step-02-result
git push --force-with-lease origin step-02-result

git checkout step-03
git pull --rebase --autostash
git rebase --onto step-02-result step-02-result@{1} step-03
git push --force-with-lease origin step-03

git checkout step-03-result
git pull --rebase --autostash
git rebase --onto step-03 step-03@{1} step-03-result
git push --force-with-lease origin step-03-result

git checkout step-04
git pull --rebase --autostash
git rebase --onto step-03-result step-03-result@{1} step-04
git push --force-with-lease origin step-04

git checkout step-04-result
git pull --rebase --autostash
git rebase --onto step-04 step-04@{1} step-04-result
git push --force-with-lease origin step-04-result

git checkout step-05
git pull --rebase --autostash
git rebase --onto step-04-result step-04-result@{1} step-05
git push --force-with-lease origin step-05

git checkout step-05-result
git pull --rebase --autostash
git rebase --onto step-05 step-05@{1} step-05-result
git push --force-with-lease origin step-05-result

git checkout step-06
git pull --rebase --autostash
git rebase --onto step-05-result step-05-result@{1} step-06
git push --force-with-lease origin step-06

git checkout step-06-result
git pull --rebase --autostash
git rebase --onto step-06 step-06@{1} step-06-result
git push --force-with-lease origin step-06-result

git checkout step-07
git pull --rebase --autostash
git rebase --onto step-06-result step-06-result@{1} step-07
git push --force-with-lease origin step-07

git checkout step-07-result
git pull --rebase --autostash
git rebase --onto step-07 step-07@{1} step-07-result
git push --force-with-lease origin step-07-result

git checkout step-08
git pull --rebase --autostash
git rebase --onto step-07-result step-07-result@{1} step-08
git push --force-with-lease origin step-08

git checkout step-08-result
git pull --rebase --autostash
git rebase --onto step-08 step-08@{1} step-08-result
git push --force-with-lease origin step-08-result

git checkout step-final
git pull --rebase --autostash
git rebase --onto step-08-result step-08-result@{1} step-final
git push --force-with-lease origin step-final

git checkout step-00
echo "Done !"
