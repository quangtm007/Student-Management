package com.ait.manager.repository;

import com.ait.manager.model.Comment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface CommentRepository extends JpaRepository<Comment, Long> {
    @Query(nativeQuery = true,value = "SELECT * FROM comments WHERE post_id = ?")
    Iterable<Comment> getAllCommentByPostId(Long id);
}
