package com.ait.manager.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
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
@Table(name = "factorials")
public class Factorial {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long factorial_id;

	private String factorial_name;

	private String factorial_hashtag;

	private String factorial_color;

	public Factorial(String factorial_name, String factorial_hashtag) {
		super();
		this.factorial_name = factorial_name;
		this.factorial_hashtag = factorial_hashtag;
	}

	public Factorial(String factorial_hashtag) {
		super();
		this.factorial_hashtag = factorial_hashtag;
	}

}
