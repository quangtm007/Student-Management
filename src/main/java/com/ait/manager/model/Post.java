package com.ait.manager.model;

import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnore;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "posts")
public class Post {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long post_id;

	private String work_completed;
	private String action;
	private String power;
	private String capacity;
	private String think;

	@ManyToOne
	@JoinColumn(name = "user_id")
	private User user;

	@ManyToOne
	@JoinColumn(name = "event_id")
	private Event event;

	@JsonIgnore
	@OneToMany
	private List<Comment> comments;

	@JsonIgnore
	@ManyToMany(cascade = { CascadeType.ALL })
	@JoinTable(
			name = "post_factorial",
			joinColumns = { @JoinColumn(name = "post_id") },
			inverseJoinColumns = { @JoinColumn(name = "factorial_id") }
	)
	private List<Factorial> factorials;

	private Status status;

	public Post(String work_completed, String action, String power, String capacity, String think, User user,
				Event event, List<Comment> comments, List<Factorial> factorials, Status status) {
		super();
		this.work_completed = work_completed;
		this.action = action;
		this.power = power;
		this.capacity = capacity;
		this.think = think;
		this.user = user;
		this.event = event;
		this.factorials = factorials;
		this.status = status;

	}

	public Post(Long post_id) {
		this.post_id = post_id;
	}

	public Post(String work_completed, String action, String power, String capacity, String think, User user,
				Event event) {

		this.work_completed = work_completed;
		this.action = action;
		this.power = power;
		this.capacity = capacity;
		this.think = think;
		this.user = user;
		this.event = event;

	}
}
