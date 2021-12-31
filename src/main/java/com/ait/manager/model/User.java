package com.ait.manager.model;

import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnore;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Data
@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "users")
public class User {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	protected Long id;

	@Column(columnDefinition = "boolean default false")
	private boolean deleted = false;

	@Column(unique = true, nullable = false)
	private String username;

	@Column(nullable = false)
	private String password;

	@Column(nullable = false)
	private String fullName;

	@Column(nullable = false)
	private String avatar;

	@ManyToOne(targetEntity = Role.class, fetch = FetchType.EAGER)
	@JoinColumn(name = "role_id")
	private Role role;

	@ManyToOne(targetEntity = Class.class, fetch = FetchType.EAGER)
	@JoinColumn(name = "class_id")
	private Class aClass;

	@JsonIgnore
	@OneToMany
	private List<Post> posts;

	@JsonIgnore
	@OneToMany
	private List<Factorial> factorials;

	private Long parentID;

	@Column(unique = true)
	private String user_code;

	public User(String username, String password, String fullName, Role role) {
		this.username = username;
		this.password = password;
		this.fullName = fullName;
		this.role = role;
	}

	public User(String username, String password, Role role) {
		super();
		this.username = username;
		this.password = password;
		this.role = role;
	}

	public User(Long id) {

		this.id = id;
	}

	@Override
	public String toString() {
		return "User{" + "id=" + id + ", username='" + username + '\'' + ", password='" + password + '\''
				+ ", fullName='" + fullName + '\'' + ", roles=" + role + '}';
	}

}
