package com.ait.manager.model;

import java.util.List;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnore;

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
@Table(name = "events")
public class Event {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long event_id;
	private String event_name;
	private String event_icon;

	@JsonIgnore
	@OneToMany(targetEntity = Post.class, fetch = FetchType.EAGER)
	private List<Post> posts;

	public Event(String event_name, String event_icon, List<Post> posts) {
		this.event_name = event_name;
		this.event_icon = event_icon;
		this.posts = posts;
	}

	public Event(Long event_id) {

		this.event_id = event_id;
	}

}
