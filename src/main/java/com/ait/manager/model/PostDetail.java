package com.ait.manager.model;

import javax.persistence.*;
import lombok.*;

@Data
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "post_detail")
public class PostDetail {
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long post_detail_id;
	
	@JoinColumn(name = "user_id")
	private Long user_id;
	
	@JoinColumn(name = "post_id")
	private Long post_id;
	
	@JoinColumn(name = "cmt_id")
	private Long cmt_id;
	
	@JoinColumn(name = "factorial_id")
	private Long factorial_id;

	public PostDetail(Long user_id, Long post_id, Long cmt_id, Long factorial_id) {
		super();
		this.user_id = user_id;
		this.post_id = post_id;
		this.cmt_id = cmt_id;
		this.factorial_id = factorial_id;
	}

	public PostDetail(Long user_id, Long post_id, Long cmt_id) {
		super();
		this.user_id = user_id;
		this.post_id = post_id;
		this.cmt_id = cmt_id;
	}
}
