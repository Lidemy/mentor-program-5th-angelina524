export function getForm(className, commentsClassName) {
  return `
    <div>
      <form class="${className}">
        <div class="form-group pt-3 pb-3">
          <label class="form-label">暱稱</label>
          <input name="nickname" type="text" class="form-control">
        </div>
        <div class="form-group pb-3">
          <label class="form-label">留言內容</label>
          <textarea name="content" class="form-control" rows="3"></textarea>
        </div>
        <button type="submit" class="btn btn-primary">Submit</button>
      </form>
      <div class="${commentsClassName}">
      </div>
    </div>
  `
}

export function getLoadMoreButton(className) {
  return `<button class="${className} btn btn-primary mt-3 mb-3 more-comments-btn" type="button">載入更多</button>`
}
