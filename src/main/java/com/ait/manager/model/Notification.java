package com.ait.manager.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name="notifications")
public class Notification {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@JoinColumn(name = "user_id")
	private Long user_id;

	@JoinColumn(name = "cmt_id")
	private Long cmt_id;

	@JoinColumn(name = "post_id")
	private Long post_id;

	public Notification(Long user_id, Long cmt_id, Long post_id) {
		super();
		this.user_id = user_id;
		this.cmt_id = cmt_id;
		this.post_id = post_id;
	}
}
