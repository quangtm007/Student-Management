package com.ait.manager.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Data
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "user_class_post")
public class UserClassPost {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@JoinColumn(name = "user_id")
	private Long user_id;

	@JoinColumn(name = "class_id")
	private Long class_id;

	@JoinColumn(name = "post_id")
	private Long post_id;

	public UserClassPost(Long user_id, Long class_id, Long post_id) {
		this.user_id = user_id;
		this.class_id = class_id;
		this.post_id = post_id;
	}
}