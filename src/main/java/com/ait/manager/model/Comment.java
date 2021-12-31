package com.ait.manager.model;

import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import javax.persistence.*;
import java.util.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name="comments")
public class Comment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long cmt_id;

    private String content;

    @OneToOne
    @JoinColumn(name = "post_id")
    private Post post;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @Column(name="create_at")
    @CreationTimestamp
    private Date createAt;

    @Column(name="update_at")
    @UpdateTimestamp
    private Date updateAt;

    public Comment(String content, User user, Post post) {
        this.content = content;
        this.post = post;
        this.user = user;
    }

    public Comment(String content) {
        this.content = content;
    }
}
