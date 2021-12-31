package com.ait.manager.service.comment;

import com.ait.manager.model.Comment;
import com.ait.manager.service.GeneralService;

public interface CommentService extends GeneralService<Comment> {
    Iterable<Comment> getAllCommentByPostId(Long id);
}
