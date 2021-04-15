## 交作業流程

1. 新開一個 branch：`git branch week1`
2. 切換到新的 branch 上：`git checkout week1`
3. 寫作業
4. 完成作業後，將檔案傳到暫存區：`git add .`
5. 將暫存區內的資料轉至版本控制：`git commit -am "week1 finish"`
6. 將新版本傳到遠端 GitHub：`git push origin week1`
7. 檢查 files changed
8. 在遠端 GitHub 上，發 pull request
9. 複製 pull request 連結到學習系統上繳交
10. 等待助教批改
11. 助教批改後會一起 merge 並且刪掉分支
12. 確認遠端 GitHub 上已經 merged
13. 本地切換到 master 上：`git checkout master`
14. 將遠端 GitHub 批改後的 master 同步到本地：`git pull origin master`
15. 刪除本地分支：`git branch -d week1`