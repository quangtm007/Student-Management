package com.ait.manager.controller;

import com.ait.manager.model.Comment;
import com.ait.manager.model.Post;
import com.ait.manager.model.User;
import com.ait.manager.model.dto.CommentDTO;
import com.ait.manager.service.comment.CommentServiceImpl;
import com.ait.manager.service.post.PostServiceImpl;
import com.ait.manager.service.user.UserServiceImpl;
import com.ait.manager.security.UserPrincipal;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;



import java.util.Optional;

@RestController
public class CommentController {
    @Autowired
    private CommentServiceImpl commentService;

    @Autowired
    private PostServiceImpl postService;

    @Autowired
    private UserServiceImpl userService;

    @GetMapping("/comment/list")
    public ResponseEntity<Iterable<Comment>> findAllComment(){
        return new ResponseEntity<>(commentService.findAll(), HttpStatus.OK);
    }

    @DeleteMapping("/comment/{id}")
    public ResponseEntity<Comment> deleteComment(@PathVariable Long id) {
        Optional<Comment> commentOptional = commentService.findById(id);
        if (!commentOptional.isPresent()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        commentService.remove(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @PutMapping("/comment/edit/{id}")
    public ResponseEntity<Comment> editComment(@RequestBody Comment comment,@PathVariable Long id){
        Optional<Comment> commentOptional = commentService.findById(id);
        comment.setCreateAt(commentOptional.get().getCreateAt());
        comment.setCmt_id(id);
        return new ResponseEntity<>(commentService.save(comment),HttpStatus.OK);
    }

    @GetMapping("/comment/edit-comment/{id}")
    public ResponseEntity<Optional<Comment>> commentResponseEntity(@PathVariable Long id){
        return new ResponseEntity<>(commentService.findById(id),HttpStatus.OK);
    }

    @GetMapping("/comment/post/{id}")
    public ResponseEntity<Iterable<Comment>> getAllCommentByPostId(@PathVariable Long id){
        return new ResponseEntity<>(commentService.getAllCommentByPostId(id),HttpStatus.OK);
    }

    @PostMapping("/comment/create-comment")
    public ResponseEntity<Comment> createComment(@RequestBody Comment comment){
        Post post = postService.findById(comment.getPost().getPost_id()).get();
        comment.setPost(post);

        User user = userService.findById(comment.getUser().getId()).get();
        comment.setUser(user);
        return new ResponseEntity<>(commentService.save(comment),HttpStatus.CREATED);
    }

    @MessageMapping("/chat.addUser")
    @SendTo("/topic/public")
    public String addUser(@Payload String username, SimpMessageHeaderAccessor headerAccessor) {

        // Add username in web socket session
        headerAccessor.getSessionAttributes().put("username", username);

        return username + " username";

    }

    @MessageMapping("/chat.createComment")
    @SendTo("/topic/public")
    public Comment createCommentRealTime(@Payload Comment comment) {
        return comment;
    }

    @MessageMapping("/chat.editComment")
    @SendTo("/topic/edit")
    public Comment editCommentRealTime(@Payload Comment comment) {
        return comment;
    }

    @MessageMapping("/chat.deleteComment")
    @SendTo("/topic/delete")
    public CommentDTO editCommentRealTime(@Payload CommentDTO commentDTO) {

        return commentDTO;
    }
}
